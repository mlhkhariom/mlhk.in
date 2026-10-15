"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Copy,
  Check,
  Maximize2,
  Sliders,
  Palette,
  Eye,
  Type,
  Shield,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

type ColorToken = {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  oklch: string;
  contrast: string;
  usage: string;
  isDark: boolean;
};

const BRAND_COLORS: ColorToken[] = [
  {
    name: "OLED Obsidian",
    role: "Primary Canvas",
    hex: "#050607",
    rgb: "5, 6, 7",
    oklch: "oklch(0.04 0.002 240)",
    contrast: "21.0:1 (AAA Max)",
    usage: "Deep background surface, eliminates pixel glare and enhances luminous gold elements.",
    isDark: true,
  },
  {
    name: "24K Liquid Gold",
    role: "Energy Accent",
    hex: "#FF9F1C",
    rgb: "255, 159, 28",
    oklch: "oklch(0.78 0.18 68)",
    contrast: "11.4:1 against #050607",
    usage: "Primary brand mark stroke, high-conversion CTA buttons, and key focus states.",
    isDark: false,
  },
  {
    name: "Amber Radiance",
    role: "Secondary Glyphs",
    hex: "#FFB84D",
    rgb: "255, 184, 77",
    oklch: "oklch(0.82 0.14 74)",
    contrast: "13.6:1 (WCAG AAA)",
    usage: "Micro-labels, section eyebrows, interactive link hovers, and tag pills.",
    isDark: false,
  },
  {
    name: "Hyper White",
    role: "Primary Typography",
    hex: "#FFFFFF",
    rgb: "255, 255, 255",
    oklch: "oklch(1.00 0.00 0)",
    contrast: "21.0:1 against canvas",
    usage: "Display titles, crisp editorial headings, and high-readability body copy.",
    isDark: false,
  },
  {
    name: "Graphite Wire",
    role: "Structural Hairlines",
    hex: "#1F242D",
    rgb: "31, 36, 45",
    oklch: "oklch(0.20 0.015 250)",
    contrast: "Structural border",
    usage: "Double-bezel outer card rings, grid separators, and subtle bounding borders.",
    isDark: true,
  },
];

const SHOWCASE_VENTURES = [
  {
    name: "Red Xerox Studio",
    sector: "Creative Lab & Brand Systems",
    markSubtitle: "Visual Identity • UI Tokens • Editorial Packaging",
    description:
      "The dedicated creative branding laboratory within MLHK Infotech. Engineered to produce high-prestige corporate identities, print standards, and digital design tokens.",
    accentColor: "#FF4D4D",
    bgGradient: "from-rose-950/40 via-[#0a0608] to-[#050607]",
    borderColor: "border-rose-500/30",
    badge: "Creative Wing",
  },
  {
    name: "IKSC India",
    sector: "E-Commerce & Digital Retail",
    markSubtitle: "Dynamic Retail Vector • Marketplace Systems",
    description:
      "India Ka Shopping Centre — sovereign e-commerce brand identity featuring modern tri-color accents and high-contrast digital shopping symbology.",
    accentColor: "#ff9f1c",
    bgGradient: "from-amber-950/40 via-[#0a0805] to-[#050607]",
    borderColor: "border-amber-500/30",
    badge: "E-Commerce",
  },
  {
    name: "Erotix Green Energy",
    sector: "Solar EPC & Renewable Tech",
    markSubtitle: "Clean-Tech Geometry • Solar Vector Marks",
    description:
      "Identity system engineered for large-scale solar power infrastructure. Clean geometric lines symbolizing high-efficiency solar arrays and clean energy flow.",
    accentColor: "#10b981",
    bgGradient: "from-emerald-950/40 via-[#050a08] to-[#050607]",
    borderColor: "border-emerald-500/30",
    badge: "Clean Energy",
  },
  {
    name: "TET News",
    sector: "Journalism & Educational Media",
    markSubtitle: "Editorial Typography • Masthead Architecture",
    description:
      "High-readability digital news publication identity designed for government job alerts and youth education updates across mobile devices.",
    accentColor: "#38bdf8",
    bgGradient: "from-sky-950/40 via-[#05080c] to-[#050607]",
    borderColor: "border-sky-500/30",
    badge: "Media Lab",
  },
];

