"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Check,
  FolderKanban,
  Sparkles,
  Calendar,
  AlertCircle,
  Loader2,
  ArrowRight,
  Trash2,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
};

type Project = {
  project: {
    id: string;
    title: string;
    status: string;
    description: string | null;
    budget: number | null;
    startDate: string | null;
    endDate: string | null;
  };
  clientName: string | null;
};

const COLS = [
  { key: "todo", label: "To Do", bg: "bg-white/[0.02]", border: "border-white/10" },
  { key: "in_progress", label: "In Progress", bg: "bg-blue-500/[0.03]", border: "border-blue-500/20" },
  { key: "review", label: "Review", bg: "bg-amber-500/[0.03]", border: "border-amber-500/20" },
  { key: "done", label: "Done", bg: "bg-emerald-500/[0.03]", border: "border-emerald-500/20" },
];

const priorityStyles: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20" },
  medium: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  high: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newTask, setNewTask] = useState<{ col: string; title: string } | null>(null);
  const [savingProject, setSavingProject] = useState(false);
  const [pForm, setPForm] = useState({
    title: "",
    description: "",
    status: "planning",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const loadProjects = async () => {
    try {
      const d = await fetch("/api/admin/projects").then((r) => r.json());
      const arr = Array.isArray(d) ? (d as Project[]) : [];
      setProjects(arr);
      if (arr.length > 0 && !selected) {
        setSelected(arr[0].project.id);
      }
    } catch {
      setProjects([]);
    }
  };

  const loadTasks = async (pid: string) => {
    try {
      const d = await fetch(`/api/admin/tasks?projectId=${pid}`).then((r) => r.json());
      setTasks(Array.isArray(d) ? (d as Task[]) : []);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selected) loadTasks(selected);
  }, [selected]);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    if (!pForm.title) return;
    setSavingProject(true);
    try {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pForm,
          budget: pForm.budget ? Number(pForm.budget) : null,
        }),
      });
      setShowNewProject(false);
      setPForm({
        title: "",
        description: "",
        status: "planning",
        startDate: "",
        endDate: "",
        budget: "",
      });
      loadProjects();
    } finally {
      setSavingProject(false);
    }
  }

  async function addTask(col: string, title: string) {
    if (!selected || !title.trim()) return;
    await fetch("/api/admin/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: selected,
        title,
        status: col,
        priority: "medium",
      }),
    });
    setNewTask(null);
    loadTasks(selected);
  }

  async function moveTask(id: string, status: string) {
    await fetch("/api/admin/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (selected) loadTasks(selected);
  }

  async function deleteTask(id: string) {
    await fetch("/api/admin/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (selected) loadTasks(selected);
  }

  const selectedProject = projects.find((p) => p.project.id === selected);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Projects & Task Boards
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Sprint tracking, client deliverables, and engineering progress boards.
          </p>
        </div>

        <button
          onClick={() => setShowNewProject(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d]"
        >
          <Plus size={15} strokeWidth={2.5} /> New Project
        </button>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={() => setShowNewProject(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0c0d11] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
                  <FolderKanban size={14} />
                </span>
                <h3 className="font-display text-base font-bold text-white">Create Project</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewProject(false)}
                className="rounded-lg p-1 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={createProject} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Project Title <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  required
                  value={pForm.title}
                  onChange={(e) => setPForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Enterprise CRM Cloudflare Port"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={pForm.description}
                  onChange={(e) => setPForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Scope, milestones and deliverables..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={pForm.startDate}
                    onChange={(e) => setPForm((f) => ({ ...f, startDate: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={pForm.endDate}
                    onChange={(e) => setPForm((f) => ({ ...f, endDate: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-300">
                    Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={pForm.budget}
                    onChange={(e) => setPForm((f) => ({ ...f, budget: e.target.value }))}
                    placeholder="150000"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-300">
                    Initial Status
                  </label>
                  <select
                    value={pForm.status}
                    onChange={(e) => setPForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#121318] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  >
                    {["planning", "active", "on_hold", "completed", "cancelled"].map((s) => (
                      <option key={s} value={s} className="bg-[#121318] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject || !pForm.title}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black shadow-md hover:bg-[#ffb84d] disabled:opacity-50"
                >
                  {savingProject ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Check size={13} strokeWidth={2.5} />
                  )}{" "}
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Grid: Sidebar Project List + Kanban Board */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column: Projects list */}
        <div className="space-y-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <span>Projects ({projects.length})</span>
          </div>

          <div className="space-y-2">
            {projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-zinc-500">
                No active projects
              </div>
            ) : (
              projects.map(({ project, clientName }) => {
                const isActive = selected === project.id;
                return (
                  <button
                    key={project.id}
                    onClick={() => setSelected(project.id)}
                    className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                      isActive
                        ? "border-[#ff9f1c]/40 bg-[#ff9f1c]/10 text-white shadow-md"
                        : "border-white/10 bg-[#0c0d11] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    <p className="truncate text-xs font-bold text-white">{project.title}</p>
                    {clientName && (
                      <p className="mt-0.5 text-[11px] text-zinc-400">{clientName}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium uppercase text-zinc-400">
                        {project.status}
                      </span>
                      {project.budget && (
                        <span className="font-mono text-[11px] text-[#ffb84d]">
                          ₹{(project.budget / 1000).toFixed(0)}k
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Kanban Columns */}
        <div className="lg:col-span-3">
          {!selectedProject ? (
            <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] text-xs text-zinc-500">
              Select or create a project to load its interactive Kanban board
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selected Project Overview Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0c0d11] p-4">
                <div>
                  <h2 className="font-display text-base font-bold text-white">
                    {selectedProject.project.title}
                  </h2>
                  {selectedProject.project.description && (
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {selectedProject.project.description}
                    </p>
                  )}
                </div>
                {selectedProject.project.budget && (
                  <span className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                    Budget: ₹{selectedProject.project.budget.toLocaleString()}
                  </span>
                )}
              </div>

              {/* 4 Column Kanban Board */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {COLS.map((col) => {
                  const colTasks = tasks.filter((t) => t.status === col.key);

                  return (
                    <div
                      key={col.key}
                      className={`flex flex-col rounded-2xl border ${col.border} ${col.bg} p-3 min-h-[360px]`}
                    >
                      {/* Column Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                          {col.label}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-zinc-400">
                          {colTasks.length}
                        </span>
                      </div>

                      {/* Tasks Container */}
                      <div className="flex-1 space-y-2">
                        {colTasks.map((task) => {
                          const p = priorityStyles[task.priority] || priorityStyles.medium;

                          return (
                            <div
                              key={task.id}
                              className="group relative rounded-xl border border-white/10 bg-[#0c0d11] p-3 shadow-sm transition-all hover:border-white/25"
                            >
                              <p className="text-xs font-medium text-white">{task.title}</p>
                              <div className="mt-2.5 flex items-center justify-between pt-1">
                                <span
                                  className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${p.border} ${p.bg} ${p.text}`}
                                >
                                  {task.priority}
                                </span>

                                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                  {COLS.filter((c) => c.key !== col.key)
                                    .slice(0, 2)
                                    .map((c) => (
                                      <button
                                        key={c.key}
                                        onClick={() => moveTask(task.id, c.key)}
                                        title={`Move to ${c.label}`}
                                        className="rounded px-1 text-[10px] font-bold text-zinc-400 hover:bg-white/10 hover:text-[#ffb84d]"
                                      >
                                        →{c.label.slice(0, 2)}
                                      </button>
                                    ))}
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    title="Delete task"
                                    className="rounded p-0.5 text-zinc-500 hover:text-red-400"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Task Input / Button */}
                      {newTask?.col === col.key ? (
                        <div className="mt-3 space-y-2">
                          <input
                            autoFocus
                            placeholder="Task description..."
                            value={newTask.title}
                            onChange={(e) =>
                              setNewTask({ col: col.key, title: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") addTask(col.key, newTask.title);
                              if (e.key === "Escape") setNewTask(null);
                            }}
                            className="w-full rounded-lg border border-[#ff9f1c] bg-white/[0.06] px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => addTask(col.key, newTask.title)}
                              className="rounded-lg bg-[#ff9f1c] px-2.5 py-1 text-[11px] font-bold text-black hover:bg-[#ffb84d]"
                            >
                              Add
                            </button>
                            <button
                              onClick={() => setNewTask(null)}
                              className="rounded-lg px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setNewTask({ col: col.key, title: "" })}
                          className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-white/10 py-1.5 text-[11px] font-medium text-zinc-400 transition-colors hover:border-[#ff9f1c]/40 hover:text-[#ffb84d]"
                        >
                          <Plus size={12} /> Add Task
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
