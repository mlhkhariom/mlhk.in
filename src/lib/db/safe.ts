import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";

/**
 * Returns a Drizzle handle when the Cloudflare D1 binding is available, or a
 * handle whose queries resolve to empty results when it is not (for example
 * `next start` locally, or when the database has not been provisioned yet).
 * Pages render their built-in content instead of failing with a 500.
 */
type Db = ReturnType<typeof getDb>;

function emptyChain(): unknown {
  const chain: Record<string, unknown> = {};
  const self = new Proxy(chain, {
    get(_t, prop) {
      if (prop === "all") return async () => [];
      if (prop === "get") return async () => undefined;
      if (prop === "then") return undefined;
      return () => self;
    },
  });
  return self;
}

export function safeDb(): Db {
  try {
    const { env } = getCloudflareContext();
    return getDb(env.DB);
  } catch {
    return {
      select: () => emptyChain(),
    } as unknown as Db;
  }
}

