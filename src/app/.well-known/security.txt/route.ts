/**
 * security.txt: Standard vulnerability disclosure policy file (RFC 9116).
 * Specification: https://www.rfc-editor.org/rfc/rfc9116
 */
import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400;

const SECURITY_TXT = `# MLHK Infotech Security Policy
# RFC 9116: A Reporting Mechanism for Security Vulnerabilities

Contact: mailto:security@mlhk.in
Contact: mailto:${BRAND.email}
Contact: tel:${BRAND.phoneE164}
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, hi
Canonical: ${BRAND.url}/.well-known/security.txt
Policy: ${BRAND.url}/privacy-policy
Hiring: ${BRAND.url}/contact
Acknowledgments: ${BRAND.url}/about
`;

export async function GET() {
  return new Response(SECURITY_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

