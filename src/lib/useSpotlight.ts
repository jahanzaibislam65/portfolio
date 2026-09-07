"use client";

import { useCallback } from "react";

/** Feeds --mx/--my custom properties so `.spotlight-card` can follow the pointer. */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}
