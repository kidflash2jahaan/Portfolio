"use client";

import { motion } from "motion/react";

/**
 * Animated divider drawn between sections — a thin SVG line that draws in
 * left-to-right with a small diamond marker that scales up at the centre.
 */
export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-10 flex items-center gap-4">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px flex-1 bg-gradient-to-r from-transparent via-ink/25 to-transparent origin-left"
      />
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-2.5 w-2.5"
      >
        <div className="absolute inset-0 bg-ink/70" />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 bg-ink/40"
        />
      </motion.div>
      {label && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
        >
          {label}
        </motion.span>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px flex-1 bg-gradient-to-r from-ink/25 via-ink/25 to-transparent origin-left"
      />
    </div>
  );
}
