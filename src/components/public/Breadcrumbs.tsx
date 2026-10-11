import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const BASE = "https://mlhk.in";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schemaItems = items.map((c) => ({ name: c.label, url: c.href ? `${BASE}${c.href}` : BASE }));

  return (
    <>
      <BreadcrumbJsonLd items={schemaItems} />
      <nav aria-label="Breadcrumb" className="relative z-10 max-w-6xl mx-auto px-4 pt-6 md:px-6">
        <ol className="flex items-center gap-1 text-sm text-zinc-500">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} className="text-zinc-700" />}
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className="hover:text-[#ffb84d] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-zinc-200 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}