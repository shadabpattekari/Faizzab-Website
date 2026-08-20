import { CorporateDetails } from "@/components/seo/JsonLd";
import { PageHero, CtaBand } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About FaizZab",
  description:
    "Learn about FAIZZAB INTEGRITY PRIVATE LIMITED — practical GRC consulting, evidence-driven implementation and a connected vision for learning and technology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About FaizZab"
        description="Practical governance, risk and compliance support for organisations that need implementation discipline—not theatre."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        }
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6 text-[var(--text-muted)]">
            <p>
              <strong className="text-[var(--navy-900)]">{company.brand}</strong> is the brand of{" "}
              <strong className="text-[var(--navy-900)]">{company.legalName}</strong>, based in{" "}
              {company.locationShort}. We help organisations strengthen information security,
              cybersecurity, governance, risk, privacy and regulatory compliance through practical
              consulting, audit readiness, implementation support, professional learning and
              technology-enabled solutions.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
              Our mission
            </h2>
            <p>
              Help organisations build governance and compliance foundations they can operate—moving
              from policy drafts to evidence-backed, business-aligned practice.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
              Practical GRC philosophy
            </h2>
            <p>
              Effective GRC is not a binder of unused documents. It is structured ownership, usable
              registers, proportionate controls and review habits that survive audit cycles and
              organisational change.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
              Evidence-driven implementation
            </h2>
            <p>
              We emphasise evidence readiness alongside control design—so ISO programmes, IT audits
              and internal reviews are supported by artefacts that reflect real operations.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
              Consulting, learning and technology vision
            </h2>
            <p>
              FaizZab is building a connected ecosystem: consulting available today, FaizZab Academy
              for practical professional learning (coming soon), and a GRC platform in development.
              Future learning and product experiences may be reached via dedicated channels such as
              academy.faizzab.com and app.faizzab.com when those offerings launch.
            </p>
          </div>
          <CorporateDetails />
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading
          title="What we do not claim"
          description="Credibility matters. This website does not invent certifications, client logos, awards or market-leadership statistics."
        />
        <ul className="grid gap-3 text-sm text-[var(--text-muted)] md:grid-cols-2">
          <li className="border border-[var(--border)] bg-white p-4">
            We are not a certification body and do not issue ISO certificates.
          </li>
          <li className="border border-[var(--border)] bg-white p-4">
            We do not act as a statutory auditor.
          </li>
          <li className="border border-[var(--border)] bg-white p-4">
            Academy courses are not currently purchasable.
          </li>
          <li className="border border-[var(--border)] bg-white p-4">
            The GRC Platform is not positioned as available SaaS today.
          </li>
        </ul>
      </Section>
      <CtaBand
        title="Discuss your governance priorities"
        primary={{ href: "/contact", label: "Request a Consultation" }}
        secondary={{ href: "/services", label: "View services" }}
      />
    </>
  );
}
