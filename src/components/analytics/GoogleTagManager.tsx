"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA4_ID, GTM_ID } from "@/lib/analytics";

export { GA4_ID, GTM_ID };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push a custom conversion or interaction event to both GA4 (G-7LWCNB06R4)
 * and Google Tag Manager (GTM-NLP5P6CG). Safe to call on client events.
 */
export function trackMlhkEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...params,
      send_to: GA4_ID,
    });
  }
}

/**
 * Tracks Next.js App Router SPA route transitions into Google Tag Manager
 * (`GTM-NLP5P6CG`) and direct GA4 (`G-7LWCNB06R4`) so real-time reporting
 * records every single client-side navigation accurately without double-firing
 * the initial server load.
 */
export function GtmPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.toString() ?? "";
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pagePath = query ? `${pathname}?${query}` : pathname;

    // Initial page_view is fired automatically by gtag('config', GA4_ID, { send_page_view: true })
    // and GTM container load; push SPA route changes cleanly on subsequent navigations.
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "mlhk_page_ready",
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA4_ID,
      });
    }
  }, [pathname, query]);

  return null;
}
