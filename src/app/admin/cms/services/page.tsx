"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function ServicesAdminPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/services").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Services</h1>
      <CrudTable
        title="Services"
        data={data}
        apiPath="/api/admin/services"
        onRefresh={load}
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon", label: "Icon (lucide name)" },
          { key: "order", label: "Order", type: "number" },
          { key: "active", label: "Active", type: "select", options: ["true", "false"] },
        ]}
      />
    </div>
  );
}
