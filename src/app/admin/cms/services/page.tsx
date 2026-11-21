"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function ServicesCMS() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/services", { cache: "no-store" });
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
          CMS · Service Catalog
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
          Services Offered
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Manage core IT, web development, app engineering, SEO, and marketing offerings.
        </p>
      </div>

      <CrudTable
        title="Service"
        data={data}
        apiPath="/api/admin/services"
        onRefresh={load}
        fields={[
          { key: "title", label: "Service Title", required: true, placeholder: "Custom Web Engineering" },
          { key: "icon", label: "Icon Name (Lucide)", placeholder: "Globe, Smartphone, Search" },
          { key: "order", label: "Display Order", type: "number", placeholder: "1" },
          { key: "active", label: "Visible on Site", type: "boolean" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
      />
    </div>
  );
}
