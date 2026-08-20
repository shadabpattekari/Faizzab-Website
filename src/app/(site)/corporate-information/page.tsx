import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Corporate Information",
  description:
    "Corporate information for FAIZZAB INTEGRITY PRIVATE LIMITED — CIN U62020PN2026PTC259388, registered office in Pune, Maharashtra, India.",
  path: "/corporate-information",
});

export default function CorporateInformationPage() {
  return (
    <>
      <PageHero
        title="Corporate Information"
        description="Official legal entity details for FAIZZAB INTEGRITY PRIVATE LIMITED."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Corporate Information" }]}
          />
        }
      />
      <Section>
        <div className="max-w-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
            {company.legalName}
          </h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">CIN</dt>
              <dd className="mt-1 text-[var(--text-muted)]">{company.cin}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Registered office</dt>
              <dd className="mt-1 text-[var(--text-muted)]">{company.registeredOffice.full}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${company.email}`} className="text-[var(--blue-600)]">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Telephone</dt>
              <dd className="mt-1">
                <a href={`tel:${company.phoneTel}`} className="text-[var(--blue-600)]">
                  {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Queries / Grievances</dt>
              <dd className="mt-1 text-[var(--text-muted)]">
                {company.grievances.name}, {company.grievances.designation}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Brand</dt>
              <dd className="mt-1 text-[var(--text-muted)]">{company.brand}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--navy-900)]">Domain</dt>
              <dd className="mt-1 text-[var(--text-muted)]">{company.domain}</dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
