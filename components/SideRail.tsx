"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Hero" },
  { id: "about", label: "Portrait" },
  { id: "tech", label: "Tech" },
  { id: "music", label: "Music" },
  { id: "awards", label: "Honors" },
  { id: "vision", label: "Vision" },
  { id: "contact", label: "Contact" },
];

/**
 * Fixed left-side rail with a dot per section. The dot for the section
 * currently in view scales up and gets a label tag that slides in.
 * Click any dot to jump.
 */
export default function SideRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => !!e
    );
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = SECTIONS.findIndex((s) => s.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="pointer-events-none fixed left-3 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3"
    >
      {SECTIONS.map((s, i) => {
        const isActive = i === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor="hover"
            className="pointer-events-auto group relative flex items-center gap-3 py-1"
            aria-current={isActive ? "true" : undefined}
          >
            <motion.span
              animate={{
                width: isActive ? 28 : 14,
                backgroundColor: isActive ? "rgba(12,12,14,0.85)" : "rgba(12,12,14,0.25)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="block h-[2px] rounded-full"
            />
            <motion.span
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
            >
              {String(i).padStart(2, "0")} · {s.label}
            </motion.span>
          </a>
        );
      })}
    </nav>
  );
}
