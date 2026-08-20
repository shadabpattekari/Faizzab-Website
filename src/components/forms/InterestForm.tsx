"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/track";

export function InterestForm({
  type,
  submitLabel,
}: {
  type: "academy" | "platform";
  submitLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      type,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      organization: String(fd.get("organization") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      consent: fd.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Unable to submit. Please try again later.");
        return;
      }
      trackEvent(type === "academy" ? "academy_interest" : "platform_interest");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Unable to submit. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${type}-name`} className="mb-1.5 block text-sm font-semibold">
            Name
          </label>
          <input
            id={`${type}-name`}
            name="name"
            required
            maxLength={200}
            className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor={`${type}-email`} className="mb-1.5 block text-sm font-semibold">
            Business email
          </label>
          <input
            id={`${type}-email`}
            name="email"
            type="email"
            required
            maxLength={200}
            className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3 py-2.5 text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${type}-org`} className="mb-1.5 block text-sm font-semibold">
          Organization (optional)
        </label>
        <input
          id={`${type}-org`}
          name="organization"
          maxLength={200}
          className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3 py-2.5 text-sm"
        />
      </div>
      <div>
        <label htmlFor={`${type}-message`} className="mb-1.5 block text-sm font-semibold">
          Message (optional)
        </label>
        <textarea
          id={`${type}-message`}
          name="message"
          rows={3}
          maxLength={2000}
          className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3 py-2.5 text-sm"
        />
      </div>
      <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
        <input type="checkbox" name="consent" required className="mt-1" />
        I consent to being contacted about this update request.
      </label>
      {status === "success" ? (
        <p className="text-sm text-[var(--accent)]" role="status">
          Thank you. Your interest has been recorded.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : submitLabel}
      </Button>
    </form>
  );
}
