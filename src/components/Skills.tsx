"use client";

import { motion } from "motion/react";
import { Cloud, Code2, Database, LayoutDashboard, Server, Sparkles } from "lucide-react";
import { skillGroups } from "@/lib/data";
import { useSpotlight } from "@/lib/useSpotlight";
import { itemVariants, RevealGroup } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = {
  code: Code2,
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  cloud: Cloud,
  sparkles: Sparkles,
};

export function Skills() {
  const onMove = useSpotlight<HTMLDivElement>();

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Toolkit"
          title="The stack I reach for."
          description="Front to back — typed, tested and tuned for the browser and the phone."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {skillGroups.map((group) => {
            const Icon = icons[group.icon];
            return (
              <motion.div
                key={group.title}
                variants={itemVariants}
                onPointerMove={onMove}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass spotlight-card group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-white/20"
              >
                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent text-accent transition-colors duration-300 group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-display text-base font-medium tracking-tight text-white">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-[0.8rem] text-mute transition-colors duration-300 hover:border-accent/35 hover:bg-accent/[0.07] hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