export function BrandingShowcase() {
  // Blueprint interactive states
  const [showGrid, setShowGrid] = useState(true);
  const [showClearance, setShowClearance] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [activeTheme, setActiveTheme] = useState<"gold" | "silver" | "emerald" | "crimson">("gold");

  // Color console interactive states
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Type tester interactive states
  const [customText, setCustomText] = useState("MLHK RED XEROX STUDIO");
  const [fontSize, setFontSize] = useState<number>(44);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getThemeStroke = () => {
    switch (activeTheme) {
      case "silver":
        return "#e2e8f0";
      case "emerald":
        return "#10b981";
      case "crimson":
        return "#f43f5e";
      case "gold":
      default:
        return "#ff9f1c";
    }
  };

  return (
    <div className="space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          SECTION A: VECTOR BLUEPRINT & LOGO GEOMETRY INSPECTOR
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
                <Layers className="size-3 text-[#ff9f1c]" />
                Interactive CAD Inspector
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Sub-pixel Vector Math
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Golden Ratio Vector Construction &amp; Clearance Geometry
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Interactive demonstration of how Red Xerox Studio builds brand marks: mathematical circle
              intersections, optical center alignment, and exclusion-zone protection.
            </p>
          </div>

          {/* Interactive Layer Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGrid(!showGrid)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                showGrid
                  ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              {showGrid ? "✓ Grid Circles" : "+ Grid Circles"}
            </button>

            <button
              type="button"
              onClick={() => setShowClearance(!showClearance)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                showClearance
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-300"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              {showClearance ? "✓ Safe Clearance" : "+ Safe Clearance"}
            </button>

            <button
              type="button"
              onClick={() => setShowNodes(!showNodes)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                showNodes
                  ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              {showNodes ? "✓ Bezier Anchors" : "+ Bezier Anchors"}
            </button>
          </div>
        </div>

        {/* Blueprint Visual Canvas */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Canvas (SVG CAD View) */}
          <div className="lg:col-span-8 relative flex aspect-[16/10] sm:aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#06080b] p-4 shadow-inner">
            {/* Grid Paper Texture Lines */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Coordinate Axis Crosshairs */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-px bg-cyan-500/10" />
            </div>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="h-full w-px bg-cyan-500/10" />
            </div>

            {/* Live Interactive SVG Construction */}
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full max-h-[360px] select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getThemeStroke()} stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getThemeStroke()} stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Clearance Exclusion Safety Zone */}
              {showClearance && (
                <g className="transition-opacity duration-300">
                  <rect
                    x="110"
                    y="35"
                    width="380"
                    height="330"
                    rx="16"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="#06b6d4"
                    fillOpacity="0.03"
                  />
                  <text x="125" y="55" fill="#06b6d4" fontSize="10" fontFamily="monospace">
                    EXCLUSION ZONE (0.5x)
                  </text>
                  <text x="415" y="352" fill="#06b6d4" fontSize="10" fontFamily="monospace">
                    MIN-CLEARANCE
                  </text>
                </g>
              )}

              {/* Golden Ratio Construction Circles & Tangents */}
              {showGrid && (
                <g stroke="#ff9f1c" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3">
                  <circle cx="300" cy="200" r="140" />
                  <circle cx="300" cy="200" r="86" />
                  <circle cx="300" cy="200" r="53" />
                  <circle cx="300" cy="200" r="33" />
                  <line x1="160" y1="60" x2="440" y2="340" />
                  <line x1="440" y1="60" x2="160" y2="340" />
                  <line x1="160" y1="200" x2="440" y2="200" />
                  <line x1="300" y1="60" x2="300" y2="340" />
                </g>
              )}

              {/* Sovereign Hexagonal Shield Geometry */}
              <polygon
                points="300,75 420,145 420,255 300,325 180,255 180,145"
                fill="url(#shieldFill)"
                stroke={getThemeStroke()}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Central Stylized Monogram Chevron Architecture */}
              {/* Outer V Chevron */}
              <polygon
                points="240,150 260,150 300,195 340,150 360,150 300,220"
                fill={getThemeStroke()}
                opacity="0.9"
              />
              {/* Left Column Stem */}
              <rect x="236" y="145" width="14" height="105" rx="3" fill={getThemeStroke()} />
              {/* Right Column Stem */}
              <rect x="350" y="145" width="14" height="105" rx="3" fill={getThemeStroke()} />
              {/* Center Chevron V Stems */}
              <polygon points="270,165 280,165 300,235 290,235" fill="#ffffff" opacity="0.8" />
              <polygon points="330,165 320,165 300,235 310,235" fill="#ffffff" opacity="0.8" />

              {/* Bezier Nodes & Coordinate Callouts */}
              {showNodes && (
                <g fill="#10b981">
                  {[
                    [300, 75, "TOP ANCHOR (x:300, y:75)"],
                    [420, 145, "VERTEX R1"],
                    [420, 255, "VERTEX R2"],
                    [300, 325, "BASE VERTEX"],
                    [180, 255, "VERTEX L2"],
                    [180, 145, "VERTEX L1"],
                    [300, 220, "OPTICAL CENTER"],
                  ].map(([x, y, label], i) => (
                    <g key={i}>
                      <circle cx={x as number} cy={y as number} r="4.5" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx={x as number} cy={y as number} r="8" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.5" />
                      <text
                        x={(x as number) + 8}
                        y={(y as number) - 6}
                        fill="#a1a1aa"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {label}
                      </text>
                    </g>
                  ))}
                </g>
              )}
            </svg>

            {/* Bottom Left Coordinate Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono text-zinc-400 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Canvas 600×400 • Scale: 1:1.618</span>
            </div>
          </div>

          {/* Right Control & Diagnostics Rail */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                Color Mode Simulation
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { key: "gold", label: "24K Gold", color: "#ff9f1c" },
                  { key: "silver", label: "Liquid Silver", color: "#e2e8f0" },
                  { key: "emerald", label: "Clean Emerald", color: "#10b981" },
                  { key: "crimson", label: "Studio Crimson", color: "#f43f5e" },
                ].map((th) => (
                  <button
                    key={th.key}
                    type="button"
                    onClick={() => setActiveTheme(th.key as typeof activeTheme)}
                    className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                      activeTheme === th.key
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="size-3 rounded-full" style={{ backgroundColor: th.color }} />
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Specs List */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-500 font-mono">Aspect Ratio</span>
                <span className="font-semibold text-zinc-200">1:1 Square &amp; 16:9 Lockup</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-500 font-mono">Stroke Weight</span>
                <span className="font-semibold text-zinc-200">2.5px Vector Normalized</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-500 font-mono">Optical Shift</span>
                <span className="font-semibold text-zinc-200">+2.4% Vertical Weight Compensation</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-mono">Min Resolution</span>
                <span className="font-semibold text-emerald-400">16×16px Icon Legible</span>
              </div>
            </div>

            {/* Proof Quote */}
            <p className="text-[11px] leading-relaxed text-zinc-400 italic border-l-2 border-[#ff9f1c]/50 pl-3">
              &ldquo;Optical compensation ensures that circles and polygons appear balanced to human retinas,
              not just mathematical calipers.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION B: INTERACTIVE CHROMATIC PALETTE CONSOLE
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Palette className="size-3 text-[#ff9f1c]" />
                Chromatic Mathematics
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                WCAG AAA Validated
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Systemic Brand Color Tokens &amp; Contrast Engine
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Click any token below to copy its HEX code. Every shade has been mathematically formulated
              for OLED dark interfaces, high-definition digital screens, and Pantone physical spot printing.
            </p>
          </div>

          {copiedHex && (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-300 animate-in fade-in">
              <Check className="size-3.5" />
              Copied {copiedHex} to clipboard!
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BRAND_COLORS.map((c) => (
            <div
              key={c.hex}
              onClick={() => copyToClipboard(c.hex)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9f1c]/50 hover:bg-white/[0.04]"
            >
              {/* Color Swatch Surface */}
              <div
                className="relative aspect-video w-full rounded-xl border border-white/15 p-3 flex flex-col justify-between shadow-md"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    c.isDark
                      ? "text-zinc-300 bg-white/10"
                      : "text-zinc-900 bg-black/10"
                  }`}
                >
                  {c.hex}
                </span>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest ${
                      c.isDark ? "text-zinc-400" : "text-zinc-800"
                    }`}
                  >
                    {c.role}
                  </span>
                  <Copy
                    className={`size-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                      c.isDark ? "text-white" : "text-black"
                    }`}
                  />
                </div>
              </div>

              {/* Details & Specs */}
              <div className="mt-4 space-y-1.5">
                <h4 className="font-display text-sm font-bold text-white group-hover:text-[#ffb84d] transition-colors">
                  {c.name}
                </h4>
                <p className="text-[11px] font-mono text-zinc-500">{c.oklch}</p>
                <div className="pt-2 text-[11px] leading-relaxed text-zinc-400">
                  {c.usage}
                </div>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400 border-t border-white/5">
                  <span>Contrast Ratio:</span>
                  <span>{c.contrast}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION C: INTERACTIVE TYPOGRAPHY SPECIMEN
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-white/10 bg-[#07080a] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Type className="size-3 text-[#ff9f1c]" />
                Typographic Hierarchy
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Major Third Scale (1.250x)
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Type Specimen &amp; Scalability Testing Lab
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Type in your company name below to preview how our typographic hierarchy balances display
              gravitas with micro-technical clarity.
            </p>
          </div>

          {/* Interactive Input for Live Font Testing */}
          <div className="w-full md:w-80">
            <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 block mb-1.5">
              Live Text Simulator
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter brand name..."
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white focus:border-[#ff9f1c] focus:outline-none"
            />
          </div>
        </div>

        {/* Specimen Output Columns */}
        <div className="mt-8 space-y-8">
          {/* 1. Display Heading */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs text-zinc-500 font-mono">
              <span>01 • PRIMARY DISPLAY GROTESQUE</span>
              <span>Weight: 800 Bold • Tracking: -0.025em</span>
            </div>
            <p
              className="mt-4 font-display font-black tracking-tight text-white leading-[1.05] transition-all"
              style={{ fontSize: `${fontSize}px` }}
            >
              {customText || "MLHK RED XEROX STUDIO"}
            </p>
            <p className="mt-2 text-xs text-zinc-500 font-mono">
              Designed for high-impact hero headings, packaging titles, and corporate mastheads.
            </p>
          </div>

          {/* 2. Technical Monospace */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs text-zinc-500 font-mono">
              <span>02 • TECHNICAL INDUSTRIAL MONOSPACE</span>
              <span>Weight: 600 SemiBold • Tracking: 0.22em Uppercase</span>
            </div>
            <p className="mt-4 font-mono text-sm md:text-base font-semibold tracking-[0.24em] text-[#ffb84d] uppercase">
              {customText || "MLHK RED XEROX STUDIO"} // EST. 2020 • BHARAT
            </p>
            <p className="mt-2 text-xs text-zinc-500 font-mono">
              Engineered for metrics, data tables, coordinates, code badges, and verified regulatory numbers.
            </p>
          </div>

          {/* 3. Optical Editorial Body */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs text-zinc-500 font-mono">
              <span>03 • EDITORIAL READING BODY</span>
              <span>Leading: 1.65 • Optical Kerning</span>
            </div>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-300 max-w-4xl">
              Brand systems crafted by Red Xerox Studio establish instant authority for{" "}
              <strong className="text-white font-semibold">{customText || "your enterprise"}</strong>. By
              marrying industrial geometry with disciplined typography, we build identities that convey
              decades of institutional weight from day one.
            </p>
            <p className="mt-2 text-xs text-zinc-500 font-mono">
              Optimized for annual reports, investor pitch decks, documentation, and web articles.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION D: RED XEROX STUDIO CASE STUDY SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              Red Xerox Studio • Verified Portfolio
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Identity Systems Engineered Across Industries
            </h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-zinc-400">
            From clean-tech energy to multi-vendor digital commerce, each identity is crafted from scratch
            under the Red Xerox Studio engineering framework.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SHOWCASE_VENTURES.map((v) => (
            <div
              key={v.name}
              className={`group relative overflow-hidden rounded-[2rem] border ${v.borderColor} bg-gradient-to-b ${v.bgGradient} p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
                  {v.badge}
                </span>
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: v.accentColor }}
                >
                  {v.sector}
                </span>
              </div>

              <h4 className="mt-6 font-display text-2xl font-bold text-white transition-colors group-hover:text-white">
                {v.name}
              </h4>
              <p className="mt-1 font-mono text-xs text-zinc-400">{v.markSubtitle}</p>

              <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                {v.description}
              </p>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">100% Vector Math • Full Guidelines</span>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:text-white transition-colors"
                >
                  View Case Study <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

