import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/lib/db";
import * as schema from "@/lib/db/schema";

const FALLBACK_DEV_SECRET = "mlhk-dev-ephemeral-secret-configure-BETTER_AUTH_SECRET-in-env";

export function createAuth(env: CloudflareEnv, requestOrigin?: string) {
  const db = getDb(env.DB);
  const trusted = new Set<string>([
    "https://mlhk.in",
    "https://www.mlhk.in",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);
  if (process.env.BETTER_AUTH_URL) trusted.add(process.env.BETTER_AUTH_URL);
  if (process.env.NEXT_PUBLIC_APP_URL) trusted.add(process.env.NEXT_PUBLIC_APP_URL);
  if (requestOrigin && /^https?:\/\//i.test(requestOrigin)) {
    trusted.add(requestOrigin);
  }

  return betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite", schema, usePlural: true }),
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET || FALLBACK_DEV_SECRET,
    baseURL: requestOrigin || process.env.BETTER_AUTH_URL || "https://mlhk.in",
    trustedOrigins: Array.from(trusted),
    emailAndPassword: { enabled: true },
    session: {
      cookieCache: { enabled: true, maxAge: 60 * 60 * 24 * 7 },
    },
    user: {
      additionalFields: {
        role: { type: "string", defaultValue: "client" },
      },
    },
    rateLimit: {
      window: 60,
      max: 100,
    },
    advanced: {
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip", "x-real-ip", "x-forwarded-for"],
      },
    },
  });
}
