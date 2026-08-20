import { redirect } from "next/navigation";
import { AccountPasswordForm } from "@/components/admin/AccountPasswordForm";
import { getAdminSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Account",
  description: "Admin account settings",
  path: "/admin/account",
  noIndex: true,
});

export default async function AdminAccountPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Account
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Signed in as {session.email} ({session.role === "super_admin" ? "Super Admin" : "Content Editor"}).
      </p>
      <div className="mt-6">
        <AccountPasswordForm csrfToken={session.csrfToken || ""} />
      </div>
    </div>
  );
}
