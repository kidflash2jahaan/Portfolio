"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/** Custom magnetic cursor — a tiny glass disc that lags behind the pointer. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
    >
      <div className="relative h-7 w-7 rounded-full">
        <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(8,9,11,0.10)]" />
        <div className="absolute inset-[35%] rounded-full bg-ink/80" />
      </div>
    </motion.div>
  );
}
