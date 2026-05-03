"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.18);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="totop"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          data-cursor="cta"
          data-cursor-label="Top"
          className="fixed left-4 bottom-4 z-30 h-12 w-12 rounded-full glass-strong specular flex items-center justify-center text-ink"
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          >
            <path
              d="M7 11 L7 3 M3 7 L7 3 L11 7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
