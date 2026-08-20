"use client";

type EventName =
  | "consultation_cta"
  | "contact_submission"
  | "academy_interest"
  | "platform_interest";

/**
 * Optional analytics abstraction. No trackers load unless NEXT_PUBLIC_ANALYTICS_ID is set.
 */
export function trackEvent(name: EventName, payload?: Record<string, string>) {
  try {
    const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
    if (!id) return;
    // Reserved for future analytics provider wiring.
    if (typeof window !== "undefined") {
      const w = window as Window & { faizzabTrack?: (n: string, p?: Record<string, string>) => void };
      w.faizzabTrack?.(name, payload);
    }
  } catch {
    // Analytics must never break the site.
  }
}
