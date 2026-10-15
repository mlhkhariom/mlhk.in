import { BRAND } from "@/lib/brand";

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
  faqs: { question: string; answer: string }[];
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
    alternateName: [BRAND.shortName, "MLHK Infotech Private", "MLHK"],
    description:
      "Enterprise IT solutions, scalable web development, Android applications, CRM/ERP systems, and AI automation.",
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
 * Establishes company authority, regulatory credentials (MSME Udyam + GSTIN),
 * dual operating locations (Shajapur HQ + Indore Operations), founder E-E-A-T signals,
 * and service capabilities for AI engines (ChatGPT, Gemini, Perplexity, Claude).
 */
export function OrganizationJsonLd() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: [BRAND.shortName, "MLHK", "MLHK Infotech Shajapur", "MLHK Infotech Indore"],
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
      "MLHK Infotech is an indigenous Indian IT and software engineering enterprise founded on 1 April 2020 by Hariom Vishwkarma (MLHK). Registered with MSME (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ). Delivering enterprise web platforms, scalable Android applications, CRM/ERP systems, and AI automation.",
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
        "Android App Architecture",
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
        name: "MLHK Infotech Operating Base",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
    ],
    telephone: BRAND.phoneE164,
    email: BRAND.email,
    priceRange: "₹₹ - ₹₹₹₹",
    currenciesAccepted: "INR, USD, EUR, AED",
    paymentAccepted: "UPI, Net Banking, NEFT, RTGS, IMPS, Credit Card, Debit Card, International Wire Transfer",
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
        opens: "09:30",
        closes: "19:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: BRAND.phoneE164,
        email: BRAND.email,
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
    ],
    sameAs: [
      BRAND.instagramUrl,
      BRAND.githubUrl,
      BRAND.founderLinkedin,
      BRAND.founderTwitter,
      "https://wa.me/919165100124",
    ],
    knowsAbout: [
      "Web Application Development",
      "Android Mobile App Development",
      "Enterprise ERP and CRM Solutions",
      "Artificial Intelligence & Automation Workflows",
      "Digital Marketing & SEO Engineering",
      "UI/UX Design Systems & Branding",
      "Cybersecurity and Cloud Systems",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Madhya Pradesh",
      },
    ],
  };

  return <JsonLd data={orgData} />;
}

/** Service / OfferCatalog structured data */
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
        description: "Official service catalogue of MLHK Infotech.",
        itemListElement: services.map((s, i) => ({
          "@type": "Service",
          position: i + 1,
          name: s.name,
          description: s.description,
          url: s.url ?? `${BRAND.url}/services`,
          serviceType: s.name,
          provider: {
            "@type": "Organization",
            "@id": `${BRAND.url}/#organization`,
            name: BRAND.name,
            url: BRAND.url,
          },
          areaServed: {
            "@type": "Country",
            name: "India",
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
          "@type": "Organization",
          "@id": `${BRAND.url}/#organization`,
          name: BRAND.name,
          url: BRAND.url,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "India",
          },
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: 23.664,
              longitude: 76.322,
            },
            geoRadius: "1000000",
          },
        ],
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
          "@type": "Organization",
          "@id": `${BRAND.url}/#organization`,
          name: BRAND.name,
          url: BRAND.url,
          logo: {
            "@type": "ImageObject",
            url: `${BRAND.url}/brand/logo-full.png`,
          },
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
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
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
          url: `${BRAND.url}/process#step-${i + 1}`,
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
