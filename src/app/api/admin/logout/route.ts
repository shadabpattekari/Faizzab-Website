import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/auth/password";
import { getAdminSession } from "@/lib/auth/session";
import { getClientIp } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const session = await getAdminSession();
  const adminId = session.adminId;
  session.destroy();
  await writeAuditLog({
    adminId,
    action: "logout",
    ip: getClientIp(request),
  });
  return NextResponse.json({ ok: true });
}
