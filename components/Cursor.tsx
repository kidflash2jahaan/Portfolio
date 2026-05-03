"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Minimal liquid-glass cursor.
 *  - solid black dot follows the pointer with a tight spring (no lag, no jitter)
 *  - a translucent glass ring sits behind it; scales up smoothly when over an
 *    interactive element ([data-cursor="hover"] / [data-cursor="cta"], and any
 *    a/button/[role=button])
 *  - a brief scale-down on press
 *
 * No velocity stretch, no rotation, no halo morph, no satellite — those were
 * causing the glitchy spinning during snap transitions.
 */
export default function Cursor() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 800, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 800, damping: 40, mass: 0.4 });

  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        'a, button, [role="button"], [data-cursor="hover"], [data-cursor="cta"]'
      );
      setActive(interactive);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.style.cursor = "";
    };
  }, [x, y, visible]);

  return (
    <>
      {/* glass ring — scales up on interactive hover */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        animate={{
          scale: pressed ? 0.7 : active ? 1.9 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.4 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
      >
        <div
          className="h-9 w-9 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.30) 100%)",
            backdropFilter: "blur(8px) saturate(170%)",
            WebkitBackdropFilter: "blur(8px) saturate(170%)",
            border: "1px solid rgba(255,255,255,0.85)",
            boxShadow:
              "inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.4), 0 4px 16px -4px rgba(8,9,11,0.16)",
          }}
        />
      </motion.div>

      {/* center dot — instant pointer reference */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        animate={{
          scale: pressed ? 0.5 : active ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[201] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-ink" />
      </motion.div>
    </>
  );
}
