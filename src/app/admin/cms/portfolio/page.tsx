"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function PortfolioAdminPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/portfolio").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h1>
      <CrudTable
        title="Portfolio"
        data={data}
        apiPath="/api/admin/portfolio"
        onRefresh={load}
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL" },
          { key: "tags", label: "Tags (comma separated)" },
          { key: "url", label: "Project URL" },
          { key: "order", label: "Order", type: "number" },
        ]}
      />
    </div>
  );
}
