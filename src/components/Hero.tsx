"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, MapPin, Sparkles } from "lucide-react";
import { profile, roles, stats } from "@/lib/data";
import { Counter } from "./Counter";
import { MagneticButton } from "./MagneticButton";
import { Portrait } from "./Portrait";
import { SocialIcons } from "./SocialIcons";
import { Typewriter } from "./Typewriter";

const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const word = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={line} initial="hidden" animate="show" className={className}>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center pt-28 pb-20">
      <div className="container-x">
        <motion.div
          style={{
            y: reduce ? 0 : y,
            opacity: reduce ? 1 : opacity,
            scale: reduce ? 1 : scale,
          }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
            {/* availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.06] py-1.5 pl-2 pr-4 text-sm text-white/80 shadow-[0_0_30px_-8px] shadow-accent/40"
            >
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="animate-pulse-ring absolute h-2 w-2 rounded-full bg-accent" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for new opportunities
            </motion.div>

            {/* typed role */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 font-display text-lg font-medium tracking-tight sm:text-2xl"
            >
              <span className="text-mute">&lt;</span>
              <Typewriter words={roles} />
              <span className="text-mute"> /&gt;</span>
            </motion.div>

            <h1 className="font-display max-w-[15ch] text-balance text-[clamp(2.4rem,6.4vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
              <AnimatedWords text="Building digital" />
              <span className="block">
                <AnimatedWords text="experiences" className="text-holo" />
              </span>
              <AnimatedWords text="that feel alive." />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-mute sm:text-lg"
            >
              I&apos;m <span className="text-white/90">{profile.firstName}</span> — 5 years building production web
              and mobile apps with React, Next.js, React Native and Node.js. Currently shipping AI-powered
              features at MeissaSoft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href="#work" variant="primary">
                <Sparkles size={16} />
                View my work
              </MagneticButton>
              <MagneticButton href={profile.resume} variant="ghost" external>
                <Download size={16} />
                Download resume
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <SocialIcons />
              <span className="flex items-center gap-2 text-sm text-mute">
                <MapPin size={15} className="text-accent" />
                {profile.location}
              </span>
            </motion.div>
            </div>

            {/* portrait */}
            <Portrait />
          </div>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3"
          >
            {stats.map((s) => (
              <div key={s.label} className="group bg-ink-2/70 px-5 py-5 backdrop-blur-sm transition-colors duration-300 hover:bg-ink-2">
                <dt className="font-display text-3xl font-semibold tracking-tight text-white">
                  <span className="text-holo">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-mute">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-mute transition-colors hover:text-white lg:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.a>
    </section>
  );
}
