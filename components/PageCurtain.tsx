"use client";

import { motion } from "motion/react";

/**
 * Initial page-load animation — a frosted glass curtain wipes off the
 * page in two halves, revealing the content underneath. Plays once on mount.
 */
export default function PageCurtain() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.4, delay: 1.6 }}
      className="fixed inset-0 z-[300] pointer-events-none"
    >
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.3, 1], delay: 0.4 }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[var(--background)] flex items-end justify-center pb-8"
        style={{
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -12] }}
          transition={{ duration: 1.4, times: [0, 0.18, 0.7, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint"
        >
          Loading · jahaan.dev
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.3, 1], delay: 0.4 }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--background)]"
        style={{
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
        }}
      />

      {/* center seam — thin line that grows + fades during the wipe */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, times: [0, 0.25, 0.7, 1], delay: 0.2 }}
        className="absolute inset-x-0 top-1/2 h-px bg-ink origin-center"
      />
    </motion.div>
  );
}
