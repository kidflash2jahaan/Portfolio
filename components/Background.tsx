"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Apple-style liquid glass backdrop.
 * Drifting aurora blobs + parallax glass orbs that catch a slow specular highlight.
 */
export default function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden">
      {/* warm canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#fffaf2_0%,#f5f3ee_45%,#eeeae3_100%)]" />

      {/* aurora */}
      <div className="aurora" />

      {/* drifting glass orbs */}
      <motion.div
        style={{ y: y1, rotate: rot }}
        className="absolute -top-32 left-[8%] h-[42vmin] w-[42vmin] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 via-white/30 to-transparent backdrop-blur-2xl border border-white/60 shadow-[inset_0_2px_0_rgba(255,255,255,1),0_30px_80px_-20px_rgba(8,9,11,0.18)]" />
        <div className="absolute inset-[12%] rounded-full bg-gradient-to-tr from-[var(--aurora-1)]/40 to-[var(--aurora-2)]/40 mix-blend-overlay" />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] right-[6%] h-[34vmin] w-[34vmin] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/55 via-white/20 to-transparent backdrop-blur-2xl border border-white/50 shadow-[inset_0_1.5px_0_rgba(255,255,255,1),0_20px_60px_-20px_rgba(8,9,11,0.15)]" />
        <div className="absolute inset-[14%] rounded-full bg-gradient-to-tr from-[var(--aurora-3)]/45 to-[var(--aurora-4)]/45 mix-blend-overlay" />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[8%] left-[36%] h-[26vmin] w-[26vmin] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-white/20 to-transparent backdrop-blur-xl border border-white/45" />
        <div className="absolute inset-[14%] rounded-full bg-gradient-to-tr from-[var(--aurora-2)]/35 to-[var(--aurora-1)]/35 mix-blend-overlay" />
      </motion.div>

      {/* fine grid overlay — gives the white some structure */}
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
