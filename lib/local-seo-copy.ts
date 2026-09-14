// ─────────────────────────────────────────────────────────────────────────────
// LOCAL SEO — generarea textului pentru paginile pe oraș.
//
// Separat de componentă ca să poată fi verificat izolat (vezi
// scripts/check-local-seo.ts) și ca metadata din app/[slug]/page.tsx și
// conținutul din componentă să vină din aceeași sursă.
//
// Principiu: fiecare bloc de text trage cel puțin o informație din
// lib/local-seo-data.ts specifică orașului. Nimic nu e doar
// "<șablon> + numele orașului".
// ─────────────────────────────────────────────────────────────────────────────

import {
  INDUSTRIES,
  LOCAL_SERVICES,
  LOCAL_SERVICE_ORDER,
  getCityBySlug,
  variantIndex,
  type City,
  type LocalPage,
  type LocalService,
  type LocalServiceKey,
} from "@/lib/local-seo-data";

// ── Titluri ───────────────────────────────────────────────────────────────────

// Titlurile și descrierile NU includ industria sau județul — numele orașelor
// variază de la 4 caractere (Iași) la 21 (Drobeta-Turnu Severin), iar
// industria cea mai lungă are 31 de caractere; combinate, riscă să scoată
// titlul/descrierea din limitele impuse (metaTitle ≤ 62, metaDescription
// 120–165 — verificate de scripts/check-local-seo.ts). Industria și județul
// rămân prezente în intro, în blocurile pe industrie și în FAQ.
const TITLE_VARIANTS: Record<LocalServiceKey, ((city: string) => string)[]> = {
  site: [
    (c) => `Creare Site Web ${c} — de la 249 EUR`,
    (c) => `Realizare Site de Prezentare ${c}`,
    (c) => `Site Web ${c} — Firmă Web Design`,
  ],
  magazin: [
    (c) => `Magazin Online ${c} — de la 800 EUR`,
    (c) => `Creare Magazin Online ${c}`,
    (c) => `Vânzări Online ${c} — Magazin Complet`,
  ],
  automatizari: [
    (c) => `Automatizări Firme ${c} — Audit Gratuit`,
    (c) => `Automatizare Procese ${c} — n8n, AI`,
    (c) => `Digitalizare Firme ${c} — de la 100 EUR`,
  ],
};

const DESCRIPTION_VARIANTS: Record<LocalServiceKey, ((city: string) => string)[]> = {
  site: [
    (c) =>
      `Creare site de prezentare pentru firma ta din ${c}, de la 249 EUR, livrat în 2-3 zile. Design modern, SEO local, cod sursă predat integral.`,
    (c) =>
      `Site web profesional pentru firma ta din ${c}: rapid, responsive, optimizat pentru căutările locale. De la 249 EUR, gata în 2-3 zile.`,
    (c) =>
      `Realizare site de prezentare în ${c} — de la 249 EUR, gata în 2-3 zile. SEO local inclus, formular de contact, hosting și SSL incluse.`,
  ],
  magazin: [
    (c) =>
      `Creare magazin online pentru firma ta din ${c}, de la 800 EUR. Plăți online, curierat și facturare automată, panou de administrare.`,
    (c) =>
      `Magazin online complet pentru afacerea ta din ${c}: catalog, coș, plăți, stocuri. De la 800 EUR, cod sursă predat integral.`,
    (c) =>
      `Vinde online din ${c} — magazin e-commerce construit pe măsură, de la 800 EUR, cu integrare completă de plăți și curierat rapid.`,
  ],
  automatizari: [
    (c) =>
      `Automatizăm procesele repetitive din firma ta din ${c}: facturare, documente, programări. Audit gratuit al proceselor, de la 100 EUR.`,
    (c) =>
      `Automatizare procese de business în ${c} — integrări API, fluxuri n8n și asistenți AI. Audit gratuit al proceselor de lucru.`,
    (c) =>
      `Digitalizare și automatizări pentru firme din ${c}. Scoatem munca repetitivă din Excel și email, cu audit gratuit inclus. De la 100 EUR.`,
  ],
};

