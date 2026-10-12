import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";


const handler = async (req: Request) => {
  try {
    const { env } = getCloudflareContext();
    const auth = createAuth(env);
    return await auth.handler(req);
  } catch (err) {
    console.error("[AUTH_API_ERROR]", err);
    throw err;
  }
};

export { handler as GET, handler as POST };
