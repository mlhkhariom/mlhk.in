"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Database,
  Globe,
  Layers,
  MessageSquare,
  Monitor,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "mockup" | "architecture" | "comparison";

interface ArchNode {
  id: string;
  step: string;
  title: string;
  tech: string;
  latency: string;
  detail: string;
  benefit: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: "client",
    step: "01",
    title: "Customer Browser & Mobile 4G",
    tech: "Next.js 16 + Mobile-First UI",
    latency: "< 0.8s FCP",
    detail:
      "Built for real Indian smartphones across Tier-1 to Tier-5 cities and village networks. Zero bloated WordPress themes or 8MB hero sliders.",
    benefit: "Visitors stay and convert instead of bouncing on slow 4G connections.",
    icon: Smartphone,
  },
  {
    id: "edge",
    step: "02",
    title: "Cloudflare Global Edge (India PoPs)",
    tech: "Mumbai · Delhi · Chennai · Hyderabad",
    latency: "< 45ms TTFB",
    detail:
      "Every page is served from the nearest Indian edge node with automatic SSL, DDoS mitigation, and clean canonical redirects.",
    benefit: "Faster Core Web Vitals directly improve Google Search & local rankings.",
    icon: Globe,
  },
  {
    id: "core",
    step: "03",
    title: "Custom API, Auth & SQL Ledger",
    tech: "Drizzle ORM · D1 / PostgreSQL · RBAC",
    latency: "99.9% Uptime",
    detail:
      "Structured databases for leads, GST invoices, inventory, client portals, and CMS updates with strict role-based security.",
    benefit: "Replaces messy spreadsheets and paper registers with one owned system.",
    icon: Database,
  },
  {
    id: "automation",
    step: "04",
    title: "WhatsApp, SEO & Growth Loop",
    tech: "WhatsApp API · Schema JSON-LD · IndexNow",
    latency: "Instant Dispatch",
    detail:
      "New inquiries, order receipts, and booking alerts flow straight to your WhatsApp & CRM while automated sitemaps keep Google indexed.",
    benefit: "Zero missed leads — customers get fast replies on the channel they trust.",
    icon: MessageSquare,
  },
];

const COMPARISON_ROWS = [
  {
    metric: "Mobile Load Speed (4G India)",
    mlhk: "< 0.8 seconds (Edge Cached)",
    typical: "4.5 – 8.2 seconds (Heavy template)",
  },
  {
    metric: "Business Website Starting Budget",
    mlhk: "₹15,000 fixed quote",
    typical: "₹60,000 – ₹1.5L+ metro agency overhead",
  },
  {
    metric: "Source Code & Domain Ownership",
    mlhk: "100% yours on handover",
    typical: "Locked in vendor account / annual hostage fee",
  },
  {
    metric: "Google SEO, Schema & Local Ranking",
    mlhk: "Built into architecture from Day 1",
    typical: "Charged separately after launch",
  },
  {
    metric: "Communication & Accountability",
    mlhk: "Direct founder & senior engineers",
    typical: "Sales rep middlemen & outsourced juniors",
  },
  {
    metric: "WhatsApp, UPI & Indian GST Workflows",
    mlhk: "Native integration included",
    typical: "Generic Western plugins that break locally",
  },
];

