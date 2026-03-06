# CLAUDE CODE PROMPT — Subpagini Servicii aiwant.ro

## CONTEXT

The website aiwant.ro already has a homepage with a services section showing 6 service cards (Site-uri de Prezentare, Aplicații Web Custom, Magazine Online, Soluții AI & Automatizări, Design UI/UX, Social Media & Marketing). Each card has an "Află mai mult →" link.

**YOUR TASK**: Create 6 dedicated service subpages, one for each service. Each page must be detailed, professional, and populated with REAL content based on the company's actual experience and completed projects (listed below).

**IMPORTANT**: These pages are NOT generic service descriptions. They must feel like a senior developer with 30+ years of experience is speaking directly to a potential client — confident, specific, with real examples and clear value propositions.

---

## TECH STACK (match existing site)

- **Framework**: Next.js 14+ (App Router) — pages go in `app/servicii/[slug]/page.tsx`
- **Styling**: Tailwind CSS (use the existing color variables from the site)
- **Animations**: Framer Motion — scroll reveals, staggered elements, hover effects (match the existing site's animation patterns)
- **Icons**: Lucide React
- **Routing**: Each service gets its own route under `/servicii/`

---

## EXISTING COLOR SYSTEM (from the site — use these, do NOT create new ones)

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
```

---

## PAGE STRUCTURE (same template for all 6 pages)

Each service page follows this structure:

### 1. HERO (dark background --color-midnight)
- **Breadcrumb**: Acasă → Servicii → [Numele serviciului] (small, --color-text-muted, with links)
- **Icon**: Same Lucide icon as on homepage card, large (48px), --color-gold
- **Title**: Service name (display font, large, --color-text-on-dark)
- **Subtitle**: 2-3 sentence hook that speaks to the client's problem/need (--color-text-muted)
- **CTA button**: "Solicită ofertă gratuită" (--color-gold fill)
- **Secondary link**: "Sau contactează-mă pe WhatsApp →"

### 2. PROBLEM & SOLUTION (light background --color-surface)
- **Left column (40%)**: "De ce ai nevoie de [serviciu]?" — 3-4 pain points the client faces, each with a small ✗ icon in red/muted
- **Right column (60%)**: "Cum rezolvăm" — 3-4 solutions, each with a ✓ icon in --color-gold
- This section creates urgency and shows understanding of the client's world

### 3. WHAT'S INCLUDED (light background --color-surface-warm)
- **Title**: "Ce primești concret"
- **Grid of feature cards** (3 columns desktop, 1 mobile) — each card with:
  - Lucide icon (--color-gold)
  - Feature title (bold)
  - 1-2 line description
  - These must be SPECIFIC to the service, not generic

### 4. PROCESS (dark background --color-midnight)
- **Title**: "Cum lucrăm la [serviciu]"
- **Vertical timeline** — 4-5 steps specific to this service type
- Each step with number, title, description, and estimated timeframe
- Connecting line between steps

### 5. REAL PROJECTS (light background --color-surface)
- **Title**: "Proiecte realizate"
- **Project cards** — showcase 1-3 REAL projects relevant to this service
- Each card: project name, description, tech tags, screenshot placeholder area
- If there are no directly relevant projects, show the closest match with a note about capabilities

### 6. PRICING PREVIEW (dark background --color-slate-deep)
- **Title**: "Investiție orientativă"
- **Price range display**: "de la X EUR (~Y RON)"
- **What affects the price**: 3-4 factors listed
- **CTA**: "Fiecare proiect e unic. Solicită o ofertă personalizată." + button
- **Trust badges**: "✓ Fără costuri ascunse · ✓ Cod sursă predat · ✓ Suport post-livrare"

### 7. FAQ (light background --color-surface-warm)
- **Title**: "Întrebări frecvente"
- **Accordion** — 4-5 questions specific to this service
- Smooth expand/collapse animation

### 8. FINAL CTA (dark background --color-midnight)
- Strong closing statement
- "Solicită ofertă gratuită" button (--color-gold)
- "Sau sună-mă direct: +40 7XX XXX XXX"
- Back to services link: "← Vezi toate serviciile"

---

## PAGE 1: SITE-URI DE PREZENTARE
**Route**: `/servicii/site-prezentare`
**Icon**: Globe

**Hero subtitle**: "Prima impresie contează. Un site de prezentare profesional este cartea ta de vizită digitală — disponibilă 24/7, pe orice dispozitiv, în toată lumea."

**Problem & Solution**:
- ✗ "Nu ai un site sau ai unul vechi, neatractiv, care nu inspiră încredere"
- ✗ "Site-ul tău actual nu se vede bine pe telefon"
- ✗ "Clienții potențiali te caută pe Google și nu te găsesc"
- ✗ "Ai plătit mult pe un site WordPress greu de administrat"
- ✓ "Design modern, responsive, optimizat pentru orice ecran"
- ✓ "Viteză de încărcare excelentă — sub 2 secunde"
- ✓ "SEO de bază inclus — să fii găsit pe Google"
- ✓ "Administrare simplă, fără cunoștințe tehnice"

**What's included** (8 features):
1. **Design personalizat** — "Fără template-uri generice. Fiecare site este creat de la zero, adaptat brandului tău."
2. **Responsive pe toate dispozitivele** — "Arată perfect pe telefon, tabletă și desktop. Testat pe toate browserele."
3. **Optimizare SEO** — "Structură corectă, meta tags, sitemap, schema markup — totul pentru ca Google să te găsească."
4. **Formular de contact** — "Cu notificări pe email sau WhatsApp. Clientul te contactează direct din site."
5. **Certificat SSL** — "HTTPS inclus gratuit. Site-ul tău este securizat și inspiră încredere."
6. **Viteză optimizată** — "Construit cu Next.js — scoruri excelente la Google PageSpeed."
7. **Hosting & administrare** — "Ne ocupăm de tot: server, backup-uri, actualizări, monitorizare."
8. **Conținut pregătit pentru lansare** — "Te ajutăm cu structurarea textelor și a paginilor."

**Process timeline**:
1. "Discuție inițială & brief" — "Înțelegem afacerea ta, publicul și obiectivele." — "Ziua 1-2"
2. "Wireframe & structură" — "Stabilim paginile, navigarea și ierarhia conținutului." — "Ziua 3-5"
3. "Design vizual" — "Creăm designul complet, adaptat identității tale vizuale." — "Ziua 5-10"
4. "Dezvoltare & testare" — "Construim site-ul, adăugăm conținutul, testăm pe toate dispozitivele." — "Ziua 10-18"
5. "Lansare & predare" — "Publicăm site-ul, configurăm domeniul și te instruim cum să-l administrezi." — "Ziua 18-21"

**Real projects**:
- **avocatneagumaria.ro** — "Site de prezentare profesional pentru un cabinet de avocatură din Constanța. Design elegant, formular de contact integrat, optimizat SEO, deploy pe Vercel." — Tags: Next.js, Tailwind CSS, Vercel, Framer Motion

**Pricing**: "de la 250 EUR (~1.250 RON)" pentru landing page, "de la 350 EUR (~1.750 RON)" pentru site complet 5-10 pagini
- Factori: număr de pagini, complexitate design, conținut furnizat vs. creat de noi, funcționalități extra

**FAQ**:
1. "Cât durează realizarea unui site de prezentare?" — "În medie 2-3 săptămâni de la momentul în care avem toate informațiile și conținutul de la tine."
2. "Pot să-mi administrez singur site-ul după?" — "Da. Îți oferim acces și instrucțiuni. Pentru modificări majore, suntem la dispoziție."
3. "Ce se întâmplă cu hosting-ul?" — "Oferim hosting și administrare de la 15 EUR/lună, incluzând backup-uri, SSL, monitorizare și suport tehnic."
4. "Primesc codul sursă?" — "Da, la finalul proiectului și după achitarea integrală, primești tot codul sursă."
5. "Pot adăuga mai târziu un blog sau funcționalități noi?" — "Absolut. Site-ul este construit modular și poate fi extins oricând."

---

## PAGE 2: APLICAȚII WEB CUSTOM
**Route**: `/servicii/aplicatii-web`
**Icon**: LayoutDashboard

**Hero subtitle**: "Când afacerea ta are nevoie de mai mult decât un site simplu — dashboard-uri, sisteme de booking, CRM-uri sau orice aplicație construită exact pe nevoile tale."

**Problem & Solution**:
- ✗ "Folosești foi Excel sau procese manuale pentru a-ți gestiona activitatea"
- ✗ "Software-ul existent nu se potrivește fluxului tău de lucru"
- ✗ "Plătești licențe scumpe pentru funcționalități pe care nu le folosești"
- ✗ "Ai nevoie de o aplicație specifică dar nu știi de unde să începi"
- ✓ "Aplicație construită exact pe fluxul tău de lucru, nu invers"
- ✓ "Panou de administrare intuitiv — nu ai nevoie de training IT"
- ✓ "Integrare cu serviciile pe care le folosești deja (email, calendar, plăți)"
- ✓ "Scalabilă — crește odată cu afacerea ta"

**What's included** (8 features):
1. **Analiză completă a cerințelor** — "Înțelegem în detaliu ce ai nevoie înainte de a scrie prima linie de cod."
2. **Panou de administrare** — "Dashboard intuitiv de unde gestionezi totul: date, utilizatori, conținut, setări."
3. **Bază de date dedicată** — "PostgreSQL performant, cu backup-uri zilnice automate."
4. **Autentificare & roluri** — "Login securizat, cu permisiuni diferite pentru admin, angajați, clienți."
5. **API & integrări** — "Conectăm aplicația cu email, SMS, procesatoare de plăți, calendare sau alte sisteme."
6. **Design responsive** — "Funcționează impecabil pe orice dispozitiv — desktop, tabletă sau telefon."
7. **Notificări automate** — "Email-uri, alerte sau notificări push — automate, bazate pe evenimente."
8. **Documentație & training** — "Primești documentație completă și training pentru echipa ta."

**Process timeline**:
1. "Discovery & analiză" — "Workshop cu tine pentru a înțelege procesele, utilizatorii și cerințele." — "Săptămâna 1"
2. "Arhitectură & wireframes" — "Definim structura aplicației, baza de date și fluxurile de utilizare." — "Săptămâna 2"
3. "Design UI/UX" — "Creăm interfața vizuală completă, validăm cu tine fiecare ecran." — "Săptămâna 2-3"
4. "Dezvoltare iterativă" — "Construim funcționalitate cu funcționalitate. Primești demo-uri regulate." — "Săptămâna 3-8"
5. "Testare & lansare" — "Testăm riguros, corectăm, lansăm și monitorizăm primele zile." — "Săptămâna 8-10"

**Real projects**:
- **Holding Space — Pet Farewell Rituals** — "Platformă completă cu landing page, sistem de pre-comenzi cu formulare dedicate per produs, panou de administrare cu filtrare/sortare/status management și API routes pentru gestionarea datelor." — Tags: Next.js, Framer Motion, Tailwind CSS, API Routes, Admin Panel
- **Sistem de procesare date academice** — "Aplicație de procesare și reordonare a datelor din tabele HTML pentru un sistem de management al conferințelor academice (Universitatea Ovidius Constanța)." — Tags: Python, HTML Processing, Data Pipeline

**Pricing**: "de la 800 EUR (~4.000 RON)" pentru dashboard simplu, "1.500-3.000 EUR" pentru aplicații complexe (CRM, booking)
- Factori: complexitate funcționalități, număr de roluri/utilizatori, integrări externe, volum de date

**FAQ**:
1. "Cât durează dezvoltarea unei aplicații web?" — "Între 4 și 12 săptămâni, în funcție de complexitate. Un dashboard simplu e gata în 4-5 săptămâni, un CRM complex poate dura 10-12."
2. "Ce tehnologii folosiți?" — "Next.js, React, TypeScript, PostgreSQL (Neon), Tailwind CSS, deploy pe Vercel. Stack modern, performant și ușor de menținut."
3. "Pot adăuga funcționalități noi după lansare?" — "Da, aplicația este construită modular. Putem adăuga oricând funcționalități noi prin comenzi individuale."
4. "Cum funcționează hosting-ul pentru aplicații?" — "Aplicația rulează pe infrastructura noastră, cu backup-uri zilnice, monitorizare 24/7 și suport tehnic inclus în abonamentul lunar."
5. "Datele mele sunt în siguranță?" — "Da. Folosim baze de date criptate, HTTPS, autentificare securizată și backup-uri zilnice automate."

---

## PAGE 3: MAGAZINE ONLINE
**Route**: `/servicii/magazine-online`
**Icon**: ShoppingCart

**Hero subtitle**: "Un magazin online profesional care vinde non-stop. De la catalogul de produse la procesarea plăților — totul integrat și ușor de administrat."

**Problem & Solution**:
- ✗ "Vinzi doar fizic sau pe marketplace-uri și depinzi de comisioanele lor"
- ✗ "Ai un magazin online dar e lent, greu de administrat sau arată neprofesional"
- ✗ "Procesul de comandă e complicat și pierzi clienți la checkout"
- ✗ "Nu ai control asupra datelor clienților și a istoricului de comenzi"
- ✓ "Magazin propriu, fără comisioane pe vânzări"
- ✓ "Administrare simplă a produselor, stocurilor și comenzilor"
- ✓ "Checkout rapid, optimizat pentru conversii"
- ✓ "Integrare cu procesatoare de plăți (card, ramburs, transfer)"

**What's included** (8 features):
1. **Catalog de produse** — "Categorii, filtre, căutare, variante de produs (mărime, culoare), galerii foto."
2. **Coș de cumpărături & checkout** — "Flux de comandă optimizat, cu cât mai puțini pași pentru client."
3. **Integrare plăți** — "Plata cu cardul (Stripe/Netopia), ramburs, transfer bancar."
4. **Gestionare comenzi** — "Panou admin cu status comenzi, notificări automate, istoric complet."
5. **Gestionare stocuri** — "Monitorizare automată a stocurilor cu alerte la nivel scăzut."
6. **SEO pentru produse** — "Fiecare produs optimizat pentru Google Shopping și căutări organice."
7. **Design responsive** — "Experiență de cumpărare perfectă pe mobil — unde se fac cele mai multe achiziții."
8. **Rapoarte vânzări** — "Dashboard cu statistici: vânzări, produse populare, comportament clienți."

**Process timeline**:
1. "Analiză catalog & cerințe" — "Stabilim structura catalogului, categoriile, metodele de plată și livrare." — "Săptămâna 1"
2. "Design magazin" — "Creăm designul paginilor: homepage, listare produse, pagină produs, coș, checkout." — "Săptămâna 2-3"
3. "Dezvoltare platformă" — "Construim magazinul, configurăm plățile, importăm produsele." — "Săptămâna 3-7"
4. "Testare & comenzi test" — "Testăm întregul flux de cumpărare, inclusiv plăți reale de test." — "Săptămâna 7-8"
5. "Lansare & training" — "Lansăm magazinul și te instruim cum să gestionezi produse și comenzi." — "Săptămâna 8-9"

**Real projects**:
- Momentan nu avem un proiect e-commerce public în portofoliu, dar menționăm: "Avem experiența tehnică completă pentru e-commerce — de la integrare procesatoare de plăți la gestionare stocuri. Tehnologiile sunt aceleași pe care le folosim zilnic în aplicațiile web custom."

**Pricing**: "de la 800 EUR (~4.000 RON)" pentru magazin basic, "1.500-3.000 EUR" pentru magazin avansat
- Factori: număr de produse, complexitate variante, integrări plăți/livrare, funcționalități custom

**FAQ**:
1. "Pot să-mi adaug singur produse?" — "Da. Panoul de administrare e intuitiv — adaugi produse, modifici prețuri și gestionezi comenzi fără cunoștințe tehnice."
2. "Ce procesor de plăți recomandați?" — "Stripe pentru simplitate și fiabilitate, sau Netopia/mobilPay pentru piața din România. Configurăm ce preferi."
3. "Pot integra cu un curier?" — "Da — FAN Courier, Cargus, DPD, sau orice curier care oferă API. Generare automată de AWB-uri."
4. "Magazinul suportă facturare automată?" — "Da, putem integra cu sisteme de facturare (SmartBill, Oblio, etc.) pentru emitere automată la fiecare comandă."
5. "Câte produse poate susține?" — "Platforma suportă mii de produse fără probleme de performanță."

---

## PAGE 4: SOLUȚII AI & AUTOMATIZĂRI
**Route**: `/servicii/ai-automatizari`
**Icon**: Bot

**Hero subtitle**: "Elimină munca repetitivă din afacerea ta. Automatizăm procesele, integrăm sisteme și implementăm inteligență artificială acolo unde contează."

**Problem & Solution**:
- ✗ "Echipa ta pierde ore pe sarcini repetitive care ar putea fi automatizate"
- ✗ "Datele sunt în sisteme separate care nu comunică între ele"
- ✗ "Procesezi manual documente, email-uri sau rapoarte"
- ✗ "Ai auzit de AI dar nu știi cum te poate ajuta concret"
- ✓ "Workflow-uri automate care rulează singure, fără intervenție"
- ✓ "Sisteme conectate — datele circulă automat între aplicații"
- ✓ "Procesare automată de documente, email-uri și date"
- ✓ "Chatboți și asistenți AI care răspund clienților tăi 24/7"

**What's included** (8 features):
1. **Automatizări n8n** — "Workflow-uri vizuale care conectează orice aplicație: email, CRM, facturare, social media, baze de date."
2. **Integrări API** — "Conectăm sistemele pe care le folosești deja — Google Workspace, Slack, email, calendare, procesatoare de plăți."
3. **Chatboți AI** — "Asistenți inteligenți care răspund la întrebările clienților, preiau comenzi sau programează întâlniri."
4. **Procesare documente** — "Extragere automată de date din PDF-uri, facturi, contracte — structurate și salvate automat."
5. **Sumarizare email-uri** — "Email-urile importante sunt rezumate automat și trimise ca notificări pe WhatsApp sau Slack."
6. **Rapoarte automate** — "Rapoarte zilnice/săptămânale generate și trimise automat, fără intervenție manuală."
7. **Pipeline-uri de date** — "Date colectate, procesate, transformate și livrate automat — de la sursă la destinație."
8. **Monitorizare & alerte** — "Sistemele automatizate sunt monitorizate. Primești alertă instant dacă ceva nu funcționează."

**Process timeline**:
1. "Audit procese" — "Identificăm procesele repetitive, punctele de ineficiență și oportunitățile de automatizare." — "Ziua 1-3"
2. "Design workflow" — "Proiectăm fluxul automatizat: trigger → acțiuni → rezultat. Validăm cu tine." — "Ziua 3-5"
3. "Implementare & integrare" — "Construim automatizarea, conectăm sistemele, configurăm AI." — "Ziua 5-12"
4. "Testare & optimizare" — "Testăm cu date reale, ajustăm, optimizăm performanța." — "Ziua 12-15"
5. "Lansare & documentare" — "Activăm automatizarea în producție și documentăm tot fluxul." — "Ziua 15-17"

**Real projects**:
- **Pipeline GitHub-to-DOCX** — "Workflow automatizat n8n care preia conținut din repository-uri GitHub, procesează datele și generează documente Word formatate automat." — Tags: n8n, GitHub API, Document Generation
- **Sumarizare automată email-uri** — "Sistem care monitorizează inbox-ul, identifică email-urile importante, le rezumă cu AI și trimite notificări structurate." — Tags: n8n, AI/LLM, Email Processing
- **Procesare date academice** — "Pipeline automat de procesare a tabelelor HTML din sistemul de conferințe al Universității Ovidius — reordonare, structurare și export date." — Tags: Python, HTML Parsing, Data Pipeline

**Pricing**: "de la 100 EUR (~500 RON)" pentru integrare API simplă, "300-800 EUR" pentru workflow-uri complexe, "500-1.500 EUR" pentru soluții AI complete
- Factori: număr de sisteme conectate, complexitate logică, volum de date procesate, training AI necesar

**FAQ**:
1. "Am nevoie de cunoștințe tehnice?" — "Nu. Noi construim și menținem automatizarea. Tu vezi doar rezultatele."
2. "Ce se întâmplă dacă un workflow se oprește?" — "Avem monitorizare automată. Primim alertă instant și intervenim rapid."
3. "Pot automatiza ceva ce acum fac manual în Excel?" — "Aproape sigur da. Dacă ai un proces repetitiv bazat pe reguli, poate fi automatizat."
4. "AI-ul poate răspunde clienților mei?" — "Da, dar cu măsură. Configurăm chatboți cu limite clare și escalare către om când e necesar."
5. "Automatizările funcționează și noaptea/în weekend?" — "Da, rulează 24/7 pe servere dedicate, fără intervenție."

---

## PAGE 5: DESIGN UI/UX
**Route**: `/servicii/design-uiux`
**Icon**: Palette

**Hero subtitle**: "Un design bun nu e doar frumos — e intuitiv, rapid și face utilizatorul să revină. Creăm interfețe pe care oamenii le înțeleg din prima."

**Problem & Solution**:
- ✗ "Site-ul tău arată datat sau neprofesional comparativ cu competiția"
- ✗ "Utilizatorii nu găsesc ce caută și abandonează repede"
- ✗ "Ai primit un design generic, de template, care nu te diferențiază"
- ✗ "Nu ai o identitate vizuală coerentă pe online"
- ✓ "Design creat specific pentru brandul și publicul tău"
- ✓ "Interfață testată pentru uzabilitate — lucrurile sunt unde te aștepți"
- ✓ "Coerență vizuală pe tot site-ul/aplicația"
- ✓ "Optimizat pentru conversii — ghidează utilizatorul spre acțiune"

**What's included** (6 features):
1. **Analiză brand & competiție** — "Studiem brandul tău, competitorii și publicul țintă pentru a defini direcția vizuală."
2. **Wireframes** — "Schițe structurale ale fiecărei pagini — definim layoutul înainte de a adăuga culori și elemente grafice."
3. **Design vizual complet** — "Fiecare pagină, fiecare stare (hover, activ, eroare), fiecare breakpoint — designat pixel-perfect."
4. **Prototip interactiv** — "Navighezi prin designul final ca și cum ar fi site-ul real, înainte de a scrie cod."
5. **Design System** — "Paletă de culori, tipografie, componente reutilizabile — consistență pe tot produsul."
6. **Responsive Design** — "Adaptat pentru mobil, tabletă și desktop — nu e un afterthought, e parte din proces."

**Process timeline**:
1. "Brief creativ" — "Discutăm viziunea ta, preferințele, brandul, publicul." — "Ziua 1-2"
2. "Moodboard & direcție" — "Propunem 2-3 direcții vizuale cu exemple, culori, fonturi." — "Ziua 3-5"
3. "Wireframes" — "Structura paginilor — layout, ierarhie, navigare." — "Ziua 5-8"
4. "Design vizual" — "Aplicăm direcția aleasă pe toate paginile. Revizii incluse." — "Ziua 8-15"
5. "Predare & ghid" — "Predăm fișierele, design system-ul și ghidul de implementare." — "Ziua 15-18"

**Real projects**:
- **aiwant.ro** — "Designul acestui site — paletă gold+navy, animații Framer Motion, secțiuni alternante dark/light, micro-interacțiuni pe hover." — Tags: UI/UX, Tailwind CSS, Framer Motion, Design System
- **Holding Space** — "Design emoțional pentru platformă de ritualuri de despărțire de animăluțe — paletă sage/earth, tipografie editorială, wave dividers, timeline interactivă." — Tags: UI/UX, Emotional Design, Framer Motion
- **avocatneagumaria.ro** — "Design profesional pentru cabinet de avocatură — elegant, sobru, cu accent pe încredere și credibilitate." — Tags: UI/UX, Professional Design, Legal Sector

**Pricing**: "de la 200 EUR (~1.000 RON)" per proiect
- Factori: număr de pagini/ecrane, complexitate interfață, număr de revizii, livrare ca fișiere design vs. implementat direct

**FAQ**:
1. "Faceți și implementarea sau doar designul?" — "Facem ambele. De obicei designul și dezvoltarea merg mână în mână — e mai eficient și rezultatul e mai fidel."
2. "Câte revizii sunt incluse?" — "De regulă 2-3 runde de revizii. Scopul e să ajungem la varianta corectă, nu să ne grăbim."
3. "Ce primesc la final?" — "Fișierele sursă (Figma sau echivalent), design system documentat și, dacă includem și dezvoltarea, codul gata de producție."
4. "Puteți redesigna un site existent?" — "Da. Facem redesign păstrând conținutul și structura sau le regândim complet, în funcție de nevoie."
5. "Lucrați și cu branding (logo, identitate vizuală)?" — "Ne concentrăm pe UI/UX digital. Pentru branding complet, putem recomanda parteneri sau ne adaptăm la identitatea vizuală existentă."

---

## PAGE 6: SOCIAL MEDIA & MARKETING
**Route**: `/servicii/social-media`
**Icon**: Megaphone

**Hero subtitle**: "Nu e suficient să ai un site bun dacă nimeni nu știe de tine. Construim prezența ta online și aducem clienți prin conținut strategic."

**Problem & Solution**:
- ✗ "Ai conturi de social media dar postezi rar și fără strategie"
- ✗ "Nu știi ce să postezi și când, și consumă prea mult timp"
- ✗ "Competiția ta e activă online și tu rămâi în urmă"
- ✗ "Ai investit în reclame dar nu ai văzut rezultate concrete"
- ✓ "Strategie de conținut planificată pe luni — știi exact ce se postează"
- ✓ "Calendar editorial cu conținut creat profesional"
- ✓ "Creștere organică — urmăritori reali, nu numere goale"
- ✓ "Rapoarte lunare cu metrici clare — vezi ce funcționează"

**What's included** (6 features):
1. **Audit & strategie** — "Analizăm conturile existente, competiția și publicul pentru a defini strategia optimă."
2. **Calendar editorial** — "Plan lunar de conținut — ce se postează, când, pe ce platformă, cu ce obiectiv."
3. **Creare conținut** — "Texte, grafice, video-uri scurte — conținut adaptat fiecărei platforme."
4. **Management conturi** — "Postăm, răspundem la comentarii și mesaje, menținem conversația activă."
5. **Campanii de creștere** — "Strategii organice și plătite pentru a ajunge la audiența potrivită."
6. **Rapoarte & optimizare** — "Lunar primești raport cu metrici: reach, engagement, urmăritori, conversii."

**Process timeline**:
1. "Audit conturi existente" — "Analizăm ce ai, ce funcționează, ce nu, și ce face competiția." — "Săptămâna 1"
2. "Strategie & calendar" — "Definim direcția, tonul, frecvența și creăm calendarul primei luni." — "Săptămâna 1-2"
3. "Creare conținut" — "Producem conținutul pentru prima lună — texte, grafice, programare postări." — "Săptămâna 2-3"
4. "Lansare & management" — "Începem publicarea, monitorizăm engagement-ul, răspundem audienței." — "Săptămâna 3+"
5. "Raport & optimizare" — "La final de lună: raport detaliat și ajustare strategie pentru luna următoare." — "Lunar"

**Real projects**:
- **AeroGym Constanța** — "Strategie completă de conținut și management social media pentru program de gimnastică aerobică și multisport. Calendar editorial, creștere audiență pe Instagram și TikTok, conținut video și grafic." — Tags: Instagram, TikTok, Content Strategy, Canva
- **@flavianeagu15** — "Audit de profil, strategie de conținut și calendar editorial pentru un coach de fitness și nutriție. Creștere organică și engagement pe Instagram." — Tags: Instagram, Fitness Niche, Content Calendar, Growth Strategy

**Pricing**: "de la 250 EUR (~1.250 RON) / lună" pentru management, "150-400 EUR one-time" pentru audit + strategie
- Factori: număr de platforme, frecvența postărilor, creare conținut (text/foto/video), campanii plătite (buget separat)

**FAQ**:
1. "Pe ce platforme lucrați?" — "Instagram, TikTok, Facebook, LinkedIn — alegem platformele relevante pentru afacerea și publicul tău."
2. "Trebuie să furnizez eu conținut (poze, video)?" — "Putem lucra cu materialele tale sau putem crea conținut de la zero. Ideale sunt materialele autentice din activitatea ta."
3. "Cât durează până văd rezultate?" — "Primele rezultate (engagement, urmăritori) apar în 1-2 luni. Rezultate solide de creștere se văd în 3-6 luni."
4. "Includeți și reclame plătite?" — "Da, putem gestiona și campanii plătite (Meta Ads, TikTok Ads). Bugetul de reclame se stabilește separat."
5. "Pot renunța oricând?" — "Da. Recomandam un angajament minim de 3 luni pentru a vedea rezultate, dar nu e obligatoriu contractual."

---

## NAVIGATION & LINKING

- Each "Află mai mult →" link on the homepage service cards should point to `/servicii/[slug]`
- Each service page has "← Înapoi la servicii" link that scrolls to the services section on homepage
- Each service page footer shows the other 5 services as small cards ("Alte servicii") for cross-navigation
- The navbar on service pages includes a "Servicii" dropdown with all 6 services

---

## STRICT RULES

1. **All text in ROMANIAN** — use the exact content provided above, do not invent or modify
2. **Match the existing site's design system** — same colors, fonts, animation patterns, component styles
3. **Framer Motion for all animations** — scroll reveals, staggered cards, accordion expand/collapse, timeline
4. **Mobile-first responsive** — every section must look great on 375px, 768px, 1440px+
5. **Create a shared template component** (`ServicePageTemplate.tsx`) that all 6 pages use — pass data as props
6. **All service data in a single data file** (`lib/services-data.ts`) — centralized, easy to edit
7. **Each page must have proper SEO metadata** — title, description, OpenGraph, specific to each service
8. **FAQ accordion must be accessible** — keyboard navigable, proper aria attributes
9. **Cross-navigation between services** — at the bottom of each page, show cards for the other 5 services
10. **Performance** — use Next.js dynamic imports for below-fold sections, optimize images
