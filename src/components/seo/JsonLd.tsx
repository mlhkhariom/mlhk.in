import { BRAND, SERVICE_LINES, CAPABILITIES } from "@/lib/brand";
import { buildPanIndiaAreaServed } from "@/lib/seo-utils";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Renders JSON-LD structured data for SEO, AEO (Answer Engine Optimization),
 * GEO (Generative Engine Optimization), and Google Knowledge Graph.
 * Usage: <JsonLd data={{ "@type": "...", ... }} />
 */
export default function JsonLd({ data }: JsonLdProps) {
  const context = Array.isArray(data)
    ? data
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(context) }}
    />
  );
}

/** BreadcrumbList structured data (valid for Google Search Central rich snippets) */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const isLeaf = i === items.length - 1;
      const element: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
      };
      if (item.url) {
        element.item = item.url;
      } else if (!isLeaf) {
        element.item = `${BRAND.url}/`;
      }
      return element;
    }),
  };
  return <JsonLd data={data} />;
}

/** FAQPage structured data for AEO (Answer Engine Optimization) & Featured Snippets */
export function FaqJsonLd({
  faqs,
}: {
  faqs: readonly { readonly question: string; readonly answer: string }[];
}) {
  if (!faqs || faqs.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

/** WebSite schema with Sitelinks SearchBox for Google Search */
export function WebSiteJsonLd({
  name = BRAND.name,
  url = BRAND.url,
}: {
  name?: string;
  url?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name,
    alternateName: [BRAND.shortName, "MLHK Infotech India", "MLHK"],
    description:
      "Enterprise IT solutions, custom website development & redesign, SEO, digital marketing, Android & mobile applications, CRM/ERP systems, and AI automation across India and worldwide.",
    publisher: {
      "@id": `${url}/#organization`,
    },
    inLanguage: ["en-IN", "hi-IN"],
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
  return <JsonLd data={data} />;
}

/**
 * Master Organization / ProfessionalService / LocalBusiness Schema
 * Single authoritative `#organization` node mounted globally via Footer.
 * Establishes company authority, regulatory credentials (MSME Udyam + GSTIN),
 * dual operating hubs (Shajapur HQ + Indore Operations), pan-India (all states,
 * metro/tier 2-5 cities, rural/remote) + global coverage, founder E-E-A-T signals,
 * and complete service OfferCatalog.
 */
export function OrganizationJsonLd() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: [
      BRAND.shortName,
      "MLHK",
      "MLHK Infotech Shajapur",
      "MLHK Infotech Indore",
      "MLHK Infotech India",
    ],
    legalName: BRAND.name,
    url: BRAND.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${BRAND.url}/#logo`,
      url: `${BRAND.url}/brand/logo-full.png`,
      contentUrl: `${BRAND.url}/brand/logo-full.png`,
      caption: `${BRAND.name} Official Logo`,
      width: 1536,
      height: 1024,
    },
    image: `${BRAND.url}/brand/logo-full.png`,
    description:
      "MLHK Infotech is an indigenous Indian IT and software engineering enterprise founded on 1 April 2020 by Hariom Vishwkarma (MLHK). Registered with MSME (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ). Delivering custom websites, website redesign & editing, technical & local SEO, digital marketing, Android & mobile apps, CRM/ERP systems, cybersecurity, and AI automation across all Indian states, cities, towns, villages, and worldwide.",
    slogan: BRAND.tagline,
    foundingDate: "2020-04-01",
    taxID: BRAND.gstin,
    vatID: BRAND.gstin,
    identifier: [
      {
        "@type": "PropertyValue",
        name: "MSME Udyam Registration",
        value: BRAND.udyamNumber,
      },
      {
        "@type": "PropertyValue",
        name: "GSTIN",
        value: BRAND.gstin,
      },
    ],
    founder: {
      "@type": "Person",
      "@id": `${BRAND.url}/about#hariom-vishwkarma`,
      name: BRAND.founder,
      alternateName: BRAND.founderAlias,
      jobTitle: BRAND.founderRole,
      description: BRAND.founderBio,
      url: `${BRAND.url}/about`,
      image: `${BRAND.url}/brand/mark.png`,
      alumniOf: {
        "@type": "EducationalOrganization",
        name: BRAND.university,
      },
      sameAs: [
        BRAND.founderGithub,
        BRAND.founderLinkedin,
        BRAND.founderInstagram,
        BRAND.founderTwitter,
      ],
      knowsAbout: [
        "Full-Stack Web Engineering",
        "Website Redesign, Editing & Optimization",
        "Technical & Local SEO Engineering",
        "Digital Marketing & Performance Growth",
        "Android & Cross-Platform Mobile App Architecture",
        "Enterprise Resource Planning (ERP)",
        "Customer Relationship Management (CRM)",
        "Artificial Intelligence & LLM Workflows",
        "Cloudflare Serverless & Edge Architecture",
        "Cybersecurity & IT Infrastructure",
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.addressLine,
      addressLocality: BRAND.city,
      addressRegion: "Madhya Pradesh",
      postalCode: BRAND.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.664,
      longitude: 76.322,
    },
    hasMap: BRAND.mapsUrl,
    location: [
      {
        "@type": "Place",
        name: "MLHK Infotech Registered Headquarters",
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND.addressLine,
          addressLocality: BRAND.city,
          addressRegion: "Madhya Pradesh",
          postalCode: BRAND.postalCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 23.664,
          longitude: 76.322,
        },
      },
      {
        "@type": "Place",
        name: "MLHK Infotech Operating Base (Indore)",
        address: {
          "@type": "PostalAddress",
          streetAddress: "AB Road / Vijay Nagar Commercial Corridor",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          postalCode: "452010",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 22.7533,
          longitude: 75.8937,
        },
      },
    ],
    telephone: BRAND.phoneE164,
    email: BRAND.email,
    knowsLanguage: ["en-IN", "hi-IN"],
    priceRange: "₹₹ - ₹₹₹₹",
    currenciesAccepted: "INR, USD, EUR, AED",
    paymentAccepted:
      "UPI, Net Banking, NEFT, RTGS, IMPS, Credit Card, Debit Card, International Wire Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: BRAND.phoneE164,
        email: "contact@mlhk.in",
        availableLanguage: ["English", "Hindi"],
        areaServed: ["IN", "Worldwide"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: BRAND.phoneE164,
        email: BRAND.supportEmail,
        availableLanguage: ["English", "Hindi"],
        areaServed: ["IN", "Worldwide"],
      },
      {
        "@type": "ContactPoint",
        contactType: "administration",
        telephone: BRAND.phoneE164,
        email: BRAND.email,
        availableLanguage: ["English", "Hindi"],
        areaServed: ["IN", "Worldwide"],
      },
    ],
    sameAs: [
      BRAND.instagramUrl,
      BRAND.githubUrl,
      BRAND.githubCompanyUrl,
      BRAND.companyLinkedin,
      BRAND.founderLinkedin,
      BRAND.crunchbaseUrl,
      BRAND.f6sUrl,
      BRAND.xTwitterUrl,
      BRAND.mapsUrl,
      "https://wa.me/919165100124",
    ],
    subjectOf: [
      {
        "@type": "WebPage",
        name: "Udyam Registration Portal - Ministry of MSME",
        url: BRAND.udyamVerifyUrl,
        description: `Verified MSME registration certificate for ${BRAND.name} (${BRAND.udyamNumber}) under Ministry of MSME, Govt of India.`,
      },
      {
        "@type": "WebPage",
        name: "Goods and Services Tax Portal - GSTN",
        url: BRAND.gstVerifyUrl,
        description: `Statutory GSTIN registration verification for ${BRAND.name} (GSTIN: ${BRAND.gstin}) under the jurisdiction of Madhya Pradesh, India.`,
      },
      {
        "@type": "WebPage",
        name: "Crunchbase Profile - MLHK Infotech",
        url: BRAND.crunchbaseUrl,
        description: `Verified enterprise directory listing for ${BRAND.name} on Crunchbase.`,
      },
      {
        "@type": "WebPage",
        name: "F6S Business Registry - MLHK Infotech",
        url: BRAND.f6sUrl,
        description: `Global technology business directory registry for ${BRAND.name} on F6S.`,
      },
    ],
    knowsAbout: [
      "Custom Web Application Development",
      "Website Redesign, Editing & Speed Optimization",
      "Technical SEO, Local SEO & Google Search Ranking",
      "Digital Marketing, Performance Ads & Social Media Growth",
      "Android & Cross-Platform Mobile App Development",
      "Progressive Web Apps (PWA) & E-Commerce Platforms",
      "Enterprise ERP, CRM, HRMS & GST Billing Software",
      "Artificial Intelligence, Chatbots & WhatsApp Business API Automation",
      "UI/UX Design Systems, Graphic Design & Corporate Branding",
      "Cybersecurity Hardening, Cloud Infrastructure & 24/7 IT Support",
    ],
    areaServed: buildPanIndiaAreaServed(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "MLHK Infotech Pan-India & Global Engineering Services",
      itemListElement: [
        ...SERVICE_LINES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `${BRAND.url}/services/${s.slug}`,
          },
        })),
        ...CAPABILITIES.map((c) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: c.title,
            description: c.description,
            url: `${BRAND.url}/services/${c.slug}`,
          },
        })),
      ],
    },
  };

  return <JsonLd data={orgData} />;
}

