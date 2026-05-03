"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { vision } from "@/lib/data";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="vision" className="relative px-6 py-32 md:py-44">
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
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.15,
                    }}
                    className={
                      i === 0
                        ? "font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-[1.4] tracking-[-0.015em] text-ink"
                        : "text-[16px] md:text-[17px] leading-[1.8] text-ink-soft"
                    }
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <Reveal variant="fade" delay={0.6}>
                <div className="mt-12 pt-8 border-t border-ink/10 flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                    Signed
                  </div>
                  <div className="font-display text-2xl font-light italic text-ink">
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
