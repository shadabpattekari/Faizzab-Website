import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact | Request a Consultation",
  description:
    "Contact FAIZZAB INTEGRITY PRIVATE LIMITED in Pune, Maharashtra — email info@faizzab.com or call +91 91757 68019 to request a consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        description="Request a consultation or send an enquiry. We respond using the business email you provide."
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        }
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--navy-900)]">
                {company.legalName}
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-[var(--navy-900)]">Email</dt>
                  <dd>
                    <a href={`mailto:${company.email}`} className="text-[var(--blue-600)]">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--navy-900)]">Phone</dt>
                  <dd>
                    <a href={`tel:${company.phoneTel}`} className="text-[var(--blue-600)]">
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--navy-900)]">Registered office</dt>
                  <dd className="text-[var(--text-muted)]">{company.registeredOffice.full}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--navy-900)]">Queries / Grievances</dt>
                  <dd className="text-[var(--text-muted)]">
                    {company.grievances.name}, {company.grievances.designation}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Please do not submit sensitive personal data, passwords, payment card details or
              confidential client materials through this form.
            </p>
          </aside>
          <div className="border border-[var(--border)] bg-white p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--navy-900)]">
              Enquiry form
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
