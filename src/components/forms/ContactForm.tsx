"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { trackEvent } from "@/lib/analytics/track";

const serviceOptions = [
  "General consultation",
  ...services.map((s) => s.shortTitle),
  "Academy updates",
  "GRC Platform interest",
];

export function ContactForm({
  defaultService,
  source = "contact",
}: {
  defaultService?: string;
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      organization: String(formData.get("organization") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      serviceInterest: String(formData.get("serviceInterest") || ""),
      message: String(formData.get("message") || ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") || ""),
      source,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Unable to submit your enquiry. Please try again later.");
        return;
      }

      trackEvent("contact_submission", { source });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Unable to submit your enquiry. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Organization" name="organization" required autoComplete="organization" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Business email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="serviceInterest" className="mb-1.5 block text-sm font-semibold text-[var(--navy-900)]">
          Service of interest
        </label>
        <select
          id="serviceInterest"
          name="serviceInterest"
          required
          defaultValue={defaultService || ""}
          className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-3 py-2.5 text-sm"
        >
          <option value="" disabled>
            Select an option
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-[var(--navy-900)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-3 py-2.5 text-sm"
        />
      </div>
      {/* Honeypot — leave empty */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-[var(--border-strong)]"
        />
        <label htmlFor="consent" className="text-sm text-[var(--text-muted)]">
          I consent to FaizZab processing this enquiry to respond to my request. See our{" "}
          <a href="/privacy" className="text-[var(--blue-600)]">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {status === "success" ? (
        <p className="rounded-[var(--radius-md)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]" role="status">
          Thank you. Your enquiry has been received. We will respond using the business email provided.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-[var(--navy-900)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={200}
        className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-3 py-2.5 text-sm"
      />
    </div>
  );
}
