import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";
import { execute, isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import { writeAuditLog } from "@/lib/auth/password";
import { getClientIp, sanitizePlainText } from "@/lib/security/rate-limit";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";

function cleanRichText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "h2", "h3", "a"],
    allowedAttributes: { a: ["href", "title", "rel", "target"] },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

interface CmsRow extends RowDataPacket {
  slug: string;
  payload: string;
  status: string;
  updated_at: Date | null;
}

export async function GET(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  const type = new URL(request.url).searchParams.get("type");
  if (!["insights", "resources", "faqs", "services", "seo"].includes(type || "")) {
    return NextResponse.json({ ok: false, error: "Invalid type." }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, items: [], persisted: false });
  }

  const table =
    type === "insights"
      ? "cms_insights"
      : type === "resources"
        ? "cms_resources"
        : type === "faqs"
          ? "cms_faqs"
          : type === "services"
            ? "cms_services"
            : "cms_seo";

  if (table === "cms_seo") {
    const rows = await queryRows<RowDataPacket[]>(`SELECT path_key, title, meta_description, updated_at FROM cms_seo`);
    return NextResponse.json({ ok: true, items: rows || [], persisted: true });
  }

  const rows = await queryRows<CmsRow[]>(`SELECT slug, payload, status, updated_at FROM ${table}`);
  return NextResponse.json({
    ok: true,
    persisted: true,
    items: (rows || []).map((r) => ({
      slug: r.slug,
      status: r.status,
      updated_at: r.updated_at,
      payload: typeof r.payload === "string" ? JSON.parse(r.payload) : r.payload,
    })),
  });
}

const upsertSchema = z.object({
  csrfToken: z.string().min(10),
  type: z.enum(["insights", "resources", "faqs", "services", "seo"]),
  slug: z.string().min(1).max(191),
  status: z.enum(["draft", "published"]).optional(),
  payload: z.record(z.unknown()).optional(),
  title: z.string().max(255).optional(),
  metaDescription: z.string().max(320).optional(),
});

export async function PUT(request: Request) {
  const auth = await requireAdminSession(["super_admin", "content_editor"]);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  const body = await request.json();
  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success || parsed.data.csrfToken !== auth.session.csrfToken) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const slug = sanitizePlainText(parsed.data.slug, 191);

  if (parsed.data.type === "seo") {
    await execute(
      `INSERT INTO cms_seo (path_key, title, meta_description, updated_at, updated_by)
       VALUES (:slug, :title, :desc, UTC_TIMESTAMP(), :adminId)
       ON DUPLICATE KEY UPDATE title = :title, meta_description = :desc, updated_at = UTC_TIMESTAMP(), updated_by = :adminId`,
      {
        slug,
        title: sanitizePlainText(parsed.data.title || "", 255),
        desc: sanitizePlainText(parsed.data.metaDescription || "", 320),
        adminId: auth.session.adminId,
      },
    );
  } else {
    const payload = { ...(parsed.data.payload || {}) } as Record<string, unknown>;
    if (typeof payload.body === "string") payload.body = cleanRichText(payload.body);
    if (typeof payload.answer === "string") payload.answer = cleanRichText(payload.answer);
    if (typeof payload.overview === "string") payload.overview = cleanRichText(payload.overview);

    const table =
      parsed.data.type === "insights"
        ? "cms_insights"
        : parsed.data.type === "resources"
          ? "cms_resources"
          : parsed.data.type === "faqs"
            ? "cms_faqs"
            : "cms_services";

    await execute(
      `INSERT INTO ${table} (slug, payload, status, updated_at, updated_by)
       VALUES (:slug, CAST(:payload AS JSON), :status, UTC_TIMESTAMP(), :adminId)
       ON DUPLICATE KEY UPDATE payload = CAST(:payload AS JSON), status = :status, updated_at = UTC_TIMESTAMP(), updated_by = :adminId`,
      {
        slug,
        payload: JSON.stringify(payload),
        status: parsed.data.status || "draft",
        adminId: auth.session.adminId,
      },
    );
  }

  await writeAuditLog({
    adminId: auth.session.adminId,
    action: "cms_upsert",
    entityType: parsed.data.type,
    entityId: slug,
    ip: getClientIp(request),
  });

  return NextResponse.json({ ok: true });
}
