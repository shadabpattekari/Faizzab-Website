import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: `Cookie Policy for ${company.domain} — strictly necessary cookies and optional analytics consent architecture.`,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        title="Cookie Policy"
        description="How faizzab.com uses cookies and similar technologies."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
        }
      />
      <Section>
        {/* LEGAL_REVIEW_REQUIRED */}
        <div className="prose-legal max-w-3xl space-y-4">
          <p>
            This website prioritises a lightweight experience. We do not enable invasive tracking by
            default.
          </p>
          <h2>Strictly necessary cookies</h2>
          <p>
            Strictly necessary cookies may be used to operate security features such as
            authenticated administrator sessions. These cookies are required for the admin portal to
            function and are not used for advertising.
          </p>
          <h2>Analytics and marketing cookies</h2>
          <p>
            Optional analytics are disabled unless a site administrator configures{" "}
            <code>NEXT_PUBLIC_ANALYTICS_ID</code> and enables a consent-aware integration. Non-essential
            trackers should not load before user consent where required.
          </p>
          <h2>Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. Blocking strictly necessary
            cookies may prevent administrative login from working.
          </p>
          <h2>Contact</h2>
          <p>
            {company.email}
            <br />
            {company.legalName}, {company.registeredOffice.full}
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
