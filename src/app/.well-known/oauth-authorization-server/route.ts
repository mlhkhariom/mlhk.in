/**
 * RFC 8414: OAuth 2.0 Authorization Server Metadata
 * with Auth.md Agentic Registration Discovery (WorkOS / IETF ID-JAG profile)
 * Specification: https://www.rfc-editor.org/rfc/rfc8414 & https://workos.com/auth-md
 */

import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const asMetadata = {
    issuer: BRAND.url,
    authorization_endpoint: `${BRAND.url}/login`,
    token_endpoint: `${BRAND.url}/api/auth/token`,
    registration_endpoint: `${BRAND.url}/api/agent/auth/register`,
    revocation_endpoint: `${BRAND.url}/api/auth/revoke`,
    response_types_supported: ["code", "token"],
    grant_types_supported: [
      "authorization_code",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "urn:workos:agent-auth:grant-type:claim",
      "client_credentials",
    ],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "private_key_jwt",
      "none",
    ],
    scopes_supported: ["read", "write", "agent", "services"],
    code_challenge_methods_supported: ["S256"],

    // Auth.md Agent Registration Discovery Block
    agent_auth: {
      skill: `${BRAND.url}/auth.md`,
      register_uri: `${BRAND.url}/api/agent/auth/register`,
      identity_endpoint: `${BRAND.url}/api/agent/auth/register`,
      claim_uri: `${BRAND.url}/api/agent/claim`,
      claim_endpoint: `${BRAND.url}/api/agent/claim`,
      revocation_uri: `${BRAND.url}/api/auth/revoke`,
      events_endpoint: `${BRAND.url}/api/agent/event/notify`,
      identity_types_supported: [
        "identity_assertion",
        "verified_email",
        "anonymous",
      ],
      identity_assertion: {
        assertion_types_supported: [
          "urn:ietf:params:oauth:token-type:id-jag",
          "verified_email",
        ],
        credential_types_supported: ["bearer_token"],
      },
      anonymous: {
        credential_types_supported: ["bearer_token"],
        claim_uri: `${BRAND.url}/api/agent/claim`,
      },
      events_supported: [
        "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked",
      ],
    },
  };

  return new Response(JSON.stringify(asMetadata, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

