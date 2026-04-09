"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Palette,
  Megaphone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SERVICES_DATA } from "@/lib/services-data";
import ScrollReveal from "@/components/ScrollReveal";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Palette,
  Megaphone,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const Icon: LucideIcon = ICON_MAP[service.icon] || Globe;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const slug = SERVICES_DATA[index]?.slug ?? "#";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      style={{
        background: "#fff",
        border: "1px solid var(--color-border-warm)",
      }}
    >
      {/* Top accent bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ background: "var(--color-gold)" }}
      />

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(212,168,67,0.1)" }}
        >
          <Icon size={22} strokeWidth={1.8} style={{ color: "var(--color-gold)" }} />
        </div>

        <div>
          <h3
            className="font-bold text-lg mb-2"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {service.description}
          </p>
        </div>

        <Link
          href={`/servicii/${slug}`}
          className="mt-auto flex items-center gap-1 text-sm font-medium group/btn focus-visible:outline-none w-fit"
          style={{ color: "var(--color-gold)" }}
        >
          Află mai mult
          <ArrowRight
            size={14}
            className="transform group-hover/btn:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicii" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal className="text-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: "1px solid var(--color-border-warm)",
              color: "var(--color-gold)",
              background: "rgba(212,168,67,0.06)",
            }}
          >
            Soluțiile noastre
          </span>
        </ScrollReveal>

        <ScrollReveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Infrastructura digitală care{" "}
            <span style={{ color: "var(--color-gold)" }}>scalează afacerea ta</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Nu vindem tehnologie — construim sisteme digitale care reduc costurile
            operaționale, elimină erorile și eliberează echipa ta pentru muncă cu
            valoare reală.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
