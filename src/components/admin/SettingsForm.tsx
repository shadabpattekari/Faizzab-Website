"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types";

export function SettingsForm({
  settings,
  csrfToken,
}: {
  settings: SiteSettings;
  csrfToken: string;
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csrfToken,
        academyStatus: fd.get("academyStatus"),
        academyStatusLabel: fd.get("academyStatusLabel"),
        academySummary: fd.get("academySummary"),
        platformStatus: fd.get("platformStatus"),
        platformStatusLabel: fd.get("platformStatusLabel"),
        platformSummary: fd.get("platformSummary"),
        homepageAnnouncement: fd.get("homepageAnnouncement"),
        socialLinkedin: fd.get("socialLinkedin"),
        socialTwitter: fd.get("socialTwitter"),
        contactEmail: fd.get("contactEmail"),
        contactPhone: fd.get("contactPhone"),
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error || "Unable to save settings.");
      return;
    }
    setMessage("Settings saved.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <fieldset className="space-y-3">
        <legend className="font-semibold text-[var(--navy-900)]">Academy</legend>
        <select
          name="academyStatus"
          defaultValue={settings.academyStatus}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        >
          <option value="coming_soon">Coming Soon</option>
          <option value="available">Available</option>
          <option value="in_development">In Development</option>
        </select>
        <input
          name="academyStatusLabel"
          defaultValue={settings.academyStatusLabel}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
          placeholder="Status label"
        />
        <textarea
          name="academySummary"
          defaultValue={settings.academySummary}
          rows={4}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="font-semibold text-[var(--navy-900)]">GRC Platform</legend>
        <select
          name="platformStatus"
          defaultValue={settings.platformStatus}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        >
          <option value="in_development">In Development</option>
          <option value="coming_soon">Coming Soon</option>
          <option value="available">Available</option>
        </select>
        <input
          name="platformStatusLabel"
          defaultValue={settings.platformStatusLabel}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
        <textarea
          name="platformSummary"
          defaultValue={settings.platformSummary}
          rows={4}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
      </fieldset>
      <div>
        <label className="mb-1 block text-sm font-semibold">Homepage announcement</label>
        <input
          name="homepageAnnouncement"
          defaultValue={settings.homepageAnnouncement}
          className="w-full rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="socialLinkedin"
          defaultValue={settings.socialLinks.linkedin || ""}
          placeholder="LinkedIn URL"
          className="rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
        <input
          name="socialTwitter"
          defaultValue={settings.socialLinks.twitter || ""}
          placeholder="X / Twitter URL"
          className="rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="contactEmail"
          defaultValue={settings.contactOverrides?.email || ""}
          placeholder="Contact email override (optional)"
          className="rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
        <input
          name="contactPhone"
          defaultValue={settings.contactOverrides?.phone || ""}
          placeholder="Contact phone override (optional)"
          className="rounded border border-[var(--border-strong)] px-3 py-2 text-sm"
        />
      </div>
      {message ? <p className="text-sm text-[var(--accent)]">{message}</p> : null}
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <Button type="submit">Save settings</Button>
    </form>
  );
}
