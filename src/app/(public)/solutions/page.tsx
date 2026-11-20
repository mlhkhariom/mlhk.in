import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Phone, ShieldCheck } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { CollectionHubJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import { BRAND } from "@/lib/brand";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";
import { LOCATION_HUBS } from "@/lib/seo-locations";

export const revalidate = 3600;

const SOLUTION_VISUALS: Record<string, { image: string; alt: string }> = {
  "website-development-cost-india": {
    image: "/images/showcase/case-iksc.jpg",
    alt: "Affordable custom business website engineered for Indian mobile networks",
  },
  "website-redesign-editing-and-speed-fix": {
    image: "/images/showcase/studio-hub.jpg",
    alt: "Website redesign, speed optimization, and clean code overhaul desk",
  },
  "seo-and-google-ranking-services-india": {
    image: "/images/showcase/seo-growth.jpg",
    alt: "Google SEO ranking trajectory and pan-India search growth dashboard",
  },
  "instagram-facebook-google-ads-marketing": {
    image: "/images/showcase/seo-growth.jpg",
    alt: "Instagram, Facebook, and Google Ads ROI performance analytics",
  },
  "mobile-app-development-india": {
    image: "/images/showcase/mobile-app.jpg",
    alt: "Native Android and Flutter mobile application with Indian UPI checkout",
  },
  "all-in-one-digital-it-partner-india": {
    image: "/images/showcase/erp-dashboard.jpg",
    alt: "All-in-one IT partner workspace for web, app, SEO, and custom GST ERP",
  },
};

const SOLUTIONS_FAQS = [
  {
    question: "Can one company handle my website, existing site edits, SEO, Instagram/Facebook Ads, and mobile app?",
    answer:
      "Yes. MLHK Infotech is structured as an all-in-one digital and IT engineering partner so your website speed, SEO schema, ad creatives, mobile app, CRM/ERP, and ongoing support all work together under one accountable team.",
  },
  {
    question: "How does MLHK Infotech deliver lower pricing than large agencies without cutting quality?",
    answer:
      "Because our engineering headquarters is in Shajapur & Indore (Madhya Pradesh) with 100% in-house developers and zero sales-middleman layers. You get clean Next.js, Android, SQL, and Cloudflare Edge engineering at 40–60% lower cost than metro agencies.",
  },
  {
    question: "Do you provide official GST invoices and 100% code ownership?",
    answer:
      "Yes. MLHK Infotech is registered under MSME Udyam (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ). Once paid, 100% of the source code, design assets, and domain ownership belongs to you.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "All-in-One Digital & IT Solutions — Web, Apps, SEO & Ads",
    description:
      "Solve every digital & IT challenge under one roof: low-cost custom websites, existing website redesign & editing, Google SEO, Instagram/Facebook/Google Ads, Android apps & ERP across India.",
    path: "/solutions",
    keywords: [
      "all in one digital IT solution India",
      "low cost website development company India",
      "website redesign and editing services India",
      "Instagram Facebook Google Ads agency India",
      "SEO and mobile app development India",
    ],
  });
}

export default function SolutionsIndexPage() {
  return (
    <>
      <CollectionHubJsonLd
        path="/solutions"
        name="MLHK Infotech Digital & IT Solutions Hub"
        description="End-to-end digital solutions for Indian and global businesses: affordable website development, website redesign & editing, SEO & AEO/GEO ranking, Instagram/Facebook/Google Ads, Android apps, and all-in-one IT partnership."
        items={SOLUTION_PAGES.map((sol) => ({
          name: sol.seoTitle,
          url: `${BRAND.url}/solutions/${sol.slug}`,
          description: sol.metaDescription,
        }))}
      />
      <FaqJsonLd faqs={SOLUTIONS_FAQS} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
      />

      <PageHero
        eyebrow="Every Digital Problem, One Solution"
        title={
          <>
            Low-cost pricing, <span className="text-brand">enterprise-grade quality.</span>
          </>
        }
        description="Whether you need a brand-new website, want to edit or speed up an existing site, rank higher on Google, run profitable Instagram/Facebook/Google Ads, or launch an Android app — MLHK Infotech handles everything end to end."
      />

      {/* Solution Cards */}
      <section className="bg-[#050607] px-4 pb-24 md:px-6" aria-labelledby="solutions-grid">
        <div className="mx-auto max-w-6xl">
          <p data-speakable="summary" className="mb-10 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
            Pick the exact problem you want to solve below for transparent INR packages, step-by-step delivery timelines, and direct WhatsApp consultation with our senior engineers.
          </p>

          <div id="solutions-grid" className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SOLUTION_PAGES.map((sol, idx) => {
              const visual = SOLUTION_VISUALS[sol.slug] ?? {
                image: "/images/showcase/studio-hub.jpg",
                alt: sol.shortTitle,
              };
              return (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0c10] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/50 hover:shadow-[0_24px_60px_-28px_rgba(255,159,28,0.3)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#ff9f1c]/55"
                  />
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#08090c]">
                      <ShowcaseImage
                        src={visual.image}
                        alt={visual.alt}
                        priority={idx < 2}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/35 to-transparent"
                      />
                      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-xs">
                        <span className="font-mono font-semibold tabular-nums text-[#ffb84d]">
                          Starting {sol.startingPriceInr}
                        </span>
                        <span className="font-mono tabular-nums text-zinc-300">
                          0{idx + 1}. {sol.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                          {sol.shortTitle}
                        </h2>
                        <ArrowUpRight className="mt-1 size-5 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{sol.heroSummary}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs md:px-7">
                    <span className="tabular-nums text-zinc-300">
                      Delivery: <strong className="text-white">{sol.deliveryTime}</strong>
                    </span>
                    <span className="font-semibold text-[#ffb84d] group-hover:text-white">
                      View pricing &amp; deliverables →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Hub Cross-Link Strip */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Available Across Bharat</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                Delivered Across All 28 States, Tier 1–5 Cities &amp; Villages
              </h2>
            </div>
            <Link href="/locations" className="text-sm font-semibold text-[#ffb84d] hover:text-white">
              Browse all locations →
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            {LOCATION_HUBS.slice(0, 12).map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="text-zinc-300 transition-colors hover:text-[#ffb84d]">
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6" aria-labelledby="solutions-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">Questions</p>
          <h2 id="solutions-faq" className="mt-3 font-display text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            {SOLUTIONS_FAQS.map((faq) => (
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

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="size-4 text-[#ff9f1c]" />
            <span>MSME &amp; GST Registered · Direct Founder Engineering Desk</span>
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance">
            Not Sure Where to Start? Tell Us Your Goal.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Send a quick WhatsApp message describing what you want to build, fix, or promote — we will send you an honest plan and lowest-waste fixed quote.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c] px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] whitespace-nowrap"
            >
              Request Free Quote <ArrowUpRight className="size-4" />
            </Link>
            <a
              href="https://wa.me/919165100124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] whitespace-nowrap"
            >
              <Phone className="size-4 text-[#ff9f1c]" />
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
