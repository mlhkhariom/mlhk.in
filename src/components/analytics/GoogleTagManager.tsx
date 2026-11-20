"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const GTM_ID = "GTM-NLP5P6CG";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks Next.js App Router SPA route transitions into Google Tag Manager
 * (`GTM-NLP5P6CG`) and GA4 `dataLayer` so every navigation is recorded.
 */
export function GtmPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.toString() ?? "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, query]);

  return null;
}
