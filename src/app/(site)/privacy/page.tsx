import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy draft for ${company.legalName} and the faizzab.com website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Draft policy for website visitors and enquiry contacts. Final legal language should be reviewed by qualified legal counsel before production reliance."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        }
      />
      <Section>
        {/* LEGAL_REVIEW_REQUIRED: Have qualified counsel review before production reliance. */}
        <div className="prose-legal max-w-3xl space-y-4">
          <p>
            This Privacy Policy explains how {company.legalName} (“FaizZab”, “we”, “us”) handles
            personal information collected through {company.domain}.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you submit an enquiry or interest form, we may collect your name, organisation,
            business email address, phone number (if provided), service interest and message content,
            together with technical metadata such as submission time and approximate network
            identifiers used for security and abuse prevention.
          </p>
          <h2>How we use information</h2>
          <ul>
            <li>To respond to enquiries and consultation requests</li>
            <li>To manage Academy or GRC Platform interest registrations</li>
            <li>To operate, secure and improve the website</li>
            <li>To comply with applicable legal obligations</li>
          </ul>
          <h2>Legal bases and retention</h2>
          <p>
            We process enquiry data based on your request and related legitimate interests in
            operating a business website. We retain enquiry records only as long as needed for
            correspondence, administration and legal requirements, then delete or anonymise them
            where appropriate.
          </p>
          <h2>Sharing</h2>
          <p>
            We do not sell personal information. Service providers used for hosting, email delivery
            or database hosting may process data on our instructions. Corporate contact details are
            published for business communication.
          </p>
          <h2>Security</h2>
          <p>
            We apply administrative and technical safeguards appropriate to a corporate website,
            including access controls for administrative systems. No method of transmission is
            perfectly secure.
          </p>
          <h2>Your choices</h2>
          <p>
            You may contact us at {company.email} to request access, correction or deletion of
            enquiry data where applicable law provides those rights.
          </p>
          <h2>Contact</h2>
          <p>
            {company.legalName}
            <br />
            {company.registeredOffice.full}
            <br />
            Email: {company.email}
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
