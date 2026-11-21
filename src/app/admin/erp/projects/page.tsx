"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  FolderKanban,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Pencil,
  Receipt,
  Calendar,
  Building2,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { computeProjectProgress, formatInr } from "@/lib/erp-utils";

type Project = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  budget: number | null;
  startDate: string | null;
  endDate: string | null;
  clientId: string | null;
};

type ProjectRow = {
  project: Project;
  clientName: string | null;
  clientCompany: string | null;
  taskCount: number;
  completedTaskCount: number;
};

type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
};

type ClientOption = { id: string; name: string; company: string | null };

const COLUMNS = [
  { key: "todo", label: "To Do", dot: "bg-zinc-400" },
  { key: "in_progress", label: "In Progress", dot: "bg-sky-400" },
  { key: "review", label: "Review", dot: "bg-[#ff9f1c]" },
  { key: "done", label: "Done", dot: "bg-emerald-400" },
] as const;

const PROJECT_STATUSES = ["planning", "active", "on_hold", "completed", "cancelled"] as const;

const STATUS_DOT: Record<string, string> = {
  planning: "bg-zinc-400",
  active: "bg-emerald-400",
  on_hold: "bg-[#ff9f1c]",
  completed: "bg-sky-400",
  cancelled: "bg-rose-400",
};

const PRIORITY_TEXT: Record<string, string> = {
  high: "text-rose-400",
  medium: "text-[#ff9f1c]",
  low: "text-zinc-400",
};

