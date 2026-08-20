export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed" | "Spam";

export type AdminRole = "super_admin" | "content_editor";

export type ContentStatus = "draft" | "published";

export type OfferingStatus = "available" | "coming_soon" | "in_development";

export type ServiceSlug =
  | "iso-management-systems"
  | "grc"
  | "cybersecurity"
  | "it-audit"
  | "sox-itgc"
  | "risk-management"
  | "privacy-data-protection"
  | "internal-audit"
  | "business-continuity"
  | "third-party-risk";

export interface SeoFields {
  title: string;
  description: string;
  canonicalPath: string;
}

export interface ServiceContent {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  overview: string;
  challenges: string[];
  supportAreas: string[];
  deliveryApproach: string[];
  deliverables: string[];
  businessValue: string[];
  relatedSlugs: ServiceSlug[];
  seo: SeoFields;
  disclaimer?: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  description: string;
  category:
    | "ISO"
    | "GRC"
    | "Cybersecurity"
    | "IT Audit"
    | "SOX / ITGC"
    | "Risk"
    | "Privacy"
    | "Business Continuity";
  publishedDate: string;
  updatedDate: string;
  author: string;
  seoTitle: string;
  metaDescription: string;
  featured: boolean;
  status: ContentStatus;
  readingTimeMinutes: number;
  headings: string[];
  body: string[];
}

export interface ResourceItem {
  slug: string;
  title: string;
  description: string;
  category: InsightArticle["category"];
  type: "guide" | "checklist" | "overview";
  status: ContentStatus;
  seo: SeoFields;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: ContentStatus;
  sortOrder: number;
}

export interface SiteSettings {
  academyStatus: OfferingStatus;
  academyStatusLabel: string;
  academySummary: string;
  platformStatus: OfferingStatus;
  platformStatusLabel: string;
  platformSummary: string;
  homepageAnnouncement: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
  contactOverrides?: {
    email?: string;
    phone?: string;
  };
}

export interface ContactPayload {
  name: string;
  organization: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  consent: boolean;
  website?: string; // honeypot
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
