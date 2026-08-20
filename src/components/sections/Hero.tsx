import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function Hero({
  brand,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  brand: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  return (
    <section className="hero-grid relative min-h-[88vh] overflow-hidden text-[var(--text-inverse)]">
      <div className="container-site relative z-10 flex min-h-[88vh] flex-col justify-center py-24 md:py-28">
        <p className="fade-up mb-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
          {brand}
        </p>
        <h1 className="fade-up-delay max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-snug text-white/95 md:text-3xl lg:text-[2.15rem]">
          {title}
        </h1>
        <p className="fade-up-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          {description}
        </p>
        <div className="fade-up-delay-2 mt-8 flex flex-wrap gap-3">
          <ButtonLink href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </ButtonLink>
          {secondaryCta ? (
            <ButtonLink href={secondaryCta.href} variant="inverse">
              {secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(120deg,transparent,rgba(42,102,181,0.12))] md:block"
        aria-hidden
      />
    </section>
  );
}

export function PageHero({
  title,
  description,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#f7f8fa_0%,#ffffff_100%)] pt-10 pb-12 md:pt-12 md:pb-14">
      <div className="container-site">
        {breadcrumbs}
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--navy-900)] md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-base text-[var(--text-muted)] md:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <SectionTone>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-white md:text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-white/75">{description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primary.href} variant="primary">
            {primary.label}
          </ButtonLink>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-white/40 px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </SectionTone>
  );
}

function SectionTone({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[var(--navy-900)] py-14 md:py-16">
      <div className="container-site">{children}</div>
    </section>
  );
}
