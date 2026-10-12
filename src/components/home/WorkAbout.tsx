"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { VENTURES, TIMELINE, BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

/** Ventures section: the company's brands, as listed in the existing about page. */
export function VenturesGrid() {
  return (
    <section className="relative bg-[#050607] px-4 py-28 md:px-6 md:py-36" aria-labelledby="ventures-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Our ecosystem</p>
            <h2 id="ventures-heading" className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              Our brands, listed in one place.
            </h2>
          </div>
          <Link href="/subsidiaries" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] hover:text-white">
            All brands <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {VENTURES.map((v, i) => (
            <li key={v.name} className="group relative bg-[#050607] p-7 transition-colors duration-500 hover:bg-[#0c0d10]">
              <span className="font-display text-xs text-zinc-600 tabular-nums">0{i + 1}</span>
              <h3 className="mt-6 font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">{v.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">{v.sector}</p>
              <span aria-hidden className="absolute right-6 top-6 size-1.5 rounded-full bg-[#ff9f1c] opacity-0 shadow-[0_0_12px_#ff9f1c] transition-opacity duration-500 group-hover:opacity-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** About + founder + timeline, using the verified timeline and founder facts. */
export function AboutTimeline() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-item", { opacity: 0, x: 24 }, {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tl-list", start: "top 78%", once: true },
      });
      gsap.fromTo(".tl-fill", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".tl-list", start: "top 70%", end: "bottom 65%", scrub: 0.5 },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-[#070809] px-4 py-28 md:px-6 md:py-36" aria-labelledby="about-heading">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[460px] w-[460px] rounded-full bg-[#ff9f1c]/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">About MLHK</p>
          <h2 id="about-heading" className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            Founded in {BRAND.foundedYear}, <span className="text-brand">built in Shajapur.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            MLHK Infotech started in Barnawad, Shajapur, during the pandemic-era digital boom. We build complete digital
            ecosystems, not isolated websites or apps: systems that automate work, scale with the business and show results.
          </p>

          <figure className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <blockquote className="text-base leading-relaxed text-zinc-200">
              &ldquo;Technology entrepreneur and system architect. Experienced in the full product lifecycle: UI/UX,
              automation, SaaS and scaling.&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="font-display text-sm font-bold text-white">{BRAND.founder}</span>
              <span className="text-xs text-zinc-500">{BRAND.founderRole}</span>
            </figcaption>
          </figure>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Our journey</p>
          <div className="tl-list relative">
            <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10">
              <div className="tl-fill h-full origin-top bg-gradient-to-b from-amber-300 via-[#ff9f1c] to-orange-700" />
            </div>
            <ol className="space-y-9">
              {TIMELINE.map((t) => (
                <li key={t.year} className="tl-item relative pl-10">
                  <span className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-[#ff9f1c] bg-[#070809] shadow-[0_0_14px_rgba(255,159,28,0.6)]" />
                  <time className="font-display text-sm font-bold text-[#ffb84d]" dateTime={t.year}>{t.year}</time>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{t.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
