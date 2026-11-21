"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function TestimonialsCMS() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
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
          CMS · Social Proof
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
          Client Testimonials
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Publish verified client feedback and ratings displayed across mlhk.in service pages.
        </p>
      </div>

      <CrudTable
        title="Testimonial"
        data={data}
        apiPath="/api/admin/testimonials"
        onRefresh={load}
        fields={[
          { key: "name", label: "Client Name", required: true, placeholder: "Anil Patidar" },
          { key: "company", label: "Company / City", placeholder: "Indore Traders Pvt. Ltd." },
          { key: "rating", label: "Rating (1–5)", type: "number", placeholder: "5" },
          { key: "active", label: "Published", type: "boolean" },
          { key: "message", label: "Review Message", type: "textarea", required: true },
        ]}
      />
    </div>
  );
}
