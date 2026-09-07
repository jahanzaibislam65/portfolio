"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import portrait from "../../public/myImage.jpeg";

/** chips that hover around the frame, each drifting on its own clock */
const CHIPS = [
  { label: "React", className: "-left-6 top-[12%]", delay: 0, color: "#00d4ff" },
  { label: "Next.js", className: "-right-5 top-[28%]", delay: -3.5, color: "#ffffff" },
  { label: "Node.js", className: "-left-8 top-[58%]", delay: -6, color: "#10b981" },
  { label: "TypeScript", className: "-right-7 top-[74%]", delay: -1.8, color: "#7c3aed" },
];

/** small dots riding an orbit ring behind the frame */
const ORBIT_DOTS = 6;

/**
 * Dot positions on the ring: centre + radius at each angle.
 *
 * Rounded to 3dp, because Math.cos/Math.sin precision is implementation-defined
 * in ECMAScript — Node and the browser can disagree in the last ULP, which turns
 * "25%" into "24.99999999999998%" on the client and breaks hydration.
 */
const ORBIT_POSITIONS = Array.from({ length: ORBIT_DOTS }, (_, i) => {
  const a = ((2 * Math.PI) / ORBIT_DOTS) * i;
  return {
    left: `${(50 + 50 * Math.cos(a)).toFixed(3)}%`,
    top: `${(50 + 50 * Math.sin(a)).toFixed(3)}%`,
  };
});

export function Portrait() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 20 });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * 16);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[330px] lg:max-w-[380px]"
    >
      {/* pulsing glow behind everything */}
      <motion.div
        aria-hidden
        animate={reduce ? {} : { opacity: [0.45, 0.8, 0.45], scale: [0.94, 1.06, 0.94] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.30),rgba(124,58,237,0.18)_45%,transparent_70%)] blur-3xl"
      />

      {/* counter-rotating dashed rings */}
      {!reduce && (
        <>
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/20"
            style={{ animation: "spin-cw 34s linear infinite" }}
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[134%] w-[134%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-accent-2/20"
            style={{ animation: "spin-ccw 46s linear infinite" }}
          >
            {ORBIT_POSITIONS.map((pos, i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-3/70 shadow-[0_0_10px_2px] shadow-accent-3/40"
                style={pos}
              />
            ))}
          </div>
        </>
      )}

      {/* the frame itself — idle float + cursor tilt */}
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduce ? undefined : { animation: "drift 9s ease-in-out infinite" }}
      >
        <motion.div style={{ transform: reduce ? undefined : transform }} className="preserve-3d">
          <div className="glow-border rounded-[2rem] p-[2px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="group relative overflow-hidden rounded-[calc(2rem-2px)] bg-ink-2">
              <Image
                src={portrait}
                alt="Jahanzaib Islam"
                priority
                placeholder="blur"
                // the source is already a compressed 960x1280 JPEG; re-encoding at
                // the default quality 75 visibly softens it, so ask for near-lossless
                quality={95}
                sizes="(min-width: 1024px) 380px, 330px"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* colour grade + bottom fade so the hero text keeps priority */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/12 to-transparent" />
              {/* soft-light rather than overlay: tints without crushing midtone detail */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/12 mix-blend-soft-light" />

              {/* sweeping scan line */}
              {!reduce && (
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,transparent,rgba(0,212,255,0.22),transparent)]"
                  style={{ animation: "portrait-scan 5.5s ease-in-out infinite" }}
                />
              )}

              {/* HUD corner brackets */}
              {(
                [
                  "left-3 top-3 border-l-2 border-t-2 rounded-tl-lg",
                  "right-3 top-3 border-r-2 border-t-2 rounded-tr-lg",
                  "left-3 bottom-3 border-l-2 border-b-2 rounded-bl-lg",
                  "right-3 bottom-3 border-r-2 border-b-2 rounded-br-lg",
                ] as const
              ).map((pos, i) => (
                <motion.span
                  key={pos}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  className={`pointer-events-none absolute h-7 w-7 border-accent/70 ${pos}`}
                />
              ))}

              {/* status strip */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-white/10 bg-ink/70 px-3 py-2 backdrop-blur-md">
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/80">
                  <span className="relative grid h-3 w-3 place-items-center">
                    <span className="animate-pulse-ring absolute h-1.5 w-1.5 rounded-full bg-accent-4" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-4" />
                  </span>
                  Open to work
                </span>
                <span className="font-display text-[11px] font-medium text-accent">Lahore, PK</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* floating tech chips */}
      {CHIPS.map((chip) => (
        <motion.span
          key={chip.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 + Math.abs(chip.delay) * 0.06 }}
          whileHover={{ scale: 1.12 }}
          style={
            reduce
              ? undefined
              : { animation: "drift 7s ease-in-out infinite", animationDelay: `${chip.delay}s` }
          }
          className={`glass absolute z-20 hidden whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-lg sm:block ${chip.className}`}
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: chip.color }} />
          {chip.label}
        </motion.span>
      ))}
    </motion.div>
  );
}
