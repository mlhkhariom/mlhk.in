"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** Use thousands grouping. Off for years. */
  grouping?: boolean;
}

function format(n: number, grouping: boolean): string {
  const rounded = Math.round(n);
  return grouping ? rounded.toLocaleString("en-IN") : String(rounded);
}

/** Stats strip. Each count animates once when the strip scrolls into view. */
export function StatsCounter({ stats }: { stats: StatItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".stat-value"));

    if (reduced) {
      nodes.forEach((node, i) => {
        const s = stats[i];
        if (s) node.textContent = `${s.prefix ?? ""}${format(s.value, s.grouping ?? true)}${s.suffix ?? ""}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      nodes.forEach((node, i) => {
        const s = stats[i];
        if (!s) return;
        const counter = { v: 0 };
        const grouping = s.grouping ?? true;
        const render = () => {
          node.textContent = `${s.prefix ?? ""}${format(counter.v, grouping)}${s.suffix ?? ""}`;
        };
        // Server HTML already holds the final value; counting starts only when the strip enters view.
        gsap.to(counter, {
          v: s.value,
          duration: 2,
          ease: "power3.out",
          delay: i * 0.1,
          onStart: render,
          onUpdate: render,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [stats, reduced]);

  return (
    <section ref={ref} className="relative border-y border-white/10 bg-[#050607] px-4 py-20 md:px-6" aria-label="MLHK at a glance">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l border-[#ff9f1c]/30 pl-6">
            <dd className="stat-value font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
              {`${s.prefix ?? ""}${format(s.value, s.grouping ?? true)}${s.suffix ?? ""}`}
            </dd>
            <dt className="mt-3 text-xs uppercase tracking-[0.18em] text-zinc-500">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
