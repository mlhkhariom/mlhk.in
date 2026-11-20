"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Smartphone, Megaphone, PenTool, LifeBuoy, Building2, Bot, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { SERVICE_LINES, CAPABILITIES } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  web: Code2,
  mobile: Smartphone,
  marketing: Megaphone,
  branding: PenTool,
  support: LifeBuoy,
  enterprise: Building2,
  ai: Bot,
  cybersecurity: ShieldCheck,
} as const;

type IconId = keyof typeof ICONS;

const SPAN: Record<string, string> = {
  web: "md:col-span-4 md:row-span-2",
  mobile: "md:col-span-2",
  marketing: "md:col-span-2",
  branding: "md:col-span-2",
  support: "md:col-span-2",
  cybersecurity: "md:col-span-2",
  enterprise: "md:col-span-3",
  ai: "md:col-span-3",
};

export function Services3D() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-card",
        { y: 24, opacity: 0.01 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const tiles = [
    ...SERVICE_LINES.map((s) => ({ ...s, span: SPAN[s.id] ?? "md:col-span-2", icon: ICONS[s.id as IconId] ?? Code2 })),
    ...CAPABILITIES.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      points: [] as readonly string[],
      span: SPAN[c.id] ?? "md:col-span-3",
      icon: ICONS[c.id as IconId] ?? Code2,
    })),
  ];

  return (
    <section ref={ref} id="services" className="relative bg-[#050607] px-4 py-24 md:px-6 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">What we deliver</p>
            <h2
              id="services-heading"
              className="mt-3 text-balance font-display text-3xl font-bold leading-[1.06] tracking-tight text-white md:text-5xl"
            >
              Eight service lines.<br />
              <span className="text-brand">One accountable team.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-zinc-300 md:col-span-5 md:justify-self-end">
            From your first business website or SEO campaign to full ERP automation, every line is built in-house with the same engineering standards.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-fr">
          {tiles.map((t, index) => (
            <ServiceTile key={t.id} tile={t} index={index + 1} span={t.span} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Tile = {
  id: string;
  slug: string;
  title: string;
  description: string;
  points: readonly string[];
  icon: (typeof ICONS)[IconId];
};

function ServiceTile({
  tile,
  index,
  span,
  reduced,
}: {
  tile: Tile;
  index: number;
  span: string;
  reduced: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const Icon = tile.icon;

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const target = cardRef.current;
    if (!target) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      target.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      target.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      target.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 5).toFixed(2)}deg) rotateY(${((px - 0.5) * 5).toFixed(2)}deg)`;
    });
  };

  const onLeave = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const target = cardRef.current;
    if (!target) return;
    target.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <Link
      href={`/services/${tile.slug}`}
      className={`svc-card block ${span}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={cardRef}
        className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0c0f] transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:border-[#ff9f1c]/40 hover:shadow-[0_24px_60px_-28px_rgba(255,159,28,0.38)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(255,159,28,0.14), transparent 46%)",
          }}
        />
        <div className="relative flex h-full flex-col p-6 md:p-7">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl border border-[#ff9f1c]/25 bg-[#ff9f1c]/10 text-[#ffb84d] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                <Icon className="size-5" strokeWidth={1.6} />
              </span>
              <span className="font-mono text-xs tabular-nums text-zinc-400">0{index}</span>
            </div>
            <ArrowUpRight className="size-5 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
          </div>
          <h3 className="mt-7 font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d] md:text-2xl">
            {tile.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{tile.description}</p>
          {tile.points.length > 0 && (
            <p className="mt-auto border-t border-white/10 pt-5 text-xs text-zinc-400">
              {tile.points.join(" · ")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ServicesLink() {
  return (
    <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] hover:text-white">
      View all services <ArrowUpRight className="size-4" />
    </Link>
  );
}
