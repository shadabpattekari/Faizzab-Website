import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: `Terms of Use draft for the ${company.brand} website at faizzab.com.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        description="Draft terms for use of faizzab.com. Final legal language should be reviewed by qualified legal counsel before production reliance."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />
        }
      />
      <Section>
        {/* LEGAL_REVIEW_REQUIRED */}
        <div className="prose-legal max-w-3xl space-y-4">
          <p>
            By accessing {company.domain}, you agree to these Terms of Use. If you do not agree, do
            not use the website.
          </p>
          <h2>Website purpose</h2>
          <p>
            The website provides general information about {company.legalName} and its consulting
            offerings, as well as information about future Academy and GRC Platform initiatives.
          </p>
          <h2>No professional relationship by browsing</h2>
          <p>
            Accessing this website does not automatically create an auditor/client, advisory or
            legal relationship. Engagement terms, if any, are established separately in writing.
          </p>
          <h2>Accuracy and updates</h2>
          <p>
            We aim to keep information current, but content may change without notice. Standards,
            regulations and service availability may evolve.
          </p>
          <h2>Acceptable use</h2>
          <p>
            You must not misuse the site, attempt unauthorised access, submit malicious content or
            use automated means to overload services.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Website content is owned by {company.legalName} or its licensors unless otherwise stated.
            You may not copy substantial portions for commercial use without permission.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, {company.legalName} is not liable for indirect or
            consequential losses arising from use of the website. Nothing in these terms excludes
            liability that cannot be excluded under applicable law.
          </p>
          <h2>Contact</h2>
          <p>
            {company.email} · {company.phone}
            <br />
            {company.registeredOffice.full}
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
