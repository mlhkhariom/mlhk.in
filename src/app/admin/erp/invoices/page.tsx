import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { invoices, clients } from "@/lib/db/schema";
import { sql, eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Plus } from "lucide-react";

export const runtime = "edge";

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  sent: "bg-blue-50 text-blue-600",
  paid: "bg-green-50 text-green-600",
  overdue: "bg-red-50 text-red-600",
  cancelled: "bg-gray-50 text-gray-400",
};

export default async function InvoicesPage() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const allInvoices = await db.select({ invoice: invoices, clientName: clients.name })
    .from(invoices).leftJoin(clients, eq(invoices.clientId, clients.id))
    .orderBy(sql`invoices.created_at desc`).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <Link href="/admin/erp/invoices/new" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Invoice
        </Link>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {["Invoice #", "Client", "Total", "Due Date", "Status"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allInvoices.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No invoices yet</td></tr>
              ) : allInvoices.map(({ invoice, clientName }) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs font-medium text-gray-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-3 text-gray-700">{clientName ?? "—"}</td>
                  <td className="px-6 py-3 font-medium">₹{(invoice.total ?? 0).toLocaleString()}</td>
                  <td className="px-6 py-3 text-gray-500">{invoice.dueDate ?? "—"}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${statusColor[invoice.status ?? "draft"]}`}>{invoice.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
