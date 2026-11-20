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

/**
 * Flush 6-column Bento layout matching DOM order (24 cells total = 6x4 rectangle, zero holes):
 * Rows 1-2: web (4x2) + mobile (2x1) + marketing (2x1)
 * Row 3:    branding (2) + support (2) + cybersecurity (2)
 * Row 4:    enterprise (3) + ai (3)
 */
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
        { y: 28, opacity: 0.01 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
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
    <section ref={ref} id="services" className="relative bg-[#050607] px-4 py-28 md:px-6 md:py-36" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">What we deliver</p>
            <h2 id="services-heading" className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
              Eight service lines.<br />
              <span className="text-brand">One accountable team.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-zinc-400 md:col-span-5 md:justify-self-end">
            From the first screen to the system running your operations, every line is built by the same team with the same standards.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-fr">
          {tiles.map((t) => (
            <ServiceTile key={t.id} tile={t} span={t.span} reduced={reduced} />
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

function ServiceTile({ tile, span, reduced }: { tile: Tile; span: string; reduced: boolean }) {
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
      target.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 6).toFixed(2)}deg) rotateY(${((px - 0.5) * 6).toFixed(2)}deg)`;
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
        className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-px transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform hover:shadow-[0_30px_80px_-30px_rgba(255,159,28,0.45)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,159,28,0.16), transparent 45%)" }}
        />
        <div className="relative flex h-full flex-col rounded-[calc(1.75rem-1px)] bg-[#0a0b0d]/90 p-6 md:p-7">
          <div className="flex items-start justify-between">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-[#ff9f1c]/25 bg-[#ff9f1c]/10 text-[#ffb84d] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:scale-105">
              <Icon className="size-5" strokeWidth={1.5} />
            </span>
            <ArrowUpRight className="size-5 text-zinc-400 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
          </div>
          <h3 className="mt-8 font-display text-xl font-bold text-white md:text-2xl">{tile.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tile.description}</p>
          {tile.points.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {tile.points.map((p) => (
                <li key={p} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                  {p}
                </li>
              ))}
            </ul>
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
