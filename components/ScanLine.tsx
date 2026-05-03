"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Thin gradient line that sweeps once across its parent when the parent
 * enters the viewport. Drop inside any glass card / section as a child.
 */
export default function ScanLine({
  direction = "horizontal",
  delay = 0,
}: {
  direction?: "horizontal" | "vertical";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  if (direction === "horizontal") {
    return (
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={inView ? { x: "120%", opacity: [0, 1, 1, 0] } : undefined}
          transition={{
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            delay,
            times: [0, 0.15, 0.85, 1],
          }}
          className="absolute inset-y-0 -left-1/2 w-[60%] bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <motion.div
        initial={{ y: "-120%", opacity: 0 }}
        animate={inView ? { y: "120%", opacity: [0, 1, 1, 0] } : undefined}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          delay,
          times: [0, 0.15, 0.85, 1],
        }}
        className="absolute inset-x-0 -top-1/2 h-[60%] bg-gradient-to-b from-transparent via-white/70 to-transparent mix-blend-overlay"
      />
    </div>
  );
}
