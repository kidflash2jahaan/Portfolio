"use client";

import { motion, useScroll, useTransform } from "motion/react";

const links = [
  { href: "#about", label: "About" },
  { href: "#tech", label: "Technology" },
  { href: "#music", label: "Music" },
  { href: "#awards", label: "Awards" },
  { href: "#vision", label: "Vision" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ width }}
        className="fixed left-0 top-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-ink to-transparent origin-left"
      />

      <motion.nav
        initial={{ y: -24, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
      >
        <div className="glass-strong specular rounded-full px-2 py-2 flex items-center gap-1">
          <a
            href="#top"
            className="rounded-full px-4 py-1.5 text-[13px] font-medium tracking-tight text-ink hover:bg-white/40 transition-colors"
          >
            JP
          </a>
          <span className="h-4 w-px bg-ink/15" />
          <ul className="flex items-center">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-1.5 text-[13px] text-ink-soft hover:text-ink hover:bg-white/40 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-ink/15" />
          <a
            href="#contact"
            className="group rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white bg-ink hover:bg-ink-soft transition-colors flex items-center gap-1.5"
          >
            Contact
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </motion.nav>
    </>
  );
}
