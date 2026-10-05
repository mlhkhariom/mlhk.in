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
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-6">
        <ol className="flex items-center gap-1 text-sm text-gray-400">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} className="text-gray-300" />}
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}