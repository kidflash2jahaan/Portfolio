"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type Snap = { cx: number; cy: number; w: number; h: number; r: number } | null;
type Burst = { id: number; x: number; y: number };

/**
 * Liquid glass cursor.
 *  - Free state: a translucent blob that stretches and rotates with cursor
 *    velocity, with a smaller satellite trailing behind.
 *  - Snap state: when hovering interactive elements, the blob morphs into a
 *    halo around the target. Stretch and rotation are immediately animated
 *    back to neutral and frozen so cursor movement inside the target cannot
 *    drive the blob into a spin.
 *  - Click: emits a radial burst of glass droplets.
 */
export default function Cursor() {
  // raw pointer
  const px = useMotionValue(-400);
  const py = useMotionValue(-400);

  // single source target for the blob — either cursor position or snap centre.
  // The bx/by springs lerp to it, so leaving a snap is smooth.
  const tx = useMotionValue(-400);
  const ty = useMotionValue(-400);

  const bx = useSpring(tx, { stiffness: 700, damping: 40, mass: 0.4 });
  const by = useSpring(ty, { stiffness: 700, damping: 40, mass: 0.4 });

  // satellite — much lazier
  const stx = useSpring(tx, { stiffness: 110, damping: 18, mass: 0.7 });
  const sty = useSpring(ty, { stiffness: 110, damping: 18, mass: 0.7 });

  // velocity-driven shape values
  const sx = useMotionValue(1);
  const sy = useMotionValue(1);
  const rot = useMotionValue(0);

  const [snap, setSnap] = useState<Snap>(null);
  const [pressed, setPressed] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const burstId = useRef(0);
  const snapRef = useRef<Snap>(null);

  // when snap engages, slam stretch/rotation back to neutral fast.
  // when snap releases, leave them alone — the next mousemove will pick up
  // velocity and they'll drive naturally from there.
  useEffect(() => {
    if (!snap) return;
    const a1 = animate(sx, 1, { duration: 0.18, ease: [0.22, 1, 0.36, 1] });
    const a2 = animate(sy, 1, { duration: 0.18, ease: [0.22, 1, 0.36, 1] });
    const a3 = animate(rot, 0, { duration: 0.18, ease: [0.22, 1, 0.36, 1] });
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [snap, sx, sy, rot]);

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.documentElement.style.cursor = "none";

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();

    const move = (e: MouseEvent) => {
      px.set(e.clientX);
      py.set(e.clientY);

      const now = performance.now();
      const dt = Math.max(8, now - lastT);
      const vx = (e.clientX - lastX) / dt;
      const vy = (e.clientY - lastY) / dt;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;

      // velocity-driven shape ONLY when not snapped — prevents spin while
      // hovering inside an interactive target.
      if (!snapRef.current) {
        const speed = Math.hypot(vx, vy);
        const s = Math.min(1 + speed * 0.5, 2.2);
        sx.set(s);
        sy.set(Math.max(0.6, 1 / Math.sqrt(s)));
        if (speed > 0.06) {
          // smooth angle wrap to avoid 179° → -179° flips
          const next = (Math.atan2(vy, vx) * 180) / Math.PI;
          const cur = rot.get();
          let delta = next - cur;
          while (delta > 180) delta -= 360;
          while (delta < -180) delta += 360;
          rot.set(cur + delta);
        }
      }

      // snap detection
      const el = e.target as HTMLElement | null;
      const target = el?.closest(
        'a, button, [role="button"], [data-cursor="hover"], [data-cursor="cta"]'
      ) as HTMLElement | null;

      if (target) {
        const r = target.getBoundingClientRect();
        const radius = parseFloat(getComputedStyle(target).borderRadius || "12");
        const next: Snap = {
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          w: r.width + 16,
          h: r.height + 16,
          r: Math.max(radius + 4, 14),
        };
        const prev = snapRef.current;
        const sameTarget =
          prev &&
          Math.abs(prev.cx - next.cx) < 2 &&
          Math.abs(prev.cy - next.cy) < 2 &&
          Math.abs(prev.w - next.w) < 2 &&
          Math.abs(prev.h - next.h) < 2;
        if (!sameTarget) {
          snapRef.current = next;
          setSnap(next);
        }
        tx.set(next.cx);
        ty.set(next.cy);
      } else {
        if (snapRef.current) {
          snapRef.current = null;
          setSnap(null);
        }
        tx.set(e.clientX);
        ty.set(e.clientY);
      }
    };

    const down = (e: MouseEvent) => {
      setPressed(true);
      const id = ++burstId.current;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((p) => p.id !== id));
      }, 700);
    };
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.style.cursor = "";
    };
  }, [px, py, tx, ty, sx, sy, rot]);

  return (
    <>
      {/* satellite — lazy follower, fades in snap state */}
      <motion.div
        aria-hidden
        animate={{ opacity: snap ? 0 : 0.7, scale: pressed ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        style={{ x: stx, y: sty }}
        className="pointer-events-none fixed left-0 top-0 z-[190] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-md border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,1)] mix-blend-multiply" />
      </motion.div>

      {/* main blob */}
      <motion.div
        aria-hidden
        style={{ x: bx, y: by, scaleX: sx, scaleY: sy, rotate: rot }}
        animate={
          snap
            ? {
                width: snap.w,
                height: snap.h,
                borderRadius: snap.r,
                opacity: 1,
              }
            : {
                width: pressed ? 18 : 28,
                height: pressed ? 18 : 28,
                borderRadius: 999,
                opacity: 1,
              }
        }
        transition={{
          type: "spring",
          stiffness: snap ? 420 : 700,
          damping: snap ? 36 : 28,
          mass: 0.5,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.32) 100%)",
            backdropFilter: "blur(10px) saturate(180%)",
            WebkitBackdropFilter: "blur(10px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: "inherit",
            boxShadow:
              "inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.5), 0 6px 18px -6px rgba(8,9,11,0.18)",
          }}
        />
      </motion.div>

      {/* center dot */}
      <motion.div
        aria-hidden
        animate={{ opacity: snap ? 0 : 1, scale: pressed ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        style={{ x: bx, y: by }}
        className="pointer-events-none fixed left-0 top-0 z-[201] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-ink" />
      </motion.div>

      {/* click bursts */}
      <div className="pointer-events-none fixed inset-0 z-[199]">
        <AnimatePresence>
          {bursts.map((b) =>
            Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dist = 56 + Math.random() * 28;
              return (
                <motion.span
                  key={`${b.id}-${i}`}
                  initial={{ x: b.x, y: b.y, opacity: 0.9, scale: 0.4 }}
                  animate={{
                    x: b.x + Math.cos(angle) * dist,
                    y: b.y + Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: 8, height: 8 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1)] mix-blend-multiply"
                />
              );
            })
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
