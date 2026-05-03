"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Subtle drifting particles — small mono "✦" / "·" / "+" specks scattered
 * across the viewport that slowly float, fade, and pulse. Pure decoration,
 * positioned fixed behind content.
 */
export default function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 8 + Math.random() * 14,
        delay: Math.random() * 6,
        glyph: ["✦", "·", "+", "◇"][Math.floor(Math.random() * 4)],
        size: 9 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.45, 0.2, 0.5, 0],
            y: [0, -32, -8, -42, 0],
            x: [0, 6, -4, 8, 0],
          }}
          transition={{
            duration: d.d,
            delay: d.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            fontSize: d.size,
            color: "var(--ink-faint)",
            mixBlendMode: "multiply",
          }}
          className="font-mono select-none"
        >
          {d.glyph}
        </motion.span>
      ))}
    </div>
  );
}
