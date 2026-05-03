"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Pulse = { id: number; x: number; y: number; size: number; tint: string };

const TINTS = [
  "rgba(255, 214, 231, 0.7)",
  "rgba(199, 227, 255, 0.7)",
  "rgba(214, 245, 224, 0.7)",
  "rgba(236, 230, 255, 0.7)",
];

/**
 * Sonar-like radial pulse rings that spawn at random points across the
 * viewport every couple of seconds. Each ring expands outward and fades.
 * Pure passive decoration — adds a sense of life to the page.
 */
export default function PulseRings() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    let nextId = 0;
    const spawn = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const id = ++nextId;
      const next: Pulse = {
        id,
        x: Math.random() * w,
        y: Math.random() * h,
        size: 80 + Math.random() * 140,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
      };
      setPulses((p) => [...p, next]);
      window.setTimeout(() => {
        setPulses((p) => p.filter((q) => q.id !== id));
      }, 2400);
    };

    // first one quickly, then every ~2.5s
    const t0 = window.setTimeout(spawn, 800);
    const id = window.setInterval(spawn, 2600);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[2]">
      <AnimatePresence>
        {pulses.map((p) => (
          <motion.span
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              width: 0,
              height: 0,
              opacity: 0,
            }}
            animate={{
              width: p.size * 4,
              height: p.size * 4,
              opacity: [0, 0.6, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 9999,
              border: `1px solid ${p.tint}`,
              background: `radial-gradient(circle, ${p.tint}, transparent 70%)`,
              mixBlendMode: "multiply",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
