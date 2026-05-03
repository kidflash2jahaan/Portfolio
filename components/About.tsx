"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile, stats } from "@/lib/data";
import Counter from "./Counter";
import GlassCard from "./GlassCard";
import ParallaxText from "./ParallaxText";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative px-6 py-4 md:py-6">
      <ParallaxText text="PORTRAIT" align="left" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          kicker="The portrait"
          title="A freshman building like he's been doing this for a decade — because he has."
        />

        <div ref={ref} className="grid gap-8 md:grid-cols-12">
          {/* main intro card */}
          <motion.div style={{ y }} className="md:col-span-7">
            <Reveal variant="rise">
              <GlassCard variant="strong" tilt gleam className="p-8 md:p-12">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.08 }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-12 w-12 rounded-full overflow-hidden border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1)]"
                    >
                      <motion.div
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, var(--aurora-1), var(--aurora-2), var(--aurora-4), var(--aurora-1))",
                          backgroundSize: "300% 300%",
                        }}
                        className="absolute inset-0"
                      />
                      <div className="absolute inset-0 flex items-center justify-center font-display text-base font-semibold text-ink/80">
                        JP
                      </div>
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="font-display text-lg font-medium text-ink">
                        Jahaan Pardhanani
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                        {profile.school}
                      </span>
                    </div>
                  </div>

                  <p className="text-[17px] md:text-lg leading-[1.7] text-ink-soft">
                    {profile.intro}
                  </p>

                  <div className="hairline" />

                  <div className="grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
                    <div>
                      <div className="text-ink-faint mb-1">Email</div>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-ink hover:underline normal-case tracking-normal font-sans text-sm"
                      >
                        {profile.email}
                      </a>
                    </div>
                    <div>
                      <div className="text-ink-faint mb-1">Phone</div>
                      <span className="text-ink normal-case tracking-normal font-sans text-sm">
                        {profile.phone}
                      </span>
                    </div>
                    <div>
                      <div className="text-ink-faint mb-1">Location</div>
                      <span className="text-ink normal-case tracking-normal font-sans text-sm">
                        {profile.location}
                      </span>
                    </div>
                    <div>
                      <div className="text-ink-faint mb-1">Status</div>
                      <span className="text-ink normal-case tracking-normal font-sans text-sm">
                        Class of 2029 · Freshman
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </motion.div>

          {/* stats stack — counters animate up on view, glow on hover */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} variant="rise" delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  data-cursor="hover"
                >
                  <GlassCard tilt className="p-6 flex items-baseline justify-between group">
                    <span className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-light leading-none text-ink tabular-nums">
                      <Counter value={s.value} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint text-right max-w-[12rem] group-hover:text-ink transition-colors">
                      {s.label}
                    </span>
                  </GlassCard>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* marquee — running tag of attributes */}
        <Reveal variant="fade" delay={0.4}>
          <div className="mt-12">
            <Marquee />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Continuous learner",
    "Software engineer",
    "Robotics lead",
    "Pianist",
    "Vocalist",
    "Producer",
    "Songwriter",
    "Tennis player",
    "Visual artist",
    "Future founder",
  ];

  return (
    <div className="relative overflow-hidden py-6 border-y border-ink/10 group">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        className="flex gap-12 whitespace-nowrap [animation-play-state:running] group-hover:[animation-play-state:paused]"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.08, color: "var(--ink)" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="font-display text-2xl md:text-4xl font-light tracking-tight text-ink-soft cursor-default"
          >
            {item}
            <span className="ml-12 text-ink-faint">✦</span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
