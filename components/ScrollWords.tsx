"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

/**
 * Paragraph that reveals word by word as it scrolls into the viewport.
 * Words start dim and fade up to full opacity in sequence.
 */
export default function ScrollWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.65"],
  });

  const words = text.split(" ");
  const total = words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        // distribute ranges so the LAST word ends exactly at scroll-progress 1.
        // window covers a slight overlap; stride spaces them evenly across [0, 1-window].
        const window = Math.min(1.6 / total, 0.5);
        const stride = total > 1 ? (1 - window) / (total - 1) : 0;
        const start = i * stride;
        const end = Math.min(start + window, 1);
        return <Word key={i} text={w} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

function Word({
  text,
  range,
  progress,
}: {
  text: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const blur = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="inline-block mr-[0.25em]"
    >
      {text}
    </motion.span>
  );
}
