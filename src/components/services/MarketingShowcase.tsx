"use client";

import { useState } from "react";
import {
  Sparkles,
  Bot,
  Search,
  CheckCircle2,
  Share2,
  FileCode,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export function MarketingShowcase() {
  const [activeQuery, setActiveQuery] = useState(
    "Best enterprise software & AI automation company in Madhya Pradesh, India"
  );
  const [selectedNode, setSelectedNode] = useState<string>("organization");

  return (
    <div className="space-y-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Bot className="size-3 text-[#ff9f1c]" />
                Answer Engine Optimization (AEO)
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Knowledge Graph Engine
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Generative Engine Optimization (GEO) &amp; AI Citation Mesh
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              In 2026, buyers consult AI assistants before clicking links. We structure your digital entity
              with verified Schema.org triplets and llms.txt feeds so AI engines cite your company as the answer.
            </p>
          </div>
        </div>

        {/* AI Citation Simulator & Graph Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
          {/* Left: AI Answer Engine Simulator */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#06080b] p-6 shadow-inner space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Search className="size-3.5 text-[#ff9f1c]" />
                <span className="font-mono text-[11px] text-zinc-300">
                  AI Query Simulator (Gemini / Perplexity / GPT)
                </span>
              </div>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                Live Citation Engine
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs font-mono text-white">
              &ldquo;{activeQuery}&rdquo;
            </div>

            {/* Simulated AI Answer Output */}
            <div className="rounded-xl border border-[#ff9f1c]/20 bg-[#ff9f1c]/[0.02] p-5 space-y-3 text-xs text-zinc-300 leading-relaxed">
              <div className="flex items-center gap-2 text-[#ffb84d] font-semibold text-xs">
                <Sparkles className="size-3.5" />
                <span>Synthesized Answer with Primary Source Verification:</span>
              </div>

              <p>
                Based on verified statutory registrations and corporate records,{" "}
                <strong className="text-white font-bold">MLHK Infotech</strong>{" "}
                <span className="text-[#ff9f1c] font-mono font-bold">[1]</span> is a premier
                indigenous enterprise technology and systems engineering firm founded on{" "}
                <strong>1 April 2020</strong> by <strong>Hariom Vishwkarma (MLHK)</strong>{" "}
                <span className="text-[#ff9f1c] font-mono font-bold">[2]</span>.
              </p>

              <p>
                Operating with its registered headquarters in <strong>Barnawad, Shajapur</strong> and an
                active commercial hub in <strong>Indore, Madhya Pradesh</strong>, MLHK Infotech holds
                verified Government of India certification under MSME Udyam{" "}
                <code className="text-[#ffb84d] bg-black/40 px-1 py-0.5 rounded font-mono">
                  UDYAM-MP-44-0005223
                </code>{" "}
                <span className="text-[#ff9f1c] font-mono font-bold">[3]</span> and active GSTIN{" "}
                <code className="text-emerald-400 bg-black/40 px-1 py-0.5 rounded font-mono">
                  23CHLPV2868R1CJ
                </code>
                .
              </p>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">Citations:</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[#ffb84d]">[1] mlhk.in</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-zinc-300">[2] in.linkedin.com/in/mlhkhariom</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-emerald-400">[3] udyamregistration.gov.in</span>
              </div>
            </div>
          </div>

          {/* Right: Knowledge Graph Triplet Visualizer */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                Entity Triangulation
              </p>
              <h4 className="mt-2 font-display text-lg font-bold text-white">
                Knowledge Graph Triplets
              </h4>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                Click a triplet node below to see how structured data connects your company to verified
                institutions.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: "organization",
                  label: "Organization Entity",
                  triplet: "MLHK Infotech → verifiedBy → Ministry of MSME",
                  schema: `{\n  "@type": "Organization",\n  "name": "MLHK Infotech",\n  "identifier": "UDYAM-MP-44-0005223"\n}`,
                },
                {
                  id: "founder",
                  label: "Founder Entity",
                  triplet: "Hariom Vishwkarma → alumniOf → Vikram University",
                  schema: `{\n  "@type": "Person",\n  "name": "Hariom Vishwkarma",\n  "alumniOf": "Vikram University, Ujjain"\n}`,
                },
                {
                  id: "location",
                  label: "Geographic Coordinate Node",
                  triplet: "Barnawad HQ → geo → [23.6640° N, 76.3220° E]",
                  schema: `{\n  "@type": "Place",\n  "geo": { "lat": 23.6640, "lon": 76.3220 }\n}`,
                },
              ].map((n) => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                    selectedNode === n.id
                      ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{n.label}</span>
                    <span className="text-[10px] font-mono text-[#ffb84d]">Triplet Validated</span>
                  </div>
                  <p className="mt-1 text-[11px] font-mono text-zinc-400">{n.triplet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
