"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 22 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduce) return;
    ry.set((px - 0.5) * 9);
    rx.set((0.5 - py) * 9);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const Wrapper = project.href ? motion.a : motion.div;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ transform: reduce ? undefined : transform, transformStyle: "preserve-3d" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="spotlight-card group relative"
    >
      <Wrapper
        {...(project.href
          ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-white/20 sm:p-8"
      >
        {/* accent wash */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-45 transition-opacity duration-500 group-hover:opacity-100",
            project.accent
          )}
        />
        {/* sweeping sheen */}
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[120%]" />

        <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent/85">
                {project.subtitle}
              </span>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {project.title}
              </h3>
            </div>
            <span
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white/70 transition-all duration-300",
                project.href && "group-hover:border-accent/45 group-hover:bg-accent/15 group-hover:text-white"
              )}
            >
              {project.href ? (
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              ) : (
                <Lock size={15} />
              )}
            </span>
          </div>

          <p className="mt-5 text-pretty text-sm leading-relaxed text-mute sm:text-[0.95rem]">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-white/70">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-[0.75rem] text-mute"
              >
                {s}
              </span>
            ))}
            <span className="ml-auto text-xs text-mute/60">{project.year}</span>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title="Products I've helped ship."
          description="A few platforms I built and maintained — from real-time marketplaces to finance dashboards."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
