import { z } from "zod";
import { storeLead } from "@/lib/db/leads";
import { isSmtpConfigured, sendContactEmail } from "@/lib/email/smtp";
import { isDatabaseConfigured } from "@/lib/db/mysql";
import { getClientIp, rateLimit, sanitizePlainText } from "@/lib/security/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  organization: z.string().min(2).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal("")),
  serviceInterest: z.string().min(2).max(200),
  message: z.string().min(10).max(4000),
  consent: z.literal(true),
  website: z.string().max(200).optional(),
  source: z.string().max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 50_000) {
      return Response.json({ ok: false, error: "Request too large." }, { status: 413 });
    }

    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
    if (!limited.allowed) {
      return Response.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { ok: false, error: "Please check the required fields and try again." },
        { status: 400 },
      );
    }

    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return Response.json({ ok: true });
    }

    const payload = {
      name: sanitizePlainText(parsed.data.name, 200),
      organization: sanitizePlainText(parsed.data.organization, 200),
      email: sanitizePlainText(parsed.data.email, 200).toLowerCase(),
      phone: sanitizePlainText(parsed.data.phone || "", 40) || undefined,
      serviceInterest: sanitizePlainText(parsed.data.serviceInterest, 200),
      message: sanitizePlainText(parsed.data.message, 4000),
      consent: true as const,
    };

    const smtpReady = isSmtpConfigured();
    const dbReady = isDatabaseConfigured();

    if (!smtpReady && !dbReady) {
      return Response.json(
        { ok: false, error: "Unable to submit your enquiry. Please email info@faizzab.com." },
        { status: 503 },
      );
    }

    let emailed = false;
    if (smtpReady) {
      const emailResult = await sendContactEmail(payload);
      emailed = emailResult.ok;
    }

    let stored = false;
    if (dbReady) {
      const result = await storeLead(payload, parsed.data.source || "contact_form");
      stored = result.stored;
    }

    if (!emailed && !stored) {
      return Response.json(
        {
          ok: false,
          error: "Unable to submit your enquiry. Please try again later or email info@faizzab.com.",
        },
        { status: 503 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to submit your enquiry. Please try again later." },
      { status: 500 },
    );
  }
}
