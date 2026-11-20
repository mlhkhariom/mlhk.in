import type { ImageLoaderProps } from "next/image";

/**
 * Cloudflare Workers & Static Assets safe Next.js image loader.
 *
 * On `@opennextjs/cloudflare`, the default `/_next/image` runtime endpoint depends on
 * Cloudflare Images Transformations being enabled on the zone and fails with 403/500
 * when transformations are unavailable or self-fetches hit `global_fetch_strictly_public`.
 *
 * Serving pre-optimized static assets directly from `/public` via Cloudflare's global
 * `ASSETS` CDN guarantees 100% image reliability in production and local dev with
 * zero Worker CPU overhead. Passing the harmless `?w=` query param satisfies Next.js
 * responsive `srcSet` width accounting without routing through `/_next/image`.
 */
export function resolveStaticImageSrc(src: string, width?: number): string {
  const trimmed = src.trim();
  if (!trimmed) {
    return "/images/showcase/studio-hub.jpg";
  }

  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  const normalized =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : trimmed.startsWith("/")
        ? trimmed
        : `/${trimmed}`;

  if (!width || !Number.isFinite(width)) {
    return normalized;
  }

  const sep = normalized.includes("?") ? "&" : "?";
  return `${normalized}${sep}w=${Math.round(width)}`;
}

export default function cloudflareStaticImageLoader({ src, width }: ImageLoaderProps): string {
  return resolveStaticImageSrc(src, width);
}
