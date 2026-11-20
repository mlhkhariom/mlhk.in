"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, Quote } from "lucide-react";
import {
  CASE_STUDY_CATEGORIES,
  filterCaseStudies,
  type CaseStudyCategory,
} from "@/lib/case-studies";
import { cn } from "@/lib/utils";

export function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState<"All Work" | CaseStudyCategory>("All Work");
  const visibleProjects = filterCaseStudies(selectedCategory);

  return (
    <div className="space-y-12">
      {/* Interactive Category Filter Bar */}
      <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
            Verified Client Work &amp; Architecture Case Studies
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            Filter by engineering domain ({visibleProjects.length} shipped systems)
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Filter case studies by category"
          className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-[#0c0d10] p-1.5"
        >
          {CASE_STUDY_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "min-h-[40px] whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200",
                  active
                    ? "bg-[#ff9f1c] text-black shadow-sm"
                    : "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Studies Grid */}
      <ul
        className={cn(
          "grid grid-cols-1 gap-7",
          visibleProjects.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1",
        )}
      >
        {visibleProjects.map((cs, idx) => (
          <li key={cs.id}>
            <article
              className={cn(
                "group flex h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0d10] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40",
                visibleProjects.length === 1 ? "flex-col lg:grid lg:grid-cols-12" : "flex-col",
              )}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-[#08090c]",
                  visibleProjects.length === 1
                    ? "aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-full"
                    : "aspect-[16/10]",
                )}
              >
                <Image
                  src={cs.image}
                  alt={cs.imageAlt}
                  fill
                  loading={idx === 0 ? "eager" : "lazy"}
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-black/35 to-transparent"
                />
                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#ffb84d]">{cs.category}</span>
                  <span className="font-mono text-zinc-300">
                    {cs.location} · {cs.period}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-1 flex-col p-6 md:p-8",
                  visibleProjects.length === 1 && "lg:col-span-7",
                )}
              >
                <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                  {cs.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-400">{cs.subtitle}</p>

                {/* Measurable Outcomes */}
                <dl className="mt-5 grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-[#060709] p-4">
                  {cs.outcomes.map((o) => (
                    <div key={o.label}>
                      <dt className="text-[11px] text-zinc-400">{o.label}</dt>
                      <dd className="mt-1 font-display text-base font-bold tabular-nums text-white md:text-lg">
                        {o.metric}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Challenge & Solution */}
                <div className="mt-5 grid gap-4 text-sm leading-relaxed sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-zinc-400">Business Challenge</p>
                    <p className="mt-1.5 text-zinc-300">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#ffb84d]">MLHK Engineering Solution</p>
                    <p className="mt-1.5 text-zinc-200">{cs.solution}</p>
                  </div>
                </div>

                {/* Architecture Diagram Breakdown */}
                <details className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 group/arch">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-white marker:content-none">
                    <span className="inline-flex items-center gap-2">
                      <Layers className="size-4 text-[#ffb84d]" />
                      <span>System Architecture Blueprint ({cs.architecture.length} Layers)</span>
                    </span>
                    <span className="font-mono text-[#ffb84d] transition-transform group-open/arch:rotate-45">+</span>
                  </summary>
                  <ol className="mt-4 space-y-3 border-t border-white/10 pt-4 text-xs">
                    {cs.architecture.map((node, i) => (
                      <li key={node.layer} className="grid gap-1 sm:grid-cols-12">
                        <span className="font-mono font-semibold text-[#ffb84d] sm:col-span-3">
                          0{i + 1}. {node.layer}
                        </span>
                        <span className="font-medium text-white sm:col-span-4">{node.tech}</span>
                        <span className="text-zinc-400 sm:col-span-5">{node.role}</span>
                      </li>
                    ))}
                  </ol>
                </details>

                {/* Client Testimonial */}
                <blockquote className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-zinc-300">
                  <p className="flex items-start gap-2.5">
                    <Quote className="mt-1 size-4 shrink-0 text-[#ffb84d]" aria-hidden />
                    <span>&ldquo;{cs.clientQuote.text}&rdquo;</span>
                  </p>
                  <footer className="mt-2 pl-6 text-xs text-zinc-400">
                    {cs.clientQuote.author} · {cs.clientQuote.role}
                  </footer>
                </blockquote>

                {/* Stack & Link Footer */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs">
                  <span className="text-zinc-400">{cs.stack.join(" · ")}</span>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/contact?service=web-development&project=${encodeURIComponent(cs.title)}`}
                      className="font-semibold text-zinc-300 transition-colors hover:text-white"
                    >
                      Request similar build
                    </Link>
                    {cs.external ? (
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:text-white"
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={cs.url}
                        className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:text-white"
                      >
                        <span>Explore Ecosystem</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
