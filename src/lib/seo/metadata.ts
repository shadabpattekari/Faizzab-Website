import type { Metadata } from "next";
import { company } from "@/content/company";

const defaultOgImage = "/images/og-default.svg";

export function absoluteUrl(path = "/"): string {
  const base = company.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  // Layout template appends "| FaizZab" — keep page titles clean.
  const pageTitle = input.title.replace(/\s*\|\s*FaizZab\s*$/i, "").trim();

  return {
    title: pageTitle,
    description: input.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${pageTitle} | ${company.brand}`,
      description: input.description,
      url,
      siteName: company.brand,
      locale: "en_IN",
      type: "website",
      images: [{ url: absoluteUrl(defaultOgImage), width: 1200, height: 630, alt: company.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${company.brand}`,
      description: input.description,
      images: [absoluteUrl(defaultOgImage)],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.brand,
    url: absoluteUrl("/"),
    email: company.email,
    telephone: company.phone,
    identifier: company.cin,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.registeredOffice.line1}, ${company.registeredOffice.line2}`,
      addressLocality: company.registeredOffice.city,
      postalCode: company.registeredOffice.postalCode,
      addressRegion: company.registeredOffice.state,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: company.email,
      telephone: company.phone,
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.brand,
    url: absoluteUrl("/"),
    publisher: {
      "@type": "Organization",
      name: company.legalName,
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.brand,
    url: absoluteUrl("/"),
    description: company.supporting,
    provider: {
      "@type": "Organization",
      name: company.legalName,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.registeredOffice.city,
      addressRegion: company.registeredOffice.state,
      addressCountry: "IN",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Organization",
      name: company.brand,
    },
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
