# CLAUDE CODE PROMPT — "aiwant.ro" — AI & Web Development Services Platform

## GENERAL CONTEXT

Build a **complete, production-ready website** for **aiwant.ro** — the online presence of **Vendor Comp SRL**, a Romanian software development and web design company with **30+ years of experience**, based in Constanța, Romania. The company specializes in **AI-powered solutions, custom web applications, automation workflows, and full-stack web development** for small and medium businesses.

The website serves as both a **service showcase** and a **client acquisition tool** — it must communicate technical expertise, professionalism, and trustworthiness while remaining approachable for non-technical business owners.

**Language**: Romanian (primary), with clean, professional copywriting. All UI text, headings, descriptions in Romanian. Code comments in English.

**Reference sites for quality/polish level** (study these for inspiration, DO NOT copy):
- https://avocatneagumaria.ro — clean Next.js site with Vercel deployment, professional feel (this is one of OUR projects — match or exceed this quality level)
- https://do-legal.ro — professional service site with clear sections and WhatsApp integration
- Holding Space project — our pet farewell rituals site with Framer Motion animations, scroll reveals, wave dividers, loading screen (another one of OUR projects — use similar animation patterns and attention to micro-interactions)

**The site must feel distinctly different from these** — this is a TECH company, not a law firm or emotional service. The aesthetic should be: **modern, confident, slightly futuristic but warm** — think "approachable technology partner", not "cold corporate agency" or "Silicon Valley startup".

---

## TECH STACK & SETUP

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion — scroll-reveal, hover effects, staggered animations, number counters, parallax subtil
- **Icons**: Lucide React — line style, consistent stroke width
- **Google Fonts**: Choose distinctive fonts — a display/heading font with character (e.g., Sora, Outfit, Manrope, Satoshi, General Sans) + a body font that's clean but NOT generic (e.g., DM Sans, Plus Jakarta Sans, Nunito Sans). **DO NOT use Inter, Roboto, Arial, Space Grotesk.**
- **Deployment target**: Vercel (our standard deployment platform)
- **Images**: Use placeholder areas with correct aspect ratios + comments `{/* TODO: Replace with real image */}`. For backgrounds, use gradient meshes, subtle grid patterns, or noise textures as atmospheric elements.

---

## BRAND ASSETS

**Logo file**: `/public/images/logo.png` — the official AIWANT logo (PNG with **TRANSPARENT background**)
- Features two overlapping gold triangles (forming a stylized "V" or downward arrow) above the "AIWANT" wordmark in navy blue
- Tagline below: "PROCESS & BUSINESS AUTOMATION" in navy
- The logo has a **transparent background** — it works on BOTH dark and light contexts
- On dark backgrounds: the gold triangles pop beautifully, the navy text is readable but subtle — consider adding a slight light treatment to the wordmark text on very dark backgrounds
- On light backgrounds: the full logo reads perfectly as-is
- Use the logo image directly (not a text recreation) in the navbar, loading screen, and footer
- For contexts where you need just the wordmark text (e.g., page titles), use the display font in --color-gold

---

## COLOR PALETTE & DESIGN DIRECTION

**Aesthetic direction**: "Digital Craftsman with Luxury Edge" — the gold + black palette communicates premium quality and trust. The navy adds depth and professionalism. The overall feel is **confident, premium, authoritative** — like a senior technology partner you'd trust with mission-critical automation. NOT startup-playful, NOT corporate-cold.

**Color system** (extracted from brand logo — gold triangles + navy text on black):

```
/* === PRIMARY BRAND COLORS (from logo) === */
--color-gold: #D4A843             (primary accent — CTAs, highlights, interactive elements. This is THE brand color from the logo triangles)
--color-gold-light: #E4C36A       (hover states, lighter gold accent)
--color-gold-dark: #B8912E        (pressed/active states, darker gold)
--color-navy: #234B72             (secondary brand color — from "AIWANT" text in logo, slightly lighter navy for better readability)
--color-navy-light: #2E6090       (lighter navy for hover/secondary elements)

/* === BACKGROUNDS === */
--color-midnight: #0E1D33          (dark backgrounds — deep navy, slightly lighter for warmth)
--color-slate-deep: #152847        (secondary dark, cards on dark bg)
--color-surface: #F7F5F0           (light section backgrounds — warm off-white)
--color-surface-warm: #FDF9F1      (alternate light bg — cream/warm, complements gold)

/* === TEXT === */
--color-text-primary: #1A1A1A     (body text on light backgrounds)
--color-text-secondary: #5A5A5A   (secondary text on light)
--color-text-on-dark: #F0ECE3     (body text on dark — warm white, not cold)
--color-text-muted: #8A8578       (muted text on dark — warm gray)

/* === BORDERS & UTILITIES === */
--color-border: #E0DCD3           (borders on light — warm tone)
--color-border-dark: #243B5E      (borders on dark — navy-tinted)
--color-success: #10B981          (positive indicators — WhatsApp green)
--color-glow: rgba(212,168,67,0.2) (glow effects — gold glow around interactive elements)
```

