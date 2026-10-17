/**
 * RFC 9728: OAuth 2.0 Protected Resource Metadata
 * Specification: https://www.rfc-editor.org/rfc/rfc9728
 */

import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const prm = {
    resource: BRAND.url,
    resource_name: `${BRAND.name} API & Services`,
    resource_documentation: `${BRAND.url}/services`,
    authorization_servers: [BRAND.url],
    scopes_supported: ["read", "write", "agent", "services"],
    bearer_methods_supported: ["header"],
    resource_signing_alg_values_supported: ["RS256", "ES256"],
  };

  return new Response(JSON.stringify(prm, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

