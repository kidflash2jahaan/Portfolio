"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Drop = { id: number; x: number; y: number };

/**
 * Paint trail behind the cursor — small frosted glass droplets are spawned
 * along the cursor's path and fade out. Throttled by distance so fast
 * movement spawns more drops, slow movement spawns few.
 */
export default function CursorTrail() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const handler = (e: MouseEvent) => {
      const last = lastRef.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 36) return; // throttle by distance
      }
      lastRef.current = { x: e.clientX, y: e.clientY };
      const id = ++idRef.current;
      setDrops((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setDrops((prev) => prev.filter((d) => d.id !== id));
      }, 800);
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[185]">
      <AnimatePresence>
        {drops.map((d) => (
          <motion.span
            key={d.id}
            initial={{
              x: d.x,
              y: d.y,
              opacity: 0.7,
              scale: 0.4,
            }}
            animate={{
              opacity: 0,
              scale: 1,
              y: d.y - 8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 12, height: 12 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 backdrop-blur-md border border-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,1)] mix-blend-multiply"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
