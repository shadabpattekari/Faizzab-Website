import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InsightCard } from "@/components/ui/Cards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getPublishedInsights } from "@/content/insights";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Insights | GRC, ISO, ITGC & Cybersecurity Articles",
  description:
    "Original FaizZab insights on audit-ready evidence culture, ISO 27001 scope, ITGC access reviews, privacy readiness and business continuity exercises.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getPublishedInsights();

  return (
    <>
      <PageHero
        title="Insights"
        description="Practical perspectives for professionals working on governance, risk, compliance and assurance."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
        }
      />
      <Section>
        <SectionHeading title="Latest articles" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
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
    </>
  );
}
