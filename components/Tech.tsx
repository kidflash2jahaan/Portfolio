"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { technology } from "@/lib/data";
import GlassCard from "./GlassCard";
import ParallaxText from "./ParallaxText";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function StackBadge({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), {
    stiffness: 220,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), {
    stiffness: 220,
    damping: 18,
  });
  const [pops, setPops] = useState<number[]>([]);
  const popId = useRef(0);

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }
  function onClick() {
    const id = ++popId.current;
    setPops((p) => [...p, id]);
    window.setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 700);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.025,
      }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.94 }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 800,
      }}
      data-cursor="hover"
      className="relative overflow-hidden glass-subtle rounded-full px-4 py-2 text-sm text-ink-soft cursor-pointer"
    >
      <span className="relative z-10">{label}</span>
      <AnimatePresence>
        {pops.map((id) => (
          <motion.span
            key={id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 mix-blend-overlay"
          />
        ))}
      </AnimatePresence>
    </motion.span>
  );
}

export default function Tech() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const xRight = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="tech" className="relative px-6 py-16 md:py-24">
      <ParallaxText text="TECHNOLOGY" align="right" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          kicker="Technology, robotics & AI"
          title={technology.headline}
          description="Nine years writing code. Two years training neural networks. One season leading the software for a competition robot. The work is detailed below."
        />

        {/* Highlights — alternating offset grid */}
        <div ref={ref} className="grid gap-6 md:grid-cols-2">
          {technology.highlights.map((h, i) => (
            <motion.div
              key={h.title}
              style={{ x: i % 2 === 0 ? xLeft : xRight }}
              className={i % 2 === 1 ? "md:mt-16" : ""}
            >
              <Reveal variant="rise" delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  data-cursor="hover"
                >
                  <GlassCard tilt className="p-7 md:p-8 h-full group">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <div className="font-display text-2xl md:text-[26px] font-medium leading-tight text-ink">
                          <motion.span
                            initial={{ backgroundSize: "0% 1px" }}
                            whileHover={{ backgroundSize: "100% 1px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              backgroundImage:
                                "linear-gradient(currentColor, currentColor)",
                              backgroundPosition: "0 100%",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            {h.title}
                          </motion.span>
                        </div>
                        <div className="mt-1 text-sm text-ink-soft">{h.org}</div>
                      </div>
                      <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity }}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint whitespace-nowrap pt-1"
                      >
                        {h.period}
                      </motion.div>
                    </div>
                    <p className="text-[15px] leading-[1.7] text-ink-soft">{h.body}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {h.tags.map((t, ti) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + ti * 0.05, duration: 0.5 }}
                          whileHover={{ y: -3, scale: 1.06 }}
                          className="rounded-full bg-white/40 border border-white/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.10em] text-ink-soft cursor-default"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </Reveal>
            </motion.div>
          ))}
        </div>

        {/* Stack — animated badges */}
        <div className="mt-24">
          <Reveal variant="fade">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint mb-6">
              Working stack
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2.5">
            {technology.stack.map((s, i) => (
              <StackBadge key={s} label={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
