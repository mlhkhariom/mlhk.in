"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calculator,
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
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import {
  ESTIMATOR_ADDONS,
  ESTIMATOR_PROJECTS,
  calculateProjectEstimate,
  type EstimatorAddonId,
  type EstimatorProjectId,
} from "@/lib/estimator";
import { cn } from "@/lib/utils";

type TabId = "estimator" | "mockup" | "architecture" | "comparison";

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

const PREVIEW_SCENES = [
  {
    id: "storefront",
    label: "E-Commerce",
    url: "https://iksc.in",
    image: "/images/showcase/case-iksc.jpg",
    alt: "Custom dark-luxury e-commerce storefront engineered by MLHK Infotech",
    kicker: "Custom Storefront & UPI",
    title: "Instant Catalogue + WhatsApp Order Dispatch",
    price: "₹2,499",
  },
  {
    id: "mobile",
    label: "Mobile App",
    url: "app://logistica.in/checkout",
    image: "/images/showcase/mobile-app.jpg",
    alt: "Native Android business checkout mobile application with UPI QR integration",
    kicker: "Android + Offline SQLite",
    title: "Field Operations & One-Tap UPI Checkout",
    price: "₹3,499",
  },
  {
    id: "erp",
    label: "GST ERP",
    url: "https://erp.yourbusiness.in",
    image: "/images/showcase/erp-dashboard.jpg",
    alt: "Custom GST billing and multi-branch inventory ERP dashboard",
    kicker: "Multi-Branch Inventory",
    title: "Automated GST Invoicing & Stock Ledger",
    price: "₹3.14L",
  },
] as const;

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
  const [activeTab, setActiveTab] = useState<TabId>("estimator");
  const [selectedProject, setSelectedProject] = useState<EstimatorProjectId>("business-website");
  const [selectedAddons, setSelectedAddons] = useState<EstimatorAddonId[]>(["whatsapp-automation"]);

  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [previewSceneIdx, setPreviewSceneIdx] = useState<number>(0);
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("edge");

  const activeNode = ARCH_NODES.find((n) => n.id === selectedNodeId) ?? ARCH_NODES[1];
  const activeScene = PREVIEW_SCENES[previewSceneIdx] ?? PREVIEW_SCENES[0];
  const estimate = calculateProjectEstimate(selectedProject, selectedAddons);
  const activeProjectMeta =
    ESTIMATOR_PROJECTS.find((p) => p.id === selectedProject) ?? ESTIMATOR_PROJECTS[0];

  function toggleAddon(addonId: EstimatorAddonId) {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId],
    );
  }

  return (
    <section
      className="relative border-y border-white/10 bg-[#07080a] px-4 py-24 md:px-6 md:py-32"
      aria-labelledby="engineering-lab-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
              Interactive Engineering &amp; Pricing Desk
            </p>
            <h2
              id="engineering-lab-heading"
              className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl"
            >
              Calculate your build cost or <span className="text-brand">inspect our craft.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-300 lg:col-span-5 lg:justify-self-end md:text-base">
            Transparent Indian pricing with zero guesswork — estimate your exact project budget and
            timeline, preview live product interfaces, or inspect our Cloudflare Edge architecture.
          </p>
        </div>

        {/* Clean Segmented Control Tabs */}
        <div
          role="tablist"
          aria-label="Engineering preview and estimator views"
          className="mt-10 inline-flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-[#0c0d10] p-1.5"
        >
          <button
            type="button"
            role="tab"
            id="tab-estimator"
            aria-selected={activeTab === "estimator"}
            aria-controls="panel-estimator"
            onClick={() => setActiveTab("estimator")}
            className={cn(
              "inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
              activeTab === "estimator"
                ? "bg-[#ff9f1c] text-black shadow-sm"
                : "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
            )}
          >
            <Calculator className="size-4" />
            <span>Cost Estimator</span>
          </button>
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

        {/* TAB 1: INTERACTIVE PROJECT COST & TIMELINE ESTIMATOR */}
        {activeTab === "estimator" && (
          <div
            id="panel-estimator"
            role="tabpanel"
            aria-labelledby="tab-estimator"
            className="mt-8 grid gap-8 rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-6 md:p-10 lg:grid-cols-12"
          >
            {/* Left Selector Panel */}
            <div className="space-y-7 lg:col-span-7">
              <div>
                <p className="text-xs font-semibold text-[#ffb84d]">01. Select what you want to build or fix</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {ESTIMATOR_PROJECTS.map((proj, idx) => {
                    const active = proj.id === selectedProject;
                    const isOddLast = idx === ESTIMATOR_PROJECTS.length - 1 && ESTIMATOR_PROJECTS.length % 2 === 1;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedProject(proj.id)}
                        className={cn(
                          "flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-200",
                          isOddLast && "sm:col-span-2",
                          active
                            ? "border-[#ff9f1c]/65 bg-[#ff9f1c]/12 text-white"
                            : "border-white/10 bg-[#07080b] text-zinc-300 hover:border-white/25 hover:text-white",
                        )}
                      >
                        <span className="font-display text-sm font-bold">{proj.shortLabel}</span>
                        <span className="mt-1 text-xs leading-relaxed text-zinc-400">
                          {proj.tagline}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#ffb84d]">02. Add Indian business integrations (optional)</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {ESTIMATOR_ADDONS.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        aria-pressed={checked}
                        onClick={() => toggleAddon(addon.id)}
                        className={cn(
                          "flex items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-all duration-200",
                          checked
                            ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/10 text-white"
                            : "border-white/10 bg-[#07080b] text-zinc-300 hover:border-white/25",
                        )}
                      >
                        <div>
                          <span className="block text-xs font-semibold text-white">{addon.label}</span>
                          <span className="mt-0.5 block text-[11px] text-zinc-400">{addon.detail}</span>
                        </div>
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border",
                            checked
                              ? "border-[#ff9f1c] bg-[#ff9f1c] text-black"
                              : "border-white/20 text-transparent",
                          )}
                        >
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Live Quote Summary */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#ff9f1c]/25 bg-gradient-to-b from-[#13151c] to-[#08090c] p-6 md:p-7 lg:col-span-5">
              <div>
                <p className="text-xs font-medium text-zinc-400">{activeProjectMeta.label}</p>
                <p
                  data-testid="estimator-price"
                  className="mt-2 font-display text-3xl font-bold tabular-nums text-white md:text-4xl"
                >
                  {estimate.formattedRange}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-xs text-zinc-300">
                  <span className="font-mono font-semibold tabular-nums text-[#ffb84d]">
                    {estimate.weeksLabel}
                  </span>
                  <span aria-hidden className="text-zinc-600">·</span>
                  <span>GST Invoice Included</span>
                  <span aria-hidden className="text-zinc-600">·</span>
                  <span>100% Owned Code</span>
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold text-zinc-200">Included in this scope</p>
                  <ul className="mt-3 space-y-2 text-xs text-zinc-300">
                    {estimate.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#ffb84d]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-5">
                <Link
                  href={estimate.contactHref}
                  className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#ffb84d] active:scale-[0.98]"
                >
                  <span>Lock This Estimate</span>
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <p className="text-center text-[11px] text-zinc-400">
                  Pre-fills your service &amp; budget tier on the direct founder inquiry desk.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE INTERACTIVE UI MOCKUP */}
        {activeTab === "mockup" && (
          <div
            id="panel-mockup"
            role="tabpanel"
            aria-labelledby="tab-mockup"
            className="mt-8 grid gap-8 rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-6 md:p-10 lg:grid-cols-12 lg:items-center"
          >
            <div className="space-y-6 lg:col-span-5">
              <div>
                <p className="text-xs font-medium text-[#ffb84d]">Interactive Product &amp; Conversion Preview</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  Built for Indian UPI &amp; WhatsApp Conversions
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Switch between our E-Commerce, Mobile App, and GST ERP interfaces, toggle desktop
                  vs mobile 4G viewports, and simulate an instant customer order dispatch.
                </p>
              </div>

              {/* Scene Selector */}
              <div className="flex flex-wrap items-center gap-1.5">
                {PREVIEW_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      setPreviewSceneIdx(idx);
                      setOrderDispatched(false);
                    }}
                    className={cn(
                      "min-h-[38px] whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                      previewSceneIdx === idx
                        ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white",
                    )}
                  >
                    {scene.label}
                  </button>
                ))}
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
                <span>Build a system like this for your business</span>
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
                  <span className="truncate font-mono text-zinc-300">{activeScene.url}</span>
                  <span className="font-mono text-[#ffb84d]">SSL</span>
                </div>

                {/* Mockup Screen Content */}
                <div className="p-5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
                    <ShowcaseImage
                      key={activeScene.image}
                      src={activeScene.image}
                      alt={activeScene.alt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-[#050607]/30 to-transparent"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium text-[#ffb84d]">{activeScene.kicker}</p>
                        <p className="font-display text-sm font-bold text-white sm:text-base">
                          {activeScene.title}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-white">
                        {activeScene.price}
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

        {/* TAB 3: INTERACTIVE ARCHITECTURE DIAGRAM */}
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

        {/* TAB 4: PERFORMANCE & COST COMPARISON */}
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
