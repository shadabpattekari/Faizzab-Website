import { NextResponse } from "next/server";
import {
  findAdminByEmail,
  isLocked,
  recordLoginFailure,
  recordLoginSuccess,
  verifyPassword,
  writeAuditLog,
} from "@/lib/auth/password";
import { createCsrfToken, getAdminSession } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/db/mysql";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Administration requires MySQL configuration." },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const limited = rateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
  if (!limited.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const admin = await findAdminByEmail(email);

    if (!admin || !admin.is_active) {
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
    }

    if (isLocked(admin.locked_until)) {
      return NextResponse.json(
        { ok: false, error: "Account temporarily locked. Try again later." },
        { status: 423 },
      );
    }

    const valid = await verifyPassword(parsed.data.password, admin.password_hash);
    if (!valid) {
      await recordLoginFailure(admin.id, admin.failed_attempts);
      await writeAuditLog({
        adminId: admin.id,
        action: "login_failed",
        ip,
      });
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
    }

    await recordLoginSuccess(admin.id);
    const session = await getAdminSession();
    session.isLoggedIn = true;
    session.adminId = admin.id;
    session.email = admin.email;
    session.name = admin.name;
    session.role = admin.role;
    session.csrfToken = createCsrfToken();
    await session.save();

    await writeAuditLog({
      adminId: admin.id,
      action: "login_success",
      ip,
    });

    return NextResponse.json({
      ok: true,
      role: admin.role,
      name: admin.name,
      csrfToken: session.csrfToken,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to sign in." }, { status: 500 });
  }
}
