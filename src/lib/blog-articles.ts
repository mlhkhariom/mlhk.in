/**
 * Flagship Editorial Blog Library & Helpers for MLHK Infotech (https://mlhk.in).
 *
 * Combines database-managed CMS posts (`blog_posts` in Cloudflare D1) with rich,
 * verified evergreen engineering & digital-growth articles so `/blog`, `/blog/[slug]`,
 * `/feed.xml`, and `/sitemap.xml` are always complete, fast, and E-E-A-T rich.
 * Any post published in Admin CMS with the same slug automatically overrides the default.
 */

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  content: string;
  tags: readonly string[];
  faqs?: readonly { question: string; answer: string }[];
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
  source: "cms" | "editorial";
}

export interface DbBlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  status: string | null;
  publishedAt: string | null;
  createdAt?: string | null;
}

export const BLOG_COVER_PRESETS = [
  { label: "Engineering Hub", src: "/images/showcase/studio-hub.jpg" },
  { label: "SEO & Growth Analytics", src: "/images/showcase/seo-growth.jpg" },
  { label: "Mobile App Craft", src: "/images/showcase/mobile-app.jpg" },
  { label: "GST ERP Dashboard", src: "/images/showcase/erp-dashboard.jpg" },
  { label: "E-Commerce Storefront", src: "/images/showcase/case-iksc.jpg" },
  { label: "Solar & Field Ops", src: "/images/showcase/case-erotix.jpg" },
  { label: "Retail & Publishing", src: "/images/showcase/case-ailaptop.jpg" },
] as const;

