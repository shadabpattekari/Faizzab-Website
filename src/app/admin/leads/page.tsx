import { redirect } from "next/navigation";
import { LeadsClient } from "@/components/admin/LeadsClient";
import { getAdminSession } from "@/lib/auth/session";
import { listLeads } from "@/lib/db/leads";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Leads",
  description: "Website enquiries",
  path: "/admin/leads",
  noIndex: true,
});

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  const leads = await listLeads();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Enquiries / Leads
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Contact-form submissions are private and not exposed on the public website.
      </p>
      <div className="mt-6">
        <LeadsClient initialLeads={JSON.parse(JSON.stringify(leads))} csrfToken={session.csrfToken || ""} />
      </div>
    </div>
  );
}
