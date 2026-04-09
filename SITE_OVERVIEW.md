# aiwant.ro v2 — Site Overview & Technical Documentation

---

## 1. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Language** | TypeScript | ^5 |
| **UI / Styling** | Tailwind CSS v4 | ^4 |
| **Animations** | Framer Motion | ^12 |
| **Icons** | Lucide React | ^0.577 |
| **Auth** | NextAuth.js (v5 beta) | ^5.0.0-beta.30 |
| **ORM** | Prisma | ^7.4 |
| **Database** | PostgreSQL (via `pg` driver) | — |
| **File Storage** | Vercel Blob | ^2.3 |
| **Charts** | Recharts | ^3.7 |
| **Validation** | Zod | ^4.3 |
| **Password hashing** | bcryptjs | ^3.0 |
| **Analytics** | Vercel Analytics | ^1.6 |
| **Fonts** | Sora (headings) + DM Sans (body) via `next/font` | — |
| **Deployment** | Vercel | — |

---

## 2. Architecture Overview

```
aiwant.ro v2
├── Public Marketing Site       → app/page.tsx
├── Service Detail Pages        → app/servicii/[slug]/
├── Auth Flow                   → app/auth/{login,register,pending,forgot-password}/
├── Client Portal               → app/portal/
├── Admin Panel                 → app/admin/
└── API Routes                  → app/api/
```

The project uses the **Next.js App Router** — all pages are React Server Components by default, with `"use client"` directives on components that use Framer Motion, hooks, or browser APIs.

**CSS Architecture:** Tailwind v4 uses `@theme inline {}` in `app/globals.css` — there is no `tailwind.config.js`. All brand CSS variables are defined there and consumed via `var(--color-*)` inline styles throughout components.

---

## 3. Public Marketing Site

**URL:** `/`

A single-page marketing site with the following sections (in order):

| Section | Component | Description |
|---|---|---|
| **Loading Screen** | `LoadingScreen.tsx` | Animated intro on first load |
| **Navbar** | `Navbar.tsx` | Scroll-spy active links, mobile hamburger |
| **Hero** | `Hero.tsx` | Headline + animated ROI dashboard visual with CountUp metrics |
| **Social Proof Bar** | `SocialProofBar.tsx` | 4 animated stats (CountUp): 10+ ani, proiecte, cod sursă, răspuns |
| **Pain Points** | `PainPoints.tsx` | 3-card section: Time / Error / Scale pain with profit-impact copy |
| **Services** | `ServicesSection.tsx` | 6 service cards linking to individual service pages |
| **Portfolio / Case Studies** | `PortfolioSection.tsx` | 4 projects, each with Problemă → Soluție → Rezultate structure |
| **Pricing** | `PricingSection.tsx` | 4 pricing tiers with featured card highlight |
| **Process** | `ProcessSection.tsx` | 4-step timeline: Descoperire → Planificare → Dezvoltare → Lansare |
| **About** | `AboutSection.tsx` | Team/company info |
| **Contact** | `ContactSection.tsx` | Free audit framing + form + WhatsApp link |
| **Footer** | `Footer.tsx` | Navigation, social links, legal |
| **WhatsApp Button** | `WhatsAppButton.tsx` | Floating button with bounce + wiggle animation |

**Service Detail Pages** (`/servicii/[slug]`) — individual pages for each service, powered by `lib/services-data.ts` and the `ServicePageTemplate.tsx` component.

### Brand Colors
```css
--color-gold:        #D4A843   /* Primary CTA, accents */
--color-midnight:    #0E1D33   /* Dark sections background */
--color-slate-deep:  #152847   /* Dark cards */
--color-surface:     #F7F5F0   /* Light sections */
--color-navy:        #234B72   /* Secondary brand */
```

---

## 4. Authentication System

**Provider:** NextAuth.js v5 (beta) with **Credentials** strategy (email + password).

