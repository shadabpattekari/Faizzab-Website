import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import type { AdminRole } from "@/types";

export interface AdminSessionData {
  adminId?: number;
  email?: string;
  name?: string;
  role?: AdminRole;
  csrfToken?: string;
  isLoggedIn: boolean;
}

const sessionPassword =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SESSION_SECRET ||
  "dev-only-change-me-to-a-long-random-string-32chars";

export const sessionOptions: SessionOptions = {
  password: sessionPassword.length >= 32 ? sessionPassword : sessionPassword.padEnd(32, "0"),
  cookieName: "faizzab_admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  },
};

export async function getAdminSession() {
  const cookieStore = await cookies();
  return getIronSession<AdminSessionData>(cookieStore, sessionOptions);
}

export async function requireAdminSession(roles?: AdminRole[]) {
  const session = await getAdminSession();
  if (!session.isLoggedIn || !session.adminId || !session.role) {
    return { ok: false as const, session, status: 401 as const };
  }
  if (roles && !roles.includes(session.role)) {
    return { ok: false as const, session, status: 403 as const };
  }
  return { ok: true as const, session, status: 200 as const };
}

export function createCsrfToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
