"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Odometer-style boot tick. When the value scrolls into view, the digits
 * cycle through random values for ~700ms before locking in right-to-left
 * to the real number. Non-numeric prefixes/suffixes are preserved.
 *
 * Hovering the rendered span re-runs the tick from scratch.
 */
export default function Counter({ value }: { value: string }) {
  const parts = useMemo(() => {
    const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    return m ? { number: m[1], suffix: m[2] ?? "" } : null;
  }, [value]);

  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({ done: false });

  const [display, setDisplay] = useState<string>(
    parts ? scrambleDigits(parts.number) : value
  );

  const run = useCallback(() => {
    if (!parts) return;
    const { number, suffix } = parts;
    cancelAnimationFrame(rafRef.current);
    stateRef.current.done = false;
    const start = performance.now();
    const duration = 700;

    const tick = (t: number) => {
      if (stateRef.current.done) return;
      const progress = Math.min((t - start) / duration, 1);
      const lockedFromRight = Math.floor(progress * number.length);
      let out = "";
      for (let i = 0; i < number.length; i++) {
        const fromRight = number.length - 1 - i;
        const ch = number[i];
        if (fromRight < lockedFromRight || ch === ".") {
          out += ch;
        } else {
          out += String.fromCharCode(48 + Math.floor(Math.random() * 10));
        }
      }
      setDisplay(out + suffix);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(number + suffix);
        stateRef.current.done = true;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [parts]);

  useEffect(() => {
    if (!parts) return;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      stateRef.current.done = true;
      cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, [parts, run]);

  if (!parts) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} onMouseEnter={run}>
      {display}
    </span>
  );
}

function scrambleDigits(s: string): string {
  return s
    .split("")
    .map((c) =>
      c === "."
        ? "."
        : String.fromCharCode(48 + Math.floor(Math.random() * 10))
    )
    .join("");
}
