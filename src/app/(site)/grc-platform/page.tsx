import { InterestForm } from "@/components/forms/InterestForm";
import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getSiteSettings } from "@/lib/content/resolver";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "FaizZab GRC Platform | In Development",
  description:
    "The FaizZab GRC Platform is in development — a future integrated environment for risk, controls, SoA, audit, evidence, CAPA, suppliers, incidents and compliance reporting.",
  path: "/grc-platform",
});

const capabilities = [
  "Risks",
  "SoA",
  "Treatments",
  "Audit",
  "Evidence",
  "CAPA",
  "Assets",
  "Suppliers",
  "Incidents",
  "Access",
  "Business Continuity",
  "Privacy",
  "KPI / KRI",
  "Management Review",
  "Reporting",
];

export default async function GrcPlatformPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        title="FaizZab GRC Platform"
        description={settings.platformSummary}
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "GRC Platform" }]} />
        }
      />
      <Section>
        <div className="mb-8">
          <StatusBadge status={settings.platformStatus} label={settings.platformStatusLabel} />
        </div>
        <SectionHeading
          title="Conceptual capability map"
          description="The platform is not currently available as operational SaaS. Capabilities below describe intended future modules. Future product access may be offered via app.faizzab.com when ready."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {capabilities.map((item) => (
              <div
                key={item}
                className="border border-[var(--border)] bg-[var(--surface)] px-3 py-4 text-center text-sm font-medium text-[var(--navy-900)]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="border border-[var(--border)] bg-white p-6">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
              Register Interest
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Share your interest in platform updates. No purchase or subscription is available yet.
            </p>
            <div className="mt-6">
              <InterestForm type="platform" submitLabel="Register Interest" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
