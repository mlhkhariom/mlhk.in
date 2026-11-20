/**
 * Structured Pan-India & Regional SEO Location Hubs for MLHK Infotech (https://mlhk.in).
 * Every location entry has distinct regional industry context, local areas/towns/villages served,
 * geo-coordinates, Cloudflare Edge PoP info, and genuinely helpful local FAQs (100% white-hat,
 * zero doorway-page duplication).
 */

import { EXTRA_LOCATION_HUBS } from "./seo-locations-extra";

export interface LocationHub {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  regionType: "City" | "AdministrativeArea" | "Country";
  tier: "HQ & Local Base" | "Operating Hub" | "State Hub" | "Metro Hub" | "Tier-2 / Regional Hub" | "Pan-India & Rural";
  lat: number;
  lng: number;
  seoTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSummary: string;
  localEdgePop: string;
  areasCovered: readonly string[];
  localIndustries: readonly { name: string; solution: string }[];
  whyMlhkHere: readonly string[];
  startingPackages: readonly { name: string; price: string; timeline: string; summary: string }[];
  faqs: readonly { question: string; answer: string }[];
  nearbySlugs: readonly string[];
  keywords: readonly string[];
}

const CORE_LOCATION_HUBS: readonly LocationHub[] = [
  {
    slug: "indore",
    name: "Indore",
    shortName: "Indore, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "Operating Hub",
    lat: 22.7196,
    lng: 75.8577,
    seoTitle: "Best IT, Website & App Company in Indore",
    metaDescription:
      "MLHK Infotech is Indore's trusted IT company for custom websites, website redesign, SEO, Instagram & Google Ads, Android apps, and CRM/ERP at low cost with direct founder support.",
    heroEyebrow: "Indore Operating Base • Vijay Nagar & AB Road",
    heroHeadline: "Best IT, Website & App Development Company in",
    heroHighlight: "Indore.",
    heroSummary:
      "From Vijay Nagar startups and Pithampur factories to Sarafa wholesalers and coaching institutes, MLHK Infotech builds high-speed websites, Android apps, local SEO campaigns, and GST ERP systems for Indore businesses at transparent Indian pricing.",
    localEdgePop: "Sub-28ms page loads across Indore via Cloudflare Mumbai & Delhi edge nodes",
    areasCovered: [
      "Vijay Nagar",
      "AB Road",
      "Super Corridor",
      "Palasia",
      "Bhawarkua",
      "Rajwada & Sarafa",
      "Rau",
      "Pithampur Industrial Area",
      "Mhow (Dr. Ambedkar Nagar)",
      "Sanwer",
      "Depalpur",
      "Hatod & Nearby Villages",
    ],
    localIndustries: [
      {
        name: "Pithampur & Sanwer Manufacturing & Logistics",
        solution: "Custom GST billing, inventory ERP, dealer portals, and dispatch tracking dashboards with zero per-user licensing fees.",
      },
      {
        name: "Vijay Nagar Clinics, Coaching Institutes & Startups",
        solution: "High-converting Next.js websites, Google Business Profile Local SEO, WhatsApp lead bots, and Instagram/Facebook Ads.",
      },
      {
        name: "Indore Retail, Jewellery & Wholesale Traders",
        solution: "Fast e-commerce catalogs, Android ordering apps, UPI/Razorpay checkout, and automated WhatsApp order notifications.",
      },
    ],
    whyMlhkHere: [
      "Direct in-person and video consultations from our Indore & Shajapur engineering team — zero middlemen or outsourced trainees.",
      "40–60% more affordable than bloated metro agencies while using the exact same Next.js, React, PostgreSQL, and Cloudflare Edge architecture.",
      "Verified MSME Udyam (UDYAM-MP-44-0005223) and MP GSTIN (23CHLPV2868R1CJ) invoicing for 100% compliant B2B tax credit.",
    ],
    startingPackages: [
      { name: "Business Website + Local SEO", price: "₹15,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Mobile-first custom coded site, Indore local schema, WhatsApp CTA, and Google Search Console setup." },
      { name: "Website Redesign & Speed Fix", price: "₹10,000 – ₹22,000", timeline: "1–2 Weeks", summary: "Upgrade slow WordPress or outdated websites to 95+ Core Web Vitals with fresh UI and SEO preservation." },
      { name: "Android App + Admin Panel", price: "₹45,000 – ₹90,000", timeline: "6–10 Weeks", summary: "Native Android app with secure API backend, role-based dashboard, and Play Store launch." },
      { name: "SEO + Instagram/FB/Google Ads", price: "₹12,000 / month", timeline: "Monthly Growth", summary: "Local Map Pack ranking in Indore, performance ad creatives, and transparent WhatsApp lead reporting." },
    ],
    faqs: [
      {
        question: "Why is MLHK Infotech considered a top IT company in Indore for small and growing businesses?",
        answer:
          "Unlike agencies that charge high corporate overhead and hand projects to interns, MLHK Infotech gives Indore businesses direct architect oversight from founder Hariom Vishwkarma, 100% custom code ownership, GST-compliant billing, and fast WhatsApp support at realistic prices starting from ₹15,000.",
      },
      {
        question: "Can you meet or coordinate for website and app projects in Vijay Nagar, Pithampur, or Rau?",
        answer:
          "Yes. With our operating base in Indore and headquarters in nearby Shajapur, we work seamlessly with clients across Vijay Nagar, Palasia, Super Corridor, Rau, Mhow, and Pithampur via scheduled meetings, Google Meet, and WhatsApp.",
      },
      {
        question: "Do you also edit or redesign existing Indore business websites and run Instagram/Facebook ads?",
        answer:
          "Yes. We regularly rebuild slow websites, fix technical SEO bugs, optimize Google Business Profiles for Indore 'near me' searches, and run targeted Instagram, Facebook, and Google Ads campaigns that generate direct calls and WhatsApp leads.",
      },
    ],
    nearbySlugs: ["madhya-pradesh", "shajapur", "ujjain", "dewas", "bhopal"],
    keywords: [
      "best IT company in Indore",
      "website development company in Indore",
      "web developer in Vijay Nagar Indore",
      "mobile app development company Indore",
      "digital marketing and SEO agency Indore",
      "Instagram Facebook ads agency Indore",
      "affordable software company Indore",
    ],
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    shortName: "Madhya Pradesh (MP)",
    state: "Madhya Pradesh",
    regionType: "AdministrativeArea",
    tier: "State Hub",
    lat: 23.2599,
    lng: 77.4126,
    seoTitle: "Best IT & Software Company in Madhya Pradesh",
    metaDescription:
      "Top MSME & GST registered IT company in Madhya Pradesh serving all 55 districts — Indore, Bhopal, Ujjain, Gwalior, Jabalpur, Shajapur, Dewas & rural MP with websites, apps, SEO & ERP.",
    heroEyebrow: "All 55 Districts of Madhya Pradesh • MSME & MP GSTIN Verified",
    heroHeadline: "Best IT, Web & Digital Marketing Company in",
    heroHighlight: "Madhya Pradesh.",
    heroSummary:
      "Born and registered in Madhya Pradesh, MLHK Infotech delivers custom websites, Android apps, GST billing/ERP software, local SEO, and social media ads across every city, district headquarters, tehsil, and village in MP.",
    localEdgePop: "Low-latency delivery across Airtel, Jio & BSNL networks in all 55 MP districts",
    areasCovered: [
      "Indore & Malwa Belt",
      "Bhopal & Sehore",
      "Shajapur & Agar Malwa",
      "Ujjain & Nagda",
      "Dewas & Ratlam",
      "Gwalior & Chambal",
      "Jabalpur & Mahakoshal",
      "Rewa, Satna & Vindhya",
      "Sagar & Bundelkhand",
      "Mandsaur & Neemuch",
      "Chhindwara, Betul & Narmadapuram",
      "All 55 MP Districts, Tehsils & Villages",
    ],
    localIndustries: [
      {
        name: "Agri-Tech, Mandi Traders & Solar EPC across MP",
        solution: "Offline-capable field apps, GST invoice software, solar site tracking (as built for Erotix Green Energy), and WhatsApp dealer alerts.",
      },
      {
        name: "Schools, Colleges & Coaching Networks",
        solution: "Admission websites, student portals, online fee payment, local SEO ranking, and admission season Facebook/Instagram ad funnels.",
      },
      {
        name: "District Hospitals, Showrooms & SMEs",
        solution: "Fast appointment portals, Google Maps 'near me' optimization, and 24/7 managed website maintenance.",
      },
    ],
    whyMlhkHere: [
      "Registered right in Madhya Pradesh (UDYAM-MP-44-0005223, GSTIN 23CHLPV2868R1CJ) — we understand MP business workflows, local languages (Hindi & English), and realistic budgets.",
      "Zero template lock-in: every business in Tier-1 Indore/Bhopal or a rural tehsil gets the exact same enterprise-grade Next.js & Cloudflare technology.",
      "Complete one-stop solution: website creation, old website editing, SEO, Instagram/Facebook Ads, Android app, and custom ERP under one accountable phone number.",
    ],
    startingPackages: [
      { name: "MP Business Website", price: "₹15,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Custom responsive website engineered to rank across district and state Google searches." },
      { name: "E-Commerce & Online Dukaan", price: "₹28,000 – ₹55,000", timeline: "3–5 Weeks", summary: "Product catalog, UPI/Razorpay checkout, GST bills, and WhatsApp order tracking." },
      { name: "Custom CRM / GST ERP", price: "₹45,000 – ₹1,20,000", timeline: "5–10 Weeks", summary: "Bespoke inventory, billing, staff attendance, and client portal built for your exact operations." },
      { name: "Statewide SEO & Meta/Google Ads", price: "₹12,000 / month", timeline: "Ongoing", summary: "District-wise Google ranking, Instagram Reels/FB lead ads, and bilingual English/Hindi targeting." },
    ],
    faqs: [
      {
        question: "Which cities and districts in Madhya Pradesh does MLHK Infotech serve?",
        answer:
          "We serve all 55 districts of Madhya Pradesh — including Indore, Bhopal, Shajapur, Ujjain, Dewas, Gwalior, Jabalpur, Ratlam, Mandsaur, Neemuch, Sagar, Rewa, Satna, Chhindwara, Sehore, Agar Malwa, and every smaller tehsil and village via direct WhatsApp, phone, and Google Meet collaboration.",
      },
      {
        question: "Can a small town or village business in MP afford custom software or a website?",
        answer:
          "Yes. Our mission is delivering metro-grade quality at honest small-town pricing. Clean, custom-coded business websites start at ₹15,000 with no monthly hostage fees, and you own 100% of the code and domain.",
      },
      {
        question: "Do you provide Hindi and English bilingual websites and ads for Madhya Pradesh audiences?",
        answer:
          "Yes. We design bilingual websites, Hindi-English WhatsApp automation, and regional Instagram/Facebook ad campaigns that resonate directly with Madhya Pradesh customers.",
      },
    ],
    nearbySlugs: ["indore", "shajapur", "bhopal", "ujjain", "dewas", "gwalior", "jabalpur"],
    keywords: [
      "best IT company in MP",
      "best IT company in Madhya Pradesh",
      "software company in Madhya Pradesh",
      "website development company in MP",
      "digital marketing agency Madhya Pradesh",
      "app development company MP",
    ],
  },
  {
    slug: "shajapur",
    name: "Shajapur",
    shortName: "Shajapur, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "HQ & Local Base",
    lat: 23.4273,
    lng: 76.273,
    seoTitle: "Best IT & Website Company in Shajapur, MP",
    metaDescription:
      "Headquartered in Barnawad, Shajapur — MLHK Infotech is Shajapur's #1 MSME-registered IT company for websites, Android apps, SEO, GST billing software, and digital marketing.",
    heroEyebrow: "Registered Headquarters • Barnawad, Shajapur (465226)",
    heroHeadline: "Shajapur's Registered IT & Software Engineering",
    heroHighlight: "Headquarters.",
    heroSummary:
      "Founded in Barnawad, Shajapur in April 2020, MLHK Infotech brings national-level web engineering, mobile apps, e-commerce, and digital marketing right to Shajapur, Shujalpur, Agar Malwa, Kalapipal, Maksi, and nearby villages.",
    localEdgePop: "Local HQ support in Shajapur District + 330+ city global Cloudflare Edge speed",
    areasCovered: [
      "Barnawad (HQ)",
      "Shajapur City",
      "Shujalpur",
      "Kalapipal",
      "Maksi",
      "Bercha",
      "Mohan Barodia",
      "Gulana",
      "Agar Malwa",
      "Susner & Nalkheda",
      "Sarangpur",
      "All Shajapur Tehsils & Gram Panchayats",
    ],
    localIndustries: [
      {
        name: "Local Shops, Showrooms & Hardware/Agri Dealers",
        solution: "Affordable business websites, Google Maps top listing, GST billing dashboards, and WhatsApp catalog ordering.",
      },
      {
        name: "Schools, Colleges & Coaching Centres in Shajapur & Shujalpur",
        solution: "School websites, online admission enquiry forms, fee management portals, and targeted local Facebook/Instagram admission ads.",
      },
      {
        name: "Clinics, Labs & Service Professionals",
        solution: "Fast appointment booking websites, local 'near me' SEO, and clean corporate branding.",
      },
    ],
    whyMlhkHere: [
      "Walk-in and direct founder access right in Shajapur district — no need to travel to Delhi or Mumbai for enterprise-grade IT work.",
      "Official Govt. of India MSME Udyam (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ) registered enterprise.",
      "Honest local budgets with global engineering quality — fast loading even on 4G rural networks.",
    ],
    startingPackages: [
      { name: "Local Business Website", price: "₹12,000 – ₹22,000", timeline: "2 Weeks", summary: "Fast custom website, Google Maps setup, WhatsApp button, and domain/SSL setup." },
      { name: "School / Institute Portal", price: "₹20,000 – ₹45,000", timeline: "3–4 Weeks", summary: "Admissions, notices, results, gallery, and parent enquiry management." },
      { name: "Billing & Shop ERP", price: "₹35,000 – ₹75,000", timeline: "4–8 Weeks", summary: "GST invoicing, stock tracking, customer ledger, and mobile-friendly reports." },
      { name: "Local SEO & Social Ads", price: "₹8,000 – ₹15,000 / mo", timeline: "Monthly", summary: "Rank #1 in Shajapur, Shujalpur & Agar Malwa searches plus Instagram/FB reach." },
    ],
    faqs: [
      {
        question: "Where is MLHK Infotech located in Shajapur?",
        answer:
          "MLHK Infotech is registered at Barnawad, Shajapur, Madhya Pradesh 465226, India, with an operating base in Indore. You can call or WhatsApp directly at +91 91651 00124.",
      },
      {
        question: "Can MLHK Infotech build websites and apps for businesses in Shujalpur, Maksi, Kalapipal, and Agar Malwa?",
        answer:
          "Yes. We work directly with businesses, schools, shops, and agri-traders across the entire Shajapur and Agar Malwa region as well as nearby villages.",
      },
    ],
    nearbySlugs: ["indore", "ujjain", "dewas", "madhya-pradesh", "bhopal"],
    keywords: [
      "best IT company in Shajapur",
      "website developer in Shajapur",
      "software company Shajapur Shujalpur",
      "web design near me Shajapur",
      "digital marketing Shajapur Agar Malwa",
    ],
  },
  {
    slug: "bhopal",
    name: "Bhopal",
    shortName: "Bhopal, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 23.2599,
    lng: 77.4126,
    seoTitle: "Best IT, Website & SEO Company in Bhopal",
    metaDescription:
      "Affordable custom website development, mobile apps, SEO, Meta/Google Ads & enterprise ERP in Bhopal (MP Nagar, Arera Colony, Kolar, Mandideep & Sehore) by MLHK Infotech.",
    heroEyebrow: "Bhopal & Capital Region • MP Nagar to Mandideep",
    heroHeadline: "Custom Web, App & Digital Growth Partner for",
    heroHighlight: "Bhopal.",
    heroSummary:
      "Serving Bhopal's educational institutions, Mandideep industrial units, clinics, real estate developers, and MSMEs with fast websites, custom software, and ROI-driven SEO & social ads.",
    localEdgePop: "Sub-32ms edge response across Bhopal & Mandideep via Cloudflare India PoPs",
    areasCovered: ["MP Nagar", "Arera Colony", "Kolar Road", "Hoshangabad Road", "Bairagarh", "Govindpura Industrial Area", "Mandideep", "Sehore", "Raisen", "Vidisha & Nearby Towns"],
    localIndustries: [
      { name: "Mandideep & Govindpura Industrial Enterprises", solution: "B2B product portals, ISO/export catalogs, ERP inventory trackers, and procurement dashboards." },
      { name: "Real Estate, Healthcare & Hospitality in Bhopal", solution: "High-converting project microsites, lead capture funnels, Google/Meta ads, and WhatsApp follow-up automation." },
      { name: "Colleges, Coaching & Govt-Tender Contractors", solution: "Compliant institutional websites, document portals, and fast maintenance SLAs." },
    ],
    whyMlhkHere: [
      "Direct MP-based engineering team with transparent fixed-price quotes and GST invoicing.",
      "Zero bloated WordPress themes — every Bhopal site is custom-coded for 95+ Google PageSpeed.",
      "End-to-end digital execution: website, mobile app, SEO, Instagram/Facebook ads, and ongoing IT support.",
    ],
    startingPackages: [
      { name: "Corporate Website + SEO", price: "₹15,000 – ₹28,000", timeline: "2–3 Weeks", summary: "Custom coded site with Bhopal local schema and lead tracking." },
      { name: "Website Redesign & Speed Audit", price: "₹10,000 – ₹22,000", timeline: "1–2 Weeks", summary: "Fix slow loading, broken mobile UX, and lost Google rankings." },
      { name: "Android App + Dashboard", price: "₹45,000 – ₹90,000", timeline: "6–10 Weeks", summary: "Full Android app with admin panel and secure REST API." },
    ],
    faqs: [
      { question: "Does MLHK Infotech work with businesses in Bhopal, Mandideep, and Sehore?", answer: "Yes. We build websites, custom ERP/CRM software, Android apps, and run SEO & Meta/Google Ads for clients across MP Nagar, Arera Colony, Kolar, Govindpura, Mandideep, and Sehore." },
      { question: "How much does website development cost in Bhopal?", answer: "A custom-coded business website starts at ₹15,000–₹25,000, while full web apps and e-commerce platforms range from ₹30,000–₹80,000 depending on scope — always with a fixed upfront quote." },
    ],
    nearbySlugs: ["indore", "madhya-pradesh", "shajapur", "ujjain", "jabalpur"],
    keywords: ["best IT company in Bhopal", "website development company Bhopal", "SEO agency Bhopal", "software developer MP Nagar Bhopal", "app development Bhopal"],
  },
  {
    slug: "ujjain",
    name: "Ujjain",
    shortName: "Ujjain, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 23.1765,
    lng: 75.7885,
    seoTitle: "Best IT, Website & App Company in Ujjain",
    metaDescription:
      "MLHK Infotech delivers fast websites, hotel/tour booking portals, Android apps, Google Maps SEO & Instagram ads for businesses in Ujjain, Freeganj, Nagda & Barnagar.",
    heroEyebrow: "Ujjain & Mahakal Corridor • Direct Regional Team",
    heroHeadline: "Websites, Booking Platforms & Local SEO for",
    heroHighlight: "Ujjain.",
    heroSummary:
      "With millions of visitors arriving in Ujjain every year, hotels, tour operators, clinics, educators, and traders need lightning-fast websites and #1 Google Maps visibility — engineered by our nearby Malwa team.",
    localEdgePop: "Ultra-fast mobile loading for tourists and residents across Ujjain & Malwa",
    areasCovered: ["Freeganj", "Nanakheda", "Mahakal Corridor Area", "Madhav Nagar", "Rishi Nagar", "Nagda", "Barnagar", "Mahidpur", "Tarana", "Khachrod & Nearby Villages"],
    localIndustries: [
      { name: "Hotels, Homestays & Travel Operators", solution: "Direct commission-free room booking websites, WhatsApp instant confirmation, and 'near Mahakal' Local SEO." },
      { name: "Ujjain Retail, Sweet/Prasad Brands & Textiles", solution: "Pan-India e-commerce websites with Shiprocket/UPI checkout and Instagram Reels ads." },
      { name: "Universities, Coaching & Healthcare Clinics", solution: "Modern responsive portals, online enquiry CRM, and reputation/SEO growth." },
    ],
    whyMlhkHere: [
      "Founder Hariom Vishwkarma is a Vikram University, Ujjain alumnus — deep roots and local understanding of the Ujjain market.",
      "Direct WhatsApp booking flows that save hotels and travel operators 18–25% OTA commissions.",
      "Transparent low-cost packages with full code ownership and GST invoicing.",
    ],
    startingPackages: [
      { name: "Hotel / Business Website", price: "₹15,000 – ₹28,000", timeline: "2–3 Weeks", summary: "Direct WhatsApp & online enquiry website optimized for Ujjain travel and local searches." },
      { name: "Local Google Maps & SEO", price: "₹10,000 / month", timeline: "Monthly", summary: "Rank higher for Ujjain near-me searches, hotels, clinics, and services." },
      { name: "E-Commerce & Android App", price: "₹35,000 – ₹85,000", timeline: "4–8 Weeks", summary: "Sell nationwide from Ujjain with UPI payments and order tracking." },
    ],
    faqs: [
      { question: "Can MLHK Infotech build a direct hotel or tour booking website in Ujjain?", answer: "Yes. We engineer fast direct-booking websites with room galleries, WhatsApp instant inquiry, Razorpay/UPI advance payment, and strong Local SEO so Ujjain hotels and travel agencies capture direct guests without heavy aggregator commissions." },
      { question: "Do you serve Nagda, Barnagar, Tarana, and nearby towns around Ujjain?", answer: "Yes, we serve all of Ujjain district including Nagda, Barnagar, Mahidpur, Tarana, Khachrod, and surrounding villages." },
    ],
    nearbySlugs: ["indore", "shajapur", "dewas", "madhya-pradesh"],
    keywords: ["best IT company in Ujjain", "website development Ujjain", "hotel website developer Ujjain", "digital marketing SEO Ujjain", "software company Ujjain"],
  },
  {
    slug: "dewas",
    name: "Dewas",
    shortName: "Dewas, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 22.9676,
    lng: 76.0534,
    seoTitle: "Best IT, Website & ERP Company in Dewas",
    metaDescription:
      "Custom websites, industrial ERP/inventory software, GST billing, SEO & digital marketing in Dewas, Industrial Area, Sonkatch & Bagli by MLHK Infotech.",
    heroEyebrow: "Dewas Industrial & Commercial Corridor",
    heroHeadline: "Industrial ERP, Websites & Digital Growth for",
    heroHighlight: "Dewas.",
    heroSummary:
      "Tailored software engineering for Dewas's manufacturing units, pharma & auto ancillaries, retail showrooms, and local enterprises — delivered quickly by our Malwa engineering team.",
    localEdgePop: "High-uptime edge hosting & internal ERP access across Dewas Industrial Area",
    areasCovered: ["Dewas Industrial Area 1–3", "AB Road Dewas", "Civil Lines", "Vikas Nagar", "Sonkatch", "Bagli", "Kannod", "Khategaon", "Tonk Khurd & Nearby Villages"],
    localIndustries: [
      { name: "Manufacturing & Auto/Pharma Ancillaries", solution: "Custom production tracking, quality checklists, vendor portals, and GST billing ERPs." },
      { name: "Local Retail, Schools & Showrooms", solution: "Clean mobile-first websites, local SEO ranking, and Instagram/Facebook lead generation." },
    ],
    whyMlhkHere: [
      "Located right on the Indore–Dewas–Shajapur corridor for rapid communication and dependable post-launch support.",
      "Zero foreign SaaS license lock-in — own your factory ERP and website code 100%.",
    ],
    startingPackages: [
      { name: "Industrial / B2B Website", price: "₹15,000 – ₹28,000", timeline: "2–3 Weeks", summary: "Product catalog, RFQ enquiry form, ISO credentials, and B2B Google SEO." },
      { name: "Custom Factory / Stock ERP", price: "₹45,000 – ₹1,10,000", timeline: "5–10 Weeks", summary: "Tailored billing, dispatch, inventory, and staff role dashboards." },
    ],
    faqs: [
      { question: "Can MLHK Infotech build custom ERP or billing software for factories in Dewas?", answer: "Yes. We engineer custom web and Android ERP modules for inventory, dispatch, GST invoicing, and multi-role staff access without recurring per-seat SaaS charges." },
    ],
    nearbySlugs: ["indore", "shajapur", "ujjain", "madhya-pradesh"],
    keywords: ["best IT company in Dewas", "website developer Dewas", "ERP software company Dewas", "digital marketing Dewas"],
  },
  {
    slug: "gwalior",
    name: "Gwalior",
    shortName: "Gwalior, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 26.2183,
    lng: 78.1828,
    seoTitle: "Best IT, Website & App Company in Gwalior",
    metaDescription:
      "Custom website design, Android app development, SEO, Instagram/Facebook Ads & CRM software for Gwalior, Morena, Shivpuri & Chambal region by MLHK Infotech.",
    heroEyebrow: "Gwalior & Chambal Division",
    heroHeadline: "Websites, Mobile Apps & Digital Marketing for",
    heroHighlight: "Gwalior.",
    heroSummary:
      "Helping Gwalior's coaching institutes, stone/manufacturing exporters, clinics, and retail brands grow online with lightning-fast websites, SEO, and performance marketing.",
    localEdgePop: "Sub-25ms delivery via Cloudflare New Delhi edge PoP",
    areasCovered: ["City Centre", "Lashkar", "Morar", "Thatipur", "Malanpur Industrial Area", "Morena", "Bhind", "Shivpuri", "Datia", "Dabra & Nearby Towns"],
    localIndustries: [
      { name: "Education, Coaching & Colleges", solution: "Fast admission websites, student CRM, and admission-season Meta & Google Ads." },
      { name: "Malanpur Industries & Exporters", solution: "Global-speed B2B websites, catalog downloads, and technical SEO for national buyers." },
    ],
    whyMlhkHere: [
      "MP-registered GST company with transparent low-cost engineering and direct WhatsApp/Meet workflow.",
      "Complete digital support: new websites, old site editing, SEO, and social media advertising.",
    ],
    startingPackages: [
      { name: "Business Website + SEO", price: "₹15,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Custom responsive website built for fast Gwalior & national ranking." },
      { name: "Android App + Admin Panel", price: "₹45,000 – ₹90,000", timeline: "6–10 Weeks", summary: "End-to-end Android application with admin controls and analytics." },
    ],
    faqs: [
      { question: "How does MLHK Infotech deliver software projects for clients in Gwalior?", answer: "We collaborate through structured weekly demos on Google Meet, direct WhatsApp access to lead engineers, shared staging previews, and full handover documentation — serving Gwalior, Malanpur, Morena, Shivpuri, and Datia seamlessly." },
    ],
    nearbySlugs: ["madhya-pradesh", "bhopal", "indore", "delhi-ncr"],
    keywords: ["best IT company in Gwalior", "website development Gwalior", "SEO agency Gwalior", "app developer Gwalior"],
  },
  {
    slug: "jabalpur",
    name: "Jabalpur",
    shortName: "Jabalpur, MP",
    state: "Madhya Pradesh",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 23.1815,
    lng: 79.9864,
    seoTitle: "Best IT, Website & SEO Company in Jabalpur",
    metaDescription:
      "Custom websites, Android apps, SEO, Meta/Google Ads & ERP systems for Jabalpur, Katni, Mandla, Seoni & Mahakoshal businesses by MLHK Infotech.",
    heroEyebrow: "Jabalpur & Mahakoshal Region",
    heroHeadline: "High-Speed Websites, Apps & SEO for",
    heroHighlight: "Jabalpur.",
    heroSummary:
      "Serving Jabalpur's healthcare providers, marble & garment traders, educational institutions, and MSMEs with reliable, low-cost custom software and measurable digital marketing.",
    localEdgePop: "Sub-35ms edge response across Jabalpur & Katni on Cloudflare India PoPs",
    areasCovered: ["Napier Town", "Civil Lines", "Wright Town", "Vijay Nagar Jabalpur", "Adhartal", "Katni", "Mandla", "Seoni", "Narsinghpur", "Damoh & Nearby Towns"],
    localIndustries: [
      { name: "Garment, Marble & Agro Traders", solution: "B2B e-commerce catalogs, GST billing software, and pan-India SEO." },
      { name: "Hospitals, Clinics & Coaching Centres", solution: "Fast appointment portals, Google Maps Local SEO, and targeted Instagram/Facebook Ads." },
    ],
    whyMlhkHere: [
      "Direct Madhya Pradesh IT partner with Udyam & GST compliance and honest fixed pricing.",
      "Zero template bloat — custom engineered for top Core Web Vitals and long-term Google ranking.",
    ],
    startingPackages: [
      { name: "Custom Website + Local SEO", price: "₹15,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Fast mobile-first site engineered for Jabalpur & pan-India search discovery." },
      { name: "Digital Marketing & Ads", price: "₹12,000 / month", timeline: "Monthly", summary: "Google Search, Instagram & Facebook lead generation with weekly reporting." },
    ],
    faqs: [
      { question: "Can MLHK Infotech redesign an existing Jabalpur business website and improve its Google rank?", answer: "Yes. We audit your current website, fix Core Web Vitals and technical SEO blockers, refresh the design without losing existing URL equity, and set up automated Google Search Console indexing." },
    ],
    nearbySlugs: ["madhya-pradesh", "bhopal", "indore", "mumbai", "india"],
    keywords: ["best IT company in Jabalpur", "website development company Jabalpur", "digital marketing Jabalpur", "software company Jabalpur Katni"],
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    shortName: "Delhi NCR",
    state: "Delhi",
    regionType: "City",
    tier: "Metro Hub",
    lat: 28.6139,
    lng: 77.209,
    seoTitle: "Best Affordable IT, Web & App Company for Delhi NCR",
    metaDescription:
      "Get metro-grade Next.js websites, Android apps, SEO, Meta/Google Ads & SaaS/ERP for Delhi, Noida & Gurugram at 50% lower agency cost with MLHK Infotech.",
    heroEyebrow: "New Delhi • Noida • Gurugram • Faridabad • Ghaziabad",
    heroHeadline: "Enterprise Web, App & AI Engineering for",
    heroHighlight: "Delhi NCR.",
    heroSummary:
      "Why pay ₹3–10 lakh to bloated Delhi NCR agencies when you can get faster Next.js websites, custom CRM/ERP, Android apps, and ROI-focused SEO & Ads with direct senior architect accountability at half the cost?",
    localEdgePop: "Sub-18ms edge loads via Cloudflare New Delhi PoP",
    areasCovered: ["New Delhi", "South & West Delhi", "Connaught Place", "Noida & Greater Noida", "Gurugram (Cyber City, Sohna Rd)", "Faridabad", "Ghaziabad", "Sonipat & NCR Towns"],
    localIndustries: [
      { name: "D2C Brands, Startups & SaaS Founders", solution: "MVP web apps, Next.js storefronts, Meta/Google performance ads, and AI WhatsApp automation." },
      { name: "B2B Exporters, Logistics & Clinics", solution: "High-authority SEO websites, CRM lead pipelines, and zero-lock-in cloud hosting." },
    ],
    whyMlhkHere: [
      "Save 45–60% vs. NCR agency retainers while shipping cleaner TypeScript, Next.js, and Cloudflare Edge code.",
      "Direct founder communication, weekly sprint demos, GST invoice, and 100% IP transfer.",
    ],
    startingPackages: [
      { name: "Startup / Corporate Website", price: "₹18,000 – ₹35,000", timeline: "2–3 Weeks", summary: "Custom Next.js site with 95+ Lighthouse, full schema, and CRM lead hooks." },
      { name: "SaaS / Custom CRM Platform", price: "₹55,000 – ₹1,40,000", timeline: "5–10 Weeks", summary: "Auth, role-based dashboards, Razorpay/Stripe billing, and scalable SQL." },
      { name: "SEO + Meta & Google Ads", price: "₹15,000 / month", timeline: "Monthly", summary: "High-intent search ranking plus Instagram/Facebook lead funnels for NCR markets." },
    ],
    faqs: [
      { question: "Why do Delhi, Noida, and Gurugram companies hire MLHK Infotech remotely?", answer: "NCR businesses get senior-architect execution, modern Next.js/Cloudflare tech, GST billing, and direct WhatsApp/Meet responsiveness without paying expensive metro office overheads or getting handed off to junior interns." },
    ],
    nearbySlugs: ["india", "jaipur", "lucknow", "mumbai", "indore"],
    keywords: ["affordable web development company Delhi NCR", "best IT company Noida Gurugram", "SEO agency Delhi", "website redesign Delhi", "Instagram ads agency Delhi NCR"],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    shortName: "Mumbai & Maharashtra",
    state: "Maharashtra",
    regionType: "City",
    tier: "Metro Hub",
    lat: 19.076,
    lng: 72.8777,
    seoTitle: "Best Affordable Web, App & SEO Company for Mumbai",
    metaDescription:
      "High-speed websites, e-commerce, Android apps, SEO, Instagram/Facebook Ads & custom ERP for Mumbai, Navi Mumbai, Thane, Nagpur & Maharashtra at honest pricing.",
    heroEyebrow: "Mumbai • Navi Mumbai • Thane • Maharashtra",
    heroHeadline: "High-Converting Web, App & Digital Solutions for",
    heroHighlight: "Mumbai.",
    heroSummary:
      "Delivering sub-20ms Next.js websites, D2C e-commerce platforms, custom business apps, and performance marketing across Mumbai, Navi Mumbai, Thane, Nashik, and Nagpur without metro agency markups.",
    localEdgePop: "Sub-18ms direct delivery via Cloudflare Mumbai PoP",
    areasCovered: ["Mumbai (Andheri, Bandra, BKC, Lower Parel)", "Navi Mumbai", "Thane", "Kalyan-Dombivli", "Nashik", "Nagpur", "Aurangabad (Chhatrapati Sambhajinagar)", "Kolhapur & Maharashtra Towns"],
    localIndustries: [
      { name: "D2C Fashion, Finance & Real Estate", solution: "Ultra-fast conversion landing pages, Meta/Instagram ad funnels, and WhatsApp CRM automation." },
      { name: "Traders, Wholesalers & Exporters", solution: "B2B ordering portals, GST ERP systems, and pan-India SEO visibility." },
    ],
    whyMlhkHere: [
      "Cloudflare Mumbai edge PoP delivers near-instant LCP for Mumbai mobile shoppers.",
      "Fixed milestone pricing, full source-code ownership, and zero recurring agency hostage fees.",
    ],
    startingPackages: [
      { name: "High-Speed Business Website", price: "₹18,000 – ₹35,000", timeline: "2–3 Weeks", summary: "Custom coded for 95+ Core Web Vitals and top Google search visibility." },
      { name: "Website Redesign & Speed Rescue", price: "₹12,000 – ₹25,000", timeline: "1–2 Weeks", summary: "Transform sluggish sites into high-converting, SEO-clean platforms." },
      { name: "Meta Ads + SEO Growth", price: "₹15,000 / month", timeline: "Monthly", summary: "Instagram, Facebook, Google Ads & technical SEO tied directly to enquiries." },
    ],
    faqs: [
      { question: "Can MLHK Infotech handle website redesign, SEO, and Instagram ads for Mumbai brands?", answer: "Yes. We manage the complete growth stack — rebuilding slow websites for sub-second speed, implementing technical & local SEO, and running conversion-tracked Instagram, Facebook, and Google Ads." },
    ],
    nearbySlugs: ["pune", "ahmedabad", "indore", "india"],
    keywords: ["affordable website developer Mumbai", "best IT company Mumbai Thane", "SEO and Meta ads agency Mumbai", "app development company Maharashtra"],
  },
  {
    slug: "pune",
    name: "Pune",
    shortName: "Pune, Maharashtra",
    state: "Maharashtra",
    regionType: "City",
    tier: "Metro Hub",
    lat: 18.5204,
    lng: 73.8567,
    seoTitle: "Best Affordable Web, App & ERP Partner for Pune",
    metaDescription:
      "Custom websites, SaaS MVPs, Android apps, industrial ERP, SEO & digital marketing for Pune, Hinjewadi, Baner & Pimpri-Chinchwad businesses by MLHK Infotech.",
    heroEyebrow: "Pune • Pimpri-Chinchwad • Hinjewadi • Chakan",
    heroHeadline: "Reliable Software, Web & Growth Engineering for",
    heroHighlight: "Pune.",
    heroSummary:
      "Built for Pune's SaaS founders, Chakan/PCMC manufacturing units, clinics, and education brands — high-craft software and digital marketing delivered on fixed timelines and realistic budgets.",
    localEdgePop: "Sub-22ms edge speed via Cloudflare Mumbai PoP",
    areasCovered: ["Hinjewadi", "Baner & Balewadi", "Kothrud", "Wakad", "Viman Nagar", "Kharadi", "Pimpri-Chinchwad (PCMC)", "Chakan MIDC", "Talegaon & Nearby Towns"],
    localIndustries: [
      { name: "PCMC & Chakan Auto/Engineering SMEs", solution: "Custom ERP, vendor portals, GST billing, and B2B industrial SEO websites." },
      { name: "Startups, EdTech & Local Clinics", solution: "Next.js SaaS MVPs, Android apps, Local SEO, and Instagram/Google lead campaigns." },
    ],
    whyMlhkHere: [
      "Direct senior engineer execution with zero subcontracting and clean TypeScript/SQL codebases.",
      "Complete IP handover and GST invoicing for Pune startups and SMEs.",
    ],
    startingPackages: [
      { name: "Corporate / Startup Website", price: "₹18,000 – ₹32,000", timeline: "2–3 Weeks", summary: "SEO-ready custom website with clean architecture and fast mobile load." },
      { name: "MVP / Custom ERP System", price: "₹50,000 – ₹1,20,000", timeline: "5–9 Weeks", summary: "Production web/mobile platform built for real workflows." },
    ],
    faqs: [
      { question: "Does MLHK Infotech build custom ERP and B2B websites for Pimpri-Chinchwad and Chakan industries?", answer: "Yes. We build custom production, inventory, GST billing, and B2B catalog systems tailored for manufacturing SMEs across PCMC, Chakan, and Pune." },
    ],
    nearbySlugs: ["mumbai", "bengaluru", "indore", "india"],
    keywords: ["website development company Pune", "affordable IT company Pune PCMC", "ERP software Pune Chakan", "SEO agency Pune"],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    shortName: "Bengaluru & Karnataka",
    state: "Karnataka",
    regionType: "City",
    tier: "Metro Hub",
    lat: 12.9716,
    lng: 77.5946,
    seoTitle: "Affordable Web, SaaS & App Engineering for Bengaluru",
    metaDescription:
      "Fast Next.js websites, SaaS MVPs, Android apps, AI automation & technical SEO for Bengaluru, Mysuru & Karnataka startups at transparent Indian pricing by MLHK Infotech.",
    heroEyebrow: "Bengaluru • Mysuru • Mangaluru • Karnataka",
    heroHeadline: "Lean, High-Velocity Web, App & AI Engineering for",
    heroHighlight: "Bengaluru.",
    heroSummary:
      "Partner with an in-house engineering team that ships production Next.js SaaS platforms, Android apps, AI workflow automation, and technical SEO for Bengaluru startups and SMEs without Silicon-Valley burn rates.",
    localEdgePop: "Sub-18ms direct response via Cloudflare Bengaluru edge PoP",
    areasCovered: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City", "Yelahanka", "Mysuru", "Mangaluru", "Hubballi-Dharwad & Karnataka Towns"],
    localIndustries: [
      { name: "Seed Startups & Indie SaaS Teams", solution: "Rapid Next.js + SQL MVPs, AI agent workflows, and AEO/GEO search architecture." },
      { name: "Clinics, D2C & Service Brands", solution: "High-speed conversion sites, Local SEO, and Meta/Google paid acquisition." },
    ],
    whyMlhkHere: [
      "Same modern stack (Next.js 16, TypeScript, Drizzle, Cloudflare Workers, AI APIs) at a fraction of Bengaluru agency retainers.",
      "Direct founder-to-founder engineering velocity with weekly shippable milestones.",
    ],
    startingPackages: [
      { name: "SaaS Marketing Site + AEO/SEO", price: "₹20,000 – ₹38,000", timeline: "2–3 Weeks", summary: "100/100 Core Web Vitals site with rich JSON-LD and AI search optimization." },
      { name: "Full-Stack MVP / AI Automation", price: "₹55,000 – ₹1,40,000", timeline: "4–8 Weeks", summary: "End-to-end web app, API pipelines, and automated WhatsApp/CRM workflows." },
    ],
    faqs: [
      { question: "Can MLHK Infotech act as an extended engineering partner for Bengaluru startups?", answer: "Yes. We build complete marketing websites, full-stack MVPs, Android apps, and AI workflow automations with clean Git handovers and zero vendor lock-in." },
    ],
    nearbySlugs: ["hyderabad", "mumbai", "pune", "india"],
    keywords: ["affordable web development Bengaluru", "SaaS MVP developer Bangalore", "AI automation agency Bengaluru", "SEO and app development Karnataka"],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    shortName: "Ahmedabad & Gujarat",
    state: "Gujarat",
    regionType: "City",
    tier: "Metro Hub",
    lat: 23.0225,
    lng: 72.5714,
    seoTitle: "Best Web, ERP & Digital Marketing for Ahmedabad",
    metaDescription:
      "Custom websites, textile/manufacturing ERP, e-commerce, SEO & Instagram/Facebook Ads for Ahmedabad, Surat, Vadodara & Rajkot businesses by MLHK Infotech.",
    heroEyebrow: "Ahmedabad • Surat • Vadodara • Rajkot • Gujarat",
    heroHeadline: "ROI-Focused Websites, ERP & Digital Growth for",
    heroHighlight: "Ahmedabad & Gujarat.",
    heroSummary:
      "Trusted by Gujarat's business-first founders — from Ahmedabad exporters and Surat textile wholesalers to Rajkot manufacturers — for fast websites, custom billing ERP, and lead-generating digital marketing.",
    localEdgePop: "Sub-22ms edge speed across Gujarat via Cloudflare Mumbai & Ahmedabad routing",
    areasCovered: ["SG Highway & Prahlad Nagar", "Navrangpura", "Bopal", "Naroda & Vatva GIDC", "Gandhinagar", "Surat", "Vadodara", "Rajkot", "Bhavnagar & Gujarat Towns"],
    localIndustries: [
      { name: "GIDC Manufacturers, Textiles & Exporters", solution: "B2B product websites, dealer ordering apps, GST/inventory ERP, and global SEO." },
      { name: "D2C & Retail Brands across Gujarat", solution: "Fast e-commerce stores, Instagram/Facebook Reels ads, and WhatsApp sales automation." },
    ],
    whyMlhkHere: [
      "Direct neighboring-state team (Malwa–Gujarat corridor) focused strictly on measurable business ROI.",
      "Lowest total cost of ownership: pay once for custom software instead of endless SaaS subscriptions.",
    ],
    startingPackages: [
      { name: "B2B / Exporter Website + SEO", price: "₹16,000 – ₹30,000", timeline: "2–3 Weeks", summary: "Product catalog, enquiry CRM, and pan-India + global search indexing." },
      { name: "E-Commerce + Meta Ads Launch", price: "₹35,000 – ₹65,000", timeline: "3–5 Weeks", summary: "Complete online store with UPI payments and conversion-tracked ads." },
    ],
    faqs: [
      { question: "Does MLHK Infotech work with businesses in Surat, Vadodara, and Rajkot as well as Ahmedabad?", answer: "Yes. We serve businesses across all of Gujarat — including Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar, and GIDC industrial estates — with seamless remote delivery and GST billing." },
    ],
    nearbySlugs: ["indore", "mumbai", "jaipur", "india"],
    keywords: ["best IT company Ahmedabad", "website development Gujarat Surat Vadodara", "B2B ERP software Ahmedabad", "digital marketing agency Ahmedabad"],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    shortName: "Jaipur & Rajasthan",
    state: "Rajasthan",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 26.9124,
    lng: 75.7873,
    seoTitle: "Best IT, Website & SEO Company for Jaipur",
    metaDescription:
      "Custom websites, jewellery/handicraft e-commerce, hotel booking portals, SEO & Instagram Ads for Jaipur, Kota, Udaipur & Jodhpur businesses by MLHK Infotech.",
    heroEyebrow: "Jaipur • Kota • Udaipur • Jodhpur • Rajasthan",
    heroHeadline: "E-Commerce, Websites & Digital Marketing for",
    heroHighlight: "Jaipur & Rajasthan.",
    heroSummary:
      "Powering Jaipur's jewellery & handicraft exporters, heritage hotels, Kota coaching institutes, and Rajasthan SMEs with lightning-fast websites, Google SEO, and high-ROAS Instagram/Facebook Ads.",
    localEdgePop: "Sub-22ms delivery across Rajasthan via Cloudflare New Delhi PoP",
    areasCovered: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme", "Sitapura Industrial Area", "Kota", "Udaipur", "Jodhpur", "Ajmer", "Bhilwara & Rajasthan Towns"],
    localIndustries: [
      { name: "Jewellery, Textiles & Handicraft Exporters", solution: "Fast visual e-commerce storefronts, INR/USD catalog options, and Instagram shopping funnels." },
      { name: "Heritage Hotels & Kota Coaching Institutes", solution: "Direct booking websites, student test/admission portals, and Google Local SEO." },
    ],
    whyMlhkHere: [
      "Direct Malwa–Rajasthan collaboration with transparent low-cost packages and 100% code ownership.",
      "Built for both Indian mobile buyers and international export clients.",
    ],
    startingPackages: [
      { name: "Business / Hotel Website", price: "₹15,000 – ₹28,000", timeline: "2–3 Weeks", summary: "Fast custom design with WhatsApp booking and local schema." },
      { name: "Jewellery / D2C E-Commerce", price: "₹32,000 – ₹65,000", timeline: "4–6 Weeks", summary: "High-speed product storefront with Razorpay/UPI and SEO." },
    ],
    faqs: [
      { question: "Can you build fast e-commerce sites for Jaipur handicraft and jewellery businesses?", answer: "Yes. We build image-optimized Next.js storefronts with fast mobile filtering, WhatsApp inquiry, UPI/card payments, and international SEO so your catalog loads cleanly worldwide." },
    ],
    nearbySlugs: ["delhi-ncr", "ahmedabad", "indore", "madhya-pradesh", "india"],
    keywords: ["best IT company Jaipur", "website development company Jaipur", "e-commerce developer Jaipur", "SEO agency Kota Udaipur Jaipur"],
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    shortName: "Lucknow & Uttar Pradesh",
    state: "Uttar Pradesh",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 26.8467,
    lng: 80.9462,
    seoTitle: "Best IT, Website & App Company for Lucknow & UP",
    metaDescription:
      "Affordable custom websites, Android apps, SEO, Instagram/Facebook Ads & ERP software for Lucknow, Kanpur, Varanasi, Agra & Uttar Pradesh by MLHK Infotech.",
    heroEyebrow: "Lucknow • Kanpur • Varanasi • Agra • Prayagraj • UP",
    heroHeadline: "Affordable Websites, Apps & SEO Across",
    heroHighlight: "Lucknow & Uttar Pradesh.",
    heroSummary:
      "Helping businesses across Lucknow, Kanpur, Varanasi, Agra, Prayagraj, and every UP district town launch fast custom websites, mobile apps, and profitable Instagram/Facebook/Google ad campaigns.",
    localEdgePop: "Sub-26ms mobile delivery across UP via Cloudflare Delhi & Kolkata PoPs",
    areasCovered: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Gorakhpur", "Bareilly & All UP Districts"],
    localIndustries: [
      { name: "Healthcare, Real Estate & Education", solution: "Fast lead-generation websites, Google Local SEO, and targeted bilingual Hindi/English Meta Ads." },
      { name: "Kanpur/Agra Manufacturing & Retail Traders", solution: "B2B product portals, dealer apps, and custom GST billing ERPs." },
    ],
    whyMlhkHere: [
      "Friendly Hindi & English communication directly with our engineering team on WhatsApp and Google Meet.",
      "Best quality-to-price ratio in India — no template shortcuts and 100% ownership.",
    ],
    startingPackages: [
      { name: "Business Website + Local SEO", price: "₹15,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Custom mobile-first website with UP local search schema." },
      { name: "Android App + Admin Panel", price: "₹45,000 – ₹90,000", timeline: "6–10 Weeks", summary: "Custom Android application built for customers or field teams." },
    ],
    faqs: [
      { question: "Does MLHK Infotech serve smaller towns and districts across Uttar Pradesh?", answer: "Yes. Whether your business is in Lucknow, Kanpur, Varanasi, Agra, Prayagraj, Gorakhpur, or any Tier-3/4/5 town or village in UP, we deliver full website, app, SEO, and ads services seamlessly over WhatsApp and Google Meet." },
    ],
    nearbySlugs: ["delhi-ncr", "patna", "madhya-pradesh", "india"],
    keywords: ["best IT company Lucknow", "website developer Lucknow Kanpur Varanasi", "mobile app company Uttar Pradesh", "digital marketing agency Lucknow"],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    shortName: "Hyderabad & Telangana",
    state: "Telangana",
    regionType: "City",
    tier: "Metro Hub",
    lat: 17.385,
    lng: 78.4867,
    seoTitle: "Affordable Web, App & AI Automation for Hyderabad",
    metaDescription:
      "Fast Next.js websites, Android apps, AI workflow automation, SEO & Meta/Google Ads for Hyderabad, Secunderabad, Visakhapatnam & Telangana/AP by MLHK Infotech.",
    heroEyebrow: "Hyderabad • Secunderabad • Warangal • Visakhapatnam",
    heroHeadline: "High-Speed Web, App & AI Systems for",
    heroHighlight: "Hyderabad.",
    heroSummary:
      "Modern full-stack web engineering, pharma/healthcare portals, Android apps, and AI lead automation delivered to Hyderabad, Telangana, and Andhra Pradesh businesses at transparent, founder-direct pricing.",
    localEdgePop: "Sub-18ms direct delivery via Cloudflare Hyderabad edge PoP",
    areasCovered: ["HITEC City", "Gachibowli", "Madhapur", "Banjara Hills", "Jubilee Hills", "Secunderabad", "Warangal", "Visakhapatnam", "Vijayawada & Telugu States"],
    localIndustries: [
      { name: "Pharma, Healthcare & Clinics", solution: "Fast compliant web portals, appointment automation, and high-intent Google SEO." },
      { name: "Startups, Real Estate & EdTech", solution: "Next.js web apps, Android apps, WhatsApp AI bots, and Meta/Google Ads." },
    ],
    whyMlhkHere: [
      "Native Cloudflare Hyderabad PoP delivers near-zero latency for Telugu-state visitors.",
      "Fixed-cost engineering with clean TypeScript/SQL codebases and GST invoicing.",
    ],
    startingPackages: [
      { name: "Corporate / Startup Website", price: "₹18,000 – ₹35,000", timeline: "2–3 Weeks", summary: "Custom coded Next.js website built for 95+ Core Web Vitals." },
      { name: "AI Automation & CRM Suite", price: "₹45,000 – ₹1,10,000", timeline: "4–8 Weeks", summary: "Automated WhatsApp support, lead routing, and custom dashboards." },
    ],
    faqs: [
      { question: "Can MLHK Infotech build AI WhatsApp automation and custom web platforms for Hyderabad businesses?", answer: "Yes. We build full-stack Next.js platforms, WhatsApp Business API workflows, and CRM dashboards with complete code ownership." },
    ],
    nearbySlugs: ["bengaluru", "mumbai", "india"],
    keywords: ["affordable web development Hyderabad", "AI automation company Hyderabad", "SEO and app developer Hyderabad", "IT company Telangana"],
  },
  {
    slug: "patna",
    name: "Patna",
    shortName: "Patna, Bihar & Jharkhand",
    state: "Bihar",
    regionType: "City",
    tier: "Tier-2 / Regional Hub",
    lat: 25.5941,
    lng: 85.1376,
    seoTitle: "Best Affordable Website, App & SEO Company for Patna",
    metaDescription:
      "Low-cost, high-quality website development, coaching/school apps, SEO & Facebook/Instagram Ads for Patna, Gaya, Muzaffarpur, Ranchi & Bihar/Jharkhand by MLHK Infotech.",
    heroEyebrow: "Patna • Gaya • Muzaffarpur • Ranchi • Bihar & Jharkhand",
    heroHeadline: "Affordable Websites, Apps & Digital Growth for",
    heroHighlight: "Patna & Bihar.",
    heroSummary:
      "Empowering coaching institutes, hospitals, local startups, and rural/town businesses across Bihar and Jharkhand with fast websites, Android learning/business apps, Google SEO, and social media ads.",
    localEdgePop: "Fast 4G/5G mobile delivery via Cloudflare Kolkata & Delhi PoPs",
    areasCovered: ["Boring Road", "Kankarbagh", "Bailey Road", "Fraser Road", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Ranchi", "Jamshedpur", "Dhanbad & Rural Towns"],
    localIndustries: [
      { name: "Coaching Institutes, Schools & Test Prep", solution: "Fast admission websites, student portals, Android apps, and Facebook/Instagram admission campaigns." },
      { name: "Clinics, Diagnostics & Local Traders", solution: "Google Maps 'near me' SEO, WhatsApp appointment booking, and GST billing tools." },
    ],
    whyMlhkHere: [
      "Zero metro-city pricing inflation — honest budgets designed for growing Bihar & Jharkhand businesses.",
      "Clear Hindi & English WhatsApp support with full source-code ownership.",
    ],
    startingPackages: [
      { name: "Business / Coaching Website", price: "₹14,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Fast mobile website with local SEO and WhatsApp enquiry integration." },
      { name: "Android App + Admin Panel", price: "₹45,000 – ₹85,000", timeline: "6–9 Weeks", summary: "Custom Android app with user login, content management, and analytics." },
    ],
    faqs: [
      { question: "Can MLHK Infotech build an affordable coaching or business website and app for Patna or Ranchi?", answer: "Yes. We build custom-coded websites starting around ₹15,000 and full Android apps with admin panels for clients across Patna, Gaya, Muzaffarpur, Ranchi, Jamshedpur, and every smaller town in Bihar and Jharkhand." },
    ],
    nearbySlugs: ["lucknow", "delhi-ncr", "india"],
    keywords: ["best IT company Patna", "website developer Patna Bihar", "affordable app developer Patna Ranchi", "SEO digital marketing Patna"],
  },
  {
    slug: "india",
    name: "All India (Tier 1–5 & Villages)",
    shortName: "All Over India",
    state: "India",
    regionType: "Country",
    tier: "Pan-India & Rural",
    lat: 23.664,
    lng: 76.322,
    seoTitle: "Best Affordable IT, Web, App & Marketing Company in India",
    metaDescription:
      "MLHK Infotech serves all 28 Indian states, 8 UTs, Tier 1–5 cities, district towns & villages with low-cost, top-quality websites, website editing, SEO, Meta/Google Ads, apps & ERP.",
    heroEyebrow: "Pan-India Coverage • All 28 States, 8 UTs, Tier 1–5 Cities & Villages",
    heroHeadline: "One Accountable IT Partner for Every City, Town & Village in",
    heroHighlight: "India.",
    heroSummary:
      "Whether you run an enterprise in Mumbai, a shop in a Tier-3 district town, or a growing business in a village anywhere in India — MLHK Infotech delivers custom websites, existing site fixes, #1-focused SEO, Instagram/Facebook/Google Ads, Android apps, and CRM/ERP at the most honest pricing in Bharat.",
    localEdgePop: "Cloudflare Edge nodes in Mumbai, New Delhi, Bengaluru, Chennai, Hyderabad & Kolkata",
    areasCovered: [
      "All 28 States of India",
      "All 8 Union Territories",
      "Tier-1 Metros (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad)",
      "Tier-2 Cities (Indore, Bhopal, Jaipur, Lucknow, Surat, Nagpur, Kochi, Chandigarh, Patna, Guwahati)",
      "Tier-3 & Tier-4 District Headquarters (Shajapur, Ujjain, Dewas, Ratlam, Sagar, Kota, Udaipur, Gaya, Ranchi)",
      "Tier-5 Tehsils, Block Towns & Rural Villages across Bharat",
    ],
    localIndustries: [
      { name: "Small Shops, Local Services & Rural/Town Entrepreneurs", solution: "Low-cost custom websites (₹15k+), Google Maps 'near me' visibility, and WhatsApp catalog/lead funnels." },
      { name: "Existing Website Owners Needing Redesign or SEO", solution: "Fast website editing, speed rescue, technical SEO, and Instagram/Facebook/Google Ads management." },
      { name: "SMEs, Factories, Schools & Startups Nationwide", solution: "Custom Android apps, GST billing ERP, CRM dashboards, cybersecurity, and AI automation." },
    ],
    whyMlhkHere: [
      "Built in Bharat for every corner of India — Hindi & English support over WhatsApp (+91 91651 00124) and Google Meet, so you never need to visit a metro office.",
      "Govt. of India MSME Udyam (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ) verified company.",
      "Lowest overhead, highest code quality: 100% custom coded, 100% client IP ownership, zero monthly hostage fees.",
    ],
    startingPackages: [
      { name: "Starter Business Website", price: "₹15,000 – ₹25,000", timeline: "2–3 Weeks", summary: "Custom coded, SEO-ready, mobile-first website with WhatsApp CTA & SSL." },
      { name: "Website Edit / Redesign / Speed Fix", price: "₹8,000 – ₹22,000", timeline: "1–2 Weeks", summary: "Fix bugs, modernize UI, optimize Core Web Vitals & boost Google ranking." },
      { name: "SEO + Instagram/FB/Google Ads", price: "₹10,000 – ₹20,000 / mo", timeline: "Monthly Growth", summary: "Pan-India or hyperlocal 'near me' SEO plus lead-generating social & search ads." },
      { name: "Mobile App or Custom CRM/ERP", price: "₹45,000 – ₹1,20,000", timeline: "5–10 Weeks", summary: "Native Android app or custom business software with admin panel & API." },
    ],
    faqs: [
      {
        question: "Can MLHK Infotech work with businesses in Tier-3, Tier-4, Tier-5 towns or villages anywhere in India?",
        answer:
          "Yes! Over 70% of our clients collaborate with us remotely from cities, district towns, and villages across India via WhatsApp, phone calls, and Google Meet screen shares. You receive weekly live preview links, GST invoices, and direct founder support regardless of your pin code.",
      },
      {
        question: "How does MLHK Infotech deliver top quality at lower cost than metro IT agencies?",
        answer:
          "Because our engineering headquarters is in Shajapur, Madhya Pradesh rather than an expensive glass tower in Gurgaon or Bandra. You pay strictly for senior engineering, clean code, and measurable SEO/marketing — never for agency middlemen or corporate rent.",
      },
      {
        question: "I need a website, SEO, Instagram ads, and maybe an app later — can one company handle everything?",
        answer:
          "Yes. MLHK Infotech is an all-in-one digital and IT partner covering website creation, existing website editing/redesign, SEO & local Google ranking, Instagram/Facebook/Google Ads, Android apps, custom CRM/ERP, AI automation, branding, and 24/7 support.",
      },
    ],
    nearbySlugs: ["indore", "madhya-pradesh", "delhi-ncr", "mumbai", "bengaluru", "ahmedabad", "jaipur", "lucknow", "hyderabad", "patna"],
    keywords: [
      "best affordable IT company in India",
      "website banwani hai best company India",
      "low cost high quality website development India",
      "digital marketing Instagram Facebook ads company India",
      "rural and tier 2 tier 3 city software company India",
      "all in one IT solution partner India",
    ],
  },
] as const;

export const LOCATION_HUBS: readonly LocationHub[] = [
  ...CORE_LOCATION_HUBS,
  ...EXTRA_LOCATION_HUBS,
];

export type LocationTierBucket = "HQ & MP" | "Tier-1 Metro" | "Tier-2 Growth" | "Tier-3 Regional" | "Pan-India";

const TIER3_SLUGS = new Set([
  "shajapur",
  "ujjain",
  "dewas",
  "gwalior",
  "jabalpur",
  "ratlam",
  "sagar",
  "rewa",
  "kota",
  "udaipur",
  "varanasi",
  "ranchi",
  "dehradun",
]);

export function getLocationTierBucket(loc: LocationHub): LocationTierBucket {
  if (loc.slug === "india") return "Pan-India";
  if (loc.slug === "shajapur" || loc.slug === "indore" || loc.slug === "madhya-pradesh") return "HQ & MP";
  if (loc.tier === "Metro Hub") return "Tier-1 Metro";
  if (TIER3_SLUGS.has(loc.slug)) return "Tier-3 Regional";
  return "Tier-2 Growth";
}

export function getLocationHeroVisual(loc: LocationHub): { src: string; caption: string } {
  const slug = loc.slug;
  if (["indore", "shajapur", "madhya-pradesh", "india", "delhi-ncr", "bengaluru"].includes(slug)) {
    return { src: "/images/showcase/studio-hub.jpg", caption: `Custom Engineering & Web Systems for ${loc.name}` };
  }
  if (["surat", "jaipur", "varanasi", "ratlam", "kolkata", "mumbai", "guwahati"].includes(slug)) {
    return { src: "/images/showcase/case-iksc.jpg", caption: `High-Speed E-Commerce & D2C Platforms in ${loc.name}` };
  }
  if (["dewas", "pune", "ahmedabad", "vadodara", "coimbatore", "raipur", "chennai", "nagpur", "visakhapatnam"].includes(slug)) {
    return { src: "/images/showcase/erp-dashboard.jpg", caption: `Custom GST Billing, Inventory & Industrial ERP in ${loc.name}` };
  }
  if (["kota", "patna", "ranchi", "sagar", "gwalior", "hyderabad"].includes(slug)) {
    return { src: "/images/showcase/mobile-app.jpg", caption: `Native Android Apps & EdTech/Business Portals in ${loc.name}` };
  }
  if (["rewa", "bhopal", "jabalpur"].includes(slug)) {
    return { src: "/images/showcase/case-erotix.jpg", caption: `Enterprise Web & Field Operations Systems in ${loc.name}` };
  }
  return { src: "/images/showcase/seo-growth.jpg", caption: `Local Google SEO, Maps & Performance Ads in ${loc.name}` };
}

export function getLocationHub(slug: string): LocationHub | undefined {
  return LOCATION_HUBS.find((loc) => loc.slug === slug);
}

/**
 * Complete structured directory of all 28 Indian States & 8 Union Territories
 * grouped by zone for transparent pan-India coverage on /locations.
 */
export const INDIA_ZONE_DIRECTORY = [
  {
    zone: "Central India (HQ Zone)",
    states: [
      { name: "Madhya Pradesh", hubs: "Indore, Shajapur (HQ), Bhopal, Ujjain, Dewas, Gwalior, Jabalpur, Ratlam, Sagar, Rewa, Satna, Agar Malwa & all 55 districts/villages", linkSlug: "madhya-pradesh" },
      { name: "Chhattisgarh", hubs: "Raipur, Bilaspur, Durg-Bhilai, Korba, Jagdalpur, Ambikapur & district towns", linkSlug: "raipur" },
    ],
  },
  {
    zone: "North India & NCR",
    states: [
      { name: "Delhi (NCT)", hubs: "New Delhi, South/West/North/East Delhi, Dwarka, Rohini, Okhla & NCR corridor", linkSlug: "delhi-ncr" },
      { name: "Uttar Pradesh", hubs: "Lucknow, Varanasi, Noida, Ghaziabad, Kanpur, Agra, Prayagraj, Meerut, Gorakhpur, Bareilly & all 75 districts", linkSlug: "lucknow" },
      { name: "Rajasthan", hubs: "Jaipur, Kota, Udaipur, Jodhpur, Ajmer, Bhilwara, Bikaner, Alwar & tehsil towns", linkSlug: "jaipur" },
      { name: "Haryana", hubs: "Gurugram, Faridabad, Panipat, Ambala, Hisar, Karnal, Rohtak & Sonipat", linkSlug: "delhi-ncr" },
      { name: "Punjab", hubs: "Ludhiana, Amritsar, Jalandhar, Patiala, Mohali, Bathinda & district towns", linkSlug: "chandigarh" },
      { name: "Uttarakhand", hubs: "Dehradun, Haridwar, Roorkee, Haldwani, Rishikesh & Nainital", linkSlug: "dehradun" },
      { name: "Himachal Pradesh", hubs: "Shimla, Solan, Baddi, Dharamshala, Mandi & Kullu", linkSlug: "chandigarh" },
      { name: "Chandigarh (UT)", hubs: "Chandigarh Tri-City (Chandigarh, Mohali, Panchkula)", linkSlug: "chandigarh" },
      { name: "Jammu and Kashmir (UT)", hubs: "Srinagar, Jammu, Anantnag, Udhampur & Kathua", linkSlug: "india" },
      { name: "Ladakh (UT)", hubs: "Leh, Kargil & remote hospitality/business portals", linkSlug: "india" },
    ],
  },
  {
    zone: "West India",
    states: [
      { name: "Maharashtra", hubs: "Mumbai, Navi Mumbai, Thane, Pune, PCMC, Nagpur, Nashik, Aurangabad, Kolhapur, Solapur & rural districts", linkSlug: "mumbai" },
      { name: "Gujarat", hubs: "Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar, Bhavnagar, Jamnagar, Vapi & GIDC hubs", linkSlug: "ahmedabad" },
      { name: "Goa", hubs: "Panaji, Margao, Vasco da Gama, Mapusa & hospitality/tourism businesses", linkSlug: "mumbai" },
      { name: "Dadra and Nagar Haveli and Daman and Diu (UT)", hubs: "Silvassa, Vapi corridor, Daman & Diu industrial units", linkSlug: "surat" },
    ],
  },
  {
    zone: "South India",
    states: [
      { name: "Karnataka", hubs: "Bengaluru, Mysuru, Mangaluru, Hubballi-Dharwad, Belagavi & Tumakuru", linkSlug: "bengaluru" },
      { name: "Telangana", hubs: "Hyderabad, Secunderabad, Warangal, Nizamabad, Karimnagar & Khammam", linkSlug: "hyderabad" },
      { name: "Tamil Nadu", hubs: "Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur & Erode", linkSlug: "chennai" },
      { name: "Andhra Pradesh", hubs: "Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore & Kakinada", linkSlug: "visakhapatnam" },
      { name: "Kerala", hubs: "Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Kannur & Kollam", linkSlug: "kochi" },
      { name: "Puducherry (UT)", hubs: "Puducherry, Karaikal, Yanam & Mahe", linkSlug: "chennai" },
      { name: "Lakshadweep (UT)", hubs: "Kavaratti & island tourism/enterprise remote portals", linkSlug: "kochi" },
      { name: "Andaman and Nicobar Islands (UT)", hubs: "Port Blair (Sri Vijaya Puram) & travel/hospitality websites", linkSlug: "chennai" },
    ],
  },
  {
    zone: "East & North-East India",
    states: [
      { name: "Bihar", hubs: "Patna, Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Purnia & all 38 districts", linkSlug: "patna" },
      { name: "Jharkhand", hubs: "Ranchi, Jamshedpur, Dhanbad, Bokaro, Hazaribagh & Deoghar", linkSlug: "ranchi" },
      { name: "West Bengal", hubs: "Kolkata, Howrah, Siliguri, Durgapur, Asansol & Kharagpur", linkSlug: "kolkata" },
      { name: "Odisha", hubs: "Bhubaneswar, Cuttack, Rourkela, Sambalpur, Puri & Berhampur", linkSlug: "bhubaneswar" },
      { name: "Assam", hubs: "Guwahati, Silchar, Dibrugarh, Jorhat, Tezpur & Nagaon", linkSlug: "guwahati" },
      { name: "Sikkim, Tripura, Meghalaya, Manipur, Nagaland, Arunachal Pradesh & Mizoram", hubs: "Gangtok, Agartala, Shillong, Imphal, Dimapur, Kohima, Itanagar & Aizawl", linkSlug: "guwahati" },
    ],
  },
] as const;
