"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

type PortfolioItem = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  tags: string | null;
  url: string | null;
};

export function FeaturedWork({ items }: { items: PortfolioItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fw-card",
        { y: 52, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="work"
      className="relative bg-[#070809] px-4 py-28 md:px-6 md:py-36"
      aria-labelledby="work-heading"
    >
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[#ff9f1c]/10 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              Selected Work
            </p>
            <h2
              id="work-heading"
              className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl"
            >
              Products we have shipped.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white"
          >
            View all work <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-14 text-center">
            <p className="font-display text-lg font-semibold text-zinc-500">Case studies coming soon.</p>
            <p className="mt-2 text-sm text-zinc-600">We are documenting our work. Check back shortly.</p>
          </div>
        ) : (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const tags = item.tags ? item.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
              const card = (
                <article className="fw-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/30 hover:shadow-[0_24px_64px_-16px_rgba(255,159,28,0.35)]">
                  {item.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[#ff9f1c]/10 to-[#0a0b0d]">
                      <span className="font-display text-5xl font-bold text-[#ff9f1c]/20">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    )}
                    {tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {tags.slice(0, 4).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-400"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.url && (
                      <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold text-[#ffb84d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View project <ArrowUpRight className="size-3.5" />
                      </span>
                    )}
                  </div>
                </article>
              );

              return (
                <li key={item.id}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                      aria-label={`View ${item.title} project`}
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
