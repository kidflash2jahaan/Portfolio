"use client";

import { useEffect } from "react";

const POOL = "█▓▒░◇◆⬡⬢+✦✧#@%&$!?*=<>≡≣≢≠≈/\\|0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Global text-scramble effect for any element marked as a cursor target.
 * When the cursor enters a [data-cursor="hover"] / [data-cursor="cta"]
 * element, every visible text node inside is replaced with random glyphs
 * and resolves back to the original character-by-character over ~450ms.
 *
 * Robustness:
 *  - Each running scramble has a mutable `state` ref. Cancel sets
 *    `state.cancelled` AND cancels the latest raf id stored in the same
 *    ref, so a leak between ticks is impossible (the previous bug where
 *    cancel only stopped the very first frame is fixed).
 *  - Cancel always restores the original text immediately.
 *  - On unmount or fast section switching, every active job is cancelled
 *    and restored.
 */
export default function GlitchHover() {
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    type Job = { cancel: () => void };
    const active = new Map<HTMLElement, Job>();

    const scramble = (root: HTMLElement): Job => {
      const items: { node: Text; original: string }[] = [];
      let totalChars = 0;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const v = (n as Text).nodeValue;
          if (!v || !v.trim()) return NodeFilter.FILTER_REJECT;
          let p: Node | null = n.parentNode;
          while (p && p !== root) {
            if (p instanceof HTMLElement && p.dataset.glitch === "off") {
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
        if (totalChars > 800) break;
      }

      const state = { rafId: 0, cancelled: false };

      const restore = () => {
        for (const { node, original } of items) {
          if (node.parentNode) node.nodeValue = original;
        }
      };

      const cancel = () => {
        state.cancelled = true;
        if (state.rafId) cancelAnimationFrame(state.rafId);
        restore();
      };

      if (items.length === 0) return { cancel };

      const start = performance.now();
      const duration = 450;

      const tick = (t: number) => {
        if (state.cancelled) return;
        const elapsed = t - start;
        const progress = Math.min(elapsed / duration, 1);

        for (const { node, original } of items) {
          if (!node.parentNode) continue;
          const len = original.length;
          const resolved = Math.floor(progress * len * 1.05);
          let s = "";
          for (let i = 0; i < len; i++) {
            const ch = original[i];
            if (i < resolved || ch === " " || ch === "\n" || ch === "\t") {
              s += ch;
            } else {
              s += POOL[(Math.random() * POOL.length) | 0];
            }
          }
          node.nodeValue = s;
        }

        if (progress < 1) {
          state.rafId = requestAnimationFrame(tick);
        } else {
          restore();
        }
      };

      state.rafId = requestAnimationFrame(tick);
      return { cancel };
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
          j.cancel();
          active.delete(target);
        }
        target.removeEventListener("mouseleave", onLeave);
      };
      target.addEventListener("mouseleave", onLeave);
    };

    document.addEventListener("mouseover", onEnter);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      for (const job of active.values()) job.cancel();
      active.clear();
    };
  }, []);

  return null;
}
