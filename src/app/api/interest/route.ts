import { z } from "zod";
import { storeLead } from "@/lib/db/leads";
import { isDatabaseConfigured } from "@/lib/db/mysql";
import { isSmtpConfigured, sendInterestEmail } from "@/lib/email/smtp";
import { getClientIp, rateLimit, sanitizePlainText } from "@/lib/security/rate-limit";

const schema = z.object({
  type: z.enum(["academy", "platform"]),
  name: z.string().min(2).max(200),
  email: z.string().email().max(200),
  organization: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  website: z.string().max(200).optional(),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`interest:${ip}`, 8, 15 * 60 * 1000);
    if (!limited.allowed) {
      return Response.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ ok: false, error: "Please check the required fields." }, { status: 400 });
    }

    if (parsed.data.website?.trim()) {
      return Response.json({ ok: true });
    }

    const name = sanitizePlainText(parsed.data.name, 200);
    const email = sanitizePlainText(parsed.data.email, 200).toLowerCase();
    const organization = sanitizePlainText(parsed.data.organization || "", 200);
    const message = sanitizePlainText(parsed.data.message || "", 2000);

    const smtpReady = isSmtpConfigured();
    const dbReady = isDatabaseConfigured();
    if (!smtpReady && !dbReady) {
      return Response.json(
        { ok: false, error: "Unable to submit. Please email info@faizzab.com." },
        { status: 503 },
      );
    }

    let emailed = false;
    if (smtpReady) {
      const result = await sendInterestEmail({
        type: parsed.data.type,
        name,
        email,
        organization,
        message,
      });
      emailed = result.ok;
    }

    let stored = false;
    if (dbReady) {
      const result = await storeLead(
        {
          name,
          organization: organization || "—",
          email,
          serviceInterest:
            parsed.data.type === "academy" ? "Academy updates" : "GRC Platform interest",
          message: message || `${parsed.data.type} interest registration`,
          consent: true,
        },
        parsed.data.type === "academy" ? "academy_interest" : "platform_interest",
      );
      stored = result.stored;
    }

    if (!emailed && !stored) {
      return Response.json(
        { ok: false, error: "Unable to submit. Please try again later." },
        { status: 503 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Unable to submit. Please try again later." }, { status: 500 });
  }
}
