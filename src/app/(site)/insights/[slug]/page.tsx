import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/Hero";
import { JsonLd, LegalDisclaimer } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { getInsight, getPublishedInsights } from "@/content/insights";
import { articleJsonLd, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getPublishedInsights().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
          articleJsonLd({
            title: article.title,
            description: article.description,
            path: `/insights/${article.slug}`,
            datePublished: article.publishedDate,
            dateModified: article.updatedDate,
          }),
        ]}
      />
      <PageHero
        title={article.title}
        description={article.description}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: article.title },
            ]}
          />
        }
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--blue-600)]">{article.category}</span>
            <time dateTime={article.publishedDate}>Published {article.publishedDate}</time>
            <span>{article.readingTimeMinutes} min read</span>
            <span>By {article.author}</span>
          </div>
          <div className="mt-10 space-y-8">
            {article.headings.map((heading, index) => (
              <section key={heading}>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                  {heading}
                </h2>
                <p className="mt-3 text-[var(--text-muted)]">{article.body[index]}</p>
              </section>
            ))}
          </div>
          <LegalDisclaimer />
          <p className="mt-8">
            <Link href="/insights" className="text-sm font-semibold text-[var(--blue-600)]">
              Back to insights
            </Link>
          </p>
        </article>
      </Section>
    </>
  );
}
