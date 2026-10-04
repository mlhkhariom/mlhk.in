# MLHK.IN — Master Plan & Roadmap (v2)

> **MLHK Infotech** | IT & Digital Solutions | Shajapur, Madhya Pradesh
> Founder & CEO: Hariom Vishwkarma | Founded: April 2020
>
> **v2 rewritten 2026-10-04** from the actual codebase state. v1 planned the build; v2 audits
> what exists, locks architecture decisions, and lays out the remaining phases.

---

## 0. Current status snapshot (verified from code)

### ✅ Built and working
- **Public site** — Home, About, Services, Portfolio, Blog (list + post), Subsidiaries (list + detail),
  dynamic CMS pages (`/p/[slug]`), Contact. Navbar/menus and Footer are DB-driven via `src/lib/site.ts`.
- **CMS** — Blog posts (list/new/edit/delete), Pages, Services, Portfolio, Testimonials, Subsidiaries,
  Media library, Menu editor, Site Settings (per-field persistence via `site_settings`).
- **CRM** — Leads (with inline status pipeline), Clients, Follow-ups (pending/completed).
- **ERP** — Projects + Kanban tasks, Invoices (GST line-item builder + status), Expenses, Support tickets.
- **Admin shell** — Sidebar, global search across 7 modules, dashboard counts.
- **Infra** — D1 with 3 migrations (all tables created), better-auth email/password login, edge runtime.
- Deploy pipeline: `opennextjs-cloudflare build && deploy` to Worker `mlhk-in`.

### ⚠️ Built but broken / non-functional
| Item | Problem |
|---|---|
| Media library | R2 bucket **not bound** (`r2_buckets: []`). Upload writes DB row only, stores bare R2 *key* as `url`. Images never render. |
| Pages edit/delete | `api/admin/pages` has no `PATCH`/`DELETE`, but UI uses `CrudTable` which sends both. |
| Expenses edit | `api/admin/expenses` has no `PATCH`; `CrudTable` edit silently fails. |
| New blog post cover image | `posts` POST drops `coverImage` (not in the destructured body). |
| `/admin/settings` | Hardcoded stub, no persistence at all. |
| `/admin/cms/settings — Appearance/`Announcement | `announcement_bar` key appears in two sections; saves race each other. |

### ❌ Not started
- **Client portal** — `src/app/portal/{dashboard,projects,invoices,support,tickets}` are empty dirs; no routes exist.
- **RBAC** — `users.role` enum exists but is never read anywhere.
- **Email** — `resend` dependency + `RESEND_API_KEY` present, **never imported**.
- **SEO** — `sitemap.ts` is hardcoded; no structured data, OG images, RSS, or per-page canonical.
- **HR / attendance / milestones** — described in v1, no schema or UI.

### 🔴 Live security issues (fix first)
1. **Every `/api/admin/*` route is unauthenticated.** No route checks a session. Full anonymous read/write
   of CRM, ERP and CMS via `curl`.
2. **Middleware is presence-only.** `src/middleware.ts` checks the *existence* of
   `better-auth.session_token` (a forged value passes), only guards page routes, never `/api/admin/*`,
   and the cookie name won't match better-auth's `__Secure-` prefixed cookie in production.
3. **Stored XSS.** Rich-editor HTML is rendered with `dangerouslySetInnerHTML`
   (`blog/[slug]/page.tsx:26`, `p/[slug]/page.tsx:29`) with no sanitization. Combined with (1), anyone
   can inject `<script>` into a post.
4. **No spam protection** on the public contact form.

### 🐛 Known correctness issues
- Duplicate `/` route: both `src/app/page.tsx` (re-export) and `src/app/(public)/page.tsx` resolve to `/`.
  Build manifest contains both `"/(public)/page"` and `"/page"`.
- `services.active` / `subsidiaries.active` are sent as **strings** `"true"`/`"false"` into integer boolean columns.
- Follow-ups POST sends `leadId: ""` / `clientId: ""` — empty string can violate the FK.
- Invoice numbers use `INV-${Date.now().slice(-6)}` — collision-prone.
- `src/lib/cf-env.ts` is dead code (reads a `__env__` global that is never set).
- `src/lib/r2/index.ts` is unused and hardcodes an R2 endpoint URL.
- `export const runtime = "edge"` inside `src/lib/site.ts` is meaningless (not a route).
- Unused `redirect` import in `src/app/(auth)/layout.tsx`.

