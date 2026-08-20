import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { company } from "@/content/company";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/metadata";
import "./globals.css";

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.brand} | Governance. Risk. Compliance.`,
    template: `%s | ${company.brand}`,
  },
  description: company.supporting,
  applicationName: company.brand,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: company.siteUrl,
    siteName: company.brand,
    title: `${company.brand} | Governance. Risk. Compliance.`,
    description: company.supporting,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.brand} | Governance. Risk. Compliance.`,
    description: company.supporting,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b1b33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
