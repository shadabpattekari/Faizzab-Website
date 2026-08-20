import { NextResponse } from "next/server";
import {
  findAdminByEmail,
  hashPassword,
  validatePasswordStrength,
  verifyPassword,
  writeAuditLog,
} from "@/lib/auth/password";
import { requireAdminSession } from "@/lib/auth/session";
import { execute, isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import { getClientIp } from "@/lib/security/rate-limit";
import { z } from "zod";

interface AdminListRow extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  role: string;
  is_active: number;
  last_login_at: Date | null;
  created_at: Date;
}

export async function GET() {
  const auth = await requireAdminSession(["super_admin"]);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, users: [] });
  }

  const users = await queryRows<AdminListRow[]>(
    `SELECT id, email, name, role, is_active, last_login_at, created_at FROM admin_users ORDER BY id ASC`,
  );

  return NextResponse.json({ ok: true, users: users || [] });
}

const createSchema = z.object({
  csrfToken: z.string().min(10),
  email: z.string().email().max(200),
  name: z.string().min(2).max(200),
  role: z.enum(["super_admin", "content_editor"]),
  password: z.string().min(12).max(200),
});

export async function POST(request: Request) {
  const auth = await requireAdminSession(["super_admin"]);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success || parsed.data.csrfToken !== auth.session.csrfToken) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const strength = validatePasswordStrength(parsed.data.password);
  if (strength) {
    return NextResponse.json({ ok: false, error: strength }, { status: 400 });
  }

  const existing = await findAdminByEmail(parsed.data.email);
  if (existing) {
    return NextResponse.json({ ok: false, error: "User already exists." }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await execute(
    `INSERT INTO admin_users (email, name, role, password_hash, is_active, failed_attempts, created_at)
     VALUES (:email, :name, :role, :hash, 1, 0, UTC_TIMESTAMP())`,
    {
      email: parsed.data.email.toLowerCase().trim(),
      name: parsed.data.name,
      role: parsed.data.role,
      hash: passwordHash,
    },
  );

  await writeAuditLog({
    adminId: auth.session.adminId,
    action: "admin_user_create",
    entityType: "admin_users",
    details: parsed.data.email.toLowerCase().trim(),
    ip: getClientIp(request),
  });

  return NextResponse.json({ ok: true });
}

const passwordSchema = z.object({
  csrfToken: z.string().min(10),
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(12).max(200),
});

export async function PATCH(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = passwordSchema.safeParse(body);
  if (!parsed.success || parsed.data.csrfToken !== auth.session.csrfToken) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const strength = validatePasswordStrength(parsed.data.newPassword);
  if (strength) {
    return NextResponse.json({ ok: false, error: strength }, { status: 400 });
  }

  const admin = await findAdminByEmail(auth.session.email || "");
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const valid = await verifyPassword(parsed.data.currentPassword, admin.password_hash);
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Current password is incorrect." }, { status: 400 });
  }

  const hash = await hashPassword(parsed.data.newPassword);
  await execute(`UPDATE admin_users SET password_hash = :hash, updated_at = UTC_TIMESTAMP() WHERE id = :id`, {
    hash,
    id: admin.id,
  });

  await writeAuditLog({
    adminId: admin.id,
    action: "password_change",
    entityType: "admin_users",
    entityId: String(admin.id),
    ip: getClientIp(request),
  });

  return NextResponse.json({ ok: true });
}
