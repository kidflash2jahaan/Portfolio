"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "@/lib/data";

const NAME = "Jahaan Pardhanani";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], ["0px", "8px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-32 pb-24"
    >
      <motion.div
        style={{ y, opacity, filter: useTransform(blur, (b) => `blur(${b})`), scale }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="glass-subtle rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-ink-soft"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          A portfolio for university admission
        </motion.div>

        {/* name — letter-by-letter reveal with mass */}
        <h1 className="font-display text-[clamp(3.2rem,11vw,9.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-ink">
          <SplitName text={NAME} />
        </h1>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          className="mt-8 max-w-xl text-[15px] md:text-base text-ink-soft leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* meta row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint"
        >
          <Pill>Sage Hill · Class of 2029</Pill>
          <Pill>FRC Software Lead</Pill>
          <Pill>MTAC L9 — State Honors</Pill>
        </motion.div>

        {/* scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20 flex flex-col items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-faint"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className="h-8 w-[1px] bg-gradient-to-b from-ink/30 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* date marker top-left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute left-6 top-28 hidden md:flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        <span>Index — 001</span>
        <span>2026 / Spring</span>
      </motion.div>

      {/* coordinate marker top-right */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute right-6 top-28 hidden md:flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint text-right"
      >
        <span>33.7°N · 117.7°W</span>
        <span>North Tustin, CA</span>
      </motion.div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-subtle rounded-full px-3 py-1.5">{children}</span>
  );
}

function SplitName({ text }: { text: string }) {
  const words = text.split(" ");
  let i = 0;

  return (
    <span className="inline-block">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const idx = i++;
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 80, rotateX: -90, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.6 + idx * 0.04,
                }}
                style={{ display: "inline-block", transformOrigin: "50% 100%" }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block w-[0.3em]" />}
        </span>
      ))}
    </span>
  );
}
