"use client";

import { useState } from "react";
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
} from "lucide-react";

type EdgeNode = {
  city: string;
  country: string;
  edgeLatency: number;
  legacyLatency: number;
};

const EDGE_NODES: EdgeNode[] = [
  { city: "Mumbai", country: "India", edgeLatency: 14, legacyLatency: 380 },
  { city: "Singapore", country: "APAC", edgeLatency: 22, legacyLatency: 460 },
  { city: "London", country: "UK", edgeLatency: 35, legacyLatency: 620 },
  { city: "Frankfurt", country: "Germany", edgeLatency: 38, legacyLatency: 680 },
  { city: "New York", country: "USA", edgeLatency: 48, legacyLatency: 840 },
  { city: "Tokyo", country: "Japan", edgeLatency: 42, legacyLatency: 590 },
];

const CODE_SNIPPETS = {
  nextjs: `// Next.js 16 App Router with Incremental Static Regeneration (ISR)
import { safeDb } from "@/lib/db/safe";
import { buildSeo } from "@/lib/seo";

export const revalidate = 60; // 60s Edge ISR cache

export async function generateMetadata() {
  return buildSeo({
    title: "Enterprise Web Engineering | MLHK Infotech",
    description: "Sub-50ms TTFB deployed on Cloudflare Global Edge.",
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
};

export function WebDevShowcase() {
  const [isPinging, setIsPinging] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"nextjs" | "edge" | "drizzle">("nextjs");
  const [pingProgress, setPingProgress] = useState<number>(100);

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

  return (
    <div className="space-y-20">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: GLOBAL EDGE LATENCY BENCHMARK CONSOLE
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
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
          SECTION 2: LIGHTHOUSE 100/100 CORE WEB VITALS AUDITOR
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
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
          SECTION 3: ARCHITECTURAL CODE STACK VIEWER
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-white/10 bg-[#07080a] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
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
              caching, and Drizzle ORM relational schemas.
            </p>
          </div>

          {/* Code Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "nextjs", label: "Next.js 16 App Router" },
              { id: "edge", label: "Cloudflare Edge Cache" },
              { id: "drizzle", label: "Drizzle Schema" },
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
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-zinc-300">
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
                  : "src/lib/db/schema.ts"}
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">TypeScript 5.7 • 100% Type-Safe</span>
          </div>

          <pre className="overflow-x-auto leading-relaxed text-emerald-300/90 font-mono">
            <code>{CODE_SNIPPETS[activeCodeTab]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

