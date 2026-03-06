// Helper utilities

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToSection(href: string): void {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (!element) return;
  const navbar = document.querySelector("nav");
  const offset = navbar ? navbar.clientHeight : 80;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
