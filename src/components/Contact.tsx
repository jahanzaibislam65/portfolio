"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { useSpotlight } from "@/lib/useSpotlight";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-mute/60 focus:border-accent/45 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/15";

export function Contact() {
  const [sent, setSent] = useState(false);
  const onMove = useSpotlight<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n--\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const channels = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneRaw}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message me directly",
      href: `https://wa.me/${profile.phoneRaw.replace("+", "")}`,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let&rsquo;s build something together."
          description="Got a role, a product idea or a stuck codebase? I read every message."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* channels */}
          <div className="grid content-start gap-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08} direction="right">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-accent/35 hover:bg-white/[0.06]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent text-accent transition-transform duration-300 group-hover:scale-110">
                    <c.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.16em] text-mute/70">{c.label}</span>
                    <span className="mt-0.5 block truncate text-sm text-white/90">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.26} direction="right">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative grid h-4 w-4 place-items-center">
                    <span className="animate-pulse-ring absolute h-2 w-2 rounded-full bg-accent" />
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-sm text-white/85">Currently open to new opportunities</span>
                </div>
                <p className="mt-2 pl-6 text-sm text-mute">
                  Based in {profile.location} &middot; open to remote roles worldwide.
                </p>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.12} direction="left">
            <div
              onPointerMove={onMove}
              className="glass spotlight-card relative overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.16em] text-mute">
                      Name
                    </label>
                    <input id="name" name="name" required placeholder="Your name" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.16em] text-mute">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.16em] text-mute">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about the project or the role..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <MagneticButton type="submit" variant="primary">
                    <Send size={16} />
                    Send message
                  </MagneticButton>

                  <AnimatePresence>
                    {sent && (
                      <motion.span
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2 text-sm text-accent"
                      >
                        <Check size={15} />
                        Opening your mail app...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
