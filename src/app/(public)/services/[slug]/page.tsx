import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  Layers,
  FileCode,
  Compass,
  CheckCircle2,
  Clock,
  Terminal,
  Cpu,
  Palette,
  ExternalLink,
} from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd, { FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { SERVICE_DETAILS, BRAND } from "@/lib/brand";
import { EXTENDED_SERVICE_DATA } from "@/lib/service-details-extended";
import { BrandingShowcase } from "@/components/services/BrandingShowcase";

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

async function findService(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const service = SERVICE_DETAILS.find((s) => s.slug === slug);
  if (!service) notFound();
  const extended = EXTENDED_SERVICE_DATA[slug];
  return { service, extended };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { service, extended } = await findService(params);
  const title =
    service.slug === "graphics-and-branding"
      ? "Graphics & Branding Design System by Red Xerox Studio | MLHK Infotech"
      : `${service.name} Engineering in India | MLHK Infotech`;

  const description = extended?.subheading ?? service.summary;

  return buildSeo({
    title,
    description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { service, extended } = await findService(params);

  // Combine standard and extended FAQs for comprehensive search schema
  const combinedFaqs = [
    ...(extended?.extendedFaqs ?? []),
    ...service.faqs,
  ];

  return (
    <>
      <JsonLd
        data={{
          "@type": "Service",
          "@id": `${BRAND.url}/services/${service.slug}#service`,
          name: service.name,
          description: extended?.subheading ?? service.summary,
          url: `${BRAND.url}/services/${service.slug}`,
          serviceType: service.name,
          provider: {
            "@type": "Organization",
            "@id": `${BRAND.url}/#organization`,
            name: BRAND.name,
            url: BRAND.url,
            subOrganization: extended?.studioName
              ? {
                  "@type": "Organization",
                  name: extended.studioName,
                  description: "Creative visual identity and design laboratory of MLHK Infotech.",
                }
              : undefined,
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "AdministrativeArea", name: "Madhya Pradesh" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} Deliverables & Architectural Specs`,
            itemListElement: (extended?.pillars ?? []).map((p) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: p.title,
                description: p.description,
              },
            })),
          },
        }}
      />
      <FaqJsonLd faqs={combinedFaqs} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <PageHero
        eyebrow={extended?.heroBadge ?? "Service Architecture"}
        title={
          service.slug === "graphics-and-branding" ? (
            <>
              Bespoke Visual Identity.{" "}
              <span className="text-brand">Engineered for Prestige.</span>
            </>
          ) : (
            <>
              {service.name}. <span className="text-brand">Built to Scale.</span>
            </>
          )
        }
        description={extended?.subheading ?? service.intro}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. EXECUTIVE STATS & CAPABILITY BADGES STRIP
          ───────────────────────────────────────────────────────────── */}
      {extended?.stats && (
        <section className="border-y border-white/10 bg-[#050607]/80 px-4 py-6 md:px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
            {extended.stats.map((st) => (
              <div key={st.label} className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {st.value}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                  {st.label}
                </span>
                <span className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  {st.detail}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. AUDIENCE TARGETING DOSSIER
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 pt-12 md:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#ff9f1c]/25 bg-gradient-to-r from-[#ff9f1c]/[0.08] via-transparent to-[#ff9f1c]/[0.03] p-7 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                Target Enterprise Persona
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-white">
                Who this service is engineered for:
              </h3>
            </div>
            <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
              Direct Engagement • No Subcontracting
            </span>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {service.audience}
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. BESPOKE INTERACTIVE SHOWCASE (FOR GRAPHICS & BRANDING)
          ───────────────────────────────────────────────────────────── */}
      {service.slug === "graphics-and-branding" && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <BrandingShowcase />
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. PHILOSOPHY & ANTI-SLOP DISCIPLINE
          ───────────────────────────────────────────────────────────── */}
      {extended?.philosophyText && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 md:p-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Sparkles className="size-3 text-[#ff9f1c]" />
                Engineering Philosophy
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                {extended.philosophyTitle}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                {extended.philosophyText.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. CORE ARCHITECTURAL PILLARS (DOUBLE-BEZEL LUXURY CARDS)
          ───────────────────────────────────────────────────────────── */}
      {extended?.pillars && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Architectural Pillars
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
                  {extended.pillarsTitle}
                </h2>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-zinc-400">
                {extended.pillarsSubtitle}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {extended.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] via-[#07080a] to-[#050607] p-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:shadow-[0_24px_64px_-16px_rgba(255,159,28,0.25)]"
                >
                  <div className="h-full rounded-[calc(2rem-0.375rem)] bg-[#07080a] p-6 flex flex-col justify-between">
                    <div>
                      {pillar.badge && (
                        <span className="w-fit inline-block rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-[#ffb84d] uppercase tracking-wider">
                          {pillar.badge}
                        </span>
                      )}
                      <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-zinc-400">
                        {pillar.tagline}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-2">
                        Technical Specifications:
                      </p>
                      <ul className="space-y-1.5">
                        {pillar.specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2 text-xs text-zinc-300"
                          >
                            <Check className="size-3 text-[#ff9f1c] shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. TANGIBLE ASSET DELIVERABLES VAULT
          ───────────────────────────────────────────────────────────── */}
      {extended?.deliverables && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Deliverable Artifacts
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {extended.deliverablesTitle}
                </h2>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-zinc-400">
                {extended.deliverablesSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extended.deliverables.map((del) => (
                <div
                  key={del.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#ff9f1c]/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#ffb84d]">
                      {del.format}
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
                      {del.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {del.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {del.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. THE COMPARISON MATRIX (GENERIC SHORTCUTS VS MLHK)
          ───────────────────────────────────────────────────────────── */}
      {extended?.comparison && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Competitive Contrast
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {extended.comparisonTitle}
                </h2>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-zinc-400">
                {extended.comparisonSubtitle}
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01]">
              <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.04] p-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <div className="col-span-12 md:col-span-3">Strategic Dimension</div>
                <div className="col-span-12 md:col-span-4 mt-2 md:mt-0 text-red-400/80">
                  Generic Freelancers / AI Templates
                </div>
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0 text-[#ffb84d]">
                  MLHK Infotech &amp; Red Xerox Studio
                </div>
              </div>

              <div className="divide-y divide-white/5 text-xs">
                {extended.comparison.map((item) => (
                  <div
                    key={item.aspect}
                    className="grid grid-cols-12 p-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="col-span-12 md:col-span-3 font-semibold text-white">
                      {item.aspect}
                    </div>
                    <div className="col-span-12 md:col-span-4 mt-1 md:mt-0 text-zinc-400 line-through decoration-red-500/40">
                      {item.genericApproach}
                    </div>
                    <div className="col-span-12 md:col-span-5 mt-1 md:mt-0 text-zinc-200 font-medium">
                      <span className="text-emerald-400 mr-1.5 font-bold">✓</span>
                      {item.mlhkApproach}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. DELIVERY ROADMAP & SPRINT PHASES
          ───────────────────────────────────────────────────────────── */}
      {extended?.timeline && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Execution Protocol
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {extended.timelineTitle}
                </h2>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-zinc-400">
                {extended.timelineSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {extended.timeline.map((st) => (
                <div
                  key={st.phase}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-[#ff9f1c]">
                        {st.phase}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                        {st.timeline}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-white">
                      {st.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {st.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                      Key Outputs:
                    </p>
                    <ul className="space-y-1">
                      {st.outputs.map((out) => (
                        <li key={out} className="text-[11px] text-zinc-300 flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-[#ff9f1c]" />
                          {out}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. PRODUCTION TOOLING & TECH STACK
          ───────────────────────────────────────────────────────────── */}
      {extended?.tools && (
        <section className="bg-[#050607] px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              Production Tooling
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              {extended.toolsTitle}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extended.tools.map((tl) => (
                <div
                  key={tl.name}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#ffb84d]">
                    <Terminal className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-white">{tl.name}</h3>
                      <span className="text-[10px] font-mono text-zinc-500">[{tl.category}]</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {tl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          10. EXTENDED FREQUENTLY ASKED QUESTIONS (FAQ)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="border-t border-white/10 bg-[#070809] px-4 py-24 md:px-6"
        aria-labelledby="service-faq"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
            Inquiries &amp; Technical Doubts
          </p>
          <h2
            id="service-faq"
            className="mt-3 font-display text-3xl font-bold text-white md:text-4xl"
          >
            Frequently Asked Questions About {service.name}
          </h2>
          <p className="mt-2 text-xs text-zinc-400">
            Clear, transparent operational answers regarding ownership, timelines, and deliverables.
          </p>

          <div className="mt-10 divide-y divide-white/10">
            {combinedFaqs.map((f) => (
              <details
                key={f.question}
                className="group py-5 transition-colors hover:bg-white/[0.01]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold text-white marker:content-none">
                  <span>{f.question}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 pr-8">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. EXECUTIVE ENGAGEMENT DESK & DIRECT CONSULTATION
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 py-24 md:px-6">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/15 bg-gradient-to-r from-white/[0.06] via-[#0b0c0e] to-white/[0.02] p-8 md:p-14 text-center shadow-[0_30px_90px_-30px_rgba(255,159,28,0.3)]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            Direct Engagement
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">
            Ready to Engineer Your {service.name}?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
            Every project is architected with direct oversight from Hariom Vishwkarma (MLHK).
            No junior subcontractors. No templates. Just sovereign, high-impact execution.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3.5 pl-7 pr-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffb84d]"
            >
              Schedule Technical Consultation
              <span className="flex size-8 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>

            <a
              href="https://wa.me/919165100124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
            >
              <span>Direct WhatsApp Discussion</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Registered HQ: {BRAND.location} • Guaranteed response within business hours
          </p>
        </div>
      </section>
    </>
  );
}
