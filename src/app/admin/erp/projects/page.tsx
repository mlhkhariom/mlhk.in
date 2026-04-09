import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { projects, clients } from "@/lib/db/schema";
import { sql, eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Plus } from "lucide-react";

export const runtime = "edge";

const statusColor: Record<string, string> = {
  planning: "bg-gray-100 text-gray-600",
  active: "bg-green-50 text-green-600",
  on_hold: "bg-yellow-50 text-yellow-600",
  completed: "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-600",
};

export default async function ProjectsPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const allProjects = await db.select({ project: projects, clientName: clients.name })
    .from(projects).leftJoin(clients, eq(projects.clientId, clients.id))
    .orderBy(sql`projects.created_at desc`).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Link href="/admin/erp/projects/new" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Project
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProjects.length === 0 ? (
          <p className="text-gray-400 col-span-3 text-center py-12">No projects yet</p>
        ) : allProjects.map(({ project, clientName }) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded shrink-0 ml-2 ${statusColor[project.status ?? "planning"]}`}>{project.status}</span>
              </div>
              {clientName && <p className="text-xs text-gray-400 mb-2">Client: {clientName}</p>}
              {project.description && <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>}
              <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                <span>{project.startDate ?? "—"}</span>
                {project.budget && <span>₹{project.budget.toLocaleString()}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
