"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Briefcase, Check } from "lucide-react";
import { experience } from "@/lib/data";
import { useSpotlight } from "@/lib/useSpotlight";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const onMove = useSpotlight<HTMLDivElement>();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been building."
          description="Product teams, distributed services and a lot of shipped features."
        />

        <div ref={trackRef} className="relative mt-14 pl-8 sm:pl-12">
          {/* rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.09] sm:left-[15px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-[15px]"
          />
          <motion.div
            style={{ top: glowY }}
            className="absolute left-[7px] h-16 w-px -translate-x-1/2 translate-y-[-100%] bg-accent blur-[6px] sm:left-[15px]"
          />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, x: 34, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onPointerMove={onMove}
                className="glass spotlight-card group relative overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-white/20 sm:p-8"
              >
                {/* node */}
                <span className="absolute -left-8 top-9 grid h-4 w-4 -translate-x-1/2 place-items-center sm:-left-12">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(94,234,212,0.14)]" />
                  {job.current && (
                    <span className="animate-pulse-ring absolute h-2.5 w-2.5 rounded-full bg-accent" />
                  )}
                </span>

                <div className="relative z-10">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <Briefcase size={15} className="text-accent" />
                        <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                          {job.company}
                        </h3>
                        {job.current && (
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[0.95rem] text-white/80">{job.role}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-mute">{job.period}</p>
                      <p className="mt-0.5 text-xs text-mute/70">
                        {job.location} · {job.duration}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-mute">
                        <Check size={15} className="mt-0.5 shrink-0 text-accent/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[0.75rem] text-mute"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