// ── Introduceri ───────────────────────────────────────────────────────────────

const INTRO_LEADS: Record<LocalServiceKey, ((city: City) => string)[]> = {
  site: [
    (city) =>
      `Construim site-uri de prezentare pentru firme din ${city.name} și din restul ${countyPhrase(city)}. ${city.localNote}`,
    (city) =>
      `${city.localNote} Într-un asemenea context, un site propriu nu e o cheltuială de imagine, ci canalul prin care te găsesc clienții care încă nu te cunosc.`,
    (city) =>
      `Dacă ai o firmă în ${city.name} și clienții te găsesc greu pe Google, problema e aproape întotdeauna structura site-ului, nu bugetul de promovare. ${city.localNote}`,
  ],
  magazin: [
    (city) =>
      `Construim magazine online pentru afaceri din ${city.name} și din ${countyPhrase(city)}. ${city.localNote}`,
    (city) =>
      `${city.localNote} Un magazin online propriu înseamnă că vinzi fără comisionul marketplace-urilor și că păstrezi datele clienților tăi.`,
    (city) =>
      `Vânzarea online din ${city.name} nu mai depinde de mărimea orașului — depinde de cât de ușor e de cumpărat de pe telefon. ${city.localNote}`,
  ],
  automatizari: [
    (city) =>
      `Automatizăm procesele repetitive din firmele din ${city.name} și din ${countyPhrase(city)}. ${city.localNote}`,
    (city) =>
      `${city.localNote} În aproape fiecare dintre aceste firme există trei–patru procese care se fac manual zilnic și care pot rula singure.`,
    (city) =>
      `Cele mai multe firme din ${city.name} nu au nevoie de software nou, ci ca aplicațiile pe care le folosesc deja să vorbească între ele. ${city.localNote}`,
  ],
};

function countyPhrase(city: City): string {
  if (city.county === "București") return "zona metropolitană";
  return `județul ${city.county}`;
}

// ── Model de pagină ───────────────────────────────────────────────────────────

export type LocalFaq = { question: string; answer: string };

export type LocalPageCopy = {
  slug: string;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string;
  digitalNote: string;
  /** "De ce ai nevoie de X în <oraș>" — construit din industriile locale */
  industryBlocks: { title: string; body: string }[];
  includes: string[];
  areasIntro: string;
  areas: string[];
  faq: LocalFaq[];
  priceFrom: string;
  priceFromRON: string;
  delivery: string;
  parentHref: string;
  parentLabel: string;
  /** celelalte două servicii, în același oraș */
  siblingServices: { href: string; label: string; blurb: string }[];
  /** același serviciu, în orașele vecine */
  nearbyLinks: { href: string; label: string }[];
};

const SERVICE_BLURB: Record<LocalServiceKey, string> = {
  site: "Site de prezentare, de la 249 EUR",
  magazin: "Magazin online complet, de la 800 EUR",
  automatizari: "Automatizări și integrări, de la 100 EUR",
};

const PARENT_LABEL: Record<LocalServiceKey, string> = {
  site: "Site-uri de prezentare",
  magazin: "Magazine online",
  automatizari: "Soluții AI & Automatizări",
};

