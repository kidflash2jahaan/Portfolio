"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import LiveClock from "./LiveClock";
import Magnetic from "./Magnetic";
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
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-32 pb-12"
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
          Building, performing, leading — in real time
        </motion.div>

        {/* name — letter mass-reveal + cursor wave */}
        <h1 className="font-display text-[clamp(3.2rem,11vw,9.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-ink">
          <CursorWaveName text={NAME} />
        </h1>

        {/* drawn-in underline beneath the name */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          viewBox="0 0 600 12"
          width="320"
          height="10"
          className="mt-3 text-ink/30"
        >
          <motion.path
            d="M2 6 Q 150 0 300 6 T 598 6"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          />
        </motion.svg>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
          className="mt-8 max-w-xl text-[15px] md:text-base text-ink-soft leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* meta row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
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
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className="h-8 w-[1px] bg-gradient-to-b from-ink/30 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* corner readouts */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute left-6 top-28 hidden md:flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        <span>Index — 001</span>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        >
          2026 / Spring
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute right-6 top-28 hidden md:block"
      >
        <LiveClock />
      </motion.div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <Magnetic strength={0.32} range={120}>
      <motion.span
        whileHover={{ y: -2, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        data-cursor="hover"
        className="glass-subtle rounded-full px-3 py-1.5 cursor-default inline-block"
      >
        {children}
      </motion.span>
    </Magnetic>
  );
}

/**
 * Letters that mass-reveal on first paint, then react to the cursor in
 * real time — each character lifts based on its distance to the pointer
 * (a simple radial wave).
 */
function CursorWaveName({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      px.set(e.clientX);
      py.set(e.clientY);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [px, py]);

  const words = text.split(" ");
  let i = 0;

  return (
    <span ref={containerRef} className="inline-block">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const idx = i++;
            return (
              <WaveLetter
                key={idx}
                char={ch}
                index={idx}
                px={px}
                py={py}
              />
            );
          })}
          {wi < words.length - 1 && <span className="inline-block w-[0.3em]" />}
        </span>
      ))}
    </span>
  );
}

function WaveLetter({
  char,
  index,
  px,
  py,
}: {
  char: string;
  index: number;
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const lift = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = px.get() - cx;
        const dy = py.get() - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 220;
        const t = Math.max(0, 1 - dist / radius);
        const target = -t * 22;
        const cur = lift.get();
        lift.set(cur + (target - cur) * 0.18);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [px, py, lift]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 80, rotateX: -90, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.6 + index * 0.04,
      }}
      style={{ display: "inline-block", transformOrigin: "50% 100%" }}
    >
      <motion.span
        ref={ref}
        style={{ display: "inline-block", y: lift }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}
