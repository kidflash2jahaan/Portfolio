"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { vision } from "@/lib/data";
import GlassCard from "./GlassCard";
import ParallaxText from "./ParallaxText";
import Reveal from "./Reveal";
import ScrollWords from "./ScrollWords";
import SectionHeader from "./SectionHeader";

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="vision" className="relative px-6 py-8 md:py-12">
      <ParallaxText text="VISION" align="center" />
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="05"
          kicker="Vision"
          title={vision.title}
        />

        <motion.div ref={ref} style={{ y }}>
          <Reveal variant="rise">
            <GlassCard variant="strong" tilt gleam className="p-10 md:p-16">
              <div className="space-y-6">
                {vision.paragraphs.map((p, i) => (
                  <ScrollWords
                    key={i}
                    text={p}
                    className={
                      i === 0
                        ? "font-display text-[clamp(1.3rem,2.4vw,1.85rem)] font-medium leading-[1.45] tracking-[-0.02em] text-ink"
                        : "text-[16px] md:text-[17px] leading-[1.8] text-ink-soft"
                    }
                  />
                ))}
              </div>

              <Reveal variant="fade" delay={0.6}>
                <div className="mt-12 pt-8 border-t border-ink/10 flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                    Signed
                  </div>
                  <div className="font-display text-2xl font-medium tracking-tight text-ink">
                    — Jahaan
                  </div>
                </div>
              </Reveal>
            </GlassCard>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
