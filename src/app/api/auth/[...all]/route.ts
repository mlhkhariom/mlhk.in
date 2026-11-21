import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "@/lib/auth";

const handler = async (req: Request) => {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const origin = new URL(req.url).origin;
    const auth = createAuth(env, origin);
    return await auth.handler(req);
  } catch (err) {
    console.error("[AUTH_API_ERROR]", err);
    throw err;
  }
};

export { handler as GET, handler as POST };
