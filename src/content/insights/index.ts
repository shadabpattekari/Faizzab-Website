import type { InsightArticle } from "@/types";

/**
 * Original insight articles for SEO and thought leadership.
 * Content is intentionally practical and does not reproduce standard text.
 */
export const insights: InsightArticle[] = [
  {
    slug: "building-an-audit-ready-evidence-culture",
    title: "Building an Audit-Ready Evidence Culture",
    description:
      "How organisations can move from last-minute evidence gathering to durable, owner-led evidence habits that support ISO, IT audit and GRC reviews.",
    category: "GRC",
    publishedDate: "2026-03-12",
    updatedDate: "2026-03-12",
    author: "FaizZab",
    seoTitle: "Audit-Ready Evidence Culture | GRC Practices | FaizZab Insights",
    metaDescription:
      "Practical guidance on building evidence habits that support ISO internal audits, ITGC testing and ongoing GRC assurance.",
    featured: true,
    status: "published",
    readingTimeMinutes: 7,
    headings: [
      "Why evidence collapses under audit pressure",
      "Define what “good evidence” means for each control",
      "Assign owners before you assign tools",
      "Create lightweight evidence routines",
      "Review evidence quality before external deadlines",
    ],
    body: [
      "Many organisations treat evidence as something assembled when an auditor asks for it. That approach creates stress, incomplete packs and findings that could have been avoided with clearer ownership earlier in the year.",
      "An audit-ready evidence culture starts with definitions. For each key control, teams should agree what artefact demonstrates design and what artefact demonstrates operation—ticket approvals, access review exports, change logs, training records or management review minutes.",
      "Ownership matters more than templates. If a control has no named business or technology owner, evidence quality will drift. FaizZab engagements often begin by clarifying RACI for high-risk controls before expanding documentation.",
      "Lightweight routines outperform heroic year-end efforts. Monthly access-review completion checks, quarterly change-sample spot reviews and scheduled evidence folder hygiene keep artefacts current without becoming bureaucracy.",
      "Before external or certification-related reviews, run an internal evidence quality pass. Look for missing periods, unexplained exceptions and screenshots that lack context. Improving evidence discipline strengthens both assurance outcomes and day-to-day governance.",
    ],
  },
  {
    slug: "iso-27001-scope-decisions-that-affect-implementation",
    title: "ISO/IEC 27001 Scope Decisions That Affect Implementation",
    description:
      "Scope is not a formality. Practical considerations for defining boundaries that teams can implement and auditors can understand.",
    category: "ISO",
    publishedDate: "2026-02-20",
    updatedDate: "2026-02-20",
    author: "FaizZab",
    seoTitle: "ISO 27001 Scope Decisions | ISO Consulting Insights | FaizZab",
    metaDescription:
      "Guidance for organisations in India and beyond on ISO/IEC 27001 scope choices that influence implementation effort and audit readiness.",
    featured: true,
    status: "published",
    readingTimeMinutes: 8,
    headings: [
      "Scope as an operating boundary",
      "People, locations, systems and suppliers",
      "Avoiding both over-scope and under-scope",
      "Connecting scope to risk assessment",
      "Communicating scope to leadership",
    ],
    body: [
      "ISO/IEC 27001 implementation programmes often stumble when scope is written to impress rather than to operate. A useful scope statement describes what is in, what is out and why—aligned to business services and information assets that matter.",
      "Consider people, locations, systems, cloud services and critical suppliers. Excluding a hosting provider or shared service without explaining interface controls can create later audit friction.",
      "Over-scoping slows implementation; under-scoping can leave customer or regulatory expectations unmet. The practical path is a defended boundary with a roadmap for later expansion where needed.",
      "Risk assessment should follow the agreed scope. If assets outside scope drive material risk to in-scope services, revisit either the boundary or the interface controls.",
      "Leadership communication should focus on business services protected, not clause lists. Clear scope decisions make ISO 27001 consulting engagements in India—and elsewhere—more executable for SMEs and growing technology organisations.",
    ],
  },
  {
    slug: "itgc-access-reviews-that-stand-up-to-testing",
    title: "ITGC Access Reviews That Stand Up to Testing",
    description:
      "Practical patterns for user access reviews that produce usable evidence for SOX / ITGC programmes.",
    category: "SOX / ITGC",
    publishedDate: "2026-01-28",
    updatedDate: "2026-01-28",
    author: "FaizZab",
    seoTitle: "ITGC Access Reviews | SOX ITGC Support Insights | FaizZab",
    metaDescription:
      "How to design user access reviews and privileged access evidence that support ITGC testing readiness.",
    featured: false,
    status: "published",
    readingTimeMinutes: 6,
    headings: [
      "Start with system criticality",
      "Separate joiner-mover-leaver evidence from periodic reviews",
      "Make reviewer accountability visible",
      "Handle exceptions with documented rationale",
      "Preserve complete, dated evidence packs",
    ],
    body: [
      "User access reviews fail testing when populations are incomplete, reviewers rubber-stamp lists or evidence lacks dates and sign-off. Strong ITGC consulting starts by confirming which systems are in scope and who can grant or approve access.",
      "Periodic reviews should not be confused with joiner-mover-leaver tickets. Both matter, but they answer different control questions and need distinct evidence.",
      "Reviewers need enough context to challenge inappropriate access. Role descriptions, last-login indicators and privileged flags help prevent perfunctory approvals.",
      "Exceptions are inevitable. What matters is documented rationale, compensating monitoring and a clear remediation path.",
      "Store complete packs: population source, review worksheet, approvals and closure of revoked access. Clean evidence reduces rework during SOX / ITGC support cycles.",
    ],
  },
  {
    slug: "privacy-readiness-without-legal-theatre",
    title: "Privacy Readiness Without Legal Theatre",
    description:
      "Operational privacy practices that complement legal counsel—inventories, accountability and vendor oversight.",
    category: "Privacy",
    publishedDate: "2026-01-10",
    updatedDate: "2026-01-10",
    author: "FaizZab",
    seoTitle: "Data Privacy Consulting India Insights | FaizZab",
    metaDescription:
      "Practical privacy governance ideas for organisations seeking data privacy consulting in India without treating policies as the finish line.",
    featured: false,
    status: "published",
    readingTimeMinutes: 6,
    headings: [
      "Know what personal data you process",
      "Match notices and policies to reality",
      "Assign privacy accountability",
      "Bring vendors into the privacy conversation",
      "Validate legal interpretation with counsel",
    ],
    body: [
      "Privacy programmes stall when organisations write policies before they understand processing. A living inventory of systems, purposes and data categories is the foundation of useful privacy governance.",
      "Notices and internal policies should reflect actual retention, sharing and security practices. Misalignment creates both compliance and trust risk.",
      "Accountability is operational: who approves new processing, who handles requests and who escalates incidents involving personal data.",
      "Vendors that process personal data need proportionate diligence and contractual clarity—not a one-size questionnaire for every supplier.",
      "Legal, regulatory and privacy requirements should be validated with qualified legal counsel where appropriate. Consulting support helps implement governance; it does not replace legal advice.",
    ],
  },
  {
    slug: "business-continuity-exercises-that-reveal-real-gaps",
    title: "Business Continuity Exercises That Reveal Real Gaps",
    description:
      "Designing continuity exercises that surface dependency and decision issues before a disruption does.",
    category: "Business Continuity",
    publishedDate: "2025-12-05",
    updatedDate: "2025-12-05",
    author: "FaizZab",
    seoTitle: "Business Continuity Exercises | Continuity Consulting | FaizZab",
    metaDescription:
      "How to plan business continuity exercises that test decisions, dependencies and communications—not just document presence.",
    featured: false,
    status: "published",
    readingTimeMinutes: 5,
    headings: [
      "Exercise against critical activities",
      "Include suppliers and technology recovery assumptions",
      "Practice decision rights and communications",
      "Capture actions with owners",
      "Feed lessons into risk and continuity plans",
    ],
    body: [
      "A continuity plan that has never been exercised is a theory. Useful exercises focus on a critical activity, a plausible disruption and the decisions leaders must make under time pressure.",
      "Include supplier and technology recovery assumptions. Many continuity gaps appear at interfaces—cloud services, payroll providers or shared IT teams.",
      "Communications and decision rights are as important as technical recovery steps. Ambiguity about who declares an incident delays response.",
      "Every exercise should produce owned actions with dates. Without follow-through, exercises become theatre.",
      "Feed lessons into business continuity plans and the broader risk register so resilience improves between events.",
    ],
  },
  {
    slug: "cyber-risk-assessment-for-growing-technology-teams",
    title: "Cyber Risk Assessment for Growing Technology Teams",
    description:
      "A pragmatic approach to cyber risk assessment when teams are scaling products, cloud usage and customer expectations.",
    category: "Cybersecurity",
    publishedDate: "2025-11-18",
    updatedDate: "2025-11-18",
    author: "FaizZab",
    seoTitle: "Cyber Risk Assessment | Cybersecurity Consulting Insights | FaizZab",
    metaDescription:
      "Practical cyber risk assessment guidance for growing technology and SaaS organisations seeking structured security governance.",
    featured: true,
    status: "published",
    readingTimeMinutes: 7,
    headings: [
      "Anchor on business services, not tool lists",
      "Prioritise scenarios that interrupt value delivery",
      "Connect risks to owners and treatments",
      "Use assessment outputs in leadership forums",
      "Revisit after major architecture changes",
    ],
    body: [
      "Growing technology teams often accumulate security tools faster than they accumulate risk clarity. A focused cyber risk assessment starts with the services customers depend on and the assets that enable those services.",
      "Prioritise scenarios that interrupt availability, integrity or confidentiality of value delivery—credential compromise, insecure change, third-party outage or sensitive data exposure.",
      "Each material risk needs an owner, a treatment decision and a residual-risk view. Unowned risks tend to reappear in audits and customer questionnaires.",
      "Assessment outputs should inform leadership conversations and investment choices, not sit unused in a shared drive.",
      "Reassess after major cloud migrations, product launches or supplier changes. Cybersecurity audit consulting is most useful when risk views stay current with the architecture.",
    ],
  },
];

export function getPublishedInsights(): InsightArticle[] {
  return insights
    .filter((a) => a.status === "published")
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

export function getInsight(slug: string): InsightArticle | undefined {
  return getPublishedInsights().find((a) => a.slug === slug);
}

export function getFeaturedInsights(): InsightArticle[] {
  return getPublishedInsights().filter((a) => a.featured);
}
