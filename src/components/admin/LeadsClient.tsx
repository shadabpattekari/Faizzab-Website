"use client";

import { useMemo, useState } from "react";
import type { LeadStatus } from "@/types";

interface Lead {
  id: number;
  name: string;
  organization: string;
  email: string;
  phone: string | null;
  service_interest: string;
  message: string;
  status: LeadStatus;
  source: string;
  created_at: string;
}

const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Closed", "Spam"];

export function LeadsClient({
  initialLeads,
  csrfToken,
}: {
  initialLeads: Lead[];
  csrfToken: string;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [status, setStatus] = useState<string>("");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (status && lead.status !== status) return false;
      if (!q) return true;
      const hay = `${lead.name} ${lead.organization} ${lead.email} ${lead.service_interest}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [leads, status, q]);

  async function updateStatus(id: number, next: LeadStatus) {
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next, csrfToken }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: next } : l)));
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, organisation, email…"
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm md:max-w-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto border border-[var(--border)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
            <tr>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Organization</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-t border-[var(--border)] align-top">
                <td className="px-3 py-3 whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleString()}
                </td>
                <td className="px-3 py-3">
                  <div className="font-medium">{lead.name}</div>
                  <div className="mt-1 max-w-xs text-xs text-[var(--text-muted)]">{lead.message}</div>
                </td>
                <td className="px-3 py-3">{lead.organization}</td>
                <td className="px-3 py-3">
                  <div>{lead.email}</div>
                  <div className="text-xs text-[var(--text-muted)]">{lead.phone || "—"}</div>
                </td>
                <td className="px-3 py-3">{lead.service_interest}</td>
                <td className="px-3 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className="rounded border border-[var(--border)] px-2 py-1 text-xs"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-[var(--text-muted)]">
                  No enquiries found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
