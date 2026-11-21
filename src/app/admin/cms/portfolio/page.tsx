"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function PortfolioCMS() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/portfolio", { cache: "no-store" });
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
          CMS · Showcase &amp; Case Studies
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
          Portfolio &amp; Projects
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Highlight completed websites, mobile apps, and ERP platforms with live thumbnails and links.
        </p>
      </div>

      <CrudTable
        title="Project"
        data={data}
        apiPath="/api/admin/portfolio"
        onRefresh={load}
        previewHref={(row) => (row.url ? String(row.url) : null)}
        fields={[
          { key: "title", label: "Project Title", required: true, placeholder: "IKSC Knowledge Bridge" },
          { key: "tags", label: "Tags (comma-separated)", placeholder: "Next.js, SEO, Education" },
          { key: "image", label: "Cover Image", type: "image", placeholder: "/images/showcase/case-iksc.jpg" },
          { key: "url", label: "Live URL", type: "url", placeholder: "https://example.in" },
          { key: "order", label: "Display Order", type: "number", placeholder: "1" },
          { key: "description", label: "Summary & Outcomes", type: "textarea" },
        ]}
      />
    </div>
  );
}
