# FaizZab Corporate Website

Production corporate website for **FAIZZAB INTEGRITY PRIVATE LIMITED** (brand: FaizZab).

Canonical domain: `https://faizzab.com`

## Purpose

Market FaizZab consulting capabilities and introduce future offerings:

- **Consulting** — available
- **FaizZab Academy** — coming soon
- **FaizZab GRC Platform** — in development

This repository is the public corporate website, not the future GRC SaaS product.

## Technology stack

- Next.js (App Router) + TypeScript + React
- Tailwind CSS (design tokens via CSS variables)
- Node.js runtime (Hostinger Node.js Web App compatible)
- Nodemailer (SMTP enquiries)
- Hostinger MySQL (optional lead storage + required for admin portal persistence)
- iron-session + bcrypt (admin authentication)

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm install
npm run build
npm start
```

Hostinger should use:

- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Node version:** 18+ (20 LTS recommended)

## Environment variables

See `.env.example` for placeholders.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (`https://faizzab.com`) |
| `SMTP_*` / `CONTACT_*` | Contact form email delivery to `info@faizzab.com` |
| `MYSQL_*` | Hostinger MySQL for leads + admin CMS |
| `ADMIN_SESSION_SECRET` | 32+ char secret for encrypted admin cookies |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional analytics ID (disabled when empty) |

Never commit real secrets.

## Content editing

Core marketing content lives in typed files:

- `src/content/company.ts` — legal entity + navigation
- `src/content/services/index.ts` — service catalogue
- `src/content/insights/index.ts` — insight articles
- `src/content/site.ts` — industries, resources, FAQs, default statuses

When MySQL is configured, administrators can override selected content from `/admin`.

## Adding Insights articles

1. Add a new object to `src/content/insights/index.ts`, or
2. Use **Admin → Insights** (MySQL required) with `status: "published"`.

Required fields include title, slug, description, category, dates, SEO fields, headings and body paragraphs.

## Changing contact information

Update `src/content/company.ts` (source of truth for legal entity data). Keep Contact, Corporate Information, footer and schema aligned.

Optional admin overrides for display contact email/phone exist under **Site Settings** when MySQL is enabled.

## Changing Academy / Platform status

- File defaults: `src/content/site.ts` (`defaultSiteSettings`)
- Runtime overrides: **Admin → Site Settings** (MySQL)

## Replacing the logo

1. Replace `/public/logo.svg` with the final trademark asset.
2. Keep accessible text branding in `Logo` component as fallback if needed.

Open Graph image: `/public/images/og-default.svg` (replace with a licensed PNG/JPG later if desired).

## Admin portal

- Login: `/admin/login`
- Protected area: `/admin/*`
- Roles: Super Admin, Content Editor
- No public registration

### Bootstrap first Super Admin

```bash
# 1) Apply schema
npm run db:schema

# 2) Create Super Admin (password hashed with bcrypt)
ADMIN_BOOTSTRAP_EMAIL=you@faizzab.com \
ADMIN_BOOTSTRAP_NAME="Site Admin" \
ADMIN_BOOTSTRAP_PASSWORD='YourStrongPass!234' \
npm run admin:bootstrap
```

Set `ADMIN_SESSION_SECRET` to a long random value before production use.

## Deployment

See `HOSTINGER_DEPLOYMENT.md`.

## Checklists

- `LAUNCH_CHECKLIST.md`
- `SEO_CHECKLIST.md`

## License / ownership

© 2026 FAIZZAB INTEGRITY PRIVATE LIMITED. All rights reserved.
