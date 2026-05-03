"use client";

import { animate, useInView, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to `to` when scrolled into view. Preserves any non-numeric
 * suffix (like "+", "L9") by extracting the number out of `value`.
 */
export default function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState<string>(match ? "0" : value);

  useEffect(() => {
    if (!inView || !match) return;
    const target = parseFloat(match[1]);
    const controls = animate(mv, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = mv.on("change", (v) => {
      const formatted = Number.isInteger(target)
        ? Math.round(v).toString()
        : v.toFixed(1);
      setDisplay(formatted);
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, match]);

  if (!match) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {display}
      {match[2]}
    </span>
  );
}
