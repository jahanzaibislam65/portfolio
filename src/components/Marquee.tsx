"use client";

import { marqueeItems } from "@/lib/data";
import { cn } from "@/lib/utils";

function Row({ items, reverse, speed }: { items: string[]; reverse?: boolean; speed: number }) {
  const doubled = [...items, ...items];

  return (
    <div className="mask-fade-x overflow-hidden">
      <div
        className={cn(
          "animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="group whitespace-nowrap font-display text-lg font-medium tracking-tight text-white/30 transition-colors duration-300 hover:text-accent sm:text-xl">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent/50 shadow-[0_0_8px_1px] shadow-accent/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const half = Math.ceil(marqueeItems.length / 2);

  return (
    <section
      aria-label="Technologies"
      className="relative space-y-4 border-y border-white/[0.07] bg-white/[0.015] py-7"
    >
      <Row items={marqueeItems.slice(0, half)} speed={34} />
      <Row items={marqueeItems.slice(half)} speed={42} reverse />
    </section>
  );
}
