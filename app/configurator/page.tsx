"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import {
  CONFIG_TIMELINE_OPTIONS,
  computeEstimate,
  getFeatureLabels,
  getService,
  mapEstimateToBudgetBucket,
  type ServiceKey,
} from "@/lib/configurator-data";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import SummaryPanel from "@/components/configurator/SummaryPanel";
import StepService from "@/components/configurator/StepService";
import StepFeatures from "@/components/configurator/StepFeatures";
import StepDetails from "@/components/configurator/StepDetails";
import StepReview from "@/components/configurator/StepReview";

const STORAGE_KEY = "aiwant_configurator";
const DRAFT_KEY = "aiwant_onboarding_draft";

type ConfiguratorState = {
  service: ServiceKey | null;
  features: string[];
  timeline: string;
  projectName: string;
  description: string;
  step: number;
};

const INITIAL_STATE: ConfiguratorState = {
  service: null,
  features: [],
  timeline: "",
  projectName: "",
  description: "",
  step: 0,
};

function loadState(): ConfiguratorState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...INITIAL_STATE, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

function saveState(state: ConfiguratorState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* */
  }
}

function writeOnboardingDraft(state: ConfiguratorState) {
  if (!state.service) return;
  try {
    const service = getService(state.service);
    const estimate = computeEstimate(state.service, state.features);
    const featureLabels = getFeatureLabels(state.service, state.features);
    const raw = localStorage.getItem(DRAFT_KEY);
    const existing = raw ? JSON.parse(raw) : {};

    const goalsDescription = `Configurator: ${state.projectName}${featureLabels.length ? ` — ${featureLabels.join(", ")}` : ""}`;

    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        ...existing,
        s3: {
          ...(existing.s3 ?? {}),
          mainGoals: [service.onboardingGoal],
          goalsDescription,
        },
        s4: {
          ...(existing.s4 ?? {}),
          budgetRange: mapEstimateToBudgetBucket(estimate.total),
          timeline: state.timeline || (existing.s4?.timeline ?? ""),
        },
      })
    );
  } catch {
    /* */
  }
}

const STEP_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function ConfiguratorPage() {
  const router = useRouter();
  const [state, setState] = useState<ConfiguratorState>(INITIAL_STATE);
  const [direction, setDirection] = useState(1);
  const [restoredToast, setRestoredToast] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const restored = loadState();
    if (restored && (restored.service || restored.step > 0)) {
      setState(restored);
      setRestoredToast(true);
      setTimeout(() => setRestoredToast(false), 3000);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveState(state);
  }, [state]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const goTo = (step: number) => {
    setDirection(step > state.step ? 1 : -1);
    setState((p) => ({ ...p, step }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectService = (key: ServiceKey) => {
    setState((p) => ({ ...p, service: key, features: [] }));
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => goTo(1), 400);
  };

  const toggleFeature = (key: string) => {
    setState((p) => ({
      ...p,
      features: p.features.includes(key) ? p.features.filter((f) => f !== key) : [...p.features, key],
    }));
  };

  const estimate = computeEstimate(state.service, state.features);
  const featureLabels = state.service ? getFeatureLabels(state.service, state.features) : [];
  const service = state.service ? getService(state.service) : null;
  const timelineLabel = CONFIG_TIMELINE_OPTIONS.find((t) => t.value === state.timeline)?.label ?? "Nedecis";

  const whatsappMessage = service
    ? `Bună! Mi-am configurat proiectul pe site: "${state.projectName || service.title}" — ${service.title}${featureLabels.length ? `, cu: ${featureLabels.join(", ")}` : ""}. Estimare: ${estimate.low}–${estimate.high} EUR. Aș vrea să discutăm.`
    : `Bună! Aș vrea să discutăm despre un proiect nou.`;

  const handleContinue = () => {
    writeOnboardingDraft(state);
    router.push("/auth/register?from=configurator");
  };

  useEffect(() => {
    if (state.step === 3) writeOnboardingDraft(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.step]);

  const canGoBack = state.step > 0;
  const canContinueB = true;
  const canContinueC = state.projectName.trim().length > 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-midnight)" }}>
      {/* Top bar */}
      <div className="border-b" style={{ borderColor: "var(--color-border-dark)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="AiWANT" width={32} height={32} style={{ height: 32, width: "auto" }} />
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
            Configurator proiect
          </span>
        </div>
      </div>

      {/* Restored toast */}
      <AnimatePresence>
        {restoredToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{ background: "#10B981", color: "#fff" }}
          >
            Am păstrat configurația ta ✓
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 pb-28 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          {/* Step content */}
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={state.step}
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {state.step === 0 && <StepService value={state.service} onSelect={selectService} />}

                {state.step === 1 && state.service && (
                  <StepFeatures service={state.service} selected={state.features} onToggle={toggleFeature} />
                )}

                {state.step === 2 && (
                  <StepDetails
                    timeline={state.timeline}
                    onTimelineChange={(v) => setState((p) => ({ ...p, timeline: v }))}
                    projectName={state.projectName}
                    onProjectNameChange={(v) => setState((p) => ({ ...p, projectName: v }))}
                    description={state.description}
                    onDescriptionChange={(v) => setState((p) => ({ ...p, description: v }))}
                  />
                )}

                {state.step === 3 && service && (
                  <StepReview
                    projectName={state.projectName || service.title}
                    service={service}
                    featureLabels={featureLabels}
                    estimate={estimate}
                    timelineLabel={timelineLabel}
                    description={state.description}
                    whatsappUrl={buildWhatsAppUrl(WHATSAPP_NUMBER, whatsappMessage)}
                    onContinue={handleContinue}
                    onEdit={() => goTo(1)}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav for steps B and C */}
            {(state.step === 1 || state.step === 2) && (
              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
                <button
                  type="button"
                  onClick={() => goTo(state.step - 1)}
                  disabled={!canGoBack}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <ChevronLeft size={16} /> Înapoi
                </button>
                <button
                  type="button"
                  onClick={() => goTo(state.step + 1)}
                  disabled={state.step === 1 ? !canContinueB : !canContinueC}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                  style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
                >
                  Continuă <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Desktop sticky summary */}
          <div className="hidden lg:block sticky top-6">
            <SummaryPanel projectName={state.projectName} service={service} featureLabels={featureLabels} estimate={estimate} />
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      {service && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40" style={{ background: "var(--color-slate-deep)", borderTop: "1px solid var(--color-border-dark)" }}>
          <button
            type="button"
            onClick={() => setMobileExpanded((p) => !p)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <span className="text-sm font-semibold" style={{ color: "var(--color-gold)" }}>
              Estimat: {estimate.low.toLocaleString("ro-RO")}–{estimate.high.toLocaleString("ro-RO")} EUR
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              detalii {mobileExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </span>
          </button>
          <AnimatePresence>
            {mobileExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-4 pb-4"
              >
                <SummaryPanel projectName={state.projectName} service={service} featureLabels={featureLabels} estimate={estimate} compact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