export function buildLocalPageCopy(page: LocalPage): LocalPageCopy {
  const { city, service, slug } = page;
  const key = service.key;
  const v3 = variantIndex(slug, 3);

  const metaTitle = TITLE_VARIANTS[key][v3](city.name);
  const metaDescription = DESCRIPTION_VARIANTS[key][v3](city.name);
  const intro = INTRO_LEADS[key][v3](city);

  const industryBlocks = city.industries.slice(0, 4).map((industryKey) => {
    const industry = INDUSTRIES[industryKey];
    return {
      title: capitalize(industry.label),
      body: `Firmele din ${industry.label} din ${city.name} au nevoie de ${industry[key]}.`,
    };
  });

  const siblingServices = LOCAL_SERVICE_ORDER.filter((k) => k !== key).map((k) => {
    const s = LOCAL_SERVICES[k];
    return {
      href: `/${s.urlPrefix}-${city.slug}`,
      label: `${s.label} ${city.name}`,
      blurb: SERVICE_BLURB[k],
    };
  });

  const nearbyLinks = city.nearby
    .map((nearbySlug) => getCityBySlug(nearbySlug))
    .filter((c): c is City => Boolean(c))
    .map((c) => ({
      href: `/${service.urlPrefix}-${c.slug}`,
      label: `${service.label} ${c.name}`,
    }));

  return {
    slug,
    canonical: `/${slug}`,
    metaTitle,
    metaDescription,
    h1: `${service.h1Lead} în ${city.name}`,
    subtitle: buildSubtitle(city, service),
    intro,
    digitalNote: city.digitalNote,
    industryBlocks,
    includes: service.includes,
    areasIntro: buildAreasIntro(city, service),
    areas: city.areas,
    faq: buildFaq(city, service),
    priceFrom: service.priceFrom,
    priceFromRON: service.priceFromRON,
    delivery: service.delivery,
    parentHref: `/servicii/${service.parentSlug}`,
    parentLabel: PARENT_LABEL[key],
    siblingServices,
    nearbyLinks,
  };
}

function buildSubtitle(city: City, service: LocalService): string {
  switch (service.key) {
    case "site":
      return `Site-uri de prezentare rapide, optimizate pentru căutările din ${city.name}, livrate în ${service.delivery}. De la ${service.priceFrom}, cu cod sursă predat integral.`;
    case "magazin":
      return `Magazine online complete pentru firme din ${city.name} — produse, plăți, curierat și facturare automată. De la ${service.priceFrom}.`;
    case "automatizari":
      return `Scoatem munca repetitivă din firma ta din ${city.name}. Începem cu un audit gratuit al proceselor, apoi automatizăm ce se poate automatiza. De la ${service.priceFrom}.`;
  }
}

function buildAreasIntro(city: City, service: LocalService): string {
  const verb =
    service.key === "automatizari"
      ? "Automatizăm procese"
      : service.key === "magazin"
        ? "Construim magazine online"
        : "Construim site-uri";
  return `${verb} pentru firme din ${city.name} și din localitățile din jur. Lucrăm integral la distanță, cu apeluri video și livrare pe etape, așa că distanța nu schimbă nici prețul, nici termenul:`;
}

// ── FAQ — întrebările pe care le pune efectiv un client local ─────────────────

