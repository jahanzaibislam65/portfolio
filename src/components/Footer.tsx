"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      {/* oversized wordmark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display -mb-[0.14em] whitespace-nowrap text-center text-[clamp(3.5rem,17vw,14rem)] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.10)]"
        >
          JAHANZAIB
        </motion.p>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-6 border-t border-white/[0.07] py-8 sm:flex-row">
        <p className="text-sm text-mute">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Motion.
        </p>

        <SocialIcons />

        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-white"
        >
          Back to top
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40">
            <ArrowUp size={14} />
          </span>
        </a>
      </div>
    </footer>
  );
}
