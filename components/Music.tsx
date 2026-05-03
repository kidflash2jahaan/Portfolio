"use client";

import { motion } from "motion/react";
import { music } from "@/lib/data";
import AudioBars from "./AudioBars";
import GlassCard from "./GlassCard";
import Magnetic from "./Magnetic";
import ParallaxText from "./ParallaxText";
import Reveal from "./Reveal";
import Scramble from "./Scramble";
import SectionHeader from "./SectionHeader";

export default function Music() {
  return (
    <section id="music" className="relative px-6 py-4 md:py-6">
      <ParallaxText text="MUSIC" align="left" />
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
              <div className="hidden md:flex flex-col gap-1 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                <span>REC</span>
                <span className="h-12 w-px bg-ink/20" />
                <span>00.01</span>
              </div>
              <div>
                <p className="font-display text-2xl md:text-3xl font-medium leading-snug tracking-[-0.025em] text-ink">
                  Music advocate. Make Music Day Orange performer. Recipient of a
                  U.S. House of Representatives Certificate of Congressional Recognition,
                  presented by Rep. Young Kim.
                </p>
                <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                  <span>Congressional record</span>
                  <span className="h-px w-8 bg-ink/15" />
                  <span>June 21, 2024</span>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <AudioBars count={28} className="w-40" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    LIVE · BPM 116 · KEY Em
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* pillars grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {music.pillars.map((p, i) => (
            <Reveal key={p.title} variant="rise" delay={i * 0.08}>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 6 + i * 0.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                whileHover={{ y: -8, scale: 1.015 }}
                data-cursor="hover"
              >
                <GlassCard tilt className="p-7 h-full group">
                  <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-ink-faint mb-3 flex items-center gap-2">
                    <motion.span
                      animate={{ scaleX: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="inline-block h-px w-6 bg-ink/40 origin-left"
                    />
                    {String(i + 1).padStart(2, "0")} —{" "}
                    {["Piano", "Vocal", "Civic", "Stage", "Composition", "Production"][i]}
                  </div>
                  <h3 className="font-display text-xl md:text-[22px] font-medium leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.7] text-ink-soft">{p.detail}</p>
                  <div className="mt-6 pt-4 border-t border-ink/10 text-[11px] font-mono uppercase tracking-[0.16em] text-ink-faint group-hover:text-ink transition-colors">
                    {p.meta}
                  </div>
                </GlassCard>
              </motion.div>
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
          <div className="relative overflow-hidden border-y border-ink/10 py-5 group">
            <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
            <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 38, ease: "linear", repeat: Infinity }}
              className="flex gap-10 whitespace-nowrap"
            >
              {[...music.influences, ...music.influences, ...music.influences].map(
                (name, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08, color: "var(--ink)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    data-cursor="hover"
                    className="font-display text-xl md:text-2xl font-medium tracking-tight text-ink-soft"
                  >
                    <Scramble text={name} duration={420} />
                    <span className="ml-10 text-ink-faint">◇</span>
                  </motion.span>
                )
              )}
            </motion.div>
          </div>
        </div>

        {/* cta — performance link, magnetic */}
        <Reveal variant="rise" delay={0.2}>
          <div className="mt-16 flex justify-center">
            <Magnetic strength={0.4} range={180}>
              <motion.a
                href={music.performanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                data-cursor="cta"
                data-cursor-label="Open"
                className="group glass-strong specular rounded-full px-7 py-4 inline-flex items-center gap-3"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-60" />
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                    className="relative h-2.5 w-2.5 rounded-full bg-rose-500"
                  />
                </span>
                <span className="text-sm font-medium text-ink">
                  Watch the live performance playlist
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  className="text-ink-faint"
                >
                  →
                </motion.span>
              </motion.a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
