"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const RAW_EXT_RE = /\.(xml|txt|json|pdf|svg|png|jpg|jpeg|webp|zip)$/i;

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  // When pathname or searchParams change, navigation is complete
  useEffect(() => {
    clearTimers();
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
      timersRef.current.push(timer);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, loading]);

  // Intercept click on internal links to start progress bar instantly
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (href.startsWith("http") && !href.startsWith(window.location.origin)) {
        return;
      }
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      const url = new URL(href, window.location.origin);
      if (RAW_EXT_RE.test(url.pathname)) return;

      if (
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) {
        clearTimers();
        setLoading(true);
        setProgress(20);

        timersRef.current.push(
          setTimeout(() => {
            setProgress((prev) => (prev < 80 ? prev + 40 : prev));
          }, 150),
        );

        timersRef.current.push(
          setTimeout(() => {
            setProgress((prev) => (prev < 90 ? prev + 20 : prev));
          }, 350),
        );

        // Safety fallback so bar never gets stuck if navigation is aborted
        timersRef.current.push(
          setTimeout(() => {
            setLoading(false);
            setProgress(0);
          }, 8000),
        );
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      clearTimers();
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

