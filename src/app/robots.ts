import { company } from "@/content/company";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${company.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    host: company.siteUrl.replace(/\/$/, ""),
  };
}
