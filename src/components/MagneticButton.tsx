"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  download,
  external,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60";

  const styles =
    variant === "primary"
      ? "bg-white text-ink shadow-[0_10px_40px_-12px_rgba(94,234,212,0.65)] hover:text-ink"
      : "glass text-white/85 hover:text-white";

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      )}
      {variant === "ghost" && (
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-accent/12 to-accent-2/12 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          download={download}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={cn(base, styles, className)}
        >
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cn(base, styles, className)}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
