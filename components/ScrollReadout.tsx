"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";

/**
 * A small fixed mono readout in the bottom-right corner showing live
 * scroll progress and velocity, plus a vertical progress rail. Tech-blueprint
 * vibe — passively conveys "this thing is alive."
 */
export default function ScrollReadout() {
  const { scrollYProgress } = useScroll();
  const sp = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 1000) / 10);
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-4 bottom-4 z-30 hidden md:flex items-end gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint"
    >
      <div className="flex flex-col items-end gap-1">
        <span>scroll</span>
        <span className="text-ink tabular-nums">
          {pct.toFixed(1).padStart(4, "0")}%
        </span>
      </div>

      <div className="relative h-24 w-[3px] overflow-hidden rounded-full bg-ink/10">
        <motion.div
          style={{ scaleY: sp, originY: 0 }}
          className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-ink to-ink/40"
        />
      </div>
    </div>
  );
}
