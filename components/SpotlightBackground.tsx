"use client";

import { motion } from "framer-motion";

interface SpotlightBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightBackground = ({ children, className = "" }: SpotlightBackgroundProps) => {
  return (
    <div className={`spotlight-container ${className}`}>
      <div className="spotlight-overlay">
        {/* Gold warm spotlight — drifts top-left */}
        <motion.div
          className="spotlight spotlight-left"
          initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
          animate={{
            x: ["-50%", "-30%", "-70%", "-50%"],
            y: ["-50%", "-70%", "-30%", "-50%"],
            rotate: ["0deg", "15deg", "-15deg", "0deg"],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* Navy blue spotlight — drifts center */}
        <motion.div
          className="spotlight spotlight-mid"
          initial={{ x: "0%", y: "0%", rotate: "0deg" }}
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "30%", "10%", "0%"],
            rotate: ["-20deg", "0deg", "20deg", "-20deg"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3,
          }}
        />

        {/* Gold-dark spotlight — drifts right */}
        <motion.div
          className="spotlight spotlight-right"
          initial={{ x: "0%", y: "0%", rotate: "10deg" }}
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            rotate: ["10deg", "-10deg", "25deg", "10deg"],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
        />
      </div>

      <div className="spotlight-content">{children}</div>
    </div>
  );
};

export default SpotlightBackground;
