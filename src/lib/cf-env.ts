// Helper to get Cloudflare env bindings in edge runtime
export function getCloudflareEnv(): CloudflareEnv {
  return (globalThis as unknown as { __env__: CloudflareEnv }).__env__ ?? (process as unknown as { env: CloudflareEnv }).env;
}
