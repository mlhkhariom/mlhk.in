"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function TestimonialsAdminPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/testimonials").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold tracking-tight text-white">Testimonials</h1>
      <CrudTable
        title="Testimonials"
        data={data}
        apiPath="/api/admin/testimonials"
        onRefresh={load}
        fields={[
          { key: "name", label: "Client Name", required: true },
          { key: "company", label: "Company" },
          { key: "message", label: "Message", type: "textarea", required: true },
          { key: "rating", label: "Rating (1-5)", type: "number" },
          { key: "active", label: "Active", type: "select", options: ["true", "false"] },
        ]}
      />
    </div>
  );
}
