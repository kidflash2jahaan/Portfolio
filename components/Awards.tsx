"use client";

import { motion } from "motion/react";
import { awards, leadership } from "@/lib/data";
import GlassCard from "./GlassCard";
import ParallaxText from "./ParallaxText";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function AwardItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 6 }}
      data-cursor="hover"
      className="group flex gap-3 text-[14.5px] leading-[1.6] text-ink-soft cursor-default"
    >
      {/* check stamp — draws in on view */}
      <motion.svg
        viewBox="0 0 14 14"
        width="14"
        height="14"
        className="flex-shrink-0 mt-1.5 text-ink/50 group-hover:text-ink transition-colors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.circle
          cx="7"
          cy="7"
          r="5.5"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        />
        <motion.path
          d="M3.8 7.2 L6.2 9.4 L10.4 4.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 0.45, delay: index * 0.04 + 0.4, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        />
      </motion.svg>
      <span className="group-hover:text-ink transition-colors">{text}</span>
    </motion.li>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="relative px-6 py-4 md:py-6">
      <ParallaxText text="HONORS" align="right" />
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
                    <AwardItem key={it} text={it} index={ii} />
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
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  data-cursor="hover"
                  className="relative h-full glass-subtle rounded-squircle p-6 group cursor-default"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/40 to-transparent origin-left"
                  />
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display text-lg font-medium text-ink leading-snug mb-2 group-hover:tracking-tight transition-all">
                    {l.title}
                  </div>
                  <p className="text-[13.5px] leading-[1.6] text-ink-soft">{l.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
