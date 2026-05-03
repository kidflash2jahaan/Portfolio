"use client";

import { AnimatePresence, motion } from "motion/react";
import { useImperativeHandle, useState, forwardRef } from "react";

export type ConfettiHandle = {
  fire: (x: number, y: number) => void;
};

type Piece = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  color: string;
  size: number;
};

const COLORS = ["#ffd6e7", "#c7e3ff", "#d6f5e0", "#ece6ff", "#0c0c0e", "#ffffff"];

let nextId = 0;

const Confetti = forwardRef<ConfettiHandle>(function Confetti(_props, ref) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useImperativeHandle(ref, () => ({
    fire: (x: number, y: number) => {
      const burst: Piece[] = Array.from({ length: 36 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 80 + Math.random() * 220;
        return {
          id: nextId++,
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed - 100,
          rot: Math.random() * 720 - 360,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 4 + Math.random() * 8,
        };
      });
      setPieces((p) => [...p, ...burst]);
      const ids = burst.map((b) => b.id);
      window.setTimeout(() => {
        setPieces((p) => p.filter((q) => !ids.includes(q.id)));
      }, 1300);
    },
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[180]">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, rotate: 0, opacity: 1, scale: 0.6 }}
            animate={{
              x: p.x + p.dx,
              y: p.y + p.dy + 320, // gravity
              rotate: p.rot,
              opacity: 0,
              scale: 1,
            }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              borderRadius: 2,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

export default Confetti;
