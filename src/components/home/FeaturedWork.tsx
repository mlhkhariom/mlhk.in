"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { VERIFIED_CASE_STUDIES } from "@/lib/case-studies";

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
        { y: 24, opacity: 0.01 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const caseStudies = VERIFIED_CASE_STUDIES.slice(0, 3);
  const hasCmsItems = items.length > 0;

  return (
    <section
      ref={ref}
      id="work"
      className="relative bg-[#070809] px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="work-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-[#ff9f1c]/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
              Case Studies &amp; Verified Outcomes
            </p>
            <h2
              id="work-heading"
              className="mt-3 text-balance font-display text-3xl font-bold leading-[1.06] tracking-tight text-white md:text-5xl"
            >
              Real systems shipped across India.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white"
          >
            <span>Explore all 6 case studies</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {hasCmsItems ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => {
              const fallbackImg = caseStudies[idx % caseStudies.length]?.image ?? "/images/showcase/studio-hub.jpg";
              const tags = item.tags ? item.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
              const isExternal = Boolean(item.url && /^https?:\/\//i.test(item.url));
              return (
                <li key={item.id}>
                  <article className="fw-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0d10] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0b0e]">
                      <Image
                        src={item.image || fallbackImg}
                        alt={item.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-black/25 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-zinc-300">
                          {item.description}
                        </p>
                      )}
                      {tags.length > 0 && (
                        <p className="mt-4 text-xs text-zinc-400">{tags.slice(0, 4).join(" · ")}</p>
                      )}
                      {item.url && (
                        isExternal ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-[#ffb84d] hover:text-white"
                          >
                            <span>Visit live project</span>
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={item.url}
                            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-[#ffb84d] hover:text-white"
                          >
                            <span>Inspect case study</span>
                            <ArrowUpRight className="size-3.5" />
                          </Link>
                        )
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <li key={cs.id}>
                <article className="fw-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0d10] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:shadow-[0_24px_60px_-24px_rgba(255,159,28,0.28)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#090a0d]">
                    <Image
                      src={cs.image}
                      alt={cs.imageAlt}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-black/30 to-transparent"
                    />
                    <p className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-xs font-medium text-zinc-200">
                      <span className="text-[#ffb84d]">{cs.category}</span>
                      <span className="font-mono text-[11px] text-zinc-300">{cs.period}</span>
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                      {cs.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-zinc-400">{cs.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{cs.solution}</p>

                    {/* Measurable Outcomes Strip */}
                    <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-3.5">
                      {cs.outcomes.map((o) => (
                        <div key={o.label}>
                          <dt className="text-[11px] text-zinc-400">{o.label}</dt>
                          <dd className="mt-0.5 font-display text-sm font-bold tabular-nums text-white">
                            {o.metric}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Expandable Architecture Flow */}
                    <details className="mt-4 group/arch">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-zinc-300 transition-colors hover:text-[#ffb84d] marker:content-none">
                        <span className="inline-flex items-center gap-1.5">
                          <Layers className="size-3.5 text-[#ffb84d]" />
                          <span>Inspect System Architecture</span>
                        </span>
                        <span className="font-mono text-zinc-400 group-open/arch:rotate-45 transition-transform">+</span>
                      </summary>
                      <ol className="mt-3 space-y-2 border-t border-white/10 pt-3 text-xs">
                        {cs.architecture.map((node, i) => (
                          <li key={node.layer} className="flex items-start gap-2.5 text-zinc-300">
                            <span className="font-mono text-[11px] font-semibold text-[#ffb84d] tabular-nums">
                              0{i + 1}
                            </span>
                            <div>
                              <span className="font-semibold text-white">{node.layer}:</span>{" "}
                              <span className="text-zinc-400">{node.tech} — {node.role}</span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </details>

                    {/* Grounded Client Quote */}
                    <blockquote className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-zinc-300">
                      <p className="flex items-start gap-2">
                        <Quote className="mt-0.5 size-3.5 shrink-0 text-[#ffb84d]" aria-hidden />
                        <span>&ldquo;{cs.clientQuote.text}&rdquo;</span>
                      </p>
                      <footer className="mt-2 pl-5 text-[11px] text-zinc-400">
                        {cs.clientQuote.author} · {cs.clientQuote.role}
                      </footer>
                    </blockquote>

                    <div className="mt-auto flex items-center justify-between pt-5 text-xs">
                      <span className="text-zinc-400">{cs.stack.slice(0, 3).join(" · ")}</span>
                      {cs.external ? (
                        <a
                          href={cs.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#ffb84d] hover:text-white"
                        >
                          <span>Live Site</span>
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={cs.url}
                          className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#ffb84d] hover:text-white"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
