"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ChromeMark3D } from "@/components/home/ChromeMark3D";
import { useReducedMotion } from "@/components/home/utils";
import { BRAND, VENTURES } from "@/lib/brand";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-kicker", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".hero-line",
          { yPercent: 110, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.12 },
          "<0.1",
        )
        .fromTo(".hero-copy", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "<0.25")
        .fromTo(".hero-cta", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, "<0.1")
        .fromTo(".hero-mark", { scale: 0.86, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "expo.out" }, 0);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#050607] pt-28 md:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* ambient light: amber from top, blue spark from below */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18%] h-[70vh] w-[70vw] -translate-x-1/2 rounded-full bg-[#ff9f1c]/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[15%] h-[50vh] w-[50vw] rounded-full bg-[#3b82f6]/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/3%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/3%)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 md:grid-cols-12 md:gap-6 md:px-6">
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="hero-kicker inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              <span className="size-1.5 rounded-full bg-[#ff9f1c] shadow-[0_0_10px_#ff9f1c]" />
              Enterprise IT &amp; Digital Solutions
            </p>
            <span className="hero-kicker inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
              <span className="text-xs">🇮🇳</span>
              <span>Built in Bharat</span>
              <span className="text-zinc-600">•</span>
              <span className="text-[#ffb84d]">Deployed Globally</span>
            </span>
          </div>

          <h1 id="hero-heading" className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.6rem]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">We build the</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block text-brand">systems that</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block text-chrome">run your business.</span>
            </span>
          </h1>

          <p className="hero-copy mt-7 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Web platforms, Android apps, CRM and ERP systems, and AI automation, delivered by one team
            from Shajapur. We design it, build it, launch it and keep it running.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticCta href="/contact" primary>
              Start your project
            </MagneticCta>
            <MagneticCta href="/services">Explore services</MagneticCta>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Founded</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">{BRAND.foundedYear}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Service lines</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">5</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Ventures</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">{VENTURES.length}</dd>
            </div>
          </dl>
        </div>

        <div className="relative md:col-span-5">
          <div className="hero-mark relative mx-auto aspect-square w-full max-w-[460px]">
            <ChromeMark3D />
            <div aria-hidden className="pointer-events-none absolute inset-6 rounded-full border border-[#ff9f1c]/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticCta({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "hero-cta group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-6 pr-2 text-sm font-semibold text-black shadow-[0_0_40px_-8px_rgba(255,159,28,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
          : "hero-cta group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-3 pl-6 pr-2 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:border-[#ff9f1c]/50 active:scale-[0.98]"
      }
    >
      {children}
      <span
        className={
          primary
            ? "flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
            : "flex size-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
        }
      >
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
