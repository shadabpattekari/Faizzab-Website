import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Disclaimer",
  description: `Professional disclaimer for information published by ${company.legalName} on faizzab.com.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="Disclaimer"
        description="Important information about the nature of content published on this website."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
        }
      />
      <Section>
        {/* LEGAL_REVIEW_REQUIRED */}
        <div className="prose-legal max-w-3xl space-y-4">
          <p>
            Information on this website is provided as general information about {company.legalName}{" "}
            and related topics in governance, risk, compliance, information security and
            professional learning.
          </p>
          <h2>Not legal advice</h2>
          <p>
            Website content does not constitute legal advice. Legal, regulatory and privacy
            requirements should be validated with qualified legal counsel where appropriate.
          </p>
          <h2>Standards and regulations change</h2>
          <p>
            Frameworks, regulations and industry practices may change. Readers should verify current
            requirements for their organisation and jurisdiction.
          </p>
          <h2>No automatic professional relationship</h2>
          <p>
            Use of this website does not automatically create an auditor/client or legal
            relationship with {company.legalName}.
          </p>
          <h2>No guaranteed outcomes</h2>
          <p>
            Consulting support does not guarantee certification, regulatory approval, audit opinions
            or specific compliance outcomes. Results depend on organisational context and decisions.
          </p>
          <h2>Contact</h2>
          <p>
            Questions: {company.email}
            <br />
            Queries / Grievances: {company.grievances.name}, {company.grievances.designation}
          </p>
          <p className="text-sm italic">
            This page is a compliance-support draft only and should be reviewed by qualified legal
            counsel before production reliance.
          </p>
        </div>
      </Section>
    </>
  );
}
