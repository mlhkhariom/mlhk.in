/**
 * High-Intent Digital Solution Landing Pages for MLHK Infotech (https://mlhk.in).
 * Targets real buyer-intent queries across India: new affordable websites, existing website
 * editing/redesign, SEO & Google ranking, Instagram/Facebook/Google Ads, mobile apps, and
 * all-in-one IT problem solving.
 */

export interface SolutionPageData {
  slug: string;
  shortTitle: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSummary: string;
  startingPriceInr: string;
  minPriceNumeric: number;
  maxPriceNumeric: number;
  deliveryTime: string;
  problemsSolved: readonly { problem: string; fix: string }[];
  packages: readonly {
    name: string;
    price: string;
    bestFor: string;
    features: readonly string[];
  }[];
  workflowSteps: readonly { name: string; text: string }[];
  faqs: readonly { question: string; answer: string }[];
  relatedServiceSlug: string;
  keywords: readonly string[];
}

export const SOLUTION_PAGES: readonly SolutionPageData[] = [
  {
    slug: "website-development-cost-india",
    shortTitle: "Low-Cost Website Development",
    category: "Website Design & Development",
    seoTitle: "Best Low-Cost Website Development Company in India",
    metaDescription:
      "Need a fast, professional business website at low cost? MLHK Infotech builds custom-coded, SEO-ready websites in India starting at ₹15,000 with full code ownership & WhatsApp support.",
    heroEyebrow: "Affordable Pricing • Custom Code • 100% Ownership",
    heroHeadline: "High-Quality Business Websites at Honest",
    heroHighlight: "Indian Pricing.",
    heroSummary:
      "Searching for a reliable company to build your business website without paying ₹1 lakh+ agency markups or getting stuck with a slow copied WordPress template? We code fast, Google-ready websites from scratch starting at ₹15,000.",
    startingPriceInr: "₹15,000",
    minPriceNumeric: 15000,
    maxPriceNumeric: 85000,
    deliveryTime: "2 – 4 Weeks",
    problemsSolved: [
      {
        problem: "Cheap freelancers vanish mid-project or install pirated themes that get hacked",
        fix: "You work directly with MSME & GST registered MLHK Infotech — clean in-house code, documented handover, and direct founder support.",
      },
      {
        problem: "Metro agencies quote ₹80,000–₹3,00,000 for a standard business website",
        fix: "Because we engineer from Madhya Pradesh without bloated corporate rent, you get the exact same Next.js/Cloudflare quality at 50% lower cost.",
      },
      {
        problem: "Beautiful website that never shows up on Google or loads slowly on Jio/Airtel 4G",
        fix: "Every website ships with 95+ Core Web Vitals, clean JSON-LD schema, XML sitemap, mobile-first UX, and Google Search Console setup.",
      },
    ],
    packages: [
      {
        name: "Starter Business Website",
        price: "₹15,000 – ₹25,000",
        bestFor: "Local shops, clinics, contractors, consultants & small businesses across India",
        features: [
          "5–8 custom designed, mobile-first pages (zero templates)",
          "WhatsApp instant chat, click-to-call & lead capture form",
          "Complete technical SEO, JSON-LD schema & Google Maps integration",
          "Free SSL, Cloudflare Edge deployment & 100% source-code ownership",
        ],
      },
      {
        name: "Growth / E-Commerce Website",
        price: "₹30,000 – ₹60,000",
        bestFor: "Retail brands, wholesalers, coaching institutes & D2C stores",
        features: [
          "Product catalog, cart, UPI/Razorpay checkout & GST invoice generation",
          "Custom Admin CMS to edit products, prices, blogs & banners anytime",
          "Automated WhatsApp/email order confirmations & SEO product schema",
          "Speed-optimized for 4G/5G shoppers across Tier 1–5 cities",
        ],
      },
      {
        name: "Custom Web App / Portal",
        price: "₹55,000 – ₹1,20,000",
        bestFor: "SaaS founders, multi-branch companies & B2B portals",
        features: [
          "User login, role-based dashboards (Admin/Staff/Client) & SQL database",
          "Custom workflows: CRM, bookings, billing, reporting & API integrations",
          "Hardened security, automated backups & ongoing SLA support options",
        ],
      },
    ],
    workflowSteps: [
      { name: "Free Requirement Call on WhatsApp", text: "Share your business type, city, and goals on WhatsApp (+91 91651 00124) or our contact form. We give you a clear fixed quote within 24 hours." },
      { name: "Custom UI Design & Content Structure", text: "We craft a modern layout tailored to your customers and structure headings/keywords so Google understands every service you offer." },
      { name: "Clean Engineering & Live Preview", text: "We build your website in Next.js/React with fast edge hosting and share a live staging link so you can test every button on your phone." },
      { name: "Google Indexing & Handover", text: "We connect your domain, SSL, Google Search Console, sitemap, and analytics, then hand over 100% ownership with ongoing support." },
    ],
    faqs: [
      {
        question: "Website banwane me kitna kharcha aata hai (How much does a website cost in India)?",
        answer:
          "A clean, custom-coded business website from MLHK Infotech starts at ₹15,000 to ₹25,000. E-commerce websites with online payments start around ₹30,000, and custom web apps/portals range from ₹55,000 upwards. Every quote is fixed upfront with zero hidden monthly lock-in fees.",
      },
      {
        question: "Will my website rank on Google automatically after launch?",
        answer:
          "Every website we deliver includes complete technical SEO foundations — clean HTML, canonical URLs, JSON-LD structured data, fast Core Web Vitals, XML sitemap, and Google Search Console submission — giving you the strongest possible head start to rank in local and national searches.",
      },
      {
        question: "Do I own the domain, design, and source code after payment?",
        answer:
          "Yes, 100%. Unlike agencies that lock your domain or charge lifetime rent, MLHK Infotech transfers full code, database, and domain control directly to you.",
      },
    ],
    relatedServiceSlug: "web-development",
    keywords: [
      "website banwani hai koi achi company",
      "low cost website development company India",
      "best affordable website design near me",
      "website development cost in India",
      "custom business website ₹15000 India",
    ],
  },
  {
    slug: "website-redesign-editing-and-speed-fix",
    shortTitle: "Website Redesign, Editing & Speed Fix",
    category: "Website Modernization & Maintenance",
    seoTitle: "Website Redesign, Editing & Speed Optimization India",
    metaDescription:
      "Already have a slow, outdated, or broken website? MLHK Infotech edits, redesigns, fixes bugs, optimizes Core Web Vitals to 95+, and restores Google rankings without losing SEO equity.",
    heroEyebrow: "Fix Existing Websites • Zero SEO Drop • 95+ Speed",
    heroHeadline: "Already Have a Website? We Edit, Redesign &",
    heroHighlight: "Make It Fast.",
    heroSummary:
      "Whether you need urgent text/design edits, a complete modern redesign, WordPress-to-Next.js migration, malware cleanup, or fixing a slow site that is losing Google rankings — we take over cleanly and make it perform like new.",
    startingPriceInr: "₹8,000",
    minPriceNumeric: 8000,
    maxPriceNumeric: 45000,
    deliveryTime: "3 Days – 2 Weeks",
    problemsSolved: [
      {
        problem: "Old developer stopped answering calls and you cannot edit prices, photos, or pages",
        fix: "We safely take over your existing code/hosting, fix broken forms/pages, and add an easy admin panel so you stay in control.",
      },
      {
        problem: "Website takes 5–8 seconds to open on mobile, causing visitors to bounce immediately",
        fix: "We strip bloated scripts, optimize images/fonts, and migrate to Cloudflare Edge so pages open in under 1 second across India.",
      },
      {
        problem: "Fear of losing existing Google rankings during a website redesign",
        fix: "We preserve every ranking URL, map 301 permanent redirects for changed paths, upgrade JSON-LD schema, and trigger instant Google re-indexing.",
      },
    ],
    packages: [
      {
        name: "Quick Website Editing & Bug Fix",
        price: "₹5,000 – ₹12,000",
        bestFor: "Fixing broken forms, updating content/UI, SSL errors, or mobile layout glitches",
        features: [
          "Audit & repair of broken pages, contact forms, and mobile responsiveness",
          "UI refresh, updated services/pricing, and WhatsApp lead button setup",
          "Security patching, broken link cleanup & basic speed optimization",
        ],
      },
      {
        name: "Full Website Redesign & SEO Upgrade",
        price: "₹15,000 – ₹35,000",
        bestFor: "Outdated WordPress, Wix, or old PHP/HTML websites needing a modern rebuild",
        features: [
          "Complete visual overhaul with modern typography and clear conversion CTAs",
          "Zero-rank-loss 301 redirect map + upgraded Schema.org JSON-LD",
          "95+ Mobile & Desktop Core Web Vitals optimization",
          "Cloudflare Edge hosting migration to slash hosting bills & downtime",
        ],
      },
    ],
    workflowSteps: [
      { name: "Free Technical Audit", text: "Send us your existing website URL. We check Core Web Vitals, Google indexing errors, broken links, and security vulnerabilities." },
      { name: "Zero-Downtime Staging Rebuild", text: "We apply edits or redesign your site on a private staging URL so your live business never faces a minute of downtime." },
      { name: "301 Redirects & SEO Preservation", text: "We map every existing Google-indexed URL to its new destination and add rich structured data so rankings climb instead of dropping." },
      { name: "Launch & Ongoing Care", text: "We cut over smoothly, re-submit your sitemap to Google Search Console, and remain on WhatsApp for any future updates." },
    ],
    faqs: [
      {
        question: "Meri purani website bani hui hai — kya aap usko edit ya redesign kar sakte hain?",
        answer:
          "Bilkul! Whether your website is built on WordPress, HTML/CSS, PHP, Laravel, React, or Next.js, MLHK Infotech can edit existing sections, fix bugs/speed issues, or rebuild it into a modern high-ranking platform while keeping your domain and Google traffic safe.",
      },
      {
        question: "Will my website go offline while you redesign or fix it?",
        answer:
          "No. All redesign and optimization work happens on a separate staging environment. We only switch DNS once you have approved the new version, ensuring zero downtime.",
      },
    ],
    relatedServiceSlug: "support-and-maintenance",
    keywords: [
      "website redesign company India",
      "purani website edit karwani hai",
      "website speed optimization India",
      "fix slow WordPress website India",
      "website maintenance and bug fixing service",
    ],
  },
  {
    slug: "seo-and-google-ranking-services",
    shortTitle: "SEO, Local SEO & Google Top Ranking",
    category: "Search Engine Optimization (SEO / AEO / GEO)",
    seoTitle: "Best SEO, Local SEO & AEO Agency in India",
    metaDescription:
      "Rank #1 on Google Search, Google Maps 'near me' results & AI Answers (ChatGPT/Gemini). Technical SEO, JSON-LD Schema, Google Search Console fixes & pan-India Local SEO by MLHK Infotech.",
    heroEyebrow: "Technical SEO • Local 'Near Me' SEO • AEO & GEO",
    heroHeadline: "Dominate Google Search, Maps & AI Answers",
    heroHighlight: "Across India.",
    heroSummary:
      "Ranking at the top of Google is engineering, not guesswork. We fix crawl blockers, architect rich Schema.org JSON-LD for Google Search Console enhancements, optimize Google Business Profiles for 'near me' searches, and structure your content so ChatGPT, Gemini, and Google AI Overviews cite your brand first.",
    startingPriceInr: "₹10,000 / mo",
    minPriceNumeric: 10000,
    maxPriceNumeric: 45000,
    deliveryTime: "Technical fixes in 7–14 days • Compounding organic growth monthly",
    problemsSolved: [
      {
        problem: "Pages stuck in Google Search Console 'Crawled – currently not indexed' or missing rich snippets",
        fix: "We resolve robots.txt/canonical conflicts, clean sitemaps, build valid JSON-LD (Organization, LocalBusiness, Service, FAQ, Breadcrumb, HowTo), and automate IndexNow/Search Console indexing.",
      },
      {
        problem: "Competitors appear first when local customers search 'best [service] near me'",
        fix: "Complete Google Business Profile optimization, NAP consistency, geo-targeted landing pages, and city/state entity schema.",
      },
      {
        problem: "Missing out on traffic from ChatGPT, Perplexity, and Google AI Overviews",
        fix: "Full AEO & GEO implementation: llms.txt, Speakable schema, clear answer capsules, and verified E-E-A-T entity linking.",
      },
    ],
    packages: [
      {
        name: "One-Time Technical SEO & Schema Overhaul",
        price: "₹12,000 – ₹25,000",
        bestFor: "Websites that need indexing fixes, Core Web Vitals speed-up & full JSON-LD setup",
        features: [
          "Complete Google Search Console crawl & indexing blocker audit + fix",
          "Valid JSON-LD implementation (LocalBusiness, Service, FAQ, Breadcrumb, Speakable)",
          "Title/meta optimization, clean XML sitemap, robots.txt & canonical audit",
          "Core Web Vitals (LCP, INP, CLS) optimization for mobile-first indexing",
        ],
      },
      {
        name: "Monthly Local & National SEO Growth",
        price: "₹12,000 – ₹25,000 / month",
        bestFor: "Businesses targeting #1 Google ranking across cities, states, or all India",
        features: [
          "Deep buyer-intent keyword research (English + regional search terms)",
          "High-authority city/service landing pages & technical blog articles",
          "Google Business Profile (Maps) optimization & local citation building",
          "Monthly transparent Search Console report: impressions, clicks, ranks & leads",
        ],
      },
    ],
    workflowSteps: [
      { name: "Deep Indexing & Competitor Audit", text: "We inspect Google Search Console, crawl errors, competitor keywords, and speed bottlenecks across mobile and desktop." },
      { name: "Technical, Schema & Core Web Vitals Fix", text: "We resolve crawl blockers, deploy rich Schema.org enhancements, fix canonicals, and optimize page load speed." },
      { name: "Service & Location Content Authority", text: "We publish genuinely helpful service, FAQ, and regional pages targeting high-intent commercial searches without spam." },
      { name: "Tracking, Reporting & Iteration", text: "Every month you see real Google Search Console growth, keyword movement, phone calls, and WhatsApp enquiries." },
    ],
    faqs: [
      {
        question: "Website ki SEO karani hai — kitne din me Google me ranking aati hai?",
        answer:
          "Technical indexing fixes, Google Search Console enhancements, and Google Maps improvements start showing measurable jumps within 2 to 4 weeks. Competitive national organic keywords compound strongly over 3 to 6 months with consistent, 100% white-hat SEO that stays safe from Google updates.",
      },
      {
        question: "Are all your SEO techniques 100% legal and Google-policy compliant?",
        answer:
          "Yes, strictly 100% white-hat. We never use spammy backlinks, hidden text, fake reviews, or thin doorway pages that trigger Google manual penalties. We build genuine technical speed, authoritative Schema.org markup, and helpful content that compounds safely long-term.",
      },
    ],
    relatedServiceSlug: "digital-marketing",
    keywords: [
      "SEO services India",
      "website ki SEO karani hai",
      "local SEO near me India",
      "Google Search Console indexing fix",
      "AEO GEO AI search optimization India",
      "best affordable SEO company India",
    ],
  },
  {
    slug: "instagram-facebook-google-ads-marketing",
    shortTitle: "Instagram, Facebook & Google Ads",
    category: "Performance Marketing & Social Media Ads",
    seoTitle: "Instagram, Facebook & Google Ads Agency India",
    metaDescription:
      "Generate daily WhatsApp leads, calls & sales with targeted Instagram Ads, Facebook (Meta) Ads, Google Search Ads & creative branding at low budgets by MLHK Infotech.",
    heroEyebrow: "Instagram Ads • Facebook (Meta) Ads • Google Search Ads",
    heroHeadline: "Turn Instagram, Facebook & Google Ads Into",
    heroHighlight: "Daily Leads.",
    heroSummary:
      "Stop burning ad budget on random 'Boost Post' clicks. We set up proper Meta Pixel & Google Conversion Tracking, design scroll-stopping Hindi/English creatives, and build WhatsApp & landing-page funnels that deliver real customer enquiries in your city or across all of India.",
    startingPriceInr: "₹10,000 / mo",
    minPriceNumeric: 10000,
    maxPriceNumeric: 35000,
    deliveryTime: "Campaigns live in 48–72 hours",
    problemsSolved: [
      {
        problem: "Boosting Instagram posts gets likes from random cities but zero real buyers",
        fix: "We run Meta Ads Manager lead & WhatsApp conversion campaigns with hyper-precise pin-code, city, interest, and lookalike targeting.",
      },
      {
        problem: "Agencies hide actual ad spend or send confusing impression screenshots instead of leads",
        fix: "Your ad account stays in your name — you pay Meta/Google directly and get clear weekly cost-per-lead (CPL) & ROI reports.",
      },
      {
        problem: "Ads bring clicks, but poor graphics or slow landing pages kill conversions",
        fix: "Our in-house Red Xerox creative wing designs high-converting reels/posters and fast dedicated landing pages under one roof.",
      },
    ],
    packages: [
      {
        name: "Local Lead Engine (Meta + WhatsApp)",
        price: "₹10,000 / month + ad spend",
        bestFor: "Shops, clinics, salons, real estate, schools & local services in any Indian city",
        features: [
          "Instagram & Facebook Lead / Click-to-WhatsApp Ads setup & optimization",
          "8–12 custom branded ad creatives (English / Hindi / Hinglish)",
          "Pin-code & radius targeting around your exact service areas",
          "Weekly lead quality & cost-per-enquiry WhatsApp report",
        ],
      },
      {
        name: "Full-Funnel Growth (Meta + Google + Landing Page)",
        price: "₹18,000 / month + ad spend",
        bestFor: "E-commerce stores, B2B companies, coaching brands & pan-India advertisers",
        features: [
          "Google Search & Call Ads for high-intent buyers actively searching now",
          "Instagram/Facebook retargeting + conversion API (CAPI) tracking",
          "Custom high-speed conversion landing page with WhatsApp automation",
          "A/B testing creatives & keywords every week to lower cost per customer",
        ],
      },
    ],
    workflowSteps: [
      { name: "Offer & Audience Strategy", text: "We study your margins, target cities/states, and customer language (Hindi/English) to craft an irresistible offer." },
      { name: "Creatives, Pixel & Landing Page", text: "We design sharp ad visuals/copy, install Meta Pixel & Google Tag conversion events, and connect instant WhatsApp/CRM capture." },
      { name: "Controlled Launch & Testing", text: "We launch structured ad sets to test hooks and audiences without wasting budget on broad guesses." },
      { name: "Scale Winners & Cut Waste", text: "We pause underperforming ads weekly, scale winning creatives, and send transparent ROI reporting." },
    ],
    faqs: [
      {
        question: "Instagram aur Facebook ads se daily WhatsApp leads kaise milenge?",
        answer:
          "We run structured Click-to-WhatsApp and Lead Form campaigns inside Meta Ads Manager (never basic Boost Post), paired with clean Hindi/English creatives and location targeting so genuine buyers in your target cities message your WhatsApp directly.",
      },
      {
        question: "What minimum ad budget do I need to start Instagram, Facebook, or Google Ads?",
        answer:
          "Local businesses can start seeing measurable leads with as little as ₹300–₹500 per day in direct ad spend paid to Meta or Google, plus our transparent monthly management fee starting at ₹10,000.",
      },
    ],
    relatedServiceSlug: "digital-marketing",
    keywords: [
      "Instagram Facebook ads agency India",
      "Meta ads lead generation company India",
      "Google Ads management low cost India",
      "social media marketing agency Indore MP India",
      "WhatsApp lead generation ads India",
    ],
  },
  {
    slug: "mobile-app-development-india",
    shortTitle: "Android & Mobile App Development",
    category: "Mobile Application Engineering",
    seoTitle: "Affordable Mobile & Android App Development India",
    metaDescription:
      "Want to build a fast Android or business mobile app on a realistic budget? MLHK Infotech engineers scalable mobile apps with admin panels, REST APIs & Play Store launch.",
    heroEyebrow: "Native Android • Admin Panels • API-First Architecture",
    heroHeadline: "Reliable Mobile Apps Built for Real",
    heroHighlight: "Indian Users.",
    heroSummary:
      "From customer e-commerce and delivery apps to offline-ready field-staff and coaching apps — we engineer lightweight, crash-free Android applications with complete web admin dashboards and secure cloud APIs at transparent pricing.",
    startingPriceInr: "₹45,000",
    minPriceNumeric: 45000,
    maxPriceNumeric: 180000,
    deliveryTime: "6 – 10 Weeks",
    problemsSolved: [
      {
        problem: "Slow, heavy apps that crash on budget Android phones or fail in low-network areas",
        fix: "We engineer lean native Android apps optimized for entry-level smartphones and intermittent 4G rural connectivity.",
      },
      {
        problem: "Getting an app built without an admin panel to manage users, orders, or notifications",
        fix: "Every mobile app ships with a full web admin dashboard, role-based permissions, push notifications, and real-time analytics.",
      },
      {
        problem: "Unclear advice on whether you actually need an app or a cheaper PWA web app",
        fix: "We give honest architectural guidance upfront — if a lightweight web app saves you 50% cost and launches faster, we tell you first.",
      },
    ],
    packages: [
      {
        name: "Business / Utility Android App",
        price: "₹45,000 – ₹75,000",
        bestFor: "Field staff tracking, dealer ordering, clinic booking & service businesses",
        features: [
          "Native Android application with clean Material UI & token authentication",
          "Web Admin Panel to manage users, entries, orders & push alerts",
          "Secure REST API backend & Play Store submission support",
        ],
      },
      {
        name: "E-Commerce / Multi-Role Platform App",
        price: "₹80,000 – ₹1,60,000",
        bestFor: "Online stores, delivery platforms, coaching apps & multi-vendor startups",
        features: [
          "Customer app + Admin dashboard + UPI/Razorpay payment gateway",
          "Live order/status tracking, GST invoicing & WhatsApp/SMS alerts",
          "Scalable cloud database, crash monitoring & post-launch support window",
        ],
      },
    ],
    workflowSteps: [
      { name: "Workflow & Cost Assessment", text: "We map every user screen, backend API, and tell you honestly whether a native Android app or PWA fits your budget best." },
      { name: "Clickable UI Prototype", text: "Review and approve every screen flow before full engineering starts so there are zero surprises." },
      { name: "API + Android Engineering", text: "Weekly APK test builds delivered to your phone alongside your live web admin dashboard." },
      { name: "Play Store Launch & Maintenance", text: "Device testing, Google Play Store listing compliance, crash analytics, and full source-code handover." },
    ],
    faqs: [
      {
        question: "Mobile app banwana hai — kitna cost aur time lagta hai?",
        answer:
          "A custom business Android app with an admin panel and secure API starts around ₹45,000–₹75,000 and takes 6 to 8 weeks. E-commerce or multi-role apps with payments and tracking range from ₹80,000 to ₹1,60,000 over 8 to 10 weeks.",
      },
      {
        question: "Can my mobile app share the same database as my website?",
        answer:
          "Yes! We design API-first architectures so your website, Android app, and admin dashboard all sync from one unified real-time database.",
      },
    ],
    relatedServiceSlug: "mobile-app-development",
    keywords: [
      "mobile app banwana hai",
      "affordable Android app development company India",
      "mobile app developer near me",
      "Android app development cost India",
      "e-commerce app developer Indore MP India",
    ],
  },
  {
    slug: "all-in-one-digital-it-partner",
    shortTitle: "All-in-One Digital & IT Solution",
    category: "Complete End-to-End IT & Digital Partner",
    seoTitle: "All-in-One Digital & IT Solution Company in India",
    metaDescription:
      "One trusted partner for every digital & IT need — websites, editing, mobile apps, SEO, Instagram/Facebook/Google Ads, CRM/ERP, AI automation, branding & 24/7 support at India's best quality-to-price ratio.",
    heroEyebrow: "Web • App • SEO • Meta/Google Ads • ERP • AI • Support",
    heroHeadline: "One Trusted Partner for Every",
    heroHighlight: "Digital & IT Problem.",
    heroSummary:
      "Tired of coordinating five different freelancers — one for your website, another for Instagram ads, someone else for SEO, and nobody answering when the server goes down? MLHK Infotech solves every digital challenge under one accountable roof at India's best value.",
    startingPriceInr: "₹8,000+",
    minPriceNumeric: 8000,
    maxPriceNumeric: 150000,
    deliveryTime: "Flexible Project & Retainer Plans",
    problemsSolved: [
      {
        problem: "Web developer blames the SEO agency, SEO blames hosting, and Ads agency blames the landing page",
        fix: "One unified engineering & marketing team owns the entire stack — website speed, schema, ad creatives, CRM leads, and server uptime.",
      },
      {
        problem: "Small businesses in Tier 2–5 cities & villages struggle to find trustworthy, affordable IT guidance",
        fix: "Direct WhatsApp/call access to founder Hariom Vishwkarma in Hindi or English, official GST invoicing, and zero-jargon transparent quotes.",
      },
      {
        problem: "Manual WhatsApp replies, Excel billing, and missed customer follow-ups eat up 3 hours daily",
        fix: "We connect your website, Instagram/FB ads, GST billing, and WhatsApp Business API into one automated workflow.",
      },
    ],
    packages: [
      {
        name: "Complete Small Business Launch Kit",
        price: "₹25,000 – ₹45,000",
        bestFor: "New or growing Indian businesses going fully digital in one step",
        features: [
          "Custom Logo/Brand Kit + Fast Mobile Website + Domain & SSL",
          "Google Business Profile setup + Local 'Near Me' SEO schema",
          "First Instagram & Facebook Lead Ad campaign setup + WhatsApp CRM",
        ],
      },
      {
        name: "Enterprise Digital Transformation Suite",
        price: "Custom Fixed Quote",
        bestFor: "Established SMEs, factories, multi-city retail & scaling startups",
        features: [
          "Custom Web Platform + Native Android App + GST CRM/ERP Dashboard",
          "AI WhatsApp & workflow automation + Cybersecurity hardening",
          "Ongoing pan-India SEO, Meta/Google Ads & 24/7 priority SLA support",
        ],
      },
    ],
    workflowSteps: [
      { name: "Tell Us Your Business Problem", text: "You don't need technical jargon — just message us on WhatsApp what you want to achieve or fix." },
      { name: "Honest Roadmap & Lowest-Waste Quote", text: "We recommend only what genuinely drives revenue or saves time, with clear INR pricing and milestones." },
      { name: "Unified Execution Under One Team", text: "Design, code, SEO, ads, and cloud security are engineered together so every piece amplifies the others." },
      { name: "Long-Term Partnership", text: "We stay accountable after launch with monitoring, updates, and direct support whenever your business expands." },
    ],
    faqs: [
      {
        question: "Kya MLHK Infotech website, app, SEO, Instagram/FB ads aur IT support sab ek saath handle karta hai?",
        answer:
          "Haan! MLHK Infotech ek complete all-in-one IT & digital partner hai — naya website banana, purani website edit/fix karna, SEO & Google ranking, Instagram/Facebook/Google Ads, Android mobile apps, CRM/ERP/GST software, graphic branding, AI automation, aur 24/7 support sab ek hi team handle karti hai.",
      },
      {
        question: "How can MLHK Infotech offer the lowest cost with high enterprise quality?",
        answer:
          "We operate lean from Shajapur & Indore (MP) with 100% in-house engineers, zero middleman commissions, and modern serverless Cloudflare infrastructure — passing 40–60% cost savings directly to Indian businesses without ever compromising code quality.",
      },
    ],
    relatedServiceSlug: "enterprise-systems",
    keywords: [
      "all in one IT company India",
      "complete digital solution web app marketing IT",
      "low cost best quality IT company India",
      "digital marketing website app one company India",
      "small business digitization India",
    ],
  },
] as const;

export function getSolutionPage(slug: string): SolutionPageData | undefined {
  return SOLUTION_PAGES.find((s) => s.slug === slug);
}
