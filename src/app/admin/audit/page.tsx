import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import { isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Admin Audit Log",
  description: "Admin audit log",
  path: "/admin/audit",
  noIndex: true,
});

interface AuditRow extends RowDataPacket {
  id: number;
  admin_id: number | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: string | null;
  ip_address: string | null;
  created_at: Date;
}

export default async function AdminAuditPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  if (session.role !== "super_admin") redirect("/admin");

  const rows = isDatabaseConfigured()
    ? (await queryRows<AuditRow[]>(
        `SELECT id, admin_id, action, entity_type, entity_id, details, ip_address, created_at
         FROM admin_audit_log ORDER BY created_at DESC LIMIT 200`,
      )) || []
    : [];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)]">
        Audit log
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Important administrative actions are recorded for accountability.
      </p>
      <div className="mt-6 overflow-x-auto border border-[var(--border)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface)] text-xs uppercase text-[var(--text-muted)]">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Admin</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Entity</th>
              <th className="px-3 py-2">Details</th>
              <th className="px-3 py-2">IP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--border)]">
                <td className="px-3 py-2 whitespace-nowrap">
                  {new Date(row.created_at).toLocaleString()}
                </td>
                <td className="px-3 py-2">{row.admin_id ?? "—"}</td>
                <td className="px-3 py-2">{row.action}</td>
                <td className="px-3 py-2">
                  {row.entity_type || "—"}
                  {row.entity_id ? ` / ${row.entity_id}` : ""}
                </td>
                <td className="px-3 py-2">{row.details || "—"}</td>
                <td className="px-3 py-2">{row.ip_address || "—"}</td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-[var(--text-muted)]">
                  No audit events yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
