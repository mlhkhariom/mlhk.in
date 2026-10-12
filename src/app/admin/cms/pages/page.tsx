"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function PagesAdminPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/pages").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold tracking-tight text-white">Custom Pages</h1>
      <CrudTable
        title="Pages"
        data={data}
        apiPath="/api/admin/pages"
        onRefresh={load}
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "content", label: "Content", type: "textarea" },
          { key: "metaTitle", label: "Meta Title" },
          { key: "metaDesc", label: "Meta Description" },
          { key: "status", label: "Status", type: "select", options: ["draft", "published"] },
        ]}
      />
    </div>
  );
}
