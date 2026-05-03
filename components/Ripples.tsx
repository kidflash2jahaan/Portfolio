"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Ripple = { id: number; x: number; y: number };

/**
 * Global click ripple — every left-click anywhere on the page emits a soft
 * concentric pulse from the click point. Skipped on inputs and form fields.
 */
export default function Ripples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let id = 0;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("input, textarea, select")) return;
      const next: Ripple = { id: ++id, x: e.clientX, y: e.clientY };
      setRipples((r) => [...r, next]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((p) => p.id !== next.id));
      }, 900);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[150]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.55, scale: 0 }}
            animate={{ opacity: 0, scale: 14 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: r.x - 28, top: r.y - 28, width: 56, height: 56 }}
            className="absolute rounded-full border border-ink/30 bg-white/30 backdrop-blur-md"
          />
        ))}
        {ripples.map((r) => (
          <motion.span
            key={`${r.id}-inner`}
            initial={{ opacity: 0.85, scale: 0 }}
            animate={{ opacity: 0, scale: 6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
            className="absolute rounded-full bg-ink/10"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
