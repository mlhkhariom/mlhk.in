"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function SubsidiariesAdminPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/subsidiaries").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Subsidiaries / Brands</h1>
      <CrudTable
        title="Subsidiaries"
        data={data}
        apiPath="/api/admin/subsidiaries"
        onRefresh={load}
        fields={[
          { key: "name", label: "Brand Name", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "tagline", label: "Tagline" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "sector", label: "Sector" },
          { key: "url", label: "Website URL" },
          { key: "active", label: "Active", type: "select", options: ["true", "false"] },
        ]}
      />
    </div>
  );
}
