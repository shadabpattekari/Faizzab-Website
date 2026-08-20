import type { ServiceContent } from "@/types";

export const services: ServiceContent[] = [
  {
    slug: "iso-management-systems",
    title: "ISO Management Systems Consulting",
    shortTitle: "ISO Management Systems",
    summary:
      "Practical implementation and audit-readiness support for information security, privacy, AI management and business continuity frameworks.",
    overview:
      "FaizZab supports organizations preparing for and strengthening ISO-aligned management systems with a focus on operational controls, evidence readiness and continual improvement. Engagements are designed for practical implementation—not documentation theatre. Typical frameworks include ISO/IEC 27001, ISO/IEC 27701, ISO/IEC 42001 and ISO 22301, adapted to your context, risk profile and maturity.",
    challenges: [
      "Unclear scope, context and management-system boundaries",
      "Policies that do not reflect how work is actually performed",
      "Incomplete risk assessments or Statement of Applicability alignment",
      "Weak evidence trails for internal or external audits",
      "Difficulty sustaining controls after an initial implementation push",
    ],
    supportAreas: [
      "Gap assessment against selected ISO frameworks",
      "Implementation roadmap and prioritised work packages",
      "Context, interested parties and scope definition support",
      "Risk assessment and treatment facilitation",
      "Statement of Applicability (SoA) structuring support",
      "Policy and procedure development aligned to operations",
      "Evidence readiness and artefacts organisation",
      "Internal audit readiness and management review preparation",
      "Continual improvement planning",
    ],
    deliveryApproach: [
      "Clarify objectives, scope and regulatory or contractual drivers",
      "Assess current state against selected framework requirements",
      "Design a practical control and documentation architecture",
      "Support implementation with accountable owners and timelines",
      "Prepare evidence packs and readiness checkpoints",
      "Review outcomes and define improvement actions",
    ],
    deliverables: [
      "Gap assessment findings and prioritised roadmap",
      "Scope and context artefacts",
      "Risk assessment and treatment working materials",
      "Policy/procedure drafts and control matrices",
      "Evidence readiness checklist and audit preparation support",
      "Management review input packs where required",
    ],
    businessValue: [
      "Moves teams from policy drafting to operational compliance",
      "Improves audit readiness through structured evidence thinking",
      "Aligns management-system work with business processes",
      "Builds a maintainable foundation for continual improvement",
    ],
    relatedSlugs: ["grc", "risk-management", "internal-audit", "privacy-data-protection"],
    seo: {
      title: "ISO 27001 Consulting India | ISO Management Systems | FaizZab",
      description:
        "ISO management systems consulting from Pune, India — ISO/IEC 27001, 27701, 42001 and ISO 22301 implementation and audit-readiness support.",
      canonicalPath: "/services/iso-management-systems",
    },
    disclaimer:
      "FaizZab provides consulting and readiness support. We are not a certification body and do not issue ISO certificates or guarantee certification outcomes.",
  },
  {
    slug: "grc",
    title: "Governance, Risk & Compliance (GRC)",
    shortTitle: "GRC",
    summary:
      "Structured governance frameworks, risk and control registers, evidence practices and compliance mapping for organisations that need clarity and accountability.",
    overview:
      "GRC consulting from FaizZab focuses on practical governance design: clear ownership, usable registers, measurable risk signals and audit-ready evidence habits. Whether you are establishing foundational GRC practices or strengthening an existing model, we emphasise business-aligned controls over generic templates.",
    challenges: [
      "Fragmented policies, registers and ownership models",
      "Controls that exist on paper but lack operating evidence",
      "Limited visibility of issues, exceptions and CAPA progress",
      "Difficulty connecting risks, controls and compliance obligations",
      "KPI/KRI programmes that do not inform decisions",
    ],
    supportAreas: [
      "Governance framework design and RACI clarification",
      "Enterprise risk and control register structuring",
      "Policy governance and lifecycle practices",
      "Issue, exception and CAPA management design",
      "Evidence standards and artefact organisation",
      "KPI/KRI definition and reporting cadence",
      "Compliance obligation mapping",
      "Audit readiness preparation",
    ],
    deliveryApproach: [
      "Map current governance artefacts and decision forums",
      "Define target-state GRC operating model",
      "Build or refine registers, workflows and ownership",
      "Pilot evidence and reporting routines",
      "Embed review cycles and continuous improvement",
    ],
    deliverables: [
      "GRC operating model recommendations",
      "Risk/control register structures",
      "Policy governance framework",
      "Issue/CAPA workflow design",
      "KPI/KRI starter sets and reporting outlines",
    ],
    businessValue: [
      "Creates accountable governance structures leadership can use",
      "Improves traceability from risk to control to evidence",
      "Supports consistent audit and regulator readiness posture",
      "Reduces ad-hoc compliance firefighting",
    ],
    relatedSlugs: ["risk-management", "iso-management-systems", "internal-audit", "sox-itgc"],
    seo: {
      title: "GRC Consulting India | Governance Risk Compliance | FaizZab",
      description:
        "Practical GRC consulting in India — governance frameworks, risk and control registers, evidence standards and compliance mapping.",
      canonicalPath: "/services/grc",
    },
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Governance & Readiness",
    shortTitle: "Cybersecurity",
    summary:
      "Security governance, cyber risk assessment, control reviews and incident readiness support focused on sustainable organisational practice.",
    overview:
      "FaizZab's cybersecurity services emphasise governance and readiness: clarifying accountability, assessing cyber risk, reviewing control design and strengthening response preparedness. Engagements are tailored to organisational size and technology footprint, with particular attention to cloud and third-party exposure where relevant.",
    challenges: [
      "Unclear security ownership and decision rights",
      "Controls implemented without risk-based prioritisation",
      "Limited incident readiness and communication playbooks",
      "Inconsistent access-control governance",
      "Weak visibility of third-party and cloud security posture",
    ],
    supportAreas: [
      "Security governance and accountability design",
      "Cyber risk assessment facilitation",
      "Control design and operating reviews",
      "Vulnerability governance process design",
      "Incident readiness and response planning support",
      "Access-control governance frameworks",
      "Third-party security oversight practices",
      "Cloud security governance alignment",
    ],
    deliveryApproach: [
      "Establish context, critical assets and threat drivers",
      "Assess governance maturity and control coverage",
      "Prioritise remediation and readiness actions",
      "Support implementation of practical control routines",
      "Validate evidence and escalation pathways",
    ],
    deliverables: [
      "Cyber risk assessment working outputs",
      "Security governance recommendations",
      "Control review findings and action plans",
      "Incident readiness artefacts",
      "Access and third-party governance guidance",
    ],
    businessValue: [
      "Aligns security investment with business risk",
      "Strengthens preparedness without unnecessary complexity",
      "Improves board and leadership visibility of cyber posture",
      "Supports audit and assurance conversations with clearer evidence",
    ],
    relatedSlugs: ["it-audit", "third-party-risk", "risk-management", "iso-management-systems"],
    seo: {
      title: "Cybersecurity Audit Consulting | Security Governance | FaizZab",
      description:
        "Cybersecurity governance and readiness consulting — risk assessment, control reviews, incident readiness and cloud security governance.",
      canonicalPath: "/services/cybersecurity",
    },
  },
  {
    slug: "it-audit",
    title: "IT Audit Support",
    shortTitle: "IT Audit",
    summary:
      "Independent-minded IT audit readiness and review support covering applications, infrastructure, access and operating controls.",
    overview:
      "FaizZab assists organisations preparing for IT audits and strengthening IT control environments. Support may include scoping assistance, control walkthrough facilitation, evidence assessment and remediation planning. We do not act as a statutory auditor; our role is consulting and readiness support.",
    challenges: [
      "Incomplete evidence for key IT controls",
      "Unclear application and infrastructure control ownership",
      "Repeated audit findings without durable remediation",
      "Limited understanding of ITGC versus application-control boundaries",
      "Time pressure ahead of external audit cycles",
    ],
    supportAreas: [
      "IT audit readiness assessments",
      "Control design and operating effectiveness support",
      "Evidence pack organisation and quality review",
      "Remediation planning for common IT findings",
      "Application and infrastructure control walkthroughs",
      "Coordination support for management and assurance teams",
    ],
    deliveryApproach: [
      "Clarify audit scope, periods and stakeholder expectations",
      "Map key systems, processes and control owners",
      "Review design and sample evidence quality",
      "Identify gaps and practical remediation actions",
      "Support readiness checkpoints before audit fieldwork",
    ],
    deliverables: [
      "IT audit readiness findings",
      "Control and evidence gap summaries",
      "Remediation trackers and owner assignments",
      "Walkthrough and evidence guidance notes",
    ],
    businessValue: [
      "Reduces last-minute scramble before IT audits",
      "Improves durability of control remediation",
      "Creates clearer ownership across technology and business teams",
      "Supports cleaner assurance conversations",
    ],
    relatedSlugs: ["sox-itgc", "cybersecurity", "internal-audit", "grc"],
    seo: {
      title: "IT Audit Consulting | IT Controls Readiness | FaizZab",
      description:
        "IT audit readiness consulting — control reviews, evidence assessment and remediation support for application and infrastructure controls.",
      canonicalPath: "/services/it-audit",
    },
    disclaimer:
      "FaizZab provides consulting and readiness support. We do not perform statutory audits or replace the role of licensed auditors.",
  },
  {
    slug: "sox-itgc",
    title: "SOX / ITGC Support",
    shortTitle: "SOX / ITGC",
    summary:
      "IT general controls readiness for SOX programmes — logical access, change management, computer operations and evidence quality.",
    overview:
      "FaizZab supports organisations preparing ITGC environments relevant to SOX and similar financial-reporting control programmes. Focus areas include logical access, privileged access, change management, computer operations, user access reviews and segregation of duties. Support is consultative and does not constitute statutory audit authority.",
    challenges: [
      "Inconsistent user access review execution and documentation",
      "Privileged access without clear approval and monitoring evidence",
      "Change management controls that lack complete tickets or approvals",
      "Segregation-of-duties conflicts in key systems",
      "Evidence that does not meet testing expectations",
    ],
    supportAreas: [
      "Logical access control design and review support",
      "Privileged access governance",
      "Change management control readiness",
      "Computer operations control support",
      "User access review process design",
      "Segregation of duties assessment support",
      "Evidence assessment for testing readiness",
      "Control design and operating effectiveness support",
    ],
    deliveryApproach: [
      "Map in-scope systems and ITGC domains",
      "Assess control design against programme expectations",
      "Review sample evidence quality",
      "Prioritise remediation before testing windows",
      "Support management readiness for walkthroughs and testing",
    ],
    deliverables: [
      "ITGC readiness assessment outputs",
      "Access and change-control gap summaries",
      "Evidence quality guidance",
      "Remediation plans with owners and dates",
    ],
    businessValue: [
      "Improves SOX/ITGC testing readiness",
      "Strengthens access and change evidence quality",
      "Reduces repeat findings across audit cycles",
      "Clarifies ownership between IT, finance and control owners",
    ],
    relatedSlugs: ["it-audit", "grc", "risk-management", "cybersecurity"],
    seo: {
      title: "ITGC Consulting | SOX ITGC Support | FaizZab",
      description:
        "SOX / ITGC consulting support — logical access, change management, privileged access, user access reviews and testing readiness.",
      canonicalPath: "/services/sox-itgc",
    },
    disclaimer:
      "FaizZab provides consulting and testing-readiness support. We do not act as a statutory auditor or issue SOX opinions.",
  },
  {
    slug: "risk-management",
    title: "Information Security Risk Management",
    shortTitle: "Risk Management",
    summary:
      "Structured information security and enterprise risk assessment support that connects threats, assets, controls and treatment decisions.",
    overview:
      "Risk management engagements help organisations build usable risk processes—not static spreadsheets. FaizZab supports information security risk assessment, treatment planning and integration with governance forums so leaders can make informed decisions about residual risk.",
    challenges: [
      "Risk registers that are outdated or unused",
      "Inconsistent scoring and treatment rationale",
      "Weak link between risks, assets and controls",
      "Limited management visibility of residual risk",
      "Treatment plans without owners or deadlines",
    ],
    supportAreas: [
      "Risk methodology design and calibration",
      "Asset and process context for risk workshops",
      "Information security risk assessment facilitation",
      "Treatment planning and residual-risk documentation",
      "Integration with SoA and control frameworks where relevant",
      "Risk reporting for management review",
    ],
    deliveryApproach: [
      "Agree methodology, scales and decision criteria",
      "Identify critical assets, processes and threat scenarios",
      "Facilitate assessment workshops with owners",
      "Document treatments and residual risk positions",
      "Embed review cadence and escalation rules",
    ],
    deliverables: [
      "Risk methodology guidance",
      "Risk assessment working registers",
      "Treatment plans and owner assignments",
      "Management reporting formats",
    ],
    businessValue: [
      "Makes risk discussions decision-ready",
      "Connects security investment to business impact",
      "Supports ISO and GRC programme integration",
      "Improves accountability for treatment actions",
    ],
    relatedSlugs: ["iso-management-systems", "grc", "cybersecurity", "business-continuity"],
    seo: {
      title: "Information Security Risk Assessment | Risk Consulting | FaizZab",
      description:
        "Information security risk assessment consulting — practical methodology, treatment planning and management reporting.",
      canonicalPath: "/services/risk-management",
    },
  },
  {
    slug: "privacy-data-protection",
    title: "Privacy & Data Protection Consulting",
    shortTitle: "Privacy & Data Protection",
    summary:
      "Privacy governance consulting with India-focused readiness support where applicable—policies, inventories, risk and operational controls.",
    overview:
      "FaizZab helps organisations strengthen privacy governance: clarifying personal data processing, improving accountability structures and preparing operational controls. India-focused privacy readiness can be incorporated where relevant. Website content is general information and does not constitute legal advice.",
    challenges: [
      "Incomplete understanding of personal data flows",
      "Policies that do not match processing reality",
      "Unclear roles for privacy accountability",
      "Limited vendor privacy oversight",
      "Difficulty translating regulatory expectations into operations",
    ],
    supportAreas: [
      "Privacy governance framework design",
      "Personal data inventory and processing mapping support",
      "Policy and notice alignment reviews",
      "Privacy risk and control assessment facilitation",
      "Vendor privacy oversight practices",
      "India-focused privacy readiness planning where applicable",
      "Awareness and operating-model recommendations",
    ],
    deliveryApproach: [
      "Establish processing context and stakeholder map",
      "Assess current privacy artefacts and gaps",
      "Design practical governance and control actions",
      "Support implementation of priority workstreams",
      "Define monitoring and review routines",
    ],
    deliverables: [
      "Privacy governance recommendations",
      "Processing inventory structures",
      "Policy alignment findings",
      "Risk/control action plans",
      "Vendor oversight guidance",
    ],
    businessValue: [
      "Builds privacy practices that operations can sustain",
      "Improves accountability for personal data handling",
      "Supports readiness conversations with counsel and leadership",
      "Reduces ad-hoc responses to privacy requests and reviews",
    ],
    relatedSlugs: ["iso-management-systems", "grc", "third-party-risk", "cybersecurity"],
    seo: {
      title: "Data Privacy Consulting India | Privacy Governance | FaizZab",
      description:
        "Privacy and data protection consulting in India — governance frameworks, processing inventories and operational privacy readiness support.",
      canonicalPath: "/services/privacy-data-protection",
    },
    disclaimer:
      "Legal, regulatory and privacy requirements should be validated with qualified legal counsel where appropriate. FaizZab does not provide legal advice.",
  },
  {
    slug: "internal-audit",
    title: "Internal Audit Support",
    shortTitle: "Internal Audit",
    summary:
      "Internal audit planning, ISO internal audit readiness and evidence-focused review support for management systems and control environments.",
    overview:
      "FaizZab supports internal audit functions and management teams preparing for ISO internal audits and broader control reviews. Emphasis is placed on scoped planning, evidence quality and constructive findings that drive improvement.",
    challenges: [
      "Internal audits treated as checklist exercises",
      "Findings that do not lead to durable corrective action",
      "Limited sampling and evidence discipline",
      "Unclear audit programmes against management-system clauses",
      "Resource constraints ahead of certification or surveillance cycles",
    ],
    supportAreas: [
      "Internal audit programme design support",
      "ISO internal audit readiness facilitation",
      "Evidence review coaching",
      "Finding and CAPA quality improvement",
      "Management review input preparation",
      "Coordination between process owners and audit teams",
    ],
    deliveryApproach: [
      "Agree scope, criteria and sampling approach",
      "Prepare audit plans and evidence requests",
      "Support walkthroughs and evidence evaluation",
      "Structure findings and agreed actions",
      "Support follow-up verification practices",
    ],
    deliverables: [
      "Audit programme/plan inputs",
      "Evidence request lists",
      "Finding and action trackers",
      "Readiness summaries for management",
    ],
    businessValue: [
      "Improves the usefulness of internal audit outcomes",
      "Strengthens evidence culture across process owners",
      "Supports ISO and GRC continual improvement cycles",
      "Prepares teams for external assurance interactions",
    ],
    relatedSlugs: ["iso-management-systems", "grc", "it-audit", "risk-management"],
    seo: {
      title: "ISO Internal Audit Support | Internal Audit Consulting | FaizZab",
      description:
        "Internal audit and ISO internal audit readiness support — planning, evidence review and constructive improvement actions.",
      canonicalPath: "/services/internal-audit",
    },
  },
  {
    slug: "business-continuity",
    title: "Business Continuity Consulting",
    shortTitle: "Business Continuity",
    summary:
      "Business continuity and resilience planning support aligned to practical recovery priorities and, where relevant, ISO 22301 thinking.",
    overview:
      "FaizZab helps organisations clarify critical activities, dependencies and recovery strategies. Continuity work focuses on usable plans, realistic testing approaches and governance that keeps continuity artefacts current.",
    challenges: [
      "Plans that exist but are untested or outdated",
      "Unclear critical processes and recovery time objectives",
      "Weak dependency mapping across technology and suppliers",
      "Limited crisis communication preparedness",
      "Continuity artefacts disconnected from risk and IT recovery",
    ],
    supportAreas: [
      "Business impact analysis facilitation",
      "Continuity strategy and plan structuring",
      "Dependency and supplier continuity considerations",
      "Exercise and test planning support",
      "Crisis communication readiness inputs",
      "ISO 22301-aligned readiness where required",
    ],
    deliveryApproach: [
      "Identify critical activities and impact tolerances",
      "Map dependencies and recovery constraints",
      "Design continuity strategies and plan structures",
      "Define exercise scenarios and improvement loops",
      "Align continuity governance with risk forums",
    ],
    deliverables: [
      "BIA working outputs",
      "Continuity plan structures",
      "Exercise planning guidance",
      "Improvement action lists",
    ],
    businessValue: [
      "Creates continuity plans teams can actually use",
      "Improves recovery prioritisation under pressure",
      "Connects continuity to supplier and technology risk",
      "Supports resilience discussions with leadership",
    ],
    relatedSlugs: ["iso-management-systems", "risk-management", "third-party-risk", "cybersecurity"],
    seo: {
      title: "Business Continuity Consulting | Resilience Planning | FaizZab",
      description:
        "Business continuity consulting — BIA facilitation, continuity planning, exercise design and ISO 22301-aligned readiness support.",
      canonicalPath: "/services/business-continuity",
    },
  },
  {
    slug: "third-party-risk",
    title: "Supplier / Third-Party Risk",
    shortTitle: "Third-Party Risk",
    summary:
      "Supplier security and third-party risk practices that bring structure to due diligence, ongoing oversight and evidence of assurance.",
    overview:
      "FaizZab supports organisations establishing or refining third-party risk management: risk-tiering suppliers, designing questionnaires and assurance routines, and clarifying ownership between procurement, security and business units.",
    challenges: [
      "Uniform questionnaires that ignore supplier criticality",
      "Due diligence completed once and never revisited",
      "Unclear ownership of supplier security findings",
      "Limited evidence of ongoing oversight",
      "Concentration risk across critical vendors",
    ],
    supportAreas: [
      "Third-party risk framework design",
      "Supplier tiering and inherent-risk criteria",
      "Due diligence questionnaire and evidence standards",
      "Ongoing monitoring cadence design",
      "Contractual security control alignment support",
      "Supplier security assessment facilitation",
    ],
    deliveryApproach: [
      "Map critical suppliers and service dependencies",
      "Define tiering and assurance depth",
      "Design due diligence and monitoring workflows",
      "Pilot with priority suppliers",
      "Embed reporting into GRC/risk forums",
    ],
    deliverables: [
      "Third-party risk framework outline",
      "Tiering criteria and workflow designs",
      "Assessment templates and evidence guidance",
      "Monitoring and escalation recommendations",
    ],
    businessValue: [
      "Focuses effort on the suppliers that matter most",
      "Improves consistency of security due diligence",
      "Creates durable oversight beyond one-time assessments",
      "Supports audit and customer assurance requests",
    ],
    relatedSlugs: ["cybersecurity", "grc", "privacy-data-protection", "business-continuity"],
    seo: {
      title: "Supplier Security Assessment | Third-Party Risk | FaizZab",
      description:
        "Third-party and supplier security risk consulting — tiering, due diligence design, ongoing oversight and assurance evidence.",
      canonicalPath: "/services/third-party-risk",
    },
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceContent[] {
  return services.filter((s) => slugs.includes(s.slug));
}
