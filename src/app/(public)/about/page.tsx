import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND, TIMELINE, VENTURES } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "About",
    description: "MLHK Infotech started in Barnawad, Shajapur in 2020. We build web, mobile, enterprise and AI systems for businesses across India.",
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "AboutPage",
          name: `About ${BRAND.name}`,
          description: "MLHK Infotech builds enterprise-grade digital systems from Shajapur, Madhya Pradesh, India.",
          mainEntity: {
            "@type": "Organization",
            name: BRAND.name,
            foundingDate: BRAND.foundedMonthIso,
            founder: { "@type": "Person", name: BRAND.founder, jobTitle: BRAND.founderRole },
            address: { "@type": "PostalAddress", addressLocality: BRAND.city, addressRegion: "Madhya Pradesh", addressCountry: "IN" },
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <PageHero
        eyebrow="About"
        title={<>Founded in {BRAND.foundedYear}. <span className="text-brand">Built to last.</span></>}
        description="MLHK Infotech is a technology company from Shajapur, Madhya Pradesh. We build complete digital systems that automate work, scale with the business and keep running after launch."
      />

      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-12">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8 md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Founder</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-white">{BRAND.founder}</h2>
            <p className="mt-1 text-sm text-zinc-500">{BRAND.founderRole}</p>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              Technology entrepreneur and system architect based in Shajapur. Started MLHK Infotech in April {BRAND.foundedYear} while
              studying Computer Applications at Vikram University, Ujjain. Experienced across the full product lifecycle: UI/UX,
              automation, SaaS and scaling.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Java", "Python (AI)", "SQL", "Node.js", "Android", "IBM Cloud", "System architecture"].map((s) => (
                <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">{s}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8 md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Mission</p>
            <p className="mt-4 font-display text-2xl font-bold leading-snug text-white">
              Every system we deliver should pay for itself by automating work, cutting waste or opening a new channel.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              We agree scope before code is written, and every feature has to justify its place
              in the business.
            </p>
          </div>
        </div>

        {/* National Mission & Pride in Bharat */}
        <div className="mx-auto mt-6 max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.05] via-[#08090b] to-[#050607] p-8 md:p-10">
            {/* Subtle Tricolor Top Accent Line */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-80"
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-zinc-300">
                  <span className="text-sm">🇮🇳</span>
                  <span>Digital India &bull; Make in India Spirit</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Indigenous Technology Crafted in Bharat, Deployed Globally.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  MLHK Infotech was founded in Shajapur, Madhya Pradesh with a clear conviction: world-class software engineering and enterprise automation don&apos;t have to be confined to Tier-1 metros. By building robust, sovereign digital infrastructure from Bharat, we actively champion the vision of <strong>Digital India</strong> and <strong>Atmanirbhar Bharat</strong>—empowering homegrown enterprises to compete on the global stage without exorbitant foreign vendor lock-in.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 shrink-0 sm:grid-cols-2 lg:w-80">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#ffb84d]">100%</p>
                  <p className="mt-1 text-xs text-zinc-400">In-house Engineering</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <p className="font-display text-2xl font-bold text-white">Tier-2/3</p>
                  <p className="mt-1 text-xs text-zinc-400">Grassroots Innovation</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <p className="font-display text-2xl font-bold text-emerald-400">Global</p>
                  <p className="mt-1 text-xs text-zinc-400">Edge Deployment</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#ff9f1c]">Atmanirbhar</p>
                  <p className="mt-1 text-xs text-zinc-400">Zero Vendor Lock-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Our journey</p>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.year} className="bg-[#050607] p-7">
                <time className="font-display text-2xl font-bold text-[#ffb84d]" dateTime={t.year}>{t.year}</time>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t.event}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Ventures</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {VENTURES.map((v) => (
              <li key={v.name} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200">
                {v.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 text-center">
          <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-7 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]">
            Work with us
            <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
