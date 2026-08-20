import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/sections/Hero";
import { LegalDisclaimer } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getRelatedServices, getService, services } from "@/content/services";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createPageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: service.seo.canonicalPath,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedSlugs);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ])}
      />
      <PageHero
        title={service.title}
        description={service.summary}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.shortTitle },
            ]}
          />
        }
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr]">
          <article className="space-y-10">
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                Overview
              </h2>
              <p className="mt-3 text-[var(--text-muted)]">{service.overview}</p>
            </section>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                Typical business challenges
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
                {service.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                What FaizZab can support
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
                {service.supportAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                Delivery approach
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--text-muted)]">
                {service.deliveryApproach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                Typical deliverables
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                Business value
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
                {service.businessValue.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            {service.disclaimer ? <LegalDisclaimer>{service.disclaimer}</LegalDisclaimer> : null}
          </article>
          <aside className="space-y-6">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--navy-900)]">
                Related services
              </h2>
              <ul className="mt-3 space-y-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`} className="text-sm text-[var(--blue-600)]">
                      {item.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--border)] bg-white p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--navy-900)]">
                Next step
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Discuss how this service area may apply to your organisation.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex rounded-[var(--radius-md)] bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white no-underline"
              >
                Request a Consultation
              </Link>
            </div>
          </aside>
        </div>
      </Section>
      <CtaBand
        title="Ready to discuss this service area?"
        primary={{ href: "/contact", label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "All services" }}
      />
    </>
  );
}
