"use client";
import { useEffect, useState } from "react";
import { Plus, X, Check } from "lucide-react";

type Task = { id: string; title: string; status: string; priority: string; dueDate: string | null };
type Project = { project: { id: string; title: string; status: string; description: string | null; budget: number | null; startDate: string | null; endDate: string | null }; clientName: string | null };

const COLS = [
  { key: "todo", label: "To Do", color: "bg-gray-100" },
  { key: "in_progress", label: "In Progress", color: "bg-blue-50" },
  { key: "review", label: "Review", color: "bg-yellow-50" },
  { key: "done", label: "Done", color: "bg-green-50" },
];

const priorityColor: Record<string, string> = { low: "bg-gray-100 text-gray-500", medium: "bg-blue-50 text-blue-600", high: "bg-red-50 text-red-600" };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newTask, setNewTask] = useState<{ col: string; title: string } | null>(null);
  const [pForm, setPForm] = useState({ title: "", description: "", status: "planning", startDate: "", endDate: "", budget: "" });

  const loadProjects = async () => { const d = await fetch("/api/admin/projects").then(r => r.json()); setProjects(d as Project[]); };
  const loadTasks = async (pid: string) => { const d = await fetch(`/api/admin/tasks?projectId=${pid}`).then(r => r.json()); setTasks(d as Task[]); };

  useEffect(() => { loadProjects(); }, []);
  useEffect(() => { if (selected) loadTasks(selected); }, [selected]);

  async function createProject() {
    await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...pForm, budget: pForm.budget ? Number(pForm.budget) : null }) });
    setShowNewProject(false);
    setPForm({ title: "", description: "", status: "planning", startDate: "", endDate: "", budget: "" });
    loadProjects();
  }

  async function addTask(col: string, title: string) {
    if (!selected || !title.trim()) return;
    await fetch("/api/admin/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId: selected, title, status: col, priority: "medium" }) });
    setNewTask(null);
    loadTasks(selected);
  }

  async function moveTask(id: string, status: string) {
    await fetch("/api/admin/tasks", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (selected) loadTasks(selected);
  }

  async function deleteTask(id: string) {
    await fetch("/api/admin/tasks", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (selected) loadTasks(selected);
  }

  const selectedProject = projects.find(p => p.project.id === selected);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button onClick={() => setShowNewProject(true)} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus size={15} /> New Project</button>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">New Project</h3>
              <button onClick={() => setShowNewProject(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              {[["title", "Title *", "text"], ["description", "Description", "text"], ["startDate", "Start Date", "date"], ["endDate", "End Date", "date"], ["budget", "Budget (₹)", "number"]].map(([k, l, t]) => (
                <div key={k}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{l}</label>
                  <input type={t} value={(pForm as any)[k]} onChange={e => setPForm(f => ({ ...f, [k]: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Status</label>
                <select value={pForm.status} onChange={e => setPForm(f => ({ ...f, status: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {["planning", "active", "on_hold", "completed", "cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={createProject} disabled={!pForm.title} className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"><Check size={14} /> Create</button>
              <button onClick={() => setShowNewProject(false)} className="text-sm text-gray-500">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project List */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">All Projects ({projects.length})</p>
          {projects.map(({ project, clientName }) => (
            <button key={project.id} onClick={() => setSelected(project.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${selected === project.id ? "border-blue-500 bg-blue-50" : "bg-white hover:border-gray-300"}`}>
              <p className="text-sm font-medium text-gray-900 truncate">{project.title}</p>
              {clientName && <p className="text-xs text-gray-400 mt-0.5">{clientName}</p>}
              <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${project.status === "active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{project.status}</span>
            </button>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="lg:col-span-3">
          {!selected ? (
            <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed rounded-2xl">Select a project to view tasks</div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="font-semibold text-gray-900">{selectedProject?.project.title}</h2>
                {selectedProject?.project.budget && <p className="text-xs text-gray-400">Budget: ₹{selectedProject.project.budget.toLocaleString()}</p>}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {COLS.map(col => (
                  <div key={col.key} className={`${col.color} rounded-xl p-3 min-h-[200px]`}>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">{col.label} ({tasks.filter(t => t.status === col.key).length})</p>
                    <div className="space-y-2">
                      {tasks.filter(t => t.status === col.key).map(task => (
                        <div key={task.id} className="bg-white rounded-lg p-2.5 shadow-sm group">
                          <p className="text-xs text-gray-800 mb-1.5">{task.title}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${priorityColor[task.priority]}`}>{task.priority}</span>
                            <div className="hidden group-hover:flex gap-1">
                              {COLS.filter(c => c.key !== col.key).slice(0, 2).map(c => (
                                <button key={c.key} onClick={() => moveTask(task.id, c.key)} title={`Move to ${c.label}`}
                                  className="text-xs text-blue-500 hover:text-blue-700">→{c.label.slice(0, 2)}</button>
                              ))}
                              <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 ml-1"><X size={11} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {newTask?.col === col.key ? (
                      <div className="mt-2">
                        <input autoFocus placeholder="Task title..." value={newTask.title} onChange={e => setNewTask({ col: col.key, title: e.target.value })}
                          onKeyDown={e => { if (e.key === "Enter") addTask(col.key, newTask.title); if (e.key === "Escape") setNewTask(null); }}
                          className="w-full text-xs border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        <div className="flex gap-1 mt-1">
                          <button onClick={() => addTask(col.key, newTask.title)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Add</button>
                          <button onClick={() => setNewTask(null)} className="text-xs text-gray-400">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setNewTask({ col: col.key, title: "" })} className="mt-2 w-full text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 py-1">
                        <Plus size={12} /> Add task
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
