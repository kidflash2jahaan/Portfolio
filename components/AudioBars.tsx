"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Animated equalizer-style bars. Each bar oscillates with its own period
 * and phase so the row never repeats. Pure decoration, no audio source.
 */
export default function AudioBars({
  count = 32,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const bars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        period: 0.9 + Math.random() * 1.4,
        delay: Math.random() * 1.6,
        peak: 0.5 + Math.random() * 0.5,
        floor: 0.12 + Math.random() * 0.18,
        i,
      })),
    [count]
  );

  return (
    <div
      className={`flex items-end gap-[3px] h-12 ${className}`}
      aria-hidden
    >
      {bars.map((b) => (
        <motion.div
          key={b.i}
          animate={{
            scaleY: [b.floor, b.peak, b.floor * 1.2, b.peak * 0.85, b.floor],
          }}
          transition={{
            duration: b.period,
            delay: b.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ originY: 1 }}
          className="w-[3px] flex-1 max-w-[4px] rounded-full bg-gradient-to-t from-ink/70 to-ink/30 h-full"
        />
      ))}
    </div>
  );
}
