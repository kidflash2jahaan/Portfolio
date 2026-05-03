"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Snap = { x: number; y: number; w: number; h: number; r: number } | null;
type Burst = { id: number; x: number; y: number };

/**
 * Liquid glass cursor.
 *  - Free state: a translucent blob that stretches in the direction of motion
 *    (velocity-driven scaleX + rotation), with a smaller satellite trailing behind.
 *  - Snap state: when hovering interactive elements, the blob morphs into a
 *    rounded halo perfectly framing the target.
 *  - Click: emits a radial burst of glass droplets.
 *
 * Hidden on coarse pointers (touch).
 */
export default function Cursor() {
  // raw pointer
  const px = useMotionValue(-300);
  const py = useMotionValue(-300);

  // followed (lagged) blob position
  const bx = useSpring(px, { stiffness: 600, damping: 32, mass: 0.5 });
  const by = useSpring(py, { stiffness: 600, damping: 32, mass: 0.5 });

  // satellite — lags much further behind, creates the lava-lamp feel
  const tx = useSpring(px, { stiffness: 110, damping: 18, mass: 0.7 });
  const ty = useSpring(py, { stiffness: 110, damping: 18, mass: 0.7 });

  // velocity-derived stretch + angle
  const stretchX = useMotionValue(1);
  const stretchY = useMotionValue(1);
  const rot = useMotionValue(0);

  const [snap, setSnap] = useState<Snap>(null);
  const [pressed, setPressed] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const burstId = useRef(0);

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.documentElement.style.setProperty("cursor", "none");

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

      const speed = Math.hypot(vx, vy);
      // map speed → stretch. Cap at 2.4x.
      const s = Math.min(1 + speed * 0.55, 2.4);
      // Stretch along velocity vector → x-axis after rotating the blob.
      stretchX.set(s);
      stretchY.set(Math.max(0.55, 1 / Math.sqrt(s)));
      if (speed > 0.05) {
        rot.set((Math.atan2(vy, vx) * 180) / Math.PI);
      }

      // detect interactive snap target
      const el = e.target as HTMLElement | null;
      const target =
        el?.closest(
          'a, button, [role="button"], [data-cursor="hover"], [data-cursor="cta"]'
        ) ?? null;

      if (target) {
        const r = (target as HTMLElement).getBoundingClientRect();
        const radius = parseFloat(getComputedStyle(target as HTMLElement).borderRadius || "12");
        setSnap({
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          w: r.width + 16,
          h: r.height + 16,
          r: Math.max(radius + 4, 14),
        });
      } else {
        setSnap(null);
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
      document.documentElement.style.removeProperty("cursor");
    };
  }, [px, py, stretchX, stretchY, rot]);

  return (
    <>
      {/* satellite — only visible in free state */}
      <motion.div
        aria-hidden
        animate={{ opacity: snap ? 0 : 0.7, scale: pressed ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        style={{ x: tx, y: ty }}
        className="pointer-events-none fixed left-0 top-0 z-[190] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-md border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,1)] mix-blend-multiply" />
      </motion.div>

      {/* main blob — stretches and rotates with velocity, or snaps as a halo */}
      <motion.div
        aria-hidden
        style={
          snap
            ? { x: snap.x, y: snap.y }
            : { x: bx, y: by, scaleX: stretchX, scaleY: stretchY, rotate: rot }
        }
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
          stiffness: snap ? 380 : 700,
          damping: snap ? 32 : 28,
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

      {/* center dot — sharp pointer reference, hidden when snapped */}
      <motion.div
        aria-hidden
        animate={{ opacity: snap ? 0 : 1, scale: pressed ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        style={{ x: bx, y: by }}
        className="pointer-events-none fixed left-0 top-0 z-[201] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-ink" />
      </motion.div>

      {/* click bursts — radial droplets */}
      <div className="pointer-events-none fixed inset-0 z-[199]">
        <AnimatePresence>
          {bursts.map((b) =>
            Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dist = 56 + Math.random() * 28;
              return (
                <motion.span
                  key={`${b.id}-${i}`}
                  initial={{
                    x: b.x,
                    y: b.y,
                    opacity: 0.9,
                    scale: 0.4,
                  }}
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