/** Service / OfferCatalog structured data with valid ListItem wrappers */
export function ServiceJsonLd({
  services,
}: {
  services: { name: string; description: string; url?: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${BRAND.name} Engineering & Digital Services`,
        description: "Official service catalogue of MLHK Infotech across India and globally.",
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            url: s.url ?? `${BRAND.url}/services`,
            serviceType: s.name,
            provider: {
              "@id": `${BRAND.url}/#organization`,
            },
            areaServed: [
              { "@type": "Country", name: "India" },
              { "@type": "Place", name: "Worldwide" },
            ],
          },
        })),
      }}
    />
  );
}

/** Individual Service schema for service detail pages */
export function SingleServiceJsonLd({
  name,
  description,
  slug,
  serviceType,
}: {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${BRAND.url}/services/${slug}#service`,
        name,
        description,
        url: `${BRAND.url}/services/${slug}`,
        serviceType: serviceType ?? name,
        provider: {
          "@id": `${BRAND.url}/#organization`,
        },
        areaServed: buildPanIndiaAreaServed(),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${name} Offerings`,
        },
      }}
    />
  );
}

/**
 * Article / BlogPosting schema for blog posts.
 * Incorporates Person author (Hariom Vishwkarma) for rigorous Google E-E-A-T.
 */
export function ArticleJsonLd({
  title,
  excerpt,
  slug,
  image,
  publishedAt,
  wordCount,
}: {
  title: string;
  excerpt?: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  wordCount?: number;
}) {
  const postUrl = `${BRAND.url}/blog/${slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "@id": `${postUrl}#article`,
        headline: title,
        description: excerpt ?? title,
        image: image ? [image] : [`${BRAND.url}/brand/logo-full.png`],
        datePublished: publishedAt ?? "2026-01-01",
        dateModified: publishedAt ?? "2026-01-01",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        author: {
          "@type": "Person",
          "@id": `${BRAND.url}/about#hariom-vishwkarma`,
          name: BRAND.founder,
          alternateName: BRAND.founderAlias,
          jobTitle: BRAND.founderRole,
          url: `${BRAND.url}/about`,
          sameAs: [
            BRAND.founderGithub,
            BRAND.founderLinkedin,
            BRAND.founderInstagram,
          ],
        },
        publisher: {
          "@id": `${BRAND.url}/#organization`,
        },
        inLanguage: "en-IN",
        ...(wordCount && wordCount > 0 ? { wordCount } : {}),
      }}
    />
  );
}

