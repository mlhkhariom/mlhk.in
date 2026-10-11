"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";
import { BRAND, FAQS } from "@/lib/brand";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

/** Frequently asked questions, using the company answers from the brief and services page. */
export function Faq() {
  return (
    <section className="relative bg-[#070809] px-4 py-28 md:px-6 md:py-36" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Questions</p>
          <h2 id="faq-heading" className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white">
            Before you start.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            Still unsure? Write to us at{" "}
            <a href={`mailto:${BRAND.email}`} className="text-[#ffb84d] underline-offset-4 hover:underline">{BRAND.email}</a>.
          </p>
        </div>
        <div className="md:col-span-8">
          {FAQS.map((f) => (
            <details key={f.question} className="group border-b border-white/10 py-5 first:pt-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                {f.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action with direct contact channels. */
export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-panel", { y: 40, opacity: 0, scale: 0.98 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} className="relative bg-[#050607] px-4 pb-28 pt-12 md:px-6 md:pb-36">
      <div className="cta-panel relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[#ff9f1c]/25 bg-[#0a0a0b] p-8 md:p-16">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-[380px] rounded-full bg-[#ff9f1c]/25 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 size-[360px] rounded-full bg-[#3b82f6]/20 blur-[120px]" />

        <div className="relative grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Start a project</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              Let&apos;s build the <span className="text-brand">next version</span> of your business.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400">
              Tell us what you are trying to achieve. We reply with a plan, a timeline and a clear cost, not a sales deck.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Start your project
                <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          <ul className="space-y-3 md:col-span-5">
            <ContactRow href={`mailto:${BRAND.email}`} icon={Mail} label="Email" value={BRAND.email} />
            <ContactRow href={`tel:${BRAND.phoneE164}`} icon={Phone} label="Phone" value={BRAND.phoneDisplay} />
            <ContactRow href={BRAND.instagramUrl} icon={InstagramGlyph} label="Instagram" value={`@${BRAND.instagramHandle}`} external />
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon: Icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.06]"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#ff9f1c]/10 text-[#ffb84d]">
          <Icon className="size-[18px]" strokeWidth={1.6} />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</span>
          <span className="block truncate text-sm font-medium text-white">{value}</span>
        </span>
      </a>
    </li>
  );
}
