"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Smartphone, Megaphone, PenTool, LifeBuoy, Building2, Bot, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
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
  web: "md:col-span-4",
  mobile: "md:col-span-2",
  marketing: "md:col-span-3",
  enterprise: "md:col-span-3",
  branding: "md:col-span-2",
  support: "md:col-span-2",
  ai: "md:col-span-2",
  cybersecurity: "md:col-span-6",
};

const SERVICE_VISUALS: Partial<Record<string, { image: string; alt: string; priceAnchor: string }>> = {
  web: {
    image: "/images/showcase/case-iksc.jpg",
    alt: "Custom dark-luxury business website and e-commerce storefront engineered by MLHK Infotech",
    priceAnchor: "From ₹15,000",
  },
  mobile: {
    image: "/images/showcase/mobile-app.jpg",
    alt: "Native Android business and UPI checkout mobile application built in-house",
    priceAnchor: "From ₹45,000",
  },
  marketing: {
    image: "/images/showcase/seo-growth.jpg",
    alt: "Organic Google SEO growth and pan-India digital marketing analytics dashboard",
    priceAnchor: "From ₹10,000/mo",
  },
  enterprise: {
    image: "/images/showcase/erp-dashboard.jpg",
    alt: "Enterprise GST billing, inventory, and multi-branch ERP operations interface",
    priceAnchor: "From ₹65,000",
  },
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
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const rawTiles = [
    ...SERVICE_LINES.map((s) => ({ ...s, icon: ICONS[s.id as IconId] ?? Code2 })),
    ...CAPABILITIES.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      points: [] as readonly string[],
      icon: ICONS[c.id as IconId] ?? Code2,
    })),
  ];

  // Order marquee visual tiles first for clean asymmetric Bento balance
  const order = ["web", "mobile", "marketing", "enterprise", "branding", "support", "ai", "cybersecurity"];
  const tiles = rawTiles
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map((t) => ({
      ...t,
      span: SPAN[t.id] ?? "md:col-span-2",
      visual: SERVICE_VISUALS[t.id],
    }));

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
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end md:text-right">
            <p className="max-w-md text-base leading-relaxed text-zinc-300">
              From your first business website or SEO campaign to custom Android apps and GST ERP systems — engineered in-house without agency middlemen.
            </p>
            <ServicesLink />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
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
  visual?: { image: string; alt: string; priceAnchor: string };
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
      target.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * 3.5).toFixed(2)}deg) rotateY(${((px - 0.5) * 3.5).toFixed(2)}deg)`;
    });
  };

  const onLeave = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const target = cardRef.current;
    if (!target) return;
    target.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
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
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0c10] transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:border-[#ff9f1c]/45 hover:shadow-[0_24px_60px_-28px_rgba(255,159,28,0.35)]"
      >
        {/* Subtle 1px specular sheen along top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-200 group-hover:via-[#ff9f1c]/55"
        />

        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,159,28,0.12), transparent 46%)",
          }}
        />

        {/* Flagship Studio Visual Header for primary 4 disciplines */}
        {tile.visual && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#08090c]">
            <ShowcaseImage
              src={tile.visual.image}
              alt={tile.visual.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/30 to-transparent"
            />
            <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-xs">
              <span className="font-mono font-semibold tabular-nums text-[#ffb84d]">
                {tile.visual.priceAnchor}
              </span>
              <span className="font-mono tabular-nums text-zinc-300">0{index}</span>
            </div>
          </div>
        )}

        <div className="relative flex flex-1 flex-col p-6 md:p-7">
          {!tile.visual && (
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-[#ff9f1c]/25 bg-[#ff9f1c]/10 text-[#ffb84d] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-xs tabular-nums text-zinc-400">0{index}</span>
              </div>
              <ArrowUpRight className="size-5 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
            </div>
          )}

          <div className={tile.visual ? "flex items-start justify-between gap-4" : "mt-6"}>
            <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d] md:text-2xl">
              {tile.title}
            </h3>
            {tile.visual && (
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
            )}
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{tile.description}</p>

          {tile.points.length > 0 && (
            <p className="mt-auto border-t border-white/10 pt-4 text-xs text-zinc-400">
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
    <Link href="/services" className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white">
      <span>Explore all services</span>
      <ArrowUpRight className="size-4" />
    </Link>
  );
}
