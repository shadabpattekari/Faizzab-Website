import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { getPublishedInsights } from "@/content/insights";
import { services } from "@/content/services";
import { getPublishedResources } from "@/content/site";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/academy",
  "/grc-platform",
  "/resources",
  "/insights",
  "/contact",
  "/corporate-information",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const serviceEntries = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const insightEntries = getPublishedInsights().map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: new Date(a.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const resourceEntries = getPublishedResources().map((r) => ({
    url: `${base}/resources/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...insightEntries, ...resourceEntries];
}
