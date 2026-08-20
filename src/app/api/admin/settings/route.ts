import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";
import { execute, isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import { writeAuditLog } from "@/lib/auth/password";
import { getClientIp } from "@/lib/security/rate-limit";
import { defaultSiteSettings } from "@/content/site";
import { z } from "zod";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, settings: defaultSiteSettings, persisted: false });
  }

  interface SettingRow extends RowDataPacket {
    setting_key: string;
    setting_value: string;
  }

  const rows = await queryRows<SettingRow[]>(`SELECT setting_key, setting_value FROM site_settings`);
  const map = Object.fromEntries((rows || []).map((r) => [r.setting_key, r.setting_value]));

  return NextResponse.json({
    ok: true,
    persisted: true,
    settings: {
      academyStatus: map.academy_status || defaultSiteSettings.academyStatus,
      academyStatusLabel: map.academy_status_label || defaultSiteSettings.academyStatusLabel,
      academySummary: map.academy_summary || defaultSiteSettings.academySummary,
      platformStatus: map.platform_status || defaultSiteSettings.platformStatus,
      platformStatusLabel: map.platform_status_label || defaultSiteSettings.platformStatusLabel,
      platformSummary: map.platform_summary || defaultSiteSettings.platformSummary,
      homepageAnnouncement: map.homepage_announcement || "",
      socialLinks: {
        linkedin: map.social_linkedin || "",
        twitter: map.social_twitter || "",
      },
      contactEmail: map.contact_email || "",
      contactPhone: map.contact_phone || "",
    },
  });
}

const settingsSchema = z.object({
  csrfToken: z.string().min(10),
  academyStatus: z.enum(["available", "coming_soon", "in_development"]),
  academyStatusLabel: z.string().max(100),
  academySummary: z.string().max(2000),
  platformStatus: z.enum(["available", "coming_soon", "in_development"]),
  platformStatusLabel: z.string().max(100),
  platformSummary: z.string().max(2000),
  homepageAnnouncement: z.string().max(500),
  socialLinkedin: z.string().max(300).optional(),
  socialTwitter: z.string().max(300).optional(),
  contactEmail: z.string().max(200).optional(),
  contactPhone: z.string().max(40).optional(),
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
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success || parsed.data.csrfToken !== auth.session.csrfToken) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const entries: [string, string][] = [
    ["academy_status", parsed.data.academyStatus],
    ["academy_status_label", parsed.data.academyStatusLabel],
    ["academy_summary", parsed.data.academySummary],
    ["platform_status", parsed.data.platformStatus],
    ["platform_status_label", parsed.data.platformStatusLabel],
    ["platform_summary", parsed.data.platformSummary],
    ["homepage_announcement", parsed.data.homepageAnnouncement],
    ["social_linkedin", parsed.data.socialLinkedin || ""],
    ["social_twitter", parsed.data.socialTwitter || ""],
    ["contact_email", parsed.data.contactEmail || ""],
    ["contact_phone", parsed.data.contactPhone || ""],
  ];

  for (const [key, value] of entries) {
    await execute(
      `INSERT INTO site_settings (setting_key, setting_value, updated_at, updated_by)
       VALUES (:key, :value, UTC_TIMESTAMP(), :adminId)
       ON DUPLICATE KEY UPDATE setting_value = :value, updated_at = UTC_TIMESTAMP(), updated_by = :adminId`,
      { key, value, adminId: auth.session.adminId },
    );
  }

  await writeAuditLog({
    adminId: auth.session.adminId,
    action: "settings_update",
    entityType: "site_settings",
    ip: getClientIp(request),
  });

  return NextResponse.json({ ok: true });
}
