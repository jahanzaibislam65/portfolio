"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
};

/** Types a word, holds, deletes, moves on. Renders the longest word invisibly so the line never reflows. */
export function Typewriter({
  words,
  className,
  typeSpeed = 72,
  deleteSpeed = 34,
  holdMs = 1700,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const hold = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const tick = setTimeout(
      () =>
        setText((prev) =>
          deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
        ),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(tick);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdMs, reduced]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span className={cn("relative inline-block", className)}>
      {/* invisible spacer keeps the layout stable while typing */}
      <span aria-hidden className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0 whitespace-nowrap">
        <span className="text-holo">{reduced ? words[0] : text}</span>
        {!reduced && (
          <span className="animate-blink ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] bg-accent align-middle" />
        )}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