export const EDITORIAL_ARTICLES: readonly BlogArticle[] = [
  {
    id: "editorial-website-cost-india-2026",
    slug: "website-development-cost-india-2026-guide",
    title: "Website Development Cost in India (2026): Honest Breakdown for Small Businesses & Startups",
    excerpt:
      "Confused by quotes ranging from ₹4,999 to ₹5,00,000? Here is our transparent Indian engineering breakdown of what a fast, SEO-ready business website, e-commerce store, or custom portal actually costs.",
    category: "Web Engineering",
    coverImage: "/images/showcase/studio-hub.jpg",
    publishedAt: "2026-11-10T09:00:00.000Z",
    tags: ["Website Cost India", "Next.js", "Small Business", "SEO"],
    relatedServiceHref: "/solutions/website-development-cost-india",
    relatedServiceLabel: "Compare Website Packages",
    source: "editorial",
    faqs: [
      {
        question: "Why do ₹5,000 websites fail to rank on Google?",
        answer:
          "Ultra-cheap template websites usually run on overloaded shared hosting with heavy unoptimized plugins, duplicate content, missing schema markup, and 5+ second mobile load times — causing Google to rank faster competitors higher.",
      },
      {
        question: "Does MLHK Infotech charge monthly fees to keep my website live?",
        answer:
          "No. You pay a transparent one-time engineering fee, receive 100% source-code ownership, and only pay your own domain renewal (~₹900/yr) and optional maintenance if you want monthly updates.",
      },
    ],
    content: `
      <h2>Why Website Pricing in India Feels Confusing</h2>
      <p>Every week, business owners from Indore, Shajapur, Delhi, Mumbai, and Tier-3 district towns ask us the exact same question: <strong>“One freelancer quoted ₹5,000, another agency quoted ₹2.5 lakh — what is the fair price for a proper business website in India?”</strong></p>
      <p>The short answer is simple: price depends on whether you are buying a copy-pasted template on slow shared hosting or a custom-engineered, mobile-first business system built to rank on Google and generate WhatsApp inquiries.</p>

      <h2>2026 Transparent Price Ranges in India (INR)</h2>
      <ul>
        <li><strong>Starter Business Website (₹15,000 – ₹25,000):</strong> 5–8 custom pages, mobile-first design, Cloudflare India Edge speed (&lt;1 second load), WhatsApp CTA, Google Search Console setup, and Local Business JSON-LD schema.</li>
        <li><strong>Website Redesign &amp; Speed Rescue (₹8,000 – ₹22,000):</strong> Rebuilding a slow WordPress or outdated HTML site without losing existing Google rankings, fixing Core Web Vitals, and modernizing conversion forms.</li>
        <li><strong>E-Commerce / Online Dukaan (₹28,000 – ₹65,000):</strong> Product catalog, Razorpay/UPI checkout, GST invoice PDFs, Shiprocket delivery sync, and WhatsApp order confirmations.</li>
        <li><strong>Custom CRM / GST ERP Web App (₹45,000 – ₹1,40,000):</strong> Role-based dashboards for leads, billing, stock tracking, and multi-branch staff without recurring per-user SaaS charges.</li>
      </ul>

      <h2>Hidden Costs You Must Ask About Before Hiring Any Agency</h2>
      <p>Always ask four questions before paying an advance: (1) Will the domain be registered in my own name? (2) Do I get full source-code ownership? (3) What is the verified mobile PageSpeed score? (4) Is GST invoicing provided for B2B tax credit?</p>
      <blockquote><p>At MLHK Infotech, every project ships with 100% client IP ownership, GSTIN 23CHLPV2868R1CJ invoicing, and zero monthly hostage fees.</p></blockquote>
    `,
  },
  {
    id: "editorial-local-seo-tier2-tier3-india",
    slug: "local-seo-google-maps-ranking-guide-india",
    title: "How Tier-2 & Tier-3 Businesses in India Rank #1 on Google Search & Maps ('Near Me' SEO Guide)",
    excerpt:
      "A practical, white-hat playbook for shops, clinics, coaching institutes, hotels, and factories across Indian cities and towns to dominate local 'near me' searches and generate daily WhatsApp leads.",
    category: "SEO & Growth",
    coverImage: "/images/showcase/seo-growth.jpg",
    publishedAt: "2026-11-04T09:00:00.000Z",
    tags: ["Local SEO India", "Google Maps", "GEO", "Tier-2 Cities"],
    relatedServiceHref: "/solutions/local-seo-and-google-ranking-india",
    relatedServiceLabel: "Explore Local SEO Plans",
    source: "editorial",
    faqs: [
      {
        question: "How long does Local SEO take to show ranking movement in Tier-2 and Tier-3 cities?",
        answer:
          "Because competition is less saturated than metro hubs, clean technical SEO + Google Business Profile optimization typically produces measurable ranking and call improvements within 30 to 60 days.",
      },
      {
        question: "Do Hindi pages help local businesses rank better in Madhya Pradesh, UP, Rajasthan, and Bihar?",
        answer:
          "Yes. Voice searches and mobile queries in Hindi and Hinglish are growing faster than English searches across North and Central India. Bilingual English + Hindi pages with proper hreflang tags capture both audiences cleanly.",
      },
    ],
    content: `
      <h2>Why 'Near Me' Searches Convert 3x Better Than Cold Ads</h2>
      <p>When a customer in Indore, Bhopal, Ujjain, Jaipur, Lucknow, or Patna types <em>“best coaching near me”</em>, <em>“solar dealer in Shajapur”</em>, or <em>“website banwani hai”</em>, they already have high buying intent. Ranking in the top 3 Google results or the Google Maps pack brings free, high-trust calls every single day.</p>

      <h2>5 Pillars of Real Local SEO (No Black-Hat Shortcuts)</h2>
      <ol>
        <li><strong>Sub-Second Mobile Speed on Jio &amp; Airtel 4G:</strong> Google indexes mobile-first. Hosting on Cloudflare India PoPs (Mumbai, Delhi, Bengaluru, Hyderabad, Kolkata) cuts latency below 30ms.</li>
        <li><strong>Accurate LocalBusiness &amp; Service JSON-LD Schema:</strong> Explicitly declare your GeoCoordinates, areas served, phone number, GST/MSME credentials, and transparent starting prices so Google and AI answer engines trust your entity.</li>
        <li><strong>Bilingual English + Hindi Intent Coverage:</strong> Publish dedicated, helpful pages in both English and Devanagari Hindi connected via <code>hreflang</code> alternates — never auto-translated gibberish.</li>
        <li><strong>Google Business Profile Discipline:</strong> Exact NAP (Name, Address, Phone) consistency, real office/product photos, weekly updates, and prompt replies to genuine customer reviews.</li>
        <li><strong>Direct Conversion Path:</strong> Every city or service page should offer a 30-second inquiry popup and direct WhatsApp button so traffic turns into booked calls.</li>
      </ol>
    `,
  },
  {
    id: "editorial-cloudflare-edge-hosting-india",
    slug: "cloudflare-edge-hosting-vs-cpanel-india",
    title: "Why We Chose Cloudflare Edge Over Traditional cPanel Hosting for Indian Clients",
    excerpt:
      "Shared cPanel servers in Europe take 4–6 seconds to open on Indian mobile data. Learn how Cloudflare Workers & India Edge PoPs deliver sub-30ms speed with zero server patching.",
    category: "Cloud & Infrastructure",
    coverImage: "/images/showcase/case-erotix.jpg",
    publishedAt: "2026-10-18T09:00:00.000Z",
    tags: ["Cloudflare Workers", "Core Web Vitals", "Performance", "D1"],
    relatedServiceHref: "/services/web-development",
    relatedServiceLabel: "Web Engineering Services",
    source: "editorial",
    content: `
      <h2>The Hidden Cost of Cheap Shared cPanel Hosting</h2>
      <p>When a business owner in Shajapur, Indore, or Bhopal asks for a website, 90% of local web designers buy a cheap shared cPanel hosting account. The result? A slow site hosted on a server physically located in Germany or Singapore that takes 4 to 6 seconds to open on an Airtel or Jio phone in India.</p>

      <h2>How Cloudflare India Edge Nodes Change Everything</h2>
      <p>We stopped doing that years ago. Today, every system we build runs directly on Cloudflare's Global Edge network with data centers in Mumbai, Delhi, Chennai, Kolkata, Bengaluru, and Hyderabad. When someone in India visits the site, their browser connects to a local node in under 30 milliseconds.</p>

      <h2>Zero Plugin Hacks &amp; Automatic Traffic Scaling</h2>
      <p>Shared servers crash when PHP updates break, or get hacked through outdated WordPress plugins. Cloudflare Workers and serverless databases (like SQLite D1) have zero servers to patch, automatically absorb viral ad traffic spikes, and include enterprise-grade DDoS protection out of the box.</p>
    `,
  },
  {
    id: "editorial-excel-to-internal-dashboard",
    slug: "replace-excel-sheets-with-custom-gst-erp-dashboard",
    title: "How We Replaced 5 Messy Excel Sheets With One Lightweight Internal GST & CRM Dashboard",
    excerpt:
      "Growing Indian SMEs lose lakhs in missed follow-ups and broken Excel formulas. Here is how a bespoke 4-screen internal web app eliminates chaos without per-seat SaaS bills.",
    category: "Enterprise Software",
    coverImage: "/images/showcase/erp-dashboard.jpg",
    publishedAt: "2026-10-02T09:00:00.000Z",
    tags: ["Custom CRM", "GST ERP", "Indian SME", "Automation"],
    relatedServiceHref: "/services/enterprise-systems",
    relatedServiceLabel: "Enterprise Systems",
    source: "editorial",
    content: `
      <h2>When WhatsApp + Excel Stops Scaling</h2>
      <p>Almost every business doing ₹50 lakh to ₹5 crore in annual turnover in India runs on a fragile combination of WhatsApp messages, paper notebooks, and shared Excel sheets stored in someone's Google Drive. The moment three staff members edit the file at once, version conflicts happen, payments go uncollected, and customer follow-ups slip through the cracks.</p>

      <h2>Why Foreign Enterprise SaaS Fails Local Teams</h2>
      <p>The mistake most business owners make next is buying a bloated foreign SaaS tool. Within two months, staff stop using it because the interface is complicated, packed with corporate jargon, charges ₹2,000+ per user every month, and demands 15 mandatory fields just to log one phone inquiry.</p>

      <h2>The 4-Screen Bespoke Dashboard Blueprint</h2>
      <ol>
        <li><strong>Screen 1 — Live Leads Inbox:</strong> Website forms, popup inquiries, and phone leads land in one clean queue with 1-click WhatsApp reply and pipeline status.</li>
        <li><strong>Screen 2 — Instant GST Invoicing:</strong> Generate CGST/SGST/IGST compliant PDFs and send them straight to the client.</li>
        <li><strong>Screen 3 — Active Orders &amp; Dispatch:</strong> Track project milestones, stock levels, and field staff updates in real time.</li>
        <li><strong>Screen 4 — Pending Payments &amp; Follow-ups:</strong> Automated reminders so no invoice or hot lead is ever forgotten.</li>
      </ol>
    `,
  },
  {
    id: "editorial-native-android-vs-pwa-india",
    slug: "native-android-app-vs-pwa-what-indian-businesses-need",
    title: "Native Android App vs Progressive Web App (PWA): What Indian Businesses Actually Need",
    excerpt:
      "Should you invest ₹60,000+ in a Play Store Android app or launch a sub-second PWA first? Honest technical advice to help you save 60% of your budget.",
    category: "Mobile Engineering",
    coverImage: "/images/showcase/mobile-app.jpg",
    publishedAt: "2026-09-15T09:00:00.000Z",
    tags: ["Android App", "PWA", "Mobile Strategy", "Play Store"],
    relatedServiceHref: "/services/mobile-app-development",
    relatedServiceLabel: "Mobile App Services",
    source: "editorial",
    content: `
      <h2>The Most Expensive Question Founders Forget to Ask</h2>
      <p>A client often calls saying: <em>“Hariom, we need an Android app on Google Play Store.”</em> The first thing we ask is: <strong>“Why do your customers need to download a 40 MB file just to buy from you?”</strong></p>

      <h2>When a Fast PWA Wins Hands-Down</h2>
      <p>In 2026, mobile browser capabilities are extraordinary. A clean Progressive Web App (PWA) built with Next.js installs directly to a phone's home screen, sends notifications, caches offline, and opens in under 1 second directly from a WhatsApp link or Instagram ad — without forcing customers through the Play Store friction wall.</p>

      <h2>When You Truly Need a Native Android App</h2>
      <ul>
        <li><strong>Background GPS Tracking:</strong> Live location logging for field sales, solar site engineers, or local delivery fleets.</li>
        <li><strong>Hardware Connectivity:</strong> Direct Bluetooth thermal printer support for spot GST billing or offline barcode/QR warehouse scanning.</li>
        <li><strong>Daily Repeat Utility:</strong> Coaching student test apps, B2B dealer reorder apps, or subscription milk/grocery delivery apps where users open the app every morning.</li>
      </ul>
    `,
  },
  {
    id: "editorial-whatsapp-business-cloud-api",
    slug: "whatsapp-business-cloud-api-lead-automation-india",
    title: "Automating Business Leads with WhatsApp Business Cloud API: Cut Response Time Under 2 Minutes",
    excerpt:
      "Stop paying middlemen markups on WhatsApp messages. Learn how connecting your website forms directly to Meta's official Cloud API doubles your inquiry closing rate.",
    category: "Automation & AI",
    coverImage: "/images/showcase/case-iksc.jpg",
    publishedAt: "2026-08-25T09:00:00.000Z",
    tags: ["WhatsApp API", "AI Automation", "Lead Generation", "CRM"],
    relatedServiceHref: "/services/ai-automation",
    relatedServiceLabel: "AI & Automation Services",
    source: "editorial",
    content: `
      <h2>Why Speed-to-Lead Wins Indian Customers</h2>
      <p>When someone fills a contact form or clicks an Instagram ad in India, they typically contact 2 or 3 providers. The business that responds politely within 2 minutes wins the conversation over 70% of the time.</p>

      <h2>Direct Meta Cloud API vs Expensive Middleman Tools</h2>
      <p>Most third-party WhatsApp SaaS tools charge hefty monthly platform fees plus a markup on every message. Meta provides the official WhatsApp Business Cloud API directly, where service conversations start free and scale predictably.</p>

      <h2>Our Real Production Automation Flow</h2>
      <p>At MLHK Infotech, we wire your website popup form, CRM database, and billing system directly to secure webhooks. Within 2 seconds of an inquiry: (1) The lead is stored in your Admin CRM with a unique reference ID; (2) Your customer gets a polite WhatsApp acknowledgement; and (3) Your sales team receives an instant ping with a 1-click call button.</p>
    `,
  },
  {
    id: "editorial-instagram-google-ads-roi-india",
    slug: "instagram-facebook-google-ads-roi-playbook-indian-businesses",
    title: "Instagram, Facebook & Google Ads Playbook: How Local Businesses Stop Burning Ad Budget",
    excerpt:
      "Boosting posts blindly wastes money. Learn how pairing hyperlocal Hindi/English creatives with a fast landing page and CRM tracking turns ad spend into verified sales.",
    category: "Digital Marketing",
    coverImage: "/images/showcase/case-ailaptop.jpg",
    publishedAt: "2026-08-05T09:00:00.000Z",
    tags: ["Instagram Ads", "Google Ads", "Performance Marketing", "Lead Gen"],
    relatedServiceHref: "/solutions/instagram-facebook-google-ads-marketing",
    relatedServiceLabel: "Meta & Google Ads Services",
    source: "editorial",
    content: `
      <h2>The #1 Mistake: Clicking 'Boost Post' Without a Funnel</h2>
      <p>Thousands of Indian showrooms, coaching centres, clinics, and D2C brands burn ₹10,000–₹50,000 every month clicking Instagram's Boost button — getting likes from outside their service city and almost zero serious inquiries.</p>

      <h2>The High-ROAS 3-Part Local Ads Formula</h2>
      <ol>
        <li><strong>Geo-Fenced Targeting:</strong> Restrict Meta and Google Ads strictly to your serviceable pin codes, 15–30km city radius, or specific buyer states.</li>
        <li><strong>Clear Local Offer + Bilingual Copy:</strong> Combine conversational Hindi/Hinglish hooks with clear INR pricing anchors so only qualified buyers click.</li>
        <li><strong>Fast Landing Page + CRM Capture:</strong> Send clicks to a sub-second landing page with an instant popup quote form and WhatsApp button — tracking every single lead inside your CRM so you know your exact Cost Per Lead (CPL).</li>
      </ol>
    `,
  },
  {
    id: "editorial-hindi-english-website-bharat-growth",
    slug: "hindi-english-bilingual-website-seo-bharat-growth",
    title: "हिन्दी + English वेबसाइट से अपने शहर और पूरे भारत में कस्टमर कैसे बढ़ाएं? (Bilingual SEO Guide)",
    excerpt:
      "भारत के 60%+ मोबाइल यूज़र्स हिंदी और हिंग्लिश में Google पर सर्च करते हैं। जानिए कैसे हिंदी और अंग्रेज़ी दोनों भाषाओं के पेज बनाकर आप अपने शहर में #1 रैंक और 2x ज़्यादा भरोसेमंद लीड्स पा सकते हैं।",
    category: "Hindi & Regional SEO",
    coverImage: "/images/showcase/studio-hub.jpg",
    publishedAt: "2026-11-15T09:00:00.000Z",
    tags: ["Hindi SEO", "Bharat Digital Growth", "Local Business", "MLHK Infotech"],
    relatedServiceHref: "/hi/locations",
    relatedServiceLabel: "हिन्दी लोकेशन हब देखें",
    source: "editorial",
    content: `
      <h2>आज भारत का हर दूसरा ग्राहक हिंदी में सर्च कर रहा है</h2>
      <p>चाहे आप इंदौर, भोपाल, उज्जैन, शाजापुर, जयपुर, लखनऊ, पटना या किसी भी Tier-2 और Tier-3 शहर में बिज़नेस चलाते हों — आपके ज़्यादातर ग्राहक Google पर बोलकर (Voice Search) या हिंदी/हिंग्लिश में सर्च करते हैं, जैसे <em>“मेरे पास बेस्ट वेबसाइट कंपनी”</em> या <em>“कम बजट में ऐप कैसे बनवाएं”</em>।</p>

      <h2>द्विभाषी (Bilingual English + Hindi) वेबसाइट के 4 बड़े फायदे</h2>
      <ul>
        <li><strong>Google पर डबल रैंकिंग (Double Search Visibility):</strong> सही <code>hreflang="hi-IN"</code> और <code>en-IN</code> टैग्स से आपकी वेबसाइट हिंदी और अंग्रेज़ी दोनों सर्च रिजल्ट्स में ऊपर आती है।</li>
        <li><strong>तुरंत भरोसा (Instant Local Trust):</strong> जब ग्राहक अपनी मातृभाषा में साफ कीमत (₹ में), MSME/GST जानकारी और असली काम देखता है, तो WhatsApp या कॉल करने की संभावना 2 गुना बढ़ जाती है।</li>
        <li><strong>कम प्रतिस्पर्धा (Lower Competition):</strong> अंग्रेज़ी की तुलना में हिंदी के हाई-इंटेंट कीवर्ड्स पर टॉप 3 में आना बहुत तेज़ और किफ़ायती होता है।</li>
        <li><strong>सीधा CRM और WhatsApp कनेक्शन:</strong> MLHK Infotech के हर हिंदी-अंग्रेज़ी पेज से आने वाली इंक्वायरी सीधे आपके एडमिन CRM पैनल में सेव होती है।</li>
      </ul>
      <blockquote><p>MLHK Infotech (शाजापुर HQ व इंदौर हब) पूरे भारत के सभी Tier-1, Tier-2 और Tier-3 शहरों के लिए कम बजट में हाई-क्वालिटी हिंदी + English वेबसाइट, SEO और ऐप बनाता है।</p></blockquote>
    `,
  },
];

