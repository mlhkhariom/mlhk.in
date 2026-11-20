import { safeDb } from "@/lib/db/safe";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ArrowUpRight, Code2, Smartphone, Megaphone, PenTool, LifeBuoy, Building2, Bot, ShieldCheck } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { ServiceJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import { BRAND, SERVICE_LINES, CAPABILITIES, SERVICE_DETAILS, FAQS } from "@/lib/brand";
import type { Metadata } from "next";

export const revalidate = 60;

const ICONS = { web: Code2, mobile: Smartphone, marketing: Megaphone, branding: PenTool, support: LifeBuoy, enterprise: Building2, ai: Bot, cybersecurity: ShieldCheck };

const SERVICE_SHOWCASE: Record<string, { image: string; alt: string; price: string }> = {
  web: {
    image: "/images/showcase/case-iksc.jpg",
    alt: "Custom dark-luxury web application and e-commerce storefront",
    price: "From ₹15,000",
  },
  mobile: {
    image: "/images/showcase/mobile-app.jpg",
    alt: "Native Android business and UPI checkout mobile app",
    price: "From ₹45,000",
  },
  marketing: {
    image: "/images/showcase/seo-growth.jpg",
    alt: "Google SEO growth and regional India digital marketing analytics",
    price: "From ₹10,000/mo",
  },
  enterprise: {
    image: "/images/showcase/erp-dashboard.jpg",
    alt: "Enterprise GST billing, inventory, and multi-branch ERP console",
    price: "From ₹65,000",
  },
  branding: {
    image: "/images/showcase/studio-hub.jpg",
    alt: "Brand identity and dark-luxury UI design workstation",
    price: "From ₹12,000",
  },
  ai: {
    image: "/images/showcase/case-ailaptop.jpg",
    alt: "AI automation, WhatsApp business workflows, and hardware integrations",
    price: "Custom Scope",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Services",
    description: "Web development, mobile apps, digital marketing, graphics and branding, support, enterprise systems and AI automation from MLHK Infotech.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const db = safeDb();
  const dbServices = await db.select().from(services).where(eq(services.active, true)).all().catch(() => []);

  const lines = [
    ...SERVICE_LINES.map((s) => ({ id: s.id, slug: s.slug, title: s.title, description: s.description, points: s.points as readonly string[] })),
    ...CAPABILITIES.map((c) => ({ id: c.id, slug: c.slug, title: c.title, description: c.description, points: [] as readonly string[] })),
  ];

  return (
    <>
      <ServiceJsonLd
        services={[
          ...lines.map((l) => ({
            name: l.title,
            description: l.description,
            url: `${BRAND.url}/services/${l.slug}`,
          })),
          ...dbServices.map((s) => ({
            name: s.title,
            description: s.description ?? "",
            url: `${BRAND.url}/services`,
          })),
        ]}
      />
      <FaqJsonLd faqs={FAQS} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />

      <PageHero
        eyebrow="Services"
        title={<>Everything your business needs, <span className="text-brand">from one team.</span></>}
        description="Web, mobile, SEO & paid ads, branding, support, enterprise ERP and AI automation. Built 100% in-house with transparent Indian pricing and direct founder accountability."
      />

      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* 6 Primary Visual Service Cards (Symmetrical 3x2 Grid) */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lines
              .filter((l) => Boolean(SERVICE_SHOWCASE[l.id]))
              .map((l, idx) => {
                const showcase = SERVICE_SHOWCASE[l.id]!;
                const hasDetail = SERVICE_DETAILS.some((d) => d.slug === l.slug);
                return (
                  <li
                    key={l.id}
                    className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0c10] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/45 hover:shadow-[0_24px_60px_-28px_rgba(255,159,28,0.3)]"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#ff9f1c]/55"
                    />
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#08090c]">
                      <ShowcaseImage
                        src={showcase.image}
                        alt={showcase.alt}
                        priority={idx < 3}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/30 to-transparent"
                      />
                      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-xs">
                        <span className="font-mono font-semibold tabular-nums text-[#ffb84d]">
                          {showcase.price}
                        </span>
                        <span className="font-mono tabular-nums text-zinc-300">0{idx + 1}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <h2 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                        {l.title}
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{l.description}</p>

                      {l.points.length > 0 && (
                        <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-zinc-400">
                          {l.points.join(" · ")}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs">
                        {hasDetail ? (
                          <Link
                            href={`/services/${l.slug}`}
                            className="inline-flex items-center gap-1.5 font-semibold text-[#ffb84d] transition-colors hover:text-white"
                          >
                            <span>Explore scope</span>
                            <ArrowUpRight className="size-3.5" />
                          </Link>
                        ) : (
                          <span className="text-zinc-400">In-house engineering</span>
                        )}
                        <Link
                          href={`/contact?service=${encodeURIComponent(l.slug)}`}
                          className="font-semibold text-zinc-300 transition-colors hover:text-white"
                        >
                          Get quote →
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>

          {/* 2 Infrastructure & Support Pillars (Balanced 2-Column Band) */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {lines
              .filter((l) => !SERVICE_SHOWCASE[l.id])
              .map((l, idx) => {
                const Icon = ICONS[l.id as keyof typeof ICONS] ?? Code2;
                const hasDetail = SERVICE_DETAILS.some((d) => d.slug === l.slug);
                return (
                  <li
                    key={l.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0c10] p-7 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#ff9f1c]/45"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#ff9f1c]/55"
                    />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-xl border border-[#ff9f1c]/25 bg-[#ff9f1c]/10 text-[#ffb84d]">
                          <Icon className="size-5" strokeWidth={1.6} />
                        </span>
                        <span className="font-mono text-xs tabular-nums text-zinc-400">0{idx + 7}</span>
                      </div>
                      <h2 className="mt-5 font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                        {l.title}
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{l.description}</p>
                      {l.points.length > 0 && (
                        <p className="mt-4 text-xs text-zinc-400">{l.points.join(" · ")}</p>
                      )}
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                      {hasDetail ? (
                        <Link
                          href={`/services/${l.slug}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-[#ffb84d] transition-colors hover:text-white"
                        >
                          <span>Explore scope</span>
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      ) : (
                        <span className="text-zinc-400">24/7 monitored reliability</span>
                      )}
                      <Link
                        href={`/contact?service=${encodeURIComponent(l.slug)}`}
                        className="font-semibold text-zinc-300 transition-colors hover:text-white"
                      >
                        Get quote →
                      </Link>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      {/* Deep-dive: How we help clients choose the right technology */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-24 md:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Engineering Philosophy</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            How we help you pick the right technology without wasting money.
          </h2>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-300 md:text-base">
            <p>
              The most common mistake business owners make when hiring an agency is asking for a specific technology instead of describing their business problem. A client might say &ldquo;we need an Android app built on Flutter&rdquo; when a lightweight mobile-responsive web platform would cost half as much, launch three weeks sooner, and not require customers to download a 40 MB app.
            </p>
            <p>
              At MLHK Infotech, we start by looking at how your customers and staff will actually use the software. If your sales team visits rural dealers where mobile network cuts out frequently, we architect an offline-first SQLite database that syncs automatically when connection returns. If your business handles high-volume GST billing and order tracking, we build clean database schemas on PostgreSQL or D1 SQLite that generate PDF receipts in 200 milliseconds.
            </p>
            <p>
              We don&apos;t push trendy frameworks or sell you bloated annual software subscriptions. We engineer bespoke tools that your staff can learn in an afternoon, and we back every system with our direct founder phone number for ongoing support.
            </p>
          </div>

          {/* Agency Comparison Matrix */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="p-6 md:p-8 border-b border-white/10">
              <h3 className="font-display text-xl font-bold text-white">How Working With MLHK Infotech Compares</h3>
              <p className="mt-2 text-xs text-zinc-400">An honest breakdown of your options when hiring a software partner in India.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 text-xs leading-relaxed">
              {/* Option 1: Cheap Freelancers */}
              <div className="p-6 space-y-3">
                <span className="font-mono text-zinc-500 uppercase tracking-wider block">Freelancer Marketplaces</span>
                <h4 className="font-display font-bold text-base text-zinc-200">Solo Freelancers</h4>
                <p className="text-zinc-400">
                  Often cheap initially, but high risk. Freelancers frequently vanish when bugs happen, use pirated WordPress themes with hidden security backdoors, rarely provide GST invoices, and leave zero code documentation when you need updates.
                </p>
                <div className="pt-2 text-zinc-500 font-mono text-[11px]">Risk: High abandonment rate</div>
              </div>

              {/* Option 2: Big Metro Agencies */}
              <div className="p-6 space-y-3">
                <span className="font-mono text-zinc-500 uppercase tracking-wider block">Metro Agencies (Delhi/Bangalore)</span>
                <h4 className="font-display font-bold text-base text-zinc-200">Large Digital Agencies</h4>
                <p className="text-zinc-400">
                  Charge ₹3 to ₹10 lakh minimums to cover expensive office rent and corporate salaries. Your project is usually handed off to inexperienced junior trainees while an account manager acts as a middleman, causing 2-week delays for simple fixes.
                </p>
                <div className="pt-2 text-zinc-500 font-mono text-[11px]">Risk: Expensive overhead &amp; slow iterations</div>
              </div>

              {/* Option 3: MLHK Infotech */}
              <div className="p-6 space-y-3 bg-[#ff9f1c]/[0.03]">
                <span className="font-mono text-[#ffb84d] uppercase tracking-wider block font-semibold">The MLHK Standard</span>
                <h4 className="font-display font-bold text-base text-[#ffb84d]">MLHK Infotech</h4>
                <p className="text-zinc-300">
                  Direct founder accountability from Hariom Vishwkarma. 100% in-house engineered code, complete IP ownership handover, official MSME Udyam and GST-compliant invoicing, and direct WhatsApp support with realistic Indian pricing.
                </p>
                <div className="pt-2 text-emerald-400 font-mono text-[11px] font-semibold">Advantage: Direct architect accountability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070809] px-4 py-24 md:px-6" aria-labelledby="faq-services">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Questions</p>
          <h2 id="faq-services" className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">Frequently asked</h2>
          <div className="mt-10">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050607] px-4 py-24 text-center md:px-6">
        <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-7 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]">
          Discuss your project
          <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </section>
    </>
  );
}
