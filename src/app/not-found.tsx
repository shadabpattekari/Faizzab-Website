import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--blue-600)]">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--navy-900)]">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-[var(--text-muted)]">
        The page you requested is unavailable. It may have been moved or the link may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Return home</ButtonLink>
        <Link href="/contact" className="self-center text-sm font-semibold text-[var(--blue-600)]">
          Contact FaizZab
        </Link>
      </div>
    </section>
  );
}
