# CLAUDE CODE PROMPT — Client Portal aiwant.ro

## GENERAL CONTEXT

Build a **client portal** for aiwant.ro — a protected area where each client of Vendor Comp SRL can:
1. **View and manage their services/projects** with the company
2. **Access legal documents** (signed contracts, annexes, invoices, progress reports)
3. **See real-time stats** about their website/application (traffic, performance, uptime)

The portal is integrated into the existing aiwant.ro Next.js site, accessible via a "Contul meu" button in the navbar.

**Language**: Romanian (all UI). Code comments in English.

---

## TECH STACK

- **Framework**: Next.js 14+ (App Router) — extending the existing aiwant.ro project
- **Database**: PostgreSQL via Prisma ORM on Neon (our standard DB setup)
- **Auth**: NextAuth.js v5 (Auth.js) with credentials provider (email + password)
- **File storage**: Vercel Blob (for document uploads — PDFs, images)
- **Styling**: Tailwind CSS (using existing aiwant.ro color system)
- **Charts**: Recharts (lightweight, React-native charting library)
- **Animations**: Framer Motion (match existing site patterns)
- **Icons**: Lucide React

---

## EXISTING COLOR SYSTEM (use these)

```
--color-gold: #D4A843
--color-gold-light: #E4C36A
--color-navy: #234B72
--color-navy-light: #2E6090
--color-midnight: #0E1D33
--color-slate-deep: #152847
--color-surface: #F7F5F0
--color-surface-warm: #FDF9F1
--color-text-primary: #1A1A1A
--color-text-secondary: #5A5A5A
--color-text-on-dark: #F0ECE3
--color-text-muted: #8A9BB5
--color-border: #E0DCD3
--color-border-dark: #243B5E
--color-success: #10B981
--color-glow: rgba(212,168,67,0.2)
```

**Portal-specific additions**:
```
--color-danger: #EF4444       (errors, overdue invoices, downtime)
--color-warning: #F59E0B      (pending items, attention needed)
--color-info: #3B82F6         (informational badges)
```

---

## DATABASE SCHEMA (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN       // Vlad — full access to everything
  CLIENT      // Approved client — sees only their own data
  PENDING     // Registered but not yet approved
}

enum ProjectStatus {
  DISCOVERY       // Initial discussions
  IN_PROGRESS     // Active development
  REVIEW          // Client review
  COMPLETED       // Delivered
  MAINTENANCE     // Ongoing hosting/maintenance
  PAUSED          // Temporarily paused
}

enum DocumentType {
  CONTRACT        // Contractul cadru semnat
  ANNEX           // Anexe (oferte acceptate, comenzi)
  INVOICE         // Facturi emise
  REPORT          // Rapoarte de progres / livrabile
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // bcrypt hashed
  name          String
  company       String?   // Numele firmei clientului
  phone         String?
  role          UserRole  @default(PENDING)
  avatar        String?   // URL to Vercel Blob
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  projects      Project[]
  notifications Notification[]
}

model Project {
  id            String        @id @default(cuid())
  name          String        // e.g. "avocatneagumaria.ro"
  description   String?
  status        ProjectStatus @default(DISCOVERY)
  domain        String?       // e.g. "avocatneagumaria.ro" — used for stats
  startDate     DateTime?
  endDate       DateTime?
  totalValue    Float?        // EUR value of project
  monthlyFee    Float?        // EUR monthly hosting/maintenance fee
  
  // Google Analytics integration
  gaPropertyId  String?       // GA4 property ID (e.g. "properties/123456")
  gaMeasurementId String?     // GA4 measurement ID (e.g. "G-XXXXXXXXXX")
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  client        User      @relation(fields: [clientId], references: [id])
  clientId      String
  documents     Document[]
  uptimeChecks  UptimeCheck[]
  milestones    Milestone[]
}

