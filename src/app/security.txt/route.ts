/**
 * Legacy alias for /.well-known/security.txt as per RFC 9116 Section 4.
 */
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export async function GET() {
  redirect("/.well-known/security.txt");
}

