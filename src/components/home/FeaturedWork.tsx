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

const VERIFIED_FEATURED_WORK: PortfolioItem[] = [
  {
    id: "verified-iksc",
    title: "IKSC India (iksc.in)",
    description:
      "Resilient digital storefront tailored for Tier-2/3 Indian retail customers with WhatsApp instant checkout dispatch and Razorpay integration.",
    image: null,
    tags: "Next.js, MySQL, WhatsApp API, Razorpay",
    url: "https://iksc.in",
  },
  {
    id: "verified-erotix",
    title: "Erotix Green Energy",
    description:
      "Solar EPC field operations and contractor portal with offline mobile reporting for ground-mounted solar installations.",
    image: null,
    tags: "Android, Offline SQLite, REST API, Field Reports",
    url: "/portfolio",
  },
  {
    id: "verified-ailaptopwala",
    title: "AI Laptop Wala (ailaptopwala.com)",
    description:
      "Customer-facing catalog, device serial number tracking, warranty verification, and instant WhatsApp repair booking portal.",
    image: null,
    tags: "Inventory Tracker, Serial Tracking, WhatsApp Hooks, SEO Schema",
    url: "https://ailaptopwala.com",
  },
];

export function FeaturedWork({ items }: { items: PortfolioItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const displayItems = items.length > 0 ? items : VERIFIED_FEATURED_WORK;

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fw-card",
        { y: 28, opacity: 0.01 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item) => {
            const tags = item.tags ? item.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
            const isExternal = Boolean(item.url && /^https?:\/\//i.test(item.url));
            const card = (
              <article className="fw-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/30 hover:shadow-[0_24px_64px_-16px_rgba(255,159,28,0.35)]">
                {item.image ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center border-b border-white/5 bg-gradient-to-br from-[#ff9f1c]/12 via-[#0d0e11] to-[#3b82f6]/10">
                    <span className="font-display text-4xl font-bold tracking-tight text-[#ff9f1c]/40">
                      {item.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  )}
                  {tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-300"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.url && (
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold text-[#ffb84d] opacity-100 transition-opacity duration-300 md:opacity-75 md:group-hover:opacity-100">
                      View project <ArrowUpRight className="size-3.5" />
                    </span>
                  )}
                </div>
              </article>
            );

            return (
              <li key={item.id}>
                {item.url ? (
                  isExternal ? (
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
                    <Link
                      href={item.url}
                      className="block h-full"
                      aria-label={`View ${item.title} project`}
                    >
                      {card}
                    </Link>
                  )
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
