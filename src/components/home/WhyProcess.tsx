"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { WHY_MLHK, TECH_STACK } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  { step: "01", title: "Discover", text: "We map your workflows, users and constraints before writing a line of code." },
  { step: "02", title: "Design", text: "Interfaces and data models are agreed with you first, so the build matches the business." },
  { step: "03", title: "Build", text: "Delivered in working increments on a stack chosen for your problem, not our habits." },
  { step: "04", title: "Launch", text: "Hardened for production with security review, access control and a tested rollout." },
  { step: "05", title: "Support", text: "Monitoring, updates and fixes stay with us after launch, so the system keeps earning its place." },
];

export function WhyMlhk() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-word",
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        ".proc-step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proc-list", start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        ".proc-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".proc-list", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const headline = "Built around how your business actually runs.";

  return (
    <>
      <section ref={ref} className="relative bg-[#050607] px-4 py-28 md:px-6 md:py-36" aria-labelledby="why-heading">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Why MLHK</p>
            <h2 id="why-heading" className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              {headline.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <span className="why-word inline-block">{w}&nbsp;</span>
                </span>
              ))}
            </h2>
          </div>
          <ul className="md:col-span-7 md:pt-4">
            {WHY_MLHK.map((point, i) => (
              <li key={point} className="group flex items-center gap-5 border-b border-white/10 py-6 first:pt-0">
                <span className="font-display text-sm text-[#ff9f1c]/70 tabular-nums">0{i + 1}</span>
                <span className="text-lg font-medium text-zinc-200 transition-colors duration-500 group-hover:text-white md:text-xl">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070809] px-4 py-28 md:px-6 md:py-36" aria-labelledby="process-heading">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ff9f1c]/40 to-transparent" />
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">How we work</p>
          <h2 id="process-heading" className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            Five steps from idea to a system you can depend on.
          </h2>

          <div className="proc-list relative mt-16">
            <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block">
              <div className="proc-line h-px origin-left bg-gradient-to-r from-amber-300 via-[#ff9f1c] to-orange-600" />
            </div>
            <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
              {PROCESS.map((p) => (
                <li key={p.step} className="proc-step relative">
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-[#ff9f1c]/40 bg-[#070809] font-display text-xs font-bold text-[#ffb84d]">
                    {p.step}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#050607] py-12" aria-label="Technology stack">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">No boundaries on the stack</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.slice(0, 4).map((g) => (
              <div key={g.group}>
                <p className="mb-3 text-xs font-semibold text-zinc-300">{g.group}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
