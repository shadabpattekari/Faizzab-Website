import {
  defaultSiteSettings,
  faqs as fileFaqs,
  getPublishedFaqs as filePublishedFaqs,
} from "@/content/site";
import { insights as fileInsights } from "@/content/insights";
import { services as fileServices } from "@/content/services";
import { isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import type { FaqItem, InsightArticle, ServiceContent, SiteSettings } from "@/types";

interface SettingRow extends RowDataPacket {
  setting_key: string;
  setting_value: string;
}

interface CmsJsonRow extends RowDataPacket {
  slug: string;
  payload: string;
  status: string;
}

/**
 * Site settings: MySQL overrides when available, else typed file defaults.
 * Public site remains deployable without a database.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isDatabaseConfigured()) return defaultSiteSettings;

  try {
    const rows = await queryRows<SettingRow[]>(`SELECT setting_key, setting_value FROM site_settings`);
    if (!rows?.length) return defaultSiteSettings;

    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value]));
    return {
      academyStatus: (map.academy_status as SiteSettings["academyStatus"]) || defaultSiteSettings.academyStatus,
      academyStatusLabel: map.academy_status_label || defaultSiteSettings.academyStatusLabel,
      academySummary: map.academy_summary || defaultSiteSettings.academySummary,
      platformStatus: (map.platform_status as SiteSettings["platformStatus"]) || defaultSiteSettings.platformStatus,
      platformStatusLabel: map.platform_status_label || defaultSiteSettings.platformStatusLabel,
      platformSummary: map.platform_summary || defaultSiteSettings.platformSummary,
      homepageAnnouncement: map.homepage_announcement || "",
      socialLinks: {
        linkedin: map.social_linkedin || undefined,
        twitter: map.social_twitter || undefined,
      },
      contactOverrides: {
        email: map.contact_email || undefined,
        phone: map.contact_phone || undefined,
      },
    };
  } catch {
    return defaultSiteSettings;
  }
}

export async function getServicesForPublic(): Promise<ServiceContent[]> {
  if (!isDatabaseConfigured()) return fileServices;
  try {
    const rows = await queryRows<CmsJsonRow[]>(
      `SELECT slug, payload, status FROM cms_services WHERE status = 'published'`,
    );
    if (!rows?.length) return fileServices;
    const overrides = new Map(
      rows.map((r) => [r.slug, JSON.parse(r.payload) as Partial<ServiceContent>]),
    );
    return fileServices.map((service) => {
      const override = overrides.get(service.slug);
      return override ? { ...service, ...override, slug: service.slug } : service;
    });
  } catch {
    return fileServices;
  }
}

export async function getInsightsForPublic(): Promise<InsightArticle[]> {
  if (!isDatabaseConfigured()) {
    return fileInsights.filter((a) => a.status === "published");
  }
  try {
    const rows = await queryRows<CmsJsonRow[]>(
      `SELECT slug, payload, status FROM cms_insights WHERE status = 'published' ORDER BY updated_at DESC`,
    );
    if (!rows?.length) {
      return fileInsights.filter((a) => a.status === "published");
    }
    return rows.map((r) => JSON.parse(r.payload) as InsightArticle);
  } catch {
    return fileInsights.filter((a) => a.status === "published");
  }
}

export async function getFaqsForPublic(): Promise<FaqItem[]> {
  if (!isDatabaseConfigured()) return filePublishedFaqs();
  try {
    const rows = await queryRows<CmsJsonRow[]>(
      `SELECT slug, payload, status FROM cms_faqs WHERE status = 'published'`,
    );
    if (!rows?.length) return filePublishedFaqs();
    return rows
      .map((r) => JSON.parse(r.payload) as FaqItem)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return filePublishedFaqs();
  }
}

export { fileServices, fileInsights, fileFaqs };
