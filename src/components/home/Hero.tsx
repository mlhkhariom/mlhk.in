"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/components/home/utils";
import { BRAND, CAPABILITIES, SERVICE_LINES } from "@/lib/brand";

const ChromeMark3D = dynamic(
  () => import("@/components/home/ChromeMark3D").then((m) => m.ChromeMark3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center" aria-hidden>
        <div className="flex size-48 items-center justify-center rounded-full border border-[#ff9f1c]/25 bg-gradient-to-br from-[#ff9f1c]/15 via-white/[0.03] to-[#3b82f6]/10 shadow-[0_0_80px_-20px_rgba(255,159,28,0.45)]">
          <span className="font-display text-6xl font-bold tracking-tight text-chrome">M</span>
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
      tl.fromTo(".hero-line", { y: 18 }, { y: 0, duration: 0.7, stagger: 0.07 })
        .fromTo(".hero-copy", { y: 12 }, { y: 0, duration: 0.6 }, "<0.1")
        .fromTo(".hero-cta", { y: 10 }, { y: 0, duration: 0.55, stagger: 0.06 }, "<0.08")
        .fromTo(".hero-mark", { scale: 0.94 }, { scale: 1, duration: 1.0, ease: "expo.out" }, 0);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#050607] pt-16 md:pt-20"
      aria-labelledby="hero-heading"
    >
      {/* ambient light: warm amber from top, subtle steel-blue rim below */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18%] h-[65vh] w-[68vw] -translate-x-1/2 rounded-full bg-[#ff9f1c]/18 blur-[120px]" />
        <div className="absolute bottom-[-22%] left-[12%] h-[46vh] w-[46vw] rounded-full bg-[#3b82f6]/12 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/3%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/3%)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="hero-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-zinc-300">
              <span className="font-semibold text-[#ffb84d]">MSME Udyam &amp; GST Registered</span>
              <span aria-hidden className="text-zinc-600">·</span>
              <span>Shajapur &amp; Indore, MP</span>
              <span aria-hidden className="text-zinc-600">·</span>
              <span>Serving All India &amp; Global Clients</span>
            </p>

            <h1
              id="hero-heading"
              className="mt-4 text-balance font-display text-[2.45rem] font-bold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[4rem]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">We build the</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block text-brand">systems that</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block text-chrome">run your business.</span>
              </span>
            </h1>

            <p className="hero-copy mt-5 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Custom websites, Android apps, SEO &amp; Meta/Google Ads, CRM/ERP systems, and AI
              automation — built in-house from scratch at practical Indian budgets with 100% source
              code ownership.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticCta href="/contact" primary>
                Start your project
              </MagneticCta>
              <MagneticCta href="/solutions">View packages &amp; pricing</MagneticCta>
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
                All-India Hubs
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="hero-mark relative mx-auto aspect-square w-full max-w-[390px]">
              <ChromeMark3D />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-6 rounded-full border border-[#ff9f1c]/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-12 rounded-full border border-white/[0.06]"
              />
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
            <dt className="text-xs font-medium text-zinc-400">Projects Shipped</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-white md:text-3xl">
              20+
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-400">Core Service Lines</dt>
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
