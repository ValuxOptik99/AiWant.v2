// Data model + pricing logic for the public Project Configurator (/configurator).
// onboardingGoal / budgetRange / timeline values MUST match the exact slugs used
// by GOALS / BUDGET_OPTIONS / TIMELINE_OPTIONS in app/portal/onboarding/page.tsx.

export type ServiceKey =
  | "site-prezentare"
  | "website-complet"
  | "aplicatie-web"
  | "ecommerce"
  | "automatizari";

export interface ConfigService {
  key: ServiceKey;
  icon: string;
  title: string;
  desc: string;
  basePrice: number;
  /** Termen în ZILE LUCRĂTOARE, aliniat cu ce scrie pe paginile de servicii.
   *  Săptămânile întregi nu puteau reprezenta „2-3 zile". */
  baseDaysLow: number;
  baseDaysHigh: number;
  onboardingGoal: string;
}

export interface ConfigFeature {
  key: string;
  label: string;
  price: number;
  /** Zile lucrătoare adăugate la termen. */
  days: number;
}

export const CONFIG_SERVICES: ConfigService[] = [
  {
    key: "site-prezentare",
    icon: "Globe",
    title: "Site de Prezentare",
    desc: "Cartea ta de vizită digitală",
    basePrice: 249,
    baseDaysLow: 2,
    baseDaysHigh: 3,
    onboardingGoal: "site-nou",
  },
  {
    key: "website-complet",
    icon: "Layers",
    title: "Website Complet",
    desc: "5-10 pagini, blog inclus",
    basePrice: 399,
    baseDaysLow: 4,
    baseDaysHigh: 5,
    onboardingGoal: "site-nou",
  },
  {
    key: "aplicatie-web",
    icon: "LayoutDashboard",
    title: "Aplicație Web",
    desc: "Dashboard, booking, CRM",
    basePrice: 799,
    baseDaysLow: 15,
    baseDaysHigh: 25,
    onboardingGoal: "aplicatie-custom",
  },
  {
    key: "ecommerce",
    icon: "ShoppingCart",
    title: "Magazin Online",
    desc: "Vinde non-stop, fără comisioane",
    basePrice: 699,
    baseDaysLow: 10,
    baseDaysHigh: 20,
    onboardingGoal: "magazin-online",
  },
  {
    key: "automatizari",
    icon: "Bot",
    title: "Automatizări & AI",
    desc: "Elimină munca repetitivă",
    basePrice: 300,
    baseDaysLow: 5,
    baseDaysHigh: 15,
    onboardingGoal: "automatizari",
  },
];

export const CONFIG_FEATURES: Record<ServiceKey, ConfigFeature[]> = {
  "site-prezentare": [
    { key: "blog", label: "Blog / secțiune articole", price: 150, days: 2 },
    { key: "multilang", label: "Site bilingv (RO + EN)", price: 200, days: 3 },
    { key: "booking", label: "Formular programări", price: 150, days: 2 },
    { key: "seo-plus", label: "SEO avansat + Google Business", price: 150, days: 1 },
    { key: "copywriting", label: "Texte scrise de noi", price: 200, days: 3 },
  ],
  // Blogul e deja inclus în cele 399 EUR, deci nu apare aici ca extra.
  "website-complet": [
    { key: "multilang", label: "Site bilingv (RO + EN)", price: 250, days: 4 },
    { key: "booking", label: "Formular programări", price: 150, days: 2 },
    { key: "seo-plus", label: "SEO avansat + Google Business", price: 150, days: 1 },
    { key: "copywriting", label: "Texte scrise de noi", price: 250, days: 4 },
    { key: "extra-pages", label: "Pagini suplimentare (peste 10)", price: 150, days: 2 },
  ],
  "aplicatie-web": [
    { key: "auth", label: "Conturi utilizatori & roluri", price: 300, days: 4 },
    { key: "admin-panel", label: "Panou de administrare", price: 250, days: 4 },
    { key: "notifications", label: "Notificări email/SMS", price: 200, days: 2 },
    { key: "reports", label: "Rapoarte & statistici", price: 250, days: 4 },
    { key: "integrations", label: "Integrare cu alte sisteme (API)", price: 300, days: 4 },
  ],
  ecommerce: [
    { key: "payments", label: "Plată cu cardul online", price: 250, days: 2 },
    { key: "courier", label: "Integrare curier (AWB automat)", price: 200, days: 2 },
    { key: "invoicing", label: "Facturare automată", price: 200, days: 2 },
    { key: "stock", label: "Gestiune stocuri avansată", price: 250, days: 3 },
    { key: "multilang", label: "Magazin bilingv", price: 250, days: 3 },
  ],
  automatizari: [
    { key: "email-flows", label: "Procesare automată email-uri", price: 200, days: 2 },
    { key: "docs", label: "Generare automată documente", price: 250, days: 3 },
    { key: "chatbot", label: "Chatbot AI pentru clienți", price: 400, days: 5 },
    { key: "data-sync", label: "Sincronizare între aplicații", price: 200, days: 2 },
    { key: "reports-auto", label: "Rapoarte automate periodice", price: 150, days: 2 },
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
  daysLow: number;
  daysHigh: number;
  /** Termenul gata formatat — zile sub două săptămâni, săptămâni peste. */
  durationLabel: string;
}

/**
 * Sub 10 zile lucrătoare afișăm zile (altfel „2-3 zile" ar deveni „1 săptămână"
 * și n-ar mai corespunde cu ce scrie pe paginile de servicii). Peste, rotunjim
 * la săptămâni, păstrând mereu un interval, nu o valoare unică.
 */
export function formatDuration(daysLow: number, daysHigh: number): string {
  if (daysHigh <= 0) return "";
  if (daysHigh <= 10) {
    return daysLow === daysHigh
      ? `${daysLow} zile lucrătoare`
      : `${daysLow}–${daysHigh} zile lucrătoare`;
  }
  const weeksLow = Math.max(1, Math.round(daysLow / 5));
  const weeksHigh = Math.max(weeksLow + 1, Math.round(daysHigh / 5));
  return `${weeksLow}–${weeksHigh} săptămâni`;
}

export function computeEstimate(serviceKey: ServiceKey | null, featureKeys: string[]): Estimate {
  if (!serviceKey)
    return { total: 0, low: 0, high: 0, daysLow: 0, daysHigh: 0, durationLabel: "" };
  const service = getService(serviceKey);
  const features = (CONFIG_FEATURES[serviceKey] ?? []).filter((f) => featureKeys.includes(f.key));
  const total = service.basePrice + features.reduce((s, f) => s + f.price, 0);
  const extraDays = features.reduce((sum, f) => sum + f.days, 0);
  const daysLow = service.baseDaysLow + extraDays;
  const daysHigh = service.baseDaysHigh + extraDays;
  return {
    total,
    low: total,
    high: Math.round((total * 1.35) / 50) * 50,
    daysLow,
    daysHigh,
    durationLabel: formatDuration(daysLow, daysHigh),
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
