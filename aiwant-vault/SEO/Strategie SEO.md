---
tags: [seo]
actualizat: 2026-09-11
---

# Strategie SEO — aiwant.ro

> Bază: `PROMPT_SEO_SITEMAP.md`. Verificat direct în cod la commit `e2bc5b7` (branch `v2`). Corecturile față de brief sunt marcate `[!warning] Corecție`.

## 1. Poziționare pentru search

**Pentru cine căutăm vizibilitate:** proprietari de firme mici/mijlocii din România (prioritar Constanța și zona litoral, dar nu exclusiv local) care simt durerea proceselor manuale — facturare, programări, raportare, date entry — și caută fie „cineva care automatizează asta", fie un partener tehnic pentru un produs software propriu (CRM, dashboard, platformă de rezervări). Diferențiatorul e explicit: comunicare directă cu dezvoltatorul (nu agenție cu PM-uri), predare cod sursă complet, automatizări reale (n8n/API/AI) — nu doar site-uri.

**Pentru cine NU țintim deliberat:** cumpărători de „website ieftin rapid" care compară doar preț (piața „site prezentare Constanța" e aglomerată și nu se potrivește cu diferențiatorul de automatizare/cod sursă); companii enterprise cu proceduri de achiziție proprii; cineva care caută un template/temă gata făcută.

**Ierarhia de intenție:** automatizare & software custom = pilonul principal de brand (cluster A+B), site-uri/e-commerce = strat secundar cu intenție locală puternică ("Constanța") pentru că acolo cumpărătorul chiar caută pe oraș, design/social = suport, nu cap de listă.

## 2. Hartă cuvinte-cheie → URL

Fiecare cuvânt cheie e o **ipoteză**, marcată „de validat în Google Search Console / Keyword Planner". Nu există date de volum — nu am inventat niciunul.

| Cluster | Prioritate | Pagină-monedă | Cuvinte cheie candidate | Articole de suport |
|---|---|---|---|---|
| A. Automatizare procese | 1 | `/servicii/ai-automatizari` | automatizare procese business, automatizări n8n, automatizare firme, soluții AI pentru firme, automatizare documente / facturi | `taskuri-repetitive-automatizare`, `roi-automatizare-procese`, `roadmap-implementare-automatizare` |
| B. Software / aplicații custom | 2 | `/servicii/aplicatii-web` | aplicații web custom, software personalizat pentru firme, CRM personalizat, sistem programări online, dashboard business | `saas-vs-software-custom` |
| C. Site-uri & e-commerce (local) | 3 | `/servicii/site-prezentare`, `/servicii/magazine-online` | creare site Constanța, site de prezentare firmă, magazin online Constanța, realizare magazin online | `proprietate-digitala-vs-social-media` |
| D. Design & social | 4 | `/servicii/design-uiux`, `/servicii/social-media` | design UI/UX, administrare social media Constanța | — |
| Brand / hub | — | `/` | AiWANT, automatizare procese și aplicații web Constanța | — |

Verificat contra conținutul real din `lib/services-data.ts`: fiecare `seoTitle`/`seoDescription` existent e deja aliniat pe cluster (`ai-automatizari` → automatizare/n8n, `aplicatii-web` → dashboard/CRM/booking, `magazine-online` → e-commerce). Nu am găsit conflicte majore de conținut — tabelul de mai sus corespunde cu ce spune de fapt fiecare pagină.

**Canibalizare identificată:**
- Homepage-ul (`app/page.tsx`) nu are metadata proprie — moștenește titlul/descrierea din `app/layout.tsx`, care sunt pe poziționarea veche ("Dezvoltare Web & Soluții AI"). Asta înseamnă că homepage-ul nu concurează de fapt pe niciun cuvânt din clustere — e un gol, nu o canibalizare, dar trebuie reparat înaintea oricărei alte optimizări (e pagina cu cea mai mare autoritate).
- Fără canibalizare reală între cele 6 pagini de servicii — sloganurile de pe homepage (`SERVICES` din `lib/constants.ts`, ex. „Infrastructură Business Custom") diferă de titlurile subpaginilor („Aplicații Web Custom"), dar link-urile de pe homepage duc corect la slug-ul potrivit (`SERVICES_DATA[index].slug` — cuplaj fragil, dar funcțional azi, documentat deja în [[Subpagini servicii]]).
- Cele 5 articole de blog nu se suprapun tematic cu paginile de servicii — fiecare are un unghi distinct (task-uri, ROI, SaaS vs custom, proprietate digitală, roadmap).

## 3. Titluri și meta descrieri propuse