**Session strategy:** JWT (stored in HTTP-only cookie).

### User Roles

| Role | Access |
|---|---|
| `PENDING` | Account created, awaiting admin approval. Redirected to `/auth/pending`. |
| `CLIENT` | Full access to the Client Portal (`/portal/*`). |
| `ADMIN` | Full access to the Admin Panel (`/admin/*`) and all portal data. |

### Auth Flow
1. User registers at `/auth/register` → account created with role `PENDING`
2. Admin approves at `/admin/clients` → role updated to `CLIENT`
3. User logs in at `/auth/login` → JWT issued with `id` + `role`
4. Sessions update in real time via NextAuth `trigger: "update"` callback

**Password security:** bcryptjs hashing. Forgot-password flow available at `/auth/forgot-password`.

---

## 5. Client Portal

**Base URL:** `/portal`

A private dashboard accessible to authenticated `CLIENT` and `ADMIN` users. Protected at the layout level via session check.

### Pages & Features

| Page | Route | Feature |
|---|---|---|
| **Dashboard** | `/portal` | Project overview, recent notifications |
| **Projects** | `/portal/projects` | List of all client projects with status |
| **Project Detail** | `/portal/projects/[id]` | Status, milestones, uptime, documents |
| **Project Documents** | `/portal/projects/[id]/documents` | Download contracts, invoices, reports |
| **Project Stats** | `/portal/projects/[id]/stats` | Analytics data (GA integration via `gaPropertyId`) |
| **Documents** | `/portal/documents` | All documents across all projects |
| **Invoices** | `/portal/invoices` | Invoice list with status (PENDING / PAID / OVERDUE) |
| **Notifications** | `/portal/notifications` | In-app notification inbox with mark-as-read |
| **Settings** | `/portal/settings` | Update name/company + change password |
| **Onboarding** | `/portal/onboarding` | First-login wizard (4 steps, see below) |

### Onboarding Wizard (first-time clients)
A 4-step form that collects client business profile and is saved to the `ClientProfile` model:
- **Step 1:** Company details (name, CIF, RegCom, address, industry, size)
- **Step 2:** Current online presence (website, social media, tools used, pain points)
- **Step 3:** Goals (main objectives, target audience, competitor/inspiration URLs)
- **Step 4:** Budget & timeline

### Uptime Monitoring
Projects can have a domain associated (`domain` field). A cron job at `/api/cron/uptime` periodically checks the domain and stores results in the `UptimeCheck` table. The portal shows uptime history and response times via `UptimeStats.tsx`.

---

## 6. Admin Panel

**Base URL:** `/admin`

Accessible only to users with role `ADMIN`.

| Page | Route | Feature |
|---|---|---|
| **Dashboard** | `/admin` | Overview stats |
| **Projects** | `/admin/projects` | All projects across all clients |
| **New Project** | `/admin/projects/new` | Create a project and assign to a client |
| **Project Edit** | `/admin/projects/[id]` | Edit project details, status, financial data |
| **Documents** | `/admin/projects/[id]/documents` | Upload documents (stored in Vercel Blob) |
| **Milestones** | `/admin/projects/[id]/milestones` | Add/complete project milestones |
| **Clients** | `/admin/clients` | List all registered users |
| **Client Detail** | `/admin/clients/[id]` | View client profile from onboarding |
| **Approve Clients** | `/admin/clients` | Approve PENDING accounts → CLIENT role |
| **Contacts** | `/admin/contacts` | View all contact form submissions from the website |
| **Settings** | `/admin/settings` | Admin account settings |

---

## 7. Database Schema (PostgreSQL via Prisma)

### Models

