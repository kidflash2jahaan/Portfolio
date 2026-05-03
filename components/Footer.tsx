"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 pt-16 pb-12 mt-12">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="rise">
          <GlassCard variant="strong" gleam tilt={false} className="p-10 md:p-16 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint mb-6">
              Open to conversation
            </div>

            <h3 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
              Let&apos;s talk.
            </h3>

            <p className="mt-6 mx-auto max-w-xl text-ink-soft text-[15px] md:text-base leading-relaxed">
              Admission officers, mentors, collaborators, fellow performers — write
              anytime. I read every email, and I usually reply the same day.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink text-white px-7 py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors"
              >
                {profile.email}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:+17147282243`}
                className="glass-subtle rounded-full px-7 py-3.5 text-sm text-ink"
              >
                {profile.phone}
              </motion.a>
            </div>

            <div className="mt-12 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] font-mono uppercase tracking-[0.18em] text-ink-faint">
              <div>{profile.location}</div>
              <div>References & certificates available on request</div>
              <div>© {new Date().getFullYear()} Jahaan Pardhanani</div>
            </div>
          </GlassCard>
        </Reveal>

        {/* sign-off line */}
        <Reveal variant="fade" delay={0.4}>
          <div className="mt-16 mb-4 text-center">
            <div className="font-display text-[clamp(3rem,12vw,11rem)] font-light leading-[0.85] tracking-[-0.04em] text-ink/8 select-none">
              JAHAAN
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
