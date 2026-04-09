"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function ClientsPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/clients").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Clients</h1>
      <CrudTable
        title="Client"
        data={data}
        apiPath="/api/admin/clients"
        onRefresh={load}
        fields={[
          { key: "name", label: "Full Name", required: true },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "company", label: "Company" },
          { key: "address", label: "Address", type: "textarea" },
          { key: "gst", label: "GST Number" },
          { key: "notes", label: "Notes", type: "textarea" },
        ]}
      />
    </div>
  );
}