/** HowTo schema for engineering & delivery process pages */
export function HowToJsonLd({
  name,
  description,
  steps,
  baseUrl = `${BRAND.url}/process`,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  baseUrl?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${baseUrl}#step-${i + 1}`,
        })),
      }}
    />
  );
}

/** ContactPage schema with direct communication endpoints */
export function ContactPageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${BRAND.url}/contact#page`,
        url: `${BRAND.url}/contact`,
        name: `Contact ${BRAND.name} Engineering Desk`,
        description:
          "Connect with MLHK Infotech for software development, enterprise systems, Android applications, and AI automation consultations.",
        mainEntity: {
          "@id": `${BRAND.url}/#organization`,
        },
      }}
    />
  );
}

/** AboutPage schema connecting brand to founder persona */
export function AboutPageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${BRAND.url}/about#page`,
        url: `${BRAND.url}/about`,
        name: `About ${BRAND.name} & Founder ${BRAND.founder}`,
        description:
          "Sovereign Indian IT enterprise founded on 1 April 2020 by Hariom Vishwkarma (MLHK). Registered with MSME Udyam (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ).",
        mainEntity: {
          "@id": `${BRAND.url}/#organization`,
        },
        about: {
          "@id": `${BRAND.url}/about#hariom-vishwkarma`,
        },
      }}
    />
  );
}

