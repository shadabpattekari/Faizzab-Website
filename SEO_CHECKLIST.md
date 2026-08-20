# SEO Checklist — FaizZab

## Technical SEO

- [x] Unique `<title>` and meta description helpers per page
- [x] Canonical URLs via `metadataBase` + page canonicals
- [x] Open Graph + Twitter card metadata
- [x] `sitemap.xml` generated at `/sitemap.xml`
- [x] `robots.txt` at `/robots.txt` (disallow `/admin`, `/api/`)
- [x] Favicon + web manifest
- [x] Semantic landmarks and heading hierarchy
- [x] Breadcrumb UI + BreadcrumbList JSON-LD on key templates
- [x] Organization + WebSite + ProfessionalService JSON-LD (no AggregateRating)

## On-page targets (natural usage)

Use in relevant copy without stuffing:

- ISO 27001 consulting India / consultant Pune
- GRC consulting India
- Cybersecurity audit consulting
- ITGC consulting / SOX ITGC support
- Information security risk assessment
- ISO internal audit
- Data privacy consulting India
- Business continuity consulting
- Supplier security assessment
- Compliance consulting for SMEs

## Local SEO

- Location remains **Pune, Maharashtra, India** only
- Consistent NAP-style details across Contact, Corporate Information, footer and schema

## Content architecture

- Services: `/services/*`
- Insights: `/insights/*`
- Resources: `/resources/*`
- Legal: `/privacy`, `/terms`, `/disclaimer`, `/cookie-policy`

## Post-launch validation

- [ ] Inspect live URLs in a rich-results / schema tester
- [ ] Submit sitemap in Google Search Console
- [ ] Verify no `localhost` or `example.com` in production HTML
- [ ] Confirm admin routes remain `noindex`
