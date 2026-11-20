"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { VENTURES, TIMELINE, BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

/** Ventures section: the company's brands, as listed in the verified brand data. */
export function VenturesGrid() {
  return (
    <section className="relative bg-[#050607] px-4 py-24 md:px-6 md:py-32" aria-labelledby="ventures-heading">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">Our ecosystem</p>
            <h2
              id="ventures-heading"
              className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
            >
              Five in-house ventures proving our craft.
            </h2>
          </div>
          <Link
            href="/subsidiaries"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white"
          >
            <span>Explore all brands</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {VENTURES.map((v, i) => {
            const isLast = i === VENTURES.length - 1;
            const spanClass = isLast
              ? `${VENTURES.length % 2 === 1 ? "sm:col-span-2" : ""} ${VENTURES.length % 3 === 2 ? "lg:col-span-2" : VENTURES.length % 3 === 1 ? "lg:col-span-3" : "lg:col-span-1"}`
              : "";
            return (
              <li key={v.name} className={spanClass}>
                <Link
                  href="/subsidiaries"
                  className="group relative flex h-full flex-col bg-[#050607] p-7 transition-colors duration-200 hover:bg-[#0c0d10]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tabular-nums text-zinc-400">0{i + 1}</span>
                    <ArrowUpRight className="size-4 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                    {v.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium text-zinc-400">{v.sector}</p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-300">{v.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** About + studio visual + founder + timeline, using verified brand facts. */
export function AboutTimeline() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-item",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tl-list", start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        ".tl-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".tl-list", start: "top 72%", end: "bottom 65%", scrub: 0.5 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-[#070809] px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="about-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-[#ff9f1c]/10 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">About MLHK</p>
          <h2
            id="about-heading"
            className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
          >
            Founded in {BRAND.foundedYear}, <span className="text-brand">built in Shajapur.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-300">
            MLHK Infotech started in Barnawad, Shajapur, during the pandemic-era digital shift. We
            build complete digital ecosystems — websites, mobile apps, SEO, ads, and ERP tools —
            engineered in-house for Indian and global businesses.
          </p>

          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0f]">
            <Image
              src="/images/showcase/studio-hub.jpg"
              alt="MLHK Infotech software architecture and UI engineering desk"
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#050607]/85 via-transparent to-transparent"
            />
            <p className="absolute bottom-3 left-4 right-4 text-xs text-zinc-200">
              In-house architecture &amp; product engineering · MSME {BRAND.udyamNumber}
            </p>
          </div>

          <figure className="mt-6 rounded-2xl border border-white/10 bg-[#0c0d10] p-6">
            <blockquote className="text-sm leading-relaxed text-zinc-200">
              &ldquo;Technology entrepreneur and system architect. Experienced in the full product
              lifecycle: UI/UX, automation, SaaS and scaling.&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-x-2 text-xs">
              <span className="font-display font-bold text-white">{BRAND.founder}</span>
              <span aria-hidden className="text-zinc-600">·</span>
              <span className="text-zinc-400">{BRAND.founderRole}</span>
            </figcaption>
          </figure>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="mb-8 text-xs font-semibold tracking-wide text-zinc-400">Our journey (2020 – 2026)</p>
          <div className="tl-list relative">
            <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10">
              <div className="tl-fill h-full origin-top bg-gradient-to-b from-amber-300 via-[#ff9f1c] to-orange-700" />
            </div>
            <ol className="space-y-8">
              {TIMELINE.map((t) => (
                <li key={t.year} className="tl-item relative pl-10">
                  <span className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-[#ff9f1c] bg-[#070809]" />
                  <div className="flex flex-wrap items-baseline gap-2">
                    <time className="font-display text-sm font-bold tabular-nums text-[#ffb84d]" dateTime={t.year}>
                      {t.year}
                    </time>
                    <span className="text-xs font-medium text-zinc-400">· {t.title}</span>
                  </div>
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
