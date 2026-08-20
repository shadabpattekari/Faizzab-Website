# Launch Checklist — faizzab.com

Use this checklist before announcing production launch.

## Domain & HTTPS

- [ ] `faizzab.com` resolves to the Hostinger Node.js Web App
- [ ] HTTPS active with valid certificate
- [ ] Canonical preference enforced (`https://faizzab.com`)
- [ ] `www.faizzab.com` redirects to apex (or confirmed inverse if intentionally changed)

## Application

- [ ] `npm run build` succeeds in deployment environment
- [ ] `npm start` keeps the app running
- [ ] Homepage, About, Services, Contact load without console errors
- [ ] Custom 404 page works for unknown routes
- [ ] Mobile navigation usable at 320–430px widths
- [ ] Desktop layout verified at 1280 / 1440 / 1920

## Contact & email

- [ ] Contact form validates required fields
- [ ] Successful submission accepted
- [ ] Email received at `info@faizzab.com`
- [ ] Honeypot / spam submissions do not create noise
- [ ] Generic errors shown when SMTP is down (no stack traces)

## Admin portal

- [ ] MySQL schema applied
- [ ] Super Admin bootstrapped (no default `admin/admin` password)
- [ ] `/admin` redirects to `/admin/login` when logged out
- [ ] Valid login works; invalid login fails generically
- [ ] Content Editor cannot access user management
- [ ] Logout invalidates session
- [ ] Leads list is not public

## Corporate / legal accuracy

- [ ] Legal name: FAIZZAB INTEGRITY PRIVATE LIMITED
- [ ] CIN: U62020PN2026PTC259388
- [ ] Email: info@faizzab.com
- [ ] Phone: +91 91757 68019
- [ ] Queries/Grievances: Nazneen Pattekari, Director
- [ ] Registered office wording consistent on Contact, Corporate Information, footer, schema
- [ ] Privacy / Terms / Disclaimer / Cookie Policy reviewed by qualified legal counsel before reliance

## SEO & discoverability

- [ ] Unique titles/descriptions on major pages
- [ ] `/sitemap.xml` present and correct
- [ ] `/robots.txt` present; admin/API disallowed
- [ ] Favicon loads
- [ ] Open Graph image present
- [ ] Organization JSON-LD validates (no fake ratings)

## Content claims

- [ ] No fake clients, testimonials, awards or metrics
- [ ] Academy marked Coming Soon
- [ ] GRC Platform marked In Development
- [ ] No certification-body or statutory-auditor claims

## Operations

- [ ] Hostinger backups enabled
- [ ] Environment variables stored only in hPanel (not Git)
- [ ] Final production build deployed
- [ ] Smoke test completed after DNS/SSL changes