export function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<TabId>("mockup");
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("edge");

  const activeNode = ARCH_NODES.find((n) => n.id === selectedNodeId) ?? ARCH_NODES[1];

  return (
    <section
      className="relative border-y border-white/10 bg-[#07080a] px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="engineering-lab-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
              Interactive Engineering Preview
            </p>
            <h2
              id="engineering-lab-heading"
              className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
            >
              See how we engineer <span className="text-brand">fast, owned systems.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-300 lg:col-span-5 lg:justify-self-end md:text-base">
            Inspect a live interactive storefront mockup, click through our Indian Edge architecture,
            or compare custom MLHK builds against generic agency templates.
          </p>
        </div>

        {/* Clean Segmented Control Tabs */}
        <div
          role="tablist"
          aria-label="Engineering preview views"
          className="mt-10 inline-flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-[#0c0d10] p-1.5"
        >
          <button
            type="button"
            role="tab"
            id="tab-mockup"
            aria-selected={activeTab === "mockup"}
            aria-controls="panel-mockup"
            onClick={() => setActiveTab("mockup")}
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
              activeTab === "mockup"
                ? "bg-[#ff9f1c] text-black shadow-sm"
                : "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
            )}
          >
            <Monitor className="size-4" />
            <span>Live UI Mockup</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-architecture"
            aria-selected={activeTab === "architecture"}
            aria-controls="panel-architecture"
            onClick={() => setActiveTab("architecture")}
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
              activeTab === "architecture"
                ? "bg-[#ff9f1c] text-black shadow-sm"
                : "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
            )}
          >
            <Layers className="size-4" />
            <span>System Architecture</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-comparison"
            aria-selected={activeTab === "comparison"}
            aria-controls="panel-comparison"
            onClick={() => setActiveTab("comparison")}
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
              activeTab === "comparison"
                ? "bg-[#ff9f1c] text-black shadow-sm"
                : "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
            )}
          >
            <Zap className="size-4" />
            <span>MLHK vs Templates</span>
          </button>
        </div>

        {/* TAB 1: LIVE INTERACTIVE UI MOCKUP */}
        {activeTab === "mockup" && (
          <div
            id="panel-mockup"
            role="tabpanel"
            aria-labelledby="tab-mockup"
            className="mt-8 grid gap-8 rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-6 md:p-10 lg:grid-cols-12 lg:items-center"
          >
            <div className="space-y-6 lg:col-span-5">
              <div>
                <p className="text-xs font-medium text-[#ffb84d]">Interactive Storefront &amp; Lead Demo</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  Built for Indian UPI &amp; WhatsApp Conversions
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Every business website we build pairs clean desktop clarity with thumb-friendly
                  mobile speed and instant WhatsApp order or quote routing. Try toggling the
                  preview viewport or simulating a customer checkout below.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewportMode("desktop")}
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors",
                    viewportMode === "desktop"
                      ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white",
                  )}
                >
                  <Monitor className="size-3.5" />
                  <span>Desktop View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewportMode("mobile")}
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors",
                    viewportMode === "mobile"
                      ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white",
                  )}
                >
                  <Smartphone className="size-3.5" />
                  <span>Mobile 4G View</span>
                </button>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5 text-xs">
                <div>
                  <dt className="text-zinc-400">Lighthouse</dt>
                  <dd className="mt-1 font-display text-lg font-bold tabular-nums text-white">98+</dd>
                </div>
                <div>
                  <dt className="text-zinc-400">Edge TTFB</dt>
                  <dd className="mt-1 font-display text-lg font-bold tabular-nums text-[#ffb84d]">42ms</dd>
                </div>
                <div>
                  <dt className="text-zinc-400">Starting</dt>
                  <dd className="mt-1 font-display text-lg font-bold tabular-nums text-white">₹15k</dd>
                </div>
              </dl>

              <Link
                href="/contact?service=web-development"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] transition-colors hover:text-white"
              >
                <span>Build a storefront like this for your business</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            {/* Interactive Live Browser / Mobile Frame */}
            <div className="flex justify-center lg:col-span-7">
              <div
                className={cn(
                  "w-full overflow-hidden rounded-2xl border border-white/15 bg-[#050607] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.9)] transition-all duration-300",
                  viewportMode === "mobile" ? "max-w-[340px]" : "max-w-full",
                )}
              >
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#0d0f13] px-4 py-2.5 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                  </div>
                  <span className="font-mono text-zinc-300">https://yourbusiness.in</span>
                  <span className="font-mono text-[#ffb84d]">SSL</span>
                </div>

                {/* Mockup Screen Content */}
                <div className="p-5">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
                    <Image
                      src="/images/showcase/studio-hub.jpg"
                      alt="Custom web application interface engineered by MLHK Infotech"
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-[#050607]/35 to-transparent"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium text-[#ffb84d]">Custom Storefront &amp; CRM</p>
                        <p className="font-display text-sm font-bold text-white sm:text-base">
                          Instant Catalogue + UPI Checkout
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-white">
                        ₹2,499
                      </span>
                    </div>
                  </div>

                  {/* Interactive Dispatch Action */}
                  <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {orderDispatched
                          ? "Order #MLHK-842 Confirmed"
                          : "Test One-Tap WhatsApp & UPI Flow"}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-400">
                        {orderDispatched
                          ? "GST invoice generated & WhatsApp receipt dispatched in 1.2s."
                          : "Click to preview how customer orders hit your WhatsApp + Admin CRM."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOrderDispatched((v) => !v)}
                      className={cn(
                        "inline-flex min-h-[40px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200",
                        orderDispatched
                          ? "border border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                          : "bg-[#ff9f1c] text-black hover:bg-[#ffb84d]",
                      )}
                    >
                      {orderDispatched ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Reset Demo</span>
                        </>
                      ) : (
                        <span>Simulate Order Dispatch</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE ARCHITECTURE DIAGRAM */}
        {activeTab === "architecture" && (
          <div
            id="panel-architecture"
            role="tabpanel"
            aria-labelledby="tab-architecture"
            className="mt-8 rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-6 md:p-10"
          >
            <div className="grid gap-4 md:grid-cols-4">
              {ARCH_NODES.map((node) => {
                const Icon = node.icon;
                const isSelected = node.id === activeNode.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200",
                      isSelected
                        ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/10 shadow-[0_16px_40px_-20px_rgba(255,159,28,0.35)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#ffb84d]">
                        {node.step}
                      </span>
                      <Icon
                        className={cn(
                          "size-5 transition-colors",
                          isSelected ? "text-[#ffb84d]" : "text-zinc-400 group-hover:text-white",
                        )}
                      />
                    </div>
                    <div className="mt-6">
                      <p className="font-display text-base font-bold text-white">{node.title}</p>
                      <p className="mt-1 text-xs text-zinc-400">{node.tech}</p>
                    </div>
                    <p className="mt-4 border-t border-white/10 pt-3 font-mono text-xs font-semibold tabular-nums text-zinc-200">
                      {node.latency}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Node Inspector */}
            <div className="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-[#050607] p-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="text-xs font-medium text-[#ffb84d]">
                  Layer {activeNode.step} · {activeNode.tech}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">
                  {activeNode.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{activeNode.detail}</p>
              </div>
              <div className="rounded-xl border border-[#ff9f1c]/25 bg-[#ff9f1c]/[0.06] p-4 md:col-span-4">
                <p className="text-xs font-semibold text-[#ffb84d]">Business Impact</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">{activeNode.benefit}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PERFORMANCE & COST COMPARISON */}
        {activeTab === "comparison" && (
          <div
            id="panel-comparison"
            role="tabpanel"
            aria-labelledby="tab-comparison"
            className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0c0f]"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-6 py-4 font-display text-xs font-bold uppercase tracking-wider text-zinc-400">
                      What Matters for Your Business
                    </th>
                    <th className="px-6 py-4 font-display text-xs font-bold uppercase tracking-wider text-[#ffb84d]">
                      MLHK Infotech Custom Build
                    </th>
                    <th className="px-6 py-4 font-display text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Typical Template / Metro Agency
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.metric} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-medium text-white">{row.metric}</td>
                      <td className="px-6 py-4 font-medium text-emerald-300">
                        <span className="inline-flex items-center gap-2">
                          <ShieldCheck className="size-4 shrink-0 text-[#ffb84d]" />
                          <span>{row.mlhk}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-4 border-t border-white/10 bg-[#07080a] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-zinc-300">
                Transparent fixed-cost proposals with official MSME &amp; GST invoices.
              </p>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:text-white"
              >
                <span>Compare all solution packages</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
