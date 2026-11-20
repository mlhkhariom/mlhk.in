import { safeDb } from "@/lib/db/safe";
import { portfolio } from "@/lib/db/schema";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { PortfolioClient } from "@/components/portfolio/PortfolioClient";
import { VERIFIED_CASE_STUDIES } from "@/lib/case-studies";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Case Studies & Engineering Portfolio",
    description:
      "Verified case studies from MLHK Infotech: e-commerce storefronts, solar EPC offline Android apps, hardware portals, high-concurrency publishing, and custom UI systems built across India.",
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const db = safeDb();
  const items = await db.select().from(portfolio).all().catch(() => []);
  const schemaEntries =
    items.length > 0
      ? items.map((p) => ({
          title: p.title,
          description: p.description ?? "",
          url: p.url ?? "https://mlhk.in/portfolio",
          image: p.image ?? undefined,
        }))
      : VERIFIED_CASE_STUDIES.map((p) => ({
          title: p.title,
          description: p.solution,
          url: p.external ? p.url : `https://mlhk.in${p.url}`,
          image: `https://mlhk.in${p.image}`,
        }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://mlhk.in/portfolio#page",
          name: "MLHK Infotech Engineering Portfolio & Case Studies",
          description:
            "Selected web platforms, Android applications, and enterprise systems delivered by MLHK Infotech across India.",
          url: "https://mlhk.in/portfolio",
          creator: {
            "@type": "Organization",
            "@id": "https://mlhk.in/#organization",
            name: "MLHK Infotech",
          },
          mainEntity: {
            "@type": "ItemList",
            name: "Selected Projects & Case Studies",
            numberOfItems: schemaEntries.length,
            itemListElement: schemaEntries.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                name: p.title,
                description: p.description,
                url: p.url,
                ...(p.image ? { image: p.image } : {}),
                creator: {
                  "@type": "Organization",
                  "@id": "https://mlhk.in/#organization",
                },
              },
            })),
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }]} />

      <PageHero
        eyebrow="Work & Case Studies"
        title={
          <>
            Products we have <span className="text-brand">shipped.</span>
          </>
        }
        description="Real web platforms, offline Android apps, e-commerce storefronts, and enterprise systems engineered for Indian businesses — each backed by measurable outcomes and clean system architecture."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl space-y-16">
          {items.length === 0 ? (
            <PortfolioClient />
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, idx) => {
                const fallbackImg =
                  VERIFIED_CASE_STUDIES[idx % VERIFIED_CASE_STUDIES.length]?.image ??
                  "/images/showcase/studio-hub.jpg";
                return (
                  <li
                    key={p.id}
                    className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0d10] transition-all duration-200 hover:-translate-y-1 hover:border-[#ff9f1c]/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      <Image
                        src={p.image || fallbackImg}
                        alt={p.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-lg font-bold text-white">{p.title}</h2>
                      {p.description && (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{p.description}</p>
                      )}
                      {p.tags && (
                        <p className="mt-4 text-xs text-zinc-400">
                          {p.tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:text-white"
                        >
                          <span>View project</span>
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Engineering Commitments */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-8 md:p-12">
            <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
              How We Build Every System
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
              Our Engineering Commitments on Every Project
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3 text-sm leading-relaxed text-zinc-300">
              <div className="rounded-xl border border-white/10 bg-[#050607] p-6">
                <p className="font-display text-base font-bold text-white">01. Direct Code Ownership</p>
                <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                  Zero vendor lock-in or hostage licensing fees. When your project is settled, you receive
                  full source code, Git repository rights, database schemas, and deployment documentation.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#050607] p-6">
                <p className="font-display text-base font-bold text-white">02. Sub-Second India Edge Speed</p>
                <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                  Optimized for real Indian mobile networks with sub-50ms edge caching across Mumbai,
                  Delhi, Chennai, and Hyderabad PoPs so customers never wait on slow pages.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#050607] p-6">
                <p className="font-display text-base font-bold text-white">03. WhatsApp &amp; GST Ready</p>
                <p className="mt-2.5 text-xs leading-relaxed text-zinc-300">
                  Indian businesses run on WhatsApp and UPI. We connect order receipts, lead routing,
                  and automated alerts straight into WhatsApp alongside GST-ready invoicing.
                </p>
              </div>
            </div>
          </div>

          {/* Connected CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-7 pr-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02] hover:bg-[#ffb84d] active:scale-[0.98]"
            >
              <span>Start your project</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
            >
              <span>See transparent INR packages</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
