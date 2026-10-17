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
  tools: { name: string; category: string; description: string; url?: string }[];
  extendedFaqs: ServiceFaq[];
  knowsAbout?: string[];
};

export const EXTENDED_SERVICE_DATA: Record<string, ExtendedServiceData> = {
  "graphics-and-branding": {
    slug: "graphics-and-branding",
    theme: {
      accent: "#ff9f1c",
      accentLight: "#ffb84d",
      accentGlow: "255, 159, 28",
      bgGradient: "from-amber-500/15 via-transparent to-amber-500/5",
      borderHover: "hover:border-amber-500/40",
      badgeClass: "text-[#ffb84d] border-[#ff9f1c]/30 bg-[#ff9f1c]/10",
      tag: "Red Xerox Studio • Brand Systems & Tokens",
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
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q18534", // Graphic design
      "https://www.wikidata.org/wiki/Q167270", // Trademark
      "https://www.wikidata.org/wiki/Q821102", // Brand
      "https://www.wikidata.org/wiki/Q562725", // Adobe Illustrator
      "https://www.wikidata.org/wiki/Q105655383", // Figma
    ],
  },
  "web-development": {
    slug: "web-development",
    theme: {
      accent: "#ff9f1c",
      accentLight: "#ffb84d",
      accentGlow: "255, 159, 28",
      bgGradient: "from-amber-500/15 via-transparent to-amber-500/5",
      borderHover: "hover:border-amber-500/40",
      badgeClass: "text-[#ffb84d] border-[#ff9f1c]/30 bg-[#ff9f1c]/10",
      tag: "Full-Stack Web Engineering • Multi-Framework & Edge Runtimes",
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
    toolsTitle: "Supported Web Frameworks & Engineering Stack",
    tools: [
      { name: "Next.js 16 (App Router)", category: "Full-Stack React", description: "React Server Components, Turbopack, dynamic streaming, and ISR edge caching.", url: "https://nextjs.org" },
      { name: "React 19", category: "UI Architecture", description: "Concurrent rendering, server actions, hooks, and scalable component architecture.", url: "https://react.dev" },
      { name: "Vue.js & Nuxt 3", category: "Reactive Framework", description: "Progressive composition API, high-speed SSR, and clean enterprise reactivity.", url: "https://vuejs.org" },
      { name: "Svelte & SvelteKit", category: "Compiled UI", description: "Zero-virtual-DOM compiled UI with tiny JavaScript payloads and instantaneous hydration.", url: "https://svelte.dev" },
      { name: "Astro", category: "Island Architecture", description: "Content-driven sites with zero client-side JavaScript by default for 100/100 CWV.", url: "https://astro.build" },
      { name: "Angular", category: "Enterprise SPA", description: "Strict architectural patterns, signals, and enterprise-grade modular components.", url: "https://angular.dev" },
      { name: "Tailwind CSS v4", category: "Styling & Tokens", description: "Modern atomic CSS engine compiled without runtime overhead.", url: "https://tailwindcss.com" },
      { name: "TypeScript 5", category: "Type-Safe Rigor", description: "Compile-time validation eliminating runtime undefined and null errors.", url: "https://www.typescriptlang.org" },
      { name: "Node.js & Bun", category: "JavaScript Runtimes", description: "Event-driven asynchronous I/O and high-speed execution runtimes.", url: "https://nodejs.org" },
      { name: "Python (FastAPI & Django)", category: "API & Data Services", description: "High-performance REST & GraphQL APIs with native async support and AI integrations.", url: "https://fastapi.tiangolo.com" },
      { name: "Go (Golang)", category: "High-Concurrency", description: "Sub-millisecond execution times and compiled concurrency for financial microservices.", url: "https://go.dev" },
      { name: "PostgreSQL & SQLite", category: "Relational Storage", description: "ACID compliance, relational integrity, connection pooling, and edge replication.", url: "https://www.postgresql.org" },
      { name: "Drizzle ORM", category: "Type-Safe SQL", description: "Zero-overhead SQL schema and query builder without memory bloat or cold starts.", url: "https://orm.drizzle.team" },
      { name: "Cloudflare Workers", category: "Global Edge Network", description: "Serverless edge compute running across 330+ locations with sub-20ms global TTFB.", url: "https://workers.cloudflare.com" },
      { name: "Docker & Containers", category: "DevOps & Cloud", description: "Standardized containerization guaranteeing reproducible staging and production builds.", url: "https://www.docker.com" },
    ],
    extendedFaqs: [
      { question: "Can we edit our own website content after launch?", answer: "Yes. We equip your website with a bespoke, intuitive administrative CMS panel where you can update portfolio projects, publish blog articles, manage services, and view client leads without touching code." },
      { question: "What are the ongoing hosting costs for Cloudflare edge?", answer: "Extremely low. Cloudflare's serverless tier handles millions of requests at near-zero or minimal monthly cost, saving you hundreds of dollars compared to traditional AWS EC2 or dedicated server fees." },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q109315512", // Next.js
      "https://www.wikidata.org/wiki/Q25164871", // React
      "https://www.wikidata.org/wiki/Q978185", // TypeScript
      "https://www.wikidata.org/wiki/Q756100", // Node.js
      "https://www.wikidata.org/wiki/Q192490", // PostgreSQL
      "https://www.wikidata.org/wiki/Q19879782", // Cloudflare
    ],
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    theme: {
      accent: "#10b981",
      accentLight: "#34d399",
      accentGlow: "16, 185, 129",
      bgGradient: "from-emerald-500/15 via-transparent to-amber-500/5",
      borderHover: "hover:border-emerald-500/40",
      badgeClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      tag: "Native Mobile Systems • Android 15, Kotlin KMP & Swift",
    },
    seoKeywords: [
      "native android app development india",
      "kotlin multiplatform kmp developer",
      "offline first sqlite mobile app",
      "camerax barcode scanner app",
      "android 15 target sdk 35 16kb page size",
      "play store app publication agency madhya pradesh",
      "swift ios app development indore",
      "room database mobile engineering",
    ],
    aeoCapsules: [
      {
        query: "Why Choose Native Kotlin/Java Over Hybrid Cross-Platform Frameworks?",
        answer: "Native Android development communicates directly with hardware drivers via the Android Hardware Abstraction Layer (CameraX, Bluetooth, BiometricPrompt, GPU), executing at a continuous 60fps with less than 40MB RAM usage. Hybrid or WebView wrappers introduce memory bloat (240MB+), frame drops, and battery drain that frustrate commercial enterprise users.",
        keyTakeaway: "Native compilation delivers 60fps fluid rendering, sub-40MB RAM footprint, and direct HAL hardware access.",
      },
      {
        query: "What Is Android 15 Target SDK 35 & 16 KB Page Size Alignment?",
        answer: "Android 15 (API Level 35) introduces mandatory support for 16 KB memory page sizes (up from legacy 4 KB) to boost app launch speeds and power efficiency. Google Play mandates that all native shared libraries (.so files) must be 16 KB ELF-aligned using AGP 8.5+ and modern NDKs to prevent immediate crashes on new generation devices.",
        keyTakeaway: "16 KB page-aligned ELF binaries prevent crashes on Android 15 and optimize CPU memory paging.",
      },
      {
        query: "What Is Offline-First Room SQLite Architecture & Delta Replay?",
        answer: "Offline-first mobile architecture guarantees full application functionality in dead zones (warehouses, basements, flights). Mutations are committed locally to encrypted Room SQLite tables and queued. When connectivity is restored, an exponential-backoff WorkManager task replays delta payloads to cloud backends with conflict-free timestamps.",
        keyTakeaway: "Zero data loss and instant UI response times with automated background synchronization.",
      },
      {
        query: "How Does CameraX 1.4+ Hardware Integration Accelerate Barcode Scanning?",
        answer: "Google CameraX 1.4+ binds directly to camera hardware pipelines, routing raw image analysis frames into Google ML Kit on-device neural models. Barcodes, QR codes, and DataMatrix tags decode in under 12ms with zero cloud network roundtrips, even under low-contrast or warehouse lighting conditions.",
        keyTakeaway: "On-device ML Kit image stream analysis decodes barcodes in under 12ms with zero cloud latency.",
      },
      {
        query: "What Is the Google Play Store 2026 Production Approval Protocol?",
        answer: "MLHK Infotech prepares production-ready Android App Bundles (.AAB) with R8 bytecode shrinking, configures cryptographic Play App Signing, manages the mandatory 14-day 20-tester closed testing cohort, declares exact Data Safety disclosures, and verifies 100% compliance with Target SDK 35.",
        keyTakeaway: "End-to-end Play Store compliance from closed testing cohorts to zero-rejection production releases.",
      },
    ],
    howToSteps: [
      {
        name: "Ergonomic Prototyping & Architecture Mapping",
        text: "Design Material Design 3 and iOS Human Interface mobile wireframes, defining offline entity models, REST contracts, and navigation graphs.",
      },
      {
        name: "Native Core & Room SQLite Persistence",
        text: "Construct native Kotlin/Swift view models, configure Room SQLite persistence with automated migrations, and implement SQLCipher encryption.",
      },
      {
        name: "Hardware Sensor Integration & Worker Queues",
        text: "Implement CameraX 1.4+ optical scanning, BiometricPrompt hardware keystores, FusedLocation geofencing, and WorkManager sync workers.",
      },
      {
        name: "Automated Testing, 16KB Alignment & Store Release",
        text: "Run APK Analyzer for 16KB ELF alignment, conduct closed testing cohorts, configure Play App Signing, and deploy production builds.",
      },
    ],
    heroBadge: "Native Mobile • Android 15 & iOS Swift",
    subheading: "High-performance native Android and cross-platform Kotlin Multiplatform (KMP) applications engineered for offline resilience, 60 FPS fluidity, and deep hardware sensor integration.",
    stats: [
      { value: "60 FPS", label: "Fluid Renders", detail: "Direct GPU hardware acceleration with zero frame drops" },
      { value: "<40 MB", label: "RAM Footprint", detail: "Lean native memory versus 240MB+ bloated webviews" },
      { value: "16 KB", label: "Android 15 Ready", detail: "16KB memory page size ELF aligned native shared libraries" },
      { value: "100%", label: "Offline Engine", detail: "Local Room SQLite database with automatic background sync" },
    ],
    philosophyTitle: "Native Performance for the Real World.",
    philosophyText: [
      "Hybrid mobile apps wrapped in web views frequently stutter on mid-range Indian Android smartphones, fail when network signals drop in transit, and drain user battery life.",
      "MLHK Infotech engineers native Android applications built on robust Kotlin/Java and modern Jetpack libraries, alongside iOS Swift and Kotlin Multiplatform (KMP) shared business logic. We design for the realities of Indian users: intermittent connectivity, diverse screen sizes, and battery optimization.",
      "Every mobile app connects to secure, token-authenticated REST backends and ships with an integrated admin management dashboard.",
    ],
    pillarsTitle: "Mobile Architecture & Engineering Pillars",
    pillarsSubtitle: "Industrial reliability, hardware acceleration, and seamless app store compliance.",
    pillars: [
      {
        id: "native-core",
        title: "Native Kotlin, Java & Swift Architecture",
        tagline: "True Hardware Performance",
        description: "Clean MVVM and MVI architectures ensuring high frame rates, responsive touch feedback, and optimal memory management.",
        specs: ["Jetpack Lifecycle, ViewModel & Compose", "Retrofit2 & Ktor HTTP networking with interceptors", "Room SQLite local persistence with Coroutines Flow", "Target Android 15 SDK 35 & 16KB page size compliance"],
        badge: "Native Core",
      },
      {
        id: "offline-sync",
        title: "Offline-First Synchronization & SQLite",
        tagline: "Works Without Signal",
        description: "Field staff and users can create records, capture signatures, and view data offline. Data automatically syncs when connectivity restores.",
        specs: ["WorkManager scheduled background jobs with exponential backoff", "Conflict-free timestamp resolution state machines", "Local SQLCipher 256-bit AES encrypted SQLite storage", "Delta sync minimizing cellular bandwidth usage"],
        badge: "Offline Sync",
      },
      {
        id: "hardware-integration",
        title: "Device Hardware & Sensor HAL Integration",
        tagline: "Cameras, GPS, Printers & Biometrics",
        description: "Seamless control of device hardware for barcode scanning, GPS geofencing, Bluetooth thermal printing, and biometric authentication.",
        specs: ["CameraX 1.4+ barcode & QR scanning with Google ML Kit", "FusedLocationProvider geofence tracking with Doze mode optimization", "BiometricPrompt fingerprint & FaceID backed by Android KeyStore", "Push notifications via Firebase Cloud Messaging (FCM)"],
        badge: "Hardware HAL",
      },
      {
        id: "kmp-admin",
        title: "Kotlin Multiplatform (KMP) & Admin Fleet Console",
        tagline: "Single Core Logic • Dual Native UIs",
        description: "Share 70% of business logic across Android and iOS while retaining 100% native UI performance, managed by a central web admin panel.",
        specs: ["Shared Kotlin Multiplatform data & domain modules", "Native Jetpack Compose (Android) & SwiftUI (iOS)", "Web-based fleet and field agent management portal", "Real-time push notification dispatcher and live audit logs"],
        badge: "KMP & Fleet",
      },
    ],
    deliverablesTitle: "Mobile Deliverables & Production Assets",
    deliverablesSubtitle: "Everything needed for enterprise rollout, fleet deployment, and Google Play & Apple App Store publication.",
    deliverables: [
      { format: ".AAB / .IPA", title: "Production App Bundles", description: "Signed Android App Bundles (AAB) with R8 obfuscation and 16KB alignment, plus signed iOS IPA packages.", badge: "App Binaries" },
      { format: "Git Repository", title: "Clean Native Source Code", description: "Modular native Android Studio and Xcode projects with Gradle KTS, Swift packages, and CI/CD scripts.", badge: "Source Code" },
      { format: "Edge REST API", title: "Backend API & Database", description: "Production API endpoints handling authentication, data storage, delta synchronization, and push notifications.", badge: "Backend API" },
      { format: "Store Packages", title: "Store Submission Package", description: "App icon suite, feature graphics, screenshot showcases, Apple Privacy Manifests, and privacy policies.", badge: "Store Compliance" },
    ],
    comparisonTitle: "Generic Web-Wrapped Hybrid Apps vs MLHK Native Mobile Engineering",
    comparisonSubtitle: "Why native engineering wins in enterprise reliability, battery life, and user retention.",
    comparison: [
      { aspect: "Performance & FPS", genericApproach: "Sluggish webview scrolling, noticeable frame drops on budget smartphones.", mlhkApproach: "Silky 60fps native UI widgets with direct GPU hardware acceleration." },
      { aspect: "Offline Capability", genericApproach: "Shows white error screen or broken image placeholders when offline.", mlhkApproach: "Local Room SQLite database allows full operation and queues changes for sync." },
      { aspect: "Battery & Memory", genericApproach: "Heavy Chromium runtime drains phone battery and consumes 240MB+ RAM.", mlhkApproach: "Lean native memory footprint (<40MB) with efficient background WorkManager scheduling." },
      { aspect: "Hardware Sensor Access", genericApproach: "Laggy bridge plugins that break across Android version updates.", mlhkApproach: "Direct Android HAL and CameraX 1.4+ integration with sub-12ms optical decoding." },
      { aspect: "OS Version Longevity", genericApproach: "Often crashes or fails security audits on new Android/iOS updates.", mlhkApproach: "Target SDK 35 compliance, 16KB ELF alignment, and strict Apple Privacy Manifest declarations." },
      { aspect: "Security & Encryption", genericApproach: "Plaintext localStorage or vulnerable browser cookies stored on disk.", mlhkApproach: "Hardware-backed Android KeyStore / Secure Enclave with SQLCipher 256-bit encryption." },
    ],
    timelineTitle: "Mobile App Development Stages",
    timelineSubtitle: "Agile sprints from prototype to Google Play Store & Apple App Store publication.",
    timeline: [
      { phase: "Stage 01", timeline: "Sprint 1", title: "UX Wireframes & API Contracts", description: "Clickable mobile prototypes in Material 3 and defined OpenAPI REST contracts.", outputs: ["Figma Mobile UI", "OpenAPI Spec", "Data Flow Diagram"] },
      { phase: "Stage 02", timeline: "Sprint 2–3", title: "Native UI & Local Database Engine", description: "Building Android activities, Compose widgets, and offline Room SQLite database.", outputs: ["Alpha Test APK", "Room Migration Suite"] },
      { phase: "Stage 03", timeline: "Sprint 4", title: "Sensor HAL Wiring & Push Notifications", description: "Connecting CameraX scanning, BiometricPrompt, FCM push, and background delta sync.", outputs: ["Beta Build on Firebase App Distribution"] },
      { phase: "Stage 04", timeline: "Sprint 5", title: "14-Day Testing, Store Submission & Go-Live", description: "Managing 20-tester closed testing, Target SDK 35 compliance review, and store go-live.", outputs: ["Live Google Play Store Listing", "Live App Store Listing", "Admin Console"] },
    ],
    toolsTitle: "Mobile Engineering Stack & Verified Frameworks",
    tools: [
      { name: "Android Jetpack", category: "Core Framework", description: "Modern Android architecture components including Lifecycle, ViewModel, Navigation, and Compose.", url: "https://developer.android.com/jetpack" },
      { name: "Kotlin & KMP", category: "Core Language", description: "Concise, type-safe multiplatform language for sharing business logic across Android, iOS, and backends.", url: "https://kotlinlang.org" },
      { name: "Swift & SwiftUI", category: "iOS Architecture", description: "Declarative UI and high-performance native compiled runtime for iOS, iPadOS, and watchOS.", url: "https://developer.apple.com/xcode/swiftui/" },
      { name: "Room Database", category: "Local Persistence", description: "Abstraction layer over SQLite providing compile-time SQL verification and Coroutine Flow streaming.", url: "https://developer.android.com/training/data-storage/room" },
      { name: "CameraX 1.4+", category: "Camera & Vision", description: "Consistent camera API binding with ML Kit for hardware-accelerated barcode and document scanning.", url: "https://developer.android.com/training/camerax" },
      { name: "WorkManager", category: "Background Jobs", description: "Battery-conscious background processing with automatic constraints, retries, and Doze mode handling.", url: "https://developer.android.com/topic/libraries/architecture/workmanager" },
      { name: "Android Studio", category: "Official IDE", description: "Google's integrated development environment with native profilers, memory leak detectors, and emulators.", url: "https://developer.android.com/studio" },
      { name: "Apple Xcode", category: "iOS Toolchain", description: "Apple's native IDE for Swift compilation, asset catalogs, and App Store submission workflows.", url: "https://developer.apple.com/xcode/" },
      { name: "Firebase Cloud Messaging", category: "Push & Telemetry", description: "Low-latency cross-platform push notifications, crash analytics, and remote feature configuration.", url: "https://firebase.google.com/docs/cloud-messaging" },
      { name: "Flutter", category: "Cross-Platform", description: "Google's UI toolkit for compiling natively from a single Dart codebase for multi-screen targets.", url: "https://flutter.dev" },
      { name: "React Native", category: "Cross-Platform", description: "Meta's framework compiling React code into native mobile interface primitives.", url: "https://reactnative.dev" },
      { name: "SQLCipher", category: "Mobile Encryption", description: "Full database 256-bit AES encryption for SQLite databases protecting on-device client records.", url: "https://www.zetetic.net/sqlcipher/" },
      { name: "Ktor Client", category: "Networking", description: "Multiplatform asynchronous HTTP client for Kotlin applications with serialization plugins.", url: "https://ktor.io" },
      { name: "Google Play Console", category: "Distribution", description: "Official store management for AAB distribution, 14-day tester cohorts, and release analytics.", url: "https://play.google.com/console/about/" },
    ],
    extendedFaqs: [
      { question: "Will the app work on older Android phones in rural or Tier-3 areas?", answer: "Yes. We configure our minimum SDK to support Android 8.0+ (API 26) and above, ensuring over 98% device coverage across India while compiling with Target SDK 35 and 16KB page alignment for the latest devices." },
      { question: "How does the app handle data synchronization when there is no internet?", answer: "Every user interaction (inspections, orders, signatures) is committed instantly to a local encrypted Room SQLite database. Android's WorkManager monitors network status in the background and silently transmits queued delta batches once an active connection is detected." },
      { question: "Do you assist with Google Play Store account setup, 14-day tester cohorts, and publishing?", answer: "Yes. For new Google Play Developer accounts, Google mandates a 14-day closed testing cohort with 20 opted-in testers. MLHK Infotech manages this entire protocol, validates privacy policy declarations, and submits the release bundle until approved." },
      { question: "Can we share code between Android and iOS without sacrificing native speed?", answer: "Yes, using Kotlin Multiplatform (KMP). We write the data models, API networking, and business rules once in Kotlin, while building 100% native UI in Jetpack Compose for Android and SwiftUI for iOS. This avoids clumsy WebView wrappers and keeps frame rates locked at 60 FPS." },
      { question: "Are local records encrypted against phone theft or root access?", answer: "Yes. We integrate SQLCipher 256-bit AES encryption for the local SQLite database and store master decryption keys inside the hardware-backed Android KeyStore or Apple Secure Enclave." },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q94", // Android
      "https://www.wikidata.org/wiki/Q3816548", // Kotlin
      "https://www.wikidata.org/wiki/Q251", // Java
      "https://www.wikidata.org/wiki/Q16930412", // Swift
      "https://www.wikidata.org/wiki/Q48493", // iOS
      "https://www.wikidata.org/wiki/Q380775", // SQLite
      "https://www.wikidata.org/wiki/Q63842603", // Flutter
      "https://www.wikidata.org/wiki/Q23019842", // React Native
      "https://www.wikidata.org/wiki/Q18356037", // Firebase
      "https://www.wikidata.org/wiki/Q79564", // Google Play
    ],
  },
  "digital-marketing": {
    slug: "digital-marketing",
    theme: {
      accent: "#8b5cf6",
      accentLight: "#c084fc",
      accentGlow: "139, 92, 246",
      bgGradient: "from-purple-600/15 via-transparent to-pink-500/5",
      borderHover: "hover:border-purple-500/40",
      badgeClass: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      tag: "AEO • GEO • Knowledge Graph Growth",
    },
    seoKeywords: [
      "generative engine optimization geo agency india",
      "aeo answer engine ranking services",
      "ai search citation optimization",
      "technical seo company indore",
      "schema knowledge graph builder",
      "llms txt implementation services",
      "zero ad waste marketing agency",
      "google ai overview optimization",
      "enterprise search authority madhya pradesh",
      "entity triangulation seo specialist",
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
      {
        id: "technical-aeo",
        title: "Answer Engine & Knowledge Graph Engineering",
        tagline: "Be the Source AI Cites",
        description:
          "We author structured Schema.org triplets, llms.txt citation files, and entity triangulation so AI search assistants recommend your business.",
        specs: [
          "Nested Organization, Service, and Person JSON-LD",
          "llms.txt and llms-full.txt machine-readable documentation",
          "Entity disambiguation with sameAs directory citations",
          "Factual question-and-answer architecture",
        ],
        badge: "AEO & GEO",
      },
      {
        id: "core-web-vitals",
        title: "Technical Core Web Vitals & On-Page SEO",
        tagline: "Google Algorithm Compliance",
        description:
          "Eliminating crawl errors, accelerating page load speeds, and organizing semantic HTML heading hierarchies for maximum organic ranking.",
        specs: [
          "Sub-0.5s Largest Contentful Paint (LCP)",
          "Zero Cumulative Layout Shift (CLS)",
          "Dynamic XML sitemaps with daily automated pinging",
          "Optimized OpenGraph and Twitter card social snippets",
        ],
        badge: "Technical SEO",
      },
      {
        id: "funnel-conversion",
        title: "High-Intent Landing Pages & Conversion Rate Optimization",
        tagline: "Turning Clicks into Cashflow",
        description:
          "Traffic is worthless if visitors bounce. We craft dark-luxury, trust-first landing pages with clear value propositions and frictionless WhatsApp/form CTAs.",
        specs: [
          "Direct-response copy written around buyer pain points",
          "Frictionless 3-field inquiry forms and one-tap WhatsApp chat",
          "A/B testing of headlines, CTAs, and layout hierarchies",
          "Heatmap tracking and drop-off analysis",
        ],
        badge: "Conversion CRO",
      },
      {
        id: "zero-ad-waste",
        title: "Zero-Ad-Waste Paid Search & Meta Ads Architecture",
        tagline: "Eliminating Bot Clicks & Irrelevant Queries",
        description:
          "Targeted paid search and social campaigns engineered with exhaustive negative keyword lists and server-side Conversions API (CAPI) tracking.",
        specs: [
          "Granular negative keyword lists blocking job seekers and DIY queries",
          "Meta Conversions API (CAPI) & Google Server-Side Tagging",
          "High-intent long-tail search keyword bidding matrices",
          "Continuous A/B testing of ad creatives and value proposition copy",
        ],
        badge: "Paid Search",
      },
    ],
    deliverablesTitle: "Marketing Deliverables & Analytics",
    deliverablesSubtitle: "Clear, transparent reporting with zero obfuscation.",
    deliverables: [
      {
        format: "Monthly PDF",
        title: "Executive Performance Dossier",
        description: "Clear monthly report detailing organic impressions, ranking keywords, inquiries generated, and acquisition cost.",
        badge: "Reporting",
      },
      {
        format: "JSON-LD",
        title: "Full Structured Data Architecture",
        description: "Custom schema markup validated against Google's Rich Results and Schema.org validators.",
        badge: "Schema",
      },
      {
        format: "llms.txt",
        title: "AI Assistant Documentation Endpoints",
        description: "Public markdown feeds formatted specifically for LLM web crawlers (Perplexity, GPT, Gemini).",
        badge: "AI Feeds",
      },
      {
        format: "Meta CAPI",
        title: "Server-Side Conversion Tracking",
        description: "Direct server-to-server event telemetry bypassing browser ad-blockers and iOS privacy restrictions.",
        badge: "Tracking",
      },
    ],
    comparisonTitle: "Old-School SEO Agencies vs MLHK Modern AEO/GEO",
    comparisonSubtitle: "Why traditional keyword stuffing fails in 2026.",
    comparison: [
      {
        aspect: "AI Search Readiness",
        genericApproach: "Ignores ChatGPT, Perplexity, and Google AI Overviews. Only tracks 10 blue links.",
        mlhkApproach: "Full Answer Engine Optimization (AEO) and llms.txt feeds to secure AI citations.",
      },
      {
        aspect: "Reporting Metrics",
        genericApproach: "Sends 50-page reports filled with meaningless vanity impressions and click charts.",
        mlhkApproach: "Direct reporting on verified commercial inquiries, phone calls, and cost per lead.",
      },
      {
        aspect: "Ad Spend Efficiency",
        genericApproach: "Runs broad-match campaigns that waste 40–50% of your budget on bot clicks and job hunters.",
        mlhkApproach: "Strict negative-keyword gating and Server-Side CAPI tracking ensuring 0% ad waste.",
      },
      {
        aspect: "Page Speed & CWV",
        genericApproach: "Slow, plugin-heavy WordPress sites taking 4 to 8 seconds with broken mobile UX.",
        mlhkApproach: "Sub-0.5s LCP on Cloudflare edge network with 100/100 Core Web Vitals compliance.",
      },
    ],
    timelineTitle: "Visibility Growth Stages",
    timelineSubtitle: "Strategic timeline for compounding organic search traffic.",
    timeline: [
      {
        phase: "Month 01",
        timeline: "Weeks 1–4",
        title: "Technical Foundation & Entity Triangulation",
        description: "Full website audit, schema JSON-LD implementation, and llms.txt integration.",
        outputs: ["Audit Scorecard", "Structured Data Mesh"],
      },
      {
        phase: "Month 02",
        timeline: "Weeks 5–8",
        title: "Authority Content & Landing Page CRO",
        description: "Authoring comprehensive, high-value technical service dossiers and optimizing inquiry funnels.",
        outputs: ["Optimized Landing Pages", "Syntactic AEO Capsules"],
      },
      {
        phase: "Month 03",
        timeline: "Weeks 9–12",
        title: "Zero-Ad-Waste Paid Inbound Campaign Launch",
        description: "Deploying negative-keyword gated Google Search and Meta campaigns with Server-Side CAPI tracking.",
        outputs: ["CAPI Integration", "High-Intent Ad Campaigns"],
      },
      {
        phase: "Month 04+",
        timeline: "Ongoing",
        title: "Authority Expansion & AI Citation Monitoring",
        description: "Monitoring Knowledge Graph presence, refining queries, and monthly performance reviews.",
        outputs: ["Monthly Performance Dossier", "AI Citation Tracking"],
      },
    ],
    toolsTitle: "Marketing, AEO & Analytics Stack",
    tools: [
      {
        name: "Google Search Console",
        category: "Search Diagnostics",
        description: "Direct index coverage, crawl monitoring, and organic query impressions directly from Google.",
        url: "https://search.google.com/search-console",
      },
      {
        name: "Schema.org Validator",
        category: "Structured Data",
        description: "Official validator for validating JSON-LD entities, triplets, and rich snippets conformance.",
        url: "https://validator.schema.org/",
      },
      {
        name: "Google Rich Results Test",
        category: "Rich Snippets",
        description: "Official Google testing tool for verifying Organization, FAQ, and HowTo schema eligibility.",
        url: "https://search.google.com/test/rich-results",
      },
      {
        name: "Perplexity AI",
        category: "AI Answer Engine",
        description: "Leading conversational search engine used to audit domain citation frequency and source indexing.",
        url: "https://www.perplexity.ai/",
      },
      {
        name: "OpenAI SearchGPT",
        category: "Generative Search",
        description: "Real-time AI search platform parsing structured web pages for direct consumer answers.",
        url: "https://chatgpt.com/",
      },
      {
        name: "Google Gemini Advanced",
        category: "Multimodal AI",
        description: "Google's premier LLM powering AI Overviews and grounding responses in verified web facts.",
        url: "https://gemini.google.com/",
      },
      {
        name: "Cloudflare Web Analytics",
        category: "Edge Analytics",
        description: "Privacy-first, cookie-less edge traffic telemetry tracking real human visitors without slowing pages.",
        url: "https://www.cloudflare.com/web-analytics/",
      },
      {
        name: "PageSpeed Insights & CrUX",
        category: "Core Web Vitals",
        description: "Real-world Chrome User Experience (CrUX) data measuring LCP, INP, and CLS scores.",
        url: "https://pagespeed.web.dev/",
      },
      {
        name: "Meta Conversions API (CAPI)",
        category: "Server Telemetry",
        description: "Direct server-to-server event tracking preventing attribution loss caused by ad-blockers and iOS privacy.",
        url: "https://developers.facebook.com/docs/marketing-api/conversions-api/",
      },
      {
        name: "Screaming Frog SEO Spider",
        category: "Technical Crawler",
        description: "Industry-standard desktop crawler for diagnosing crawl depth, status codes, and canonical errors.",
        url: "https://www.screamingfrog.co.uk/seo-spider/",
      },
      {
        name: "Ahrefs Webmaster Tools",
        category: "Backlink Telemetry",
        description: "Comprehensive backlink monitoring, domain rating audits, and keyword position tracking.",
        url: "https://ahrefs.com/webmaster-tools",
      },
      {
        name: "Wikidata Query Service",
        category: "Knowledge Graph",
        description: "SPARQL-driven knowledge graph registry for grounding corporate entities and disambiguating brands.",
        url: "https://query.wikidata.org/",
      },
    ],
    extendedFaqs: [
      {
        question: "How does Generative Engine Optimization (GEO) differ from traditional SEO in 2026?",
        answer:
          "Traditional SEO focuses on keyword density, backlink quantity, and ranking among the 10 blue links. Generative Engine Optimization (GEO) structures content syntax, semantic facts, and linked Schema.org knowledge graph triplets so AI answer engines (ChatGPT, Google Gemini, Perplexity) parse, verify, and cite your brand as the primary source in conversational answers.",
      },
      {
        question: "Why is Schema.org entity triangulation with Indian MSME and GSTIN registries so effective?",
        answer:
          "Search engines and AI models prioritize verifiable statutory facts over unverifiable marketing claims. By linking your official MSME Udyam registration (UDYAM-MP-44-0005223), GSTIN (23CHLPV2868R1CJ), and Wikidata Q-IDs inside JSON-LD schemas, search algorithms establish 100% factual certainty regarding your corporate identity and regional jurisdiction.",
      },
      {
        question: "What are /llms.txt and /llms-full.txt and why do they increase AI citation rates?",
        answer:
          "/llms.txt is an emerging machine-readable documentation standard that provides lightweight markdown summaries of your business, services, and technical capabilities specifically formatted for LLM crawlers. By providing a clean text endpoint free of client-side scripts, AI models like Perplexity and GPTBot can ingest and cite your offerings in milliseconds.",
      },
      {
        question: "How does MLHK Infotech eliminate up to 50% wasted advertising spend (ad waste)?",
        answer:
          "Most generic campaigns waste thousands on accidental clicks, job hunters, and irrelevant search terms. We implement exhaustive negative keyword gating (blocking queries like 'jobs', 'free', 'internship', 'tutorial'), set up server-side Meta Conversions API (CAPI), and bid exclusively on high-intent commercial keywords tied directly to qualified inquiries.",
      },
      {
        question: "How do sub-0.5s Core Web Vitals and Cloudflare edge caching influence search ranking and AI scrapers?",
        answer:
          "Search engine crawlers and AI bots operate under strict crawl budgets and timeout windows. When a website loads in under 0.5s via Next.js ISR on Cloudflare's 330+ city edge network, crawlers index 5x more pages per visit with zero timeout errors. Google explicitly incorporates Core Web Vitals (LCP < 2.5s, INP < 200ms) into its page experience ranking signals.",
      },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q180711", // Search engine optimization
      "https://www.wikidata.org/wiki/Q52271", // Knowledge Graph
      "https://www.wikidata.org/wiki/Q95", // Google Search
      "https://www.wikidata.org/wiki/Q115788460", // ChatGPT
      "https://www.wikidata.org/wiki/Q117768228", // Perplexity AI
      "https://www.wikidata.org/wiki/Q116960481", // Large language model
      "https://www.wikidata.org/wiki/Q105952", // JSON-LD
      "https://www.wikidata.org/wiki/Q328", // Wikidata
      "https://www.wikidata.org/wiki/Q167270", // Trademark
      "https://www.wikidata.org/wiki/Q160565", // Ministry of Micro, Small and Medium Enterprises
    ],
  },
  "enterprise-systems": {
    slug: "enterprise-systems",
    theme: {
      accent: "#3b82f6",
      accentLight: "#60a5fa",
      accentGlow: "59, 130, 246",
      bgGradient: "from-blue-600/15 via-transparent to-indigo-500/5",
      borderHover: "hover:border-blue-500/40",
      badgeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      tag: "Custom ERP/CRM & Indian GST Billing",
    },
    seoKeywords: [
      "custom erp development company india",
      "gst billing software developer madhya pradesh",
      "multi tenant crm software",
      "inventory management software indore",
      "enterprise business automation",
      "postgresql acid inventory software",
      "sovereign crm zero per seat licensing",
      "b2b gst invoice generator software",
      "multi branch warehouse erp shajapur",
      "role based access control enterprise software",
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
      {
        id: "crm-pipeline",
        title: "CRM & Opportunity Pipeline Manager",
        tagline: "Never Let a Lead Go Cold",
        description:
          "Track prospects from initial WhatsApp inquiry through technical consultation, quotation, and contract closure with automated follow-up reminders.",
        specs: [
          "Visual Kanban stage pipeline",
          "WhatsApp & email follow-up triggers",
          "Lead qualification scoring",
          "Sales representative activity logs",
        ],
        badge: "CRM Core",
      },
      {
        id: "erp-billing",
        title: "Automated GST Invoicing & Expense Ledger",
        tagline: "Tax-Compliant Invoicing",
        description:
          "Generate compliant GST tax invoices in seconds with automated CGST/SGST/IGST calculation, HSN/SAC lookups, and one-click PDF downloads.",
        specs: [
          "Automated 15-digit GSTIN tax breakdown",
          "Sequential invoice numbering and credit note handling",
          "Accounts receivable tracking and overdue alerts",
          "Direct payment link and UPI QR integration",
        ],
        badge: "Billing & Finance",
      },
      {
        id: "role-rbac",
        title: "Role-Based Access Control (RBAC) & Audit Logs",
        tagline: "Granular Enterprise Security",
        description:
          "Ensure employees only access what their clearance permits. Administrators maintain full oversight while junior staff access restricted operational views.",
        specs: [
          "Granular role assignments (Admin, Manager, Accountant, Staff)",
          "Tamper-resistant audit trails with timestamps and user IDs",
          "Two-factor authentication (2FA) support",
          "Automated daily encrypted database snapshots",
        ],
        badge: "Security & RBAC",
      },
      {
        id: "acid-postgres",
        title: "PostgreSQL ACID Concurrency & Row-Locking",
        tagline: "Zero Race Conditions Across Branches",
        description:
          "Database-level serializable isolation and row-level locks prevent inventory overselling and accounting mismatches during simultaneous peak checkout.",
        specs: [
          "SELECT ... FOR UPDATE row-level concurrency locking",
          "Read-replica distribution for heavy financial reporting",
          "ACID compliance preventing partial or corrupted transactions",
          "Automated point-in-time recovery (PITR) snapshots",
        ],
        badge: "Data Rigor",
      },
    ],
    deliverablesTitle: "Enterprise Deliverables",
    deliverablesSubtitle: "A complete turnkey operational ecosystem.",
    deliverables: [
      {
        format: "Web Application",
        title: "Custom ERP/CRM Platform",
        description: "Deployed web application accessible securely from desktop, laptop, and tablet browsers with full TypeScript source code.",
        badge: "Software",
      },
      {
        format: "Database",
        title: "Encrypted Database Engine",
        description: "Dedicated PostgreSQL / SQLite database with scheduled automated backups and row-level security.",
        badge: "Database",
      },
      {
        format: "PDF Generator",
        title: "Automated GST Tax Invoicing Engine",
        description: "Vector PDF generator creating compliant Indian B2B tax invoices with dynamic HSN/SAC breakdowns and UPI QR codes.",
        badge: "Billing Engine",
      },
      {
        format: "PDF & Video",
        title: "Staff Training Dossiers",
        description: "Step-by-step video walkthroughs and written operating manuals for your internal staff and accountants.",
        badge: "Training",
      },
    ],
    comparisonTitle: "Off-The-Shelf SaaS (Salesforce/Zoho) vs MLHK Sovereign ERP",
    comparisonSubtitle: "Why owning your software delivers exponential ROI.",
    comparison: [
      {
        aspect: "Recurring Licensing",
        genericApproach: "₹3,000 to ₹10,000 per user per month. Costs explode into lakhs every year as your workforce grows.",
        mlhkApproach: "Zero per-seat recurring fees. Unlimited internal users on your private infrastructure.",
      },
      {
        aspect: "Workflow Flexibility",
        genericApproach: "You must adapt your real-world business to their rigid, confusing menus and restricted fields.",
        mlhkApproach: "100% custom-built to match your exact company forms, approval chains, and nomenclature.",
      },
      {
        aspect: "Data Sovereignty",
        genericApproach: "Your sensitive financial and client records sit on shared multi-tenant third-party servers.",
        mlhkApproach: "Complete data ownership. Host on your private servers or secure dedicated cloud with zero third-party snooping.",
      },
      {
        aspect: "Indian GST & Tax Compliance",
        genericApproach: "Clunky third-party add-ons that break frequently during GST portal updates.",
        mlhkApproach: "Native statutory calculations (CGST/SGST/IGST), checksum GSTIN validation, and instant E-way bill JSON payloads.",
      },
    ],
    timelineTitle: "ERP Deployment Roadmap",
    timelineSubtitle: "Phased rollout to guarantee zero disruption to daily business.",
    timeline: [
      {
        phase: "Phase 01",
        timeline: "Weeks 1–2",
        title: "Workflow Audit & Data Modeling",
        description: "Interviews with leadership and department heads to document existing spreadsheets and processes.",
        outputs: ["System Blueprint", "Database Architecture ERD"],
      },
      {
        phase: "Phase 02",
        timeline: "Weeks 3–5",
        title: "Core CRM & Database Build",
        description: "Developing user authentication, client directory, and opportunity pipeline with role-based access control.",
        outputs: ["CRM Staging Environment", "RBAC Policy Suite"],
      },
      {
        phase: "Phase 03",
        timeline: "Weeks 6–8",
        title: "GST Invoicing & Ledger Modules",
        description: "Integrating financial calculations, tax invoices, inventory deductions, and reporting dashboards.",
        outputs: ["Billing Engine Complete", "Vector PDF Generator"],
      },
      {
        phase: "Phase 04",
        timeline: "Weeks 9–10",
        title: "Data Migration & Staff Handover",
        description: "Migrating existing spreadsheet records, conducting staff training, and executing production cutover.",
        outputs: ["Production Go-Live", "Tally/Excel Data Migration"],
      },
    ],
    toolsTitle: "Enterprise Engineering Stack",
    tools: [
      {
        name: "PostgreSQL 16",
        category: "Relational Database",
        description: "ACID-compliant relational database engine with advanced row-level security and JSONB indexing.",
        url: "https://www.postgresql.org/",
      },
      {
        name: "Drizzle ORM",
        category: "Type-Safe ORM",
        description: "High-performance TypeScript ORM providing compile-time SQL verification and zero runtime overhead.",
        url: "https://orm.drizzle.team/",
      },
      {
        name: "Next.js 16 (App Router)",
        category: "Full-Stack Frontend",
        description: "Ultra-responsive desktop UI with instant page transitions, server actions, and keyboard navigation.",
        url: "https://nextjs.org/",
      },
      {
        name: "TypeScript 5+",
        category: "Core Language",
        description: "End-to-end static typing eliminating runtime regressions across financial ledgers and billing calculations.",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "Better-Auth",
        category: "Enterprise Security",
        description: "Hardened session engine with HTTP-only cookies, multi-factor authentication, and RBAC middleware.",
        url: "https://www.better-auth.com/",
      },
      {
        name: "PDFKit & Puppeteer",
        category: "Document Generation",
        description: "Pixel-perfect vector GST tax invoice, delivery challan, and quotation PDF generation engine.",
        url: "https://pdfkit.org/",
      },
      {
        name: "Zod Schema Validation",
        category: "Data Integrity",
        description: "Strict runtime input validation for GSTIN checksums, HSN/SAC codes, and numerical ledger values.",
        url: "https://zod.dev/",
      },
      {
        name: "Tailwind CSS v4",
        category: "Design System",
        description: "Custom dark luxury corporate interface tokens optimized for dense desktop data grids.",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Redis Cache",
        category: "In-Memory Caching",
        description: "High-speed key-value cache accelerating dashboard aggregations and user session lookups.",
        url: "https://redis.io/",
      },
      {
        name: "Docker Containers",
        category: "Infrastructure",
        description: "Containerized deployment ensuring identical execution across local dev and production private servers.",
        url: "https://www.docker.com/",
      },
      {
        name: "GST e-Invoice Portal",
        category: "Statutory Systems",
        description: "Official National Informatics Centre (NIC) portal for B2B e-invoice generation and IRN registration.",
        url: "https://einvoice1.gst.gov.in/",
      },
      {
        name: "NIC E-Way Bill System",
        category: "Statutory Systems",
        description: "Government of India electronic way bill portal for tracking inter-state and intra-state goods transit.",
        url: "https://ewaybillgst.gov.in/",
      },
    ],
    extendedFaqs: [
      {
        question: "Can you migrate our legacy data from Excel spreadsheets and Tally?",
        answer:
          "Yes. During Phase 4, our systems engineers clean, normalize, and import your existing client databases, inventory catalogs, and historical invoices from Microsoft Excel, CSV files, or Tally XML exports directly into your new PostgreSQL database with zero loss of operational history.",
      },
      {
        question: "How does the custom ERP handle multi-branch inventory across different cities without stock conflict?",
        answer:
          "We implement PostgreSQL serializable transactions with database-level row locking (SELECT ... FOR UPDATE). When branch operators in Indore, Bhopal, and Shajapur sell items simultaneously, stock deductions execute atomically in sequence. If inventory reaches zero, subsequent transactions abort with an instant out-of-stock notification, preventing overselling.",
      },
      {
        question: "How does MLHK Infotech ensure 100% Indian GST compliance (CGST, SGST, IGST, E-way bill)?",
        answer:
          "Our software automatically evaluates the supplier GSTIN (23 for Madhya Pradesh) and the buyer GSTIN prefix to calculate CGST (9%) + SGST (9%) for intra-state supply, or IGST (18%) for inter-state transactions. We validate 15-character GSTIN checksums, assign mandatory 6-digit SAC codes, generate UPI B2B payment QR codes, and format JSON payloads ready for government E-way bill generation.",
      },
      {
        question: "How much money does a company actually save by eliminating per-seat SaaS licensing?",
        answer:
          "A mid-sized company with 50 operational employees paying ₹4,000/user/month for foreign SaaS tools spends ₹24,00,000 every single year in licensing fees alone. A sovereign custom ERP built by MLHK Infotech requires a one-time engineering investment and minimal cloud hosting costs (₹2,000–₹5,000/month), resulting in multi-lakh cumulative savings within year two.",
      },
      {
        question: "What security safeguards protect financial ledgers from internal employee tampering?",
        answer:
          "We enforce Role-Based Access Control (RBAC) paired with immutable database audit triggers. Every update or deletion writes the operator's user ID, IP address, previous value, new value, and microsecond timestamp to an encrypted audit log table that cannot be edited or erased, even by branch managers.",
      },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q131201", // Enterprise resource planning
      "https://www.wikidata.org/wiki/Q622694", // Customer relationship management
      "https://www.wikidata.org/wiki/Q1071", // PostgreSQL
      "https://www.wikidata.org/wiki/Q82871", // Relational database
      "https://www.wikidata.org/wiki/Q276063", // Goods and Services Tax (India)
      "https://www.wikidata.org/wiki/Q7374026", // Role-based access control
      "https://www.wikidata.org/wiki/Q670", // ACID transactions
      "https://www.wikidata.org/wiki/Q18349", // Invoice
      "https://www.wikidata.org/wiki/Q80415", // Software as a service
      "https://www.wikidata.org/wiki/Q160565", // Ministry of Micro, Small and Medium Enterprises
    ],
  },
  "ai-automation": {
    slug: "ai-automation",
    theme: {
      accent: "#10b981",
      accentLight: "#34d399",
      accentGlow: "16, 185, 129",
      bgGradient: "from-emerald-600/15 via-transparent to-cyan-500/5",
      borderHover: "hover:border-emerald-500/40",
      badgeClass: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      tag: "Autonomous Agents & n8n Workflows",
    },
    seoKeywords: [
      "ai automation agency india",
      "n8n workflow automation company",
      "whatsapp business api bot developer",
      "autonomous ai agents for business",
      "document processing llm automation",
      "tesseract ocr invoice processing indore",
      "deterministic rag workflow developer",
      "event driven webhook automation madhya pradesh",
      "meta whatsapp cloud api integration",
      "enterprise customer service ai agent",
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
      {
        id: "whatsapp-bot",
        title: "WhatsApp Business Cloud API Conversational Bots",
        tagline: "Direct Engagement in India's Primary Channel",
        description:
          "Deploy official Meta-verified WhatsApp automation capable of answering FAQs, showcasing product catalogs, capturing lead details, and routing calls.",
        specs: [
          "Official WhatsApp Cloud API integration (green tick eligible)",
          "Interactive buttons, list menus, and media templates",
          "Instant notifications sent to your sales team's personal phones",
          "Seamless fallback to live human agent at any moment",
        ],
        badge: "WhatsApp API",
      },
      {
        id: "n8n-pipelines",
        title: "Autonomous n8n Multi-App Orchestration",
        tagline: "Glue Your Disconnected Software Together",
        description:
          "Self-hosted, secure n8n workflows that listen for webhooks, parse incoming emails, synchronize databases, and trigger invoices automatically.",
        specs: [
          "Zero per-execution fees on self-hosted infrastructure",
          "Bi-directional sync between forms, CRMs, and spreadsheets",
          "Automated error alerting and retry queues",
          "End-to-end payload encryption",
        ],
        badge: "Workflow Automation",
      },
      {
        id: "document-ai",
        title: "Document OCR & PDF Intelligence Extraction",
        tagline: "Extract Data from Invoices & Receipts",
        description:
          "Automatically read scanned PDFs, physical invoices, and purchase orders. Extract line items, dates, and amounts directly into your database.",
        specs: [
          "OCR parsing of messy or skewed receipts",
          "Tax validation against GSTIN formats",
          "Automated CSV and accounting software export",
          "Human verification queue for low-confidence reads",
        ],
        badge: "Document OCR",
      },
      {
        id: "deterministic-state",
        title: "Deterministic State Machines & Dead-Letter Queues",
        tagline: "Zero Dropped Leads & Complete Auditability",
        description:
          "PostgreSQL-backed transactional state queues ensuring every webhook is processed exactly once with automated retries on third-party API outages.",
        specs: [
          "Redis & PostgreSQL dead-letter queue isolation",
          "Idempotency keys preventing duplicate customer messages",
          "Real-time execution telemetry and failure alert webhooks",
          "Automatic fallback to human operator on ambiguous input",
        ],
        badge: "System Resilience",
      },
    ],
    deliverablesTitle: "Automation Deliverables",
    deliverablesSubtitle: "Turnkey automated pipelines with full source access.",
    deliverables: [
      {
        format: "Cloud Deployment",
        title: "Production n8n Workflow Suite",
        description: "Configured automation server with documented JSON workflow definitions and webhook endpoints.",
        badge: "Workflows",
      },
      {
        format: "Meta App",
        title: "WhatsApp Cloud API Integration",
        description: "Verified WhatsApp Business application with approved message templates and webhook listeners.",
        badge: "WhatsApp",
      },
      {
        format: "Multimodal OCR",
        title: "Document Extraction Pipeline",
        description: "Vision AI parser extracting tabular parameters from PDF invoices, challans, and physical receipts.",
        badge: "Document AI",
      },
      {
        format: "Dashboard",
        title: "Execution Log & Metrics Portal",
        description: "Real-time dashboard displaying total executions, success rates, active leads, and error traces.",
        badge: "Monitoring",
      },
    ],
    comparisonTitle: "Manual Office Grind vs MLHK Autonomous Automation",
    comparisonSubtitle: "The tangible impact on company operating efficiency.",
    comparison: [
      {
        aspect: "Inquiry Response Speed",
        genericApproach: "Leads wait 4 to 24 hours for someone to check email or WhatsApp. Most buy elsewhere.",
        mlhkApproach: "Instant response in under 15 seconds 24/7/365 with interactive product options and direct calendar links.",
      },
      {
        aspect: "Data Entry Errors",
        genericApproach: "Fatigued staff mistype phone numbers, GSTINs, and product quantities into Excel.",
        mlhkApproach: "Zero human error. Data flows directly from user input into your central database with Zod validation.",
      },
      {
        aspect: "Operating Hours",
        genericApproach: "Customer support goes dark at 6 PM and on Sundays, losing weekend buyers.",
        mlhkApproach: "24/7/365 continuous autonomous intake, qualification, and appointment booking.",
      },
      {
        aspect: "Software Integration",
        genericApproach: "Data trapped inside separate spreadsheets, email inboxes, and WhatsApp chats.",
        mlhkApproach: "Unified event-driven DAG synchronizing your CRM, accounting, and communication channels automatically.",
      },
    ],
    timelineTitle: "Automation Deployment Stages",
    timelineSubtitle: "Rapid implementation with quantifiable time savings.",
    timeline: [
      {
        phase: "Week 01",
        timeline: "Sprint 1",
        title: "Process Audit & ROI Ranking",
        description: "Mapping top 3 time-consuming manual workflows and drafting test triggers.",
        outputs: ["Process ROI Scorecard", "Architecture Blueprint"],
      },
      {
        phase: "Week 02",
        timeline: "Sprint 2",
        title: "Pipeline Prototype & Webhook Wiring",
        description: "Connecting WhatsApp API, forms, and database state machines in sandbox.",
        outputs: ["Working WhatsApp Sandbox", "n8n Workflow Nodes"],
      },
      {
        phase: "Week 03",
        timeline: "Sprint 3",
        title: "Document OCR & Guardrail Hardening",
        description: "Training multimodal vision models on real invoices and configuring strict JSON schema validation.",
        outputs: ["OCR Extraction Pipeline", "JSON Schema Guardrails"],
      },
      {
        phase: "Week 04+",
        timeline: "Production",
        title: "Live Production Cutover & Monitoring",
        description: "Deploying to production Docker instances, enabling executive alerting, and monitoring throughput.",
        outputs: ["Live Deployment", "24/7 Telemetry Alerting"],
      },
    ],
    toolsTitle: "Automation Engineering Stack",
    tools: [
      {
        name: "n8n Workflow Automation",
        category: "Orchestration",
        description: "Self-hostable, fair-code workflow automation engine executing multi-node event-driven DAG pipelines.",
        url: "https://n8n.io/",
      },
      {
        name: "WhatsApp Business Cloud API",
        category: "Enterprise Messaging",
        description: "Official Meta enterprise messaging infrastructure delivering sub-second notifications and interactive menus.",
        url: "https://developers.facebook.com/docs/whatsapp/cloud-api/",
      },
      {
        name: "Google Gemini 1.5 Flash",
        category: "Multimodal LLM",
        description: "Ultra-fast multimodal vision and language model parsing documents, images, and audio payloads.",
        url: "https://ai.google.dev/",
      },
      {
        name: "PostgreSQL 16",
        category: "State Storage",
        description: "Transactional state engine storing execution logs, idempotency tokens, and customer context.",
        url: "https://www.postgresql.org/",
      },
      {
        name: "Anthropic Claude 3.7",
        category: "Complex Reasoning",
        description: "Advanced reasoning model for multi-step commercial proposal generation and policy evaluation.",
        url: "https://www.anthropic.com/",
      },
      {
        name: "Tesseract OCR Engine",
        category: "Document Vision",
        description: "Open-source OCR library providing robust optical character recognition for physical receipts and invoices.",
        url: "https://github.com/tesseract-ocr/tesseract",
      },
      {
        name: "Redis & BullMQ",
        category: "Task Queue",
        description: "High-throughput in-memory queue isolating dead-letter jobs and retrying failed external webhooks.",
        url: "https://redis.io/",
      },
      {
        name: "Docker Engine",
        category: "Containerization",
        description: "Isolated container runtime hosting self-managed n8n instances with automatic restart policies.",
        url: "https://www.docker.com/",
      },
      {
        name: "Zod Schema Validation",
        category: "Guardrails",
        description: "TypeScript-first schema validation enforcing rigid JSON output structures on all LLM responses.",
        url: "https://zod.dev/",
      },
      {
        name: "Telegram Bot API",
        category: "Executive Telemetry",
        description: "Real-time alerting channel delivering high-priority lead notifications directly to executive staff.",
        url: "https://core.telegram.org/bots/api",
      },
      {
        name: "Resend Email API",
        category: "Transactional Mail",
        description: "Developer-first transactional email delivery infrastructure with high inbox placement rates.",
        url: "https://resend.com/",
      },
      {
        name: "Drizzle ORM",
        category: "Data Layer",
        description: "Type-safe database abstraction synchronizing automated workflow states with relational models.",
        url: "https://orm.drizzle.team/",
      },
    ],
    extendedFaqs: [
      {
        question: "Will automated WhatsApp bots get our phone number blocked by Meta?",
        answer:
          "No. We exclusively use the official Meta WhatsApp Business Cloud API with pre-approved message templates and opt-in compliance, ensuring your number remains 100% compliant, secure, and eligible for green-tick verification.",
      },
      {
        question: "How do you guarantee that the AI won't hallucinate wrong prices or false promises?",
        answer:
          "We enforce deterministic function calling and strict Zod JSON schema validation. The AI agent is not permitted to write free-form marketing prose for pricing or inventory; it queries your private PostgreSQL database via parameterized queries and only returns verified catalog values.",
      },
      {
        question: "Can n8n connect to our internal legacy software and on-premise databases?",
        answer:
          "Yes. Self-hosted n8n instances can run behind secure Cloudflare Tunnels inside your private network, establishing encrypted communication with internal MySQL, PostgreSQL, MS SQL, or local file servers without exposing any public ports.",
      },
      {
        question: "What happens if an external API (like WhatsApp or email) goes down temporarily?",
        answer:
          "Our architecture incorporates Redis and PostgreSQL dead-letter queues. If an external service experiences an outage or rate limit, failed webhook payloads are safely stored, tagged with idempotency keys, and automatically retried using exponential backoff.",
      },
      {
        question: "How much time and payroll cost can our company expect to save with workflow automation?",
        answer:
          "A business with 3 back-office employees spending 3 hours daily on manual data transcription, customer updates, and PDF invoice copying saves over 180 hours every month. At standard payroll rates, this returns ₹40,000–₹80,000 in monthly productive capacity.",
      },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q11660", // Artificial intelligence
      "https://www.wikidata.org/wiki/Q116960481", // Large language model
      "https://www.wikidata.org/wiki/Q105952", // JSON-LD
      "https://www.wikidata.org/wiki/Q54837", // Optical character recognition
      "https://www.wikidata.org/wiki/Q552317", // Webhook
      "https://www.wikidata.org/wiki/Q115788460", // ChatGPT
      "https://www.wikidata.org/wiki/Q1071", // PostgreSQL
      "https://www.wikidata.org/wiki/Q111166", // Workflow management system
      "https://www.wikidata.org/wiki/Q18356037", // WhatsApp
      "https://www.wikidata.org/wiki/Q160565", // Ministry of Micro, Small and Medium Enterprises
    ],
  },
  "cybersecurity": {
    slug: "cybersecurity",
    theme: {
      accent: "#ef4444",
      accentLight: "#f87171",
      accentGlow: "239, 68, 68",
      bgGradient: "from-red-600/15 via-transparent to-amber-500/5",
      borderHover: "hover:border-red-500/40",
      badgeClass: "text-red-400 border-red-500/30 bg-red-500/10",
      tag: "Zero-Trust Edge Perimeter & Hardened Linux Infrastructure",
    },
    seoKeywords: [
      "cloud cybersecurity services india",
      "zero trust architecture consultant",
      "vulnerability assessment penetration testing mp",
      "cloudflare tunnel security setup",
      "linux server hardening services indore",
      "owasp top 10 remediation agency",
      "tls 1.3 ssl labs a+ configuration",
      "ddos edge mitigation madhya pradesh",
    ],
    aeoCapsules: [
      {
        query: "What Is Zero-Trust Network Architecture and Cloudflare Tunnels?",
        answer: "Zero-Trust architecture operates on the principle of 'never trust, always verify'. By deploying Cloudflare Tunnels (cloudflared), origin servers expose zero public IPv4/IPv6 ports to the public internet. All traffic reaches servers exclusively through authenticated, encrypted outbound tunnels over WireGuard, neutralizing port scans, direct IP DDoS floods, and unauthorized database access.",
        keyTakeaway: "Zero exposed public inbound ports eliminates direct-to-server hacking and automated port scanning bots.",
      },
      {
        query: "How Does Linux Server Hardening Protect Production Applications?",
        answer: "Linux hardening involves disabling root password logins in favor of ED25519 cryptographic keys, configuring stateful UFW/iptables firewalls, running web applications in unprivileged systemd execution jails with isolated namespaces, applying automated unattended kernel security updates, and enforcing fail2ban brute-force IP bans.",
        keyTakeaway: "Cryptographic SSH keys, isolated systemd sandboxes, and automated firewall rules prevent unauthorized access.",
      },
      {
        query: "What Is TLS 1.3 and Why Is A+ SSL Labs Configuration Mandatory?",
        answer: "TLS 1.3 is the most secure cryptographic transport protocol, reducing handshake latency to a single round-trip while eliminating vulnerable legacy cipher suites. An A+ SSL Labs rating verifies strict HSTS enforcement (max-age 31536000), Perfect Forward Secrecy (PFS), and resistance to man-in-the-middle packet interception.",
        keyTakeaway: "TLS 1.3 with strict HSTS guarantees encrypted data transit that cannot be decrypted even if private keys leak.",
      },
      {
        query: "What Is the OWASP Top 10 Application Security Framework?",
        answer: "The OWASP Top 10 documents the most critical security risks to web applications, including Broken Access Control (A01), Cryptographic Failures (A02), and Injection Flaws (A03). MLHK Infotech mitigates these vulnerabilities by enforcing parameterized queries with Drizzle ORM, strict Zod schema validation, and Row-Level Security policies.",
        keyTakeaway: "100% parameterized queries, runtime Zod validation, and RBAC eliminate injection and access control breaches.",
      },
      {
        query: "What Is Included in an MLHK Infotech Infrastructure Vulnerability Audit?",
        answer: "We execute authenticated and unauthenticated penetration tests covering OWASP Top 10 vulnerabilities, full 65,535 port audits, dependency CVE scans, and cloud IAM permission reviews. The engagement concludes with an executive remediation dossier and validated retests.",
        keyTakeaway: "Exhaustive OWASP Top 10 vulnerability scanning, cloud IAM audits, and actionable remediation runbooks.",
      },
    ],
    howToSteps: [
      {
        name: "Perimeter & Network Vulnerability Scan",
        text: "Conduct full 65,535-port Nmap scans, TLS cipher evaluations, dependency CVE audits, and cloud IAM permission reviews across existing infrastructure.",
      },
      {
        name: "Zero-Trust Tunnel & Firewall Lockdown",
        text: "Configure Cloudflare Tunnels (cloudflared), close all public inbound ports (22, 80, 443, 5432), and enforce strict default-deny UFW firewall policies.",
      },
      {
        name: "Cryptographic Auth & Kernel Hardening",
        text: "Enforce ED25519 Curve25519 SSH keys, configure systemd execution jails, disable root password logins, and set up automated security package patching.",
      },
      {
        name: "OWASP Remediation & A+ SSL Certification",
        text: "Remediate SQLi/XSS risks with parameterized schemas, verify TLS 1.3 with strict HSTS, achieve Qualys SSL Labs A+ rating, and deliver executive audit report.",
      },
    ],
    heroBadge: "Hardened Infrastructure • Zero-Trust Defense",
    subheading: "Military-grade Linux VPS hardening, Zero-Trust Cloudflare Tunnels, OWASP Top 10 application mitigation, and A+ TLS 1.3 cryptography to protect your enterprise assets from data theft and ransomware.",
    stats: [
      { value: "0 Ports", label: "Public Inbound", detail: "Complete origin invisibility behind Cloudflare Zero Trust Tunnels" },
      { value: "100%", label: "Encrypted", detail: "TLS 1.3 enforced, HSTS preload, and AES-256 encrypted storage" },
      { value: "Grade A+", label: "SSL Labs Score", detail: "Qualys SSL Labs verified cryptographic posture and modern AEAD ciphers" },
      { value: "OWASP", label: "Top 10 Shield", detail: "Zero injection vulnerabilities via parameterized ORM & Zod validation" },
    ],
    philosophyTitle: "Defense in Depth: Assume Compromise and Fortify Every Layer.",
    philosophyText: [
      "Most small and medium enterprises only discover their servers have been compromised after ransomware locks their database or their domain is blacklisted for sending spam.",
      "MLHK Infotech applies pragmatic, military-grade hardening to your IT infrastructure. We secure Linux servers, close exposed ports, eliminate default passwords, and route administrative access behind Cloudflare Zero Trust tunnels.",
      "Every security engagement is governed by written scope and transparent findings, giving executive leadership verified peace of mind and cryptographic proof.",
    ],
    pillarsTitle: "Security & Hardening Disciplines",
    pillarsSubtitle: "Industrial-grade defense-in-depth configurations that neutralize attack vectors.",
    pillars: [
      {
        id: "zero-trust",
        title: "Cloudflare Zero-Trust Tunnels & Perimeter Cloaking",
        tagline: "Hide Your Servers from the Public Internet",
        description: "Never expose your internal databases, SSH, or admin panels directly to public IP addresses. Route access through identity-verified Cloudflare Tunnels.",
        specs: ["Zero open inbound firewall ports required (0 / 65535)", "Single Sign-On (SSO) authentication required before seeing internal pages", "Encrypted WireGuard-based tunnel transport", "Real-time user session logging and device posture checks"],
        badge: "Zero Trust",
      },
      {
        id: "linux-hardening",
        title: "Linux Server Hardening & SSH Cryptographic Lockdown",
        tagline: "Ubuntu & Debian Infrastructure Lockdown",
        description: "Disable root password logins, enforce ED25519 cryptographic keys, configure automatic security updates, and isolate services with systemd sandboxing.",
        specs: ["SSH key-only authentication with non-standard ports", "Automated unattended security upgrades with zero downtime", "Fail2ban automated IP ban policies on iptables", "Removal of unnecessary system services, compilers, and binaries"],
        badge: "Server Defense",
      },
      {
        id: "owasp-armor",
        title: "OWASP Top 10 Application Security & SQLi Immunity",
        tagline: "Zero Injection • Strict Schema Guardrails",
        description: "Eliminate SQL injection, cross-site scripting, and broken authentication through type-safe query builders and strict runtime validations.",
        specs: ["100% parameterized SQL queries using Drizzle ORM", "Runtime request payload sanitization with Zod schemas", "Argon2id cryptographic password hashing with unique salts", "Content-Security-Policy (CSP) & CORS domain origin whitelisting"],
        badge: "App Armor",
      },
      {
        id: "edge-ddos",
        title: "Real-Time Edge DDoS Absorption & BGP Anycast Armor",
        tagline: "Absorb Volumetric Attacks at the Edge",
        description: "Distribute and mitigate multi-gigabit L4/L7 volumetric floods across Cloudflare's 330+ global edge data centers with zero origin server strain.",
        specs: ["Cloudflare Global Anycast BGP routing across 330+ cities", "Sub-second autonomous SYN-flood and HTTP flood mitigation", "Origin CPU stays nominal (<3%) during 500k+ req/s attacks", "100.00% uptime SLA for legitimate customers during active assaults"],
        badge: "DDoS Armor",
      },
    ],
    deliverablesTitle: "Security Deliverables & Hardening Assets",
    deliverablesSubtitle: "Verified hardening with actionable documentation and automated recovery scripts.",
    deliverables: [
      { format: "Technical PDF", title: "Security Assessment & Remediation Report", description: "Comprehensive findings report itemizing vulnerabilities resolved, remaining risks, and ongoing hygiene steps.", badge: "Audit Report" },
      { format: "Shell Scripts", title: "Hardened System Configs & Bastion Scripts", description: "Documented server configuration files, UFW rules, and automated bash hardening scripts for disaster recovery.", badge: "Configs & Scripts" },
      { format: "Cloudflare Rules", title: "Zero-Trust Tunnel & WAF Configuration", description: "Exportable Cloudflare Access policies, WAF rate limiters, and WireGuard tunnel routing definitions.", badge: "WAF & Tunnels" },
      { format: "Actionable Runbook", title: "Incident Response & Backup Runbook", description: "Step-by-step procedures for incident containment, off-site backup restoration, and disaster failover.", badge: "SOP Runbook" },
    ],
    comparisonTitle: "Default Agency Hosting vs MLHK Hardened Infrastructure",
    comparisonSubtitle: "Why standard hosting configurations leave you exposed to ransomware and credential theft.",
    comparison: [
      { aspect: "Inbound Port Exposure", genericApproach: "Ports 22 (SSH), 80/443 (Web), and 5432 (Postgres) exposed openly to the public internet. Discoverable on Shodan.", mlhkApproach: "All 65,535 ports closed behind Zero Trust tunnels. Server is completely invisible on public network scans." },
      { aspect: "SSH Authentication", genericApproach: "Default root login permitted with weak passwords. Subject to thousands of brute-force dictionary attacks daily.", mlhkApproach: "Root login disabled. Mandatory ED25519 cryptographic keys with Fail2ban triggering 24h IP jail on 3 failures." },
      { aspect: "Application Vulnerabilities", genericApproach: "Unparameterized raw SQL concatenation and unvalidated form inputs susceptible to SQL injection and XSS.", mlhkApproach: "100% parameterized queries via Drizzle ORM, Zod schema validation, and PostgreSQL Row-Level Security." },
      { aspect: "DDoS & Traffic Spikes", genericApproach: "Unprotected servers crash under volumetric floods; hosting providers bill thousands in excess bandwidth.", mlhkApproach: "Cloudflare Anycast edge network absorbs 500k+ req/s attacks at perimeter; origin CPU remains under 3% load." },
    ],
    timelineTitle: "Security Hardening Execution Timeline",
    timelineSubtitle: "Zero-downtime security improvements completed within 5 business days.",
    timeline: [
      { phase: "Stage 01", timeline: "Day 1", title: "Authorized Scope & Inventory Audit", description: "Written scope agreement, network discovery, mapping of open ports, services, accounts, and vulnerability baseline.", outputs: ["Discovery Dossier", "Scope Agreement"] },
      { phase: "Stage 02", timeline: "Days 2–3", title: "Kernel Hardening & Zero-Trust Setup", description: "Applying strict UFW rules, provisioning ED25519 SSH keys, configuring Cloudflare Tunnels, and closing public ports.", outputs: ["Hardened Host", "Active Cloudflare Tunnel"] },
      { phase: "Stage 03", timeline: "Day 4", title: "OWASP Application Audit & TLS 1.3", description: "Fuzzing API endpoints, remediating injection vectors, enforcing HSTS preload, and configuring WAF rate limiters.", outputs: ["A+ SSL Labs Score", "WAF Rule Suite"] },
      { phase: "Stage 04", timeline: "Day 5", title: "Penetration Retest & Executive Handover", description: "External re-scanning to confirm zero open ports, validating disaster recovery backups, and delivering final audit PDF.", outputs: ["Remediation Report", "Incident SOP Runbook"] },
    ],
    toolsTitle: "Security & Infrastructure Stack",
    tools: [
      { name: "Cloudflare Zero Trust & Tunnels", category: "Perimeter Isolation", description: "Identity-aware access proxy connecting servers outbound without exposing public IP addresses.", url: "https://developers.cloudflare.com/cloudflare-one/" },
      { name: "OpenSSH & ED25519", category: "Host Access", description: "Curve25519 public-key authentication eliminating passwords and brute-force vulnerabilities.", url: "https://www.openssh.com" },
      { name: "UFW & Iptables", category: "Kernel Firewall", description: "Linux kernel stateful packet filtering and default-deny inbound network access policies.", url: "https://launchpad.net/ufw" },
      { name: "Fail2ban", category: "Intrusion Prevention", description: "Automated log analyzer banning malicious IP addresses upon multiple authentication failures.", url: "https://www.fail2ban.org" },
      { name: "Nmap Network Scanner", category: "Port Discovery", description: "Comprehensive network exploration and port auditing utility verifying perimeter isolation.", url: "https://nmap.org" },
      { name: "Qualys SSL Labs", category: "Cryptographic Benchmark", description: "Industry-standard cryptographic testing verifying TLS 1.3, Perfect Forward Secrecy, and HSTS.", url: "https://www.ssllabs.com/ssltest/" },
      { name: "OWASP ZAP", category: "Vulnerability Scanning", description: "Automated application vulnerability testing suite uncovering SQLi, XSS, and broken access control.", url: "https://owasp.org/www-project-zap/" },
      { name: "WireGuard", category: "Encrypted Transport", description: "High-speed modern VPN protocol delivering cryptographic tunnel transport with minimal latency.", url: "https://www.wireguard.com" },
      { name: "Let's Encrypt & Certbot", category: "Automated TLS", description: "Automated public key infrastructure generating trusted X.509 certificates with auto-renewal.", url: "https://letsencrypt.org" },
      { name: "Cloudflare WAF", category: "Layer 7 Shield", description: "Edge web application firewall inspecting HTTP traffic for malicious bot signatures and CVE exploits.", url: "https://www.cloudflare.com/waf/" },
      { name: "systemd Security Profiles", category: "Process Sandboxing", description: "Linux execution sandboxes with restricted syscalls, private /tmp directories, and isolated namespaces.", url: "https://systemd.io" },
      { name: "Drizzle ORM Parameterized SQL", category: "Data Armor", description: "Type-safe query builder enforcing 100% parameterized SQL execution with zero injection vectors.", url: "https://orm.drizzle.team" },
    ],
    extendedFaqs: [
      { question: "Will server hardening cause downtime for our active website or app?", answer: "No. We schedule hardening activities during agreed maintenance windows and test network rules in staging or parallel interfaces. Cloudflare Tunnels can be stood up alongside existing connections before cutting over traffic, ensuring legitimate customer sessions continue without disruption." },
      { question: "Why should we use Cloudflare Tunnels instead of a traditional VPN or open SSH port?", answer: "Traditional VPNs still require exposing an open inbound port (such as 1194 or 500) to the internet, leaving the VPN server itself vulnerable to zero-day exploits. Cloudflare Tunnels operate strictly outbound-only over WireGuard; your origin server has 0 open inbound ports, making it completely invisible to internet scanners and automated bots." },
      { question: "Can you harden a server that is already hosted on AWS, DigitalOcean, Hetzner, or a private VPS?", answer: "Yes. Our hardening protocols are platform-agnostic and work seamlessly across AWS EC2, DigitalOcean Droplets, Hetzner Cloud, Linode, Google Compute Engine, and on-premises Linux bare-metal servers running Ubuntu, Debian, or AlmaLinux." },
      { question: "What is an ED25519 cryptographic key and why are RSA passwords considered obsolete?", answer: "ED25519 is an elliptic curve signature algorithm (Curve25519) that offers significantly higher security than traditional 2048-bit RSA keys with smaller key sizes and faster handshake speeds. Unlike passwords which can be cracked through dictionary attacks, ED25519 keys cannot be brute-forced with current computing power." },
      { question: "How does MLHK Infotech protect against zero-day vulnerabilities in open-source libraries?", answer: "We deploy defense-in-depth: automated CI/CD dependency vulnerability scans via Dependabot, strict package lockfiles, unprivileged systemd sandboxes that prevent compromised processes from accessing the root filesystem, and Cloudflare WAF rules that filter exploit payloads before they reach the server." },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q11188", // Computer security
      "https://www.wikidata.org/wiki/Q105674064", // Zero trust security model
      "https://www.wikidata.org/wiki/Q753051", // OpenSSH
      "https://www.wikidata.org/wiki/Q131379", // Transport Layer Security
      "https://www.wikidata.org/wiki/Q19879782", // Cloudflare
      "https://www.wikidata.org/wiki/Q80993", // Firewall (computing)
      "https://www.wikidata.org/wiki/Q1135769", // Penetration test
      "https://www.wikidata.org/wiki/Q185590", // OWASP
      "https://www.wikidata.org/wiki/Q8777", // Cryptography
      "https://www.wikidata.org/wiki/Q1051515", // Fail2ban
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
      tag: "24/7 Global Telemetry & DevOps SLA Maintenance",
    },
    seoKeywords: [
      "24 7 server maintenance services india",
      "devops managed support agency indore",
      "cloud backup disaster recovery company",
      "sla uptime monitoring services madhya pradesh",
      "application maintenance retainer shajapur",
      "postgresql point in time recovery pitr",
      "cloudflare zero downtime deployment support",
      "rto rpo disaster recovery sla",
    ],
    aeoCapsules: [
      {
        query: "What Is a 24/7 Multi-Region Telemetry Uptime Probe?",
        answer: "A multi-region telemetry probe automatically pings your website and backend APIs every 60 seconds from distributed geographic nodes (Mumbai, Delhi, Bengaluru, Singapore, Frankfurt, London). If latency spikes or an HTTP 5xx error occurs, on-call senior engineers are alerted immediately via WhatsApp and SMS before customers experience widespread outages.",
        keyTakeaway: "Automated 60-second multi-region synthetic health checks alert senior engineers instantly on any failure.",
      },
      {
        query: "What Is the Difference Between RTO and RPO in Disaster Recovery?",
        answer: "Recovery Time Objective (RTO) is the maximum acceptable duration to restore service after a catastrophic failure (MLHK guarantees RTO < 15 minutes). Recovery Point Objective (RPO) is the maximum acceptable age of data lost (MLHK guarantees RPO < 1 hour via automated incremental database snapshots and WAL segment archiving).",
        keyTakeaway: "Sub-15 minute RTO and sub-1 hour RPO minimize downtime and prevent critical database loss.",
      },
      {
        query: "Why Is Proactive Dependency Patching Essential for Live Web Applications?",
        answer: "Open-source software libraries regularly disclose zero-day security vulnerabilities. Proactive maintenance applies validated security patches inside staging sandbox environments before zero-downtime production deployment, keeping malicious exploits at bay without breaking user sessions.",
        keyTakeaway: "Weekly vulnerability scans and staging-tested security patches prevent zero-day production exploits.",
      },
      {
        query: "What Is the Difference Between 99.0% and 99.9% SLA Uptime?",
        answer: "A 99.0% uptime SLA allows over 87 hours (3.6 days) of downtime every year, causing catastrophic revenue and SEO losses. A 99.9% uptime SLA restricts annual downtime to less than 8.7 hours (under 43 minutes per month), backed by legal service credit rebates.",
        keyTakeaway: "99.9% SLA cuts allowed annual downtime by 90%, preserving customer trust and organic search rankings.",
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
        text: "Inventory existing servers, repositories, environment credentials, database schemas, and identify technical debt and missing indexes.",
      },
      {
        name: "Telemetry Probes & Health Monitoring Setup",
        text: "Install multi-region uptime monitors, application error trackers (Sentry), and real-time developer notification channels.",
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
    subheading: "Round-the-clock uptime monitoring, automated disaster recovery failover, weekly security patching, and signed 99.9% SLA response guarantees to keep your mission-critical applications online without interruption.",
    stats: [
      { value: "99.9%", label: "Uptime SLA", detail: "Signed contractual uptime commitment backed by automatic service credits" },
      { value: "<15m", label: "Incident RTO", detail: "Sub-15 minute disaster recovery objective with atomic point-in-time rollbacks" },
      { value: "6 Nodes", label: "Global Probes", detail: "Synthetic health checks every 60 seconds from India, Asia, and Europe" },
      { value: "Weekly", label: "Patch Gates", detail: "Proactive dependency upgrades tested in isolated staging sandboxes" },
    ],
    philosophyTitle: "Software is Living Infrastructure: Protect Your Investment.",
    philosophyText: [
      "Launching a software product is only day one. Left unattended, dependencies decay, database tables fragment, SSL certificates expire, and security flaws emerge.",
      "MLHK Infotech's Support & Maintenance agreements provide dedicated technical stewardship. We monitor your servers, patch security vulnerabilities weekly, and provide a direct helpline for technical fixes.",
      "You focus on serving your customers while our engineering team ensures your digital systems stay fast, resilient, and bug-free.",
    ],
    pillarsTitle: "Support & DevOps Engineering Pillars",
    pillarsSubtitle: "Industrial reliability, real-time observability, and contractual SLA peace of mind.",
    pillars: [
      {
        id: "uptime-monitoring",
        title: "Continuous Multi-Region Health & Error Telemetry",
        tagline: "We Know Before Your Customers Do",
        description: "Automated synthetic health checks ping your website and APIs every 60 seconds from 6 global stations, alerting senior engineers within seconds of an anomaly.",
        specs: ["60-second multi-region synthetic health checks (Mumbai, Delhi, Bengaluru, Singapore, Europe)", "Real-time exception capture and stack trace analysis via Sentry", "Automated early warning 30 days prior to SSL certificate or domain expiration", "Hardware telemetry tracking origin CPU, memory headroom, and disk IOPS"],
        badge: "Telemetry",
      },
      {
        id: "disaster-recovery",
        title: "Automated Offsite Point-in-Time Database Recovery (PITR)",
        tagline: "Zero Data Loss • Microsecond Precision",
        description: "Maintain continuous Write-Ahead Log (WAL) archiving and encrypted daily snapshots stored in secondary cloud regions for instantaneous disaster failover.",
        specs: ["Daily AES-256 encrypted database snapshots transferred to secondary geographic regions", "Continuous WAL archiving enabling point-in-time restoration to any exact minute", "Contractual Recovery Point Objective (RPO) < 1 hour and Recovery Time Objective (RTO) < 15 minutes", "Automated monthly backup integrity validation and mock disaster recovery drills"],
        badge: "Disaster Recovery",
      },
      {
        id: "security-patches",
        title: "Proactive Dependency Upgrades & Staging Testing Gates",
        tagline: "Keep Zero-Day Exploits Away",
        description: "Apply regular upgrades to operating system kernels, Node.js/Next.js frameworks, database drivers, and third-party libraries through isolated staging sandboxes.",
        specs: ["Weekly automated CVE vulnerability scans using Dependabot and Trivy", "Isolated staging preview environments for automated regression and smoke testing", "Zero-downtime atomic edge cutover with instantaneous 1-click rollback safety", "Database index defragmentation, vacuuming, and query plan optimization"],
        badge: "Patch Gates",
      },
      {
        id: "dedicated-desk",
        title: "Guaranteed Response SLAs & Dedicated Senior Engineers",
        tagline: "Your On-Call Technical Desk",
        description: "Dedicated monthly developer hours for small UI tweaks, form modifications, analytics additions, and urgent bug resolutions backed by signed SLA response times.",
        specs: ["Contractual response times (<15m critical, <2h standard) under signed SLA", "Direct WhatsApp and emergency telephone escalation channel to lead software engineers", "Itemized monthly timesheets, changelogs, and infrastructure cost optimization reviews", "Full peer code reviews and architectural guidance on all codebase modifications"],
        badge: "Dedicated Desk",
      },
    ],
    deliverablesTitle: "Maintenance Deliverables & Stewardship Assets",
    deliverablesSubtitle: "Transparent, accountable reporting and verified recovery assets delivered every month.",
    deliverables: [
      { format: "Monthly PDF", title: "Executive Stewardship & SLA Report", description: "Comprehensive breakdown of uptime percentages, patches applied, database backups validated, and resolved tickets.", badge: "Monthly Report" },
      { format: "Encrypted Cloud", title: "Offsite Encrypted Automated Backups", description: "Verified daily database snapshots stored with AES-256 encryption in geographically isolated cloud buckets.", badge: "Offsite Backups" },
      { format: "Live Dashboard", title: "Centralized Telemetry & Error Panel", description: "Dedicated dashboard access to view real-time uptime health, latency graphs, and application error telemetry.", badge: "Observability" },
      { format: "Actionable SOP", title: "Disaster Recovery & Escalation Runbook", description: "Documented disaster failover steps, emergency contact hierarchy, and credentials recovery procedures.", badge: "SOP Runbook" },
    ],
    comparisonTitle: "Abandoned Post-Launch Freelancers vs MLHK Dedicated SLA",
    comparisonSubtitle: "The profound difference between ghosted calls and contractually guaranteed engineering support.",
    comparison: [
      { aspect: "Post-Launch Availability", genericApproach: "Freelancer disappears after final invoice. Emergency bugs, expired certificates, and crashes go unanswered for weeks.", mlhkApproach: "Formal SLA with named senior engineer, guaranteed sub-15 minute response time, and direct WhatsApp hotline." },
      { aspect: "Proactive Maintenance", genericApproach: "Zero updates or monitoring until the platform crashes, runs out of disk space, or gets blacklisted by search engines.", mlhkApproach: "Weekly scheduled security audits, dependency upgrades, database vacuuming, and 60-second synthetic health checks." },
      { aspect: "Disaster Recovery", genericApproach: "Unverified manual backups stored on the same server disk. If the server dies, all customer data is permanently lost.", mlhkApproach: "Daily AES-256 encrypted snapshots replicated to secondary cloud regions with point-in-time recovery and tested restoration." },
      { aspect: "SLA Guarantees", genericApproach: "Zero uptime guarantees, zero financial accountability, and no contractual compensation for lost business.", mlhkApproach: "Signed 99.9% uptime SLA guarantee backed by automatic service credit rebates if performance targets are missed." },
    ],
    timelineTitle: "Support Onboarding & Transition Workflow",
    timelineSubtitle: "Seamless transition into continuous maintenance with zero disruption to active business.",
    timeline: [
      { phase: "Step 01", timeline: "Day 1", title: "System Audit & Credentials Handover", description: "Comprehensive inventory of codebases, databases, hosting accounts, environment variables, and existing bugs.", outputs: ["Audit Dossier", "Credentials Vault"] },
      { phase: "Step 02", timeline: "Day 2", title: "Telemetry Probes & Health Monitoring", description: "Installing 60-second multi-region synthetic uptime monitors, Sentry error telemetry, and on-call alerting channels.", outputs: ["Active Probes", "Alert Webhooks"] },
      { phase: "Step 03", timeline: "Day 3", title: "Encrypted Offsite Backup & Failover Config", description: "Configuring automated daily database snapshots to secondary cloud storage and verifying test restoration drill.", outputs: ["Automated Backups", "Disaster Runbook"] },
      { phase: "Step 04", timeline: "Day 4+", title: "Continuous Stewardship & Monthly Reviews", description: "Scheduled weekly security updates, priority ticket resolution, and monthly executive performance reviews.", outputs: ["Monthly Reports", "Signed SLA Agreement"] },
    ],
    toolsTitle: "Maintenance & Observability Stack",
    tools: [
      { name: "Better Uptime / Better Stack", category: "Telemetry & Uptime", description: "Global synthetic ping monitors checking HTTP response codes and latency every 60 seconds.", url: "https://betterstack.com" },
      { name: "Cloudflare Telemetry & Analytics", category: "Edge Observability", description: "Real-time edge performance, cache hit ratios, and autonomous DDoS attack mitigations.", url: "https://developers.cloudflare.com/analytics/" },
      { name: "Prometheus Monitoring", category: "Metrics Collection", description: "Time-series database gathering hardware metrics, memory usage, and application query throughput.", url: "https://prometheus.io" },
      { name: "Grafana Dashboards", category: "Data Visualization", description: "Visual observability dashboards displaying CPU load, request rates, and database connection pools.", url: "https://grafana.com" },
      { name: "Sentry Error Telemetry", category: "Application Monitoring", description: "Real-time exception capture, stack trace diagnosis, and user impact telemetry.", url: "https://sentry.io" },
      { name: "PostgreSQL WAL-G & PITR", category: "Database Backups", description: "Continuous Write-Ahead Log archiving and point-in-time recovery for PostgreSQL databases.", url: "https://github.com/wal-g/wal-g" },
      { name: "GitHub Actions CI/CD", category: "Automated Deployment", description: "Automated testing, linting, building, and zero-downtime deployment pipelines with atomic rollbacks.", url: "https://github.com/features/actions" },
      { name: "Docker Containerization", category: "Environment Parity", description: "Standardized lightweight application containers ensuring identical staging and production environments.", url: "https://www.docker.com" },
      { name: "Postman API Contract Testing", category: "Integration Validation", description: "Automated API contract testing and regression test suites executed before every release.", url: "https://www.postman.com" },
      { name: "Cloudflare Instant Rollbacks", category: "Edge Safety", description: "Instantaneous edge routing cache rollbacks reversing broken releases in under 5 seconds.", url: "https://www.cloudflare.com" },
      { name: "PagerDuty Incident Escalation", category: "On-Call Routing", description: "Intelligent on-call rotation dispatcher routing critical outages to lead engineers via phone.", url: "https://www.pagerduty.com" },
      { name: "Dependabot & Renovate", category: "Security Patching", description: "Automated dependency vulnerability monitoring submitting automated security patch pull requests.", url: "https://docs.renovatebot.com" },
    ],
    extendedFaqs: [
      { question: "Can MLHK Infotech maintain a website or app built by another developer?", answer: "Yes. Approximately 40% of our maintenance clients come to us with legacy systems built by former freelancers or internal teams. We perform a preliminary code and infrastructure audit to inspect codebase health, document dependencies, review database indexes, and verify deployment pipelines before formalizing a support agreement." },
      { question: "What happens if an outage occurs at 2:00 AM on a Sunday?", answer: "Our multi-region synthetic monitoring probes operate 24 hours a day, 365 days a year. If your application fails to return HTTP 200 for more than 60 seconds, an automated incident alert triggers on our on-call senior engineers' phones via automated call and WhatsApp. We begin containment within our sub-15 minute SLA window without waiting for Monday morning." },
      { question: "How do you guarantee that a database backup can actually be restored?", answer: "Many organizations fail during disasters because their backup files were corrupted or incomplete. MLHK Infotech executes automated monthly restoration drills in an isolated staging sandbox. The automated job downloads the encrypted snapshot, restores the database schema, runs verification queries, and confirms 100% data integrity before logging a pass." },
      { question: "What is included in the monthly developer hours for micro-features?", answer: "Monthly retainer hours can be used for UI layout updates, new landing page sections, promotional banners, form modifications, analytics pixel additions, third-party webhook integrations, and database performance tuning. Unused hours roll over under eligible long-term agreements." },
      { question: "How do service credit refunds work if uptime drops below the 99.9% SLA?", answer: "Our SLA agreements include clear, legally binding credit provisions. If our telemetry logs show total availability dropping below 99.9% in any calendar month due to infrastructure or maintenance faults within our control, we automatically apply a 15% to 50% credit against your subsequent monthly invoice upon verification." },
    ],
    knowsAbout: [
      "https://www.wikidata.org/wiki/Q11023", // Engineering
      "https://www.wikidata.org/wiki/Q1211157", // DevOps
      "https://www.wikidata.org/wiki/Q476007", // Service-level agreement
      "https://www.wikidata.org/wiki/Q11369", // Software testing
      "https://www.wikidata.org/wiki/Q1071", // PostgreSQL
      "https://www.wikidata.org/wiki/Q19879782", // Cloudflare
      "https://www.wikidata.org/wiki/Q25164871", // Continuous integration
      "https://www.wikidata.org/wiki/Q185590", // Software maintenance
      "https://www.wikidata.org/wiki/Q28135891", // Observability
      "https://www.wikidata.org/wiki/Q160565", // Ministry of Micro, Small and Medium Enterprises
    ],
  },
};

