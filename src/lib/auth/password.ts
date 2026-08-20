import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { execute, isDatabaseConfigured, queryRows } from "@/lib/db/mysql";
import type { AdminRole } from "@/types";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export interface AdminUserRow extends RowDataPacket {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  password_hash: string;
  is_active: number;
  failed_attempts: number;
  locked_until: Date | null;
}

export function validatePasswordStrength(password: string): string | null {
  if (password.length < 12) return "Password must be at least 12 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include a number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must include a special character.";
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function findAdminByEmail(email: string): Promise<AdminUserRow | null> {
  if (!isDatabaseConfigured()) return null;
  const rows = await queryRows<AdminUserRow[]>(
    `SELECT id, email, name, role, password_hash, is_active, failed_attempts, locked_until
     FROM admin_users WHERE email = :email LIMIT 1`,
    { email: email.toLowerCase().trim() },
  );
  return rows?.[0] ?? null;
}

export async function recordLoginFailure(adminId: number, failedAttempts: number) {
  const next = failedAttempts + 1;
  if (next >= MAX_FAILED_ATTEMPTS) {
    await execute(
      `UPDATE admin_users
       SET failed_attempts = :attempts,
           locked_until = DATE_ADD(UTC_TIMESTAMP(), INTERVAL :mins MINUTE)
       WHERE id = :id`,
      { attempts: next, mins: LOCKOUT_MINUTES, id: adminId },
    );
  } else {
    await execute(`UPDATE admin_users SET failed_attempts = :attempts WHERE id = :id`, {
      attempts: next,
      id: adminId,
    });
  }
}

export async function recordLoginSuccess(adminId: number) {
  await execute(
    `UPDATE admin_users SET failed_attempts = 0, locked_until = NULL, last_login_at = UTC_TIMESTAMP() WHERE id = :id`,
    { id: adminId },
  );
}

export async function writeAuditLog(input: {
  adminId?: number | null;
  action: string;
  entityType?: string;
  entityId?: string;
  details?: string;
  ip?: string | null;
}) {
  if (!isDatabaseConfigured()) return;
  await execute(
    `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details, ip_address, created_at)
     VALUES (:adminId, :action, :entityType, :entityId, :details, :ip, UTC_TIMESTAMP())`,
    {
      adminId: input.adminId ?? null,
      action: input.action,
      entityType: input.entityType ?? null,
      entityId: input.entityId ?? null,
      details: input.details ?? null,
      ip: input.ip ?? null,
    },
  );
}

export function isLocked(lockedUntil: Date | null | undefined): boolean {
  if (!lockedUntil) return false;
  return new Date(lockedUntil).getTime() > Date.now();
}
