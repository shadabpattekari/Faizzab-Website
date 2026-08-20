import Link from "next/link";
import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getPublishedResources, resourceCategories } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Resources | ISO, GRC, Cybersecurity & Privacy Guides",
  description:
    "FaizZab resources covering ISO, GRC, cybersecurity, IT audit, SOX / ITGC, risk, privacy and business continuity — practical overviews and checklists.",
  path: "/resources",
});

export default function ResourcesPage() {
  const items = getPublishedResources();

  return (
    <>
      <PageHero
        title="Resources"
        description="Practical overviews and checklists to support governance, risk and compliance conversations. These materials are general information, not legal or certification advice."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
        }
      />
      <Section>
        <SectionHeading title="Browse by category" />
        <div className="mb-10 flex flex-wrap gap-2">
          {resourceCategories.map((cat) => (
            <span
              key={cat}
              className="rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--navy-900)]"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="border border-[var(--border)] bg-white p-6 no-underline transition-colors hover:border-[var(--navy-700)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--blue-600)]">
                {resource.category} · {resource.type}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
                {resource.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{resource.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-sm text-[var(--text-muted)]">
          Looking for longer-form perspectives? Visit{" "}
          <Link href="/insights" className="text-[var(--blue-600)]">
            Insights
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