/** Strip HTML tags to plain text for word count & search indexing. */
export function stripHtmlToText(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Estimate reading time in minutes (minimum 1 min). */
export function estimateReadingMinutes(htmlOrText: string | null | undefined): number {
  const words = stripHtmlToText(htmlOrText).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Extract h2 headings from HTML to power an automatic Table of Contents. */
export function extractHeadings(html: string | null | undefined): { id: string; text: string }[] {
  if (!html) return [];
  const headings: { id: string; text: string }[] = [];
  const re = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  let index = 0;

  while ((m = re.exec(html)) !== null) {
    const text = stripHtmlToText(m[1]);
    if (!text) continue;
    index++;
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097f]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    headings.push({
      id: base ? `sec-${base}` : `sec-${index}`,
      text,
    });
  }
  return headings;
}

/** Inject deterministic id attributes onto h2 elements so TOC anchor links work cleanly. */
export function injectHeadingIds(html: string | null | undefined): string {
  if (!html) return "";
  let index = 0;
  return html.replace(/<h2(\b[^>]*)>([\s\S]*?)<\/h2>/gi, (_full, attrs: string, inner: string) => {
    const text = stripHtmlToText(inner);
    index++;
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097f]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    const id = base ? `sec-${base}` : `sec-${index}`;
    const cleanAttrs = attrs.replace(/\s+id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    return `<h2${cleanAttrs} id="${id}">${inner}</h2>`;
  });
}

/**
 * Merges live D1 published posts with the evergreen editorial library.
 * Live D1 posts always win on matching slugs and appear newest-first.
 */
export function mergePublishedBlogArticles(dbPosts: readonly DbBlogPostRow[]): BlogArticle[] {
  const cmsArticles: BlogArticle[] = dbPosts
    .filter((p) => p.status === "published" && Boolean(p.slug?.trim()))
    .map((p) => ({
      id: p.id,
      slug: p.slug.trim(),
      title: p.title,
      excerpt: p.excerpt?.trim() || stripHtmlToText(p.content).slice(0, 175),
      category: "Engineering Journal",
      coverImage: p.coverImage?.trim() || "/images/showcase/studio-hub.jpg",
      publishedAt: p.publishedAt || p.createdAt || "2026-10-01T00:00:00.000Z",
      content: p.content || "",
      tags: ["MLHK Infotech", "Engineering", "India"],
      source: "cms",
    }));

  const cmsSlugs = new Set(cmsArticles.map((a) => a.slug));
  const combined = [
    ...cmsArticles,
    ...EDITORIAL_ARTICLES.filter((e) => !cmsSlugs.has(e.slug)),
  ];

  return combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getEditorialArticleBySlug(slug: string): BlogArticle | undefined {
  return EDITORIAL_ARTICLES.find((a) => a.slug === slug);
}