/** WebPage schema for legal and policy documents */
export function PolicyPageJsonLd({
  name,
  description,
  path,
  dateModified = "2026-10-15",
}: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BRAND.url}${path}#page`,
        url: `${BRAND.url}${path}`,
        name,
        description,
        dateModified,
        inLanguage: "en-IN",
        publisher: {
          "@id": `${BRAND.url}/#organization`,
        },
      }}
    />
  );
}

/**
 * Location-specific Service + Local Geo + Speakable JSON-LD for /locations/[slug] pages.
 * 100% Google Search Console compliant — references canonical #organization via @id,
 * declares real GeoCoordinates, served towns/areas, and honest INR starting offers.
 */
export function LocationServiceJsonLd({
  slug,
  name,
  state,
  regionType,
  description,
  lat,
  lng,
  areasCovered,
  packages,
  path,
  pageTitle,
  inLanguage,
}: {
  slug: string;
  name: string;
  state: string;
  regionType: "City" | "AdministrativeArea" | "Country";
  description: string;
  lat: number;
  lng: number;
  areasCovered: readonly string[];
  packages: readonly { name: string; price: string; summary: string }[];
  path?: string;
  pageTitle?: string;
  inLanguage?: string | string[];
}) {
  const pageUrl = `${BRAND.url}${path ?? `/locations/${slug}`}`;
  const resolvedLang = inLanguage ?? ["en-IN", "hi-IN"];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name:
              pageTitle ??
              `Best IT, Website, App & Digital Marketing Company in ${name} | ${BRAND.name}`,
            description,
            inLanguage: resolvedLang,
            isPartOf: { "@id": `${BRAND.url}/#website` },
            about: { "@id": `${pageUrl}#service` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "[data-speakable='summary']"],
            },
          },
          {
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: `IT, Website Development, Mobile App, SEO & Digital Marketing Services in ${name}`,
            serviceType: "Software Engineering, Website Development, SEO & Digital Marketing",
            description,
            url: pageUrl,
            provider: { "@id": `${BRAND.url}/#organization` },
            areaServed: [
              {
                "@type": regionType,
                name: state !== name && regionType === "City" ? `${name}, ${state}` : name,
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: lat,
                  longitude: lng,
                },
              },
              ...areasCovered.map((area) => ({
                "@type": "Place",
                name: area,
              })),
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${BRAND.name} Solutions in ${name}`,
              itemListElement: packages.map((pkg) => ({
                "@type": "Offer",
                name: pkg.name,
                description: pkg.summary,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                url: `${BRAND.url}/contact`,
                itemOffered: {
                  "@type": "Service",
                  name: `${pkg.name} in ${name}`,
                  description: `${pkg.summary} (${pkg.price})`,
                },
              })),
            },
          },
        ],
      }}
    />
  );
}

/**
 * High-intent Solution Service + PriceSpecification + Speakable JSON-LD for /solutions/[slug].
 */
export function SolutionServiceJsonLd({
  slug,
  title,
  category,
  description,
  minPrice,
  maxPrice,
}: {
  slug: string;
  title: string;
  category: string;
  description: string;
  minPrice: number;
  maxPrice: number;
}) {
  const pageUrl = `${BRAND.url}/solutions/${slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: `${title} | ${BRAND.name}`,
            description,
            inLanguage: ["en-IN", "hi-IN"],
            isPartOf: { "@id": `${BRAND.url}/#website` },
            about: { "@id": `${pageUrl}#service` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "[data-speakable='summary']"],
            },
          },
          {
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: title,
            serviceType: category,
            description,
            url: pageUrl,
            provider: { "@id": `${BRAND.url}/#organization` },
            areaServed: buildPanIndiaAreaServed(),
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: `${BRAND.url}/contact`,
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice,
                maxPrice,
                priceCurrency: "INR",
              },
            },
          },
        ],
      }}
    />
  );
}

/** CollectionPage + valid ListItem-wrapped ItemList for /locations, /hi/locations, and /solutions hubs */
export function CollectionHubJsonLd({
  path,
  name,
  description,
  items,
  inLanguage,
}: {
  path: string;
  name: string;
  description: string;
  items: readonly { name: string; url: string; description: string }[];
  inLanguage?: string | string[];
}) {
  const pageUrl = `${BRAND.url}${path}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name,
        description,
        inLanguage: inLanguage ?? ["en-IN", "hi-IN"],
        isPartOf: { "@id": `${BRAND.url}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "[data-speakable='summary']"],
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            url: item.url,
            description: item.description,
          })),
        },
      }}
    />
  );
}