Regulă comună: title ≤ 60 caractere, description 140–160 caractere, cuvânt cheie principal aproape de început, sufix de brand `| AiWANT` **o singură dată** (după introducerea `title.template` în layout, sufixul nu se mai scrie manual în paginile individuale). Fără nicio mențiune de ani de experiență (conflictul 10 vs 30 rămâne nerezolvat, deci absent).

| URL | Title propus (fără sufix, se adaugă automat) | Meta description propusă |
|---|---|---|
| `/` | `Automatizare Procese & Aplicații Web pentru Firme` | Automatizăm procese repetitive și construim aplicații web custom pentru firme din România. Partener strategic în digitalizare — cod sursă predat integral. |
| `/servicii/ai-automatizari` | `Automatizări n8n & Soluții AI pentru Firme` | Automatizări de procese cu n8n, integrări API și AI pentru firme din România. Eliminăm task-urile repetitive — facturare, raportare, date entry. |
| `/servicii/aplicatii-web` | `Aplicații Web Custom: CRM, Dashboard, Booking` | Software personalizat pentru firme — CRM, dashboard business, sisteme de programări online. Cod sursă predat integral, fără dependență de furnizor. |
| `/servicii/site-prezentare` | `Site de Prezentare Firmă — Constanța` | Site-uri de prezentare rapide, optimizate SEO, construite cu Next.js. Design personalizat pentru firme din Constanța și din toată România. |
| `/servicii/magazine-online` | `Magazin Online Constanța — Vânzare pe Web` | Magazine online complete cu gestionare produse și plăți integrate. Platforme de e-commerce construite să crească odată cu afacerea ta. |
| `/servicii/design-uiux` | `Design UI/UX pentru Aplicații și Site-uri` | Design UI/UX orientat spre conversie — interfețe clare, rapide, testate pentru utilizatorul final. De la wireframe la produs lansat. |
| `/servicii/social-media` | `Administrare Social Media — Constanța` | Management social media și strategie de conținut pentru firme din Constanța. Vizibilitate care aduce clienți, nu doar postări. |
| `/portofoliu` | `Portofoliu — Proiecte de Automatizare & Web` | Proiecte livrate: platforme digitale, automatizări de procese și magazine online pentru firme din România. Studii de caz cu rezultate concrete. |
| `/blog` | `Blog — Automatizare, AI & Business Digital` | Articole practice despre automatizare, AI și digitalizare pentru antreprenori din România. |
| `/blog/taskuri-repetitive-automatizare` | `5 Task-uri Repetitive care îți Fură Profitul` | Data entry, facturare, programări — 5 procese pe care orice firmă le poate automatiza rapid. Vezi unde pierzi timp și bani fără să știi. |
| `/blog/saas-vs-software-custom` | `SaaS vs. Software Custom: Ce Alegi?` | Diferența dintre un abonament SaaS și o platformă construită pe măsura firmei tale. Ce scalează cu adevărat business-ul pe termen lung. |
| `/blog/roi-automatizare-procese` | `Cât te Costă să NU Automatizezi un Proces?` | Calculul real al costului ineficienței: timp, erori și oportunități pierdute. Cum estimezi ROI-ul unei automatizări înainte s-o construiești. |
| `/blog/proprietate-digitala-vs-social-media` | `Proprietar sau Chiriaș în Lumea Digitală?` | De ce un site propriu bate un profil de social media când vine vorba de control, date și independență față de algoritmi. |
| `/blog/roadmap-implementare-automatizare` | `Planul în 4 Pași pentru Automatizare` | De la haos la eficiență: roadmap practic în 4 pași pentru implementarea automatizării într-o firmă mică sau mijlocie. |
| `/configurator` | `Configurator Proiect — Estimare Preț Rapidă` | Configurează-ți proiectul de site, aplicație sau automatizare și primești o estimare de preț și durată în câteva minute. |

> [!note] Ce nu am schimbat
> Conținutul propriu-zis al articolelor/paginilor rămâne neatins — doar title/description propuse mai sus, aplicate în Faza 2.

## 4. Plan de linking intern

| De la | Către | Anchor text propus |
|---|---|---|
| `taskuri-repetitive-automatizare` | `/servicii/ai-automatizari` | „automatizare procese cu n8n" |
| `roi-automatizare-procese` | `/servicii/ai-automatizari` | „calculează impactul unei automatizări" |
| `roadmap-implementare-automatizare` | `/servicii/ai-automatizari` | „planul de implementare al unei automatizări" |
| `saas-vs-software-custom` | `/servicii/aplicatii-web` | „platformă software custom" |
| `proprietate-digitala-vs-social-media` | `/servicii/site-prezentare` | „site propriu, nu doar un profil social" |

Footer/cross-link (Faza 2): grup nou „Servicii" cu cele 6 URL-uri, generat din `SERVICES_DATA` — înlocuiește link-ul hash `#servicii` (vezi §5 din prompt, decizia e documentată acolo la implementare).

