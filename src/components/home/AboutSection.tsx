"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  event: string;
}

const TIMELINE: TimelineEvent[] = [
  {
    year: "2020",
    event: "Founded MLHK Infotech in Barnawad, Shajapur during the pandemic digital boom.",
  },
  {
    year: "2021",
    event: "Launched first SaaS products and expanded into mobile app development.",
  },
  {
    year: "2022",
    event: "Founded IKSC India (e-commerce) and Red Xerox Studio (creative agency).",
  },
  {
    year: "2023",
    event: "Launched Erotix Green Energy (solar), RX Media, and TET News.",
  },
  {
    year: "2024",
    event: "Expanded into AI automation, CIS benchmark auditing, and cloud consulting.",
  },
  {
    year: "2025+",
    event: "Building enterprise-grade digital ecosystems for businesses across India.",
  },
];

export function AboutSection() {
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
      const wrapper = container.querySelector<HTMLElement>(".timeline-wrapper");
      if (!wrapper) return;
      const lines = Array.from(wrapper.querySelectorAll(".timeline-line")) as HTMLElement[];
      const dots = Array.from(wrapper.querySelectorAll(".timeline-dot")) as HTMLElement[];
      const texts = Array.from(wrapper.querySelectorAll(".timeline-text")) as HTMLElement[];

      gsap.fromTo(
        lines,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 72%",
            once: true,
            markers: false,
          },
        },
      );

      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.35,
          stagger: 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 70%",
            end: "bottom 60%",
            scrub: false,
            once: true,
            markers: false,
          },
        },
      );

      gsap.fromTo(
        texts,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 68%",
            once: true,
            markers: false,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              <span>A bootstrapped firm</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                built for impact.
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-zinc-400 leading-relaxed">
              We don't outsource quality to keep costs down. Every line of code,
              every architecture decision — owned in-house from prototype to
              production.
            </p>

            <div className="mt-8 space-y-4">
              <p className="text-sm text-zinc-500">Founder & CEO</p>
              <h3 className="text-xl font-semibold text-white">Hariom Vishwkarma</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Technology entrepreneur and system architect based in Shajapur,
                MP. Started MLHK Infotech in April 2020 while studying Computer
                Applications at Vikram University, Ujjain. Experienced in
                full-lifecycle product development — UI/UX, automation, SaaS,
                and scaling.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Java", "Python (AI)", "SQL", "Node.js", "Android", "IBM Cloud", "System Architecture"].map((s) => (
                  <span
                    key={s}
                    className="text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-lg font-semibold text-white mb-8">Our Journey</h3>
            <div className="timeline-wrapper relative">
              <div
                className="timeline-line absolute top-2.5 left-[2px] w-[2px] h-full bg-gradient-to-b from-blue-600 via-cyan-500 to-zinc-800"
                aria-hidden
              />
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="relative pl-10 pb-10 last:pb-0">
                  <div
                    className="timeline-dot absolute left-0 top-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 border-2 border-zinc-950"
                    aria-hidden
                  />
                  <div className="timeline-text">
                    <time
                      className="block text-sm font-bold text-cyan-400 mb-1.5"
                      dateTime={item.year}
                    >
                      {item.year}
                    </time>
                    <p className="text-base text-zinc-300 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center lg:text-left">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
          >
            Read the full story <ArrowRight className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
