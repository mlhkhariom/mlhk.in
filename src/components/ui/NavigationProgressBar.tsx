"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or searchParams change, navigation is complete
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on internal links to start progress bar instantly
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Find closest anchor tag
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, anchor fragments, download, or new tabs
      if (
        href.startsWith("http") &&
        !href.startsWith(window.location.origin)
      ) {
        return;
      }
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      // Check if navigating to a different path
      const url = new URL(href, window.location.origin);
      if (
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) {
        // Trigger View Transition API if supported
        if ("startViewTransition" in document) {
          // document.startViewTransition is supported
        }

        setLoading(true);
        setProgress(20);

        setTimeout(() => {
          setProgress((prev) => (prev < 80 ? prev + 40 : prev));
        }, 150);

        setTimeout(() => {
          setProgress((prev) => (prev < 90 ? prev + 20 : prev));
        }, 350);
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[99999] h-[2.5px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#ff9f1c] via-[#ffb84d] to-[#ff9f1c] shadow-[0_0_12px_rgba(255,159,28,0.8),0_0_4px_rgba(255,184,77,0.9)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}

