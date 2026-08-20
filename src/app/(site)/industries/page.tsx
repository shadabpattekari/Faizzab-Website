import { CtaBand, PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { industries } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Industries | Flexible GRC & Security Methodology",
  description:
    "FaizZab designs methodology to accommodate sector-specific risk, technology and compliance requirements across technology, financial services, healthcare, professional services and growing SMEs.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industries"
        description="We design our methodology to accommodate sector-specific risk, technology and compliance requirements. Sector examples describe adaptability—not named customers or existing engagements."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
        }
      />
      <Section>
        <SectionHeading
          title="Sector-aware delivery"
          description="Solutions designed to adapt to different organizational and regulatory environments."
        />
        <div className="space-y-8">
          {industries.map((industry) => (
            <article
              key={industry.slug}
              className="grid gap-4 border-b border-[var(--border)] pb-8 md:grid-cols-[0.9fr_1.1fr]"
            >
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                  {industry.title}
                </h2>
                <p className="mt-3 text-[var(--text-muted)]">{industry.summary}</p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
                {industry.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Discuss your organisational context"
        primary={{ href: "/contact", label: "Request a Consultation" }}
      />
    </>
  );
}
