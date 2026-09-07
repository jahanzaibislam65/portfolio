"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Soft trailing glow + dot. Disabled on touch / coarse pointers. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || noMotion) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [data-cursor='hover']")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.9 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 bg-accent/[0.06] backdrop-blur-[1px] md:block"
      />
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0.4 : 1 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
      />
    </>
  );
}
