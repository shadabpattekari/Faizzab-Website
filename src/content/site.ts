import type { FaqItem, ResourceItem, SiteSettings } from "@/types";

export const defaultSiteSettings: SiteSettings = {
  academyStatus: "coming_soon",
  academyStatusLabel: "Coming Soon",
  academySummary:
    "FaizZab Academy will offer practical professional learning with hands-on labs, simulated organisations, audit exercises and evidence-based assignments across GRC, ISO, cybersecurity, privacy, IT audit and SOX / ITGC topics.",
  platformStatus: "in_development",
  platformStatusLabel: "In Development",
  platformSummary:
    "The FaizZab GRC Platform is being designed as an integrated environment for risk, controls, SoA, treatment, audit, evidence, CAPA, assets, suppliers, incidents, privacy, business continuity, management review and compliance reporting.",
  homepageAnnouncement: "",
  socialLinks: {},
};

export const industries = [
  {
    slug: "technology-saas",
    title: "Technology / SaaS / Cloud",
    summary:
      "Methodology adapted for product organisations, cloud delivery models and customer assurance expectations.",
    focus: [
      "Security and privacy governance for product and platform teams",
      "ISO-aligned management system readiness",
      "Customer questionnaire and assurance preparation support",
      "Access, change and cloud control practices",
    ],
  },
  {
    slug: "financial-services",
    title: "Banking / Financial Services",
    summary:
      "Approaches that accommodate heightened control expectations, ITGC considerations and regulatory sensitivity.",
    focus: [
      "ITGC and access governance readiness",
      "Risk and control documentation discipline",
      "Third-party oversight practices",
      "Audit evidence quality improvement",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary:
      "Flexibility for environments where confidentiality, availability and supplier dependencies are operationally critical.",
    focus: [
      "Information security and privacy governance",
      "Supplier and system dependency awareness",
      "Business continuity considerations",
      "Policy and evidence alignment to operations",
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    summary:
      "Practical GRC and security structures suited to client delivery models and distributed teams.",
    focus: [
      "Client data handling governance",
      "Access and project delivery controls",
      "ISO readiness for growing practices",
      "Scalable policy and training routines",
    ],
  },
  {
    slug: "sme-growing",
    title: "SMEs / Growing Businesses",
    summary:
      "Right-sized compliance consulting for organisations building durable foundations without unnecessary complexity.",
    focus: [
      "Prioritised roadmaps based on real risk",
      "Lean control frameworks that teams can sustain",
      "Audit readiness without over-documentation",
      "Preparation for customer and partner assurance requests",
    ],
  },
] as const;

export const resources: ResourceItem[] = [
  {
    slug: "iso-implementation-readiness-overview",
    title: "ISO Implementation Readiness Overview",
    description:
      "A structured overview of typical readiness workstreams for ISO-aligned management system programmes.",
    category: "ISO",
    type: "overview",
    status: "published",
    seo: {
      title: "ISO Implementation Readiness Overview | FaizZab Resources",
      description:
        "High-level readiness overview for organisations planning ISO management system implementation support.",
      canonicalPath: "/resources/iso-implementation-readiness-overview",
    },
  },
  {
    slug: "grc-operating-model-checklist",
    title: "GRC Operating Model Checklist",
    description:
      "Checklist prompts for governance forums, registers, ownership and reporting cadence.",
    category: "GRC",
    type: "checklist",
    status: "published",
    seo: {
      title: "GRC Operating Model Checklist | FaizZab Resources",
      description:
        "Practical checklist prompts to evaluate GRC operating model clarity and accountability.",
      canonicalPath: "/resources/grc-operating-model-checklist",
    },
  },
  {
    slug: "itgc-evidence-quality-guide",
    title: "ITGC Evidence Quality Guide",
    description:
      "Guidance themes for improving access, change and operations evidence quality ahead of testing.",
    category: "SOX / ITGC",
    type: "guide",
    status: "published",
    seo: {
      title: "ITGC Evidence Quality Guide | FaizZab Resources",
      description:
        "Guidance for strengthening ITGC evidence quality for access, change management and computer operations.",
      canonicalPath: "/resources/itgc-evidence-quality-guide",
    },
  },
  {
    slug: "privacy-governance-starter-checklist",
    title: "Privacy Governance Starter Checklist",
    description:
      "Starter prompts for processing inventories, accountability and vendor privacy oversight.",
    category: "Privacy",
    type: "checklist",
    status: "published",
    seo: {
      title: "Privacy Governance Starter Checklist | FaizZab Resources",
      description:
        "Starter checklist for privacy governance foundations, including inventories and accountability.",
      canonicalPath: "/resources/privacy-governance-starter-checklist",
    },
  },
  {
    slug: "cyber-risk-workshop-outline",
    title: "Cyber Risk Workshop Outline",
    description:
      "Suggested workshop structure for facilitated cyber risk discussions with technology and business owners.",
    category: "Cybersecurity",
    type: "guide",
    status: "published",
    seo: {
      title: "Cyber Risk Workshop Outline | FaizZab Resources",
      description:
        "Workshop outline for facilitating cyber risk assessment discussions across business and technology teams.",
      canonicalPath: "/resources/cyber-risk-workshop-outline",
    },
  },
  {
    slug: "business-continuity-exercise-planner",
    title: "Business Continuity Exercise Planner",
    description:
      "Planning prompts for designing continuity exercises that test decisions and dependencies.",
    category: "Business Continuity",
    type: "guide",
    status: "published",
    seo: {
      title: "Business Continuity Exercise Planner | FaizZab Resources",
      description:
        "Planning prompts to design business continuity exercises focused on critical activities and decisions.",
      canonicalPath: "/resources/business-continuity-exercise-planner",
    },
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-services",
    question: "What services does FaizZab currently offer?",
    answer:
      "Consulting services are available across ISO management systems, GRC, cybersecurity governance, IT audit readiness, SOX / ITGC support, risk management, privacy governance, internal audit support, business continuity and third-party risk. FaizZab Academy and the GRC Platform are future offerings and are not currently available for purchase.",
    category: "general",
    status: "published",
    sortOrder: 1,
  },
  {
    id: "faq-certification",
    question: "Does FaizZab issue ISO certificates?",
    answer:
      "No. FaizZab provides consulting and readiness support. Certification is performed by accredited certification bodies. We do not claim certification-body status or guarantee certification outcomes.",
    category: "iso",
    status: "published",
    sortOrder: 2,
  },
  {
    id: "faq-location",
    question: "Where is FaizZab based?",
    answer:
      "FAIZZAB INTEGRITY PRIVATE LIMITED is registered in Pune, Maharashtra, India. Engagements can be discussed based on organisational needs and delivery model.",
    category: "general",
    status: "published",
    sortOrder: 3,
  },
  {
    id: "faq-academy",
    question: "Can I enrol in FaizZab Academy courses now?",
    answer:
      "Academy programmes are coming soon. You can register interest on the Academy page to receive updates when learning offerings launch. Courses are not currently purchasable.",
    category: "academy",
    status: "published",
    sortOrder: 4,
  },
  {
    id: "faq-platform",
    question: "Is the FaizZab GRC Platform available today?",
    answer:
      "The platform is in development. You can register interest for updates. It is not positioned as an operational SaaS product at this time.",
    category: "platform",
    status: "published",
    sortOrder: 5,
  },
];

export const resourceCategories = [
  "ISO",
  "GRC",
  "Cybersecurity",
  "IT Audit",
  "SOX / ITGC",
  "Risk",
  "Privacy",
  "Business Continuity",
] as const;

export function getPublishedResources(): ResourceItem[] {
  return resources.filter((r) => r.status === "published");
}

export function getResource(slug: string): ResourceItem | undefined {
  return getPublishedResources().find((r) => r.slug === slug);
}

export function getPublishedFaqs(): FaqItem[] {
  return faqs
    .filter((f) => f.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
