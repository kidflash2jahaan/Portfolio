"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = Omit<HTMLMotionProps<"div">, "ref"> & {
  children: ReactNode;
  variant?: "subtle" | "default" | "strong";
  tilt?: boolean;
  gleam?: boolean;
};

const variantClasses = {
  subtle: "glass-subtle",
  default: "glass",
  strong: "glass-strong",
};

/**
 * Glass card with optional 3D tilt that follows the cursor.
 * Liquid feel comes from a moving specular highlight tracking the mouse position.
 */
export default function GlassCard({
  children,
  variant = "default",
  tilt = true,
  gleam = false,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 180,
    damping: 18,
  });
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 180,
    damping: 18,
  });

  const lightX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(my, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !tilt) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    if (!tilt) return;
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1200 } : undefined}
      className={`relative overflow-hidden rounded-squircle ${variantClasses[variant]} ${
        gleam ? "edge-gleam" : ""
      } ${className}`}
      {...rest}
    >
      {/* moving specular highlight that tracks the cursor */}
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(45% 60% at var(--lx) var(--ly), rgba(255,255,255,0.85), transparent 60%)`,
          ["--lx" as string]: lightX,
          ["--ly" as string]: lightY,
        }}
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
      />

      {/* subtle inner ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40"
      />

      <div className="relative">{children}</div>
    </motion.div>
  );
}
