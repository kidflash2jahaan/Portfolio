"use client";

import { motion } from "motion/react";
import { awards, leadership } from "@/lib/data";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Awards() {
  return (
    <section id="awards" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="04"
          kicker="Recognition & service"
          title={awards.headline}
          description="A continuous stretch of academic, civic, and athletic recognition — alongside the leadership work behind it."
        />

        {/* awards groups */}
        <div className="grid gap-6 md:grid-cols-2">
          {awards.groups.map((g, gi) => (
            <Reveal key={g.label} variant="rise" delay={gi * 0.1}>
              <GlassCard tilt={false} className="p-7 md:p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-2xl md:text-[26px] font-medium text-ink">
                    {g.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-ink-faint">
                    {String(gi + 1).padStart(2, "0")} / {awards.groups.length}
                  </span>
                </div>
                <ul className="space-y-3">
                  {g.items.map((it, ii) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: ii * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex gap-3 text-[14.5px] leading-[1.6] text-ink-soft"
                    >
                      <span className="mt-2 h-px w-4 flex-shrink-0 bg-ink/30 group-hover:bg-ink group-hover:w-6 transition-all" />
                      <span className="group-hover:text-ink transition-colors">{it}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* leadership ribbon */}
        <div className="mt-24">
          <Reveal variant="fade">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint mb-8">
              Leadership & community
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((l, i) => (
              <Reveal key={l.title} variant="rise" delay={i * 0.08}>
                <div className="relative h-full glass-subtle rounded-squircle p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display text-lg font-medium text-ink leading-snug mb-2">
                    {l.title}
                  </div>
                  <p className="text-[13.5px] leading-[1.6] text-ink-soft">{l.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
