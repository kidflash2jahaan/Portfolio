"use client";

import { motion } from "motion/react";

/** Three stacked horizontal text rows scrolling at different speeds and
 * directions. Pure decorative running headline. */
export default function StackedMarquee({ rows }: { rows: string[][] }) {
  return (
    <div className="relative overflow-hidden border-y border-ink/10 py-3 my-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      {rows.map((items, ri) => {
        const reverse = ri % 2 === 1;
        const speed = 28 + ri * 8;
        return (
          <motion.div
            key={ri}
            animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
            className="flex gap-8 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.18em]"
            style={{
              opacity: ri === 0 ? 0.65 : ri === 1 ? 1 : 0.5,
              color:
                ri === 1
                  ? "var(--ink)"
                  : ri === 0
                  ? "var(--ink-soft)"
                  : "var(--ink-faint)",
              padding: "2px 0",
            }}
          >
            {[...items, ...items, ...items].map((it, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span>{it}</span>
                <span className="text-ink-faint">●</span>
              </span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
