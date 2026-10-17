/**
 * RFC 9727: The 'api-catalog' Link Relation Type and Well-Known URI
 * Machine-readable API and service catalog discovery endpoint for AI agents.
 * Specification: https://www.rfc-editor.org/rfc/rfc9727
 */

import { BRAND, SERVICE_LINES } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: BRAND.url,
        "api-catalog": [
          {
            href: `${BRAND.url}/.well-known/api-catalog`,
            type: "application/linkset+json",
          },
        ],
        "service-desc": [
          {
            href: `${BRAND.url}/llms.txt`,
            type: "text/plain",
            title: `${BRAND.name} Standard Machine-Readable Specification`,
          },
        ],
        "service-doc": [
          {
            href: `${BRAND.url}/llms-full.txt`,
            type: "text/plain",
            title: `${BRAND.name} Full Technical and Organizational Dossier`,
          },
          {
            href: `${BRAND.url}/services`,
            type: "text/html",
            title: `${BRAND.name} Services Directory`,
          },
          ...SERVICE_LINES.map((s) => ({
            href: `${BRAND.url}/services/${s.slug}`,
            type: "text/html",
            title: `${s.title} — ${s.description}`,
          })),
        ],
        describedby: [
          {
            href: `${BRAND.url}/llms.txt`,
            type: "text/plain",
          },
          {
            href: `${BRAND.url}/robots.txt`,
            type: "text/plain",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
      Link: `</.well-known/api-catalog>; rel="self", </llms.txt>; rel="describedby"`,
    },
  });
}

