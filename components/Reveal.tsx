"use client";

import { motion, useInView } from "motion/react";
import type { Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const variants: Record<string, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className = "",
  amount = 0.25,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