```
User              — id, email, password (hashed), name, company, phone, role, avatar
ClientProfile     — full onboarding data linked 1:1 to User
Project           — name, status, domain, dates, totalValue, monthlyFee, GA ids
Document          — file metadata, type (CONTRACT/INVOICE/etc.), invoice fields
UptimeCheck       — status, responseTime, checkedAt — linked to Project
Milestone         — title, completed, dueDate, order — linked to Project
ContactSubmission — name, email, phone, projectType, message (from website form)
Notification      — title, message, read, link — linked to User
```

### Enums
- `UserRole`: `PENDING | CLIENT | ADMIN`
- `ProjectStatus`: `DISCOVERY | IN_PROGRESS | REVIEW | COMPLETED | MAINTENANCE | PAUSED`
- `DocumentType`: `CONTRACT | ANNEX | INVOICE | REPORT | PROPOSAL | DESIGN | OTHER`
- `InvoiceStatus`: `PENDING | PAID | OVERDUE | CANCELLED`

---

## 8. API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/contact` | POST | Saves contact form submissions to DB |
| `/api/auth/register` | POST | Creates new user (role: PENDING) |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler |
| `/api/admin/approve` | POST | Approves PENDING user → CLIENT |
| `/api/admin/projects` | GET/POST | List / create projects |
| `/api/admin/projects/[id]` | GET/PATCH/DELETE | Project CRUD |
| `/api/admin/projects/[id]/milestones` | GET/POST | Milestone management |
| `/api/admin/projects/[id]/milestones/[milestoneId]` | PATCH/DELETE | Toggle / delete milestone |
| `/api/admin/documents/upload` | POST | Upload file to Vercel Blob, save metadata |
| `/api/portal/documents/[id]/download` | GET | Signed download URL from Vercel Blob |
| `/api/portal/notifications/read-all` | POST | Mark all notifications as read |
| `/api/portal/notifications/[id]/read` | PATCH | Mark single notification as read |
| `/api/portal/settings/profile` | PATCH | Update name/company |
| `/api/portal/settings/password` | PATCH | Change password (bcrypt verify + rehash) |
| `/api/portal/onboarding` | POST | Save onboarding wizard data → ClientProfile |
| `/api/cron/uptime` | GET | Cron: ping project domains, save UptimeCheck |

---

## 9. File Storage

Documents (contracts, invoices, reports) are uploaded by the admin and stored in **Vercel Blob**. The `fileUrl` is saved in the `Document` model. Clients download files via a signed URL returned by `/api/portal/documents/[id]/download`.

---

## 10. Analytics & Monitoring

- **Vercel Analytics** — page view tracking, integrated at root layout level (`<Analytics />`)
- **Google Analytics** — optional per-project GA4 integration via `gaPropertyId` / `gaMeasurementId` fields on the `Project` model
- **Uptime Monitoring** — cron-based HTTP checks stored in `UptimeCheck`, displayed in the portal

---

## 11. Content Management

All static marketing content lives in **`lib/constants.ts`** — no CMS. Editable arrays:
- `NAV_LINKS` — navbar items
- `STATS` — social proof bar numbers
- `SERVICES` — 6 service cards (title, description, icon)
- `PORTFOLIO` — 4 case studies (challenge, solution, impact metrics, tech stack)
- `PRICING` — 4 pricing tiers
- `PROCESS_STEPS` — 4-step process timeline
- `PROJECT_TYPES` — dropdown options in the contact form
- `WHATSAPP_NUMBER` / `WHATSAPP_MESSAGE` — WhatsApp button config

Service detail page content lives in **`lib/services-data.ts`**.

---

## 12. Deployment

- **Platform:** Vercel
- **Branch:** `v2` (active development) → `main` (production)
- **Environment variables required:**
  - `DATABASE_URL` — PostgreSQL connection string
  - `NEXTAUTH_SECRET` — JWT signing secret
  - `NEXTAUTH_URL` — canonical site URL
  - `BLOB_READ_WRITE_TOKEN` — Vercel Blob access token
- **Build command:** `next build` (Prisma client generated via `postinstall`)
- **TypeScript:** strict, no errors on build
