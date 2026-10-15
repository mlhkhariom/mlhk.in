"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Zap,
  Gauge,
  Code2,
  Server,
  Shield,
  Activity,
  CheckCircle2,
  Play,
  RotateCcw,
  ExternalLink,
  Layers,
  Cpu,
  Database,
  Cloud,
  Terminal,
  ArrowUpRight,
  Sparkles,
  Lock,
  Boxes,
  FileCode,
  Laptop,
  Check,
  Copy,
} from "lucide-react";

type EdgeNode = {
  city: string;
  country: string;
  edgeLatency: number;
  legacyLatency: number;
};

const EDGE_NODES: EdgeNode[] = [
  { city: "Mumbai", country: "India (Domestic Edge)", edgeLatency: 14, legacyLatency: 380 },
  { city: "Singapore", country: "APAC Central Hub", edgeLatency: 22, legacyLatency: 460 },
  { city: "London", country: "United Kingdom", edgeLatency: 35, legacyLatency: 620 },
  { city: "Frankfurt", country: "European Union", edgeLatency: 38, legacyLatency: 680 },
  { city: "New York", country: "North America East", edgeLatency: 48, legacyLatency: 840 },
  { city: "Tokyo", country: "East Asia Hub", edgeLatency: 42, legacyLatency: 590 },
];

type ProjectClass = {
  id: string;
  name: string;
  badge: string;
  description: string;
  recommendedStack: string[];
  latencyTarget: string;
  dbArchitecture: string;
  authSecurity: string;
  scalingCapacity: string;
};

const PROJECT_CLASSES: ProjectClass[] = [
  {
    id: "business",
    name: "High-Performance Business & Marketing Websites",
    badge: "100/100 Core Web Vitals",
    description:
      "Conversion-focused corporate portals and brand websites built to load under 0.8 seconds globally. Combines static server-side generation with edge incremental regeneration for instant discovery.",
    recommendedStack: ["Next.js 16 App Router", "Tailwind CSS v4", "Cloudflare Edge", "Drizzle ORM"],
    latencyTarget: "< 25ms TTFB Worldwide",
    dbArchitecture: "Edge SQLite (Cloudflare D1) + KV State",
    authSecurity: "Turnstile Bot Protection + Content Security Policy",
    scalingCapacity: "100k+ Concurrent Visitors with Zero Degradation",
  },
  {
    id: "saas",
    name: "Scalable Multi-Tenant SaaS Products",
    badge: "Recurring Revenue Ready",
    description:
      "Subscription-based web software platforms equipped with multi-tenant database isolation, automated billing gateways (Stripe/Razorpay), team permissions, and real-time user management.",
    recommendedStack: ["React 19 / Next.js", "PostgreSQL (ACID)", "Drizzle ORM", "Better-Auth", "Tailwind"],
    latencyTarget: "< 45ms Dynamic API Response",
    dbArchitecture: "PostgreSQL Relational Multi-Tenant with Row-Level Security",
    authSecurity: "Session-based HTTP-only cookies, MFA, and RBAC",
    scalingCapacity: "Elastic Cloud Auto-scaling to Millions of Active Users",
  },
  {
    id: "webapp",
    name: "High-Concurrency Custom Web Applications",
    badge: "Real-Time Event Driven",
    description:
      "Complex interactive digital platforms requiring high-frequency WebSockets, asynchronous message queues, live collaboration, and data stream processing without frame drops.",
    recommendedStack: ["TypeScript 5", "Python FastAPI / Go", "Redis Pub/Sub", "PostgreSQL", "Next.js"],
    latencyTarget: "< 15ms WebSocket Event Latency",
    dbArchitecture: "Postgres Read Replicas + In-Memory Redis Cache",
    authSecurity: "ED25519 Signed JWT Tokens & Rate Limiting",
    scalingCapacity: "50,000+ Synchronous Real-Time Socket Connections",
  },
  {
    id: "dashboard",
    name: "Internal Enterprise Dashboards & Admin Panels",
    badge: "High-Density Operations",
    description:
      "Internal mission-control hubs for manufacturing, logistics, and multi-branch retail. Features high-density data tables, CSV/Excel financial exports, and granular staff role permissions.",
    recommendedStack: ["React 19 / Vite", "Shadcn UI", "Tailwind CSS", "PostgreSQL", "FastAPI / Node.js"],
    latencyTarget: "< 35ms Complex Query Calculation",
    dbArchitecture: "Indexed Relational DB with Automated Nightly Snapshots",
    authSecurity: "Granular RBAC (Superadmin, Branch Mgr, Operator) + Audit Logs",
    scalingCapacity: "Multi-branch concurrent operations with zero data races",
  },
];

