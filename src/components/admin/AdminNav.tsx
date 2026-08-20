"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Enquiries / Leads" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/seo", label: "SEO Overrides" },
  { href: "/admin/account", label: "Account" },
];

export function AdminNav({
  name,
  role,
  csrfToken,
}: {
  name: string;
  role: string;
  csrfToken: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csrfToken }),
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full border-b border-[var(--border)] bg-[var(--navy-950)] text-white md:w-64 md:border-b-0 md:border-r md:border-white/10">
      <div className="px-5 py-5">
        <p className="font-[family-name:var(--font-display)] text-xl">FaizZab Admin</p>
        <p className="mt-1 text-xs text-white/60">
          {name} · {role === "super_admin" ? "Super Admin" : "Content Editor"}
        </p>
      </div>
      <nav className="flex flex-wrap gap-1 px-3 pb-4 md:flex-col" aria-label="Admin">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-2 text-sm no-underline ${
                active ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {role === "super_admin" ? (
          <>
            <Link
              href="/admin/users"
              className={`rounded px-3 py-2 text-sm no-underline ${
                pathname === "/admin/users"
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10"
              }`}
            >
              Admin Users
            </Link>
            <Link
              href="/admin/audit"
              className={`rounded px-3 py-2 text-sm no-underline ${
                pathname === "/admin/audit"
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10"
              }`}
            >
              Audit Log
            </Link>
          </>
        ) : null}
        <button
          type="button"
          onClick={logout}
          className="mt-2 rounded px-3 py-2 text-left text-sm text-white/75 hover:bg-white/10"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
