"use client";

import { useState, useRef, MouseEvent } from "react";
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
  FileCode,
  RotateCw,
  Box,
  Compass,
  CheckCircle2,
  Scale,
  Award,
  BookOpen,
} from "lucide-react";

type ColorToken = {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  oklch: string;
  pantone: string;
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
    pantone: "Pantone Black 6 C",
    contrast: "21.0:1 (AAA Max)",
    usage: "Deep background canvas, eliminates pixel glare and creates high-contrast luxury glow.",
    isDark: true,
  },
  {
    name: "24K Liquid Gold",
    role: "Energy Accent",
    hex: "#FF9F1C",
    rgb: "255, 159, 28",
    oklch: "oklch(0.78 0.18 68)",
    pantone: "Pantone 1375 C",
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
    pantone: "Pantone 129 C",
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
    pantone: "Opaque White",
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
    pantone: "Cool Gray 11 C",
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
    accentColor: "#ff9f1c",
    bgGradient: "from-amber-950/30 via-[#0a0805] to-[#050607]",
    borderColor: "border-[#ff9f1c]/30",
    badge: "Creative Wing",
  },
  {
    name: "IKSC India",
    sector: "E-Commerce & Digital Retail",
    markSubtitle: "Dynamic Retail Vector • Marketplace Systems",
    description:
      "India Ka Shopping Centre — sovereign e-commerce brand identity featuring modern tri-color accents and high-contrast digital shopping symbology.",
    accentColor: "#ff9f1c",
    bgGradient: "from-amber-950/30 via-[#0a0805] to-[#050607]",
    borderColor: "border-[#ff9f1c]/30",
    badge: "E-Commerce",
  },
  {
    name: "Erotix Green Energy",
    sector: "Solar EPC & Renewable Tech",
    markSubtitle: "Clean-Tech Geometry • Solar Vector Marks",
    description:
      "Identity system engineered for large-scale solar power infrastructure. Clean geometric lines symbolizing high-efficiency solar arrays and clean energy flow.",
    accentColor: "#10b981",
    bgGradient: "from-emerald-950/30 via-[#050a08] to-[#050607]",
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
    bgGradient: "from-sky-950/30 via-[#05080c] to-[#050607]",
    borderColor: "border-sky-500/30",
    badge: "Media Lab",
  },
];

const BRAND_BIBLE_CHAPTERS = [
  {
    ch: "01",
    title: "Brand Strategy & Positioning",
    pages: "Pages 01–06",
    summary:
      "Mission, vision, tone of voice, enterprise positioning narrative, and audience psychographics.",
    deliverable: "Strategic Brand Foundation",
  },
  {
    ch: "02",
    title: "Logo Architecture & Geometry",
    pages: "Pages 07–14",
    summary:
      "Golden-ratio circle construction, anchor tangent coords, optical weight balance, and primary emblem lockup.",
    deliverable: "Vector Blueprints (.AI, .SVG)",
  },
  {
    ch: "03",
    title: "Responsive Lockups & Clear Space",
    pages: "Pages 15–20",
    summary:
      "Horizontal, vertical, monogram glyph, 16px favicon silhouette, and 0.5x exclusion zone boundary rules.",
    deliverable: "Responsive Asset Suite",
  },
  {
    ch: "04",
    title: "Chromatic Science & Tokens",
    pages: "Pages 21–26",
    summary:
      "OKLCH color math, Hex, RGB, CMYK prepress percentages, and Pantone Spot Color matching standards.",
    deliverable: "Color Bible & Token Files",
  },
  {
    ch: "05",
    title: "Typographic Scale & Pairings",
    pages: "Pages 27–32",
    summary:
      "Major Third (1.250x) typographic hierarchy, fluid CSS clamp() scales, tracking metrics, and web font licensing.",
    deliverable: "Web Font Kit & CSS System",
  },
  {
    ch: "06",
    title: "Print Collateral & Spot UV",
    pages: "Pages 33–38",
    summary:
      "600 GSM visiting cards, letterheads, packaging cartons, foil stamping masks, and die-cut knife lines.",
    deliverable: "Press-Ready PDF-X Files",
  },
  {
    ch: "07",
    title: "Figma UI Library & Design Tokens",
    pages: "Pages 39–44",
    summary:
      "Tokens Studio variables, Auto-Layout 5.0 components, button states, input fields, and dark/light mode tokens.",
    deliverable: "Published Figma File (.FIG)",
  },
  {
    ch: "08",
    title: "Statutory Trademark Deed & IP Assignment",
    pages: "Pages 45–48",
    summary:
      "100% intellectual property transfer agreement granting complete statutory copyright under the Trade Marks Act 1999.",
    deliverable: "Executed Legal Assignment Deed",
  },
];

