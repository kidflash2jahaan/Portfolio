"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Per-section "boot strip" — a thin horizontal scan beam runs across the top
 * of a section the first time it scrolls into view, while a brief mono
 * readout types in below it ("BOOT · 02 · TECHNOLOGY · OK"). Both fade out.
 */
export default function SectionBoot({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative h-7 w-full overflow-hidden mb-2"
    >
      {/* sweeping beam */}
      <motion.div
        initial={{ x: "-110%", opacity: 0 }}
        animate={inView ? { x: "110%", opacity: [0, 1, 1, 0] } : undefined}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.15, 0.85, 1],
        }}
        className="absolute inset-y-0 -left-1/3 w-2/3 bg-gradient-to-r from-transparent via-ink/30 to-transparent"
      />

      {/* readout */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: [0, 1, 1, 0], y: 0 } : undefined}
        transition={{
          duration: 2.4,
          ease: "easeOut",
          times: [0, 0.18, 0.7, 1],
          delay: 0.2,
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span>BOOT · {index} · {label} · OK</span>
      </motion.div>

      {/* right-side ticking dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 1, 0] } : undefined}
        transition={{ duration: 2.4, times: [0, 0.18, 0.7, 1], delay: 0.2 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        <span>0x{Math.floor(parseInt(index, 10) * 0x4d2 + 0xa1).toString(16).toUpperCase()}</span>
        <span>·</span>
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
        >
          ●
        </motion.span>
      </motion.div>
    </div>
  );
}