**CRITICAL COLOR USAGE RULES:**
- The **gold (#D4A843)** is the PRIMARY action color — all CTAs, links, highlights, active nav items, accent borders, badges use this color
- The **navy (#1B3A5C)** is used for secondary elements — section titles on light backgrounds, subtle accents, tags
- Dark sections use **deep navy (#0C1929)** NOT pure black — the entire dark palette is navy-derived, creating cohesion with the brand
- Light sections use **warm off-whites** NOT cold grays — the gold needs warm companions
- Glow effects use **gold glow** NOT blue glow
- The overall feel is "luxury tech" — navy + gold is premium and trustworthy

**Background textures**:
- Dark sections: subtle dot grid pattern (opacity 5%), or noise texture
- Light sections: very faint geometric grid or clean solid
- Section transitions: smooth gradient fades, NO hard cuts between sections

---

## STRUCTURE — SCROLLABLE LANDING PAGE WITH SECTIONS

The site is a **single-page scrollable landing** with a sticky navbar that highlights the current section (scroll-spy behavior). Smooth scrolling to anchors.

### 0. LOADING SCREEN
- Full-screen overlay, background --color-midnight (deep navy)
- Centered: **Use the actual logo image** (`/images/logo.png`) — display it at ~200px width, centered
- **Logo pulse animation**: The logo gently pulses (scale 1.0 → 1.04 → 1.0, opacity 0.85 → 1 → 0.85, duration 2s, infinite, ease-in-out)
- Below logo: a thin progress bar (width 200px, height 2px, --color-gold fill animating from 0% to 100%, duration ~2s)
- Below bar: "Process & Business Automation" — small text, --color-text-muted, fade-in after 0.5s (this is the brand tagline from the logo)
- After bar reaches 100%, the entire overlay fades out (opacity 0, translateY -20px, duration 0.6s) revealing the page beneath
- **Loading screen shows ONLY on first visit** (use sessionStorage check)
- **IMPORTANT**: The logo.png has a transparent background — on the dark overlay it will look great naturally, with gold triangles glowing against the dark

### 1. NAVBAR (sticky)
- **Background**: transparent initially → on scroll becomes --color-midnight with backdrop-blur-xl
- **Left**: **Actual logo image** (`/images/logo.png`) displayed at ~40px height — the logo works great on dark backgrounds. On light sections where navbar has scrolled, use a variant or ensure the dark logo still reads well (consider a light-background variant or keep navbar always dark)
- **Center/Right**: Navigation links — Servicii · Portofoliu · Prețuri · Despre noi · Contact
- **Far right**: CTA button "Solicită ofertă" — filled --color-gold, white text, subtle glow on hover
- **Mobile**: Hamburger menu with slide-in panel from right, dark background, staggered link animation
- **Active section highlighting**: Current section link gets --color-gold color + subtle underline animation

### 2. HERO SECTION
- **Background**: --color-midnight with subtle animated gradient mesh (slow-moving blobs of --color-gold at 5% opacity and --color-navy at 8% opacity)
- **Layout**: Two columns on desktop — text left (60%), abstract visual right (40%)
- **Left column** (staggered fade-up animation, 0.15s delay between elements):
  - **Badge** (small pill above title): "⚡ Process & Business Automation" — border --color-border-dark, text --color-gold
  - **Title** (display font, large, --color-text-on-dark): "Transformăm ideile în soluții digitale care funcționează"
  - **Subtitle** (body font, --color-text-muted, max-width 500px): "Automatizăm procese, dezvoltăm aplicații web și implementăm soluții AI personalizate pentru afaceri mici și medii din România. Peste 30 de ani de experiență în tehnologie."
  - **Two CTA buttons side by side**:
    - Primary: "Solicită ofertă gratuită" — filled --color-gold, white text, hover glow
    - Secondary: "Vezi portofoliul" — outline, --color-gold border and text, hover fill
  - **Trust indicators** below CTAs (small, --color-text-muted): "✓ Fără costuri ascunse · ✓ Suport dedicat · ✓ Garanția codului sursă"
- **Right column**: Abstract decorative element — a stylized code editor window or floating UI component cards with subtle float animation (translateY oscillation). This is decorative, NOT a real screenshot. Use CSS/SVG to create it.

### 3. SOCIAL PROOF BAR (thin section)
- **Background**: --color-slate-deep
- **Layout**: Horizontal scroll of stats, evenly spaced
- **Stats** (each with a number counter animation on scroll-into-view):
  - "30+" / "Ani experiență"
  - "50+" / "Proiecte livrate"
  - "100%" / "Cod sursă predat"
  - "24h" / "Timp mediu de răspuns"
- Numbers animate from 0 to target value (count-up effect over 2s)

### 4. SERVICES SECTION ("Servicii") — anchor: #servicii
- **Background**: --color-surface
- **Section title**: "Ce putem face pentru afacerea ta" (display font, centered)
- **Subtitle**: "De la site-uri de prezentare la aplicații complexe — construim soluții digitale complete." (centered, --color-text-secondary)
- **Grid**: 2x3 on desktop, 1 column on mobile — 6 service cards
- **Each card**: 
  - White background, subtle border --color-border, rounded-xl
  - Hover: translateY(-6px) + shadow-xl + top border becomes --color-gold (3px)
  - Lucide icon at top (--color-gold)
  - Title (bold)
  - Description (2-3 lines, --color-text-secondary)
  - Small "Află mai mult →" link at bottom, --color-gold

**The 6 services:**

1. **Icon: Globe** / "Site-uri de Prezentare"
   "Landing page-uri și site-uri complete care convertesc vizitatorii în clienți. Design modern, optimizat pentru mobil și SEO."

2. **Icon: LayoutDashboard** / "Aplicații Web Custom"
   "Dashboard-uri, sisteme de booking, CRM-uri și aplicații personalizate construite exact pe nevoile afacerii tale."

3. **Icon: ShoppingCart** / "Magazine Online"
   "Platforme e-commerce complete cu gestionare produse, integrare plăți și administrare simplă a comenzilor."

4. **Icon: Bot** / "Soluții AI & Automatizări"
   "Chatboți inteligenți, automatizări de workflow cu n8n, integrări API și procesare automată a datelor."

5. **Icon: Palette** / "Design UI/UX"
   "Interfețe intuitive și atractive, gândite pentru experiența utilizatorului. De la wireframe la produs final."

6. **Icon: Megaphone** / "Social Media & Marketing"
   "Strategii de conținut, management social media și campanii de creștere pentru prezența ta online."

### 5. PORTFOLIO SECTION ("Portofoliu") — anchor: #portofoliu
- **Background**: --color-midnight
- **Section title**: "Proiecte recente" (--color-text-on-dark, display font)
- **Subtitle**: "O selecție din lucrările noastre pentru clienți din diverse industrii." (--color-text-muted)
- **Layout**: Grid of project cards — 2 columns on desktop, 1 on mobile
- **Each card**:
  - Rounded-xl, overflow hidden
  - Top: image/screenshot placeholder area (16:9 aspect ratio, --color-slate-deep background with faint grid pattern, centered text "{Screenshot proiect}")
  - Bottom: dark card body (--color-slate-deep) with:
    - Project name (bold, --color-text-on-dark)
    - Category tag/badge (small pill: --color-gold bg at 15% opacity, --color-gold-light text)
    - Description (1-2 lines, --color-text-muted)
    - Tech stack tags (tiny pills: "Next.js", "Tailwind", "Vercel", etc.)
    - "Vezi proiectul →" link (--color-gold)
  - Hover: subtle scale(1.02) + glow border

**Projects to display:**

1. **"avocatneagumaria.ro"** / Tag: "Site Prezentare"
   "Site de prezentare profesional pentru un cabinet de avocatură din Constanța. Design elegant, formular de contact, optimizat SEO."
   Tech: Next.js · Tailwind CSS · Vercel

2. **"Holding Space — Pet Farewell Rituals"** / Tag: "Aplicație Web"
   "Platformă pentru ritualuri de despărțire de animăluțe de companie. Landing page emoțional cu sistem de pre-comenzi și panou de administrare."
   Tech: Next.js · Framer Motion · Tailwind CSS

3. **"AeroGym Constanța"** / Tag: "Social Media & Marketing"
   "Strategie de conținut și management social media pentru un program de gimnastică aerobică și multisport."
   Tech: Instagram · TikTok · Canva · Content Strategy

4. **"Automatizări Workflow"** / Tag: "AI & Automatizări"
   "Pipeline-uri automatizate de procesare documente, sumarizare email-uri și integrări GitHub-to-docx pentru clienți corporate."
   Tech: n8n · API Integrations · Node.js

### 6. PRICING SECTION ("Prețuri") — anchor: #preturi
- **Background**: --color-surface-warm
- **Section title**: "Investiție transparentă" (display font, centered)
- **Subtitle**: "Prețuri orientative. Fiecare proiect primește o ofertă personalizată în funcție de complexitate." (centered)
- **Layout**: 4 pricing tiers in a horizontal row on desktop (scrollable on mobile)
- **Card style**: White background, rounded-xl, border --color-border. One card (Tier 2) is "featured" with --color-gold border + "Cel mai popular" badge at top

**Tier 1 — "Site Prezentare"**
- Icon: Globe
- Price: "de la 250 EUR"
- Subtitle: "(~1.250 RON)"
- Feature list:
  - "Landing page sau site complet (1-10 pagini)"
  - "Design modern, responsive"
  - "Optimizare SEO de bază"
  - "Formular de contact"
  - "Certificat SSL inclus"
- CTA button: "Solicită ofertă" (outline)

**Tier 2 — "Aplicație Web" (FEATURED)**
- Icon: LayoutDashboard
- Badge: "Cel mai popular"
- Price: "de la 800 EUR"
- Subtitle: "(~4.000 RON)"
- Feature list:
  - "Dashboard, booking, CRM sau aplicație custom"
  - "Panou de administrare"
  - "Bază de date dedicată"
  - "Integrări API"
  - "Hosting & administrare inclusă"
- CTA button: "Solicită ofertă" (filled --color-gold)

**Tier 3 — "E-commerce"**
- Icon: ShoppingCart
- Price: "de la 800 EUR"
- Subtitle: "(~4.000 RON)"
- Feature list:
  - "Magazin online complet"
  - "Gestionare produse și comenzi"
  - "Integrare procesor plăți"
  - "Design personalizat"
  - "Panou de administrare"
- CTA button: "Solicită ofertă" (outline)

**Tier 4 — "AI & Automatizări"**
- Icon: Bot
- Price: "de la 100 EUR"
- Subtitle: "(~500 RON)"
- Feature list:
  - "Integrări API și automatizări n8n"
  - "Chatboți și asistenți AI"
  - "Procesare automată documente"
  - "Workflow-uri personalizate"
  - "Mentenanță și suport"
- CTA button: "Solicită ofertă" (outline)

**Below the cards** (centered, smaller text):
- "Toate proiectele includ: cod sursă predat · suport post-livrare · documentație"
- "Hosting & administrare de la **15 EUR/lună** — vezi detalii în oferta personalizată"

### 7. PROCESS SECTION ("Cum lucrăm")
- **Background**: --color-midnight
- **Section title**: "Procesul nostru" (--color-text-on-dark)
- **Subtitle**: "De la idee la lansare, în pași clari." (--color-text-muted)
- **Layout**: Horizontal timeline on desktop, vertical on mobile
- **4 steps**, each with:
  - Step number (large, --color-gold, semi-transparent)
  - Title (bold, --color-text-on-dark)
  - Description (--color-text-muted)
  - Connecting line between steps (--color-border-dark, dashed)
- **Animation**: Steps reveal one by one on scroll with stagger

**Steps:**

1. **"Descoperire"** — "Înțelegem afacerea ta, obiectivele și publicul țintă. Discutăm ce funcționează și ce ai nevoie."
2. **"Planificare & Design"** — "Creăm structura, wireframe-urile și designul vizual. Validăm împreună fiecare pas."
3. **"Dezvoltare"** — "Construim aplicația cu tehnologii moderne. Testăm riguros pe toate dispozitivele."
4. **"Lansare & Suport"** — "Publicăm, monitorizăm și oferim suport continuu. Suntem alături de tine post-lansare."

### 8. ABOUT SECTION ("Despre noi") — anchor: #despre
- **Background**: --color-surface
- **Layout**: Two columns — image/visual left (40%), text right (60%)
- **Left**: Placeholder for founder photo or abstract visual (rounded-xl, --color-slate-deep background)
- **Right**:
  - Title: "Cine suntem"
  - Text paragraphs (clean, professional, personal):
    - "Sunt Vlad Gheorghe, fondatorul Vendor Comp SRL, cu peste 30 de ani de experiență în programare și web design. Din Constanța, construiesc soluții digitale pentru afaceri care vor să crească."
    - "Lucrez cu fiecare client direct — fără intermediari, fără agenție mare, fără birocrație. Primești atenție dedicată și un partener tehnic care înțelege atât codul, cât și nevoile afacerii tale."
    - "Folosesc cele mai moderne tehnologii — Next.js, React, AI, automatizări — pentru a livra produse rapide, sigure și ușor de administrat."
  - **Key differentiators** (3 small cards/badges inline):
    - "🎯 Comunicare directă cu dezvoltatorul"
    - "🔧 Tehnologii moderne, cod curat"
    - "📦 Cod sursă predat integral"

### 9. CONTACT SECTION — anchor: #contact
- **Background**: --color-midnight
- **Layout**: Two columns — info left, form right
- **Left**:
  - Title: "Hai să discutăm despre proiectul tău" (--color-text-on-dark)
  - Subtitle: "Completează formularul sau contactează-mă direct. Răspund în maximum 24 de ore." (--color-text-muted)
  - Contact info:
    - 📧 Email: contact@aiwant.ro (placeholder)
    - 📱 Telefon: +40 7XX XXX XXX (placeholder)
    - 📍 Locație: Constanța, România
  - Social links (icons): GitHub, LinkedIn (placeholders)
- **Right**: Contact form
  - Fields: Nume*, Email*, Telefon, Tip proiect (dropdown: Site prezentare / Aplicație web / E-commerce / AI & Automatizări / Altceva), Mesaj*
  - Submit button: "Trimite mesajul" (--color-gold, full width)
  - Below form: "Sau scrie-mi direct pe WhatsApp" + WhatsApp link button
  - **Form submits via POST to `/api/contact`** — saves to JSON file or sends email notification. Show success toast after submission.

### 10. FOOTER
- **Background**: #091526 (darkest navy — deeper than midnight but still with blue tint)
- **Layout**: 3 columns + bottom bar
- **Column 1**: Logo image (`/images/logo.png`, ~120px width) + short tagline "Process & Business Automation"
- **Column 2**: Quick links — Servicii · Portofoliu · Prețuri · Contact
- **Column 3**: Legal — Termeni și condiții · Politica de confidențialitate · ANPC
- **Bottom bar**: "© 2025 Vendor Comp SRL · CUI 10000750 · Constanța, România" + "Construit cu ❤️ și Next.js"

### 11. FLOATING WHATSAPP BUTTON
- **Position**: fixed, bottom-right (bottom: 24px, right: 24px)
- **Style**: circular button (56px), --color-success background (#25D366 WhatsApp green)
- **Icon**: WhatsApp SVG icon, white
- **Animation on mount**: bounceIn (scale 0 → 1.1 → 1, with slight overshoot)
- **Idle animation**: Every 8 seconds, the button does a subtle "wiggle" (rotateZ -5deg → 5deg → 0) + a small notification dot pulses above it
- **Hover**: scale(1.1) + shadow glow in WhatsApp green
- **Click**: Opens `https://wa.me/40XXXXXXXXX?text=Bună!%20Sunt%20interesat%20de%20serviciile%20de%20dezvoltare%20web.` (placeholder number)
- **Mobile**: Slightly smaller (48px), same position
- **Z-index**: Above everything except loading screen

---

## MICRO-INTERACTIONS & ANIMATIONS (Framer Motion)

1. **Loading screen**: Pulse logo + progress bar → fade out overlay
2. **Hero**: Staggered fade-up (badge → title → subtitle → CTAs → trust indicators), 0.15s delay each
3. **Scroll reveal**: Every section uses a `<ScrollReveal>` wrapper — fade-up + opacity, threshold 0.15, once
4. **Stats counter**: Numbers animate from 0 to target when section enters viewport (duration 2s, ease-out)
5. **Service cards**: Stagger reveal (0.1s delay between cards) + hover translateY(-6px) + shadow + accent border
6. **Portfolio cards**: Scale(1.02) on hover + glow border effect
7. **Pricing cards**: Stagger reveal, featured card has subtle continuous glow pulse
8. **Process timeline**: Steps reveal sequentially on scroll, connecting lines "draw" progressively
9. **Navbar**: Smooth background transition (transparent → solid with blur)
10. **WhatsApp button**: Mount bounce + periodic wiggle + hover scale
11. **Smooth scroll**: Native smooth scroll + offset accounting for sticky navbar height on anchor clicks
12. **CTA buttons**: Hover scale(1.03) + glow spread on box-shadow

---

## FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          (metadata, fonts, global providers)
│   ├── page.tsx            (main landing page composing all sections)
│   ├── globals.css         (CSS variables, global styles, noise/grid textures)
│   └── api/
│       └── contact/
│           └── route.ts    (POST handler for contact form)
├── components/
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx          (sticky, scroll-spy, mobile hamburger)
│   ├── Hero.tsx
│   ├── SocialProofBar.tsx  (stats with counter animation)
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── PricingSection.tsx
│   ├── ProcessSection.tsx  (timeline)
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx  (with form)
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx  (floating, animated)
│   ├── ScrollReveal.tsx    (Framer Motion wrapper, reusable)
│   └── CountUp.tsx         (number counter animation component)
├── lib/
│   ├── constants.ts        (all text content, service data, portfolio data, pricing data)
│   └── utils.ts            (helper functions)
└── public/
    └── images/
        └── logo.png            (AIWANT brand logo — PROVIDED, copy from project root)
├── tailwind.config.ts      (custom colors, fonts, extend theme)
└── package.json
```

---

## STRICT RULES

1. **All visible text is in ROMANIAN** — no Lorem Ipsum, no placeholder text in English. Every heading, paragraph, button, label must have real Romanian content as specified above.
2. **Use the EXACT content provided** — do not summarize, rephrase, or invent text. The copy is final.
3. **Mobile-first responsive design** — every section must look great on 375px, 768px, and 1440px+ viewports.
4. **Framer Motion for ALL animations** — no CSS-only scroll animations. Use `useInView`, `motion.div`, `variants`, and `AnimatePresence`.
5. **Performance**: Lazy load below-fold sections. Use `next/font` for Google Fonts (not CDN link). Optimize for Core Web Vitals.
6. **Accessibility**: Semantic HTML, proper heading hierarchy (single h1 in hero), alt text on images, keyboard-navigable, focus-visible styles on interactive elements.
7. **Dark/light section alternation**: Maintain the visual rhythm. Dark sections (midnight bg) alternate with light sections (surface/surface-warm bg). This is essential to the design.
8. **NO generic AI aesthetics**: No purple gradients, no Inter/Roboto, no cookie-cutter card layouts. This must look custom-designed and distinctive.
9. **The navbar must highlight the active section** using IntersectionObserver or scroll-spy logic.
10. **The contact form must actually work** — POST to an API route, validate inputs, show loading state and success/error feedback.
11. **WhatsApp button must be present on ALL viewports** and must have the idle wiggle animation.
12. **Loading screen appears only on first visit per session** (sessionStorage flag).
13. **All colors from CSS variables** — never use raw hex in component code. Always reference the design tokens.
14. **Code quality**: Clean, well-structured components. No single file over 300 lines. Extract reusable components. Use TypeScript throughout.

---

## SEO & METADATA

```tsx
// app/layout.tsx metadata
export const metadata = {
  title: "aiwant.ro — Dezvoltare Web & Soluții AI | Constanța",
  description: "Dezvoltăm site-uri, aplicații web, magazine online și soluții AI pentru afaceri din România. Peste 30 de ani de experiență. Solicită ofertă gratuită.",
  keywords: "dezvoltare web, aplicații web, soluții AI, site prezentare, magazin online, Constanța, România, Next.js, React",
  openGraph: {
    title: "aiwant.ro — Dezvoltare Web & Soluții AI",
    description: "Soluții digitale pentru afaceri ambițioase. Dezvoltare web, AI, automatizări.",
    url: "https://aiwant.ro",
    siteName: "aiwant.ro",
    locale: "ro_RO",
    type: "website",
  }
};
```

---

## FINAL NOTES

- The design must feel **premium but approachable** — like a senior developer you'd trust with your business, not like a faceless corporation.
- **Visual rhythm is key**: dark → light → dark → light sections create a compelling scroll experience.
- Every section should have enough vertical padding (py-20 to py-32) to breathe.
- The portfolio section is critical — it builds credibility. Make the cards visually rich even with placeholder images.
- The pricing section should make the "Aplicație Web" tier feel like the obvious best choice (highlighted, featured badge, filled CTA).
- The WhatsApp button is a primary conversion tool for Romanian clients — it must be prominent and inviting.
