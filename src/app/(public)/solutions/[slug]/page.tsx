import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { FaqJsonLd, HowToJsonLd, SolutionServiceJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { BRAND } from "@/lib/brand";
import { SOLUTION_PAGES, getSolutionPage } from "@/lib/seo-solutions";
import { LOCATION_HUBS } from "@/lib/seo-locations";

export const revalidate = 3600;

export function generateStaticParams() {
  return SOLUTION_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolutionPage(slug);
  if (!sol) return buildSeo({ title: "Solution Not Found", path: `/solutions/${slug}`, noIndex: true });

  return buildSeo({
    title: sol.seoTitle,
    description: sol.metaDescription,
    path: `/solutions/${sol.slug}`,
    keywords: [...sol.keywords],
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sol = getSolutionPage(slug);
  if (!sol) notFound();

  const otherSolutions = SOLUTION_PAGES.filter((item) => item.slug !== sol.slug);

  return (
    <>
      <SolutionServiceJsonLd
        slug={sol.slug}
        title={sol.seoTitle}
        category={sol.category}
        description={sol.metaDescription}
        minPrice={sol.minPriceNumeric}
        maxPrice={sol.maxPriceNumeric}
      />
      <HowToJsonLd
        name={`How MLHK Infotech Delivers ${sol.shortTitle}`}
        description={sol.metaDescription}
        baseUrl={`${BRAND.url}/solutions/${sol.slug}`}
        steps={sol.workflowSteps.map((s) => ({ name: s.name, text: s.text }))}
      />
      <FaqJsonLd faqs={sol.faqs} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: sol.shortTitle, href: `/solutions/${sol.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050607] px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-[#ff9f1c]/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {sol.heroEyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
            {sol.heroHeadline} <span className="text-brand">{sol.heroHighlight}</span>
          </h1>
          <p data-speakable="summary" className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
            {sol.heroSummary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] whitespace-nowrap"
            >
              Get Fixed Quote <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={`https://wa.me/919165100124?text=${encodeURIComponent(`Hi MLHK Infotech, I need help with: ${sol.shortTitle}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] whitespace-nowrap"
            >
              <Phone className="size-4 text-[#ff9f1c]" />
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-xs text-zinc-400">Starting Investment</p>
              <p className="mt-1 font-display text-2xl font-bold tabular-nums text-[#ffb84d]">{sol.startingPriceInr}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Typical Timeline</p>
              <p className="mt-1 font-display text-2xl font-bold tabular-nums text-white">{sol.deliveryTime}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Ownership &amp; Billing</p>
              <p className="mt-1 font-display text-xl font-bold text-white">100% IP · GST Compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem -> Fix Section */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Real Problems Solved</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white text-balance">
            What Usually Goes Wrong — And How MLHK Infotech Fixes It
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {sol.problemsSolved.map((item, idx) => (
              <div key={item.problem} className="rounded-2xl border border-white/10 bg-[#0a0b0d] p-6">
                <p className="text-xs font-semibold tabular-nums text-zinc-400">0{idx + 1}. Common Pain Point</p>
                <h3 className="mt-2 font-display text-base font-bold text-white">{item.problem}</h3>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffb84d]">The MLHK Solution</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Packages */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Transparent Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white text-balance">
            Clear Packages — Lowest Overhead, Highest Craft
          </h2>

          <div className={`mt-10 grid grid-cols-1 gap-6 ${sol.packages.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
            {sol.packages.map((pkg) => (
              <div key={pkg.name} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0b0d] p-7">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="mt-2 font-display text-2xl font-bold tabular-nums text-[#ffb84d]">{pkg.price}</p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">Best for: {pkg.bestFor}</p>
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-5 py-2.5 text-sm font-semibold text-[#ffb84d] transition-colors hover:bg-[#ff9f1c] hover:text-black"
                >
                  Book This Package <ArrowUpRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Workflow (matches HowToJsonLd #step-N anchors) */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Step-by-Step Execution</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white">
            How We Deliver Your Project Smoothly
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sol.workflowSteps.map((step, i) => (
              <li
                key={step.name}
                id={`step-${i + 1}`}
                className="rounded-2xl border border-white/10 bg-[#0a0b0d] p-6"
              >
                <p className="text-xs font-semibold tabular-nums text-[#ffb84d]">0{i + 1}. Step</p>
                <h3 className="mt-2 font-display text-base font-bold text-white">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6" aria-labelledby="sol-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Questions</p>
          <h2 id="sol-faq" className="mt-3 font-display text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            {sol.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Cross-Links: Related Service + Other Solutions + Regional Hubs */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">More Digital Solutions</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href={`/services/${sol.relatedServiceSlug}`} className="font-semibold text-[#ffb84d] hover:underline">
                Deep Technical Service Specs →
              </Link>
              {otherSolutions.map((o) => (
                <Link key={o.slug} href={`/solutions/${o.slug}`} className="text-zinc-300 transition-colors hover:text-[#ffb84d]">
                  {o.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Available Across India (Tier 1–5 Cities &amp; Villages)
              </p>
              <Link href="/locations" className="text-xs font-semibold text-[#ffb84d] hover:underline">
                All 28 States &amp; 8 UTs →
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-400">
              {LOCATION_HUBS.slice(0, 10).map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`} className="transition-colors hover:text-[#ffb84d]">
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0a0b0d] p-6">
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <ShieldCheck className="size-5 shrink-0 text-[#ff9f1c]" />
              <span>Ready to begin? Message MLHK Infotech directly on WhatsApp for a same-day fixed quote.</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-6 py-2.5 text-sm font-semibold text-black whitespace-nowrap"
            >
              Start Now <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
