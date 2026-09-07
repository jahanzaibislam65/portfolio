"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0.3..1 — drives size, alpha and parallax
  r: number;
  tw: number; // twinkle phase
  hue: string;
};

const HUES = ["0,212,255", "124,58,237", "236,72,153", "255,255,255", "255,255,255"];

/**
 * Depth-parallax particle field. Drifts on its own, leans toward the pointer,
 * and links nearby particles with faint lines. Pauses when off-screen.
 */
export function Starfield({ density = 0.00009 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let t = 0;
    let running = true;

    // pointer lean, smoothed
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = dpr();
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(140, Math.max(40, Math.round(width * height * density)));
      stars = Array.from({ length: count }, () => {
        const z = 0.3 + Math.random() * 0.7;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: z * 1.5 + Math.random() * 0.6,
          tw: Math.random() * Math.PI * 2,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        };
      });
    };

    const draw = () => {
      t += 0.006;
      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        // slow upward drift, wrapping
        s.y -= s.z * 0.14;
        if (s.y < -8) {
          s.y = height + 8;
          s.x = Math.random() * width;
        }

        const px = s.x + eased.x * s.z * 34;
        const py = s.y + eased.y * s.z * 34;
        const alpha = (0.25 + 0.55 * Math.abs(Math.sin(t * 1.6 + s.tw))) * s.z;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${alpha.toFixed(3)})`;
        ctx.fill();

        // soft halo on the nearest particles only
        if (s.z > 0.85) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.hue},${(alpha * 0.07).toFixed(3)})`;
          ctx.fill();
        }
      }

      // constellation links between near neighbours
      ctx.lineWidth = 0.6;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        if (a.z < 0.7) continue;
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          if (b.z < 0.7) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 16900) continue; // 130px
          const o = (1 - Math.sqrt(d2) / 130) * 0.16;
          ctx.beginPath();
          ctx.moveTo(a.x + eased.x * a.z * 34, a.y + eased.y * a.z * 34);
          ctx.lineTo(b.x + eased.x * b.z * 34, b.y + eased.y * b.z * 34);
          ctx.strokeStyle = `rgba(0,212,255,${o.toFixed(3)})`;
          ctx.stroke();
        }
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onVisibility = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
