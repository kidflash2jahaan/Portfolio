"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const LINES = [
  { t: "BOOT · systemerr.com / build 2026.05", d: 0.0 },
  { t: "MOUNT  /portfolio  ............  ok", d: 0.18 },
  { t: "INIT   motion engine  .........  ok", d: 0.36 },
  { t: "LOAD   geist-mono / geist-sans   ok", d: 0.54 },
  { t: "WIRE   liquid-glass surfaces  ..  ok", d: 0.72 },
  { t: "READY", d: 0.95, ok: true },
];

const TOTAL = 2400; // ms before unfolding panels

/**
 * Terminal-style boot curtain.
 *  - Frosted full-screen glass panel with a centered ASCII-art readout that
 *    types out line by line.
 *  - A green "READY" line pings on at the end.
 *  - Then four glass panels split from the centre and slide off in four
 *    directions, revealing the hero.
 */
export default function PageCurtain() {
  const [phase, setPhase] = useState<"booting" | "opening" | "done">("booting");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("opening"), TOTAL);
    const t2 = window.setTimeout(() => setPhase("done"), TOTAL + 1100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[300] pointer-events-none"
    >
      {/* terminal readout — fades out before panels split */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "opening" ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-[1] flex items-center justify-center"
      >
        <div
          className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink leading-[1.9] min-w-[320px] md:min-w-[460px]"
          style={{ textShadow: "0 0 0 transparent" }}
        >
          {LINES.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, delay: l.d, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 1] }}
                transition={{ duration: 0.4, delay: l.d }}
                className={l.ok ? "text-emerald-600" : "text-ink-faint"}
              >
                {l.ok ? "●" : "▸"}
              </motion.span>
              <span className={l.ok ? "text-emerald-600" : ""}>{l.t}</span>
              {i === LINES.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="ml-1"
                >
                  ▍
                </motion.span>
              )}
            </motion.div>
          ))}

          {/* progress bar — fills as the lines tick through */}
          <div className="mt-4 relative h-px w-full bg-ink/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: TOTAL / 1000, ease: "linear" }}
              className="absolute inset-0 bg-ink origin-left"
            />
          </div>
        </div>
      </motion.div>

      {/* horizontal scan beam that descends just before the unfold */}
      <motion.div
        initial={{ y: "0%", opacity: 0 }}
        animate={
          phase === "opening"
            ? { y: ["0%", "100vh"], opacity: [0, 1, 0] }
            : undefined
        }
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-white to-transparent z-[2] mix-blend-overlay"
      />

      {/* four glass panels — split from centre */}
      <motion.div
        initial={{ y: "0%" }}
        animate={phase === "opening" ? { y: "-100%" } : undefined}
        transition={{ duration: 1, ease: [0.85, 0, 0.3, 1], delay: 0.05 }}
        className="absolute top-0 left-0 right-1/2 h-1/2 bg-[var(--background)]"
        style={{ backdropFilter: "blur(40px) saturate(170%)" }}
      />
      <motion.div
        initial={{ y: "0%" }}
        animate={phase === "opening" ? { y: "-100%" } : undefined}
        transition={{ duration: 1, ease: [0.85, 0, 0.3, 1], delay: 0.12 }}
        className="absolute top-0 left-1/2 right-0 h-1/2 bg-[var(--background)]"
        style={{ backdropFilter: "blur(40px) saturate(170%)" }}
      />
      <motion.div
        initial={{ y: "0%" }}
        animate={phase === "opening" ? { y: "100%" } : undefined}
        transition={{ duration: 1, ease: [0.85, 0, 0.3, 1], delay: 0.05 }}
        className="absolute bottom-0 left-0 right-1/2 h-1/2 bg-[var(--background)]"
        style={{ backdropFilter: "blur(40px) saturate(170%)" }}
      />
      <motion.div
        initial={{ y: "0%" }}
        animate={phase === "opening" ? { y: "100%" } : undefined}
        transition={{ duration: 1, ease: [0.85, 0, 0.3, 1], delay: 0.12 }}
        className="absolute bottom-0 left-1/2 right-0 h-1/2 bg-[var(--background)]"
        style={{ backdropFilter: "blur(40px) saturate(170%)" }}
      />

      {/* centre seam crosshair — visible during boot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === "booting" ? [0, 1, 1, 0] : 0,
          scaleX: phase === "booting" ? [0, 1, 1, 0] : 0,
        }}
        transition={{ duration: TOTAL / 1000, times: [0, 0.1, 0.85, 1] }}
        className="absolute inset-x-0 top-1/2 h-px bg-ink z-[3] origin-center"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === "booting" ? [0, 1, 1, 0] : 0,
          scaleY: phase === "booting" ? [0, 1, 1, 0] : 0,
        }}
        transition={{ duration: TOTAL / 1000, times: [0, 0.1, 0.85, 1] }}
        className="absolute inset-y-0 left-1/2 w-px bg-ink z-[3] origin-center"
      />
    </div>
  );
}
