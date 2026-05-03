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
  const words = title.split(" ");

  return (
    <div className="mb-6 md:mb-10">
      {/* kicker row */}
      <Reveal variant="fade">
        <div className="flex items-center gap-4 mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
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

      {/* title — clip-path char reveal, tighter mono scale */}
      <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.04em] text-ink max-w-3xl">
        <span className="inline-block">
          {words.map((word, wi) => {
            const chars = word.split("");
            return (
              <span key={wi} className="inline-block whitespace-nowrap">
                {chars.map((c, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0, y: 18, clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      clipPath: "inset(0% 0 0 0)",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.025 * (wi * 6 + ci),
                    }}
                    className="inline-block"
                  >
                    {c}
                  </motion.span>
                ))}
                {wi < words.length - 1 && <span className="inline-block w-[0.32em]" />}
              </span>
            );
          })}
        </span>
      </h2>

      {description && (
        <Reveal variant="rise" delay={0.1}>
          <p className="mt-3 max-w-2xl text-[14px] md:text-[15px] text-ink-soft leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
