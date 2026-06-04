"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import EmptyCmsHint from "@/components/admin/EmptyCmsHint";
import { ItemActions } from "@/components/admin/ItemActions";
import { adminJson, useAdminResource } from "@/components/admin/useAdminResource";
import {
  AdminButton,
  AdminCard,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/admin-ui";

type ScheduleRow = {
  id: number;
  schedule_type: "leca_week" | "hackathon";
  time: string;
  phase: string;
  description: string;
  sort_order: number;
};

const emptyForm = {
  scheduleType: "leca_week" as "leca_week" | "hackathon",
  time: "",
  phase: "",
  description: "",
  sortOrder: "0",
};

export default function AdminSchedulePage() {
  const [filter, setFilter] = useState<"all" | "leca_week" | "hackathon">("all");
  const url =
    filter === "all" ? "/api/admin/schedule" : `/api/admin/schedule?type=${filter}`;
  const { items, loading, msg, setMsg, load } =
    useAdminResource<ScheduleRow>(url);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const seedSchedule = async () => {
    setSeeding(true);
    const res = await fetch("/api/admin/seed/schedule", { method: "POST" });
    const data = await res.json();
    setSeeding(false);
    setMsg(data.message || (data.success ? "Schedule loaded." : "Failed."));
    if (data.success) load();
  };

  const startEdit = (item: ScheduleRow) => {
    setEditingId(item.id);
    setEditForm({
      scheduleType: item.schedule_type,
      time: item.time,
      phase: item.phase,
      description: item.description,
      sortOrder: String(item.sort_order),
    });
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await adminJson("/api/admin/schedule", "POST", {
      ...form,
      sortOrder: Number(form.sortOrder),
    });
    setMsg(data.success ? "Item added." : data.message || "Failed.");
    if (data.success) {
      setForm(emptyForm);
      load();
    }
  };

  const saveEdit = async () => {
    if (editingId == null) return;
    setSaving(true);
    const data = await adminJson(`/api/admin/schedule/${editingId}`, "PATCH", {
      ...editForm,
      sortOrder: Number(editForm.sortOrder),
    });
    setSaving(false);
    setMsg(data.success ? "Item updated." : data.message || "Failed.");
    if (data.success) {
      setEditingId(null);
      load();
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    await adminJson(`/api/admin/schedule/${id}`, "DELETE");
    setMsg("Item deleted.");
    load();
  };

  return (
    <AdminShell title="Schedule" description="Add, edit, or remove timeline items.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminCard>
          <h2 className="font-semibold mb-4">Add item</h2>
          <form onSubmit={add} className="flex flex-col gap-3">
            <AdminSelect
              label="Schedule type"
              value={form.scheduleType}
              onChange={(e) =>
                setForm({
                  ...form,
                  scheduleType: e.target.value as "leca_week" | "hackathon",
                })
              }
            >
              <option value="leca_week">Lecaweek (online)</option>
              <option value="hackathon">48hr hackathon</option>
            </AdminSelect>
            <AdminInput label="Time *" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
            <AdminInput label="Phase *" value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })} required />
            <AdminTextarea label="Description *" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <AdminButton type="submit">Add item</AdminButton>
          </form>
        </AdminCard>
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Items</h2>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "leca_week" | "hackathon")
              }
              className="bg-[#111] border border-white/10 rounded-lg px-2 py-1 text-xs"
            >
              <option value="all">All</option>
              <option value="leca_week">Lecaweek</option>
              <option value="hackathon">Hackathon</option>
            </select>
          </div>
          {loading ? (
            <p className="text-sm text-[#888]">Loading…</p>
          ) : items.length === 0 ? (
            <EmptyCmsHint
              label="schedule items"
              onSeed={seedSchedule}
              seeding={seeding}
            />
          ) : (
            <ul className="flex flex-col gap-3 max-h-[520px] overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="p-3 bg-[#111] rounded-lg border border-white/5">
                  {editingId === item.id ? (
                    <div className="flex flex-col gap-2 mb-3">
                      <AdminSelect
                        label="Type"
                        value={editForm.scheduleType}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            scheduleType: e.target.value as "leca_week" | "hackathon",
                          })
                        }
                      >
                        <option value="leca_week">Lecaweek</option>
                        <option value="hackathon">Hackathon</option>
                      </AdminSelect>
                      <AdminInput label="Time" value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} />
                      <AdminInput label="Phase" value={editForm.phase} onChange={(e) => setEditForm({ ...editForm, phase: e.target.value })} />
                      <AdminTextarea label="Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                    </div>
                  ) : (
                    <div className="mb-2">
                      <span className="text-[10px] uppercase text-yellow-400/80">
                        {item.schedule_type}
                      </span>
                      <p className="text-sm font-medium">{item.phase}</p>
                      <p className="text-xs text-[#888]">{item.time}</p>
                      <p className="text-xs text-[#666] mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  )}
                  <ItemActions editing={editingId === item.id} onEdit={() => startEdit(item)} onCancel={() => setEditingId(null)} onSave={saveEdit} onDelete={() => remove(item.id)} saving={saving} />
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>
      {msg && <p className="text-xs text-yellow-400 mt-4">{msg}</p>}
    </AdminShell>
  );
}
