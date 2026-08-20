import Link from "next/link";
import { CtaBand, Hero } from "@/components/sections/Hero";
import {
  CapabilityCard,
  IndustryCard,
  InsightCard,
  PillarCard,
  ServiceCard,
} from "@/components/ui/Cards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { approachSteps, capabilities, company } from "@/content/company";
import { getFeaturedInsights } from "@/content/insights";
import { services } from "@/content/services";
import { industries } from "@/content/site";
import { getSiteSettings } from "@/lib/content/resolver";
import { createPageMetadata, professionalServiceJsonLd } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Governance. Risk. Compliance. Built for Practical Implementation.",
  description: company.supporting,
  path: "/",
});

export default async function HomePage() {
  const settings = await getSiteSettings();
  const featured = getFeaturedInsights().slice(0, 3);

  return (
    <>
      <JsonLd data={professionalServiceJsonLd()} />
      {settings.homepageAnnouncement ? (
        <div className="bg-[var(--navy-800)] px-4 py-2.5 text-center text-sm text-white/90">
          {settings.homepageAnnouncement}
        </div>
      ) : null}
      <Hero
        brand={company.brand}
        title={company.tagline}
        description={company.supporting}
        primaryCta={{ href: "/contact", label: "Request a Consultation" }}
        secondaryCta={{ href: "/services", label: "Explore Our Services" }}
      />

      <section className="bg-[var(--navy-900)] py-8" aria-label="Capabilities">
        <div className="container-site grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
          {capabilities.map((item) => (
            <CapabilityCard key={item} label={item} />
          ))}
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Why FaizZab"
          title="Practical implementation with audit-ready thinking"
          description="We help organisations move from documentation to operational compliance—structured governance, evidence-driven delivery and business-aligned controls."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Practical implementation",
              text: "Controls and documentation designed to match how work actually happens.",
            },
            {
              title: "Audit-ready thinking",
              text: "Evidence quality and ownership built into delivery—not bolted on later.",
            },
            {
              title: "Structured governance",
              text: "Clear accountability, registers and review rhythms leadership can sustain.",
            },
            {
              title: "Evidence-driven approach",
              text: "Artefacts and routines that support ISO, IT audit and GRC conversations.",
            },
            {
              title: "Business-aligned compliance",
              text: "Priorities based on risk and operating context—not generic templates alone.",
            },
            {
              title: "Scalable foundations",
              text: "Right-sized for growing organisations, with room to mature over time.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-[var(--border)] pt-5">
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--navy-900)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Services"
          title="Consulting support across governance, risk and compliance"
          description="Explore capability areas available through FaizZab consulting engagements."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.shortTitle}
              summary={service.summary}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/services" className="text-sm font-semibold text-[var(--blue-600)]">
            View all services
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Ecosystem"
          title="Three connected pillars"
          description="Consulting is available today. Academy and the GRC Platform are future offerings in the FaizZab ecosystem."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <PillarCard
            title="Consulting"
            status="available"
            statusLabel="Available"
            description="ISO implementation, GRC, cybersecurity governance, IT audit, SOX / ITGC, risk, privacy, continuity and supplier security support."
            href="/services"
            cta="Request a Consultation"
          />
          <PillarCard
            title="FaizZab Academy"
            status={settings.academyStatus}
            statusLabel={settings.academyStatusLabel}
            description={settings.academySummary}
            href="/academy"
            cta="Explore What's Coming"
          />
          <PillarCard
            title="FaizZab GRC Platform"
            status={settings.platformStatus}
            statusLabel={settings.platformStatusLabel}
            description={settings.platformSummary}
            href="/grc-platform"
            cta="Register Interest"
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Industries"
          title="Solutions designed to adapt"
          description="Solutions designed to adapt to different organizational and regulatory environments. Sector examples below do not imply existing named clients."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} title={industry.title} summary={industry.summary} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/industries" className="text-sm font-semibold text-[var(--blue-600)]">
            Explore industry approach
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Approach"
          title="A structured delivery lifecycle"
          description="Understand → Assess → Design → Implement → Evidence → Review → Improve"
        />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {approachSteps.map((step, index) => (
            <li
              key={step.key}
              className="border border-[var(--border)] bg-white px-4 py-5 text-center"
            >
              <span className="block text-xs font-semibold text-[var(--blue-600)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-sm font-semibold text-[var(--navy-900)]">
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {featured.length ? (
        <Section tone="muted">
          <SectionHeading
            eyebrow="Insights"
            title="Practical perspectives on GRC and assurance"
            description="Original articles on evidence culture, ISO scope, ITGC practices and more."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((article) => (
              <InsightCard
                key={article.slug}
                title={article.title}
                description={article.description}
                category={article.category}
                href={`/insights/${article.slug}`}
                date={article.publishedDate}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Strengthen Your Governance and Compliance Foundation"
        description="Discuss ISO, GRC, cybersecurity, ITGC or privacy readiness with FaizZab."
        primary={{ href: "/contact", label: "Request Consultation" }}
        secondary={{ href: "/about", label: "About FaizZab" }}
      />
    </>
  );
}
