"use client";

import CountUp from "./CountUp";
import { STATS } from "@/lib/constants";

export default function SocialProofBar() {
  return (
    <section style={{ background: "var(--color-slate-deep)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-4xl font-bold tabular-nums"
                style={{
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
