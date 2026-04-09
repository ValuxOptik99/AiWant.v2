"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export default function RoiCalculator() {
  const [ore, setOre] = useState(10);
  const [cost, setCost] = useState(45);
  const [reducere, setReducere] = useState(85);

  const costuriBrute = ore * 4.33 * cost;
  const economie = Math.round(costuriBrute * (reducere / 100));
  const economieAn = economie * 12;
  const economieEur = Math.round(economie / 5);

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "var(--color-slate-deep)", border: "1px solid rgba(212,168,67,0.2)" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Calculator size={14} style={{ color: "var(--color-gold)" }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
        >
          Calculator rapid ROI
        </span>
      </div>

      <div className="space-y-4">
        {/* Row: Ore */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4" style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
          <span className="text-sm flex-1 min-w-40" style={{ color: "rgba(170,190,210,0.85)" }}>
            Ore/săptămână alocate procesului
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <input
              type="number"
              value={ore}
              min={1} max={80}
              onChange={(e) => setOre(parseFloat(e.target.value) || 0)}
              className="rounded-lg text-right text-sm w-20 px-3 py-1.5 focus:outline-none"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            />
            <span className="text-xs w-8" style={{ color: "var(--color-text-muted)" }}>ore</span>
          </div>
        </div>

        {/* Row: Cost */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4" style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
          <span className="text-sm flex-1 min-w-40" style={{ color: "rgba(170,190,210,0.85)" }}>
            Cost orar angajat (brut + overhead)
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <input
              type="number"
              value={cost}
              min={10} max={300}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              className="rounded-lg text-right text-sm w-20 px-3 py-1.5 focus:outline-none"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            />
            <span className="text-xs w-8" style={{ color: "var(--color-text-muted)" }}>RON/h</span>
          </div>
        </div>

        {/* Row: Reducere */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4" style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
          <span className="text-sm flex-1 min-w-40" style={{ color: "rgba(170,190,210,0.85)" }}>
            Reducere estimată prin automatizare
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <input
              type="number"
              value={reducere}
              min={50} max={99}
              onChange={(e) => setReducere(parseFloat(e.target.value) || 0)}
              className="rounded-lg text-right text-sm w-20 px-3 py-1.5 focus:outline-none"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            />
            <span className="text-xs w-8" style={{ color: "var(--color-text-muted)" }}>%</span>
          </div>
        </div>

        {/* Result */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
          <div>
            <p className="text-sm mb-1" style={{ color: "rgba(170,190,210,0.75)" }}>Economie lunară estimată</p>
            <p
              className="text-3xl font-black"
              style={{ color: "#5DCAA5", fontFamily: "var(--font-display)" }}
            >
              {economie.toLocaleString("ro-RO")} RON
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
              ≈ {economieEur.toLocaleString("ro-RO")} EUR / lună · {economieAn.toLocaleString("ro-RO")} RON / an
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/#contact"
        className="mt-5 flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-200"
        style={{
          background: "rgba(212,168,67,0.06)",
          border: "1px solid rgba(212,168,67,0.2)",
          color: "var(--color-gold)",
        }}
      >
        Calculează potențialul tău exact împreună cu AiWANT →
      </Link>
    </div>
  );
}