---

## 1. Locked architecture decisions

| Decision | Choice | Reason |
|---|---|---|
| Hosting | **Cloudflare Workers** (via `@opennextjs/cloudflare`) | Not Pages. Everything runs in one Worker. |
| Runtime | **Remove `runtime = "edge"` from pages** | Legacy in Next 16 + OpenNext; it is redundant and blocks caching. |
| Public rendering | **ISR** (`revalidate`) over `force-dynamic` | Free tier Workers have a **10 ms CPU/invocation** limit. SSR every request will blow it. |
| Incremental cache | **R2**, not KV | KV free tier allows only ~1,000 writes/day. R2 is far cheaper for cache churn. |
| Sessions | **D1** (already the case) | KV write limits make it a poor session store. |
| Media storage | **R2 + custom domain + `next/image`** | Cloudflare Images / Image Resizing are **paid**. R2 egress is free. |
| Auth | better-auth **+ explicit session checks in every API route** + Cloudflare Access on `/admin` | Defense in depth; Access alone doesn't protect the API. |
| Email | **Resend** (outbound) + **Email Routing** (inbound, `hello@mlhk.in`) | Both free at this scale. |
| SEO automation | Dynamic sitemap/metadata/JSON-LD + Workers AI meta generation | See §4. |
| Analytics | Cloudflare Web Analytics | Free, no cookie banner needed. |

**Why this matters:** ISR + edge cache is the single change that simultaneously (a) keeps the project
inside the free CPU budget, (b) makes Core Web Vitals green — a Google ranking factor, and (c) drops D1
reads to near zero.

---

## 2. Cloudflare free-tier budget

> Numbers are approximate and change often — **confirm in the dashboard before sizing decisions.**

| Service | Free tier | Notes for this project |
|---|---|---|
| Workers | ~100k req/day, **10 ms CPU/invocation** | The real constraint. ISR keeps CPU near zero. |
| D1 | ~5 GB, ~5M rows read/day, ~100k rows written/day | Plenty at personal scale. Writes are the tighter axis. |
| KV | ~100k reads, **~1k writes/day**, 1 GB | Cache/session only if unavoidable. Prefer D1/R2. |
| R2 | ~10 GB storage, free egress, ~10M read ops/month | Media + incremental cache live here. |
| Workers AI | ~10k Neurons/day | Enough for auto meta/excerpt generation. |
| Turnstile | Unlimited, free | Contact + login bot protection. |
| Zero Trust Access | Free up to 50 users | Gate `/admin`. |
| Email Routing | Free | Inbound `hello@mlhk.in`. |
| Cron Triggers | Free (with limits) | Reminders, overdue marking, pings, backups. |
| Web Analytics | Free | Privacy-friendly page analytics. |
| Cloudflare Images / Image Resizing | ❌ Paid | Avoid — use R2 + `next/image`. |

---

## 3. Phase roadmap

### Phase 0 — Security hardening (P0, do before anything else) — 🟡 in progress

> ⚠️ **Ops step required before this deploys.** The new guards reject anyone whose
> `users.role` is not `super_admin | admin | manager | employee`. Existing accounts default
> to `client`, so promote your own account first or you will lock yourself out of `/admin`:
>
> ```bash
> wrangler d1 execute mlhk-in --remote --command \
>   "UPDATE users SET role='super_admin' WHERE email='<your-admin-email>';"
> ```

- [x] `src/lib/auth/session.ts` — `requireAdmin()` + `getSessionFromHeaders()`.
- [x] Guard applied to **all 19 routes** under `src/app/api/admin/**`.
- [x] `src/app/admin/layout.tsx` — authoritative session + role guard for admin pages.
- [x] `src/middleware.ts` — fast pre-filter; handles both `better-auth.session_token`
      and the `__Secure-` production variant (old code broke admin in prod).
