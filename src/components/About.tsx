"use client";

import { motion } from "motion/react";
import { GraduationCap, Languages as LangIcon, Quote } from "lucide-react";
import { education, languages, profile } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="Five years of shipping things people actually use."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* narrative */}
          <Reveal className="h-full">
            <div className="glass spotlight-card relative h-full overflow-hidden rounded-3xl p-7 sm:p-9">
              <Quote className="absolute right-7 top-7 h-16 w-16 text-white/[0.04]" />
              <div className="relative z-10 space-y-5 text-pretty text-base leading-relaxed text-mute sm:text-lg">
                <p>{profile.summary}</p>
                <p>{profile.summary2}</p>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                {["Clean code", "Performance", "Design sense", "Ownership"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* education + languages */}
          <div className="grid gap-6">
            <Reveal delay={0.1}>
              <div className="glass spotlight-card relative overflow-hidden rounded-3xl p-7">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-2.5 text-sm font-medium text-white">
                    <GraduationCap size={17} className="text-accent" />
                    Education
                  </div>
                  <ul className="space-y-5">
                    {education.map((e) => (
                      <li key={e.degree} className="border-l border-white/10 pl-4">
                        <p className="font-display text-[0.95rem] font-medium text-white">{e.degree}</p>
                        <p className="mt-0.5 text-sm text-mute">{e.school}</p>
                        <p className="mt-1 text-xs text-mute/70">
                          {e.period} · {e.location}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass spotlight-card relative overflow-hidden rounded-3xl p-7">
                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-2.5 text-sm font-medium text-white">
                    <LangIcon size={17} className="text-accent-2" />
                    Languages
                  </div>
                  <ul className="space-y-3">
                    {languages.map((l, i) => (
                      <li key={l.name} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-white/85">{l.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="hidden text-xs text-mute sm:block">{l.level}</span>
                          <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
                            <motion.span
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: i === 0 ? 1 : 0.82 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                              className="block h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-2"
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