Notă: **nu se editează corpul articolelor** în această sesiune — linkurile de mai sus sunt doar planul, de aplicat separat.

## 5. Design sitemap

| Secțiune | URL-uri | `lastModified` |
|---|---|---|
| Statice fixe | `/`, `/portofoliu`, `/configurator` | omis (nu se cunoaște o dată reală de modificare per pagină; `new Date()` la fiecare request ar minți către Google) |
| Servicii | 6× `/servicii/<slug>` din `SERVICES_DATA` (generate, niciodată hardcodate) | omis, din același motiv |
| Blog index | `/blog` | omis |
| Articole | `/blog/<slug>` — un rând per `BlogPost.published === true`, deduplicat (cele 5 slug-uri hardcodate există și în DB — o singură intrare per URL) | `BlogPost.updatedAt` (există în schema, `@updatedAt`) |

`revalidate = 3600`. Rutele private (`/portal`, `/admin`, `/auth`, `/api`) **nu apar niciodată**.

## 6. Pagini viitoare (doar propuneri — NU se construiesc în această sesiune)

| Pagină | Cuvânt cheie țintă | De ce | Efort estimat |
|---|---|---|---|
| `/portofoliu/<slug>` (pagină per studiu de caz) | ex. „automatizare cadastru Mangalia", „site cazare Jupiter" | Fiecare proiect din `PORTFOLIO` (`lib/constants.ts`) are deja challenge/soluție/impact suficient de detaliate pentru o pagină proprie — azi sunt doar carduri pe `/portofoliu`, fără URL individual, deci fără posibilitate de a rank separat | mediu — 1 template + rută dinamică, conținutul există deja |
| Pagini use-case automatizare (ex. „automatizare facturare", „integrare n8n cu [tool]") | „automatizare facturi firma", „integrare n8n [ecosistem]" | Cluster A e prioritar dar are o singură pagină-monedă; use-case-uri specifice pot capta interogări mai lungi și mai calificate | mediu-mare — conținut nou, nu doar structură |
| `/politica-de-confidentialitate`, `/termeni` | — (nu e SEO, e conformitate) | Linkuri existente în footer și din formularul de audit duc la 404/`#` — problemă de încredere și legală, nu doar SEO | mic |
| Pagină locală „Constanța" dedicată | „servicii digitale Constanța" | **Doar dacă** poate avea conținut cu adevărat unic (ex. context local, clienți din zonă) — altfel ar deveni doorway page și ar face mai mult rău decât bine. Recomandare: nu construi până nu există conținut local distinct de ce spun deja paginile de servicii | necunoscut — depinde dacă apare conținut unic |

## 7. De verificat în afara codului

- Redirect www → non-www (sau invers) în Vercel — sitemap-ul folosește `https://aiwant.ro` (non-www) ca bază, trebuie confirmat că asta e domeniul canonic livrat de Vercel.
- Proprietate Google Search Console pentru `aiwant.ro` + submisie sitemap după deploy.
- Google Business Profile — existență/completitudine, relevant pentru clusterul local (C).
- URL-urile sociale din `components/Footer.tsx` (LinkedIn: `linkedin.com/company/aiwant`, Instagram: `instagram.com/aiwant.ro`) — folosite ca `sameAs` în JSON-LD la Faza 2, dar existența/corectitudinea lor nu a fost verificată (nu am acces să le vizitez).
- Volume de căutare reale pentru toate cuvintele cheie de mai sus — niciunul verificat, toate sunt ipoteze de validat.

---

## Corecții față de brief-ul din prompt

> [!warning] Corecție — canonical pe articolele hardcodate
> Prompt-ul spunea că doar 2 din 5 pagini hardcodate de blog au `alternates.canonical` (`taskuri-repetitive-automatizare`, `roi-automatizare-procese`). Verificat direct în cod: **toate cele 5** au deja `canonical` setat, ca URL absolut (`https://aiwant.ro/blog/<slug>`):
> `taskuri-repetitive-automatizare`, `roadmap-implementare-automatizare`, `saas-vs-software-custom`, `proprietate-digitala-vs-social-media`, `roi-automatizare-procese`.
> Impact pe Faza 2: pasul "adaugă canonical la cele 3 care lipsesc" devine "fă relative cele 5 absolute existente", pentru consistență cu restul site-ului (așa cum cere §2.3 din prompt oricum).

Restul afirmațiilor din brief (metadata veche în `app/layout.tsx`, brand suffix inconsistent, `/configurator` fără metadata, `/auth/*` fără `noindex`, footer „Servicii" ca hash, `/politica-de-confidentialitate` inexistentă) au fost confirmate identic în cod.
