import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";
import { listLeads, updateLeadStatus } from "@/lib/db/leads";
import { writeAuditLog } from "@/lib/auth/password";
import { getClientIp } from "@/lib/security/rate-limit";
import type { LeadStatus } from "@/types";
import { z } from "zod";

export async function GET(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as LeadStatus | null;
  const q = searchParams.get("q") || undefined;
  const leads = await listLeads({
    status: status || undefined,
    q,
  });

  return NextResponse.json({ ok: true, leads });
}

const patchSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["New", "Contacted", "Qualified", "Closed", "Spam"]),
  csrfToken: z.string().min(10),
});

export async function PATCH(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success || parsed.data.csrfToken !== auth.session.csrfToken) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  await updateLeadStatus(parsed.data.id, parsed.data.status);
  await writeAuditLog({
    adminId: auth.session.adminId,
    action: "lead_status_update",
    entityType: "website_leads",
    entityId: String(parsed.data.id),
    details: parsed.data.status,
    ip: getClientIp(request),
  });

  return NextResponse.json({ ok: true });
}
