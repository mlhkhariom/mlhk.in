"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function SubsidiariesCMS() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/subsidiaries", { cache: "no-store" });
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
          CMS · MLHK Ventures &amp; Brands
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
          Subsidiaries &amp; Ventures
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Manage partner brands, SaaS initiatives, and group subsidiaries under MLHK Infotech.
        </p>
      </div>

      <CrudTable
        title="Subsidiary"
        data={data}
        apiPath="/api/admin/subsidiaries"
        onRefresh={load}
        previewHref={(row) => (row.url ? String(row.url) : null)}
        fields={[
          { key: "name", label: "Brand Name", required: true, placeholder: "MLHK Cloud" },
          { key: "slug", label: "Slug", required: true, placeholder: "mlhk-cloud" },
          { key: "sector", label: "Industry Sector", placeholder: "Cloud Infrastructure" },
          { key: "active", label: "Active", type: "boolean" },
          { key: "tagline", label: "Tagline" },
          { key: "logo", label: "Logo URL", type: "image" },
          { key: "url", label: "Website URL", type: "url", placeholder: "https://..." },
          { key: "description", label: "Description", type: "textarea" },
        ]}
      />
    </div>
  );
}
