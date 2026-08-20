/**
 * Official corporate identity for FAIZZAB INTEGRITY PRIVATE LIMITED.
 * Keep all public surfaces, schema, and legal pages aligned with these values.
 */
export const company = {
  legalName: "FAIZZAB INTEGRITY PRIVATE LIMITED",
  brand: "FaizZab",
  cin: "U62020PN2026PTC259388",
  domain: "faizzab.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://faizzab.com",
  email: "info@faizzab.com",
  phone: "+91 91757 68019",
  phoneTel: "+919175768019",
  grievances: {
    name: "Nazneen Pattekari",
    designation: "Director",
  },
  registeredOffice: {
    line1: "Flat No. 512, SKY I Star, Town II, Bldg No. 6",
    line2: "Mulshi, Bhukum, Mulshi",
    city: "Pune",
    postalCode: "412115",
    state: "Maharashtra",
    country: "India",
    full: "Flat No. 512, SKY I Star, Town II, Bldg No. 6, Mulshi, Bhukum, Mulshi, Pune - 412115, Maharashtra, India",
  },
  locationShort: "Pune, Maharashtra, India",
  tagline: "Governance. Risk. Compliance. Built for Practical Implementation.",
  supporting:
    "FaizZab helps organizations strengthen information security, cybersecurity, governance, risk, privacy and regulatory compliance through practical consulting, audit readiness, implementation support, professional learning and technology-enabled solutions.",
  copyrightYear: 2026,
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/academy", label: "Academy" },
  { href: "/grc-platform", label: "GRC Platform" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/academy", label: "Academy" },
    { href: "/grc-platform", label: "GRC Platform" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/corporate-information", label: "Corporate Information" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ],
} as const;

export const capabilities = [
  "ISO Management Systems",
  "GRC",
  "Cybersecurity",
  "SOX / ITGC",
  "IT Audit",
  "Risk",
  "Privacy",
  "Internal Audit",
  "Business Continuity",
] as const;

export const approachSteps = [
  { key: "understand", label: "Understand" },
  { key: "assess", label: "Assess" },
  { key: "design", label: "Design" },
  { key: "implement", label: "Implement" },
  { key: "evidence", label: "Evidence" },
  { key: "review", label: "Review" },
  { key: "improve", label: "Improve" },
] as const;
