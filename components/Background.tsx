"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Apple-style liquid glass backdrop.
 *  - drifting aurora blobs (CSS keyframes via .aurora)
 *  - three parallax glass orbs that respond to scroll AND to cursor position
 *  - a fine grid + film grain
 */
export default function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // scroll-driven parallax
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 18]);

  // mouse-driven parallax (centered at viewport center, range -1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.6 });

  const tx1 = useTransform(smx, [-1, 1], [-32, 32]);
  const ty1 = useTransform(smy, [-1, 1], [-22, 22]);
  const tx2 = useTransform(smx, [-1, 1], [22, -22]);
  const ty2 = useTransform(smy, [-1, 1], [16, -16]);
  const tx3 = useTransform(smx, [-1, 1], [-14, 14]);
  const ty3 = useTransform(smy, [-1, 1], [10, -10]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden">
      {/* warm canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#fffaf2_0%,#f5f3ee_45%,#eeeae3_100%)]" />

      {/* aurora */}
      <div className="aurora" />

      {/* drifting glass orbs */}
      <motion.div
        style={{ y: y1, rotate: rot, x: tx1, translateY: ty1 }}
        className="absolute -top-32 left-[8%] h-[42vmin] w-[42vmin] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 via-white/30 to-transparent backdrop-blur-2xl border border-white/60 shadow-[inset_0_2px_0_rgba(255,255,255,1),0_30px_80px_-20px_rgba(8,9,11,0.18)]" />
        <div className="absolute inset-[12%] rounded-full bg-gradient-to-tr from-[var(--aurora-1)]/40 to-[var(--aurora-2)]/40 mix-blend-overlay" />
      </motion.div>

      <motion.div
        style={{ y: y2, x: tx2, translateY: ty2 }}
        className="absolute top-[40%] right-[6%] h-[34vmin] w-[34vmin] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/55 via-white/20 to-transparent backdrop-blur-2xl border border-white/50 shadow-[inset_0_1.5px_0_rgba(255,255,255,1),0_20px_60px_-20px_rgba(8,9,11,0.15)]" />
        <div className="absolute inset-[14%] rounded-full bg-gradient-to-tr from-[var(--aurora-3)]/45 to-[var(--aurora-4)]/45 mix-blend-overlay" />
      </motion.div>

      <motion.div
        style={{ y: y3, x: tx3, translateY: ty3 }}
        className="absolute bottom-[8%] left-[36%] h-[26vmin] w-[26vmin] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-white/20 to-transparent backdrop-blur-xl border border-white/45" />
        <div className="absolute inset-[14%] rounded-full bg-gradient-to-tr from-[var(--aurora-2)]/35 to-[var(--aurora-1)]/35 mix-blend-overlay" />
      </motion.div>

      {/* fine grid overlay */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="grain" />
    </div>
  );
}
