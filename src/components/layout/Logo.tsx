import Link from "next/link";
import { company } from "@/content/company";

export function Logo({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 no-underline focus-visible:outline-offset-4 ${className}`}
      aria-label={`${company.brand} home`}
    >
      {/* Replace /public/logo.svg when a final trademark asset is available */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9"
        aria-hidden="true"
      />
      <span
        className={`font-[family-name:var(--font-display)] text-xl tracking-tight ${
          inverse ? "text-[var(--text-inverse)]" : "text-[var(--navy-900)]"
        }`}
      >
        {company.brand}
      </span>
    </Link>
  );
}
