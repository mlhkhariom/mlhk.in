/**
 * Extended service specifications, architectural pillars, deliverables,
 * comparison matrices, and case study references for each service line.
 * Sourced for high-impact E-E-A-T, agency-grade design taste, and detailed content.
 */

export type ServicePillar = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  badge?: string;
};

export type DeliverableItem = {
  format: string;
  title: string;
  description: string;
  badge: string;
};

export type ComparisonItem = {
  aspect: string;
  genericApproach: string;
  mlhkApproach: string;
};

export type ServiceTimelineStep = {
  phase: string;
  timeline: string;
  title: string;
  description: string;
  outputs: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceTheme = {
  accent: string;
  accentLight: string;
  accentGlow: string;
  bgGradient: string;
  borderHover: string;
  badgeClass: string;
  tag: string;
};

export type AeoAnswerCapsule = {
  query: string;
  answer: string;
  keyTakeaway: string;
};

export type ServiceHowToStep = {
  name: string;
  text: string;
};

export type ExtendedServiceData = {
  slug: string;
  subheading: string;
  heroBadge: string;
  studioName?: string;
  studioBadge?: string;
  theme: ServiceTheme;
  seoKeywords: string[];
  aeoCapsules: AeoAnswerCapsule[];
  howToSteps: ServiceHowToStep[];
  stats: { value: string; label: string; detail: string }[];
  philosophyTitle: string;
  philosophyText: string[];
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: ServicePillar[];
  deliverablesTitle: string;
  deliverablesSubtitle: string;
  deliverables: DeliverableItem[];
  comparisonTitle: string;
  comparisonSubtitle: string;
  comparison: ComparisonItem[];
  timelineTitle: string;
  timelineSubtitle: string;
  timeline: ServiceTimelineStep[];
  toolsTitle: string;
  tools: { name: string; category: string; description: string }[];
  extendedFaqs: ServiceFaq[];
};

export const EXTENDED_SERVICE_DATA: Record<string, ExtendedServiceData> = {
  "graphics-and-branding": {
    slug: "graphics-and-branding",
    theme: {
      accent: "#f43f5e",
      accentLight: "#fda4af",
      accentGlow: "244, 63, 94",
      bgGradient: "from-rose-500/15 via-transparent to-amber-500/5",
      borderHover: "hover:border-rose-500/40",
      badgeClass: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      tag: "Creative Identity & Design Tokens",
    },
    seoKeywords: [
      "brand identity design agency india",
      "tokenized design systems figma",
      "cmyk pantone packaging design indore",
      "vector logo engineering",
      "red xerox studio branding",
    ],
    aeoCapsules: [
      {
        query: "What Is a Tokenized Brand Identity System?",
        answer: "A tokenized brand identity system is a digital design architecture where colors, typography, spacing, and component radiuses are stored as programmatic variables (design tokens). Unlike static PDF style guides, tokenized systems sync directly into codebases, ensuring instant visual consistency across web applications, iOS, Android, and physical print collateral.",
        keyTakeaway: "Tokens convert static visual guidelines into live, scalable code variables across all platforms.",
      },
      {
        query: "How Does Red Xerox Studio Engineer Vector Brand Marks?",
        answer: "Red Xerox Studio (the creative lab of MLHK Infotech) constructs logos using golden-ratio geometric grids, tangent anchor points, and optical weight compensation. We reject automated AI generators and stock templates, ensuring every curve is 100% mathematically balanced, legally copyrightable, and infinitely scalable from 16px favicons to 50ft outdoor billboards.",
        keyTakeaway: "Golden-ratio bezier geometry guarantees statutory trademark viability and zero pixelation at any scale.",
      },
      {
        query: "Why Are OKLCH Color Spaces Better Than Hex/RGB for Digital Brands?",
        answer: "OKLCH is a modern perceptual color space that aligns with human visual perception and wide-gamut OLED displays. Unlike legacy sRGB, OKLCH provides uniform perceived lightness, predictable contrast ratios compliant with WCAG AAA accessibility, and vibrant saturation that prevents muddy color rendering in modern dark-mode software interfaces.",
        keyTakeaway: "OKLCH delivers mathematically uniform contrast and wide-gamut OLED radiance without muddy clipping.",
      },
      {
        query: "What Brand Deliverables Does MLHK Infotech Provide Upon Completion?",
        answer: "Clients receive production-ready master vectors (.SVG, .AI, .EPS), a published Figma token library, a 40+ page comprehensive Brand Bible PDF, digital app icons (@1x, @2x, @3x), CMYK press-ready print files with spot-UV masks, and an executed statutory intellectual property deed transferring 100% trademark rights to the client.",
        keyTakeaway: "100% statutory IP copyright transfer with production-ready vector, Figma, and print assets.",
      },
    ],
    howToSteps: [
      {
        name: "Audit & Core Brand Positioning",
        text: "Analyze competitive landscape, audience psychology, and category positioning to define core brand narrative and visual tone.",
      },
      {
        name: "Mathematical Vector Geometry & Sketching",
        text: "Construct vector emblems and wordmarks using golden-ratio circles, bezier tangent anchors, and optical weight balancing.",
      },
      {
        name: "Chromatic Tokenization & Figma System",
        text: "Formulate OKLCH color palettes, typographic fluid clamp scales, and publish nested component variables inside Figma.",
      },
      {
        name: "Asset Compilation & Statutory IP Transfer",
        text: "Package production master files across .SVG, .AI, .EPS, and execute official statutory intellectual property assignment deed.",
      },
    ],
    heroBadge: "Red Xerox Studio • Visual Identity Lab",
    subheading:
      "We engineer sovereign visual identities, mathematical brand marks, and dark-luxury design systems that command authority across digital screens and physical packaging.",
    studioName: "Red Xerox Studio",
    studioBadge: "MLHK Creative Wing",
    stats: [
      { value: "100%", label: "Vector Purity", detail: "Golden-ratio bezier curves, zero raster blur" },
      { value: "40+ Pg", label: "Brand Bible", detail: "Exhaustive governance, clear-space & voice rules" },
      { value: "AAA", label: "Contrast Ratios", detail: "WCAG calibrated chromatic color mathematics" },
      { value: "Full IP", label: "Copyright Transfer", detail: "Complete statutory trademark & asset ownership" },
    ],
    philosophyTitle: "Anti-Template. Anti-Canva. Pure Identity Engineering.",
    philosophyText: [
      "95% of modern business logos are generated from cheap Canva templates or distorted AI prompts that fall apart at 16px favicon resolution and cannot be trademarked legally. They lack soul, mathematical balance, and industrial scaling.",
      "At Red Xerox Studio (the creative lab of MLHK Infotech), visual branding is treated as precision engineering. We design identities built from the golden ratio, optical kerning, and custom vector curves that scale seamlessly from a 16px mobile favicon to a 50-foot illuminated highway billboard.",
      "Every color token, typographic pairing, and spacing ratio is mathematically calibrated to evoke trust, prestige, and memorability.",
    ],
    pillarsTitle: "The Six Architectural Pillars of Brand Engineering",
    pillarsSubtitle: "A holistic identity system designed to outlast design trends and establish instant market category leadership.",
    pillars: [
      {
        id: "vector-geometry",
        title: "Mathematical Logo Geometry & Monogram Architecture",
        tagline: "Golden Ratio Grids & Optical Balancing",
        description:
          "Custom emblem and wordmark construction using geometric circles, bezier tangent anchors, and optical weight compensation rather than cold mathematical symmetry.",
        specs: [
          "Primary master brand mark (Full lockup, vertical & horizontal)",
          "Secondary responsive monogram & condensed app glyph",
          "Micro favicon & smart-watch optimized 16px silhouette",
          "Comprehensive clear-space exclusion zone coordinates",
        ],
        badge: "Core Mark",
      },
      {
        id: "chromatics",
        title: "Chromatic Color Science & Token Systems",
        tagline: "OLED Contrast & Semantic Palette Math",
        description:
          "Formulated using OKLCH and RGB color spaces for OLED displays and physical print calibration. Calibrated for dark-mode luxury interfaces and high-impact physical collateral.",
        specs: [
          "Primary dark canvas (OLED Obsidian #050607)",
          "High-tension amber accent (24K Liquid Gold #FF9F1C)",
          "Interactive secondary amber (#FFB84D, WCAG AAA compliant)",
          "Pantone spot color codes (PMS) & CMYK print formulas",
        ],
        badge: "Color Math",
      },
      {
        id: "typography",
        title: "Bespoke Typographic Hierarchy",
        tagline: "Display Grotesk to Technical Monospace",
        description:
          "Curated font families and scale ratios calculated via the Major Third (1.250x) and Golden Ratio (1.618x) scales. Custom CSS fluid clamp() formulas ready for immediate web development.",
        specs: [
          "Primary display grotesque for high-impact editorial headings",
          "Technical monospace for data labels, coordinates, and metrics",
          "Clean optical body typography with 1.6x leading for prolonged reading",
          "Commercial webfont license guidance and self-hosting kits",
        ],
        badge: "Typography",
      },
      {
        id: "design-systems",
        title: "UI/UX Design Systems & Figma Variables",
        tagline: "From Visual Mark to Production Screen",
        description:
          "Bridge the gap between graphic design and software development. We deliver production-ready Figma component systems equipped with Auto-Layout 5.0, variables, and dark/light mode tokens.",
        specs: [
          "Figma tokenized variable library (colors, radiuses, shadows, spacings)",
          "Interactive component matrices (buttons, inputs, cards, dialogs)",
          "Micro-interaction choreography & animation specs (cubic-bezier)",
          "Exportable Tailwind CSS config and design token JSON",
        ],
        badge: "Digital System",
      },
      {
        id: "print-packaging",
        title: "Print Production & Physical Packaging Collateral",
        tagline: "Tactile Luxury in the Physical Realm",
        description:
          "We take your brand off the glass and put it on paper, packaging, and interior architectural signage with millimeter-accurate vector die-lines.",
        specs: [
          "Executive business stationery & matte foil-stamped business cards",
          "Packaging die-cuts, merchandise, and unboxing tape guidelines",
          "Corporate letterhead, GST invoice template, and email signatures",
          "Signage blueprints, acrylic 3D wall mounts, and exhibition backdrops",
        ],
        badge: "Physical Media",
      },
      {
        id: "brand-bible",
        title: "The Brand Governance Manual (The Brand Bible)",
        tagline: "40+ Pages of Unbreakable Visual Laws",
        description:
          "A comprehensive, beautifully laid-out brand guidelines book that safeguards your visual integrity across all future partners, print vendors, and software engineers.",
        specs: [
          "Strict 'Do and Don't' misuse showcase preventing visual degradation",
          "Brand tone of voice, editorial messaging pillars, and elevator pitch",
          "Co-branding lockup rules with subsidiaries and partner logos",
          "Permanent downloadable PDF & interactive cloud handbook",
        ],
        badge: "Brand Bible",
      },
    ],
    deliverablesTitle: "Tangible Asset Deliverable Packages",
    deliverablesSubtitle: "What you receive upon final delivery: organized, production-grade files for every medium.",
    deliverables: [
      {
        format: ".SVG / .AI / .EPS",
        title: "Master Vector Package",
        description: "Infinitely scalable vector source files for print, embroidery, CNC laser cutting, and digital scaling without pixelation.",
        badge: "Vectors",
      },
      {
        format: ".FIG / .JSON",
        title: "Figma Design System & Tokens",
        description: "Complete Figma file with nested component states, variables, and design tokens ready for direct frontend handoff.",
        badge: "UI Tokens",
      },
      {
        format: ".PDF",
        title: "The 40+ Page Brand Bible",
        description: "Authoritative manual detailing typography scales, color formulas (HEX, RGB, CMYK, Pantone), clear space, and brand voice.",
        badge: "Guidelines",
      },
      {
        format: ".PNG / .WEBP",
        title: "Digital App & Web Asset Suite",
        description: "Multi-resolution app icons (@1x, @2x, @3x), social banners, OpenGraph sharing cards, and transparent PNG variations.",
        badge: "Digital Kit",
      },
      {
        format: "CMYK / PDF-X",
        title: "Print-Ready Collateral Suite",
        description: "Press-ready stationery, visiting cards with spot UV/foil masks, letterheads, and invoice headers formatted for professional printers.",
        badge: "Print Ready",
      },
      {
        format: "Legal Deed",
        title: "Statutory IP & Trademark Transfer",
        description: "100% intellectual property assignment giving your company complete legal ownership and trademark registration eligibility.",
        badge: "Legal IP",
      },
    ],
    comparisonTitle: "Generic Freelancers & AI Tools vs MLHK Red Xerox Studio",
    comparisonSubtitle: "Why standard template approaches ruin business credibility, and how bespoke engineering builds an enterprise asset.",
    comparison: [
      {
        aspect: "Design Foundation",
        genericApproach: "Canva stock templates or AI generator prompts with distorted vectors and unaligned tangents.",
        mlhkApproach: "100% bespoke mathematical vector geometry constructed on golden ratio grids and optical balance.",
      },
      {
        aspect: "Trademark Viability",
        genericApproach: "Stock elements cannot be copyrighted or trademarked. Risk of copyright infringement notices.",
        mlhkApproach: "Original registered mark crafted from scratch. Clean statutory IP assignment deed transferred to you.",
      },
      {
        aspect: "Scalability",
        genericApproach: "Low-res raster PNGs that pixelate and blur when scaled above small mobile screens.",
        mlhkApproach: "Pure vector geometry scaling cleanly from 16px favicon up to 50-foot illuminated highway billboard.",
      },
      {
        aspect: "Digital & Code Handoff",
        genericApproach: "Only sends a random JPEG or flat PNG. Developers are left guessing colors, spacing, and font sizes.",
        mlhkApproach: "Full Figma auto-layout components, CSS fluid clamp tokens, Tailwind config, and color variable tokens.",
      },
      {
        aspect: "Color Calibration",
        genericApproach: "Random RGB colors that look dull, muddy, or illegible when printed on physical stationery.",
        mlhkApproach: "Lab-tested chromatic values: OLED digital contrast (WCAG AAA) plus Pantone PMS and CMYK print profiles.",
      },
      {
        aspect: "Post-Launch Governance",
        genericApproach: "Zero documentation. Within 3 months every department uses different fonts, colors, and stretched logos.",
        mlhkApproach: "40+ page comprehensive Brand Bible detailing strict rules for clear space, co-branding, and typography.",
      },
    ],
    timelineTitle: "The 4-Phase Brand Engineering Sprint",
    timelineSubtitle: "A structured, transparent roadmap from initial brand discovery to master asset handover.",
    timeline: [
      {
        phase: "Phase 01",
        timeline: "Days 1 – 4",
        title: "Brand DNA Discovery & Competitive Audit",
        description:
          "We dissect your target demographic, competitive positioning, and emotional resonance. We audit direct and indirect rivals to ensure your identity occupies virgin territory.",
        outputs: ["Creative Brief Matrix", "Competitive Aesthetic Audit", "Moodboard & Spatial Direction"],
      },
      {
        phase: "Phase 02",
        timeline: "Days 5 – 9",
        title: "Vector Exploration & Geometric Construction",
        description:
          "Hariom Vishwkarma and the Red Xerox Studio team draft multiple distinct geometric directions. Golden ratio circles, optical kerning, and monogram variations are refined.",
        outputs: ["3 Distinct Core Concepts", "Monogram & Symbol Variations", "Grid Blueprint Construction"],
      },
      {
        phase: "Phase 03",
        timeline: "Days 10 – 14",
        title: "Color Science, Typography & UI Tokenization",
        description:
          "The selected concept is paired with an uncompromising chromatic palette, bespoke font hierarchy, and practical UI/UX component tokens in Figma.",
        outputs: ["Dark/Light Chromatic Tokens", "Typographic Scale Specimen", "Figma Component Variables"],
      },
      {
        phase: "Phase 04",
        timeline: "Days 15 – 20",
        title: "Physical Collateral & The 40+ Page Brand Bible",
        description:
          "We construct the print stationery, packaging mockups, social kits, and author the definitive brand governance guidelines book.",
        outputs: ["Master Vector Archive (.AI, .SVG, .EPS)", "40+ Page Brand Bible PDF", "Stationery & Print Suite"],
      },
    ],
    toolsTitle: "Design Engineering Stack & Precision Tooling",
    tools: [
      { name: "Figma Enterprise", category: "UI/UX & Tokens", description: "Auto-layout 5.0, design variables, prototype states, and developer mode handoff." },
      { name: "Adobe Illustrator", category: "Vector CAD", description: "Sub-pixel precision bezier anchor editing, CMYK plate separation, and packaging die-lines." },
      { name: "Spline 3D & WebGL", category: "Spatial Assets", description: "Interactive 3D brand marks, metallic materials, and interactive web elements." },
      { name: "Adobe After Effects", category: "Motion Identity", description: "Kinetic typography, animated logo stingers, and micro-motion choreographies." },
      { name: "Token Studio", category: "Design Tokens", description: "Syncing Figma design variables directly with GitHub, Tailwind CSS, and Next.js." },
    ],
    extendedFaqs: [
      {
        question: "Do we legally own the final brand mark and visual assets?",
        answer:
          "Yes, 100%. Upon final project payment, we execute a complete intellectual property assignment deed. You receive exclusive, perpetual, global rights to the vector artwork, trademark registration, and derivative products. We do not use third-party stock art or restrictive clip art.",
      },
      {
        question: "How does Red Xerox Studio differ from MLHK Infotech?",
        answer:
          "Red Xerox Studio is the dedicated creative design and branding laboratory within MLHK Infotech. While MLHK Infotech engineers high-performance web applications, cloud backends, and AI automation, Red Xerox Studio handles the creative visual soul: brand identities, typography architecture, packaging, and design systems.",
      },
      {
        question: "Can you design only the UI/UX design system if we already have a logo?",
        answer:
          "Yes. We frequently work with companies that have an established logo but lack a cohesive digital design system. We extract your brand DNA and engineer a complete Figma component library with dark/light mode tokens, typography scales, and responsive templates.",
      },
      {
        question: "Will our logo work on dark mode websites and embroidery?",
        answer:
          "Absolutely. Every logo system is tested across five critical stress environments: OLED true dark, high-key white, monochrome embroidery, 16px browser favicon, and large-format exterior signage. If it fails any of these tests, we redesign it before presenting.",
      },
      {
        question: "What files do we get for professional offset printing?",
        answer:
          "You receive press-ready vector PDFs conforming to PDF/X-1a standards with crop marks, 3mm bleed, converted fonts (outlines), and Pantone PMS spot color callouts so your commercial printer achieves 100% color accuracy.",
      },
    ],
  },
  "web-development": {
    slug: "web-development",
    theme: {
      accent: "#00f2fe",
      accentLight: "#38bdf8",
      accentGlow: "0, 242, 254",
      bgGradient: "from-cyan-500/15 via-transparent to-blue-500/5",
      borderHover: "hover:border-cyan-500/40",
      badgeClass: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      tag: "Next.js 16 Edge Platform",
    },
    seoKeywords: [
      "nextjs edge development company india",
      "cloudflare workers web agency",
      "core web vitals 100 optimization",
      "full stack web engineering indore",
      "sub 50ms ttfb web applications",
    ],
    aeoCapsules: [
      {
        query: "What Is Edge-First Server-Side Rendering (Edge SSR)?",
        answer: "Edge SSR executes server-side rendering logic at distributed points of presence within 50km of the user globally (such as Cloudflare Workers 330+ locations) rather than at a single centralized origin server. This eliminates round-trip latency, delivering sub-50ms Time to First Byte (TTFB) and instant page hydration worldwide.",
        keyTakeaway: "Edge computing runs rendering logic milliseconds from the user, eliminating international network lag.",
      },
      {
        query: "How Does MLHK Infotech Achieve 100/100 Core Web Vitals?",
        answer: "We eliminate heavy third-party tracking scripts, compile modern React components into zero-runtime static HTML where possible, enforce modern AVIF/WebP image compression, leverage CSS content-visibility, and deploy on Cloudflare Workers edge nodes. This guarantees LCP under 0.8s, INP under 30ms, and zero Cumulative Layout Shift (CLS).",
        keyTakeaway: "Sub-1s LCP, zero CLS, and sub-50ms INP driven by lean server rendering and edge caching.",
      },
      {
        query: "Why Use Drizzle ORM and Edge SQLite Instead of Traditional Heavy ORMs?",
        answer: "Drizzle ORM provides zero-overhead type-safe SQL queries with zero cold starts, consuming under 1MB of memory compared to heavyweight alternatives like Prisma or TypeORM. Combined with edge SQLite (Cloudflare D1 or Turso), database queries execute in under 5ms directly at the edge layer.",
        keyTakeaway: "Zero cold-start memory footprints and sub-5ms query times powered by lightweight SQL compilation.",
      },
      {
        query: "How Does Web Architecture Built in India Scale for Global Traffic?",
        answer: "MLHK Infotech architects websites with distributed edge infrastructure. Static assets are cached globally across 330+ cities, serverless APIs auto-scale dynamically to absorb traffic spikes of 100k+ requests per second, and database reads are replicated across continents with zero manual server provisioning.",
        keyTakeaway: "Globally distributed edge execution ensures seamless elasticity from 100 to 1,000,000 concurrent visitors.",
      },
    ],
    howToSteps: [
      {
        name: "Architect Edge Infrastructure & Schema",
        text: "Configure Next.js 16 project structure, Drizzle ORM database schemas, and Cloudflare Workers runtime bindings.",
      },
      {
        name: "Develop High-Performance UI Components",
        text: "Build semantic, accessible React components with Tailwind CSS and CSS container queries, enforcing zero-layout-shift.",
      },
      {
        name: "Integrate APIs & Edge Caching Layers",
        text: "Implement type-safe REST/tRPC routes, edge cache-control headers, and distributed database replication.",
      },
      {
        name: "Audit Core Web Vitals & Deploy to Production",
        text: "Run automated Lighthouse audits, verify 100/100 CWV performance, and execute atomic zero-downtime edge deployment.",
      },
    ],
    heroBadge: "Next.js 16 • Cloudflare Global Edge",
    subheading:
      "We architect high-concurrency web platforms, sovereign SaaS products, and lightning-fast marketing engines with sub-50ms global response times.",
    stats: [
      { value: "0.4s", label: "LCP Speed", detail: "Near-instant First Contentful Paint globally" },
      { value: "100/100", label: "Lighthouse Score", detail: "Peak Core Web Vitals across mobile and desktop" },
      { value: "330+", label: "Edge Cities", detail: "Serverless distribution on Cloudflare edge network" },
      { value: "0-Lockin", label: "Architecture", detail: "Standards-compliant TypeScript, Next.js, and Drizzle ORM" },
    ],
    philosophyTitle: "Engineering Over Templates: The Speed of Sovereignty.",
    philosophyText: [
      "Most business websites are burdened with bloated WordPress plugins, sluggish database queries, and vulnerable foreign hosting. They take 4 to 8 seconds to load, hemorrhaging 60% of potential leads.",
      "MLHK Infotech architects custom Next.js 16 applications deployed across Cloudflare's 330+ city Global Edge network. We pair incremental static regeneration (ISR) with D1/PostgreSQL databases to deliver sub-50ms TTFB worldwide.",
      "Every line of code is written in type-safe TypeScript with rigorous SEO schemas, accessible keyboard navigation, and responsive dark-luxury aesthetics.",
    ],
    pillarsTitle: "Full-Stack Web Engineering Disciplines",
    pillarsSubtitle: "From enterprise portals to conversion-focused marketing sites.",
    pillars: [
      {
        id: "nextjs-edge",
        title: "Cloudflare Edge & Next.js 16 Architecture",
        tagline: "Sub-50ms Global Latency",
        description: "Zero cold-start serverless execution running on Cloudflare Workers edge nodes within milliseconds of your visitors.",
        specs: ["Incremental Static Regeneration (ISR)", "Edge caching & automated stale-while-revalidate", "Cloudflare D1 & KV distributed state", "Zero server maintenance overhead"],
        badge: "Edge Architecture",
      },
      {
        id: "seo-aeo",
        title: "AEO, GEO & Knowledge Graph SEO Engineering",
        tagline: "Rank on Google, Gemini & Perplexity",
        description: "Built-in structured JSON-LD data, semantic HTML5 hierarchy, and llms.txt endpoints so search engines and AI assistants cite your business.",
        specs: ["Triple-validated Schema.org (Organization, Service, FAQ, Person)", "llms.txt and llms-full.txt AI citation feeds", "Dynamic sitemap.xml and robots.txt generation", "Semantic headings and optical contrast"],
        badge: "Search Authority",
      },
      {
        id: "type-safe",
        title: "Type-Safe Full-Stack Stack (TypeScript + Drizzle)",
        tagline: "Zero Runtime Regressions",
        description: "End-to-end type safety from database schemas to React client components. Compile-time validation prevents production crashes.",
        specs: ["Drizzle ORM with automated migrations", "Zod runtime schema validation for API routes", "Tailwind CSS v4 with custom dark luxury tokens", "Turbopack optimized micro-bundles"],
        badge: "Code Rigor",
      },
      {
        id: "auth-security",
        title: "Enterprise Authentication & Role Permissions",
        tagline: "Hardened Client Portals & Dashboards",
        description: "Custom authentication systems, multi-factor security, session encryption, and role-based access control (RBAC).",
        specs: ["Better-Auth session engine with secure HTTP-only cookies", "Argon2 / scrypt password hashing", "Role-based route middleware protection", "Automated rate limiting and anti-DDoS shielding"],
        badge: "Security",
      },
    ],
    deliverablesTitle: "Web Deliverables & Source Code Ownership",
    deliverablesSubtitle: "You receive clean, documented source code with zero third-party vendor lock-in.",
    deliverables: [
      { format: "Git Repository", title: "Complete Source Code", description: "Full GitHub repository with automated Cloudflare CI/CD deployment pipelines.", badge: "Source Code" },
      { format: "Cloudflare Edge", title: "Global Edge Deployment", description: "Configured production environment with custom domain SSL, DNS, and caching rules.", badge: "Hosting" },
      { format: "Tailwind UI", title: "Component Library", description: "Modular, reusable React component system designed for rapid internal expansion.", badge: "Components" },
      { format: "Markdown Docs", title: "Technical Runbook & API Docs", description: "Comprehensive documentation covering environment secrets, database migrations, and maintenance.", badge: "Runbook" },
    ],
    comparisonTitle: "Generic WordPress / Agency Builds vs MLHK Next.js Engineering",
    comparisonSubtitle: "The tangible differences in performance, security, and scalability.",
    comparison: [
      { aspect: "Page Load Speed", genericApproach: "3 to 7 seconds on shared Apache hosting with 40+ bloated plugins.", mlhkApproach: "0.2 to 0.6 seconds worldwide via Cloudflare Edge and Next.js ISR." },
      { aspect: "Security & Vulnerabilities", genericApproach: "Frequent PHP plugin vulnerabilities and SQL injection exploits.", mlhkApproach: "Static edge binaries with zero exposed origin IP and automated DDoS mitigation." },
      { aspect: "Code Ownership", genericApproach: "Locked inside proprietary page-builders like Elementor or Wix.", mlhkApproach: "100% clean TypeScript source code that your in-house team can run anywhere." },
      { aspect: "Mobile Experience", genericApproach: "Broken responsive CSS and heavy render-blocking scripts.", mlhkApproach: "Touch-optimized, 60fps micro-motion designed for Indian mobile networks." },
    ],
    timelineTitle: "Web Delivery Milestones",
    timelineSubtitle: "Agile sprints with weekly review environments.",
    timeline: [
      { phase: "Sprint 01", timeline: "Week 1", title: "Architecture & Wireframes", description: "User journey mapping, data schema design, and high-fidelity interactive wireframes.", outputs: ["Figma Wireframes", "Database Schema ERD"] },
      { phase: "Sprint 02", timeline: "Week 2–3", title: "Frontend Engineering & Motion", description: "Building responsive UI, GSAP choreographies, and edge routing in Next.js 16.", outputs: ["Staging Preview URL", "Responsive Screen Suite"] },
      { phase: "Sprint 03", timeline: "Week 4", title: "API Integration, CMS & Testing", description: "Connecting databases, authentication, contact forms, and automated validation tests.", outputs: ["Working CMS Admin", "Automated Test Suite"] },
      { phase: "Sprint 04", timeline: "Week 5", title: "SEO Audit, Hardening & Go-Live", description: "Lighthouse optimization, structured JSON-LD verification, and zero-downtime DNS cutover.", outputs: ["Production Deployment", "100/100 Lighthouse Audit"] },
    ],
    toolsTitle: "Web Engineering Stack",
    tools: [
      { name: "Next.js 16 (App Router)", category: "Framework", description: "Server Components, dynamic streaming, and ISR edge caching." },
      { name: "Cloudflare Workers", category: "Edge Cloud", description: "Global compute running across 330+ locations without origin servers." },
      { name: "TypeScript 5", category: "Language", description: "Type-safe interfaces eliminating runtime undefined errors." },
      { name: "Drizzle ORM", category: "Database Layer", description: "Lightweight, zero-overhead SQL schema and query builder." },
      { name: "Tailwind CSS v4", category: "Styling", description: "Modern zero-runtime utility styling with custom design tokens." },
    ],
    extendedFaqs: [
      { question: "Can we edit our own website content after launch?", answer: "Yes. We equip your website with a bespoke, intuitive administrative CMS panel where you can update portfolio projects, publish blog articles, manage services, and view client leads without touching code." },
      { question: "What are the ongoing hosting costs for Cloudflare edge?", answer: "Extremely low. Cloudflare's serverless tier handles millions of requests at near-zero or minimal monthly cost, saving you hundreds of dollars compared to traditional AWS EC2 or dedicated server fees." },
    ],
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    theme: {
      accent: "#10b981",
      accentLight: "#34d399",
      accentGlow: "16, 185, 129",
      bgGradient: "from-emerald-500/15 via-transparent to-teal-500/5",
      borderHover: "hover:border-emerald-500/40",
      badgeClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      tag: "Native Android & Hardware Studio",
    },
    seoKeywords: [
      "native android app development india",
      "offline first sqlite mobile app",
      "kotlin android developer madhya pradesh",
      "camerax barcode scanner app",
      "play store app agency",
    ],
    aeoCapsules: [
      {
        query: "Why Choose Native Kotlin/Java Over Hybrid Cross-Platform Frameworks?",
        answer: "Native Android development communicates directly with hardware drivers (CameraX, Bluetooth, BiometricPrompt, GPU), executing at a continuous 60fps with less than 40MB RAM usage. Hybrid or WebView wrappers introduce memory bloat (150MB+), frame drops, and battery drain that frustrate commercial enterprise users.",
        keyTakeaway: "Native compilation delivers 60fps fluid rendering, low battery consumption, and direct hardware API access.",
      },
      {
        query: "What Is Offline-First Room SQLite Architecture?",
        answer: "Offline-first architecture ensures mobile applications remain fully functional in zero-connectivity environments (such as rural warehouses, underground transit, or flights). User transactions are committed immediately to local Room SQLite databases and automatically synchronized with cloud backends using conflict-free timestamp resolution when connectivity resumes.",
        keyTakeaway: "Zero data loss and instantaneous UI responses even when completely disconnected from the internet.",
      },
      {
        query: "How Does CameraX Hardware Integration Improve Scanning Speed?",
        answer: "Google CameraX API interfaces directly with the Android camera HAL (Hardware Abstraction Layer), bypassing WebView translation delays. Utilizing Google ML Kit on-device neural processing, barcodes and QR codes decode in under 12ms even in low-light environments, essential for retail POS and logistics tracking.",
        keyTakeaway: "On-device ML Kit image stream analysis decodes barcodes in under 12ms with zero cloud roundtrips.",
      },
      {
        query: "What Is the Google Play Store Approval and Publication Protocol?",
        answer: "We configure Android App Bundles (.AAB), target the latest Android SDK API levels, implement cryptographic Play App Signing, write comprehensive privacy policies, and execute 14-day closed testing cohorts to ensure 100% compliant, zero-rejection Play Store launches.",
        keyTakeaway: "Comprehensive compliance management from target SDK compliance to closed testing verification.",
      },
    ],
    howToSteps: [
      {
        name: "UI/UX Prototyping & Flow Mapping",
        text: "Design mobile wireframes, touch ergonomics, and state transitions according to Google Material Design 3 guidelines.",
      },
      {
        name: "Native Engine & Database Construction",
        text: "Write native Kotlin/Java models, configure Room SQLite persistence, and establish encrypted shared preferences.",
      },
      {
        name: "Hardware Integration & Sensor Binding",
        text: "Connect CameraX, BiometricPrompt, GPS geolocation, and Push Notification services with background worker queues.",
      },
      {
        name: "Play Store Release & CI/CD Pipeline",
        text: "Generate signed release AAB bundles, execute automated unit tests, and submit for Google Play Store production approval.",
      },
    ],
    heroBadge: "Native Android • Java & Jetpack",
    subheading: "Robust native Android applications engineered for high performance, offline synchronization, and seamless device hardware integration.",
    stats: [
      { value: "60 FPS", label: "Fluid Renders", detail: "Smooth native Android UI components with zero lag" },
      { value: "Offline", label: "Sync Engine", detail: "Local SQLite database with automatic background syncing" },
      { value: "API-First", label: "Token Security", detail: "OAuth2/JWT token authentication with biometric support" },
      { value: "Play Store", label: "Ready", detail: "Full Google Play compliance, target SDK 35+ and privacy safety" },
    ],
    philosophyTitle: "Native Muscle for the Real World.",
    philosophyText: [
      "Hybrid mobile apps wrapped in web views frequently stutter on mid-range Indian Android smartphones, fail when network signals drop in transit, and drain user battery life.",
      "MLHK Infotech engineers native Android applications built on robust Java and modern Jetpack libraries. We design for the realities of Indian users: intermittent connectivity, diverse screen sizes, and battery optimization.",
      "Every mobile app connects to secure, token-authenticated REST backends and ships with an integrated admin management dashboard.",
    ],
    pillarsTitle: "Native Android Architecture Pillars",
    pillarsSubtitle: "Enterprise durability on every device.",
    pillars: [
      { id: "native-core", title: "Native Java & Jetpack Architecture", tagline: "True Hardware Performance", description: "Clean MVVM / Clean Architecture ensuring high frame rates, responsive touch feedback, and optimal memory management.", specs: ["Jetpack Lifecycle & ViewModel", "Retrofit2 HTTP networking with interceptors", "Room SQLite local persistence", "Target Android 14/15 SDK 35+"], badge: "Native Core" },
      { id: "offline-sync", title: "Offline-First Synchronization", tagline: "Works Without Signal", description: "Field staff and users can create records, capture signatures, and view data offline. Data automatically syncs when connectivity restores.", specs: ["WorkManager scheduled background jobs", "Conflict resolution data state machines", "Local encrypted SQLite storage", "Delta sync minimizing cellular data use"], badge: "Offline Sync" },
      { id: "hardware-integration", title: "Device Hardware & Sensor Integration", tagline: "Cameras, GPS, Printers & Bluetooth", description: "Seamless control of device hardware for barcode scanning, GPS geofencing, Bluetooth thermal printing, and biometric authentication.", specs: ["CameraX barcode & QR scanning", "FusedLocationProvider geofence tracking", "BiometricPrompt fingerprint & face unlock", "Push notifications via Firebase Cloud Messaging"], badge: "Hardware" },
      { id: "admin-backend", title: "Integrated Web Admin & Reporting Console", tagline: "Full Fleet Management", description: "Manage mobile users, push real-time broadcasts, approve field reports, and inspect usage analytics from your central desktop portal.", specs: ["Web-based user management panel", "Real-time push notification dispatcher", "Geo-location tracking map views", "Role-based permission hierarchy"], badge: "Admin Suite" },
    ],
    deliverablesTitle: "Mobile Deliverables",
    deliverablesSubtitle: "Everything needed for enterprise rollout and Google Play Store publication.",
    deliverables: [
      { format: ".AAB / .APK", title: "Production Android Bundles", description: "Signed Android App Bundles (AAB) optimized with ProGuard / R8 code shrinking.", badge: "App Binary" },
      { format: "Android Studio", title: "Clean Native Source Code", description: "Modular native Android project with organized packages, Gradle scripts, and tests.", badge: "Source Code" },
      { format: "REST API", title: "Backend API & Database", description: "Production API endpoints handling authentication, data storage, and push notifications.", badge: "Backend API" },
      { format: "Play Console", title: "Store Submission Package", description: "App icon suite, feature graphics, screenshot showcases, and privacy policy texts.", badge: "Play Store" },
    ],
    comparisonTitle: "Generic Web-Wrapped Hybrid Apps vs MLHK Native Android",
    comparisonSubtitle: "Why native engineering wins in enterprise reliability and user retention.",
    comparison: [
      { aspect: "Performance & FPS", genericApproach: "Sluggish webview scrolling, noticeable frame drops on budget smartphones.", mlhkApproach: "Silky 60fps native UI widgets with direct GPU hardware acceleration." },
      { aspect: "Offline Capability", genericApproach: "Shows white error screen or broken image placeholders when offline.", mlhkApproach: "Local Room SQLite database allows full operation and queues changes for sync." },
      { aspect: "Battery & Memory", genericApproach: "Heavy Chromium runtime drains phone battery and hogs RAM.", mlhkApproach: "Lean native memory footprint with efficient background WorkManager scheduling." },
    ],
    timelineTitle: "Mobile App Development Stages",
    timelineSubtitle: "From wireframing to Google Play publication.",
    timeline: [
      { phase: "Stage 01", timeline: "Sprint 1", title: "UX Wireframes & API Contracts", description: "Clickable mobile prototypes and defined REST API endpoints.", outputs: ["Figma Mobile UI", "OpenAPI Spec"] },
      { phase: "Stage 02", timeline: "Sprint 2–3", title: "Native UI & Local Database", description: "Building Android activities, fragments, and offline Room database.", outputs: ["Alpha Test APK"] },
      { phase: "Stage 03", timeline: "Sprint 4", title: "API Wiring & Push Notifications", description: "Connecting backend APIs, FCM notifications, and hardware sensors.", outputs: ["Beta Build on Firebase"] },
      { phase: "Stage 04", timeline: "Sprint 5", title: "Play Store Submission & Admin Go-Live", description: "Security review, Play Store compliance, and desktop admin release.", outputs: ["Live Play Store Listing", "Admin Console"] },
    ],
    toolsTitle: "Mobile Development Tools",
    tools: [
      { name: "Android Studio", category: "IDE", description: "Official Google IDE with native profilers, memory leak detectors, and emulators." },
      { name: "Java & Android SDK", category: "Core", description: "High-stability native languages with backwards compatibility across Android 8 to 15." },
      { name: "Retrofit & OkHttp", category: "Networking", description: "Type-safe HTTP client with automated JSON serialization and caching." },
      { name: "Firebase (FCM)", category: "Cloud Messaging", description: "Real-time push notifications, analytics, and crash reporting." },
    ],
    extendedFaqs: [
      { question: "Will the app work on older Android phones in rural or Tier-3 areas?", answer: "Yes. We configure our minimum SDK to support Android 8.0+ (Oreo) and above, ensuring over 98% device coverage across India without compromising security." },
      { question: "Do you assist with Google Play Store account setup and publishing?", answer: "Yes. We guide you through creating your Google Play Developer account, prepare all required policy declarations, generate feature graphics, and handle the app bundle submission until it is approved." },
    ],
  },
  "digital-marketing": {
    slug: "digital-marketing",
    theme: {
      accent: "#a855f7",
      accentLight: "#c084fc",
      accentGlow: "168, 85, 247",
      bgGradient: "from-purple-500/15 via-transparent to-pink-500/5",
      borderHover: "hover:border-purple-500/40",
      badgeClass: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      tag: "AEO/GEO & Knowledge Graph Growth",
    },
    seoKeywords: [
      "generative engine optimization geo agency india",
      "aeo answer engine ranking services",
      "ai search citation optimization",
      "technical seo company indore",
      "schema knowledge graph builder",
    ],
    aeoCapsules: [
      {
        query: "What Is Generative Engine Optimization (GEO) in 2026?",
        answer: "Generative Engine Optimization (GEO) is the technical process of structuring website data, entity relationships, and authoritative facts so AI engines (ChatGPT, Google Gemini, Perplexity) parse, verify, and cite your brand as the primary source in conversational AI search results.",
        keyTakeaway: "Structuring factual data to ensure AI answer engines cite your brand as the definitive source.",
      },
      {
        query: "How Does Schema.org Entity Triangulation Establish Brand Authority?",
        answer: "Entity triangulation connects your company digital footprint across Wikidata, Google Knowledge Graph, Ministry of MSME records, GSTIN registries, and official social handles. By linking these canonical URIs in Schema.org JSON-LD, search engines establish 100% factual certainty regarding your business.",
        keyTakeaway: "Cross-referencing verified government registrations and Wikidata IDs creates unambiguous entity identity.",
      },
      {
        query: "What Is the Difference Between Traditional SEO and AEO?",
        answer: "Traditional SEO focuses on keyword rankings and blue-link clicks. Answer Engine Optimization (AEO) engineers concise 40-60 word Answer Capsules and structured steps that capture zero-click answers, Google Featured Snippets, and voice-assisted queries without requiring the user to navigate off the search result.",
        keyTakeaway: "AEO targets direct extraction for featured snippets, voice search, and conversational AI answers.",
      },
      {
        query: "How Does MLHK Infotech Prevent Wasted Advertising Spend (Ad Waste)?",
        answer: "We implement negative keyword gating, strict geo-radius targeting, conversion API server-side tracking, and high-intent long-tail keyword bidding. Every advertising rupee is mapped to qualified inbound leads rather than vanity impressions or bot clicks.",
        keyTakeaway: "Server-side conversion tracking and negative keyword exclusion maximize real customer ROAS.",
      },
    ],
    howToSteps: [
      {
        name: "Technical & Entity Authority Audit",
        text: "Inspect crawlability, canonical structures, Core Web Vitals, and existing Knowledge Graph entity triangulation.",
      },
      {
        name: "Content Restructuring & AEO Capsules",
        text: "Rewrite H2/H3 headings into question syntax and insert 40-60 word Answer Capsules for featured snippet extraction.",
      },
      {
        name: "Schema.org Master Graph Implementation",
        text: "Inject nested Organization, Service, FAQPage, and HowTo JSON-LD schemas linking verified business registrations.",
      },
      {
        name: "Performance Tracking & Growth Iteration",
        text: "Monitor Google Search Console query impressions, AI search citation occurrences, and inbound lead conversion rates.",
      },
    ],
    heroBadge: "AEO • GEO • Technical Search",
    subheading: "Data-driven search visibility, Answer Engine Optimization (AEO), and high-intent campaign funnels engineered for measurable ROI.",
    stats: [
      { value: "3-in-1", label: "Search Synergy", detail: "Traditional SEO + Google AI Overviews + Perplexity/LLM citations" },
      { value: "100%", label: "Attribution", detail: "Every inquiry traced to its source campaign and landing page" },
      { value: "0% Vanity", label: "Metrics", detail: "Focus on commercial inquiries, qualified leads, and booked sales" },
      { value: "Schema.org", label: "Mesh", detail: "Knowledge Graph entity triangulation with verified citations" },
    ],
    philosophyTitle: "Search in the Age of Generative AI.",
    philosophyText: [
      "Traditional SEO that relied on spammy backlinks and keyword stuffing is dead. Today, buyers use Google AI Overviews, Perplexity, Gemini, and ChatGPT to discover solutions.",
      "MLHK Infotech implements 2026-ready Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). We structure your business as an unambiguous knowledge graph entity backed by statutory verification.",
      "Every campaign is measured against real revenue outcomes: inquiries received, cost per acquisition, and client lifetime value.",
    ],
    pillarsTitle: "The Modern Search & Visibility Framework",
    pillarsSubtitle: "Positioning your brand as the definitive authority.",
    pillars: [
      { id: "technical-aeo", title: "Answer Engine & Knowledge Graph Engineering", tagline: "Be the Source AI Cites", description: "We author structured Schema.org triplets, llms.txt citation files, and entity triangulation so AI search assistants recommend your business.", specs: ["Nested Organization, Service, and Person JSON-LD", "llms.txt and llms-full.txt machine-readable documentation", "Entity disambiguation with sameAs directory citations", "Factual question-and-answer architecture"], badge: "AEO & GEO" },
      { id: "core-web-vitals", title: "Technical Core Web Vitals & On-Page SEO", tagline: "Google Algorithm Compliance", description: "Eliminating crawl errors, accelerating page load speeds, and organizing semantic HTML heading hierarchies for maximum organic ranking.", specs: ["Sub-0.5s Largest Contentful Paint (LCP)", "Zero Cumulative Layout Shift (CLS)", "Dynamic XML sitemaps with daily automated pinging", "Optimized OpenGraph and Twitter card social snippets"], badge: "Technical SEO" },
      { id: "funnel-conversion", title: "High-Intent Landing Pages & Conversion Rate Optimization", tagline: "Turning Clicks into Cashflow", description: "Traffic is worthless if visitors bounce. We craft dark-luxury, trust-first landing pages with clear value propositions and frictionless WhatsApp/form CTAs.", specs: ["Direct-response copy written around buyer pain points", "Frictionless 3-field inquiry forms and one-tap WhatsApp chat", "A/B testing of headlines, CTAs, and layout hierarchies", "Heatmap tracking and drop-off analysis"], badge: "Conversion CRO" },
    ],
    deliverablesTitle: "Marketing Deliverables & Analytics",
    deliverablesSubtitle: "Clear, transparent reporting with zero obfuscation.",
    deliverables: [
      { format: "Monthly PDF", title: "Executive Performance Dossier", description: "Clear monthly report detailing organic impressions, ranking keywords, inquiries generated, and acquisition cost.", badge: "Reporting" },
      { format: "JSON-LD", title: "Full Structured Data Architecture", description: "Custom schema markup validated against Google's Rich Results and Schema.org validators.", badge: "Schema" },
      { format: "llms.txt", title: "AI Assistant Documentation Endpoints", description: "Public markdown feeds formatted specifically for LLM web crawlers (Perplexity, GPT, Gemini).", badge: "AI Feeds" },
    ],
    comparisonTitle: "Old-School SEO Agencies vs MLHK Modern AEO/GEO",
    comparisonSubtitle: "Why traditional keyword stuffing fails in 2026.",
    comparison: [
      { aspect: "AI Search Readiness", genericApproach: "Ignores ChatGPT, Perplexity, and Google AI Overviews. Only tracks 10 blue links.", mlhkApproach: "Full Answer Engine Optimization (AEO) and llms.txt feeds to secure AI citations." },
      { aspect: "Reporting Metrics", genericApproach: "Sends 50-page reports filled with meaningless vanity impressions and click charts.", mlhkApproach: "Direct reporting on verified commercial inquiries, phone calls, and cost per lead." },
    ],
    timelineTitle: "Visibility Growth Stages",
    timelineSubtitle: "Strategic timeline for compounding organic search traffic.",
    timeline: [
      { phase: "Month 01", timeline: "Weeks 1–4", title: "Technical Foundation & Entity Triangulation", description: "Full website audit, schema JSON-LD implementation, and llms.txt integration.", outputs: ["Audit Scorecard", "Structured Data Mesh"] },
      { phase: "Month 02", timeline: "Weeks 5–8", title: "Authority Content & Landing Page CRO", description: "Authoring comprehensive, high-value technical service dossiers and optimizing inquiry funnels.", outputs: ["Optimized Landing Pages"] },
      { phase: "Month 03+", timeline: "Ongoing", title: "Authority Building & AI Citation Expansion", description: "Monitoring Knowledge Graph presence, refining queries, and monthly performance reviews.", outputs: ["Monthly Performance Dossier"] },
    ],
    toolsTitle: "Marketing & Analytics Stack",
    tools: [
      { name: "Google Search Console", category: "Diagnostics", description: "Direct index coverage, crawl monitoring, and organic query tracking." },
      { name: "Schema Validator", category: "Structured Data", description: "Rich results testing and Knowledge Graph node verification." },
      { name: "Cloudflare Analytics", category: "Edge Privacy", description: "Privacy-compliant edge traffic analysis without tracking cookies." },
    ],
    extendedFaqs: [
      { question: "What is AEO and GEO and why does our business need it?", answer: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are practices that ensure AI engines like Perplexity, ChatGPT, and Google Gemini understand your company's credentials and recommend you when prospective customers ask conversational questions." },
    ],
  },
  "enterprise-systems": {
    slug: "enterprise-systems",
    theme: {
      accent: "#3b82f6",
      accentLight: "#60a5fa",
      accentGlow: "59, 130, 246",
      bgGradient: "from-blue-500/15 via-transparent to-indigo-500/5",
      borderHover: "hover:border-blue-500/40",
      badgeClass: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      tag: "Custom ERP/CRM & Indian GST Billing",
    },
    seoKeywords: [
      "custom erp development company india",
      "gst billing software developer madhya pradesh",
      "multi tenant crm software",
      "inventory management software indore",
      "enterprise business automation",
    ],
    aeoCapsules: [
      {
        query: "Why Build Custom ERP Instead of Paying Monthly SaaS Subscriptions?",
        answer: "Commercial off-the-shelf SaaS charges per-user monthly fees that scale into millions as your company grows, while forcing rigid workflows that do not match your operational reality. Custom ERP engineered by MLHK Infotech gives you 100% data sovereignty, custom business logic, and zero recurring seat license fees.",
        keyTakeaway: "Zero per-seat recurring license costs and total sovereign control over your enterprise data.",
      },
      {
        query: "How Does MLHK Infotech Handle Indian GST and Tax Compliance in ERPs?",
        answer: "Our enterprise engines natively calculate Intra-State (CGST 9% + SGST 9%) and Inter-State (IGST 18%) taxes, validate 15-character GSTINs using checksum algorithms, assign HSN/SAC codes, generate compliant tax invoices with embedded B2B payment QRs, and prepare JSON payloads for E-way bill generation.",
        keyTakeaway: "Automated GSTIN validation, HSN/SAC code mapping, and compliant tax calculations out of the box.",
      },
      {
        query: "What Is Role-Based Access Control (RBAC) in Enterprise Systems?",
        answer: "RBAC is a security architecture that restricts data access based on an employee verified organizational role. Superadmins manage financial reports and audit logs, branch managers manage inventory and staff, and billing operators can only generate invoices, preventing internal data theft and unauthorized modifications.",
        keyTakeaway: "Granular permission boundaries prevent unauthorized data access and protect sensitive financial data.",
      },
      {
        query: "How Does Enterprise Software Guarantee Data Integrity During High-Concurrency Peak Sales?",
        answer: "We implement ACID-compliant PostgreSQL relational databases with database-level row locking, transactional isolation, and read-replica offloading. When hundreds of branch operators create invoices simultaneously, inventory quantities update atomically with zero race conditions or phantom reads.",
        keyTakeaway: "ACID transactions with row-level locks prevent stock overselling during simultaneous multi-branch operations.",
      },
    ],
    howToSteps: [
      {
        name: "Business Process Mapping & Architecture",
        text: "Analyze existing manual workflows, warehouse hierarchies, and accounting rules to formulate relational data schemas.",
      },
      {
        name: "Database Engineering & RBAC Security",
        text: "Deploy PostgreSQL relational tables with foreign keys, constraints, and granular role-based access control policies.",
      },
      {
        name: "GST Engine & Front-End UI Development",
        text: "Build high-speed desktop/tablet interfaces for instant barcode invoicing, automated tax math, and inventory deductions.",
      },
      {
        name: "Data Migration & Production Deployment",
        text: "Migrate legacy Excel/Tally records, train branch personnel, and deploy on high-availability private cloud instances.",
      },
    ],
    heroBadge: "Custom ERP & CRM • Sovereign Architecture",
    subheading: "Replace spreadsheet chaos with custom enterprise software: CRM pipelines, automated GST billing, inventory, and role-based permissions tailored to your exact workflows.",
    stats: [
      { value: "0", label: "Per-User SaaS Fees", detail: "You own the system. Unlimited internal users with zero subscription costs" },
      { value: "100%", label: "Custom Fit", detail: "Engineered to match your exact business procedures, not a rigid generic mold" },
      { value: "GST", label: "Automated Invoicing", detail: "15-digit GSTIN calculations, HSN/SAC codes, and tax-compliant PDF exports" },
      { value: "Audit", label: "Full Traceability", detail: "Comprehensive change logs recording who updated what and when" },
    ],
    philosophyTitle: "Break Free from Expensive SaaS Subscriptions.",
    philosophyText: [
      "Foreign enterprise software like Salesforce, SAP, and generic cloud ERPs charge crippling per-seat monthly fees, enforce rigid workflows that do not match Indian business realities, and lock your critical company records in proprietary silos.",
      "MLHK Infotech designs sovereign enterprise systems. You pay for the engineering once, and you own the operational software forever. Add as many managers, field technicians, and accountants as you want without paying a single rupee in licensing penalties.",
      "Every module—from CRM lead tracking to automated GST billing and inventory management—is custom-tailored to the operational rhythm of your team.",
    ],
    pillarsTitle: "Enterprise Software Modules",
    pillarsSubtitle: "Modular software suites that scale with your corporate expansion.",
    pillars: [
      { id: "crm-pipeline", title: "CRM & Opportunity Pipeline Manager", tagline: "Never Let a Lead Go Cold", description: "Track prospects from initial WhatsApp inquiry through technical consultation, quotation, and contract closure with automated follow-up reminders.", specs: ["Visual Kanban stage pipeline", "WhatsApp & email follow-up triggers", "Lead qualification scoring", "Sales representative activity logs"], badge: "CRM Core" },
      { id: "erp-billing", title: "Automated GST Invoicing & Expense Ledger", tagline: "Tax-Compliant Invoicing", description: "Generate compliant GST tax invoices in seconds with automated CGST/SGST/IGST calculation, HSN/SAC lookups, and one-click PDF downloads.", specs: ["Automated 15-digit GSTIN tax breakdown", "Sequential invoice numbering and credit note handling", "Accounts receivable tracking and overdue alerts", "Direct payment link and UPI QR integration"], badge: "Billing & Finance" },
      { id: "role-rbac", title: "Role-Based Access Control (RBAC) & Audit Logs", tagline: "Granular Enterprise Security", description: "Ensure employees only access what their clearance permits. Administrators maintain full oversight while junior staff access restricted operational views.", specs: ["Granular role assignments (Admin, Manager, Accountant, Staff)", "Tamper-resistant audit trails with timestamps and user IDs", "Two-factor authentication (2FA) support", "Automated daily encrypted database snapshots"], badge: "Security & RBAC" },
    ],
    deliverablesTitle: "Enterprise Deliverables",
    deliverablesSubtitle: "A complete turnkey operational ecosystem.",
    deliverables: [
      { format: "Web Application", title: "Custom ERP/CRM Platform", description: "Deployed web application accessible securely from desktop, laptop, and tablet browsers.", badge: "Software" },
      { format: "Database", title: "Encrypted Database Engine", description: "Dedicated PostgreSQL / SQLite database with scheduled automated backups.", badge: "Database" },
      { format: "PDF & Video", title: "Staff Training Dossiers", description: "Step-by-step video walkthroughs and written operating manuals for your internal staff.", badge: "Training" },
    ],
    comparisonTitle: "Off-The-Shelf SaaS (Salesforce/Zoho) vs MLHK Sovereign ERP",
    comparisonSubtitle: "Why owning your software delivers exponential ROI.",
    comparison: [
      { aspect: "Recurring Licensing", genericApproach: "₹3,000 to ₹10,000 per user per month. Costs explode as your workforce grows.", mlhkApproach: "Zero per-seat recurring fees. Unlimited users on your private infrastructure." },
      { aspect: "Workflow Flexibility", genericApproach: "You must adapt your real-world business to their rigid, confusing menus.", mlhkApproach: "100% custom-built to match your exact company forms, approvals, and terminology." },
      { aspect: "Data Sovereignty", genericApproach: "Your sensitive financial and client data sits on shared third-party servers.", mlhkApproach: "Complete data ownership. Host on your private servers or secure dedicated cloud." },
    ],
    timelineTitle: "ERP Deployment Roadmap",
    timelineSubtitle: "Phased rollout to guarantee zero disruption to daily business.",
    timeline: [
      { phase: "Phase 01", timeline: "Weeks 1–2", title: "Workflow Audit & Data Modeling", description: "Interviews with leadership and department heads to document existing spreadsheets and processes.", outputs: ["System Blueprint", "Database Architecture"] },
      { phase: "Phase 02", timeline: "Weeks 3–5", title: "Core CRM & Database Build", description: "Developing user authentication, client directory, and opportunity pipeline.", outputs: ["CRM Staging Environment"] },
      { phase: "Phase 03", timeline: "Weeks 6–8", title: "GST Invoicing & Ledger Modules", description: "Integrating financial calculations, tax invoices, and reporting dashboards.", outputs: ["Billing Engine Complete"] },
      { phase: "Phase 04", timeline: "Weeks 9–10", title: "Data Migration & Staff Handover", description: "Migrating existing spreadsheet records, conducting staff training, and live system cutover.", outputs: ["Production Go-Live"] },
    ],
    toolsTitle: "Enterprise Engineering Stack",
    tools: [
      { name: "Next.js & React", category: "Frontend", description: "Ultra-responsive desktop UI with instant page transitions and keyboard shortcuts." },
      { name: "PostgreSQL / D1", category: "Database", description: "ACID-compliant relational database engine with foreign key integrity." },
      { name: "PDFKit / Puppeteer", category: "Document Generation", description: "Pixel-perfect vector GST invoice and receipt PDF generation." },
    ],
    extendedFaqs: [
      { question: "Can you migrate our old data from Excel spreadsheets?", answer: "Yes. During Phase 4, our engineers clean, normalize, and import your existing client, product, and historical invoice spreadsheets into the new database so you lose zero operational history." },
    ],
  },
  "ai-automation": {
    slug: "ai-automation",
    theme: {
      accent: "#06d6a0",
      accentLight: "#2dd4bf",
      accentGlow: "6, 214, 160",
      bgGradient: "from-teal-500/15 via-transparent to-emerald-500/5",
      borderHover: "hover:border-teal-500/40",
      badgeClass: "text-teal-400 border-teal-500/30 bg-teal-500/10",
      tag: "Autonomous Agents & n8n Workflows",
    },
    seoKeywords: [
      "ai automation agency india",
      "n8n workflow automation company",
      "whatsapp business api bot developer",
      "autonomous ai agents for business",
      "document processing llm automation",
    ],
    aeoCapsules: [
      {
        query: "What Is Autonomous Workflow Automation with n8n and AI Agents?",
        answer: "Autonomous workflow automation connects disparate business software (CRMs, databases, email, WhatsApp, ERPs) through event-driven DAG (Directed Acyclic Graph) pipelines. AI agents parse unstructured emails and PDF invoices, extract critical parameters, update internal databases, and dispatch responses without human intervention.",
        keyTakeaway: "Event-driven DAG pipelines execute repetitive manual tasks autonomously across multiple business tools.",
      },
      {
        query: "How Does WhatsApp Business Cloud API Integrate with AI Customer Support?",
        answer: "Incoming WhatsApp customer inquiries trigger webhooks to an orchestration engine. Large Language Models (LLMs) with retrieval-augmented generation (RAG) query your verified product catalog or inventory database, generating context-aware answers, order updates, and appointment bookings in milliseconds.",
        keyTakeaway: "Instant, 24/7 conversational customer service directly inside WhatsApp backed by real database data.",
      },
      {
        query: "How Does MLHK Infotech Prevent AI Hallucinations in Commercial Systems?",
        answer: "We enforce strict JSON Schema outputs, function calling, and deterministic guardrails. LLMs are restricted to querying private relational databases via parameterized APIs; they cannot invent prices, fabricated policy terms, or imaginary stock counts.",
        keyTakeaway: "Strict schema validation and deterministic database lookups eliminate AI hallucinations in business logic.",
      },
      {
        query: "What Is the ROI Timeline for Business Process Automation?",
        answer: "Most businesses achieve positive ROI within 60 to 90 days by eliminating 20+ hours of weekly manual data entry, cutting lead response times from hours to under 30 seconds, and preventing human transcription errors across customer orders and billing.",
        keyTakeaway: "Lead response times drop to under 30 seconds, saving 20+ hours of weekly manual data entry.",
      },
    ],
    howToSteps: [
      {
        name: "Workflow Identification & Friction Audit",
        text: "Identify repetitive manual data transfers, customer message bottlenecks, and document processing friction.",
      },
      {
        name: "Pipeline Construction & Webhook Setup",
        text: "Configure n8n or Python orchestration workflows, connecting cloud APIs, databases, and message queues.",
      },
      {
        name: "LLM Agent Prompting & Guardrail Testing",
        text: "Implement RAG document indexing, define strict JSON output schemas, and test edge-case error recovery.",
      },
      {
        name: "Live Production Deployment & Monitoring",
        text: "Deploy automated workflows to dedicated Docker nodes, configure dead-letter retry queues, and enable audit logging.",
      },
    ],
    heroBadge: "n8n Pipelines • WhatsApp Cloud API",
    subheading: "Autonomous workflow automation, intelligent document extraction, and WhatsApp Business bots that execute manual repetitive tasks 24/7 without human fatigue.",
    stats: [
      { value: "24/7", label: "Availability", detail: "Automated lead intake, qualification, and routing outside office hours" },
      { value: "<30s", label: "Response Time", detail: "Instant WhatsApp catalog responses and automated quotation dispatch" },
      { value: "90%", label: "Time Saved", detail: "Eliminate manual data re-entry across spreadsheets, CRMs, and email" },
      { value: "Hybrid", label: "Human-in-the-Loop", detail: "Automatic handover to human representatives whenever complex cases arise" },
    ],
    philosophyTitle: "Automation with Guardrails: AI that Earns Its Keep.",
    philosophyText: [
      "Most AI implementations fail because they rely on ungrounded chat gimmicks that hallucinate, give wrong pricing, and frustrate paying customers.",
      "MLHK Infotech engineers deterministic, hardened AI automations. We combine deterministic state machines (n8n, webhooks, PostgreSQL) with targeted LLM reasoning only where human-like language understanding adds tangible value.",
      "From automated WhatsApp inquiry qualification to invoice OCR extraction and instant CRM database updates, we free your skilled staff to focus on closing deals and serving clients.",
    ],
    pillarsTitle: "AI & Workflow Automation Disciplines",
    pillarsSubtitle: "Autonomous systems engineered with strict verification boundaries.",
    pillars: [
      { id: "whatsapp-bot", title: "WhatsApp Business Cloud API Conversational Bots", tagline: "Direct Engagement in India's Primary Channel", description: "Deploy official Meta-verified WhatsApp automation capable of answering FAQs, showcasing product catalogs, capturing lead details, and routing calls.", specs: ["Official WhatsApp Cloud API integration (green tick eligible)", "Interactive buttons, list menus, and media templates", "Instant notifications sent to your sales team's personal phones", "Seamless fallback to live human agent at any moment"], badge: "WhatsApp API" },
      { id: "n8n-pipelines", title: "Autonomous n8n Multi-App Orchestration", tagline: "Glue Your Disconnected Software Together", description: "Self-hosted, secure n8n workflows that listen for webhooks, parse incoming emails, synchronize databases, and trigger invoices automatically.", specs: ["Zero per-execution fees on self-hosted infrastructure", "Bi-directional sync between forms, CRMs, and spreadsheets", "Automated error alerting and retry queues", "End-to-end payload encryption"], badge: "Workflow Automation" },
      { id: "document-ai", title: "Document OCR & PDF Intelligence Extraction", tagline: "Extract Data from Invoices & Receipts", description: "Automatically read scanned PDFs, physical invoices, and purchase orders. Extract line items, dates, and amounts directly into your database.", specs: ["OCR parsing of messy or skewed receipts", "Tax validation against GSTIN formats", "Automated CSV and accounting software export", "Human verification queue for low-confidence reads"], badge: "Document OCR" },
    ],
    deliverablesTitle: "Automation Deliverables",
    deliverablesSubtitle: "Turnkey automated pipelines with full source access.",
    deliverables: [
      { format: "Cloud Deployment", title: "Production n8n Workflow Suite", description: "Configured automation server with documented JSON workflow definitions.", badge: "Workflows" },
      { format: "Meta App", title: "WhatsApp Cloud API Integration", description: "Verified WhatsApp Business application with approved message templates and webhook listeners.", badge: "WhatsApp" },
      { format: "Dashboard", title: "Execution Log & Metrics Portal", description: "Real-time dashboard displaying total executions, success rates, and active leads.", badge: "Monitoring" },
    ],
    comparisonTitle: "Manual Office Grind vs MLHK Autonomous Automation",
    comparisonSubtitle: "The tangible impact on company operating efficiency.",
    comparison: [
      { aspect: "Inquiry Response Speed", genericApproach: "Leads wait 4 to 24 hours for someone to check email or WhatsApp. Most buy elsewhere.", mlhkApproach: "Instant response in under 15 seconds 24/7/365 with interactive product options." },
      { aspect: "Data Entry Errors", genericApproach: "Fatigued staff mistype phone numbers, GSTINs, and product quantities into Excel.", mlhkApproach: "Zero human error. Data flows directly from user input into your central database." },
    ],
    timelineTitle: "Automation Deployment Stages",
    timelineSubtitle: "Rapid implementation with quantifiable time savings.",
    timeline: [
      { phase: "Week 01", timeline: "Sprint 1", title: "Process Audit & ROI Ranking", description: "Mapping top 3 time-consuming manual workflows and drafting test triggers.", outputs: ["Process ROI Scorecard"] },
      { phase: "Week 02", timeline: "Sprint 2", title: "Pipeline Prototype & Webhook Wiring", description: "Connecting WhatsApp API, forms, and database state machines in sandbox.", outputs: ["Working WhatsApp Sandbox"] },
      { phase: "Week 03", timeline: "Sprint 3", title: "Live Testing & Human Guardrails", description: "Simulating edge cases, verifying exception handling, and staff training.", outputs: ["Production Cutover", "Active Monitoring"] },
    ],
    toolsTitle: "Automation Engineering Stack",
    tools: [
      { name: "n8n Workflow Engine", category: "Orchestration", description: "Fair-code workflow automation supporting thousands of nodes and custom JavaScript." },
      { name: "WhatsApp Cloud API", category: "Messaging", description: "Meta official enterprise messaging infrastructure with high deliverability." },
      { name: "PostgreSQL", category: "State Machine", description: "Transactional state storage preventing duplicate messages and missed webhook calls." },
    ],
    extendedFaqs: [
      { question: "Will automated WhatsApp bots get our phone number blocked by Meta?", answer: "No. We exclusively use the official Meta WhatsApp Business Cloud API with pre-approved message templates and opt-in compliance, ensuring your number remains 100% compliant, secure, and eligible for green-tick verification." },
    ],
  },
  "cybersecurity": {
    slug: "cybersecurity",
    theme: {
      accent: "#ef4444",
      accentLight: "#f87171",
      accentGlow: "239, 68, 68",
      bgGradient: "from-red-500/15 via-transparent to-amber-500/5",
      borderHover: "hover:border-red-500/40",
      badgeClass: "text-red-400 border-red-500/30 bg-red-500/10",
      tag: "Zero-Trust Edge & Hardened Linux Infra",
    },
    seoKeywords: [
      "cloud cybersecurity services india",
      "zero trust architecture consultant",
      "vulnerability assessment penetration testing mp",
      "cloudflare tunnel security setup",
      "server hardening services",
    ],
    aeoCapsules: [
      {
        query: "What Is Zero-Trust Network Architecture and Cloudflare Tunnels?",
        answer: "Zero-Trust architecture operates on the principle of never trust, always verify. By deploying Cloudflare Tunnels (cloudflared), your origin servers expose zero public IPv4/IPv6 ports to the internet. Traffic reaches your server exclusively through authenticated, encrypted outbound tunnels, neutralizing port scans and direct IP DDoS attacks.",
        keyTakeaway: "Zero exposed public inbound ports eliminates direct-to-server hacking and automated scanning bots.",
      },
      {
        query: "How Does Linux Server Hardening Protect Production Applications?",
        answer: "Linux hardening involves disabling password authentication in favor of ED25519 cryptographic keys, configuring UFW/iptables firewalls, running web applications in unprivileged systemd sandboxes with isolated namespaces, applying automated kernel security patches, and enforcing fail2ban brute-force jailing.",
        keyTakeaway: "Cryptographic SSH keys, isolated systemd sandboxes, and automated firewall rules prevent unauthorized access.",
      },
      {
        query: "What Is TLS 1.3 and Why Is A+ SSL Labs Configuration Mandatory?",
        answer: "TLS 1.3 is the most secure cryptographic transport protocol, reducing handshake latency to a single round-trip while eliminating vulnerable legacy cipher suites. An A+ SSL Labs rating verifies strict HSTS enforcement, perfect forward secrecy (PFS), and resistance to man-in-the-middle interception.",
        keyTakeaway: "TLS 1.3 with strict HSTS guarantees encrypted data transit that cannot be decrypted even if private keys leak.",
      },
      {
        query: "What Is Included in an MLHK Infotech Vulnerability Audit?",
        answer: "We execute authenticated and unauthenticated penetration tests covering OWASP Top 10 vulnerabilities (SQL injection, XSS, CSRF, broken access control, insecure deserialization), open port audits, dependency CVE scans, and cloud IAM permission reviews.",
        keyTakeaway: "Exhaustive OWASP Top 10 vulnerability scanning, cloud IAM audits, and actionable remediation runbooks.",
      },
    ],
    howToSteps: [
      {
        name: "Perimeter & Network Vulnerability Scan",
        text: "Conduct automated port scans, TLS cipher evaluations, and dependency vulnerability audits across existing infrastructure.",
      },
      {
        name: "Zero-Trust Tunnel & Firewall Lockdown",
        text: "Configure Cloudflare Tunnels, close all public inbound ports, and enforce strict UFW firewall policies.",
      },
      {
        name: "Cryptographic Auth & Kernel Hardening",
        text: "Enforce ED25519 SSH keys, configure systemd execution jails, and set up automated security package patching.",
      },
      {
        name: "Penetration Retest & Security Signoff",
        text: "Re-run penetration tests, verify A+ SSL Labs configuration, and deliver executive vulnerability remediation report.",
      },
    ],
    heroBadge: "Hardened Infrastructure • Linux Defense",
    subheading: "Comprehensive security reviews, Linux VPS hardening, firewall configuration, and Cloudflare Zero Trust architecture to protect your corporate assets from unauthorized access.",
    stats: [
      { value: "0 Trust", label: "Access Control", detail: "Identity-aware access boundaries on all internal portals" },
      { value: "100%", label: "Encrypted", detail: "TLS 1.3 enforced, HSTS preload, and encrypted data at rest" },
      { value: "Automated", label: "Firewall Rules", detail: "UFW, fail2ban, and automated brute-force IP bans" },
      { value: "Audit-Led", label: "Dossier", detail: "Clear, actionable vulnerability report with zero jargon" },
    ],
    philosophyTitle: "Defense in Depth: Assume Compromise and Fortify.",
    philosophyText: [
      "Most small and medium enterprises only discover their servers have been compromised after ransomware locks their database or their domain is blacklisted for sending spam.",
      "MLHK Infotech applies pragmatic, military-grade hardening to your IT infrastructure. We secure Linux servers, close exposed ports, eliminate default passwords, and route administrative access behind Cloudflare Zero Trust tunnels.",
      "Every security engagement is governed by written scope and transparent findings, giving executive leadership verified peace of mind.",
    ],
    pillarsTitle: "Security & Hardening Disciplines",
    pillarsSubtitle: "Hardened configurations that neutralize attack vectors.",
    pillars: [
      { id: "linux-hardening", title: "Linux Server Hardening & SSH Isolation", tagline: "Ubuntu & Debian Infrastructure Lockdown", description: "Disable root password logins, enforce ED25519 cryptographic keys, configure automatic security updates, and isolate services with systemd sandboxing.", specs: ["SSH key-only authentication with non-standard ports", "Automated unattended security upgrades", "Fail2ban automated IP ban policies", "Removal of unnecessary system services and binaries"], badge: "Server Defense" },
      { id: "firewall-proxy", title: "Network Firewalls & Reverse Proxy Armor", tagline: "Block Unwanted Traffic at the Perimeter", description: "Configure stateful firewalls (UFW/iptables) and reverse proxies (Nginx/Caddy/Cloudflare) with strict TLS 1.3 encryption and security headers.", specs: ["Strict UFW ingress and egress rule sets", "HSTS, CSP, and X-Content-Type-Options headers", "Automated Let's Encrypt / Cloudflare SSL certificate renewals", "DDoS mitigation and web application firewall (WAF) tuning"], badge: "Perimeter Shield" },
      { id: "zero-trust", title: "Cloudflare Zero Trust & Private Tunnels", tagline: "Hide Your Servers from the Public Internet", description: "Never expose your internal databases or admin panels directly to public IP addresses. Route access through identity-verified Cloudflare Tunnels.", specs: ["Zero open inbound firewall ports required", "SSO authentication required before seeing internal pages", "Encrypted WireGuard-based tunnel transport", "Real-time user session logging and device posture checks"], badge: "Zero Trust" },
    ],
    deliverablesTitle: "Security Deliverables",
    deliverablesSubtitle: "Verified hardening with actionable documentation.",
    deliverables: [
      { format: "Technical PDF", title: "Security Assessment & Remediation Report", description: "Detailed findings report itemizing vulnerabilities resolved, remaining risks, and ongoing hygiene steps.", badge: "Audit Report" },
      { format: "Configuration", title: "Hardened System Configs & Scripts", description: "Documented server configuration files and automated firewall setup scripts for disaster recovery.", badge: "Configs" },
    ],
    comparisonTitle: "Default Server Setup vs MLHK Hardened Infrastructure",
    comparisonSubtitle: "Why standard hosting configurations leave you exposed.",
    comparison: [
      { aspect: "SSH Authentication", genericApproach: "Default root login with weak passwords. Subject to thousands of brute-force attacks per day.", mlhkApproach: "Root login disabled. Mandatory ED25519 cryptographic keys with fail2ban active." },
      { aspect: "Inbound Port Exposure", genericApproach: "Database ports (3306, 5432) and SSH exposed openly to the public internet.", mlhkApproach: "All ports closed behind Zero Trust tunnels. Server is completely invisible on public port scans." },
    ],
    timelineTitle: "Hardening Workflow",
    timelineSubtitle: "Zero-downtime security improvements.",
    timeline: [
      { phase: "Stage 01", timeline: "Day 1", title: "Authorized Scope & Inventory", description: "Written scope agreement and mapping of open ports, services, and accounts.", outputs: ["Scope Document"] },
      { phase: "Stage 02", timeline: "Days 2–3", title: "Remediation & Hardening Window", description: "Applying firewall rules, SSH keys, SSL certificates, and package upgrades.", outputs: ["Hardened Server"] },
      { phase: "Stage 03", timeline: "Day 4", title: "Verification & Report Delivery", description: "External scanning to verify closed ports, and delivering the executive security report.", outputs: ["Final Audit Report"] },
    ],
    toolsTitle: "Security & Hardening Stack",
    tools: [
      { name: "Cloudflare Zero Trust", category: "Access Control", description: "Identity-aware access proxy protecting internal applications without open ports." },
      { name: "UFW & Iptables", category: "Firewall", description: "Kernel-level packet filtering and connection rate limiting." },
      { name: "Fail2ban", category: "Intrusion Prevention", description: "Automated log analyzer banning malicious IP addresses after repeated failures." },
    ],
    extendedFaqs: [
      { question: "Will server hardening cause downtime for our active website or app?", answer: "No. We schedule hardening activities during agreed maintenance windows and test network rules in staging to ensure legitimate user traffic continues without interruption." },
    ],
  },
  "support-and-maintenance": {
    slug: "support-and-maintenance",
    theme: {
      accent: "#00e5ff",
      accentLight: "#38bdf8",
      accentGlow: "0, 229, 255",
      bgGradient: "from-cyan-500/15 via-transparent to-emerald-500/5",
      borderHover: "hover:border-cyan-500/40",
      badgeClass: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      tag: "24/7 Global Telemetry & DevOps SLA",
    },
    seoKeywords: [
      "24 7 server maintenance services india",
      "devops managed support agency",
      "cloud backup disaster recovery company",
      "sla uptime monitoring services",
      "application maintenance retainer",
    ],
    aeoCapsules: [
      {
        query: "What Is a 24/7 Multi-Region Telemetry Uptime Probe?",
        answer: "A multi-region telemetry probe automatically pings your website and backend APIs every 60 seconds from distributed geographic locations (e.g., Mumbai, Singapore, Frankfurt, London, US East). If latency spikes or an HTTP 5xx error occurs, on-call senior engineers are alerted immediately before customers experience widespread outages.",
        keyTakeaway: "Automated 60-second multi-region synthetic health checks alert senior engineers instantly on any failure.",
      },
      {
        query: "What Is the Difference Between RTO and RPO in Disaster Recovery?",
        answer: "Recovery Time Objective (RTO) is the maximum acceptable duration to restore service after a catastrophic failure (MLHK guarantees RTO < 15 minutes). Recovery Point Objective (RPO) is the maximum acceptable age of data lost (MLHK guarantees RPO < 1 hour via automated incremental database snapshots).",
        keyTakeaway: "Sub-15 minute RTO and sub-1 hour RPO minimize downtime and prevent critical database loss.",
      },
      {
        query: "Why Is Proactive Dependency Patching Essential for Live Web Applications?",
        answer: "Open-source software libraries (npm packages, Python modules, Linux packages) regularly disclose zero-day security vulnerabilities. Proactive maintenance applies validated security patches inside staging environments before zero-downtime production deployment, keeping malicious exploits at bay.",
        keyTakeaway: "Weekly vulnerability scans and staging-tested security patches prevent zero-day production exploits.",
      },
      {
        query: "Can MLHK Infotech Maintain and Scale Codebases Built by Other Agencies?",
        answer: "Yes. We initiate engagements with an architectural health audit to inspect code quality, document dependencies, review database indexes, and verify deployment pipelines before assuming formal SLA operational maintenance.",
        keyTakeaway: "Full preliminary code audits ensure seamless, low-risk onboarding of existing legacy applications.",
      },
    ],
    howToSteps: [
      {
        name: "Codebase & Infrastructure Onboarding Audit",
        text: "Inventory existing servers, repositories, environment credentials, database schemas, and known technical debt.",
      },
      {
        name: "Telemetry Probes & Health Monitoring Setup",
        text: "Install multi-region uptime monitors, application error trackers, and real-time developer notification channels.",
      },
      {
        name: "Automated Offsite Backup & Failover Config",
        text: "Configure encrypted daily database snapshots to secondary cloud regions with automated restoration testing.",
      },
      {
        name: "Continuous Stewardship & Monthly Reviews",
        text: "Execute regular dependency upgrades, performance tuning, and deliver itemized monthly stewardship reports.",
      },
    ],
    heroBadge: "SLA Guarantees • Proactive Monitoring",
    subheading: "Continuous uptime monitoring, security patching, database optimization, and guaranteed response SLAs to keep your digital systems operating at peak performance.",
    stats: [
      { value: "99.9%", label: "Uptime SLA", detail: "Round-the-clock automated uptime verification and instant alerting" },
      { value: "<2h", label: "Priority Response", detail: "Fast escalation path directly to senior software engineers" },
      { value: "Weekly", label: "Security Updates", detail: "Proactive dependency patching before vulnerabilities are exploited" },
      { value: "Daily", label: "Backups", detail: "Offsite encrypted database snapshots with tested recovery procedures" },
    ],
    philosophyTitle: "Software is Living Infrastructure: Protect Your Investment.",
    philosophyText: [
      "Launching a software product is only day one. Left unattended, dependencies decay, database tables fragment, SSL certificates expire, and security flaws emerge.",
      "MLHK Infotech's Support & Maintenance agreements provide dedicated technical stewardship. We monitor your servers, patch security vulnerabilities weekly, and provide a direct helpline for technical fixes.",
      "You focus on serving your customers while our engineering team ensures your digital systems stay fast, resilient, and bug-free.",
    ],
    pillarsTitle: "Support & Maintenance Pillars",
    pillarsSubtitle: "Everything needed for frictionless post-launch operation.",
    pillars: [
      { id: "uptime-monitoring", title: "Continuous Uptime & Error Telemetry", tagline: "We Know Before Your Customers Do", description: "Automated health checks ping your website and APIs every 60 seconds from multiple global nodes. Any outage immediately alerts our engineering team.", specs: ["60-second multi-region uptime checks", "Application error tracking and stack trace capture", "SSL expiration monitoring 30 days in advance", "Server disk space and RAM alerts"], badge: "Monitoring" },
      { id: "security-patches", title: "Proactive Security & Dependency Patching", tagline: "Keep Zero-Days Away", description: "Regular updates to operating system packages, Node.js/Next.js frameworks, database drivers, and third-party libraries.", specs: ["Weekly security vulnerability scans", "Staging environment testing before production rollout", "Automated rollback safety for every patch", "Database index optimization and vacuuming"], badge: "Patching" },
      { id: "feature-fixes", title: "Ongoing Bug Fixes & Micro-Features", tagline: "Your On-Call Engineering Desk", description: "Dedicated monthly developer hours for small UI tweaks, new banner updates, form modifications, and bug resolutions.", specs: ["Guaranteed response times under signed SLA", "Direct WhatsApp & email developer channel", "Itemized monthly timesheet and change logs", "Code review for all modifications"], badge: "Development" },
    ],
    deliverablesTitle: "Maintenance Deliverables",
    deliverablesSubtitle: "Transparent stewardship reporting every month.",
    deliverables: [
      { format: "Monthly PDF", title: "Stewardship & Incident Report", description: "Summary of uptime percentages, security patches applied, database backups verified, and tickets resolved.", badge: "Monthly Report" },
      { format: "Encrypted Cloud", title: "Verified Offsite Backups", description: "Daily encrypted database snapshots stored in secondary cloud regions for disaster recovery.", badge: "Backups" },
    ],
    comparisonTitle: "Abandoned Post-Launch Freelancers vs MLHK Dedicated SLA",
    comparisonSubtitle: "The difference between ghosted calls and dedicated technical support.",
    comparison: [
      { aspect: "Post-Launch Availability", genericApproach: "Freelancer disappears after final invoice. Emergency bugs go unanswered for weeks.", mlhkApproach: "Formal SLA with named senior engineer and direct escalation telephone and WhatsApp channel." },
      { aspect: "Proactive Maintenance", genericApproach: "Zero updates until the site crashes or is hacked by a known exploit.", mlhkApproach: "Weekly scheduled security audits, dependency upgrades, and database health maintenance." },
    ],
    timelineTitle: "Support Onboarding Workflow",
    timelineSubtitle: "Seamless transition into continuous maintenance.",
    timeline: [
      { phase: "Step 01", timeline: "Day 1", title: "System Audit & Credentials Handover", description: "Inventory of codebase, database, hosting accounts, and existing issues.", outputs: ["System Runbook"] },
      { phase: "Step 02", timeline: "Day 2", title: "Telemetry & Backup Setup", description: "Installing uptime probes, error monitoring tools, and automated backup jobs.", outputs: ["Active Telemetry"] },
      { phase: "Step 03", timeline: "Ongoing", title: "Continuous Stewardship & Monthly Reviews", description: "Scheduled patching, rapid response to tickets, and monthly performance reviews.", outputs: ["Monthly Reports"] },
    ],
    toolsTitle: "Maintenance & Monitoring Stack",
    tools: [
      { name: "Uptime Probes", category: "Telemetry", description: "Multi-region synthetic ping monitors verifying HTTP status and response latency." },
      { name: "Cloudflare Analytics", category: "Traffic", description: "Real-time edge performance and DDoS attack mitigations." },
      { name: "Git & CI/CD", category: "Deployment", description: "Version-controlled deployments with atomic rollbacks on any failure." },
    ],
    extendedFaqs: [
      { question: "Can MLHK Infotech maintain a website or app built by another developer?", answer: "Yes. We perform a preliminary code and infrastructure audit to inspect the codebase health and document dependencies before formalizing a support agreement." },
    ],
  },
};

