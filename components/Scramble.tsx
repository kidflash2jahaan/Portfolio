"use client";

import { useEffect, useRef, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz█▓░◇◆";

/**
 * Hover-triggered text scramble. Letters cycle through random glyphs and
 * resolve to the final character one column at a time.
 */
export default function Scramble({
  text,
  className = "",
  trigger = "hover",
  duration = 700,
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "view";
  duration?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  function run() {
    cancel();
    start.current = performance.now();
    const total = text.length;

    const tick = (t: number) => {
      const elapsed = t - start.current;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * total);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (i < resolved || text[i] === " ") {
          s += text[i];
        } else {
          s += POOL[Math.floor(Math.random() * POOL.length)];
        }
      }
      setOut(s);
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setOut(text);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }

  function cancel() {
    if (raf.current != null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }

  useEffect(() => {
    if (trigger !== "view") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  useEffect(() => () => cancel(), []);

  if (trigger === "view") {
    return (
      <span ref={ref} className={className}>
        {out}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      onMouseEnter={run}
      className={`inline-block ${className}`}
    >
      {out}
    </span>
  );
}
