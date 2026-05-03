"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * Translucent overlay whose colour shifts as the user scrolls — gives the
 * page a subtle warm/cool/green/lilac progression top to bottom.
 */
export default function ScrollHueLayer() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [
      "rgba(255, 244, 232, 0)",
      "rgba(255, 214, 231, 0.06)",
      "rgba(199, 227, 255, 0.08)",
      "rgba(214, 245, 224, 0.07)",
      "rgba(236, 230, 255, 0.05)",
    ]
  );

  return (
    <motion.div
      aria-hidden
      style={{ backgroundColor: bg }}
      className="pointer-events-none fixed inset-0 -z-[8]"
    />
  );
}
