"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "proposal", label: "Proposal" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default function LeadActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function updateStatus(status: string) {
    setUpdating(true);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        disabled={updating}
        value={currentStatus}
        onChange={(e) => updateStatus(e.target.value)}
        className="h-7 cursor-pointer rounded-lg border border-white/10 bg-[#121318] px-2 py-0 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none disabled:opacity-50"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value} className="bg-[#121318] text-white">
            {s.label}
          </option>
        ))}
      </select>
      {updating && (
        <Loader2 className="absolute right-2 size-3 animate-spin text-[#ff9f1c]" />
      )}
    </div>
  );
}