type FrameworkTech = {
  name: string;
  category: "frontend" | "backend" | "database" | "cloud";
  categoryLabel: string;
  url: string;
  version: string;
  role: string;
  badge: string;
};

const WEB_FRAMEWORKS: FrameworkTech[] = [
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    url: "https://nextjs.org",
    version: "v16 (App Router)",
    role: "Primary full-stack framework with React Server Components, Turbopack, and Edge ISR.",
    badge: "Primary Choice",
  },
  {
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    url: "https://react.dev",
    version: "v19",
    role: "Concurrent UI rendering, server actions, dynamic hooks, and component composition.",
    badge: "Industry Standard",
  },
  {
    name: "Vue.js & Nuxt",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    url: "https://vuejs.org",
    version: "v3 / Nuxt 3",
    role: "Progressive reactivity, Composition API, and lightweight enterprise SSR applications.",
    badge: "Reactive Engine",
  },
  {
    name: "Svelte & SvelteKit",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    url: "https://svelte.dev",
    version: "v5 Runes",
    role: "Zero-virtual-DOM compiled UI yielding ultra-lightweight JavaScript client payloads.",
    badge: "Zero-Virtual-DOM",
  },
  {
    name: "Astro",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    url: "https://astro.build",
    version: "v4 Islands",
    role: "Islands architecture shipping 0kB JavaScript by default for maximum Core Web Vitals.",
    badge: "100/100 CWV",
  },
  {
    name: "Angular",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    url: "https://angular.dev",
    version: "v18 Signals",
    role: "Strict modular enterprise frontend architecture with reactive Signals and dependency injection.",
    badge: "Enterprise Modular",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "UI Styling & Tokens",
    url: "https://tailwindcss.com",
    version: "v4 Oxide",
    role: "Zero-runtime atomic CSS engine delivering instant layout speed and custom dark-luxury tokens.",
    badge: "Zero Runtime",
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Language Standards",
    url: "https://www.typescriptlang.org",
    version: "v5.7+",
    role: "Strict static type validation across frontend, API routes, and database schemas.",
    badge: "100% Type-Safe",
  },
  {
    name: "Node.js & Bun",
    category: "backend",
    categoryLabel: "Backend & APIs",
    url: "https://nodejs.org",
    version: "LTS / Bun 1.1",
    role: "High-throughput asynchronous I/O microservices and modern JavaScript runtime environments.",
    badge: "Async Engine",
  },
  {
    name: "Python (FastAPI)",
    category: "backend",
    categoryLabel: "Backend & APIs",
    url: "https://fastapi.tiangolo.com",
    version: "Async OpenAPI",
    role: "High-performance Python backend for AI integrations, document parsing, and ML inference.",
    badge: "AI & Data Ready",
  },
  {
    name: "Go (Golang)",
    category: "backend",
    categoryLabel: "Backend & APIs",
    url: "https://go.dev",
    version: "v1.23 Concurrency",
    role: "Compiled binary speed and goroutines for financial transactions and real-time microservices.",
    badge: "Sub-Millisecond",
  },
  {
    name: "Rust",
    category: "backend",
    categoryLabel: "Backend & APIs",
    url: "https://www.rust-lang.org",
    version: "Memory-Safe",
    role: "Mission-critical computational engines with zero-cost abstractions and zero memory leaks.",
    badge: "Maximum Security",
  },
  {
    name: "PostgreSQL",
    category: "database",
    categoryLabel: "Databases & Storage",
    url: "https://www.postgresql.org",
    version: "v16 ACID",
    role: "Battle-tested relational database with JSONB indexing, connection pooling, and multi-region read replicas.",
    badge: "ACID Relational",
  },
  {
    name: "Drizzle ORM",
    category: "database",
    categoryLabel: "Databases & Storage",
    url: "https://orm.drizzle.team",
    version: "Zero-Overhead",
    role: "Compile-time SQL query builder with zero cold starts, consuming <1MB RAM on edge servers.",
    badge: "Zero Cold Starts",
  },
  {
    name: "Redis",
    category: "database",
    categoryLabel: "Databases & Storage",
    url: "https://redis.io",
    version: "In-Memory",
    role: "Sub-millisecond caching layer, rate-limiting counters, and real-time Pub/Sub queues.",
    badge: "Sub-1ms Cache",
  },
  {
    name: "Cloudflare Workers",
    category: "cloud",
    categoryLabel: "Cloud & Edge Infra",
    url: "https://workers.cloudflare.com",
    version: "V8 Serverless",
    role: "Global compute across 330+ cities, eliminating traditional origin servers and slashing latency.",
    badge: "Sub-20ms TTFB",
  },
  {
    name: "Docker & Containers",
    category: "cloud",
    categoryLabel: "Cloud & Edge Infra",
    url: "https://www.docker.com",
    version: "OCI Standard",
    role: "Hermetic container packaging ensuring reproducible staging and production environments.",
    badge: "Zero Drift",
  },
];

