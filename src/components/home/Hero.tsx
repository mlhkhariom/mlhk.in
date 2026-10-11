"use client";

import { useRef, useEffect, useState, MutableRefObject } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Hero3D } from "@/components/home/Hero3D";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

const CTA_TEXT = "Start a Project";
const SECONDARY_TEXT = "View Portfolio";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;

    const ctx = gsap.context(() => {
      const overlay = container.querySelector<HTMLElement>(".hero-eyebrow");
      const title = container.querySelector<HTMLElement>(".hero-title");
      const subtitle = container.querySelector<HTMLElement>(".hero-subtitle");
      const ctaGroup = container.querySelector<HTMLElement>(".hero-cta");

      gsap.set([overlay, title, subtitle, ctaGroup], { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(overlay, { y: 0, opacity: 1, duration: 0.9, delay: 0.2 });
      tl.to(
        title,
        { y: 0, opacity: 1, duration: 1.0 },
        "<",
      );
      tl.to(subtitle, { y: 0, opacity: 1, duration: 0.9 }, "<0.1");
      tl.to(ctaGroup, { y: 0, opacity: 1, duration: 0.9 }, "<0.15");
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
    >
      {/* Background 3D canvas */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Subtle gradient glow behind hero content */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(40% 50% at 75% 25%, rgba(147,51,234,0.12), transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
        <p className="hero-eyebrow text-sm md:text-base font-medium tracking-[0.25em] text-cyan-400/90 uppercase">
          MLHK Infotech
        </p>
        <h1 className="hero-title mt-3 md:mt-4 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          <span className="block">
            We engineer the
          </span>
          <span className="block bg-gradient-to-r from-white via-cyan-50 to-cyan-100 bg-clip-text text-transparent">
            digital backbone
          </span>
          <span className="block">of modern business</span>
        </h1>
        <p className="hero-subtitle mt-6 md:mt-8 text-base md:text-lg text-zinc-300/85 max-w-2xl mx-auto leading-relaxed">
          From custom software and AI automation to enterprise SaaS and secure
          cloud infrastructures — we build complete digital ecosystems that
          scale with your ambitions. Based in Shajapur, serving clients across
          India.
        </p>
        <div className="hero-cta mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <MagneticButton
            href="/contact"
            label={CTA_TEXT}
            icon={<ArrowRight className="size-4" />}
            className="h-12 md:h-13 rounded-full bg-white text-zinc-950 font-semibold text-base px-6 hover:bg-cyan-50 !transition-colors"
          />
          <MagneticButton
            href="/portfolio"
            label={SECONDARY_TEXT}
            icon={<ArrowRight className="size-4" />}
            className="h-12 md:h-13 rounded-full border border-zinc-700 bg-zinc-900/60 text-white backdrop-blur-md px-6 hover:bg-zinc-800/80 hover:border-zinc-600"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      {!reduced && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-500/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
