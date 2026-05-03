"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  // split title into words → words into chars for clip-path stagger
  const words = title.split(" ");

  return (
    <div className="mb-8 md:mb-12">
      {/* kicker row with animated rule */}
      <Reveal variant="fade">
        <div className="flex items-center gap-4 mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {index}
          </motion.span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-px flex-1 max-w-[80px] bg-ink/15 origin-left"
          />
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {kicker}
          </motion.span>
        </div>
      </Reveal>

      {/* title — clip-path char reveal */}
      <h2 className="font-display text-[clamp(2.2rem,5.6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink max-w-4xl">
        <span className="inline-block">
          {words.map((word, wi) => {
            const chars = word.split("");
            return (
              <span key={wi} className="inline-block whitespace-nowrap">
                {chars.map((c, ci) => (
                  <motion.span
                    key={ci}
                    initial={{
                      opacity: 0,
                      y: 40,
                      clipPath: "inset(100% 0 0 0)",
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      clipPath: "inset(0% 0 0 0)",
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.95,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.04 * (wi * 6 + ci),
                    }}
                    className="inline-block"
                  >
                    {c}
                  </motion.span>
                ))}
                {wi < words.length - 1 && (
                  <span className="inline-block w-[0.32em]" />
                )}
              </span>
            );
          })}
        </span>
      </h2>

      {description && (
        <Reveal variant="rise" delay={0.1}>
          <p className="mt-6 max-w-2xl text-[15px] md:text-base text-ink-soft leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
