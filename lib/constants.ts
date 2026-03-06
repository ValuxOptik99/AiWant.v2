// All static content, service data, portfolio data, and pricing data

export const NAV_LINKS = [
  { label: "Servicii", href: "#servicii" },
  { label: "Portofoliu", href: "#portofoliu" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Despre noi", href: "#despre" },
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
    title: "Site-uri de Prezentare",
    description:
      "Landing page-uri și site-uri complete care convertesc vizitatorii în clienți. Design modern, optimizat pentru mobil și SEO.",
    link: "#contact",
  },
  {
    icon: "LayoutDashboard",
    title: "Aplicații Web Custom",
    description:
      "Dashboard-uri, sisteme de booking, CRM-uri și aplicații personalizate construite exact pe nevoile afacerii tale.",
    link: "#contact",
  },
  {
    icon: "ShoppingCart",
    title: "Magazine Online",
    description:
      "Platforme e-commerce complete cu gestionare produse, integrare plăți și administrare simplă a comenzilor.",
    link: "#contact",
  },
  {
    icon: "Bot",
    title: "Soluții AI & Automatizări",
    description:
      "Chatboți inteligenți, automatizări de workflow cu n8n, integrări API și procesare automată a datelor.",
    link: "#contact",
  },
  {
    icon: "Palette",
    title: "Design UI/UX",
    description:
      "Interfețe intuitive și atractive, gândite pentru experiența utilizatorului. De la wireframe la produs final.",
    link: "#contact",
  },
  {
    icon: "Megaphone",
    title: "Social Media & Marketing",
    description:
      "Strategii de conținut, management social media și campanii de creștere pentru prezența ta online.",
    link: "#contact",
  },
];

export const PORTFOLIO = [
  {
    name: "avocatneagumaria.ro",
    tag: "Site Prezentare",
    description:
      "Site de prezentare profesional pentru un cabinet de avocatură din Constanța. Design elegant, formular de contact, optimizat SEO.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    image: "/images/avocatnegumaria.jpeg",
    link: "#",
  },
  {
    name: "Holding Space — Pet Farewell Rituals",
    tag: "Aplicație Web",
    description:
      "Platformă pentru ritualuri de despărțire de animăluțe de companie. Landing page emoțional cu sistem de pre-comenzi și panou de administrare.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: "/images/holdingspace.jpg",
    link: "#",
  },
  {
    name: "AeroGym Constanța",
    tag: "Social Media & Marketing",
    description:
      "Strategie de conținut și management social media pentru un program de gimnastică aerobică și multisport.",
    tech: ["Instagram", "TikTok", "Canva", "Content Strategy"],
    image: "/images/aerogym.jpg",
    link: "#",
  },
  {
    name: "Automatizări Workflow",
    tag: "AI & Automatizări",
    description:
      "Pipeline-uri automatizate de procesare documente, sumarizare email-uri și integrări GitHub-to-docx pentru clienți corporate.",
    tech: ["n8n", "API Integrations", "Node.js"],
    image: "/images/n8n.jpeg",
    link: "#",
  },
];

export const PRICING = [
  {
    icon: "Globe",
    title: "Site Prezentare",
    price: "de la 250 EUR",
    subtitle: "(~1.250 RON)",
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
    icon: "LayoutDashboard",
    title: "Aplicație Web",
    price: "de la 800 EUR",
    subtitle: "(~4.000 RON)",
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
  "Site prezentare",
  "Aplicație web",
  "E-commerce",
  "AI & Automatizări",
  "Altceva",
];

export const WHATSAPP_NUMBER = "40749997163";
export const WHATSAPP_MESSAGE =
  "Bună! Sunt interesat de serviciile de dezvoltare web.";
