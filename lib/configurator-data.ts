// Data model + pricing logic for the public Project Configurator (/configurator).
// onboardingGoal / budgetRange / timeline values MUST match the exact slugs used
// by GOALS / BUDGET_OPTIONS / TIMELINE_OPTIONS in app/portal/onboarding/page.tsx.

export type ServiceKey = "site-prezentare" | "aplicatie-web" | "ecommerce" | "automatizari";

export interface ConfigService {
  key: ServiceKey;
  icon: string;
  title: string;
  desc: string;
  basePrice: number;
  baseWeeks: number;
  onboardingGoal: string;
}

export interface ConfigFeature {
  key: string;
  label: string;
  price: number;
  weeks: number;
}

export const CONFIG_SERVICES: ConfigService[] = [
  {
    key: "site-prezentare",
    icon: "Globe",
    title: "Site de Prezentare",
    desc: "Cartea ta de vizită digitală",
    basePrice: 350,
    baseWeeks: 3,
    onboardingGoal: "site-nou",
  },
  {
    key: "aplicatie-web",
    icon: "LayoutDashboard",
    title: "Aplicație Web",
    desc: "Dashboard, booking, CRM",
    basePrice: 800,
    baseWeeks: 6,
    onboardingGoal: "aplicatie-custom",
  },
  {
    key: "ecommerce",
    icon: "ShoppingCart",
    title: "Magazin Online",
    desc: "Vinde non-stop, fără comisioane",
    basePrice: 800,
    baseWeeks: 7,
    onboardingGoal: "magazin-online",
  },
  {
    key: "automatizari",
    icon: "Bot",
    title: "Automatizări & AI",
    desc: "Elimină munca repetitivă",
    basePrice: 300,
    baseWeeks: 2,
    onboardingGoal: "automatizari",
  },
];

export const CONFIG_FEATURES: Record<ServiceKey, ConfigFeature[]> = {
  "site-prezentare": [
    { key: "blog", label: "Blog / secțiune articole", price: 150, weeks: 1 },
    { key: "multilang", label: "Site bilingv (RO + EN)", price: 200, weeks: 1 },
    { key: "booking", label: "Formular programări", price: 150, weeks: 1 },
    { key: "seo-plus", label: "SEO avansat + Google Business", price: 150, weeks: 0 },
    { key: "copywriting", label: "Texte scrise de noi", price: 200, weeks: 1 },
  ],
  "aplicatie-web": [
    { key: "auth", label: "Conturi utilizatori & roluri", price: 300, weeks: 1 },
    { key: "admin-panel", label: "Panou de administrare", price: 250, weeks: 1 },
    { key: "notifications", label: "Notificări email/SMS", price: 200, weeks: 1 },
    { key: "reports", label: "Rapoarte & statistici", price: 250, weeks: 1 },
    { key: "integrations", label: "Integrare cu alte sisteme (API)", price: 300, weeks: 1 },
  ],
  ecommerce: [
    { key: "payments", label: "Plată cu cardul online", price: 250, weeks: 1 },
    { key: "courier", label: "Integrare curier (AWB automat)", price: 200, weeks: 1 },
    { key: "invoicing", label: "Facturare automată", price: 200, weeks: 1 },
    { key: "stock", label: "Gestiune stocuri avansată", price: 250, weeks: 1 },
    { key: "multilang", label: "Magazin bilingv", price: 250, weeks: 1 },
  ],
  automatizari: [
    { key: "email-flows", label: "Procesare automată email-uri", price: 200, weeks: 1 },
    { key: "docs", label: "Generare automată documente", price: 250, weeks: 1 },
    { key: "chatbot", label: "Chatbot AI pentru clienți", price: 400, weeks: 2 },
    { key: "data-sync", label: "Sincronizare între aplicații", price: 200, weeks: 1 },
    { key: "reports-auto", label: "Rapoarte automate periodice", price: 150, weeks: 1 },
  ],
};

// Timeline pill options — value must match TIMELINE_OPTIONS in app/portal/onboarding/page.tsx exactly.
// Note: onboarding has no "flexibil" slug — "Flexibil" maps to the wizard's "nu-urgent" value.
export const CONFIG_TIMELINE_OPTIONS = [
  { value: "urgent", label: "Cât mai repede" },
  { value: "1-2-luni", label: "1-2 luni" },
  { value: "2-3-luni", label: "2-3 luni" },
  { value: "nu-urgent", label: "Flexibil" },
];

export function getService(key: ServiceKey): ConfigService {
  const service = CONFIG_SERVICES.find((s) => s.key === key);
  if (!service) throw new Error(`Unknown service key: ${key}`);
  return service;
}

export function getFeatureLabels(serviceKey: ServiceKey, featureKeys: string[]): string[] {
  const all = CONFIG_FEATURES[serviceKey] ?? [];
  return featureKeys
    .map((k) => all.find((f) => f.key === k)?.label)
    .filter((l): l is string => Boolean(l));
}

export interface Estimate {
  total: number;
  low: number;
  high: number;
  weeksLow: number;
  weeksHigh: number;
}

export function computeEstimate(serviceKey: ServiceKey | null, featureKeys: string[]): Estimate {
  if (!serviceKey) return { total: 0, low: 0, high: 0, weeksLow: 0, weeksHigh: 0 };
  const service = getService(serviceKey);
  const features = (CONFIG_FEATURES[serviceKey] ?? []).filter((f) => featureKeys.includes(f.key));
  const total = service.basePrice + features.reduce((s, f) => s + f.price, 0);
  const weeksLow = service.baseWeeks + features.reduce((s, f) => s + f.weeks, 0);
  return {
    total,
    low: total,
    high: Math.round((total * 1.35) / 50) * 50,
    weeksLow,
    weeksHigh: weeksLow + 2,
  };
}

// Maps a project's estimated EUR total to the onboarding wizard's exact budgetRange slug.
export function mapEstimateToBudgetBucket(total: number): string {
  if (total < 500) return "sub-500";
  if (total < 1000) return "500-1000";
  if (total < 2000) return "1000-2000";
  if (total < 5000) return "2000-5000";
  return "5000+";
}
