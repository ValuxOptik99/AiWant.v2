"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-0"
          style={{ background: "var(--color-midnight)" }}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo icon — greyscale → color + pulse */}
          <motion.div
            initial={{ filter: "grayscale(1)", opacity: 0, scale: 0.9 }}
            animate={{
              filter: ["grayscale(1)", "grayscale(1)", "grayscale(0)"],
              opacity: [0, 1, 1],
              scale: [0.9, 1, 1],
            }}
            transition={{ duration: 1.6, ease: "easeOut", times: [0, 0.3, 1] }}
          >
            <Image
              src="/images/logo.png"
              alt="AIWANT"
              width={110}
              height={110}
              priority
              style={{ objectFit: "contain" }}
            />
          </motion.div>

          {/* Wordmark — greyscale → color */}
          <motion.div
            className="text-center mt-3"
            initial={{ filter: "grayscale(1)", opacity: 0 }}
            animate={{
              filter: ["grayscale(1)", "grayscale(1)", "grayscale(0)"],
              opacity: [0, 1, 1],
            }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.15, times: [0, 0.3, 1] }}
          >
            <div
              className="font-black tracking-widest text-2xl"
              style={{
                color: "var(--color-text-on-dark)",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.2em",
              }}
            >
              AiWANT
            </div>
            <div
              className="text-[9px] font-semibold tracking-widest mt-1"
              style={{ color: "var(--color-gold)", letterSpacing: "0.15em" }}
            >
              PROCESS & BUSINESS AUTOMATION
            </div>
          </motion.div>

          {/* Progress bar */}
          <div
            className="mt-8 rounded-full overflow-hidden"
            style={{
              width: 220,
              height: 2,
              background: "var(--color-border-dark)",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--color-gold)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
