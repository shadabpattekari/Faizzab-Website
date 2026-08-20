"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AccountPasswordForm({ csrfToken }: { csrfToken: string }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csrfToken,
        currentPassword: fd.get("currentPassword"),
        newPassword: fd.get("newPassword"),
      }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setError(data.error || "Unable to update password.");
      return;
    }
    setMessage("Password updated.");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3 border border-[var(--border)] bg-white p-5">
      <h2 className="font-semibold text-[var(--navy-900)]">Change password</h2>
      <input
        name="currentPassword"
        type="password"
        required
        placeholder="Current password"
        className="w-full rounded border px-3 py-2 text-sm"
      />
      <input
        name="newPassword"
        type="password"
        required
        placeholder="New strong password"
        className="w-full rounded border px-3 py-2 text-sm"
      />
      {message ? <p className="text-sm text-[var(--accent)]">{message}</p> : null}
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <Button type="submit">Update password</Button>
    </form>
  );
}
