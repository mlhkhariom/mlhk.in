"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ShowcaseImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
}

/**
 * Resilient showcase image wrapper backed by our Cloudflare-safe static image loader.
 * Guarantees `referrerPolicy="no-referrer"`, smooth reveal, and automatic fallback
 * to a guaranteed local showcase asset if a dynamic CMS/R2 URL ever fails.
 */
export function ShowcaseImage({
  src,
  alt,
  fallbackSrc = "/images/showcase/studio-hub.jpg",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  loading,
  className,
}: ShowcaseImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [failedCompletely, setFailedCompletely] = useState(false);

  if (failedCompletely) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(255,159,28,0.22),transparent_55%),linear-gradient(160deg,#111319_0%,#060709_100%)] p-6 text-center"
      >
        <div className="space-y-1.5">
          <p className="font-display text-sm font-bold text-[#ffb84d]">MLHK Infotech</p>
          <p className="max-w-xs text-xs text-zinc-400">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : loading}
      referrerPolicy="no-referrer"
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setFailedCompletely(true);
        }
      }}
    />
  );
}
