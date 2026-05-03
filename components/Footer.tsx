"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "@/lib/data";
import GlassCard from "./GlassCard";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const letterY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const letterScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const letterOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.4, 1]);

  return (
    <footer id="contact" ref={ref} className="relative px-6 pt-16 pb-12 mt-12">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="rise">
          <GlassCard variant="strong" gleam tilt={false} className="p-10 md:p-16 text-center">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint mb-6"
            >
              ◆ Open to conversation
            </motion.div>

            <h3 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
              Let&apos;s talk.
            </h3>

            <p className="mt-6 mx-auto max-w-xl text-ink-soft text-[15px] md:text-base leading-relaxed">
              Mentors, collaborators, fellow performers, anyone curious — write
              anytime. I read every email, and I usually reply the same day.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Magnetic strength={0.4} range={180}>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  href={`mailto:${profile.email}`}
                  data-cursor="cta"
                  data-cursor-label="Write"
                  className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-ink text-white px-7 py-3.5 text-sm font-medium"
                >
                  <span className="relative z-10">{profile.email}</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                    className="relative z-10"
                  >
                    →
                  </motion.span>
                  <motion.span
                    aria-hidden
                    initial={{ x: "-120%" }}
                    whileHover={{ x: "120%" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.4} range={180}>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  href={`tel:+17147282243`}
                  data-cursor="cta"
                  data-cursor-label="Call"
                  className="glass-subtle rounded-full px-7 py-3.5 text-sm text-ink"
                >
                  {profile.phone}
                </motion.a>
              </Magnetic>
            </div>

            <div className="mt-12 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] font-mono uppercase tracking-[0.18em] text-ink-faint">
              <div>{profile.location}</div>
              <div>References & certificates available on request</div>
              <div>© {new Date().getFullYear()} Jahaan Pardhanani</div>
            </div>
          </GlassCard>
        </Reveal>

        {/* sign-off — scroll-driven scale and float */}
        <div className="mt-16 mb-4 text-center overflow-hidden">
          <motion.div
            style={{ y: letterY, scale: letterScale, opacity: letterOpacity }}
            className="font-display text-[clamp(3rem,12vw,11rem)] font-light leading-[0.85] tracking-[-0.04em] text-ink/10 select-none"
          >
            {"JAHAAN".split("").map((ch, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -16, color: "var(--ink)" }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className="inline-block px-1 cursor-default"
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
