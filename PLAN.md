# MLHK.IN — Complete Project Plan

> **MLHK Infotech** | IT & Digital Solutions | Shajapur, Madhya Pradesh  
> Founder & CEO: Hariom Vishwkarma | Founded: April 2020

---

## Vision

mlhk.in ek unified digital platform hai jo ek saath kaam karega as:
- **Public Website** — Company showcase, services, blog, subsidiaries
- **CMS** — Content manage karo bina code ke
- **CRM** — Leads, clients, follow-ups, pipeline
- **ERP** — Projects, invoices, team, expenses, support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Hosting | Cloudflare Pages |
| Database | Cloudflare D1 (SQLite) |
| File Storage | Cloudflare R2 |
| Cache / Sessions | Cloudflare KV |
| Auth | Better Auth (Edge compatible) |
| ORM | Drizzle ORM |
| Email | Resend |
| UI | Tailwind CSS + shadcn/ui |
| Analytics | Cloudflare Web Analytics (free) |

---

## Folder Structure

```
mlhk.in/
├── app/
│   ├── (public)/                  # Public website
│   │   ├── page.tsx               # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── subsidiaries/          # Erotix, IKSC, RX Media, TET News etc.
│   │
│   ├── (auth)/                    # Login / Register
│   │   ├── login/
│   │   └── register/
│   │
│   ├── admin/                     # Admin Panel (CMS + CRM + ERP)
│   │   ├── dashboard/
│   │   ├── cms/                   # Blog, Pages, Media
│   │   ├── crm/                   # Leads, Clients, Follow-ups
│   │   ├── erp/                   # Projects, Invoices, HR, Tickets
│   │   └── settings/
│   │
│   └── portal/                    # Client Portal
│       ├── dashboard/
│       ├── projects/
│       ├── invoices/
│       └── support/
│
├── components/
│   ├── ui/                        # shadcn components
│   ├── public/                    # Public website components
│   └── admin/                     # Admin panel components
│
├── lib/
│   ├── db/                        # Drizzle schema + queries
│   ├── auth/                      # Better Auth config
│   └── r2/                        # R2 file upload helpers
│
├── wrangler.toml
├── drizzle.config.ts
└── PLAN.md
```

---

## Features — Deep Breakdown

### 1. Public Website (CMS-driven)
- Hero, About, Services, Portfolio, Blog, Contact
- Subsidiaries pages: Erotix Green Energy, IKSC India, Red Xerox Studio, RX Media, TET News
- SEO optimized (meta tags, OG, sitemap.xml, robots.txt)
- Contact form → auto-save as CRM lead
- WhatsApp chat button
- Mobile responsive

### 2. CMS — Content Management System
- Blog posts (create / edit / publish / draft)
- Pages editor (rich text)
- Services & Portfolio manage
- Media library (R2 upload)
- Testimonials
- SEO settings per page

### 3. CRM — Client Relationship Management
- Lead capture (website form + manual)
- Pipeline: `New → Contacted → Proposal → Won / Lost`
- Client profiles (company, contacts, history)
- Follow-up reminders & notes
- Email from CRM (via Resend)
- Lead source tracking
- Reports: conversion rate, revenue by source

### 4. ERP — Business Operations

**Projects**
- Create project, assign team
- Task management (Kanban board)
- Milestones & deadlines
- Client portal access per project

**Finance**
- GST-ready invoice generation (PDF)
- Payment status: Paid / Pending / Overdue
- Expense tracking
- Revenue dashboard

**HR / Team**
- Team member management
- Role-based access control
- Basic attendance & leave requests

**Support**
- Client ticket submission
- Admin assign & resolve
- Status: `Open → In Progress → Resolved`

---

## Database Schema (D1 — Key Tables)

```
users, sessions                     → Auth
leads, clients, follow_ups          → CRM
projects, tasks, milestones         → ERP Projects
invoices, invoice_items, expenses   → Finance
blog_posts, pages, media            → CMS
services, portfolio, testimonials   → Website
tickets, ticket_messages            → Support
subsidiaries                        → Company brands
settings                            → Global config
```

---

## Roles & Access Control

| Role | Access |
|---|---|
| Super Admin (Hariom) | Everything |
| Admin | CMS + CRM + ERP full |
| Manager | CRM + Projects + Invoices |
| Employee | Assigned tasks only |
| Client | Portal — own projects + invoices + tickets |

---

## Subsidiaries

| Brand | Sector |
|---|---|
| Erotix Green Energy | Solar / Renewable Energy |
| IKSC India | E-commerce (India Ka Shopping Centre) |
| Red Xerox Studio | Creative / Design Studio |
| RX Media | Media & Content |
| TET News | News / Media |
| Hariom Vishwkarma Institute of Technology | Education / Training |

---

## Development Phases

### ✅ Phase 1 — Foundation (Week 1-2)
- [ ] Next.js 15 + Cloudflare Pages setup
- [ ] `wrangler.toml` config (D1, KV, R2)
- [ ] Drizzle ORM + D1 schema (all tables)
- [ ] Better Auth (login / register / roles / sessions via KV)
- [ ] Base layout + Tailwind CSS + shadcn/ui
- [ ] Middleware (route protection by role)

### Phase 2 — Public Website (Week 3-4)
- [ ] Homepage, About, Services, Portfolio
- [ ] Blog (CMS-driven, dynamic routes)
- [ ] Contact form → CRM lead auto-save
- [ ] Subsidiaries pages
- [ ] SEO + sitemap.xml + robots.txt

### Phase 3 — CMS (Week 5)
- [ ] Admin panel layout + sidebar
- [ ] Blog / Pages / Media management
- [ ] R2 file upload integration

### Phase 4 — CRM (Week 6-7)
- [ ] Lead pipeline (Kanban)
- [ ] Client profiles
- [ ] Follow-ups + email (Resend)

### Phase 5 — ERP (Week 8-10)
- [ ] Projects + Tasks (Kanban)
- [ ] Invoice generation (PDF, GST)
- [ ] Expense tracking
- [ ] Support tickets

### Phase 6 — Client Portal (Week 11)
- [ ] Client login
- [ ] View own projects, invoices, tickets

### Phase 7 — Launch (Week 12)
- [ ] Mobile responsive audit
- [ ] Performance optimization
- [ ] Custom domain mlhk.in on Cloudflare
- [ ] Cloudflare Web Analytics setup

---

## Company Info

- **Website**: mlhk.in
- **Location**: Barnawad, Shajapur, Madhya Pradesh (Near Hanuman Temple)
- **Founded**: April 2020
- **Founder**: Hariom Vishwkarma ([@mlhkhariom](https://github.com/mlhkhariom))
- **Services**: Custom Software, Mobile Apps, SaaS, CRM/ERP, Cybersecurity, Digital Marketing, AI Automation
