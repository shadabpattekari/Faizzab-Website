import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Dashboard",
  description: "FaizZab admin dashboard",
  path: "/admin",
  noIndex: true,
});

interface CountRow extends RowDataPacket {
  c: number;
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  let leadCount = 0;
  let newLeads = 0;
  let adminCount = 0;

  if (isDatabaseConfigured()) {
    const total = await queryRows<CountRow[]>(`SELECT COUNT(*) as c FROM website_leads`);
    const newest = await queryRows<CountRow[]>(
      `SELECT COUNT(*) as c FROM website_leads WHERE status = 'New'`,
    );
    const admins = await queryRows<CountRow[]>(`SELECT COUNT(*) as c FROM admin_users`);
    leadCount = total?.[0]?.c || 0;
    newLeads = newest?.[0]?.c || 0;
    adminCount = admins?.[0]?.c || 0;
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Dashboard
      </h1>
      <p className="mt-2 text-[var(--text-muted)]">
        Welcome, {session.name}. Manage website enquiries and content from this portal.
      </p>
      {!isDatabaseConfigured() ? (
        <p className="mt-4 rounded border border-[#e6d5a8] bg-[#fff8e8] px-4 py-3 text-sm text-[var(--warning)]">
          MySQL is not configured. Public pages still work from file-based content. Configure MYSQL_*
          environment variables, run the schema script, then bootstrap a Super Admin to enable
          persistence.
        </p>
      ) : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total enquiries" value={String(leadCount)} />
        <Stat label="New enquiries" value={String(newLeads)} />
        <Stat label="Admin users" value={String(adminCount)} />
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <QuickLink href="/admin/leads" title="Review enquiries" />
        <QuickLink href="/admin/settings" title="Academy / Platform status" />
        <QuickLink href="/admin/insights" title="Manage insights" />
        <QuickLink href="/admin/faqs" title="Manage FAQs" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--border)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[var(--navy-900)]">{value}</p>
    </div>
  );
}

function QuickLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--navy-900)] no-underline hover:border-[var(--navy-700)]"
    >
      {title}
    </Link>
  );
}
