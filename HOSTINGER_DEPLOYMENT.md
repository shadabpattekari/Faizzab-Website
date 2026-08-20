# Hostinger Deployment Guide — faizzab.com

This project is designed for **Hostinger Business Web Hosting** using the **Node.js Web App** feature. No VPS, Docker, Vercel, Netlify or external app host is required.

Canonical production URL: **https://faizzab.com**

---

## Prerequisites

- Hostinger Business plan with Node.js Web App support
- Domain `faizzab.com` already on Hostinger
- GitHub repository access (Method A) or a project ZIP (Method B)
- SMTP mailbox for `info@faizzab.com` (Hostinger email recommended)
- Hostinger MySQL database (required for admin portal / lead storage)

---

## Method A — GitHub (recommended)

1. Push this repository to GitHub.
2. In Hostinger **hPanel**:
   - Go to **Websites** → **Add Website** (or manage the existing site for faizzab.com)
   - Choose **Node.js Web App**
   - Select **Import Git Repository**
   - Connect the repository and branch (`main` or your release branch)
3. Configure application settings:
   - **Node.js version:** 20.x (or 18.x+)
   - **Build command:** `npm run build`
   - **Start command:** `npm start`
   - **Root / application directory:** repository root (where `package.json` lives)
4. Add environment variables (see below).
5. Deploy / rebuild.
6. Connect domain **faizzab.com** to the Node.js app if not already linked.
7. Enable / verify **SSL** (Let's Encrypt) for HTTPS.
8. Set canonical redirect: prefer `www.faizzab.com` → `https://faizzab.com` (or confirm Hostinger domain settings use apex as primary).
9. Test:
   - Homepage loads over HTTPS
   - `/contact` form submits
   - `/admin/login` is reachable (after MySQL + bootstrap)
   - `/sitemap.xml` and `/robots.txt` resolve

---

## Method B — ZIP upload

1. On your computer, create a clean ZIP of the project **without** `node_modules` and `.next`:
   - Include `package.json`, `package-lock.json`, `src/`, `public/`, config files and docs.
2. In Hostinger hPanel:
   - **Websites** → Node.js Web App for faizzab.com
   - Use **Upload** / file manager ZIP import according to Hostinger’s Node.js Web App flow
3. Set the same build/start commands as Method A.
4. Configure environment variables.
5. Trigger install + build + start.
6. Connect domain + SSL and test as above.

---

## Environment variables (hPanel)

Set these in the Node.js Web App environment configuration:

```text
NEXT_PUBLIC_SITE_URL=https://faizzab.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@faizzab.com
SMTP_PASS=********
CONTACT_TO_EMAIL=info@faizzab.com
CONTACT_FROM_EMAIL=info@faizzab.com
MYSQL_HOST=********
MYSQL_PORT=3306
MYSQL_DATABASE=********
MYSQL_USER=********
MYSQL_PASSWORD=********
ADMIN_SESSION_SECRET=generate-a-long-random-32+-char-secret
```

Optional:

```text
NEXT_PUBLIC_ANALYTICS_ID=
```

Bootstrap credentials are **not** required as permanent env vars. Use them only when running the bootstrap script once (SSH/terminal if available, or a one-off local run against production MySQL with care).

---

## Database setup

1. Create a MySQL database in Hostinger.
2. From an environment with network access to MySQL:

```bash
export MYSQL_HOST=...
export MYSQL_DATABASE=...
export MYSQL_USER=...
export MYSQL_PASSWORD=...
npm run db:schema
```

3. Create the first Super Admin:

```bash
export ADMIN_BOOTSTRAP_EMAIL=you@faizzab.com
export ADMIN_BOOTSTRAP_NAME="Site Admin"
export ADMIN_BOOTSTRAP_PASSWORD='YourStrongPass!234'
npm run admin:bootstrap
```

4. Sign in at `https://faizzab.com/admin/login`

---

## Email setup notes

- Use the Hostinger mailbox for `info@faizzab.com`.
- Prefer SMTP port **465** (SSL) or **587** (STARTTLS) according to Hostinger mail docs.
- `CONTACT_FROM_EMAIL` should be an authorised sender on your mail account.

The website remains deployable if MySQL is temporarily unavailable, provided SMTP is configured for contact delivery (and vice versa for lead storage). Admin CMS features require MySQL.

---

## Post-deploy verification

- [ ] `https://faizzab.com` loads
- [ ] SSL valid
- [ ] Contact form delivers to `info@faizzab.com`
- [ ] Legal/corporate pages show correct CIN and address
- [ ] Admin login works; unauthenticated `/admin` redirects to login
- [ ] `robots.txt` disallows `/admin` and `/api/`
- [ ] Sitemap lists public pages only

See also `LAUNCH_CHECKLIST.md`.

---

## What not to do

- Do not purchase a VPS solely for this website.
- Do not migrate to WordPress for this stack.
- Do not require Vercel/Netlify for production.
- Do not commit `.env` files or real passwords to Git.
