"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/** Counts 0 -> value once the element scrolls into view. */
export function Counter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}
