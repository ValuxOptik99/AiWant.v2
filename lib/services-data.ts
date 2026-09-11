// Central data for all 6 service subpages

export type ServiceFeature = {
  icon: string;
  title: string;
  description: string;
};

export type ServiceProcess = {
  step: number;
  title: string;
  description: string;
  timeframe: string;
};

export type ServiceProject = {
  name: string;
  description: string;
  tags: string[];
  image?: string;
};

export type ServicePricingExtra = {
  label: string;
  price: string;
};

export type ServiceData = {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  problems: string[];
  solutions: string[];
  features: ServiceFeature[];
  process: ServiceProcess[];
  projects: ServiceProject[];
  projectsNote?: string;
  pricingFrom: string;
  pricingFromRON: string;
  pricingExtra?: ServicePricingExtra[];
  pricingFactors: string[];
  faq: { question: string; answer: string }[];
};

export const SERVICES_DATA: ServiceData[] = [
  // ── 1. SITE-URI DE PREZENTARE ──────────────────────────────────────────────
  {
    slug: "site-prezentare",
    icon: "Globe",
    title: "Site-uri de Prezentare",
    subtitle:
      "Prima impresie contează. Un site de prezentare profesional este cartea ta de vizită digitală — disponibilă 24/7, pe orice dispozitiv, în toată lumea.",
    seoTitle: "Site-uri de Prezentare Profesionale",
    seoDescription:
      "Site-uri de prezentare moderne, responsive, optimizate SEO. Construit cu Next.js pentru viteză maximă. Design personalizat, fără template-uri generice.",
    problems: [
      "Nu ai un site sau ai unul vechi, neatractiv, care nu inspiră încredere",
      "Site-ul tău actual nu se vede bine pe telefon",
      "Clienții potențiali te caută pe Google și nu te găsesc",
      "Ai plătit mult pe un site WordPress greu de administrat",
    ],
    solutions: [
      "Design modern, responsive, optimizat pentru orice ecran",
      "Viteză de încărcare excelentă — sub 2 secunde",
      "SEO de bază inclus — să fii găsit pe Google",
      "Administrare simplă, fără cunoștințe tehnice",
    ],
    features: [
      {
        icon: "Paintbrush",
        title: "Design personalizat",
        description:
          "Fără template-uri generice. Fiecare site este creat de la zero, adaptat brandului tău.",
      },
      {
        icon: "Smartphone",
        title: "Responsive pe toate dispozitivele",
        description:
          "Arată perfect pe telefon, tabletă și desktop. Testat pe toate browserele.",
      },
      {
        icon: "Search",
        title: "Optimizare SEO",
        description:
          "Structură corectă, meta tags, sitemap, schema markup — totul pentru ca Google să te găsească.",
      },
      {
        icon: "Mail",
        title: "Formular de contact",
        description:
          "Cu notificări pe email sau WhatsApp. Clientul te contactează direct din site.",
      },
      {
        icon: "Lock",
        title: "Certificat SSL",
        description:
          "HTTPS inclus gratuit. Site-ul tău este securizat și inspiră încredere.",
      },
      {
        icon: "Zap",
        title: "Viteză optimizată",
        description:
          "Construit cu Next.js — scoruri excelente la Google PageSpeed.",
      },
      {
        icon: "Server",
        title: "Hosting & administrare",
        description:
          "Ne ocupăm de tot: server, backup-uri, actualizări, monitorizare.",
      },
      {
        icon: "FileText",
        title: "Conținut pregătit pentru lansare",
        description: "Te ajutăm cu structurarea textelor și a paginilor.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discuție inițială & brief",
        description: "Înțelegem afacerea ta, publicul și obiectivele.",
        timeframe: "Ziua 1-2",
      },
      {
        step: 2,
        title: "Wireframe & structură",
        description: "Stabilim paginile, navigarea și ierarhia conținutului.",
        timeframe: "Ziua 3-5",
      },
      {
        step: 3,
        title: "Design vizual",
        description:
          "Creăm designul complet, adaptat identității tale vizuale.",
        timeframe: "Ziua 5-10",
      },
      {
        step: 4,
        title: "Dezvoltare & testare",
        description:
          "Construim site-ul, adăugăm conținutul, testăm pe toate dispozitivele.",
        timeframe: "Ziua 10-18",
      },
      {
        step: 5,
        title: "Lansare & predare",
        description:
          "Publicăm site-ul, configurăm domeniul și te instruim cum să-l administrezi.",
        timeframe: "Ziua 18-21",
      },
    ],
    projects: [
      {
        name: "avocatneagumaria.ro",
        description:
          "Site de prezentare profesional pentru un cabinet de avocatură din Constanța. Design elegant, formular de contact integrat, optimizat SEO, deploy pe Vercel.",
        tags: ["Next.js", "Tailwind CSS", "Vercel", "Framer Motion"],
        image: "/images/avocatnegumaria.jpeg",
      },
    ],
    pricingFrom: "de la 250 EUR",
    pricingFromRON: "~1.250 RON",
    pricingExtra: [
      { label: "Site complet 5-10 pagini", price: "de la 350 EUR (~1.750 RON)" },
      { label: "Landing page simplu", price: "de la 250 EUR (~1.250 RON)" },
    ],
    pricingFactors: [
      "Număr de pagini",
      "Complexitate design",
      "Conținut furnizat vs. creat de noi",
      "Funcționalități extra (blog, calculator, etc.)",
    ],
    faq: [
      {
        question: "Cât durează realizarea unui site de prezentare?",
        answer:
          "În medie 2-3 săptămâni de la momentul în care avem toate informațiile și conținutul de la tine.",
      },
      {
        question: "Pot să-mi administrez singur site-ul după?",
        answer:
          "Da. Îți oferim acces și instrucțiuni. Pentru modificări majore, suntem la dispoziție.",
      },
      {
        question: "Ce se întâmplă cu hosting-ul?",
        answer:
          "Oferim hosting și administrare de la 15 EUR/lună — mai puțin de 2% din valoarea proiectului tău, incluzând backup-uri, SSL, monitorizare și suport tehnic.",
      },
      {
        question: "Primesc codul sursă?",
        answer:
          "Da, la finalul proiectului și după achitarea integrală, primești tot codul sursă.",
      },
      {
        question: "Pot adăuga mai târziu un blog sau funcționalități noi?",
        answer:
          "Absolut. Site-ul este construit modular și poate fi extins oricând.",
      },
    ],
  },

  // ── 2. APLICAȚII WEB CUSTOM ────────────────────────────────────────────────
  {
    slug: "aplicatii-web",
    icon: "LayoutDashboard",
    title: "Aplicații Web Custom",
    subtitle:
      "Când afacerea ta are nevoie de mai mult decât un site simplu — dashboard-uri, sisteme de booking, CRM-uri sau orice aplicație construită exact pe nevoile tale.",
    seoTitle: "Aplicații Web Custom: Dashboard, CRM, Booking",
    seoDescription:
      "Aplicații web custom: dashboard-uri, CRM-uri, sisteme de booking. Next.js, PostgreSQL, TypeScript. Construite exact pe nevoile afacerii tale.",
    problems: [
      "Folosești foi Excel sau procese manuale pentru a-ți gestiona activitatea",
      "Software-ul existent nu se potrivește fluxului tău de lucru",
      "Plătești licențe scumpe pentru funcționalități pe care nu le folosești",
      "Ai nevoie de o aplicație specifică dar nu știi de unde să începi",
    ],
    solutions: [
      "Aplicație construită exact pe fluxul tău de lucru, nu invers",
      "Panou de administrare intuitiv — nu ai nevoie de training IT",
      "Integrare cu serviciile pe care le folosești deja (email, calendar, plăți)",
      "Scalabilă — crește odată cu afacerea ta",
    ],
    features: [
      {
        icon: "ClipboardList",
        title: "Analiză completă a cerințelor",
        description:
          "Înțelegem în detaliu ce ai nevoie înainte de a scrie prima linie de cod.",
      },
      {
        icon: "LayoutDashboard",
        title: "Panou de administrare",
        description:
          "Dashboard intuitiv de unde gestionezi totul: date, utilizatori, conținut, setări.",
      },
      {
        icon: "Database",
        title: "Bază de date dedicată",
        description: "PostgreSQL performant, cu backup-uri zilnice automate.",
      },
      {
        icon: "Users",
        title: "Autentificare & roluri",
        description:
          "Login securizat, cu permisiuni diferite pentru admin, angajați, clienți.",
      },
      {
        icon: "Cable",
        title: "API & integrări",
        description:
          "Conectăm aplicația cu email, SMS, procesatoare de plăți, calendare sau alte sisteme.",
      },
      {
        icon: "Smartphone",
        title: "Design responsive",
        description:
          "Funcționează impecabil pe orice dispozitiv — desktop, tabletă sau telefon.",
      },
      {
        icon: "Bell",
        title: "Notificări automate",
        description:
          "Email-uri, alerte sau notificări push — automate, bazate pe evenimente.",
      },
      {
        icon: "BookOpen",
        title: "Documentație & training",
        description:
          "Primești documentație completă și training pentru echipa ta.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & analiză",
        description:
          "Workshop cu tine pentru a înțelege procesele, utilizatorii și cerințele.",
        timeframe: "Săptămâna 1",
      },
      {
        step: 2,
        title: "Arhitectură & wireframes",
        description:
          "Definim structura aplicației, baza de date și fluxurile de utilizare.",
        timeframe: "Săptămâna 2",
      },
      {
        step: 3,
        title: "Design UI/UX",
        description:
          "Creăm interfața vizuală completă, validăm cu tine fiecare ecran.",
        timeframe: "Săptămâna 2-3",
      },
      {
        step: 4,
        title: "Dezvoltare iterativă",
        description:
          "Construim funcționalitate cu funcționalitate. Primești demo-uri regulate.",
        timeframe: "Săptămâna 3-8",
      },
      {
        step: 5,
        title: "Testare & lansare",
        description:
          "Testăm riguros, corectăm, lansăm și monitorizăm primele zile.",
        timeframe: "Săptămâna 8-10",
      },
    ],
    projects: [
      {
        name: "Holding Space — Pet Farewell Rituals",
        description:
          "Platformă completă cu landing page, sistem de pre-comenzi cu formulare dedicate per produs, panou de administrare cu filtrare/sortare/status management și API routes pentru gestionarea datelor.",
        tags: [
          "Next.js",
          "Framer Motion",
          "Tailwind CSS",
          "API Routes",
          "Admin Panel",
        ],
        image: "/images/holdingspace.jpg",
      },
      {
        name: "Sistem de procesare date academice",
        description:
          "Aplicație de procesare și reordonare a datelor din tabele HTML pentru un sistem de management al conferințelor academice (Universitatea Ovidius Constanța).",
        tags: ["Python", "HTML Processing", "Data Pipeline"],
      },
    ],
    pricingFrom: "de la 800 EUR",
    pricingFromRON: "~4.000 RON",
    pricingExtra: [
      { label: "CRM / sistem de booking complex", price: "1.500 – 3.000 EUR" },
      { label: "Dashboard simplu", price: "de la 800 EUR (~4.000 RON)" },
    ],
    pricingFactors: [
      "Complexitate funcționalități",
      "Număr de roluri / utilizatori",
      "Integrări externe necesare",
      "Volum de date procesat",
    ],
    faq: [
      {
        question: "Cât durează dezvoltarea unei aplicații web?",
        answer:
          "Între 4 și 12 săptămâni, în funcție de complexitate. Un dashboard simplu e gata în 4-5 săptămâni, un CRM complex poate dura 10-12.",
      },
      {
        question: "Ce tehnologii folosiți?",
        answer:
          "Next.js, React, TypeScript, PostgreSQL (Neon), Tailwind CSS, deploy pe Vercel. Stack modern, performant și ușor de menținut.",
      },
      {
        question: "Pot adăuga funcționalități noi după lansare?",
        answer:
          "Da, aplicația este construită modular. Putem adăuga oricând funcționalități noi prin comenzi individuale.",
      },
      {
        question: "Cum funcționează hosting-ul pentru aplicații?",
        answer:
          "Aplicația rulează pe infrastructura noastră, cu backup-uri zilnice, monitorizare 24/7 și suport tehnic inclus în abonamentul lunar.",
      },
      {
        question: "Datele mele sunt în siguranță?",
        answer:
          "Da. Folosim baze de date criptate, HTTPS, autentificare securizată și backup-uri zilnice automate.",
      },
    ],
  },

  // ── 3. MAGAZINE ONLINE ─────────────────────────────────────────────────────
  {
    slug: "magazine-online",
    icon: "ShoppingCart",
    title: "Magazine Online",
    subtitle:
      "Un magazin online profesional care vinde non-stop. De la catalogul de produse la procesarea plăților — totul integrat și ușor de administrat.",
    seoTitle: "Magazine Online Profesionale",
    seoDescription:
      "Magazine online cu catalog produse, integrare plăți (Stripe, Netopia), gestionare comenzi și stocuri. Design personalizat, fără comisioane pe vânzări.",
    problems: [
      "Vinzi doar fizic sau pe marketplace-uri și depinzi de comisioanele lor",
      "Ai un magazin online dar e lent, greu de administrat sau arată neprofesional",
      "Procesul de comandă e complicat și pierzi clienți la checkout",
      "Nu ai control asupra datelor clienților și a istoricului de comenzi",
    ],
    solutions: [
      "Magazin propriu, fără comisioane pe vânzări",
      "Administrare simplă a produselor, stocurilor și comenzilor",
      "Checkout rapid, optimizat pentru conversii",
      "Integrare cu procesatoare de plăți (card, ramburs, transfer)",
    ],
    features: [
      {
        icon: "LayoutGrid",
        title: "Catalog de produse",
        description:
          "Categorii, filtre, căutare, variante de produs (mărime, culoare), galerii foto.",
      },
      {
        icon: "ShoppingBag",
        title: "Coș de cumpărături & checkout",
        description:
          "Flux de comandă optimizat, cu cât mai puțini pași pentru client.",
      },
      {
        icon: "CreditCard",
        title: "Integrare plăți",
        description:
          "Plata cu cardul (Stripe/Netopia), ramburs, transfer bancar.",
      },
      {
        icon: "ClipboardList",
        title: "Gestionare comenzi",
        description:
          "Panou admin cu status comenzi, notificări automate, istoric complet.",
      },
      {
        icon: "Package",
        title: "Gestionare stocuri",
        description:
          "Monitorizare automată a stocurilor cu alerte la nivel scăzut.",
      },
      {
        icon: "Search",
        title: "SEO pentru produse",
        description:
          "Fiecare produs optimizat pentru Google Shopping și căutări organice.",
      },
      {
        icon: "Smartphone",
        title: "Design responsive",
        description:
          "Experiență de cumpărare perfectă pe mobil — unde se fac cele mai multe achiziții.",
      },
      {
        icon: "BarChart2",
        title: "Rapoarte vânzări",
        description:
          "Dashboard cu statistici: vânzări, produse populare, comportament clienți.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Analiză catalog & cerințe",
        description:
          "Stabilim structura catalogului, categoriile, metodele de plată și livrare.",
        timeframe: "Săptămâna 1",
      },
      {
        step: 2,
        title: "Design magazin",
        description:
          "Creăm designul paginilor: homepage, listare produse, pagină produs, coș, checkout.",
        timeframe: "Săptămâna 2-3",
      },
      {
        step: 3,
        title: "Dezvoltare platformă",
        description:
          "Construim magazinul, configurăm plățile, importăm produsele.",
        timeframe: "Săptămâna 3-7",
      },
      {
        step: 4,
        title: "Testare & comenzi test",
        description:
          "Testăm întregul flux de cumpărare, inclusiv plăți reale de test.",
        timeframe: "Săptămâna 7-8",
      },
      {
        step: 5,
        title: "Lansare & training",
        description:
          "Lansăm magazinul și te instruim cum să gestionezi produse și comenzi.",
        timeframe: "Săptămâna 8-9",
      },
    ],
    projects: [],
    projectsNote:
      "Avem experiența tehnică completă pentru e-commerce — de la integrare procesatoare de plăți la gestionare stocuri. Tehnologiile sunt aceleași pe care le folosim zilnic în aplicațiile web custom.",
    pricingFrom: "de la 800 EUR",
    pricingFromRON: "~4.000 RON",
    pricingExtra: [
      {
        label: "Magazin avansat (variante, integrări)",
        price: "1.500 – 3.000 EUR",
      },
      { label: "Magazin basic", price: "de la 800 EUR (~4.000 RON)" },
    ],
    pricingFactors: [
      "Număr de produse",
      "Complexitate variante și filtre",
      "Integrări plăți / curier",
      "Funcționalități custom (facturare, loialitate, etc.)",
    ],
    faq: [
      {
        question: "Pot să-mi adaug singur produse?",
        answer:
          "Da. Panoul de administrare e intuitiv — adaugi produse, modifici prețuri și gestionezi comenzi fără cunoștințe tehnice.",
      },
      {
        question: "Ce procesor de plăți recomandați?",
        answer:
          "Stripe pentru simplitate și fiabilitate, sau Netopia/mobilPay pentru piața din România. Configurăm ce preferi.",
      },
      {
        question: "Pot integra cu un curier?",
        answer:
          "Da — FAN Courier, Cargus, DPD, sau orice curier care oferă API. Generare automată de AWB-uri.",
      },
      {
        question: "Magazinul suportă facturare automată?",
        answer:
          "Da, putem integra cu sisteme de facturare (SmartBill, Oblio, etc.) pentru emitere automată la fiecare comandă.",
      },
      {
        question: "Câte produse poate susține?",
        answer:
          "Platforma suportă mii de produse fără probleme de performanță.",
      },
    ],
  },

  // ── 4. SOLUȚII AI & AUTOMATIZĂRI ──────────────────────────────────────────
  {
    slug: "ai-automatizari",
    icon: "Bot",
    title: "Soluții AI & Automatizări",
    subtitle:
      "Elimină munca repetitivă din afacerea ta. Automatizăm procesele, integrăm sisteme și implementăm inteligență artificială acolo unde contează.",
    seoTitle: "Soluții AI & Automatizări cu n8n",
    seoDescription:
      "Automatizări n8n, chatboți AI, integrări API, procesare automată documente. Workflow-uri care rulează 24/7, fără intervenție manuală.",
    problems: [
      "Echipa ta pierde ore pe sarcini repetitive care ar putea fi automatizate",
      "Datele sunt în sisteme separate care nu comunică între ele",
      "Procesezi manual documente, email-uri sau rapoarte",
      "Ai auzit de AI dar nu știi cum te poate ajuta concret",
    ],
    solutions: [
      "Workflow-uri automate care rulează singure, fără intervenție",
      "Sisteme conectate — datele circulă automat între aplicații",
      "Procesare automată de documente, email-uri și date",
      "Chatboți și asistenți AI care răspund clienților tăi 24/7",
    ],
    features: [
      {
        icon: "Workflow",
        title: "Automatizări n8n",
        description:
          "Workflow-uri vizuale care conectează orice aplicație: email, CRM, facturare, social media, baze de date.",
      },
      {
        icon: "Cable",
        title: "Integrări API",
        description:
          "Conectăm sistemele pe care le folosești deja — Google Workspace, Slack, email, calendare, procesatoare de plăți.",
      },
      {
        icon: "Bot",
        title: "Chatboți AI",
        description:
          "Asistenți inteligenți care răspund la întrebările clienților, preiau comenzi sau programează întâlniri.",
      },
      {
        icon: "FileText",
        title: "Procesare documente",
        description:
          "Extragere automată de date din PDF-uri, facturi, contracte — structurate și salvate automat.",
      },
      {
        icon: "Mail",
        title: "Sumarizare email-uri",
        description:
          "Email-urile importante sunt rezumate automat și trimise ca notificări pe WhatsApp sau Slack.",
      },
      {
        icon: "BarChart3",
        title: "Rapoarte automate",
        description:
          "Rapoarte zilnice/săptămânale generate și trimise automat, fără intervenție manuală.",
      },
      {
        icon: "Database",
        title: "Pipeline-uri de date",
        description:
          "Date colectate, procesate, transformate și livrate automat — de la sursă la destinație.",
      },
      {
        icon: "Bell",
        title: "Monitorizare & alerte",
        description:
          "Sistemele automatizate sunt monitorizate. Primești alertă instant dacă ceva nu funcționează.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit procese",
        description:
          "Identificăm procesele repetitive, punctele de ineficiență și oportunitățile de automatizare.",
        timeframe: "Ziua 1-3",
      },
      {
        step: 2,
        title: "Design workflow",
        description:
          "Proiectăm fluxul automatizat: trigger → acțiuni → rezultat. Validăm cu tine.",
        timeframe: "Ziua 3-5",
      },
      {
        step: 3,
        title: "Implementare & integrare",
        description:
          "Construim automatizarea, conectăm sistemele, configurăm AI.",
        timeframe: "Ziua 5-12",
      },
      {
        step: 4,
        title: "Testare & optimizare",
        description: "Testăm cu date reale, ajustăm, optimizăm performanța.",
        timeframe: "Ziua 12-15",
      },
      {
        step: 5,
        title: "Lansare & documentare",
        description:
          "Activăm automatizarea în producție și documentăm tot fluxul.",
        timeframe: "Ziua 15-17",
      },
    ],
    projects: [
      {
        name: "Pipeline GitHub-to-DOCX",
        description:
          "Workflow automatizat n8n care preia conținut din repository-uri GitHub, procesează datele și generează documente Word formatate automat.",
        tags: ["n8n", "GitHub API", "Document Generation"],
        image: "/images/n8n.jpeg",
      },
      {
        name: "Sumarizare automată email-uri",
        description:
          "Sistem care monitorizează inbox-ul, identifică email-urile importante, le rezumă cu AI și trimite notificări structurate.",
        tags: ["n8n", "AI/LLM", "Email Processing"],
      },
      {
        name: "Procesare date academice",
        description:
          "Pipeline automat de procesare a tabelelor HTML din sistemul de conferințe al Universității Ovidius — reordonare, structurare și export date.",
        tags: ["Python", "HTML Parsing", "Data Pipeline"],
      },
    ],
    pricingFrom: "de la 100 EUR",
    pricingFromRON: "~500 RON",
    pricingExtra: [
      { label: "Soluții AI complete", price: "500 – 1.500 EUR" },
      { label: "Workflow-uri complexe", price: "300 – 800 EUR" },
      { label: "Integrare API simplă", price: "de la 100 EUR (~500 RON)" },
    ],
    pricingFactors: [
      "Număr de sisteme conectate",
      "Complexitate logică workflow",
      "Volum de date procesate",
      "Training AI necesar",
    ],
    faq: [
      {
        question: "Am nevoie de cunoștințe tehnice?",
        answer:
          "Nu. Noi construim și menținem automatizarea. Tu vezi doar rezultatele.",
      },
      {
        question: "Ce se întâmplă dacă un workflow se oprește?",
        answer:
          "Avem monitorizare automată. Primim alertă instant și intervenim rapid.",
      },
      {
        question: "Pot automatiza ceva ce acum fac manual în Excel?",
        answer:
          "Aproape sigur da. Dacă ai un proces repetitiv bazat pe reguli, poate fi automatizat.",
      },
      {
        question: "AI-ul poate răspunde clienților mei?",
        answer:
          "Da, dar cu măsură. Configurăm chatboți cu limite clare și escalare către om când e necesar.",
      },
      {
        question: "Automatizările funcționează și noaptea/în weekend?",
        answer:
          "Da, rulează 24/7 pe servere dedicate, fără intervenție.",
      },
    ],
  },

  // ── 5. DESIGN UI/UX ────────────────────────────────────────────────────────
  {
    slug: "design-uiux",
    icon: "Palette",
    title: "Design UI/UX",
    subtitle:
      "Un design bun nu e doar frumos — e intuitiv, rapid și face utilizatorul să revină. Creăm interfețe pe care oamenii le înțeleg din prima.",
    seoTitle: "Design UI/UX Profesional",
    seoDescription:
      "Design UI/UX: wireframes, prototipuri interactive, design system complet. Interfețe testate pentru uzabilitate și optimizate pentru conversii.",
    problems: [
      "Site-ul tău arată datat sau neprofesional comparativ cu competiția",
      "Utilizatorii nu găsesc ce caută și abandonează repede",
      "Ai primit un design generic, de template, care nu te diferențiază",
      "Nu ai o identitate vizuală coerentă pe online",
    ],
    solutions: [
      "Design creat specific pentru brandul și publicul tău",
      "Interfață testată pentru uzabilitate — lucrurile sunt unde te aștepți",
      "Coerență vizuală pe tot site-ul / aplicația",
      "Optimizat pentru conversii — ghidează utilizatorul spre acțiune",
    ],
    features: [
      {
        icon: "Search",
        title: "Analiză brand & competiție",
        description:
          "Studiem brandul tău, competitorii și publicul țintă pentru a defini direcția vizuală.",
      },
      {
        icon: "LayoutTemplate",
        title: "Wireframes",
        description:
          "Schițe structurale ale fiecărei pagini — definim layoutul înainte de a adăuga culori și elemente grafice.",
      },
      {
        icon: "Paintbrush",
        title: "Design vizual complet",
        description:
          "Fiecare pagină, fiecare stare (hover, activ, eroare), fiecare breakpoint — designat pixel-perfect.",
      },
      {
        icon: "MousePointer",
        title: "Prototip interactiv",
        description:
          "Navighezi prin designul final ca și cum ar fi site-ul real, înainte de a scrie cod.",
      },
      {
        icon: "Palette",
        title: "Design System",
        description:
          "Paletă de culori, tipografie, componente reutilizabile — consistență pe tot produsul.",
      },
      {
        icon: "Smartphone",
        title: "Responsive Design",
        description:
          "Adaptat pentru mobil, tabletă și desktop — nu e un afterthought, e parte din proces.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Brief creativ",
        description:
          "Discutăm viziunea ta, preferințele, brandul, publicul.",
        timeframe: "Ziua 1-2",
      },
      {
        step: 2,
        title: "Moodboard & direcție",
        description:
          "Propunem 2-3 direcții vizuale cu exemple, culori, fonturi.",
        timeframe: "Ziua 3-5",
      },
      {
        step: 3,
        title: "Wireframes",
        description: "Structura paginilor — layout, ierarhie, navigare.",
        timeframe: "Ziua 5-8",
      },
      {
        step: 4,
        title: "Design vizual",
        description:
          "Aplicăm direcția aleasă pe toate paginile. Revizii incluse.",
        timeframe: "Ziua 8-15",
      },
      {
        step: 5,
        title: "Predare & ghid",
        description:
          "Predăm fișierele, design system-ul și ghidul de implementare.",
        timeframe: "Ziua 15-18",
      },
    ],
    projects: [
      {
        name: "aiwant.ro",
        description:
          "Designul acestui site — paletă gold+navy, animații Framer Motion, secțiuni alternante dark/light, micro-interacțiuni pe hover.",
        tags: ["UI/UX", "Tailwind CSS", "Framer Motion", "Design System"],
      },
      {
        name: "Holding Space",
        description:
          "Design emoțional pentru platformă de ritualuri de despărțire de animăluțe — paletă sage/earth, tipografie editorială, wave dividers, timeline interactivă.",
        tags: ["UI/UX", "Emotional Design", "Framer Motion"],
        image: "/images/holdingspace.jpg",
      },
      {
        name: "avocatneagumaria.ro",
        description:
          "Design profesional pentru cabinet de avocatură — elegant, sobru, cu accent pe încredere și credibilitate.",
        tags: ["UI/UX", "Professional Design", "Legal Sector"],
        image: "/images/avocatnegumaria.jpeg",
      },
    ],
    pricingFrom: "de la 200 EUR",
    pricingFromRON: "~1.000 RON",
    pricingExtra: [
      { label: "Design per proiect", price: "de la 200 EUR (~1.000 RON)" },
    ],
    pricingFactors: [
      "Număr de pagini / ecrane",
      "Complexitate interfață",
      "Număr de revizii",
      "Livrare ca fișiere design vs. implementat direct",
    ],
    faq: [
      {
        question: "Faceți și implementarea sau doar designul?",
        answer:
          "Facem ambele. De obicei designul și dezvoltarea merg mână în mână — e mai eficient și rezultatul e mai fidel.",
      },
      {
        question: "Câte revizii sunt incluse?",
        answer:
          "De regulă 2-3 runde de revizii. Scopul e să ajungem la varianta corectă, nu să ne grăbim.",
      },
      {
        question: "Ce primesc la final?",
        answer:
          "Fișierele sursă (Figma sau echivalent), design system documentat și, dacă includem și dezvoltarea, codul gata de producție.",
      },
      {
        question: "Puteți redesigna un site existent?",
        answer:
          "Da. Facem redesign păstrând conținutul și structura sau le regândim complet, în funcție de nevoie.",
      },
      {
        question: "Lucrați și cu branding (logo, identitate vizuală)?",
        answer:
          "Ne concentrăm pe UI/UX digital. Pentru branding complet, putem recomanda parteneri sau ne adaptăm la identitatea vizuală existentă.",
      },
    ],
  },

  // ── 6. SOCIAL MEDIA & MARKETING ───────────────────────────────────────────
  {
    slug: "social-media",
    icon: "Megaphone",
    title: "Social Media & Marketing",
    subtitle:
      "Nu e suficient să ai un site bun dacă nimeni nu știe de tine. Construim prezența ta online și aducem clienți prin conținut strategic.",
    seoTitle: "Social Media & Marketing Digital",
    seoDescription:
      "Management social media, strategie de conținut, creștere organică. Instagram, TikTok, Facebook, LinkedIn. Rapoarte lunare cu metrici clare.",
    problems: [
      "Ai conturi de social media dar postezi rar și fără strategie",
      "Nu știi ce să postezi și când, și consumă prea mult timp",
      "Competiția ta e activă online și tu rămâi în urmă",
      "Ai investit în reclame dar nu ai văzut rezultate concrete",
    ],
    solutions: [
      "Strategie de conținut planificată pe luni — știi exact ce se postează",
      "Calendar editorial cu conținut creat profesional",
      "Creștere organică — urmăritori reali, nu numere goale",
      "Rapoarte lunare cu metrici clare — vezi ce funcționează",
    ],
    features: [
      {
        icon: "Search",
        title: "Audit & strategie",
        description:
          "Analizăm conturile existente, competiția și publicul pentru a defini strategia optimă.",
      },
      {
        icon: "Calendar",
        title: "Calendar editorial",
        description:
          "Plan lunar de conținut — ce se postează, când, pe ce platformă, cu ce obiectiv.",
      },
      {
        icon: "ImageIcon",
        title: "Creare conținut",
        description:
          "Texte, grafice, video-uri scurte — conținut adaptat fiecărei platforme.",
      },
      {
        icon: "MessageCircle",
        title: "Management conturi",
        description:
          "Postăm, răspundem la comentarii și mesaje, menținem conversația activă.",
      },
      {
        icon: "TrendingUp",
        title: "Campanii de creștere",
        description:
          "Strategii organice și plătite pentru a ajunge la audiența potrivită.",
      },
      {
        icon: "BarChart2",
        title: "Rapoarte & optimizare",
        description:
          "Lunar primești raport cu metrici: reach, engagement, urmăritori, conversii.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit conturi existente",
        description:
          "Analizăm ce ai, ce funcționează, ce nu, și ce face competiția.",
        timeframe: "Săptămâna 1",
      },
      {
        step: 2,
        title: "Strategie & calendar",
        description:
          "Definim direcția, tonul, frecvența și creăm calendarul primei luni.",
        timeframe: "Săptămâna 1-2",
      },
      {
        step: 3,
        title: "Creare conținut",
        description:
          "Producem conținutul pentru prima lună — texte, grafice, programare postări.",
        timeframe: "Săptămâna 2-3",
      },
      {
        step: 4,
        title: "Lansare & management",
        description:
          "Începem publicarea, monitorizăm engagement-ul, răspundem audienței.",
        timeframe: "Săptămâna 3+",
      },
      {
        step: 5,
        title: "Raport & optimizare",
        description:
          "La final de lună: raport detaliat și ajustare strategie pentru luna următoare.",
        timeframe: "Lunar",
      },
    ],
    projects: [
      {
        name: "AeroGym Constanța",
        description:
          "Strategie completă de conținut și management social media pentru program de gimnastică aerobică și multisport. Calendar editorial, creștere audiență pe Instagram și TikTok, conținut video și grafic.",
        tags: ["Instagram", "TikTok", "Content Strategy", "Canva"],
        image: "/images/aerogym.jpg",
      },
      {
        name: "@flavianeagu15",
        description:
          "Audit de profil, strategie de conținut și calendar editorial pentru un coach de fitness și nutriție. Creștere organică și engagement pe Instagram.",
        tags: [
          "Instagram",
          "Fitness Niche",
          "Content Calendar",
          "Growth Strategy",
        ],
      },
    ],
    pricingFrom: "de la 250 EUR",
    pricingFromRON: "~1.250 RON / lună",
    pricingExtra: [
      {
        label: "Management lunar",
        price: "de la 250 EUR (~1.250 RON) / lună",
      },
      { label: "Audit + strategie (one-time)", price: "150 – 400 EUR" },
    ],
    pricingFactors: [
      "Număr de platforme",
      "Frecvența postărilor",
      "Creare conținut (text / foto / video)",
      "Campanii plătite (buget separat)",
    ],
    faq: [
      {
        question: "Pe ce platforme lucrați?",
        answer:
          "Instagram, TikTok, Facebook, LinkedIn — alegem platformele relevante pentru afacerea și publicul tău.",
      },
      {
        question: "Trebuie să furnizez eu conținut (poze, video)?",
        answer:
          "Putem lucra cu materialele tale sau putem crea conținut de la zero. Ideale sunt materialele autentice din activitatea ta.",
      },
      {
        question: "Cât durează până văd rezultate?",
        answer:
          "Primele rezultate (engagement, urmăritori) apar în 1-2 luni. Rezultate solide de creștere se văd în 3-6 luni.",
      },
      {
        question: "Includeți și reclame plătite?",
        answer:
          "Da, putem gestiona și campanii plătite (Meta Ads, TikTok Ads). Bugetul de reclame se stabilește separat.",
      },
      {
        question: "Pot renunța oricând?",
        answer:
          "Da. Recomandăm un angajament minim de 3 luni pentru a vedea rezultate, dar nu e obligatoriu contractual.",
      },
    ],
  },
];

// Helper: get a service by slug
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

// Helper: get all other services (for cross-navigation)
export function getOtherServices(currentSlug: string): ServiceData[] {
  return SERVICES_DATA.filter((s) => s.slug !== currentSlug);
}
