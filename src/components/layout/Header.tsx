"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navItems } from "@/content/company";
import { trackEvent } from "@/lib/analytics/track";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(247,248,250,0.92)] backdrop-blur-md">
      <div className="container-site flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm no-underline transition-colors ${
                  active
                    ? "bg-[var(--blue-100)] font-semibold text-[var(--navy-900)]"
                    : "text-[var(--text-muted)] hover:text-[var(--navy-900)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink
            href="/contact"
            onClick={() => trackEvent("consultation_cta", { location: "header" })}
          >
            Request Consultation
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] p-2 text-[var(--navy-900)] lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div id={menuId} className="border-t border-[var(--border)] bg-white lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[var(--radius-sm)] px-3 py-3 text-base text-[var(--navy-900)] no-underline hover:bg-[var(--blue-100)]"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/contact"
              className="mt-3 w-full"
              onClick={() => trackEvent("consultation_cta", { location: "mobile_header" })}
            >
              Request Consultation
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
