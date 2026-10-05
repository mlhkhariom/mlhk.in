type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Renders JSON-LD structured data for SEO/AEO.
 * Usage: <JsonLd data={{ "@type": "Organization", name: "MLHK Infotech", ... }} />
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

/** BreadcrumbList structured data */
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

/** FAQPage structured data for AEO */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}

/** WebSite schema with SearchAction for sitelinks */
export function WebSiteJsonLd({ name, url }: { name: string; url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${url}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd data={data} />;
}

/** LocalBusiness / Organization schema */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MLHK Infotech",
        url: "https://mlhk.in",
        logo: "https://mlhk.in/logo.png",
        foundingDate: "2020-04",
        founder: { "@type": "Person", name: "Hariom Vishwkarma" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Near Hanuman Temple, Barnawad",
          addressLocality: "Shajapur",
          addressRegion: "Madhya Pradesh",
          postalCode: "466001",
          addressCountry: "IN",
        },
        sameAs: ["https://github.com/mlhkhariom"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "Mlhkinfotech@gmail.com",
          contactType: "sales",
          availableLanguage: ["en", "hi"],
        },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 1, maxValue: 10 },
      }}
    />
  );
}

/** Service schema for services page */
export function ServiceJsonLd({ services }: { services: { name: string; description: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: services.map((s, i) => ({
          "@type": "Service",
          position: i + 1,
          name: s.name,
          description: s.description,
          provider: { "@type": "Organization", name: "MLHK Infotech", url: "https://mlhk.in" },
        })),
      }}
    />
  );
}
