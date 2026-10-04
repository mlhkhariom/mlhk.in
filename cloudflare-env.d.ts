interface CloudflareEnv {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;
  WORKER_SELF_REFERENCE: Fetcher;
  BETTER_AUTH_SECRET: string;
  RESEND_API_KEY: string;
  /** Public base URL for uploaded media (e.g. an R2 custom domain). Optional. */
  MEDIA_PUBLIC_URL?: string;
  /** Turnstile secret for server-side token verification. Optional. */
  TURNSTILE_SECRET_KEY?: string;
}
