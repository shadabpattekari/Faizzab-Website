import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/Hero";
import { LegalDisclaimer } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { getPublishedResources, getResource } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getPublishedResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return createPageMetadata({
    title: resource.seo.title,
    description: resource.seo.description,
    path: resource.seo.canonicalPath,
  });
}

const resourceBodies: Record<string, string[]> = {
  "iso-implementation-readiness-overview": [
    "Use this overview to structure early conversations about ISO-aligned management system readiness. It is not a substitute for a formal gap assessment.",
    "Typical readiness workstreams include clarifying scope and context, identifying interested parties, establishing risk assessment practices, drafting proportionate policies, aligning SoA thinking where relevant, preparing evidence routines and planning internal audit and management review cadence.",
    "Prioritise work based on organisational risk and contractual drivers. Avoid attempting every artefact at once without ownership.",
  ],
  "grc-operating-model-checklist": [
    "Confirm whether governance forums, decision rights and escalation paths are documented and used.",
    "Check whether risk and control registers have owners, review dates and clear status fields.",
    "Verify policy lifecycle ownership, issue/CAPA tracking and KPI/KRI reporting cadence.",
    "Assess whether evidence standards exist for key controls and whether audit readiness is planned rather than reactive.",
  ],
  "itgc-evidence-quality-guide": [
    "For logical access, retain complete populations, reviewer identity, review dates and evidence of access removal where required.",
    "For change management, ensure tickets show request, approval, testing evidence where applicable and deployment linkage.",
    "For computer operations, define which batch, job or monitoring artefacts demonstrate operating effectiveness for the period.",
    "Privileged access and segregation-of-duties reviews should clearly identify conflicting capabilities and remediation.",
  ],
  "privacy-governance-starter-checklist": [
    "Inventory systems and processes that handle personal data, including purposes and sharing arrangements.",
    "Confirm accountability for privacy decisions, requests and incident escalation.",
    "Review whether notices and internal policies match operational practice.",
    "Identify vendors processing personal data and the diligence expected by criticality.",
    "Validate legal interpretation with qualified counsel where appropriate.",
  ],
  "cyber-risk-workshop-outline": [
    "Opening: agree critical business services and success criteria for the workshop.",
    "Asset and dependency mapping: systems, data classes, suppliers and recovery constraints.",
    "Scenario discussion: prioritise threats that interrupt value delivery.",
    "Treatment decisions: owners, actions, residual risk and reporting.",
    "Close: confirm follow-up dates and leadership reporting format.",
  ],
  "business-continuity-exercise-planner": [
    "Select one critical activity and a plausible disruption scenario.",
    "Define participants, decision rights and communication channels to be tested.",
    "Include supplier and technology recovery assumptions explicitly.",
    "Capture observations, owned actions and deadlines.",
    "Feed lessons into continuity plans and the risk register.",
  ],
};

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  const body = resourceBodies[slug] || [resource.description];

  return (
    <>
      <PageHero
        title={resource.title}
        description={resource.description}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: resource.title },
            ]}
          />
        }
      />
      <Section>
        <article className="max-w-3xl space-y-4 text-[var(--text-muted)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--blue-600)]">
            {resource.category} · {resource.type}
          </p>
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <LegalDisclaimer />
          <p className="pt-4">
            <Link href="/resources" className="text-sm font-semibold text-[var(--blue-600)]">
              Back to resources
            </Link>
          </p>
        </article>
      </Section>
    </>
  );
}
