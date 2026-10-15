import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const BASE = "https://mlhk.in";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  const schemaItems = items.map((c) => ({
    name: c.label,
    url: c.href ? `${BASE}${c.href}` : undefined,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={schemaItems} />
      <nav
        aria-label="Breadcrumb navigation"
        className={`relative z-10 mx-auto max-w-6xl px-4 pt-3 pb-1 sm:pt-4 md:px-6 md:pt-6 md:pb-2 ${className}`}
      >
        <ol className="inline-flex max-w-full items-center gap-1 sm:gap-1.5 overflow-x-auto overscroll-x-contain rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] backdrop-blur-md scrollbar-none whitespace-nowrap">
          {items.map((item, i) => {
            const isFirst = i === 0;
            const isLast = i === items.length - 1;

            return (
              <li
                key={i}
                className="inline-flex shrink-0 items-center gap-1 sm:gap-1.5 text-zinc-400"
              >
                {i > 0 && (
                  <ChevronRight
                    className="size-2.5 sm:size-3 text-zinc-600 shrink-0"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                )}

                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="group inline-flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-md px-1 sm:px-1.5 py-0.5 font-medium transition-colors hover:bg-white/5 hover:text-[#ffb84d]"
                  >
                    {isFirst && (
                      <Home
                        className="size-2.5 sm:size-3 text-zinc-400 transition-colors group-hover:text-[#ffb84d] shrink-0"
                        strokeWidth={1.75}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className="inline-flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-md px-1 sm:px-1.5 py-0.5 font-medium text-white"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {isFirst && !item.href && (
                      <Home className="size-2.5 sm:size-3 text-[#ff9f1c] shrink-0" strokeWidth={1.75} />
                    )}
                    {isLast && (
                      <span
                        className="size-1 sm:size-1.5 shrink-0 rounded-full bg-[#ff9f1c] shadow-[0_0_8px_#ff9f1c]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="max-w-[130px] xs:max-w-[190px] sm:max-w-[280px] md:max-w-none truncate">
                      {item.label}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}