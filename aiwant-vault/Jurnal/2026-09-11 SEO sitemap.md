---
tags: [jurnal]
data: 2026-09-11
sesiune: SEO sitemap, robots, canonical & positioning
prompt: aiwant-vault/Prompturi/PROMPT_SEO_SITEMAP.md
commit_la_inceput: e2bc5b7
commit_la_final: (necomis la finalul sesiunii — vezi mai jos)
---

# 2026-09-11 — SEO sitemap, robots, canonical & positioning

## Obiectiv
Adăugarea infrastructurii tehnice SEO lipsă (sitemap, robots, canonical, metadata de bază, JSON-LD) fără să schimbe design-ul sau conținutul vizibil, plus o strategie de poziționare pentru cuvinte cheie.

## Prompt folosit
`aiwant-vault/Prompturi/PROMPT_SEO_SITEMAP.md` — sesiune în 2 faze (analiză + implementare), cu stop explicit după Faza 1 pentru aprobare.

## Ce a raportat sesiunea
**Faza 1** — `aiwant-vault/SEO/Strategie SEO.md`: poziționare, hartă cuvinte-cheie → URL, titluri/descrieri propuse pentru cele 15 URL-uri publice, plan de linking intern, design sitemap, pagini viitoare, ce trebuie verificat manual. Corecție găsită față de brief: toate cele 5 articole hardcodate de blog aveau deja `canonical` (absolut), nu doar 2 din 5 cum presupunea prompt-ul.

**Faza 2** — implementare tehnică:
- `app/sitemap.ts` (nou) — 15 URL-uri: home, portofoliu, blog, configurator, 6 servicii (din `SERVICES_DATA`), 5 articole publicate (din DB, `lastModified` = `updatedAt`, imagini absolute). Try/catch pe query Prisma.
- `app/robots.ts` (nou) — disallow `/admin`, `/portal`, `/auth`, `/api`.
- `lib/constants.ts` — adăugat `SITE_URL = "https://aiwant.ro"`.
- `app/layout.tsx` — `metadataBase`, `title: { default, template: "%s | AiWANT" }`, descriere nouă (fără „30 de ani"), `openGraph.siteName: "AiWANT"`, JSON-LD `Organization` + `ProfessionalService` în `<head>`.
- `app/page.tsx` — `alternates.canonical: "/"`.
- Eliminat sufixul manual `| AiWANT` / `| aiwant.ro` din: `seoTitle` (6 servicii în `lib/services-data.ts`), `/portofoliu`, `/blog`, cele 5 articole hardcodate, `/blog/[slug]`.
- Canonical relativ adăugat/corectat pe: servicii, portofoliu, blog listă, blog `[slug]`, cele 5 articole hardcodate (erau absolute, acum relative — rezolvate de `metadataBase`).
- `app/configurator/layout.tsx` (nou) — metadata proprie (titlu, descriere, canonical).
- `app/auth/layout.tsx` (nou) — `robots: { index: false, follow: false }`.
- `components/Footer.tsx` — coloană nouă „Servicii" (4 coloane în loc de 3), generată din `SERVICES_DATA`; link-ul hash `#servicii` din „Navigare" a rămas neschimbat (scroll la secțiunea de pe homepage, scop diferit de linkurile noi către subpagini).

## Ce am verificat eu în cod
- [x] `git diff` / fișiere atinse: 18 fișiere de cod (2 noi routes + 2 noi layouts + 14 modificate), plus `lib/constants.ts` și `lib/services-data.ts`
- [x] `npx tsc --noEmit`: trece curat
- [x] `npm run build`: succes; `/sitemap.xml` și `/robots.txt` apar ca rute în output
- [x] testat în browser/curl: `/sitemap.xml` conține exact 15 URL-uri (verificat manual, fără duplicate, fără rute private); count DB (`prisma.blogPost.count({published:true})`) = 5, coincide cu articolele din sitemap; toate cele 15 URL-uri răspund 200; `<title>` verificat pe 7 tipuri de pagină — niciunul nu conține brandul de două ori; `/auth/login` are `<meta name="robots" content="noindex, nofollow"/>`; JSON-LD extras din homepage și parsat cu succes (`JSON.parse`), 2 noduri (`Organization`, `ProfessionalService`)

## NU s-a confirmat
- Redirect www ↔ non-www în Vercel (sitemap-ul presupune `https://aiwant.ro` non-www ca domeniu canonic)
- Proprietate Google Search Console + submisie sitemap
- Google Business Profile
- Existența reală a conturilor sociale folosite în `sameAs` (LinkedIn, GitHub, Instagram, TikTok — copiate din `Footer.tsx`, neverificate)
- Orice volum de căutare pentru cuvintele cheie din strategie — toate sunt ipoteze
- `og:url` lipsește pe `/portofoliu` și `/configurator` (aceste pagini nu au bloc `openGraph` propriu; nu era cerut explicit de prompt, dar e o mică inconsecvență de notat)
- Verificare vizuală completă în browser a coloanei noi „Servicii" din footer pe mobil (verificat doar structural prin HTML, nu cu screenshot)

## Decizii luate
- Titlurile/descrierile pentru cele 6 subpagini de servicii au rămas cele existente (deja specifice și bine scrise), doar sufixul de brand a fost eliminat — nu au fost înlocuite cu variantele generice propuse în Faza 1, ca să nu se piardă detalii utile (Next.js, Stripe/Netopia, n8n etc.).
- `lastModified` pentru paginile statice = constantă fixă (`2026-09-11`), nu `new Date()` — motivat în cod.
- Coloana nouă „Servicii" din footer e separată de linkul hash `#servicii` existent (păstrat), pentru că au scopuri diferite (scroll pe homepage vs. navigare directă la subpagini).
- `sameAs` din JSON-LD include toate cele 4 conturi găsite în `Footer.tsx` (nu doar 2 cum presupunea brief-ul inițial din prompt).

## De actualizat în vault
- [x] [[Stare curenta]] — secțiune SEO adăugată
- [ ] [[Backlog]] — de adăugat: verificare Search Console, redirect domeniu, conturi sociale
- [x] [[Blog]] — corecția despre canonical e documentată în [[Strategie SEO]]
