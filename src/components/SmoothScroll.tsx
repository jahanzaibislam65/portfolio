"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** distance kept clear for the fixed nav */
const NAV_OFFSET = 80;

/**
 * Inertial scrolling, plus it owns every in-page anchor jump.
 *
 * Anchor clicks are always intercepted — including under prefers-reduced-motion,
 * where lenis is skipped — so the fragment never reaches the address bar. The URL
 * stays at the bare site root no matter which section you are on.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let raf = 0;

    if (!reduce) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      });

      const frame = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      // preventDefault is what keeps the fragment out of the URL; we scroll by hand
      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.3 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: "auto" });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
