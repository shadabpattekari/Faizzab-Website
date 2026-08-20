import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getAdminSession } from "@/lib/auth/session";
import { getSiteSettings } from "@/lib/content/resolver";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Site Settings",
  description: "Manage Academy, Platform and homepage settings",
  path: "/admin/settings",
  noIndex: true,
});

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Site settings
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Update Academy status, GRC Platform status, homepage announcement and social links.
      </p>
      <div className="mt-6 max-w-3xl border border-[var(--border)] bg-white p-6">
        <SettingsForm settings={settings} csrfToken={session.csrfToken || ""} />
      </div>
    </div>
  );
}
