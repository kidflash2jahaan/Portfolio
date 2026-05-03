"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Odometer-style boot tick. When the value scrolls into view, the digits
 * cycle through random values for ~700ms before locking in right-to-left
 * to the real number. Non-numeric prefixes/suffixes are preserved.
 */
export default function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(match ? scrambleDigits(match[1]) : value);

  useEffect(() => {
    if (!match) return;
    const number = match[1];
    const suffix = match[2] ?? "";
    let raf = 0;
    let done = false;
    let started = false;
    let start = 0;
    const duration = 700;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            start = performance.now();
            raf = requestAnimationFrame(tick);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    function tick(t: number) {
      if (done) return;
      const progress = Math.min((t - start) / duration, 1);
      // lock digits right-to-left as progress advances
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
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(number + suffix);
        done = true;
      }
    }

    if (ref.current) obs.observe(ref.current);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [match]);

  if (!match) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{display}</span>;
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
