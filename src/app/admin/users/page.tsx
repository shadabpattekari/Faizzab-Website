import { redirect } from "next/navigation";
import { UsersClient } from "@/components/admin/UsersClient";
import { getAdminSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Users",
  description: "Manage admin users",
  path: "/admin/users",
  noIndex: true,
});

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  if (session.role !== "super_admin") redirect("/admin");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Admin users
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Super Admin only. Passwords are stored as bcrypt hashes. There is no public registration.
      </p>
      <div className="mt-6">
        <UsersClient csrfToken={session.csrfToken || ""} />
      </div>
    </div>
  );
}
