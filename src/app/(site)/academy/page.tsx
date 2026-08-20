import { InterestForm } from "@/components/forms/InterestForm";
import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getSiteSettings } from "@/lib/content/resolver";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "FaizZab Academy | Practical Professional Learning (Coming Soon)",
  description:
    "FaizZab Academy is coming soon — hands-on labs, simulated organisations, audit exercises and practical assignments across GRC, ISO, cybersecurity, privacy and IT audit.",
  path: "/academy",
});

export default async function AcademyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        title="FaizZab Academy"
        description={settings.academySummary}
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Academy" }]} />
        }
      />
      <Section>
        <div className="mb-8">
          <StatusBadge status={settings.academyStatus} label={settings.academyStatusLabel} />
        </div>
        <SectionHeading
          title="Practical learning, designed for professionals"
          description="Academy programmes are not currently purchasable. Join the updates list to be notified when offerings launch. Future access may be available via academy.faizzab.com."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
              Learning model
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
              <li>Hands-on labs</li>
              <li>Simulated organisations</li>
              <li>Evidence-based exercises</li>
              <li>Audit scenarios</li>
              <li>Quizzes and practical assignments</li>
              <li>Certificates where applicable</li>
              <li>Career-oriented professional learning</li>
            </ul>
            <h3 className="mt-8 font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
              Possible future topics
            </h3>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-[var(--text-muted)] sm:grid-cols-2">
              {[
                "ISO/IEC 27001",
                "ISO/IEC 42001",
                "ISO/IEC 27701",
                "ISO 22301",
                "GRC",
                "ITGC",
                "SOX",
                "Risk Assessment",
                "Cybersecurity",
                "Privacy",
                "IT Application Controls",
              ].map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
              Notify Me When Academy Launches
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Register your interest. No payment is collected at this stage.
            </p>
            <div className="mt-6">
              <InterestForm type="academy" submitLabel="Join the Academy Updates List" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