- [x] Contact form honeypot + server-side validation (dependency-free spam reduction).
- [x] Rich-text HTML sanitized on write — `src/lib/sanitize.ts` (Workers-safe allowlist).
- [x] Security headers + CSP in `next.config.ts`.
- [x] Added missing `PATCH`/`DELETE` to `api/admin/pages`, `PATCH` to `api/admin/expenses`.
- [x] Deleted duplicate `src/app/page.tsx`.
- [x] Boolean fields normalized via `toBool()` (services, subsidiaries, testimonials).
- [x] Follow-up FK: `null` instead of `""` (fixes possible constraint violation).
- [x] Collision-safe invoice numbers (`INV-YYYY-NNNN` + retry).
- [ ] **Cloudflare Access** policy on `mlhk.in/admin*` — dashboard step, manual.
- [ ] **Turnstile** on contact + login — needs Cloudflare keys (`TURNSTILE_SECRET_KEY`,
      `NEXT_PUBLIC_TURNSTILE_SITE_KEY`); verification helper not wired yet.

### Phase 1 — Free-tier performance

- [ ] Remove `export const runtime = "edge"` from all pages; keep it only where genuinely required.
- [ ] Replace `export const dynamic = "force-dynamic"` with `export const revalidate = 60` on public
      pages (home, services, portfolio, blog list, subsidiaries), `revalidate = 300` for detail pages.
- [ ] Configure R2 incremental cache in `open-next.config.ts`.
- [ ] Add Cloudflare **Cache Rules** for HTML + static assets.
- [ ] Switch `<img>` → `next/image` with the R2 custom domain in `next.config.ts` `images.remotePatterns`.
- [ ] Add `sizes`/priority to hero images; audit LCP.

### Phase 2 — SEO automation  (detailed spec in §4)

- [ ] Dynamic `src/app/sitemap.ts` from D1 (posts, pages, services, portfolio, subsidiaries).
- [ ] `src/lib/seo.ts` — metadata builder (canonical, OG, Twitter) reading `site_settings`.
- [ ] Apply `generateMetadata` to every public page.
- [ ] JSON-LD structured data (Organization, LocalBusiness, BlogPosting, BreadcrumbList, ItemList).
- [ ] Dynamic OG images per post/page via `next/og` `ImageResponse`.
- [ ] RSS feed at `/feed.xml`.
- [ ] IndexNow ping on publish (route or Cron).
- [ ] Workers AI: auto-generate meta description + excerpt + tags on post publish.
- [ ] Cloudflare Web Analytics script + Search Console / Bing verification via `site_settings`.

### Phase 3 — Media & R2

- [ ] Bind the R2 bucket in `wrangler.jsonc`; add `r2_buckets` entry.
- [ ] Rewrite `api/admin/media` to return a real public URL and use the bucket binding.
- [ ] Attach a **custom domain** to the R2 bucket for stable public URLs.
- [ ] Wire media picker into `RichEditor` (replace the URL `prompt()`) and into post cover images.
- [ ] Fix `coverImage` on post create (Phase 0 bug list).
- [ ] Add image size/dimension metadata to the media table.

### Phase 4 — Email & background automation

- [ ] `src/lib/email.ts` using **Resend**; templates for lead reply, invoice send, ticket update.
- [ ] "Email from CRM" action on lead/client detail.
- [ ] **Email Routing**: `hello@mlhk.in` → `Mlhkinfotech@gmail.com`.
- [ ] **Cron Trigger** worker:
  - [ ] Mark invoices `sent` + past `dueDate` as `overdue`.
  - [ ] Follow-up due reminders → daily digest email.
  - [ ] Sitemap / IndexNow ping after content changes.
  - [ ] Nightly D1 export → R2 backup.
- [ ] Queue (verify free-tier availability) for non-blocking email/PDF work.

### Phase 5 — Client portal & RBAC

- [ ] Implement `src/app/portal/{dashboard,projects,invoices,support,tickets}/page.tsx` (currently empty).
- [ ] Session + role guard; **scope every query to the logged-in client's own rows**.
- [ ] Link `users.id` ↔ `clients.userId` on client creation.
- [ ] Ticket message threads (`ticket_messages` table already exists, unused).
- [ ] Enforce the role matrix (§6) in both UI and API.

### Phase 6 — ERP deepening

- [ ] GST invoice PDF. *Note: no headless browser on Workers — use client-side print-to-PDF or
       `pdf-lib` in the Worker.*
- [ ] Milestones model + UI (v1 mentions it; not in schema yet).
- [ ] HR: team management, attendance, leave requests.
- [ ] Reports: conversion rate, revenue by source, revenue dashboard.

### Phase 7 — Launch & polish

