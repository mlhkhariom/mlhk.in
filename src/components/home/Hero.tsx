"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/components/home/utils";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import { BRAND, CAPABILITIES, SERVICE_LINES } from "@/lib/brand";

const ChromeMark3D = dynamic(
  () => import("@/components/home/ChromeMark3D").then((m) => m.ChromeMark3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center" aria-hidden>
        <div className="flex size-16 items-center justify-center rounded-full border border-[#ff9f1c]/30 bg-gradient-to-br from-[#ff9f1c]/20 via-white/[0.04] to-transparent">
          <span className="font-display text-2xl font-bold tracking-tight text-chrome">M</span>
        </div>
      </div>
    ),
  },
);

const TOTAL_SERVICE_LINES = SERVICE_LINES.length + CAPABILITIES.length;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-line", { y: 18 }, { y: 0, duration: 0.65, stagger: 0.06 })
        .fromTo(".hero-copy", { y: 12 }, { y: 0, duration: 0.55 }, "<0.1")
        .fromTo(".hero-cta", { y: 10 }, { y: 0, duration: 0.5, stagger: 0.06 }, "<0.08")
        .fromTo(".hero-stage", { y: 16, scale: 0.98 }, { y: 0, scale: 1, duration: 0.85, ease: "expo.out" }, 0.05);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#050607] pt-14 md:pt-18"
      aria-labelledby="hero-heading"
    >
      {/* Ambient studio illumination: warm amber spotlight + subtle architectural grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[62vh] w-[70vw] -translate-x-1/2 rounded-full bg-[#ff9f1c]/16 blur-[130px]" />
        <div className="absolute bottom-[-25%] right-[-10%] h-[48vh] w-[42vw] rounded-full bg-[#3b82f6]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/3%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/3%)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_76%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Core Proposition */}
          <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
            <p className="hero-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-zinc-300">
              <span className="font-semibold text-[#ffb84d]">MSME Udyam &amp; GST Verified</span>
              <span aria-hidden className="text-zinc-600">·</span>
              <span>Shajapur HQ &amp; Indore Hub</span>
              <span aria-hidden className="text-zinc-600">·</span>
              <span>Serving All India &amp; Global</span>
            </p>

            <h1
              id="hero-heading"
              className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.03]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">We build the</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block text-brand">systems that</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block text-chrome">grow your business.</span>
              </span>
            </h1>

            <p className="hero-copy mt-5 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Custom websites, Android apps, Google SEO, Instagram &amp; Google Ads, GST ERP
              dashboards, and AI automation — engineered in-house at honest Indian pricing with
              100% source code ownership.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticCta href="/contact" primary>
                Start your project
              </MagneticCta>
              <MagneticCta href="/solutions">Packages &amp; pricing</MagneticCta>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-zinc-400">
              <Link href="/solutions/website-development-cost-india" className="whitespace-nowrap transition-colors hover:text-[#ffb84d]">
                Websites ₹15k+
              </Link>
              <span aria-hidden className="text-zinc-600">/</span>
              <Link href="/solutions/website-redesign-editing-and-speed-fix" className="whitespace-nowrap transition-colors hover:text-[#ffb84d]">
                Site Fix ₹8k+
              </Link>
              <span aria-hidden className="text-zinc-600">/</span>
              <Link href="/solutions/instagram-facebook-google-ads-marketing" className="whitespace-nowrap transition-colors hover:text-[#ffb84d]">
                SEO, Insta &amp; Google Ads
              </Link>
              <span aria-hidden className="text-zinc-600">/</span>
              <Link href="/locations" className="whitespace-nowrap transition-colors hover:text-[#ffb84d]">
                All-India Delivery
              </Link>
            </div>
          </div>

          {/* Right Column: Flagship Layered Studio Showcase Stage */}
          <div className="hero-stage flex min-w-0 flex-col lg:col-span-5">
            <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-b from-[#12141a] via-[#0b0c10] to-[#08090c] shadow-[0_32px_90px_-30px_rgba(0,0,0,0.95)]">
              {/* Subtle 1px warm amber specular top edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff9f1c]/55 to-transparent"
              />

              {/* Studio Craft Showcase Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#090a0d] lg:flex-1">
                <ShowcaseImage
                  src="/images/showcase/studio-hub.jpg"
                  alt="MLHK Infotech flagship software architecture studio workstation displaying custom dashboards"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/30 to-transparent"
                />
                <div className="absolute bottom-3.5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-[#ffb84d]">
                      In-House Engineering Studio
                    </p>
                    <p className="mt-0.5 font-display text-sm font-bold text-white">
                      Web · Android · SEO · ERP Systems
                    </p>
                  </div>
                  <Link
                    href="/portfolio"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-zinc-200 transition-colors hover:text-[#ffb84d]"
                  >
                    <span>Case studies</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Grounded Verification & 3D Identity Crest Footer */}
              <div className="flex items-center gap-4 border-t border-white/10 bg-[#08090c]/90 p-5">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-[#ff9f1c]/25 bg-[#050607]">
                  <ChromeMark3D />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <ShieldCheck className="size-3.5 shrink-0 text-[#ffb84d]" />
                    <span className="truncate">Direct Founder Accountability</span>
                  </p>
                  <p className="truncate font-mono text-[11px] tabular-nums text-zinc-300">
                    UDYAM: {BRAND.udyamNumber}
                  </p>
                  <p className="truncate font-mono text-[11px] tabular-nums text-zinc-400">
                    GSTIN: {BRAND.gstin} · {BRAND.founder}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column proof strip cleanly visible above the fold */}
        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-4 lg:mt-10">
          <div>
            <dt className="text-xs font-medium text-zinc-400">Established</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-white md:text-3xl">
              {BRAND.foundedYear}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-400">Systems Shipped</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-white md:text-3xl">
              20+
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-400">Service Disciplines</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-white md:text-3xl">
              {TOTAL_SERVICE_LINES}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-400">Code Ownership</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-[#ffb84d] md:text-3xl">
              100% Yours
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function MagneticCta({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "hero-cta group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[#ff9f1c] py-3 pl-6 pr-2 text-sm font-semibold text-black shadow-[0_0_40px_-10px_rgba(255,159,28,0.55)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:bg-[#ffb84d] active:scale-[0.98]"
          : "hero-cta group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] py-3 pl-6 pr-2 text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:border-[#ff9f1c]/50 hover:text-[#ffb84d] active:scale-[0.98]"
      }
    >
      <span>{children}</span>
      <span
        className={
          primary
            ? "flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
            : "flex size-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
        }
      >
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