function buildFaq(city: City, service: LocalService): LocalFaq[] {
  const isHome = city.county === "Constanța";
  const industry = INDUSTRIES[city.industries[0]].label;

  const common: LocalFaq[] = [
    {
      question: isHome
        ? `Ne putem întâlni personal în ${city.name}?`
        : `Lucrați cu firme din ${city.name} deși sunteți din Constanța?`,
      answer: isHome
        ? `Da. Suntem din Constanța, deci o întâlnire în ${city.name} sau în împrejurimi se poate aranja ușor. În practică, majoritatea proiectelor merg mai repede pe apeluri video și pe un document de lucru comun, dar dacă preferi discuția față în față, o facem.`
        : `Da, și este modul nostru obișnuit de lucru. Suntem înregistrați în Constanța, dar proiectele se derulează integral online: apel video la început, un document de lucru comun, livrare pe etape pe care o vezi în timp real. Am livrat astfel proiecte pentru clienți din mai multe județe, iar prețul nu diferă în funcție de oraș.`,
    },
    {
      question: `În cât timp este gata?`,
      answer: `Termenul standard este ${service.delivery}, din momentul în care avem conținutul (texte, poze, date despre firmă). Dacă nu ai conținutul pregătit, te ajutăm să îl structurezi — acesta este, de obicei, singurul lucru care întârzie un proiect.`,
    },
    {
      question: `Cine deține ${service.key === "automatizari" ? "automatizările" : "site-ul"} după livrare?`,
      answer: `Tu, integral. Predăm codul sursă, conturile și accesele. Nu te legăm de un abonament obligatoriu ca să poți folosi ceea ce ai plătit și poți muta proiectul la orice alt dezvoltator, oricând.`,
    },
  ];

  if (service.key === "site") {
    return [
      {
        question: `Cât costă un site de prezentare în ${city.name}?`,
        answer: `Un site de prezentare pornește de la 249 EUR (aproximativ 1.245 RON) pentru varianta cu 1–4 pagini, și de la 499 EUR pentru varianta de 5–10 pagini. Prețul este același indiferent de oraș — nu percepem un tarif diferit pentru ${city.name} față de Constanța. În preț intră designul, implementarea, optimizarea SEO de bază, SSL și predarea codului sursă.`,
      },
      ...common,
      {
        question: `Faceți și optimizare SEO pentru căutările din ${city.name}?`,
        answer: `Da, optimizarea SEO tehnică este inclusă: structură corectă de titluri, meta descrieri, sitemap, date structurate și pagini separate pe fiecare serviciu — inclusiv varianta locală, cu ${city.name} în titlu și în conținut. Configurăm și Google Search Console, ca să vezi pe ce căutări apari. Promovarea plătită și link building-ul sunt servicii separate.`,
      },
      {
        question: `Lucrați cu firme din ${industry}?`,
        answer: `Da. ${capitalize(city.digitalNote)} Structurăm site-ul în funcție de cum caută efectiv clienții tăi, nu după un șablon general.`,
      },
    ];
  }

  if (service.key === "magazin") {
    return [
      {
        question: `Cât costă un magazin online în ${city.name}?`,
        answer: `Un magazin online complet pornește de la 800 EUR (aproximativ 4.000 RON). Prețul final depinde de numărul de produse, de câte variante are fiecare produs, de integrările cerute (plăți, curierat, facturare, ERP) și de cât de complexe sunt regulile de livrare. Îți dăm o ofertă fixă înainte să începem, nu un tarif orar.`,
      },
      ...common,
      {
        question: `Ce comisioane plătesc pe fiecare vânzare?`,
        answer: `Către noi, niciunul — magazinul este al tău. Singurele costuri recurente sunt procesatorul de plăți (comisionul lui pe tranzacție), hostingul și, opțional, mentenanța. Spre deosebire de marketplace-uri, unde comisionul poate ajunge la 10–20% din valoarea comenzii, aici păstrezi marja.`,
      },
      {
        question: `Pot vinde în toată țara, nu doar în ${city.name}?`,
        answer: `Da. Magazinul nu are limitare geografică: setezi zone și tarife de livrare cum vrei — livrare locală în ${city.name} cu tarif redus sau gratuit, curierat național pentru restul țării, eventual ridicare personală. Multe afaceri locale descoperă că majoritatea comenzilor vin din afara județului.`,
      },
    ];
  }

  return [
    {
      question: `Cât costă o automatizare pentru o firmă din ${city.name}?`,
      answer: `O automatizare simplă (un flux între două aplicații, un raport automat, o notificare) pornește de la 100 EUR. Proiectele mai complexe — procesare de documente, integrare cu ERP, asistenți AI pe datele firmei — se estimează după audit. Auditul proceselor este gratuit și se termină cu o listă concretă de ce merită automatizat și cât timp economisește fiecare.`,
    },
    ...common,
    {
      question: `Ce procese se automatizează cel mai des în firme din ${city.name}?`,
      answer: `În ${city.name}, cele mai frecvente sunt legate de ${industry}: ${INDUSTRIES[city.industries[0]].automatizari}. În general, orice proces în care cineva copiază date dintr-un loc în altul, trimite același email de zeci de ori sau completează manual același document este candidat.`,
    },
    {
      question: `Trebuie să schimb programele pe care le folosesc deja?`,
      answer: `Nu. Automatizările se construiesc peste ce ai: email, Excel sau Google Sheets, programul de facturare, CRM-ul, magazinul online, WhatsApp. Le conectăm între ele prin API sau prin fluxuri n8n. Înlocuim un program doar dacă chiar acela este problema, și atunci ți-o spunem direct.`,
    },
  ];
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