- [ ] Replace the `/admin/settings` stub with real persistence (or remove it).
- [ ] Mobile responsive audit across public + admin.
- [ ] Error monitoring (Workers Logs; add Sentry free tier if needed).
- [ ] 404/redirect hygiene; canonical host enforcement.
- [ ] Custom domain `mlhk.in` + Web Analytics final hookup.

---

## 4. SEO automation — detailed spec

Goal: publish content and **SEO takes care of itself** — no manual meta tags, no manual sitemap edits.

| Piece | File | Behaviour |
|---|---|---|
| Sitemap | `src/app/sitemap.ts` | Query D1 for `published` posts/pages + active services/portfolio/subsidiaries. Uses `revalidate`. |
| Robots | `src/app/robots.ts` | Already exists; keep `disallow: /admin, /portal, /api`. |
| Metadata | `src/lib/seo.ts` + per-page `generateMetadata` | Title template, description, canonical, OG, Twitter card — values from `site_settings` (`meta_title`, `meta_description`, `og_image`), fallback to page content. |
| Structured data | `src/components/seo/JsonLd.tsx` | `Organization`+`LocalBusiness` on home, `BlogPosting` on posts, `BreadcrumbList` on nested pages, `ItemList` on listings. |
| OG images | `*/opengraph-image.tsx` | `next/og` `ImageResponse` renders title + brand per post/page automatically. |
| RSS | `src/app/feed.xml/route.ts` | Latest 20 published posts. |
| IndexNow | `src/app/api/indexnow/route.ts` + Cron | Ping Bing/Yandex on publish. Key file at `/public/<key>.txt`. |
| Auto meta | publish handler + `env.AI` | On publish, Workers AI generates `meta_description`, `excerpt`, and tags if empty. |
| Analytics | root layout | Cloudflare Web Analytics beacon. |
| Verification | `site_settings` | Store Google/Bing verification codes; render meta tags from settings. |

**Content hygiene rules baked into the plan:** one `<h1>` per page, descriptive slugs, real
`lastModified` in sitemap, canonical on every page, no `force-dynamic` on cacheable content.

---

## 5. Cloudflare ecosystem tool checklist

- [ ] **Turnstile** — contact form + login
- [ ] **Zero Trust Access** — `/admin` (email OTP, ≤50 users free)
- [ ] **R2** — media + incremental cache + D1 backups
- [ ] **R2 custom domain** — stable public media URLs
- [ ] **Email Routing** — `hello@mlhk.in` inbound
- [ ] **Resend** — outbound transactional email
- [ ] **Workers AI** — auto SEO meta, lead summaries
- [ ] **Cron Triggers** — overdue invoices, reminders, pings, backups
- [ ] **Cache Rules** — HTML/assets edge caching
- [ ] **Web Analytics** — page analytics
- [ ] **Workers Logs / observability** — already `observability.enabled: true`
- [ ] **Cloudflare Registrar** — domain at cost (optional)
- [ ] **DMARC / Email security** — anti-spoofing for mlhk.in (free)
- [ ] ❌ Skip Cloudflare Images / Image Resizing — paid

---

## 6. Roles & Access Control

| Role | Access |
|---|---|
| Super Admin (Hariom) | Everything |
| Admin | CMS + CRM + ERP full |
| Manager | CRM + Projects + Invoices |
| Employee | Assigned tasks only |
| Client | Portal — own projects + invoices + tickets |

**Enforcement plan:** `requireRole(env, req, [...])` in Phase 0's session helper, applied per route group.
Portal queries scoped by `clients.userId` in Phase 5. The enum already exists on `users.role`; only
enforcement is missing.

---

## 7. Subsidiaries

| Brand | Sector |
|---|---|
| Erotix Green Energy | Solar / Renewable Energy |
| IKSC India | E-commerce (India Ka Shopping Centre) |
| Red Xerox Studio | Creative / Design Studio |
| RX Media | Media & Content |
| TET News | News / Media |
| Hariom Vishwkarma Institute of Technology | Education / Training |

---

## 8. Company Info

- **Website**: mlhk.in
- **Location**: Barnawad, Shajapur, Madhya Pradesh (Near Hanuman Temple)
- **Founded**: April 2020
- **Founder**: Hariom Vishwkarma ([@mlhkhariom](https://github.com/mlhkhariom))
- **Services**: Custom Software, Mobile Apps, SaaS, CRM/ERP, Cybersecurity, Digital Marketing, AI Automation