const CODE_SNIPPETS = {
  nextjs: `// Next.js 16 App Router with Incremental Static Regeneration (ISR)
import { safeDb } from "@/lib/db/safe";
import { buildSeo } from "@/lib/seo";

export const revalidate = 60; // 60s Edge ISR cache

export async function generateMetadata() {
  return buildSeo({
    title: "Full-Stack Web Engineering | MLHK Infotech",
    description: "Sub-50ms TTFB deployed on Cloudflare Global Edge across 330+ locations.",
    path: "/services/web-development",
  });
}

export default async function Page() {
  const data = await safeDb().select().from(table).all();
  return <EdgeOptimizedUI data={data} />;
}`,
  edge: `// Cloudflare Worker Edge Handler (opennextjs-cloudflare)
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;

    const response = await handleEdgeRequest(request, env);
    response.headers.set("Cache-Control", "public, s-maxage=31536000, stale-while-revalidate=86400");
    ctx.waitUntil(cache.put(request, response.clone()));
    return response;
  }
};`,
  drizzle: `// Type-Safe Relational Schema (Drizzle ORM)
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const enterprises = sqliteTable("enterprises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  gstin: text("gstin", { length: 15 }).unique(),
  status: text("status", { enum: ["active", "pending"] }).default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});`,
  fastapi: `# Python FastAPI High-Throughput Async API
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

app = FastAPI(title="MLHK Edge API", version="2.0.0")

class OrderPayload(BaseModel):
    client_id: str
    items: list[str]
    total_amount: float

@app.post("/api/v1/orders/dispatch")
async def dispatch_order(order: OrderPayload):
    # Asynchronous non-blocking database transaction
    order_id = await process_high_concurrency_order(order)
    return {"status": "dispatched", "order_id": order_id, "latency_ms": 4.2}`,
};

