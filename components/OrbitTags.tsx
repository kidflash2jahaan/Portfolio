"use client";

import { motion } from "motion/react";

/**
 * Three small mono labels that orbit slowly around the wrapped child at
 * different radii and speeds. Drop around the JP avatar to give it
 * planetary-style accent labels.
 */
export default function OrbitTags({
  tags,
  children,
}: {
  tags: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="relative z-10">{children}</div>

      {tags.map((tag, i) => {
        const period = 14 + i * 4;
        const radius = 56 + i * 14;
        const offset = (i * 360) / tags.length;
        return (
          <motion.div
            key={tag}
            aria-hidden
            animate={{ rotate: [offset, offset + 360] }}
            transition={{ duration: period, ease: "linear", repeat: Infinity }}
            className="pointer-events-none absolute inset-0"
          >
            <motion.div
              animate={{ rotate: [-offset, -offset - 360] }}
              transition={{ duration: period, ease: "linear", repeat: Infinity }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${radius}px, 0)`,
              }}
              className="font-mono text-[9px] uppercase tracking-[0.20em] text-ink/55 px-2 py-1 rounded-full bg-white/40 backdrop-blur-md border border-white/55 whitespace-nowrap"
            >
              {tag}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
