"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Huge faint display text that lives at the top of a section and parallaxes
 * vertically against the page scroll, creating a sense of depth behind the
 * actual content.
 */
export default function ParallaxText({
  text,
  align = "center",
  opacity = 0.045,
  fromY = "30%",
  toY = "-50%",
}: {
  text: string;
  align?: "left" | "center" | "right";
  opacity?: number;
  fromY?: string;
  toY?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [fromY, toY]);
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [0, -1.2, 0]);

  const justify =
    align === "left" ? "justify-start pl-6" : align === "right" ? "justify-end pr-6" : "justify-center";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 -z-[1] overflow-hidden pointer-events-none flex items-start ${justify}`}
    >
      <motion.div
        style={{ y, skewX: skew, color: `rgba(12,12,14,${opacity})` }}
        className="font-display text-[clamp(8rem,20vw,18rem)] font-medium leading-[0.85] tracking-[-0.05em] select-none whitespace-nowrap mt-[2vh]"
      >
        {text}
      </motion.div>
    </div>
  );
}