export function WebDevShowcase() {
  const [isPinging, setIsPinging] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"nextjs" | "edge" | "drizzle" | "fastapi">("nextjs");
  const [pingProgress, setPingProgress] = useState<number>(100);
  const [selectedProjectClass, setSelectedProjectClass] = useState<string>("business");
  const [selectedTechCategory, setSelectedTechCategory] = useState<"all" | "frontend" | "backend" | "database" | "cloud">("all");
  const [copiedCode, setCopiedCode] = useState(false);

  const activeProject = PROJECT_CLASSES.find((p) => p.id === selectedProjectClass) ?? PROJECT_CLASSES[0];

  const filteredFrameworks =
    selectedTechCategory === "all"
      ? WEB_FRAMEWORKS
      : WEB_FRAMEWORKS.filter((f) => f.category === selectedTechCategory);

  const runPingSimulation = () => {
    setIsPinging(true);
    setPingProgress(0);
    const interval = setInterval(() => {
      setPingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPinging(false);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: ENTERPRISE PROJECT CLASS ARCHITECTURE SELECTOR
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-12 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff9f1c]/15 blur-[140px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Boxes className="size-3 text-[#ff9f1c]" />
                Full-Spectrum Web Engineering
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Bespoke Tech Architecture
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Architecting for Your Exact Workload
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              We do not force one rigid framework onto every client. Select your project archetype below to
              inspect our tailored architectural blueprint, data persistence layer, and latency targets.
            </p>
          </div>
        </div>

        {/* 4 Project Archetype Buttons */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_CLASSES.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => setSelectedProjectClass(cls.id)}
              className={`flex flex-col text-left rounded-2xl border p-4 transition-all duration-300 ${
                selectedProjectClass === cls.id
                  ? "border-[#ff9f1c] bg-[#ff9f1c]/10 shadow-[0_12px_36px_-12px_rgba(255,159,28,0.3)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[10px] font-bold text-[#ffb84d] uppercase tracking-wider">
                  {cls.badge}
                </span>
                <span className="size-2 rounded-full" style={{ backgroundColor: selectedProjectClass === cls.id ? "#ff9f1c" : "transparent" }} />
              </div>
              <h4 className="mt-3 font-display text-sm font-bold text-white">
                {cls.name}
              </h4>
            </button>
          ))}
        </div>

        {/* Active Architecture Blueprint Card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#040507] p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb84d]">
                Active Blueprint Specification
              </span>
              <h4 className="font-display text-xl font-bold text-white mt-1">
                {activeProject.name}
              </h4>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
              {activeProject.latencyTarget}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            {activeProject.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-6 text-xs">
            <div>
              <span className="text-zinc-500 font-mono uppercase tracking-wider block text-[10px]">
                Recommended Frameworks
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeProject.recommendedStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-mono text-[#ffb84d]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-zinc-500 font-mono uppercase tracking-wider block text-[10px]">
                Database Architecture
              </span>
              <p className="mt-2 font-medium text-white">{activeProject.dbArchitecture}</p>
            </div>

            <div>
              <span className="text-zinc-500 font-mono uppercase tracking-wider block text-[10px]">
                Auth &amp; Security Layer
              </span>
              <p className="mt-2 font-medium text-white">{activeProject.authSecurity}</p>
            </div>

            <div>
              <span className="text-zinc-500 font-mono uppercase tracking-wider block text-[10px]">
                Elastic Scalability
              </span>
              <p className="mt-2 font-medium text-emerald-400">{activeProject.scalingCapacity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: MASTER WEB FRAMEWORKS & OFFICIAL DOCS DIRECTORY
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#07080a] p-6 md:p-12 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Layers className="size-3 text-[#ff9f1c]" />
                Multi-Language &amp; Framework Mastery
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Zero Dogmatism • Right Tool for the Job
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Supported Web Frameworks, Runtimes &amp; Official Docs
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              We engineer web applications across modern frontend frameworks, high-throughput backend runtimes,
              relational databases, and edge cloud infrastructure. Click any card to review official documentation:
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: "All Stacks" },
              { key: "frontend", label: "Frontend & UI" },
              { key: "backend", label: "Backend & APIs" },
              { key: "database", label: "Databases" },
              { key: "cloud", label: "Edge & Cloud" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedTechCategory(f.key as typeof selectedTechCategory)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                  selectedTechCategory === f.key
                    ? "border-[#ff9f1c] bg-[#ff9f1c]/15 text-[#ffb84d] font-semibold"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Framework Cards Grid with Official Links */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFrameworks.map((fw) => (
            <div
              key={fw.name}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                    {fw.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-[#ffb84d] font-bold">
                    {fw.badge}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <h4 className="font-display text-lg font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                    {fw.name}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500">{fw.version}</span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                  {fw.role}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">Verified Production Stack</span>
                <a
                  href={fw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d] hover:text-white transition-colors"
                >
                  <span>Official Docs</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: GLOBAL EDGE LATENCY BENCHMARK CONSOLE
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Globe className="size-3 text-[#ff9f1c]" />
                Cloudflare Global Edge Telemetry
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                330+ Edge POPs
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Global Edge Distribution vs Traditional Apache Hosting
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Interactive latency comparison. MLHK websites execute in under 50ms worldwide by caching
              and computing at the CDN edge within kilometers of your visitors.
            </p>
          </div>

          <button
            type="button"
            onClick={runPingSimulation}
            disabled={isPinging}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-4 py-2 text-xs font-semibold text-[#ffb84d] transition-all hover:bg-[#ff9f1c]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isPinging ? (
              <>
                <RotateCcw className="size-3.5 animate-spin" />
                Pinging Edge Nodes ({pingProgress}%)...
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                Test Global Ping Times
              </>
            )}
          </button>
        </div>

        {/* Global Latency Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EDGE_NODES.map((node) => {
            const ratio = Math.round((1 - node.edgeLatency / node.legacyLatency) * 100);
            return (
              <div
                key={node.city}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-[#ff9f1c]/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="font-display text-sm font-bold text-white">{node.city}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {node.country}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-y border-white/5 py-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                      MLHK Edge
                    </span>
                    <span className="font-display text-xl font-bold text-white">
                      {isPinging ? "..." : `${node.edgeLatency} ms`}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Legacy Apache
                    </span>
                    <span className="font-display text-xl font-bold text-zinc-500 line-through">
                      {node.legacyLatency} ms
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#ffb84d]">
                  <span>Latency Reduction:</span>
                  <span className="font-bold">+{ratio}% Faster</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: LIGHTHOUSE 100/100 CORE WEB VITALS AUDITOR
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <Gauge className="size-3 text-emerald-400" />
                Google Lighthouse Verified
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Core Web Vitals Pass
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              100/100 Core Web Vitals Benchmark
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Google algorithms penalize slow websites. Every platform we build scores in the 98–100th
              percentile on mobile and desktop devices.
            </p>
          </div>
        </div>

        {/* 4 Green Audit Dials */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Performance", score: "100", sub: "0.4s LCP • 0ms TBT" },
            { label: "Accessibility", score: "100", sub: "WCAG AAA Compliant" },
            { label: "Best Practices", score: "100", sub: "HTTPS • Modern APIs" },
            { label: "SEO Authority", score: "100", sub: "Full JSON-LD Triplets" },
          ].map((d) => (
            <div
              key={d.label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                <span className="font-display text-2xl font-bold text-emerald-400">{d.score}</span>
              </div>
              <span className="mt-4 font-display text-sm font-bold text-white">{d.label}</span>
              <span className="mt-1 text-[10px] font-mono text-zinc-400">{d.sub}</span>
            </div>
          ))}
        </div>

        {/* Core Web Vitals Metrics Strip */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 border-t border-white/5 pt-6">
          <div className="rounded-xl border border-white/5 bg-black/40 p-3.5">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Largest Contentful Paint (LCP)
            </span>
            <span className="font-display text-lg font-bold text-emerald-400">0.42 Seconds</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Google Target: &lt; 2.5s</span>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/40 p-3.5">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Interaction to Next Paint (INP)
            </span>
            <span className="font-display text-lg font-bold text-emerald-400">12 Milliseconds</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Google Target: &lt; 200ms</span>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/40 p-3.5">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Cumulative Layout Shift (CLS)
            </span>
            <span className="font-display text-lg font-bold text-emerald-400">0.000 (Zero Shift)</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Google Target: &lt; 0.10</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: ARCHITECTURAL CODE STACK VIEWER
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#07080a] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Code2 className="size-3 text-[#ff9f1c]" />
                Clean Production Code
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Zero Plugin Bloat
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Type-Safe Modern Web Architecture
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Inspect the exact code standards we deploy: Next.js 16 server components, Cloudflare Edge
              caching, Drizzle ORM relational schemas, and Python FastAPI async microservices.
            </p>
          </div>

          {/* Code Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "nextjs", label: "Next.js 16 App Router" },
              { id: "edge", label: "Cloudflare Edge Cache" },
              { id: "drizzle", label: "Drizzle Schema" },
              { id: "fastapi", label: "Python FastAPI" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveCodeTab(t.id as typeof activeCodeTab)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                  activeCodeTab === t.id
                    ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Canvas */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-zinc-300 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-zinc-400 font-mono">
                {activeCodeTab === "nextjs"
                  ? "src/app/page.tsx"
                  : activeCodeTab === "edge"
                  ? "worker.ts"
                  : activeCodeTab === "drizzle"
                  ? "src/lib/db/schema.ts"
                  : "backend/main.py"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopyCode(CODE_SNIPPETS[activeCodeTab])}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-zinc-400 hover:text-white"
            >
              {copiedCode ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
              <span>{copiedCode ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          <pre className="overflow-x-auto leading-relaxed text-emerald-300/90 font-mono">
            <code>{CODE_SNIPPETS[activeCodeTab]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
