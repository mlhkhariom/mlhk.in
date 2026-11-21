"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function PagesCMS() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/pages", { cache: "no-store" });
    const d = await res.json().catch(() => []);
    setData(Array.isArray(d) ? (d as Record<string, unknown>[]) : []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          CMS · Landing &amp; Static Pages
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
          CMS Pages
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Publish dynamic landing pages with custom slugs, SEO meta titles, and descriptions.
        </p>
      </div>

      <CrudTable
        title="Page"
        data={data}
        apiPath="/api/admin/pages"
        onRefresh={load}
        statusFilterKey="status"
        previewHref={(row) => (row.slug ? `/${String(row.slug).replace(/^\/+/, "")}` : null)}
        fields={[
          { key: "title", label: "Page Title", required: true, placeholder: "About MLHK Infotech" },
          { key: "slug", label: "URL Slug", required: true, placeholder: "about-us" },
          { key: "status", label: "Status", type: "select", options: ["draft", "published"], required: true },
          { key: "metaTitle", label: "SEO Meta Title", placeholder: "Custom SEO title (50–60 chars)" },
          { key: "metaDesc", label: "SEO Meta Description", type: "textarea", placeholder: "Summary shown in Google search results..." },
          { key: "content", label: "Content (Markdown / HTML)", type: "textarea" },
        ]}
      />
    </div>
  );
}
