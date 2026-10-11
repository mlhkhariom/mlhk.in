"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  grouping?: boolean;
}

function formatStat(n: number, decimals: number, grouping: boolean): string {
  if (decimals > 0) return n.toFixed(decimals);
  const rounded = Math.round(n);
  return grouping ? rounded.toLocaleString("en-IN") : String(rounded);
}

export function StatsCounter({ stats }: { stats: StatItem[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;

    const ctx = gsap.context(() => {
      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(".stat-value"),
      );

      nodes.forEach((node, i) => {
        const stat = stats[i];
        if (!stat) return;
        const { prefix = "", suffix = "", decimals = 0, grouping = true, value } = stat;
        const counter = { current: 0 };

        const render = () => {
          const formatted = formatStat(counter.current, decimals, grouping);
          node.textContent = `${prefix}${formatted}${suffix}`;
        };

        render();
        gsap.to(counter, {
          current: value,
          duration: 1.8,
          ease: "power2.out",
          delay: i * 0.12,
          onUpdate: render,
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [stats, reduced]);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-24 px-4 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-y border-zinc-800/60"
    >
      <div className="max-w-6xl mx-auto">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="stat-value text-3xl md:text-4xl lg:text-5xl font-bold text-white tabular-nums">
                {`${stat.prefix ?? ""}${formatStat(stat.value, stat.decimals ?? 0, stat.grouping ?? true)}${stat.suffix ?? ""}`}
              </dd>
              <dt className="mt-2 text-sm font-medium text-blue-400 uppercase tracking-widest">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
