"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Cube } from "./background/Cube";
import { Sphere } from "./background/Sphere";
import { Starfield } from "./background/Starfield";

export function Background() {
  const reduce = useReducedMotion();
  const [heavy, setHeavy] = useState(false);

  // the 3D geometry is desktop-only — it is decoration, not content
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setHeavy(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 26, restDelta: 0.001 });

  const orbY = useTransform(smooth, [0, 1], ["0%", "-26%"]);
  const gridY = useTransform(smooth, [0, 1], ["0%", "26%"]);
  const geoY = useTransform(smooth, [0, 1], ["0%", "-52%"]);
  const geoRotate = useTransform(smooth, [0, 1], [0, 26]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#101033_0%,#06061a_45%,#04040f_100%)]" />

      {/* drifting colour orbs */}
      <motion.div style={{ y: reduce ? 0 : orbY }} className="absolute inset-0">
        <div className="animate-orb-1 absolute -top-48 left-[6%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.22),transparent_64%)] blur-3xl" />
        <div className="animate-orb-2 absolute top-[14%] right-[-10%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.26),transparent_64%)] blur-3xl" />
        <div className="animate-orb-3 absolute top-[58%] left-[18%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.16),transparent_64%)] blur-3xl" />
        <div className="animate-orb-1 absolute top-[80%] right-[14%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14),transparent_64%)] blur-3xl [animation-delay:-8s]" />
      </motion.div>

      {/* particle field */}
      <Starfield />

      {/* scrolling perspective grid */}
      <motion.div style={{ y: reduce ? 0 : gridY }} className="absolute inset-x-0 top-0 h-[170vh]">
        <div className="grid-bg animate-grid-scroll absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_58%_at_50%_0%,#000_18%,transparent_76%)]" />
      </motion.div>

      {/* horizon grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] [perspective:420px]">
        <div className="grid-bg animate-grid-scroll absolute inset-0 origin-bottom opacity-45 [transform:rotateX(72deg)] [mask-image:linear-gradient(to_top,#000,transparent_78%)]" />
      </div>

      {/* CSS-3D geometry */}
      {heavy && !reduce && (
        <motion.div style={{ y: geoY, rotate: geoRotate }} className="absolute inset-0">
          <Sphere size={340} className="left-1/2 top-[26%] -ml-[170px] opacity-45" />
          <Cube size={210} color="rgba(0,212,255,0.42)" className="right-[7%] top-[9%] opacity-60" duration={30} />
          <Cube size={126} color="rgba(124,58,237,0.46)" className="left-[5%] top-[58%] opacity-55" reverse duration={38} />
          <Cube size={72} color="rgba(236,72,153,0.42)" className="right-[16%] top-[72%] opacity-50" duration={22} delay={-6} />
          <Cube size={54} color="rgba(16,185,129,0.42)" className="left-[22%] top-[16%] opacity-45" reverse duration={26} delay={-3} />
        </motion.div>
      )}

      {/* light sweep */}
      <div className="animate-scan absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,transparent,rgba(0,212,255,0.05),transparent)]" />

      {/* vignette + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_30%,rgba(4,4,15,0.88)_100%)]" />
      <div className="noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
