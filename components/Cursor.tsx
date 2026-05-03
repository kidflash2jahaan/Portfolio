"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Engineering-reticle cursor:
 *   ◇ a tiny solid square dot (instantly follows the pointer — no spring lag)
 *   ◇ a mono coordinate readout to the right showing live X,Y
 *   ◇ when hovering interactive elements, a thin square outline appears around it
 *
 * Hidden on coarse pointers (touch) and over text-input fields.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.documentElement.style.cursor = "none";
    document.documentElement.classList.add("cursor-hidden");

    let raf = 0;
    let nx = 0;
    let ny = 0;
    let dx = 0;
    let dy = 0;

    const tick = () => {
      // dot follows instantly; ring lerps a tiny amount for breath
      dx += (nx - dx) * 0.45;
      dy += (ny - dy) * 0.45;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${nx + 14}px, ${ny + 14}px, 0)`;
        labelRef.current.textContent = `${Math.round(nx)} · ${Math.round(ny)}`;
      }
      raf = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      nx = e.clientX;
      ny = e.clientY;
      if (hidden) setHidden(false);
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        'a, button, [role="button"], [data-cursor="hover"], [data-cursor="cta"], input, textarea, select'
      );
      const isInput = !!el?.closest("input, textarea, select");
      if (isInput) {
        document.documentElement.style.cursor = "auto";
      } else {
        document.documentElement.style.cursor = "none";
      }
      setActive(interactive && !isInput);
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.style.cursor = "";
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [hidden]);

  const opacity = hidden ? 0 : 1;

  return (
    <>
      {/* outline ring — appears on interactive hover */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ opacity }}
      >
        <div
          className="border border-ink/70 transition-[width,height,border-radius,opacity,border-color] duration-200 ease-out"
          style={{
            width: active ? 36 : 0,
            height: active ? 36 : 0,
            borderRadius: 4,
            transform: pressed ? "scale(0.85)" : "scale(1)",
            transitionDuration: pressed ? "120ms" : "200ms",
          }}
        />
      </div>

      {/* solid square dot — main pointer reference, follows instantly */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ opacity }}
      >
        <div
          className="bg-ink transition-[transform] duration-150 ease-out"
          style={{
            width: 6,
            height: 6,
            transform: pressed ? "scale(0.5)" : active ? "scale(0.6)" : "scale(1)",
          }}
        />
      </div>

      {/* mono coordinate readout */}
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint mix-blend-multiply will-change-transform"
        style={{ opacity: hidden ? 0 : active ? 1 : 0.5 }}
      />
    </>
  );
}
