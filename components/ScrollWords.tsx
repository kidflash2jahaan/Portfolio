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
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");
  const total = words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / total;
        const end = start + 1.6 / total; // slight overlap between words
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
