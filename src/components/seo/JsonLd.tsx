import Link from "next/link";
import { company } from "@/content/company";

export function CorporateDetails({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
        Corporate Identity
      </h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-[var(--navy-900)]">Legal name</dt>
          <dd className="text-[var(--text-muted)]">{company.legalName}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--navy-900)]">CIN</dt>
          <dd className="text-[var(--text-muted)]">{company.cin}</dd>
        </div>
        {!compact ? (
          <>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Registered office</dt>
              <dd className="text-[var(--text-muted)]">{company.registeredOffice.full}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="text-[var(--blue-600)]">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Telephone</dt>
              <dd>
                <a href={`tel:${company.phoneTel}`} className="text-[var(--blue-600)]">
                  {company.phone}
                </a>
              </dd>
            </div>
          </>
        ) : null}
      </dl>
      <Link
        href="/corporate-information"
        className="mt-5 inline-flex text-sm font-semibold text-[var(--blue-600)]"
      >
        View corporate information
      </Link>
    </aside>
  );
}

export function LegalDisclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-10 border-l-2 border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)]">
      {children || (
        <p>
          Information on this website is general in nature and does not constitute legal, regulatory or audit advice.
          Requirements may change. Qualified professional advice should be obtained where appropriate.
        </p>
      )}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
