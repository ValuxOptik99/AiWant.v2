// All static content, service data, portfolio data, and pricing data

export const SITE_URL = "https://aiwant.ro";

export const NAV_LINKS = [
  { label: "Servicii", href: "#servicii" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Despre noi", href: "#despre" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 10, suffix: "+", label: "Ani experiență" },
  { value: 10, suffix: "+", label: "Proiecte livrate" },
  { value: 100, suffix: "%", label: "Cod sursă predat" },
  { value: 24, suffix: "h", label: "Timp mediu de răspuns" },
];

export const SERVICES = [
  {
    icon: "Globe",
    title: "Platforme Digitale High-Conversion",
    description:
      "Site-uri și landing page-uri construite pentru a converti vizitatorii în clienți. Arhitectură rapidă, UX centrat pe vânzare și optimizare SEO care aduce trafic calificat.",
    link: "#contact",
  },
  {
    icon: "LayoutDashboard",
    title: "Infrastructură Business Custom",
    description:
      "Dashboard-uri, CRM-uri, sisteme de booking și aplicații personalizate care înlocuiesc foile Excel și procesele fragmentate cu o infrastructură digitală scalabilă.",
    link: "#contact",
  },
  {
    icon: "ShoppingCart",
    title: "Platforme E-commerce Scalabile",
    description:
      "Magazine online complete cu gestionare produse, integrare plăți și panou de administrare — construite să crească odată cu afacerea ta, fără să frâneze operațiunile.",
    link: "#contact",
  },
  {
    icon: "Bot",
    title: "Automatizare & Optimizare Workflow",
    description:
      "Eliminăm sarcinile repetitive prin fluxuri automate cu n8n, integrări API și asistenți AI. Echipa ta se concentrează pe muncă cu valoare reală, nu pe copy-paste.",
    link: "#contact",
  },
  {
    icon: "Palette",
    title: "Design UI/UX Strategic",
    description:
      "Interfețe gândite din perspectiva utilizatorului final: clare, rapide și orientate spre acțiune. De la wireframe la produs lansat, fiecare ecran are un scop.",
    link: "#contact",
  },
  {
    icon: "Megaphone",
    title: "Strategie & Prezență Digitală",
    description:
      "Conținut, management social media și campanii de creștere aliniate cu obiectivele de business. Nu postări de dragul postărilor — ci vizibilitate care aduce clienți.",
    link: "#contact",
  },
];

export const PORTFOLIO = [
  {
    name: "DANI Cadastru",
    tag: "Platformă Digitală",
    challenge:
      "Birou de cadastru și topografie din Mangalia fără prezență online — clienții găseau concurența pe Google, iar cererile de ofertă veneau exclusiv telefonic, greu de gestionat.",
    solution:
      "Platformă completă cu pagini de servicii dedicate (cadastru, intabulare, topografie), hub de întrebări frecvente, blog, pagini SEO locale per localitate, secțiune de recenzii Google și panou de administrare pentru conținut.",
    impact: [
      { metric: "Pagina 1", label: "Google pentru căutări locale de cadastru" },
      { metric: "24/7", label: "preluare cereri prin formular și WhatsApp" },
      { metric: "100%", label: "gestionare conținut fără intervenție tehnică" },
    ],
    tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Admin Panel"],
    image: "/images/danicadastru.jpg",
    link: "https://danicadastru.ro",
  },
  {
    name: "Vila Miruna — mirunavalentin.ro",
    tag: "Platformă Digitală",
    challenge:
      "Vilă de vacanță din Jupiter, pe litoral, dependentă de platformele de booking cu comisioane mari — fără site propriu, fără vizibilitate directă în căutări și fără canal de rezervare fără intermediari.",
    solution:
      "Site de prezentare cu arhitectură SEO dedicată sejururilor pe litoral, blog bilingv (RO/EN) cu ghiduri de vacanță, hartă interactivă Google Maps cu atracțiile din zonă și canal direct de rezervare prin WhatsApp.",
    impact: [
      { metric: "0%", label: "comision pe rezervările directe" },
      { metric: "RO+EN", label: "vizibilitate pentru turiști români și străini" },
      { metric: "Pagina 1", label: "Google pentru căutări de cazare în Jupiter" },
    ],
    tech: ["Next.js", "Tailwind CSS", "MDX", "Google Maps API"],
    image: "/images/mirunavalentin.jpg",
    link: "https://mirunavalentin.ro",
  },
  {
    name: "avocatneagumaria.ro",
    tag: "Platformă Digitală",
    challenge: "Cabinet de avocatură fără prezență digitală — clienții nu găseau serviciile online, iar contactarea era greoaie și informală.",
    solution: "Site profesional cu design de autoritate, pagini de servicii structurate și formular de contact direct integrat.",
    impact: [
      { metric: "+200%", label: "vizibilitate în căutări locale" },
      { metric: "0→∞", label: "prezență online de la zero la pagina 1 Google" },
    ],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    image: "/images/avocatnegumaria.jpeg",
    link: "#",
  },
  {
    name: "Holding Space — Pet Farewell Rituals",
    tag: "Infrastructură Business",
    challenge: "Expunere dezavantajoasă prin social media cu conținut slab, fără o direcție clară de business și fără o platformă de gestionare a cererilor clienților.",
    solution: "Site custom cu identitate vizuală coerentă și portal dedicat administratorului pentru gestionarea comenzilor și cererilor.",
    impact: [
      { metric: "+60%", label: "creștere expunere organică" },
      { metric: "+30%", label: "creștere vânzări" },
      { metric: "2–3h/zi", label: "economie prin gestionare pe platformă" },
    ],
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Admin Portal"],
    image: "/images/holdingspace.jpg",
    link: "#",
  },
  {
    name: "AeroGym Constanța",
    tag: "Automatizare & Workflow",
    challenge: "Pierdeau 20 de ore pe săptămână introducând manual datele membrilor, abonamentele și prezențele în foi Excel separate.",
    solution: "Platformă custom de gestionare a abonamentelor cu dashboard centralizat, check-in automatizat și rapoarte în timp real.",
    impact: [
      { metric: "−40%", label: "reducere erori operaționale" },
      { metric: "2 zile/săpt.", label: "timp recuperat din sarcini manuale" },
      { metric: "20h", label: "ore economisite săptămânal" },
    ],
    tech: ["Next.js", "PostgreSQL", "n8n", "Tailwind CSS"],
    image: "/images/aerogym.jpg",
    link: "#",
  },
  {
    name: "Automatizări Workflow Corporate",
    tag: "AI & Automatizări",
    challenge: "Procese de generare documente și raportare executate manual de echipă — ore pierdute pe sarcini repetitive fără valoare adăugată.",
    solution: "Pipeline-uri automate de procesare documente, sumarizare email-uri și integrări GitHub-to-docx cu notificări în timp real.",
    impact: [
      { metric: "−70%", label: "timp alocat generării documentelor" },
      { metric: "0 erori", label: "în procesul de livrare documente" },
    ],
    tech: ["n8n", "API Integrations", "Node.js", "OpenAI"],
    image: "/images/n8n.jpeg",
    link: "#",
  },
];

export const PRICING = [
  {
    icon: "LayoutDashboard",
    title: "Aplicație Web",
    price: "de la 800 EUR",
    subtitle: "(~4.000 RON)",
    monthlyFrom: "sau de la ~67 EUR/lună",
    featured: true,
    badge: "Cel mai popular",
    features: [
      "Dashboard, booking, CRM sau aplicație custom",
      "Panou de administrare",
      "Bază de date dedicată",
      "Integrări API",
      "Hosting & administrare inclusă",
    ],
  },
  {
    icon: "ShoppingCart",
    title: "E-commerce",
    price: "de la 800 EUR",
    subtitle: "(~4.000 RON)",
    monthlyFrom: "sau de la ~67 EUR/lună",
    featured: false,
    features: [
      "Magazin online complet",
      "Gestionare produse și comenzi",
      "Integrare procesor plăți",
      "Design personalizat",
      "Panou de administrare",
    ],
  },
  {
    icon: "Globe",
    title: "Site Prezentare",
    price: "de la 250 EUR",
    subtitle: "(~1.250 RON)",
    monthlyFrom: "sau de la ~21 EUR/lună",
    featured: false,
    features: [
      "Landing page sau site complet (1-10 pagini)",
      "Design modern, responsive",
      "Optimizare SEO de bază",
      "Formular de contact",
      "Certificat SSL inclus",
    ],
  },
  {
    icon: "Bot",
    title: "AI & Automatizări",
    price: "de la 100 EUR",
    subtitle: "(~500 RON)",
    featured: false,
    features: [
      "Integrări API și automatizări n8n",
      "Chatboți și asistenți AI",
      "Procesare automată documente",
      "Workflow-uri personalizate",
      "Mentenanță și suport",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Descoperire",
    description:
      "Înțelegem afacerea ta, obiectivele și publicul țintă. Discutăm ce funcționează și ce ai nevoie.",
  },
  {
    number: "02",
    title: "Planificare & Design",
    description:
      "Creăm structura, wireframe-urile și designul vizual. Validăm împreună fiecare pas.",
  },
  {
    number: "03",
    title: "Dezvoltare",
    description:
      "Construim aplicația cu tehnologii moderne. Testăm riguros pe toate dispozitivele.",
  },
  {
    number: "04",
    title: "Lansare & Suport",
    description:
      "Publicăm, monitorizăm și oferim suport continuu. Suntem alături de tine post-lansare.",
  },
];

export const PROJECT_TYPES = [
  "Automatizare procese & workflow",
  "Platformă digitală / site web",
  "Infrastructură business custom",
  "E-commerce scalabil",
  "Strategie & prezență digitală",
  "Nu știu încă — vreau un audit",
];

export const WHATSAPP_NUMBER = "40749997163";
export const WHATSAPP_MESSAGE =
  "Bună! Aș dori un audit gratuit al proceselor mele de business. Când putem discuta?";
