---
tags: [proiect, status]
actualizat: 2026-09-11
bazat_pe_commit: e2bc5b7
---

# Stare curentă

Ultimul commit: `e2bc5b7`, 13 iul 2026, branch `v2`. Stare stabilită **citind codul**, fără build, fără rulare, fără acces la producție.

## Funcțional (implementat complet în cod)
- [x] Homepage cu toate secțiunile, rebranding „Strategic Partner” → [[Homepage]]
- [x] 6 subpagini de servicii SSG → [[Subpagini servicii]]
- [x] Portofoliu (6 studii de caz, filtru pe tag) → [[Portofoliu]]
- [x] Blog: listă, articol, admin CRUD cu Tiptap, 5 articole → [[Blog]]
- [x] Audit PageSpeed gratuit cu captare lead → [[Audit gratuit]]
- [x] Configurator cu estimare + legătură cu register/onboarding → [[Configurator]]
- [x] Register → aprobare → login, protecție pe roluri → [[Autentificare si roluri]]
- [x] Onboarding obligatoriu în 5 pași → [[Onboarding]]
- [x] Portal: dashboard, proiecte, milestone-uri, documente, facturi, notificări, setări → [[Portal client]]
- [x] Admin: clienți, proiecte, documente, milestone-uri, blog, contacte → [[Admin]]
- [x] Cron uptime + cron facturi/contracte → [[Notificari si cron]]
- [x] GA4 + Vercel Analytics pe site

## SEO (adăugat 2026-09-11)
- [x] `app/sitemap.ts` — home, portofoliu, blog, configurator, 6 servicii, toate articolele publicate (`lastModified` din `BlogPost.updatedAt`, imagini absolute)
- [x] `app/robots.ts` — disallow `/admin`, `/portal`, `/auth`, `/api`
- [x] `metadataBase` + `title.template` în `app/layout.tsx`; poziționare și descriere actualizate (fără „30 de ani"); JSON-LD `Organization` + `ProfessionalService`
- [x] Canonical relativ pe toate paginile publice (homepage, servicii, portofoliu, blog listă, blog `[slug]`, cele 5 articole hardcodate)
- [x] `/configurator` și `/auth/*` au acum metadata proprie (`/auth` cu `noindex`)
- [x] Footer: coloană nouă „Servicii" cu cele 6 subpagini, generată din `SERVICES_DATA`
- [ ] Volume de căutare reale, redirect www/non-www în Vercel, Search Console — de verificat de Vlad → [[Strategie SEO]]

## Parțial / cu bug-uri
- [ ] Aprobarea conturilor de pe dashboard-ul admin (merge doar din pagina clientului)
- [ ] Rolul se actualizează în sesiune abia după re-login
- [ ] Statistici proiect în portal: doar uptime; GA4 și PageSpeed sunt placeholder
- [ ] Facturi: se creează la upload, dar nu pot fi marcate plătite din UI
- [ ] Documente: fără ștergere/înlocuire; stocate public
- [ ] Consimțământ GDPR: doar la audit, și trimite spre o pagină inexistentă

## Lipsă
- [ ] Pagina de confidențialitate + consimțământ pe toate formularele (prompt scris, neimplementat)
- [ ] Termeni și condiții
- [ ] Reset parolă real + email tranzacțional (SMTP)
- [ ] Notificări pe email (toate sunt doar in-app)
- [ ] Migrații Prisma aliniate cu schema
- [ ] Documentație actualizată în repo (`README.md`, `SITE_OVERVIEW.md`)

## Neverificat în sesiunea de inventar
- Build-ul și tipurile (`npm run build`, `tsc`)
- Ce rulează efectiv pe aiwant.ro și din ce branch
- Starea DB-ului de producție și a variabilelor din Vercel
- Dacă repo-ul GitHub e public
- Conținutul arhivei `aiwant-audit.tar.gz`

Ce urmează: [[Backlog]]. Riscuri: [[Securitate]], [[Datorii tehnice]].
