import { safeDb } from "@/lib/db/safe";
import { getDb } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Portfolio",
    description: "Selected work from MLHK Infotech: web platforms, mobile apps and enterprise systems built for clients across India.",
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const db = safeDb();
  const items = await db.select().from(portfolio).all().catch(() => []);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://mlhk.in/portfolio#page",
          name: "MLHK Infotech Engineering Portfolio",
          description: "Selected web platforms, Android applications, and enterprise systems delivered by MLHK Infotech.",
          url: "https://mlhk.in/portfolio",
          creator: {
            "@type": "Organization",
            "@id": "https://mlhk.in/#organization",
            name: "MLHK Infotech",
          },
          mainEntity: {
            "@type": "ItemList",
            name: "Selected Projects",
            itemListElement: items.map((p, i) => ({
              "@type": "CreativeWork",
              position: i + 1,
              name: p.title,
              description: p.description ?? "",
              url: p.url ?? "https://mlhk.in/portfolio",
              ...(p.image ? { image: p.image } : {}),
              creator: {
                "@type": "Organization",
                "@id": "https://mlhk.in/#organization",
              },
            })),
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }]} />

      <PageHero
        eyebrow="Work"
        title={<>Products we have <span className="text-brand">shipped.</span></>}
        description="Web platforms, mobile apps and enterprise systems built for clients across India. Each one is measured against the outcome it was built to deliver."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl">
          {items.length === 0 ? (
            <div className="space-y-12">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Verified Client Work &amp; Case Studies</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Real systems shipped for businesses across India.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 max-w-3xl">
                  We don&apos;t just build demo mockups. Here are real products, internal platforms, and brand ventures
                  engineered and supported by MLHK Infotech from Shajapur and Indore.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* 1. IKSC India */}
                <li className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
                        E-Commerce Infrastructure
                      </span>
                      <span className="text-xs font-mono text-zinc-500">2022 – Active</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                      IKSC India (iksc.in)
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-400">India Ka Shopping Centre</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      Engineered a resilient digital storefront tailored for Tier-2/3 Indian retail customers. Includes fast category navigation, dynamic inventory counts, WhatsApp instant checkout dispatch, and lightweight mobile optimization that loads effortlessly even on 3G and spotty mobile networks.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Next.js</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">MySQL</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">WhatsApp API</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Razorpay</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Deployed for Indian Retail</span>
                    <a href="https://iksc.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                      Visit Platform <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </li>

                {/* 2. Erotix Green Energy */}
                <li className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono text-amber-400">
                        Renewable Tech &amp; EPC
                      </span>
                      <span className="text-xs font-mono text-zinc-500">2023 – Active</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                      Erotix Green Energy
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-400">Solar EPC Field Operations &amp; Contractor Portal</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      Replaced paper field registers with a digital workflow to monitor on-site ground-mounted solar installations. Engineers on site log daily pile drilling, module mounting structure (MMS) alignment, and inverter commissioning progress with offline mobile capability.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Android</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Offline SQLite</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">REST API</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Field Reports</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">EPC Operations Tracking</span>
                    <Link href="/subsidiaries" className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                      Brand Details <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </li>

                {/* 3. Red Xerox Studio */}
                <li className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-mono text-purple-400">
                        Creative Studio &amp; UI
                      </span>
                      <span className="text-xs font-mono text-zinc-500">2021 – Active</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                      Red Xerox Studio
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-400">Identity Systems &amp; Digital Design Wing</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      Our in-house design arm that crafts visual identity systems, vector brand marks, packaging guidelines, and custom dark-luxury UI interfaces. Eliminates generic template visuals and produces distinctive visual languages for regional enterprises.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Figma</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Vector Logos</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Typography</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Packaging</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Design Wing of MLHK</span>
                    <Link href="/services/graphics-and-branding" className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                      View Services <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </li>

                {/* 4. TET News */}
                <li className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-mono text-blue-400">
                        Information Portal
                      </span>
                      <span className="text-xs font-mono text-zinc-500">2022 – Active</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                      TET News (TETnews.com)
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-400">Government Examination &amp; Career Updates Portal</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      High-concurrency digital publishing system engineered to handle sudden traffic surges when major state exam results and government job vacancies are announced. Built with aggressive edge caching and automated Telegram alert dispatch pipelines.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Edge Caching</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">PHP/Laravel</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">High Concurrency</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">RSS Syndication</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Digital Publishing</span>
                    <Link href="/subsidiaries" className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                      Brand Details <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </li>

                {/* 5. AI Laptop Wala */}
                <li className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-mono text-cyan-400">
                        Hardware &amp; Retail Portal
                      </span>
                      <span className="text-xs font-mono text-zinc-500">Client Platform</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                      AI Laptop Wala (ailaptopwala.com)
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-400">Retail Inventory, Diagnostics &amp; Repair Booking</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      Engineered customer-facing catalog and repair ticketing system for refurbished laptops and hardware accessories. Features device serial number tracking, warranty status verification, and instant WhatsApp customer booking integration.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Inventory Tracker</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Serial Tracking</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">WhatsApp Hooks</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">SEO Schema</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Retail Hardware Portal</span>
                    <a href="https://ailaptopwala.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                      Live Site <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </li>

                {/* 6. Gud Amrit */}
                <li className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono text-amber-400">
                        Agri-Food Direct-to-Consumer
                      </span>
                      <span className="text-xs font-mono text-zinc-500">Client Platform</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                      Gud Amrit (gudamrit.in)
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-400">Pure Organic Jaggery &amp; Agri-Produce Direct Sales</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      Brand storefront and regional distribution ordering tool for organic, chemical-free sugarcane jaggery products. Clean layout focusing on farm origins, customer trust badges, batch test certifications, and bulk WhatsApp inquiries for wholesale buyers.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">D2C Storefront</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">Batch Certificates</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-300">B2B Wholesale Inquiry</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Organic Agri Brand</span>
                    <a href="https://gudamrit.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                      Live Site <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </li>
              </ul>

              {/* Extra Depth: Engineering Methodologies */}
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">How We Build Every System</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Our Engineering Commitments on Every Project
                </h3>
                <div className="mt-8 grid gap-6 md:grid-cols-3 text-sm leading-relaxed text-zinc-300">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                    <p className="font-display font-bold text-white text-base">01 • Direct Code Ownership</p>
                    <p className="mt-2 text-xs text-zinc-400">
                      We do not keep clients hostage with recurring software licensing fees. When your project is delivered and settled, you receive complete source code, repository rights, database schemas, and documentation.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                    <p className="font-display font-bold text-white text-base">02 • Edge-Cached Speed in India</p>
                    <p className="mt-2 text-xs text-zinc-400">
                      Every site we deploy is optimized for real Indian mobile networks. Sub-50 millisecond responses from Cloudflare edge locations in Mumbai, Delhi, Chennai, and Hyderabad so users never wait on a loading spinner.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                    <p className="font-display font-bold text-white text-base">03 • WhatsApp &amp; Workflow Integration</p>
                    <p className="mt-2 text-xs text-zinc-400">
                      Indian businesses run on WhatsApp, not enterprise email chains. We integrate automated alerts, order receipts, inquiry routing, and repair status pings directly into WhatsApp Business API.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40">
                  {p.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-black">
                      <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-display text-lg font-bold text-white">{p.title}</h2>
                    {p.description && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>}
                    {p.tags && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.tags.split(",").map((t) => (
                          <li key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-zinc-300">{t.trim()}</li>
                        ))}
                      </ul>
                    )}
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:text-white">
                        View project <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 text-center">
            <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-7 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]">
              Start your project
              <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