model Document {
  id            String       @id @default(cuid())
  name          String       // e.g. "Contract Cadru - avocatneagumaria.ro"
  type          DocumentType
  fileUrl       String       // Vercel Blob URL
  fileSize      Int?         // bytes
  description   String?
  
  // Invoice-specific fields
  invoiceNumber String?
  invoiceAmount Float?
  invoiceDueDate DateTime?
  invoiceStatus InvoiceStatus?
  
  uploadedAt    DateTime  @default(now())
  
  project       Project   @relation(fields: [projectId], references: [id])
  projectId     String
}

model UptimeCheck {
  id            String   @id @default(cuid())
  status        Int      // HTTP status code (200, 500, etc.)
  responseTime  Int      // milliseconds
  checkedAt     DateTime @default(now())
  
  project       Project  @relation(fields: [projectId], references: [id])
  projectId     String
  
  @@index([projectId, checkedAt])
}

model Milestone {
  id            String   @id @default(cuid())
  title         String   // e.g. "Design aprobat", "Lansare site"
  description   String?
  completed     Boolean  @default(false)
  completedAt   DateTime?
  dueDate       DateTime?
  order         Int      @default(0)
  
  project       Project  @relation(fields: [projectId], references: [id])
  projectId     String
}

model Notification {
  id            String   @id @default(cuid())
  title         String
  message       String
  read          Boolean  @default(false)
  link          String?  // internal link to relevant page
  createdAt     DateTime @default(now())
  
  user          User     @relation(fields: [userId], references: [id])
  userId        String
}
```

---

## AUTHENTICATION FLOW

### Registration (Client self-registers)
1. Client goes to `/auth/register`
2. Fills form: Nume, Email, Parolă, Confirmare parolă, Firma (opțional), Telefon (opțional)
3. Account is created with `role: PENDING`
4. Client sees: "Contul tău a fost creat. Vei primi un email de confirmare când administratorul aprobă accesul."
5. **Admin (Vlad) receives a notification** (in admin panel + optional email) about new registration
6. Admin approves → role becomes `CLIENT`
7. Client can now log in and see their dashboard

### Login
- Route: `/auth/login`
- Email + password (bcrypt)
- "Am uitat parola" link (sends reset email — implement with a token-based flow)
- After login → redirect to `/portal`
- If `role === PENDING` → show "Contul tău este în așteptarea aprobării" page

### Session
- NextAuth.js session with JWT strategy
- Session includes: userId, role, name, email
- Middleware protects all `/portal/*` routes — redirect to login if not authenticated
- Middleware checks `role !== PENDING` for portal access

---

## ROUTE STRUCTURE

```
app/
├── auth/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── reset-password/page.tsx
├── portal/
│   ├── layout.tsx              (sidebar navigation, auth wrapper)
│   ├── page.tsx                (dashboard — overview)
│   ├── projects/
│   │   ├── page.tsx            (list all client's projects)
│   │   └── [id]/
│   │       ├── page.tsx        (single project details)
│   │       ├── documents/page.tsx  (project documents)
│   │       └── stats/page.tsx  (project website stats)
│   ├── documents/page.tsx      (all documents across projects)
│   ├── invoices/page.tsx       (all invoices with status)
│   ├── notifications/page.tsx  (notification center)
│   └── settings/page.tsx       (profile settings, change password)
├── admin/                      (ADMIN ONLY — Vlad's panel)
│   ├── layout.tsx              (admin sidebar, role check)
│   ├── page.tsx                (admin dashboard)
│   ├── clients/
│   │   ├── page.tsx            (all clients list, approve pending)
│   │   └── [id]/page.tsx       (single client management)
│   ├── projects/
│   │   ├── page.tsx            (all projects)
│   │   └── [id]/
│   │       ├── page.tsx        (edit project details)
│   │       ├── documents/page.tsx  (upload/manage documents)
│   │       └── milestones/page.tsx (manage milestones)
│   └── settings/page.tsx       (system settings)
└── api/
    ├── auth/[...nextauth]/route.ts
    ├── portal/
    │   ├── projects/route.ts
    │   ├── documents/route.ts
    │   └── stats/
    │       ├── analytics/route.ts    (GA4 proxy)
    │       ├── webvitals/route.ts    (PageSpeed API proxy)
    │       └── uptime/route.ts       (uptime data)
    ├── admin/
    │   ├── clients/route.ts
    │   ├── projects/route.ts
    │   ├── documents/
    │   │   ├── route.ts              (CRUD)
    │   │   └── upload/route.ts       (Vercel Blob upload)
    │   └── approve/route.ts          (approve pending clients)
    └── cron/
        └── uptime/route.ts           (Vercel Cron — ping sites every 5 min)
```

---

## CLIENT PORTAL PAGES

### Dashboard (`/portal`)
- **Welcome message**: "Bună, [Nume]!" with current date
- **Quick stats cards** (top row):
  - "Proiecte active" — count with icon
  - "Documente" — total documents count
  - "Facturi neplătite" — count + total amount (red if overdue)
  - "Uptime mediu" — percentage across all projects
- **Recent activity feed** — last 5 events (new document uploaded, invoice issued, milestone completed)
- **Projects overview** — compact cards for each project with status badge, last activity, and quick links
- **Notifications** — unread notifications with dismiss action

### Project Detail (`/portal/projects/[id]`)
- **Project header**: name, domain (as clickable link), status badge, start date, monthly fee
- **Progress section**: visual milestone timeline (completed ✓, current ●, upcoming ○)
- **Quick actions**: "Vezi documente", "Vezi statistici", "Contactează-mă"
- **Project info**: description, tech stack, contract value, monthly fee

### Documents (`/portal/projects/[id]/documents`)
- **Filters**: by type (Contract, Anexă, Factură, Raport)
- **Document list**: table or card view
  - Each document: name, type badge, upload date, file size, download button
  - Invoices have extra info: amount, due date, status (Plătită ✓, Scadentă ⏳, Restantă ✗)
- **Download**: direct download from Vercel Blob URL
- **No upload by client** — only admin uploads documents

### Stats (`/portal/projects/[id]/stats`)
This is the analytics dashboard — 3 tabs:

**Tab 1: Trafic (Google Analytics)**
- **Period selector**: Ultimele 7 zile / 30 zile / 90 zile
- **Key metrics cards**: Vizitatori unici, Vizualizări pagini, Rată de respingere, Durată medie sesiune
- **Line chart**: Vizitatori pe zi (Recharts AreaChart)
- **Bar chart**: Top 5 pagini vizitate
- **Pie chart**: Surse trafic (Direct, Organic, Social, Referral)
- **Data from**: Google Analytics Data API v1 (GA4), proxied through our API route
- **Setup note**: Each project needs a GA4 property ID stored in the database. Admin configures this when setting up the project.

**Tab 2: Performanță (Core Web Vitals)**
- **Key metrics cards** with color-coded status (green/yellow/red):
  - LCP (Largest Contentful Paint) — target: <2.5s
  - FID/INP (Interaction to Next Paint) — target: <200ms
  - CLS (Cumulative Layout Shift) — target: <0.1
  - Performance Score (0-100)
- **Gauge charts** for each metric (Recharts RadialBarChart)
- **Historical trend**: line chart showing scores over last 30 days
- **Data from**: Google PageSpeed Insights API (free, 25k req/day) — called via cron job daily and cached in DB, or called on-demand and cached for 24h
- **API endpoint**: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={domain}&strategy=mobile&key={API_KEY}`

**Tab 3: Disponibilitate (Uptime)**
- **Current status**: large green/red indicator "Online" / "Offline"
- **Uptime percentage**: last 24h, 7 days, 30 days (e.g., "99.95%")
- **Response time chart**: line chart showing response time (ms) over selected period
- **Incident log**: table of downtime events (if any) with timestamp and duration
- **Data from**: Our own uptime checker — a Vercel Cron job that pings each project's domain every 5 minutes, stores HTTP status and response time in `UptimeCheck` table

### Invoices (`/portal/invoices`)
- **Aggregated view** of all invoices across all projects
- **Summary bar**: Total facturat, Total plătit, Total restant
- **Table**: Invoice number, project, amount, due date, status, download PDF button
- **Color coding**: green (paid), yellow (sent/pending), red (overdue)

### Notifications (`/portal/notifications`)
- **List of notifications** with read/unread state
- Click to navigate to relevant page
- "Marchează toate ca citite" button

### Settings (`/portal/settings`)
- **Profile edit**: name, email, company, phone
- **Change password**: current password + new password + confirm
- **Avatar upload** (optional): upload to Vercel Blob

---

## ADMIN PANEL PAGES

### Admin Dashboard (`/admin`)
- **Stats overview**: total clients, pending approvals, active projects, overdue invoices
- **Pending approvals** list with one-click approve/reject buttons
- **Recent client activity** feed

### Client Management (`/admin/clients`)
- **Client list**: name, company, email, role, projects count, registration date
- **Filters**: by role (Pending/Client), search by name/email
- **Actions**: approve, view details, edit

### Client Detail (`/admin/clients/[id]`)
- Client info (editable)
- Their projects list
- Quick actions: assign project, send notification

### Project Management (`/admin/projects`)
- **All projects** across all clients
- **Create new project**: form with all project fields
- **Assign to client**: select client from dropdown

### Project Detail Admin (`/admin/projects/[id]`)
- **Edit all project fields** including GA property ID, domain
- **Document management**: upload new documents (Vercel Blob), delete, edit metadata
- **Milestone management**: add/edit/reorder/complete milestones
- **Invoice generation**: create invoice entries with amount, due date, status

### Document Upload (`/admin/projects/[id]/documents`)
- **Upload form**: select type (Contract/Annex/Invoice/Report), name, description, file upload
- **For invoices**: additional fields for invoice number, amount, due date
- **File upload**: POST to `/api/admin/documents/upload` → Vercel Blob → save URL in DB
- **Manage existing**: rename, change type, delete (with confirmation)

---

## UPTIME MONITORING SYSTEM

### Cron Job Setup
Create a Vercel Cron function that runs every 5 minutes:

```typescript
// app/api/cron/uptime/route.ts
// Vercel Cron: runs every 5 minutes
// vercel.json: { "crons": [{ "path": "/api/cron/uptime", "schedule": "*/5 * * * *" }] }

