import nodemailer from "nodemailer";
import type { ContactPayload } from "@/types";
import { company } from "@/content/company";

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );
}

export async function sendContactEmail(payload: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  if (!isSmtpConfigured()) {
    return { ok: false, error: "Email delivery is not configured." };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  const to = process.env.CONTACT_TO_EMAIL || company.email;
  const from = process.env.CONTACT_FROM_EMAIL || company.email;

  const text = [
    "New website enquiry from faizzab.com",
    "",
    `Name: ${payload.name}`,
    `Organization: ${payload.organization}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Service of interest: ${payload.serviceInterest}`,
    "",
    "Message:",
    payload.message,
    "",
    `Consent given: ${payload.consent ? "Yes" : "No"}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: `Website enquiry — ${payload.organization} — ${payload.serviceInterest}`,
      text,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Unable to send message at this time." };
  }
}

export async function sendInterestEmail(input: {
  type: "academy" | "platform";
  name: string;
  email: string;
  organization?: string;
  message?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isSmtpConfigured()) {
    return { ok: false, error: "Email delivery is not configured." };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  const label = input.type === "academy" ? "Academy interest" : "GRC Platform interest";
  const text = [
    `${label} from faizzab.com`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organization: ${input.organization || "—"}`,
    "",
    input.message || "",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || company.email,
      to: process.env.CONTACT_TO_EMAIL || company.email,
      replyTo: input.email,
      subject: `${label} — ${input.name}`,
      text,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Unable to send message at this time." };
  }
}