const EMPTY_PROJECT = {
  title: "",
  description: "",
  clientId: "",
  status: "active",
  budget: "",
  startDate: "",
  endDate: "",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [savingProject, setSavingProject] = useState(false);
  const [confirmDeleteProjectId, setConfirmDeleteProjectId] = useState<string | null>(null);

  const [newTask, setNewTask] = useState({ title: "", priority: "medium", dueDate: "" });
  const [addingTask, setAddingTask] = useState(false);

  const loadProjects = async (keepSelection = true) => {
    setError(null);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("/api/admin/projects", { cache: "no-store" }),
        fetch("/api/admin/clients", { cache: "no-store" }).catch(() => null),
      ]);
      if (!pRes.ok) throw new Error("Failed to load projects");
      const list = (await pRes.json()) as ProjectRow[];
      const safeList = Array.isArray(list) ? list : [];
      setProjects(safeList);
      if (cRes?.ok) {
        const cl = await cRes.json();
        if (Array.isArray(cl)) setClients(cl as ClientOption[]);
      }
      setSelectedId((prev) => {
        if (keepSelection && prev && safeList.some((r) => r.project.id === prev)) return prev;
        return safeList[0]?.project.id ?? null;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load projects");
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async (projectId: string) => {
    setLoadingTasks(true);
    try {
      const res = await fetch(`/api/admin/tasks?projectId=${encodeURIComponent(projectId)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load project tasks");
      const data = await res.json();
      setTasks(Array.isArray(data) ? (data as Task[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadProjects(false);
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadTasks(selectedId);
    } else {
      setTasks([]);
    }
  }, [selectedId]);

  useEffect(() => {
    if (!showProjectModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowProjectModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showProjectModal]);

  const selectedRow = useMemo(
    () => projects.find((p) => p.project.id === selectedId) ?? null,
    [projects, selectedId]
  );

  const progress = useMemo(() => computeProjectProgress(tasks), [tasks]);

  const totalBudget = useMemo(
    () => projects.reduce((sum, r) => sum + Number(r.project.budget ?? 0), 0),
    [projects]
  );
  const activeCount = useMemo(
    () => projects.filter((r) => r.project.status === "active").length,
    [projects]
  );
  const completedCount = useMemo(
    () => projects.filter((r) => r.project.status === "completed").length,
    [projects]
  );

  function openCreateProject() {
    setEditProjectId(null);
    setProjectForm(EMPTY_PROJECT);
    setShowProjectModal(true);
  }

  function openEditProject(p: Project) {
    setEditProjectId(p.id);
    setProjectForm({
      title: p.title ?? "",
      description: p.description ?? "",
      clientId: p.clientId ?? "",
      status: p.status ?? "active",
      budget: p.budget != null ? String(p.budget) : "",
      startDate: p.startDate ?? "",
      endDate: p.endDate ?? "",
    });
    setShowProjectModal(true);
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    if (!projectForm.title.trim()) return;
    setSavingProject(true);
    setError(null);
    try {
      const payload = {
        ...(editProjectId ? { id: editProjectId } : {}),
        title: projectForm.title.trim(),
        description: projectForm.description.trim() || null,
        clientId: projectForm.clientId || null,
        status: projectForm.status,
        budget: projectForm.budget ? Number(projectForm.budget) : null,
        startDate: projectForm.startDate || null,
        endDate: projectForm.endDate || null,
      };
      const res = await fetch("/api/admin/projects", {
        method: editProjectId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to save project");
      setShowProjectModal(false);
      await loadProjects(true);
      if (!editProjectId && data.id) setSelectedId(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save project");
    } finally {
      setSavingProject(false);
    }
  }

  async function deleteProject(id: string) {
    setError(null);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to delete project");
      }
      setConfirmDeleteProjectId(null);
      await loadProjects(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.title.trim() || !selectedId) return;
    setAddingTask(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedId,
          title: newTask.title.trim(),
          priority: newTask.priority,
          dueDate: newTask.dueDate || undefined,
          status: "todo",
        }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      setNewTask({ title: "", priority: "medium", dueDate: "" });
      await Promise.all([loadTasks(selectedId), loadProjects(true)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add task");
    } finally {
      setAddingTask(false);
    }
  }

  async function moveTask(id: string, status: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    const res = await fetch("/api/admin/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok && selectedId) {
      loadProjects(true);
    }
  }

  async function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    const res = await fetch("/api/admin/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok && selectedId) {
      loadProjects(true);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            ERP · Delivery &amp; Engineering
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Projects &amp; Kanban
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Track client builds, deliverables, sprint tasks, budgets, and milestone timelines.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateProject}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>New Project</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Total Projects</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-white">
            {projects.length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Active Builds</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {activeCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Shipped / Completed</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-sky-400">
            {completedCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Combined Portfolio Value</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-[#ff9f1c]">
            {formatInr(totalBudget)}
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
        >
          <span className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </span>
          <button type="button" onClick={() => setError(null)} aria-label="Dismiss error">
            <X size={14} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex h-52 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f14]">
          <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] px-6 py-16 text-center">
          <FolderKanban className="mx-auto size-8 text-zinc-600" />
          <p className="mt-3 text-sm font-medium text-zinc-300">No projects created yet</p>
          <p className="mt-1 text-xs text-zinc-500">
            Create your first client project to manage sprint tasks on the Kanban board.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 3 Cols: Project Roster */}
          <div className="space-y-2 lg:col-span-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Project Roster ({projects.length})
            </p>
            <div className="space-y-2">
              {projects.map((row) => {
                const p = row.project;
                const active = p.id === selectedId;
                const pct =
                  row.taskCount > 0 ? Math.round((row.completedTaskCount / row.taskCount) * 100) : 0;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                      active
                        ? "border-[#ff9f1c]/50 bg-[#0d0f14]"
                        : "border-white/10 bg-[#0d0f14]/60 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="truncate text-xs font-semibold text-white">{p.title}</span>
                      <span
                        className={`mt-1 size-1.5 shrink-0 rounded-full ${
                          STATUS_DOT[p.status] ?? "bg-zinc-400"
                        }`}
                      />
                    </div>
                    <p className="mt-1 truncate text-[11px] text-zinc-500">
                      {row.clientCompany || row.clientName || "Internal / Direct"}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                      <span>{p.budget ? formatInr(p.budget) : "No budget"}</span>
                      <span className="tabular-nums">
                        {row.completedTaskCount}/{row.taskCount} tasks ({pct}%)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 9 Cols: Selected Project Detail & 4-Column Kanban */}
          {selectedRow && (
            <div className="space-y-5 lg:col-span-9">
              {/* Project Summary Header */}
              <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-display text-lg font-bold text-white">
                        {selectedRow.project.title}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 text-xs capitalize text-zinc-300">
                        <span
                          className={`size-1.5 rounded-full ${
                            STATUS_DOT[selectedRow.project.status] ?? "bg-zinc-400"
                          }`}
                        />
                        {selectedRow.project.status.replace("_", " ")}
                      </span>
                    </div>
                    {selectedRow.project.description && (
                      <p className="mt-1.5 text-xs text-zinc-400">
                        {selectedRow.project.description}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                      {(selectedRow.clientCompany || selectedRow.clientName) && (
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="size-3.5 text-zinc-500" />
                          {selectedRow.clientCompany || selectedRow.clientName}
                        </span>
                      )}
                      {selectedRow.project.budget != null && (
                        <span className="font-mono font-semibold text-[#ff9f1c]">
                          {formatInr(selectedRow.project.budget)}
                        </span>
                      )}
                      {(selectedRow.project.startDate || selectedRow.project.endDate) && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
                          <Calendar className="size-3" />
                          {selectedRow.project.startDate || "TBD"} →{" "}
                          {selectedRow.project.endDate || "TBD"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <Link
                      href={`/admin/erp/invoices/new?projectId=${selectedRow.project.id}${
                        selectedRow.project.clientId ? `&clientId=${selectedRow.project.clientId}` : ""
                      }`}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-medium text-zinc-200 hover:border-white/25 hover:text-white"
                    >
                      <Receipt className="size-3.5 text-[#ff9f1c]" />
                      <span>Bill GST</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => openEditProject(selectedRow.project)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs text-zinc-300 hover:border-white/25 hover:text-white"
                    >
                      <Pencil className="size-3" />
                      <span>Edit</span>
                    </button>
                    {confirmDeleteProjectId === selectedRow.project.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => deleteProject(selectedRow.project.id)}
                          className="h-8 rounded-lg border border-red-500/40 bg-red-500/20 px-3 text-xs font-semibold text-red-200 hover:bg-red-500/30"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteProjectId(null)}
                          className="h-8 rounded-lg border border-white/10 px-2.5 text-xs text-zinc-400"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteProjectId(selectedRow.project.id)}
                        title="Delete Project"
                        className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-red-500/40 hover:text-red-400"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Sprint Completion</span>
                    <span className="font-mono font-semibold tabular-nums text-zinc-200">
                      {progress.done}/{progress.total} tasks ({progress.percent}%)
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      style={{ width: `${progress.percent}%` }}
                      className="h-full rounded-full bg-[#ff9f1c] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Inline Add Task Form */}
              <form
                onSubmit={addTask}
                className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-[#0d0f14] p-3.5 sm:flex-row sm:items-center"
              >
                <input
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask((t) => ({ ...t, title: e.target.value }))}
                  placeholder="Add deliverable or engineering task..."
                  className="h-9 flex-1 rounded-lg border border-white/10 bg-[#07080a] px-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]"
                />
                <div className="flex items-center gap-2">
                  <select
                    aria-label="Task priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask((t) => ({ ...t, priority: e.target.value }))}
                    className="h-9 rounded-lg border border-white/10 bg-[#07080a] px-2.5 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="date"
                    aria-label="Task due date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask((t) => ({ ...t, dueDate: e.target.value }))}
                    className="h-9 rounded-lg border border-white/10 bg-[#07080a] px-2.5 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                  <button
                    type="submit"
                    disabled={addingTask || !newTask.title.trim()}
                    className="inline-flex h-9 items-center gap-1 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
                  >
                    {addingTask ? <Loader2 size={13} className="animate-spin" /> : <Plus size={14} />}
                    <span>Add Task</span>
                  </button>
                </div>
              </form>

              {/* 4-Column Kanban Board */}
              {loadingTasks ? (
                <div className="flex h-40 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f14]">
                  <Loader2 className="size-5 animate-spin text-[#ff9f1c]" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {COLUMNS.map((col, colIdx) => {
                    const colTasks = tasks.filter((t) => t.status === col.key);
                    const prevCol = colIdx > 0 ? COLUMNS[colIdx - 1] : null;
                    const nextCol = colIdx < COLUMNS.length - 1 ? COLUMNS[colIdx + 1] : null;

                    return (
                      <div
                        key={col.key}
                        className="flex min-h-[280px] flex-col rounded-xl border border-white/10 bg-[#0d0f14] p-3.5"
                      >
                        <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                          <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                            <span className={`size-2 rounded-full ${col.dot}`} />
                            {col.label}
                          </span>
                          <span className="font-mono text-[11px] tabular-nums text-zinc-500">
                            {colTasks.length}
                          </span>
                        </div>

                        <div className="flex-1 space-y-2.5">
                          {colTasks.length === 0 ? (
                            <p className="py-8 text-center text-[11px] text-zinc-600">No tasks</p>
                          ) : (
                            colTasks.map((task) => (
                              <div
                                key={task.id}
                                className="rounded-lg border border-white/10 bg-[#07080a] p-3"
                              >
                                <p className="text-xs font-medium leading-snug text-zinc-100">
                                  {task.title}
                                </p>
                                <div className="mt-2 flex items-center justify-between text-[10px]">
                                  <span
                                    className={`font-mono uppercase ${
                                      PRIORITY_TEXT[task.priority] ?? "text-zinc-400"
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                  {task.dueDate && (
                                    <span className="font-mono text-zinc-500">{task.dueDate}</span>
                                  )}
                                </div>

                                <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2">
                                  <div className="flex items-center gap-1">
                                    {prevCol && (
                                      <button
                                        type="button"
                                        onClick={() => moveTask(task.id, prevCol.key)}
                                        title={`Move back to ${prevCol.label}`}
                                        className="flex size-6 items-center justify-center rounded border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                                      >
                                        <ArrowLeft size={11} />
                                      </button>
                                    )}
                                    {nextCol && (
                                      <button
                                        type="button"
                                        onClick={() => moveTask(task.id, nextCol.key)}
                                        title={`Move to ${nextCol.label}`}
                                        className="inline-flex h-6 items-center gap-1 rounded border border-white/10 px-2 text-[10px] font-medium text-zinc-300 hover:border-[#ff9f1c]/50 hover:text-[#ff9f1c]"
                                      >
                                        <span>{nextCol.label}</span>
                                        <ArrowRight size={10} />
                                      </button>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => deleteTask(task.id)}
                                    title="Delete task"
                                    className="rounded p-1 text-zinc-500 hover:text-rose-400"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {showProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={() => setShowProjectModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/15 bg-[#0d0f14] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 id="project-modal-title" className="font-display text-base font-bold text-white">
                {editProjectId ? "Edit Project" : "New Client Project"}
              </h2>
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                aria-label="Close modal"
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={saveProject} className="mt-4 space-y-3.5">
              <div>
                <label htmlFor="proj-title" className="mb-1 block text-xs font-medium text-zinc-300">
                  Project Title <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="proj-title"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Indore E-Commerce Web & Mobile Suite"
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="proj-client" className="mb-1 block text-xs font-medium text-zinc-300">
                    Client Account
                  </label>
                  <select
                    id="proj-client"
                    value={projectForm.clientId}
                    onChange={(e) => setProjectForm({ ...projectForm, clientId: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  >
                    <option value="">Internal / Direct</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.company ? `(${c.company})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="proj-status" className="mb-1 block text-xs font-medium text-zinc-300">
                    Status
                  </label>
                  <select
                    id="proj-status"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  >
                    {PROJECT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="proj-budget" className="mb-1 block text-xs font-medium text-zinc-300">
                    Budget (INR)
                  </label>
                  <input
                    id="proj-budget"
                    type="number"
                    min={0}
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    placeholder="75000"
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
                <div>
                  <label htmlFor="proj-start" className="mb-1 block text-xs font-medium text-zinc-300">
                    Start Date
                  </label>
                  <input
                    id="proj-start"
                    type="date"
                    value={projectForm.startDate}
                    onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
                <div>
                  <label htmlFor="proj-end" className="mb-1 block text-xs font-medium text-zinc-300">
                    Target Launch
                  </label>
                  <input
                    id="proj-end"
                    type="date"
                    value={projectForm.endDate}
                    onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="proj-desc" className="mb-1 block text-xs font-medium text-zinc-300">
                  Scope &amp; Deliverables
                </label>
                <textarea
                  id="proj-desc"
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Next.js storefront, Razorpay checkout, admin CMS, technical SEO setup..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
                >
                  {savingProject ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Check size={13} strokeWidth={2.5} />
                  )}
                  <span>{editProjectId ? "Save Changes" : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
