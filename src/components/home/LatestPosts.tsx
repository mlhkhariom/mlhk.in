"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const VERIFIED_LATEST_NOTES: (BlogPost & { href: string })[] = [
  {
    id: "note-cloudflare-edge",
    slug: "cloudflare-edge-hosting-india",
    href: "/blog#cloudflare-edge-hosting-india",
    title: "Why We Chose Cloudflare Edge Over Traditional cPanel Hosting for Indian Clients",
    excerpt:
      "Every system we build runs directly on Cloudflare's Global Edge network across Mumbai, Delhi, Chennai, Kolkata, and Hyderabad for sub-30ms responses.",
    coverImage: null,
    publishedAt: "2026-10-01",
    createdAt: "2026-10-01",
  },
  {
    id: "note-internal-dashboard",
    slug: "excel-to-internal-dashboard",
    href: "/blog#excel-to-internal-dashboard",
    title: "How We Replaced 5 Messy Excel Sheets With One Lightweight Internal Dashboard",
    excerpt:
      "Bespoke 4-screen internal systems for incoming leads, GST invoicing with WhatsApp PDF dispatch, live order tracking, and pending payments.",
    coverImage: null,
    publishedAt: "2026-09-01",
    createdAt: "2026-09-01",
  },
  {
    id: "note-android-vs-pwa",
    slug: "native-android-vs-pwa-india",
    href: "/blog#native-android-vs-pwa-india",
    title: "Native Android App vs Responsive Website: What Indian Businesses Actually Need",
    excerpt:
      "An honest architectural breakdown of when to ship a Progressive Web App versus a native Android app with GPS, Bluetooth printing, or offline scanning.",
    coverImage: null,
    publishedAt: "2026-08-01",
    createdAt: "2026-08-01",
  },
];

export function LatestPosts({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const displayPosts: (BlogPost & { href: string })[] =
    posts.length > 0
      ? posts.map((post) => ({ ...post, href: `/blog/${post.slug}` }))
      : VERIFIED_LATEST_NOTES;

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lp-card",
        { y: 24, opacity: 0.01 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="insights"
      className="relative bg-[#050607] px-4 py-28 md:px-6 md:py-36"
      aria-labelledby="insights-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              Insights
            </p>
            <h2
              id="insights-heading"
              className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl"
            >
              From the desk.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white"
          >
            All articles <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => {
            const date = formatDate(post.publishedAt ?? post.createdAt);
            return (
              <li key={post.id}>
                <Link
                  href={post.href}
                  className="lp-card group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/30 hover:shadow-[0_24px_64px_-16px_rgba(255,159,28,0.3)]"
                >
                  {date && (
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                      <Calendar className="size-3.5" strokeWidth={1.5} />
                      <time dateTime={post.publishedAt ?? post.createdAt ?? ""}>{date}</time>
                    </div>
                  )}
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#ffb84d]">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-xs font-semibold text-[#ffb84d] opacity-100 transition-opacity duration-300 md:opacity-75 md:group-hover:opacity-100">
                    Read article <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
