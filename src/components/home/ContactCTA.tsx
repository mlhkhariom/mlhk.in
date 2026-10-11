"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
}

export function ContactCTA({
  title = "Ready to build something great?",
  subtitle = "Tell us about your project. We respond within 24 hours with a concrete plan.",
}: ContactCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;

    const ctx = gsap.context(() => {
      const card = container.querySelector<HTMLElement>(".cta-card");
      const titleEl = container.querySelector<HTMLElement>(".cta-title");
      const subtitleEl = container.querySelector<HTMLElement>(".cta-subtitle");
      const button = container.querySelector<HTMLElement>(".cta-button");

      gsap.fromTo(
        [card, titleEl, subtitleEl, button],
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
            markers: false,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 bg-zinc-950"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 50%, rgba(37,99,235,0.18), transparent 60%), radial-gradient(50% 60% at 30% 40%, rgba(6,182,212,0.1), transparent 55%)",
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div
          className="cta-card relative rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl p-8 md:p-12 text-center"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"
          />

          <h2 className="cta-title text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
          </h2>
          <p className="cta-subtitle mt-4 md:mt-5 text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>

          <div className="cta-button mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="/contact"
              label="Start a Project"
              icon={<Mail className="size-4" />}
              className="h-12 md:h-13 rounded-full bg-white text-zinc-950 font-semibold text-base px-6 hover:bg-cyan-50 !transition-colors"
            />
            <a
              href="mailto:admin@mlhk.in"
              className="inline-flex items-center gap-2 text-white font-medium px-5 py-3.5 rounded-full bg-zinc-800/60 border border-zinc-700 hover:bg-zinc-800 transition-colors"
            >
              <Mail className="size-4" />
              admin@mlhk.in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
