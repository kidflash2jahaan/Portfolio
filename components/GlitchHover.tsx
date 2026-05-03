"use client";

import { useEffect } from "react";

const POOL = "█▓▒░◇◆◈⬡⬢+✦✧#@%&$!?*=<>≡≣≢≠≈/\\|0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Global text-scramble effect for any element marked as a cursor target
 * ([data-cursor="hover"] or [data-cursor="cta"]). When the cursor enters
 * such an element, every text node within is scrambled to weird glyphs and
 * resolves back to the original character-by-character over ~450ms.
 *
 * Implemented as a single delegated mouseover listener on the document, so
 * adding/removing targets at runtime needs no wiring.
 */
export default function GlitchHover() {
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    type Job = {
      raf: number;
      restore: () => void;
    };
    const active = new Map<HTMLElement, Job>();

    const scramble = (root: HTMLElement): Job => {
      // gather all visible text nodes inside `root`, capped to a sane total
      const items: { node: Text; original: string }[] = [];
      let totalChars = 0;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const v = (n as Text).nodeValue;
          if (!v || !v.trim()) return NodeFilter.FILTER_REJECT;
          // skip text nodes inside elements that opt out
          let p: Node | null = n.parentNode;
          while (p && p !== root) {
            if (
              p instanceof HTMLElement &&
              p.dataset.glitch === "off"
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            p = p.parentNode;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      let n: Node | null;
      while ((n = walker.nextNode())) {
        const t = n as Text;
        const v = t.nodeValue ?? "";
        items.push({ node: t, original: v });
        totalChars += v.length;
        if (totalChars > 800) break; // cap so big sections don't get expensive
      }

      const restore = () => {
        for (const { node, original } of items) {
          if (node.parentNode) node.nodeValue = original;
        }
      };

      if (items.length === 0) {
        return { raf: 0, restore };
      }

      const start = performance.now();
      const duration = 450;
      let raf = 0;

      const tick = (t: number) => {
        const elapsed = t - start;
        const progress = Math.min(elapsed / duration, 1);

        for (const { node, original } of items) {
          if (!node.parentNode) continue;
          const len = original.length;
          // reveal characters left-to-right; before reveal, swap to random
          const resolved = Math.floor(progress * len * 1.05);
          let s = "";
          for (let i = 0; i < len; i++) {
            const ch = original[i];
            if (i < resolved || ch === " " || ch === "\n" || ch === "\t") {
              s += ch;
            } else {
              // every-other-frame churn so it visibly shimmers
              s += POOL[(Math.random() * POOL.length) | 0];
            }
          }
          node.nodeValue = s;
        }

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          restore();
        }
      };
      raf = requestAnimationFrame(tick);
      return { raf, restore };
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.closest) return;
      const target = el.closest(
        '[data-cursor="hover"], [data-cursor="cta"]'
      ) as HTMLElement | null;
      if (!target) return;
      if (active.has(target)) return;

      const job = scramble(target);
      active.set(target, job);

      const onLeave = () => {
        const j = active.get(target);
        if (j) {
          cancelAnimationFrame(j.raf);
          j.restore();
          active.delete(target);
        }
        target.removeEventListener("mouseleave", onLeave);
      };
      target.addEventListener("mouseleave", onLeave);
    };

    document.addEventListener("mouseover", onEnter);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      for (const job of active.values()) {
        cancelAnimationFrame(job.raf);
        job.restore();
      }
      active.clear();
    };
  }, []);

  return null;
}
