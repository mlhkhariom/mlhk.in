import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "edge";

const handler = async (req: Request) => {
  const { env } = getCloudflareContext();
  const auth = createAuth(env);
  return auth.handler(req);
};

export { handler as GET, handler as POST };
