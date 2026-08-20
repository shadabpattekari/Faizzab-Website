import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServiceCard({
  title,
  summary,
  href,
}: {
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-[var(--border)] bg-[var(--surface-elevated)] p-6 no-underline transition-colors hover:border-[var(--navy-700)]"
    >
      <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue-600)]">
        Explore service
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function CapabilityCard({ label }: { label: string }) {
  return (
    <div className="border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white/90">
      {label}
    </div>
  );
}

export function PillarCard({
  title,
  statusLabel,
  status,
  description,
  href,
  cta,
}: {
  title: string;
  statusLabel: string;
  status: string;
  description: string;
  href: string;
  cta: string;
}) {
  const badge =
    status === "available"
      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
      : status === "coming_soon"
        ? "bg-[var(--blue-100)] text-[var(--blue-600)]"
        : "bg-[#f3eee3] text-[var(--warning)]";

  return (
    <Link
      href={href}
      className="flex h-full flex-col border border-[var(--border)] bg-[var(--surface-elevated)] p-6 no-underline transition-colors hover:border-[var(--navy-700)]"
    >
      <span className={`mb-4 inline-flex w-fit rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold ${badge}`}>
        {statusLabel}
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
      <span className="mt-5 text-sm font-semibold text-[var(--blue-600)]">{cta}</span>
    </Link>
  );
}

export function IndustryCard({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <div className="border-l-2 border-[var(--blue-600)] bg-[var(--surface)] py-5 pl-5 pr-4">
      <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--navy-900)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{summary}</p>
    </div>
  );
}

export function InsightCard({
  title,
  description,
  category,
  href,
  date,
}: {
  title: string;
  description: string;
  category: string;
  href: string;
  date: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-[var(--border)] bg-white p-6 no-underline transition-colors hover:border-[var(--navy-700)]"
    >
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--blue-600)]">
        <span>{category}</span>
        <time dateTime={date}>{date}</time>
      </div>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)] group-hover:text-[var(--blue-600)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
    </Link>
  );
}
