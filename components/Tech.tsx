"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { technology } from "@/lib/data";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Tech() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const xRight = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="tech" className="relative px-6 py-32 md:py-44">
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
                <GlassCard tilt className="p-7 md:p-8 h-full">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="font-display text-2xl md:text-[26px] font-medium leading-tight text-ink">
                        {h.title}
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">{h.org}</div>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint whitespace-nowrap pt-1">
                      {h.period}
                    </div>
                  </div>
                  <p className="text-[15px] leading-[1.7] text-ink-soft">{h.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {h.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/40 border border-white/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.10em] text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
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
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.025,
                }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="glass-subtle rounded-full px-4 py-2 text-sm text-ink-soft cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