export function BrandingShowcase() {
  // Blueprint interactive states
  const [showGrid, setShowGrid] = useState(true);
  const [showClearance, setShowClearance] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [activeTheme, setActiveTheme] = useState<"gold" | "silver" | "emerald" | "crimson">("gold");
  const [previewScale, setPreviewScale] = useState<"16" | "32" | "64" | "128" | "full">("full");

  // Code & Token tab state
  const [activeTokenTab, setActiveTokenTab] = useState<"tokens" | "css" | "tailwind" | "json">("tokens");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Color console interactive states
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Type tester interactive states
  const [customText, setCustomText] = useState("MLHK RED XEROX STUDIO");
  const [fontSize, setFontSize] = useState<number>(44);

  // 3D Card tilt states
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  // Active Brand Bible chapter state
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 14;
    setCardRotate({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedHex(label);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const copyTokenCode = (code: string, tab: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedToken(tab);
    setTimeout(() => setCopiedToken(null), 2000);
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

  const tokenJsonSample = `{
  "brand": {
    "primary": {
      "value": "#FF9F1C",
      "type": "color",
      "description": "24K Liquid Gold Energy Accent"
    },
    "secondary": {
      "value": "#FFB84D",
      "type": "color",
      "description": "Amber Radiance Glyphs & Tags"
    },
    "canvas": {
      "value": "#050607",
      "type": "color",
      "description": "OLED Obsidian Pure Black"
    },
    "surface": {
      "value": "#0A0C10",
      "type": "color",
      "description": "Elevated Double-Bezel Tray"
    }
  },
  "typography": {
    "fontFamily": {
      "display": { "value": "var(--font-display)" },
      "mono": { "value": "var(--font-mono)" }
    },
    "scaleRatio": { "value": 1.25, "type": "number", "unit": "Major Third" }
  }
}`;

  const cssVariablesSample = `:root {
  /* Red Xerox Studio Primitive Tokens */
  --color-brand-gold: #ff9f1c;
  --color-brand-amber: #ffb84d;
  --color-brand-obsidian: #050607;
  --color-brand-wire: #1f242d;

  /* Semantic UI Tokens */
  --surface-canvas: var(--color-brand-obsidian);
  --accent-primary: var(--color-brand-gold);
  --accent-secondary: var(--color-brand-amber);
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-focus: var(--color-brand-gold);

  /* Typographic Tokens */
  --font-scale-ratio: 1.25;
  --font-size-hero: clamp(2.5rem, 6vw, 4.5rem);
  --letter-spacing-mono: 0.22em;
}`;

  const tailwindConfigSample = `// tailwind.config.ts (Red Xerox Studio Theme)
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#ff9f1c', // 24K Liquid Gold
          400: '#ffb84d', // Amber Radiance
          950: '#050607', // OLED Obsidian Canvas
          wire: '#1f242d', // Structural Hairlines
        },
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(255, 159, 28, 0.35)',
        'double-bezel': 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      },
    },
  },
};`;

  return (
    <div className="space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          SECTION A: VECTOR BLUEPRINT & LOGO GEOMETRY INSPECTOR
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff9f1c]/15 blur-[130px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Layers className="size-3 text-[#ff9f1c]" />
                Precision CAD Vector Engine
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Red Xerox Studio Standards
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Mathematical Construction &amp; Anchor Coordinate Blueprint
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Every curve is calculated using Fibonacci golden-ratio tangents. Toggle the diagnostic
              layers below to inspect exclusion clear space, bounding radii, and coordinate vertices.
            </p>
          </div>

          {/* Interactive Diagnostic Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGrid(!showGrid)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                showGrid
                  ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              <Sliders className="size-3" />
              <span>Grid: {showGrid ? "ON" : "OFF"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowClearance(!showClearance)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                showClearance
                  ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              <Maximize2 className="size-3" />
              <span>Clear Space: {showClearance ? "ON" : "OFF"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowNodes(!showNodes)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                showNodes
                  ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="size-3" />
              <span>Anchor Nodes: {showNodes ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Blueprint CAD Canvas + Right Control Panel */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Main Vector Display Screen */}
          <div className="lg:col-span-8 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#040507] p-4 flex items-center justify-center shadow-inner">
            {/* Engineering Grid Background */}
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 159, 28, 0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 159, 28, 0.25) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Live SVG Vector Emblem Blueprint */}
            <svg
              viewBox="0 0 600 400"
              className="relative h-full w-full max-w-full select-none"
              style={{
                transform:
                  previewScale === "16"
                    ? "scale(0.12)"
                    : previewScale === "32"
                    ? "scale(0.24)"
                    : previewScale === "64"
                    ? "scale(0.42)"
                    : previewScale === "128"
                    ? "scale(0.72)"
                    : "scale(1)",
                transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              <defs>
                <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff9f1c" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#050607" stopOpacity="0.85" />
                </linearGradient>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff9f1c" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Exclusion Clearance Boundary */}
              {showClearance && (
                <g stroke="#ffb84d" strokeOpacity="0.3" strokeDasharray="4 4" fill="none">
                  <rect x="130" y="40" width="340" height="320" rx="12" />
                  <text x="140" y="56" fill="#ffb84d" fontSize="9" fontFamily="monospace">
                    CLEARANCE EXCLUSION ZONE (0.5x BOUND)
                  </text>
                  <text x="380" y="352" fill="#ffb84d" fontSize="9" fontFamily="monospace">
                    SAFE MARGIN: 40PX
                  </text>
                </g>
              )}

              {/* Golden Ratio Reference Circles & Tangents */}
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
                <g fill="#ff9f1c">
                  {[
                    [300, 75, "APEX VERTEX (x:300, y:75)"],
                    [420, 145, "VERTEX R1"],
                    [420, 255, "VERTEX R2"],
                    [300, 325, "BASE VERTEX"],
                    [180, 255, "VERTEX L2"],
                    [180, 145, "VERTEX L1"],
                    [300, 220, "OPTICAL CENTER"],
                  ].map(([x, y, label], i) => (
                    <g key={i}>
                      <circle cx={x as number} cy={y as number} r="4.5" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx={x as number} cy={y as number} r="9" fill="none" stroke="#ff9f1c" strokeWidth="0.8" opacity="0.6" />
                      <text
                        x={(x as number) + 8}
                        y={(y as number) - 6}
                        fill="#ffb84d"
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
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#ff9f1c] animate-pulse" />
              <span>Canvas 600×400 • Scale: 1:1.618 Golden Ratio</span>
            </div>
          </div>

          {/* Right Control & Diagnostics Rail */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                Responsive Scale Auditor
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Test legibility from 16px favicon up to master billboard scale:
              </p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { key: "16", label: "16px Favicon" },
                  { key: "32", label: "32px Nav" },
                  { key: "64", label: "64px App" },
                  { key: "128", label: "128px Hero" },
                  { key: "full", label: "100% Master" },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setPreviewScale(s.key as typeof previewScale)}
                    className={`rounded-lg border p-2 text-center text-xs font-mono transition-all ${
                      previewScale === s.key
                        ? "border-[#ff9f1c] bg-[#ff9f1c]/15 text-[#ffb84d] font-bold"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                Palette Simulation
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
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-2.5">
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
          SECTION B: INTERACTIVE 3D HOT GOLD FOIL BUSINESS CARD
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#08090d] to-[#040507] p-6 md:p-12 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Box className="size-3 text-[#ff9f1c]" />
                Tactile Print Simulation
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                600 GSM Matte Black + Hot Gold Foil
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Physical Collateral &amp; Luxury Finishes Preview
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Move your mouse over the card below to experience the real-world 3D specular reflection of
              curated 24K hot gold foil on textured 600 GSM cardstock. Click the button to flip the card.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-4 py-2 text-xs font-semibold text-[#ffb84d] transition-all hover:bg-[#ff9f1c]/20"
          >
            <RotateCw className="size-3.5" />
            <span>Flip Card ({isFlipped ? "Showing Back" : "Showing Front"})</span>
          </button>
        </div>

        {/* 3D Interactive Card Stage */}
        <div className="mt-12 flex justify-center items-center py-8 perspective-[1200px]">
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="group relative h-64 w-96 max-w-full cursor-grab select-none rounded-2xl border border-white/15 bg-[#090b0f] p-8 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] transition-transform duration-100 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${cardRotate.x}deg) rotateY(${
                cardRotate.y + (isFlipped ? 180 : 0)
              }deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Specular Glistening Foil Overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 transition-opacity group-hover:opacity-80"
              style={{
                background: `radial-gradient(circle at ${50 + cardRotate.y * 2}% ${
                  50 + cardRotate.x * 2
                }%, rgba(255, 184, 77, 0.45) 0%, transparent 60%)`,
              }}
            />

            {/* Front Side of Card */}
            {!isFlipped ? (
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500">
                    Red Xerox Studio • Precision Identity
                  </span>
                  <div className="size-6 rounded-full border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 flex items-center justify-center">
                    <span className="size-2 rounded-full bg-[#ff9f1c]" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-xl border border-[#ff9f1c]/60 bg-gradient-to-br from-[#ff9f1c]/20 to-black flex items-center justify-center shadow-[0_0_25px_rgba(255,159,28,0.3)]">
                    <span className="font-display text-2xl font-black text-[#ffb84d]">RX</span>
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold tracking-tight text-white">
                      MLHK INFOTECH
                    </h4>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#ffb84d] uppercase">
                      RED XEROX STUDIO LAB
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-zinc-400">
                  <span>600 GSM Cotton Silk</span>
                  <span className="text-[#ffb84d]">Embossed 24K Foil</span>
                </div>
              </div>
            ) : (
              /* Back Side of Card */
              <div
                className="flex h-full flex-col justify-between"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <p className="font-display text-sm font-bold text-white">Hariom Vishwkarma</p>
                    <p className="text-[9px] font-mono text-[#ffb84d] uppercase tracking-wider">
                      Founder &amp; Principal Systems Architect
                    </p>
                  </div>
                  <div className="h-5 w-8 rounded border border-amber-400/50 bg-gradient-to-r from-amber-400/30 to-amber-200/10 flex items-center justify-center text-[7px] font-mono text-amber-300">
                    NFC
                  </div>
                </div>

                <div className="space-y-1 text-[10px] font-mono text-zinc-300">
                  <p>HQ: Barnawad, Shajapur &amp; Indore, MP</p>
                  <p>Inquiries: admin@mlhk.in</p>
                  <p>Telephone: +91-9165100124</p>
                  <p className="text-[#ffb84d]">Registry: MSME UDYAM-MP-44-0005223</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-mono text-zinc-500">
                  <span>VERIFIED ORIGINAL BRAND</span>
                  <span>mlhk.in</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION C: 3-TIER DESIGN TOKEN ARCHITECTURE & CODE HANDOFF
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#07080a] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <FileCode className="size-3 text-[#ff9f1c]" />
                Design-to-Code Pipeline
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Tokens Studio &amp; Figma Variables Ready
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              The 3-Tier Enterprise Token Architecture
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Top brands do not hand developers static hex codes. We construct a 3-tier token hierarchy
              (Primitives → Semantics → Components) ready for automated export to JSON, CSS, and Tailwind.
            </p>
          </div>

          {/* Token Code Format Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "tokens", label: "Hierarchy Architecture" },
              { key: "css", label: "CSS Custom Properties" },
              { key: "tailwind", label: "Tailwind Config" },
              { key: "json", label: "Tokens Studio JSON" },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTokenTab(t.key as typeof activeTokenTab)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                  activeTokenTab === t.key
                    ? "border-[#ff9f1c] bg-[#ff9f1c]/15 text-[#ffb84d] font-semibold"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-8">
          {activeTokenTab === "tokens" && (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Tier 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-[#ffb84d]">
                  TIER 01 • PRIMITIVE
                </span>
                <h4 className="mt-4 font-display text-base font-bold text-white">
                  Raw Brand Values
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Uncontextualized base constants representing physical or digital pigments:
                </p>
                <div className="mt-4 space-y-2 font-mono text-xs text-zinc-300">
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    gold-500: #FF9F1C
                  </div>
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    obsidian-950: #050607
                  </div>
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    spacing-16: 1.618rem
                  </div>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="rounded-2xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/[0.03] p-6">
                <span className="rounded-md border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-2.5 py-0.5 text-[10px] font-mono text-[#ffb84d]">
                  TIER 02 • SEMANTIC
                </span>
                <h4 className="mt-4 font-display text-base font-bold text-white">
                  Contextual Aliases
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Describe what a variable does, enabling instant light/dark mode adaptation:
                </p>
                <div className="mt-4 space-y-2 font-mono text-xs text-zinc-300">
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    color-brand-primary = &#123;gold-500&#125;
                  </div>
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    surface-canvas = &#123;obsidian-950&#125;
                  </div>
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    layout-pad-section = &#123;spacing-16&#125;
                  </div>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-[#ffb84d]">
                  TIER 03 • COMPONENT
                </span>
                <h4 className="mt-4 font-display text-base font-bold text-white">
                  Scoped UI Variables
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Targeted directly to interactive UI widgets for zero-effort component styling:
                </p>
                <div className="mt-4 space-y-2 font-mono text-xs text-zinc-300">
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    btn-primary-bg = &#123;color-brand-primary&#125;
                  </div>
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    nav-border = &#123;surface-hairline&#125;
                  </div>
                  <div className="rounded bg-black/40 p-2 border border-white/5">
                    card-radius = 1.75rem
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTokenTab === "css" && (
            <div className="relative rounded-2xl border border-white/10 bg-[#040507] p-5">
              <button
                type="button"
                onClick={() => copyTokenCode(cssVariablesSample, "css")}
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-zinc-300 hover:text-white"
              >
                {copiedToken === "css" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{copiedToken === "css" ? "Copied CSS" : "Copy CSS"}</span>
              </button>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
                {cssVariablesSample}
              </pre>
            </div>
          )}

          {activeTokenTab === "tailwind" && (
            <div className="relative rounded-2xl border border-white/10 bg-[#040507] p-5">
              <button
                type="button"
                onClick={() => copyTokenCode(tailwindConfigSample, "tailwind")}
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-zinc-300 hover:text-white"
              >
                {copiedToken === "tailwind" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{copiedToken === "tailwind" ? "Copied Config" : "Copy Config"}</span>
              </button>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
                {tailwindConfigSample}
              </pre>
            </div>
          )}

          {activeTokenTab === "json" && (
            <div className="relative rounded-2xl border border-white/10 bg-[#040507] p-5">
              <button
                type="button"
                onClick={() => copyTokenCode(tokenJsonSample, "json")}
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-zinc-300 hover:text-white"
              >
                {copiedToken === "json" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{copiedToken === "json" ? "Copied JSON" : "Copy JSON"}</span>
              </button>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
                {tokenJsonSample}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION D: INTERACTIVE CHROMATIC PALETTE CONSOLE
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
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
              onClick={() => copyToClipboard(c.hex, c.hex)}
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
                <p className="text-[10px] font-mono text-amber-400/80">{c.pantone}</p>
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
          SECTION E: INTERACTIVE TYPOGRAPHY SPECIMEN
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#07080a] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
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
          SECTION F: THE 40+ PAGE ENTERPRISE BRAND BIBLE INDEX
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#08090d] to-[#040507] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <BookOpen className="size-3 text-[#ff9f1c]" />
                Deliverable Blueprint
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Comprehensive Brand Bible Index
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              What Is Inside the 40+ Page Brand Bible?
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              We deliver a complete institutional manual that governs every visual asset across your company.
              Explore the 8 core chapters included in every Red Xerox Studio delivery:
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_BIBLE_CHAPTERS.map((ch, i) => (
            <div
              key={ch.ch}
              onClick={() => setActiveChapter(i)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                activeChapter === i
                  ? "border-[#ff9f1c] bg-[#ff9f1c]/[0.06] shadow-[0_12px_36px_-12px_rgba(255,159,28,0.3)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#ffb84d]">
                  CH {ch.ch}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {ch.pages}
                </span>
              </div>

              <h4 className="mt-3 font-display text-sm font-bold text-white">
                {ch.title}
              </h4>

              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {ch.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#ffb84d]">
                <CheckCircle2 className="size-3" />
                <span>{ch.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION G: STATUTORY TRADEMARK AUDITOR & ANTI-CANVA MATRIX
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#07080a] p-6 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <Shield className="size-3 text-emerald-400" />
                Trade Marks Act 1999 Compliance
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Class 35 &amp; 42 Ready
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Trademark Legal Viability &amp; The Anti-Canva Standard
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Why 95% of stock or AI logos fail government trademark examination in India and globally:
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01]">
          <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.04] p-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            <div className="col-span-12 md:col-span-4">Legal &amp; Engineering Dimension</div>
            <div className="col-span-12 md:col-span-4 mt-2 md:mt-0 text-red-400/80">
              Stock Templates &amp; AI Prompt Generators
            </div>
            <div className="col-span-12 md:col-span-4 mt-2 md:mt-0 text-[#ffb84d]">
              Red Xerox Studio Original Engineering
            </div>
          </div>

          <div className="divide-y divide-white/5 text-xs">
            {[
              {
                title: "Statutory Copyright Ownership",
                bad: "Canva and stock license terms explicitly prohibit copyright ownership of their templates.",
                good: "100% original bezier geometry transferred via executed legal assignment deed.",
              },
              {
                title: "Trademark Registration (Form TM-A)",
                bad: "High probability of trademark objection due to identical stock marks used by hundreds of other entities.",
                good: "Unique mathematical construction engineered to sail through trademark registrar searches.",
              },
              {
                title: "Print Prepress & Foil Stamping",
                bad: "Low-res raster PNGs blur when enlarged and lack spot UV/foil separation vector masks.",
                good: "Complete PDF-X vector packages with separate spot-color layers for luxury printing.",
              },
              {
                title: "Codebase Design Token Export",
                bad: "Zero developer handoff. Engineers must guess hex values and spacing ratios manually.",
                good: "Direct Tokens Studio export to JSON, CSS custom properties, and Tailwind configurations.",
              },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-12 p-4 transition-colors hover:bg-white/[0.02]">
                <div className="col-span-12 md:col-span-4 font-semibold text-white">
                  {row.title}
                </div>
                <div className="col-span-12 md:col-span-4 mt-1 md:mt-0 text-zinc-400 line-through decoration-red-500/40">
                  {row.bad}
                </div>
                <div className="col-span-12 md:col-span-4 mt-1 md:mt-0 text-zinc-200 font-medium">
                  <span className="text-emerald-400 mr-1.5 font-bold">✓</span>
                  {row.good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION H: RED XEROX STUDIO CASE STUDY SHOWCASE
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
              className={`group relative overflow-hidden rounded-[2.5rem] border ${v.borderColor} bg-gradient-to-b ${v.bgGradient} p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_-24px_rgba(255,159,28,0.25)]`}
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
