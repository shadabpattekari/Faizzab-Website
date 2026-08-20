import { CtaBand, PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/ui/Cards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Services | GRC, ISO, Cybersecurity & IT Audit Consulting",
  description:
    "FaizZab consulting services: ISO management systems, GRC, cybersecurity, IT audit, SOX / ITGC, risk, privacy, internal audit, business continuity and third-party risk.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        title="Consulting services"
        description="Capability-focused consulting for organisations seeking practical implementation, audit readiness and structured governance. Outcomes depend on organisational context; we do not guarantee certification or compliance results."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        }
      />
      <Section>
        <SectionHeading
          title="Service catalogue"
          description="Select a service area to review typical challenges, support scope, delivery approach and deliverables."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.shortTitle}
              summary={service.summary}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>
      </Section>
      <CtaBand
        title="Request a consultation"
        description="Tell us about your ISO, GRC, cybersecurity or ITGC priorities."
        primary={{ href: "/contact", label: "Request a Consultation" }}
      />
    </>
  );
}
