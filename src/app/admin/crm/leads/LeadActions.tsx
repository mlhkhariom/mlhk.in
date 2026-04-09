"use client";
import { useRouter } from "next/navigation";

const statuses = ["new", "contacted", "proposal", "won", "lost"];

export default function LeadActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch(`/api/admin/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    router.refresh();
  }

  return (
    <select value={currentStatus} onChange={e => updateStatus(e.target.value)}
      className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
