"use client";

import { motion } from "motion/react";
import { music } from "@/lib/data";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Music() {
  return (
    <section id="music" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          kicker="Music & performing arts"
          title={music.headline}
          description="Classical-piano grammar feeding rock-band instincts feeding studio production. The same hands that voice a Chopin nocturne route an Aux send through a Serum patch."
        />

        {/* hero quote card */}
        <Reveal variant="rise">
          <GlassCard variant="strong" tilt gleam className="p-10 md:p-14 mb-10">
            <div className="flex items-start gap-6">
              <div className="hidden md:block font-display text-[140px] leading-[0.7] font-light text-ink/15 -mt-3">
                ❝
              </div>
              <div>
                <p className="font-display text-2xl md:text-3xl font-light leading-snug tracking-[-0.01em] text-ink">
                  Music advocate. Make Music Day Orange performer. Recipient of a
                  U.S. House of Representatives Certificate of Congressional Recognition,
                  presented by Rep. Young Kim.
                </p>
                <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                  <span>Congressional record</span>
                  <span className="h-px w-8 bg-ink/15" />
                  <span>June 21, 2024</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* pillars grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {music.pillars.map((p, i) => (
            <Reveal key={p.title} variant="rise" delay={i * 0.08}>
              <GlassCard tilt className="p-7 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-ink-faint mb-3">
                  {String(i + 1).padStart(2, "0")} —{" "}
                  {["Piano", "Vocal", "Civic", "Stage", "Composition", "Production"][i]}
                </div>
                <h3 className="font-display text-xl md:text-[22px] font-medium leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.7] text-ink-soft">{p.detail}</p>
                <div className="mt-6 pt-4 border-t border-ink/10 text-[11px] font-mono uppercase tracking-[0.16em] text-ink-faint">
                  {p.meta}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* influences ticker */}
        <div className="mt-16">
          <Reveal variant="fade">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint mb-6">
              In the listening rotation
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4">
            {music.influences.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden"
              >
                <div className="font-display text-lg md:text-xl font-light text-ink/80 group-hover:text-ink transition-colors">
                  {name}
                </div>
                <div className="h-px bg-ink/10 mt-2 group-hover:bg-ink/40 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* cta — performance link */}
        <Reveal variant="rise" delay={0.2}>
          <div className="mt-16 flex justify-center">
            <a
              href={music.performanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-strong specular rounded-full px-7 py-4 inline-flex items-center gap-3 hover:scale-[1.02] transition-transform"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-rose-500" />
              </span>
              <span className="text-sm font-medium text-ink">
                Watch the live performance playlist
              </span>
              <span className="text-ink-faint group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
