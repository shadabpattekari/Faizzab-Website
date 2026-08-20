import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { company, footerLinks } from "@/content/company";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy-950)] text-[var(--text-inverse)]">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo inverse />
          <p className="mt-4 text-sm leading-relaxed text-white/70">{company.legalName}</p>
          <p className="mt-2 text-sm text-white/60">CIN: {company.cin}</p>
          <p className="mt-2 text-sm text-white/60">{company.locationShort}</p>
          <p className="mt-4 text-sm">
            <a className="text-white/85 no-underline hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a className="text-white/85 no-underline hover:underline" href={`tel:${company.phoneTel}`}>
              {company.phone}
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">Explore</h2>
          <ul className="mt-4 space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 no-underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">Legal</h2>
          <ul className="mt-4 space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 no-underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">Positioning</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{company.tagline}</p>
          <p className="mt-4 text-sm text-white/60">
            Consulting available. Academy coming soon. GRC Platform in development.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {company.copyrightYear} {company.legalName}. All rights reserved.
          </p>
          <p>Canonical site: https://faizzab.com</p>
        </div>
      </div>
    </footer>
  );
}