// 1. Fetch all active projects with a domain
// 2. For each domain, send HTTP GET request with timeout (10s)
// 3. Record status code and response time
// 4. Save to UptimeCheck table
// 5. If status !== 200 and previous check was 200, trigger notification to admin
```

### Data Retention
- Keep detailed checks for 30 days
- Aggregate to hourly averages for 90 days
- Aggregate to daily averages for 1 year
- Implement a cleanup cron that runs daily

---

## GOOGLE ANALYTICS INTEGRATION

### Setup (per project)
1. Admin creates a Google Cloud service account
2. Grants "Viewer" access to the GA4 property for the service account
3. Stores the GA4 property ID in the project record
4. The API route uses the service account credentials to query GA4

### API Route (`/api/portal/stats/analytics`)
```typescript
// Uses @google-analytics/data package
// Accepts: projectId, dateRange (7d/30d/90d), metrics
// Validates that the requesting user owns this project
// Queries GA4 Data API v1
// Returns formatted data ready for Recharts
// Caches responses for 1 hour (stale-while-revalidate)
```

### Metrics to fetch:
- `activeUsers`, `screenPageViews`, `bounceRate`, `averageSessionDuration`
- Dimensions: `date`, `pagePath`, `sessionDefaultChannelGrouping`

---

## PAGESPEED INSIGHTS INTEGRATION

### API Route (`/api/portal/stats/webvitals`)
```typescript
// Uses Google PageSpeed Insights API v5 (free, no auth needed for basic usage)
// Accepts: projectId
// Fetches domain from project record
// Calls: https://www.googleapis.com/pagespeedonline/v5/runPagespeed
// Parameters: url, strategy=mobile, category=performance
// Caches result for 24 hours
// Returns: LCP, INP, CLS, performance score, opportunities
```

---

## UI/UX DESIGN GUIDELINES

### Portal Layout
- **Sidebar navigation** (left, 260px width, collapsible on mobile):
  - Logo (small) at top
  - Nav items with Lucide icons: Dashboard, Proiecte, Documente, Facturi, Notificații (with unread badge), Setări
  - "Înapoi la site" link at bottom
  - User info + logout at bottom
  - **Dark sidebar** (--color-midnight) with gold active state
- **Main content area**: light background (--color-surface), generous padding
- **Top bar**: breadcrumbs, search (optional), notification bell with count badge

### Design Principles
- **Clean and professional** — this is a business tool, not a marketing page
- **Data-dense but readable** — use tables, cards, and charts effectively
- **Color-coded statuses** everywhere: green (good/paid/online), yellow (pending/warning), red (overdue/offline/error)
- **Responsive**: sidebar collapses to hamburger menu on mobile
- **Loading states**: skeleton screens for data-heavy pages, not spinners
- **Empty states**: friendly messages with call-to-action when no data (e.g., "Nu ai încă proiecte. Contactează-ne pentru a începe.")

### Auth Pages Design
- **Centered card** on a --color-midnight background with subtle gradient mesh (matching the main site hero)
- **Logo** at top of form
- Clean, minimal form with gold CTA button
- Error messages in red, success in green
- "Ai deja cont? Conectează-te" / "Nu ai cont? Înregistrează-te" toggle links

---

## FILE STRUCTURE

```
app/
├── auth/                          (public auth pages)
├── portal/                        (client-protected area)
│   ├── layout.tsx                 (sidebar, auth check, session provider)
│   └── ...
├── admin/                         (admin-protected area)
│   ├── layout.tsx                 (admin sidebar, role check)
│   └── ...
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── portal/                    (client API routes)
│   ├── admin/                     (admin API routes)
│   └── cron/                      (scheduled jobs)
components/
├── portal/
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   ├── ProjectCard.tsx
│   ├── DocumentTable.tsx
│   ├── InvoiceTable.tsx
│   ├── NotificationList.tsx
│   ├── MilestoneTimeline.tsx
│   ├── charts/
│   │   ├── TrafficChart.tsx       (Recharts AreaChart)
│   │   ├── TopPagesChart.tsx      (Recharts BarChart)
│   │   ├── TrafficSourcesChart.tsx (Recharts PieChart)
│   │   ├── WebVitalsGauge.tsx     (Recharts RadialBarChart)
│   │   ├── UptimeChart.tsx        (Recharts LineChart)
│   │   └── UptimeStatusBadge.tsx
│   └── EmptyState.tsx
├── admin/
│   ├── AdminSidebar.tsx
│   ├── ClientTable.tsx
│   ├── DocumentUploadForm.tsx
│   ├── ProjectForm.tsx
│   ├── MilestoneManager.tsx
│   └── ApprovalCard.tsx
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── AuthLayout.tsx
lib/
├── prisma.ts                      (Prisma client singleton)
├── auth.ts                        (NextAuth config)
├── analytics.ts                   (GA4 Data API helper)
├── pagespeed.ts                   (PageSpeed Insights helper)
├── uptime.ts                      (Uptime check helper)
├── blob.ts                        (Vercel Blob upload helper)
├── notifications.ts               (Create notification helper)
└── utils.ts
prisma/
├── schema.prisma
└── seed.ts                        (Seed admin user + demo data)
```

---

## SECURITY RULES

1. **All `/portal/*` routes**: require authenticated user with `role === CLIENT` or `role === ADMIN`
2. **All `/admin/*` routes**: require authenticated user with `role === ADMIN`
3. **Data isolation**: Clients can ONLY see their own projects, documents, and stats. Every API route must verify ownership.
4. **API routes**: validate session, validate ownership, validate input (zod schemas)
5. **File uploads**: admin only, validate file type (PDF, DOCX, PNG, JPG), max 10MB
6. **Passwords**: bcrypt with 12 salt rounds, minimum 8 characters
7. **CSRF**: handled by NextAuth.js
8. **Rate limiting**: basic rate limiting on auth endpoints (5 attempts per minute)
9. **Document URLs**: Vercel Blob URLs are not guessable but add an API proxy layer that checks ownership before redirecting to the blob URL
10. **Admin page**: add `noindex` meta tag, no links from public site

---

## SEED DATA

Create a seed script (`prisma/seed.ts`) that creates:
1. Admin user: email `admin@aiwant.ro`, password `AiwantAdmin2025!`, role `ADMIN`
2. Demo client: email `demo@client.ro`, password `DemoClient2025!`, role `CLIENT`
3. Demo project: "avocatneagumaria.ro" assigned to demo client, status `MAINTENANCE`
4. Sample documents: 1 contract, 1 invoice (paid), 1 invoice (pending)
5. Sample milestones: 4 milestones (3 completed, 1 upcoming)
6. Sample uptime checks: 48 hours of checks (every 5 min, mostly 200 status, 1-2 simulated downtimes)

---

## STRICT RULES

1. **All UI text in ROMANIAN** — every label, button, message, placeholder, error
2. **Prisma for all DB operations** — no raw SQL
3. **Zod for input validation** — on all API routes and forms
4. **Server Components by default** — only use "use client" where interactivity is needed
5. **Proper error handling** — try/catch on all API routes, user-friendly error messages
6. **Loading states** — skeleton screens, not spinners
7. **TypeScript strict mode** — no `any` types
8. **Responsive** — portal must work on mobile (sidebar collapses)
9. **The portal feels like part of aiwant.ro** — same color system, same fonts, same design language
10. **Charts must be readable** — proper labels, tooltips, legends, responsive sizing
11. **Document download must verify ownership** — never expose direct Blob URLs to clients
12. **Uptime cron must be efficient** — parallel requests with timeout, no blocking
13. **GA4 integration is optional per project** — show "Statisticile nu sunt configurate încă" if no GA property ID
14. **Notifications are created server-side** — when admin uploads document, approves account, etc.
15. **No email sending required in v1** — notifications are in-app only. Email can be added later.

---

## ENVIRONMENT VARIABLES NEEDED

```env
DATABASE_URL=                    # Neon PostgreSQL connection string
NEXTAUTH_SECRET=                 # Random secret for NextAuth
NEXTAUTH_URL=                    # https://aiwant.ro

# Vercel Blob
BLOB_READ_WRITE_TOKEN=           # Vercel Blob token

# Google Analytics (optional, for stats)
GOOGLE_SERVICE_ACCOUNT_EMAIL=    # Service account email
GOOGLE_SERVICE_ACCOUNT_KEY=      # Service account private key (base64 encoded)

# PageSpeed Insights (optional)
PAGESPEED_API_KEY=               # Google API key for PageSpeed

# Cron secret (for Vercel Cron)
CRON_SECRET=                     # Secret to verify cron requests
```

---

## IMPLEMENTATION ORDER

Build in this order for incremental progress:

1. **Phase 1 — Auth**: NextAuth setup, register, login, pending state, middleware
2. **Phase 2 — Admin basics**: admin layout, client list, approve/reject, create project
3. **Phase 3 — Portal basics**: portal layout, dashboard, project list, project detail
4. **Phase 4 — Documents**: upload (admin), list/download (client), invoice tracking
5. **Phase 5 — Stats: Uptime**: cron job, uptime chart, status display
6. **Phase 6 — Stats: Analytics**: GA4 integration, traffic charts
7. **Phase 7 — Stats: Performance**: PageSpeed integration, Web Vitals display
8. **Phase 8 — Polish**: notifications, empty states, loading skeletons, mobile responsive, seed data
