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
  AdminTextarea,
} from "@/components/admin/admin-ui";

type ThemeRow = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
};

const emptyForm = { title: "", description: "", imageUrl: "", sortOrder: "0" };

export default function AdminThemesPage() {
  const { items, loading, msg, setMsg, load } =
    useAdminResource<ThemeRow>("/api/admin/themes");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const seedDefaults = async () => {
    setSeeding(true);
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json();
    setSeeding(false);
    setMsg(data.message || (data.success ? "Defaults loaded." : "Seed failed."));
    if (data.success) load();
  };

  const startEdit = (t: ThemeRow) => {
    setEditingId(t.id);
    setEditForm({
      title: t.title,
      description: t.description,
      imageUrl: t.image_url,
      sortOrder: String(t.sort_order),
    });
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await adminJson("/api/admin/themes", "POST", {
      ...form,
      sortOrder: Number(form.sortOrder),
    });
    setMsg(data.success ? "Theme added." : data.message || "Failed.");
    if (data.success) {
      setForm(emptyForm);
      load();
    }
  };

  const saveEdit = async () => {
    if (editingId == null) return;
    setSaving(true);
    const data = await adminJson(`/api/admin/themes/${editingId}`, "PATCH", {
      ...editForm,
      sortOrder: Number(editForm.sortOrder),
    });
    setSaving(false);
    setMsg(data.success ? "Theme updated." : data.message || "Failed.");
    if (data.success) {
      setEditingId(null);
      load();
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this theme?")) return;
    await adminJson(`/api/admin/themes/${id}`, "DELETE");
    setMsg("Theme deleted.");
    load();
  };

  return (
    <AdminShell title="Problem Themes" description="Add, edit, or remove sectors.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminCard>
          <h2 className="font-semibold mb-4">Add theme</h2>
          <form onSubmit={add} className="flex flex-col gap-3">
            <AdminInput
              label="Title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <AdminTextarea
              label="Description *"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <AdminInput
              label="Image URL *"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              required
            />
            <AdminInput
              label="Sort order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            />
            <AdminButton type="submit">Add theme</AdminButton>
          </form>
        </AdminCard>

        <AdminCard>
          <h2 className="font-semibold mb-4">
            Current themes ({loading ? "…" : items.length})
          </h2>
          {loading ? (
            <p className="text-sm text-[#888]">Loading…</p>
          ) : msg && items.length === 0 ? (
            <p className="text-sm text-red-400 mb-3">{msg}</p>
          ) : null}
          {!loading && items.length === 0 ? (
            <EmptyCmsHint
              label="themes"
              onSeed={seedDefaults}
              seeding={seeding}
            />
          ) : !loading ? (
            <ul className="flex flex-col gap-3">
              {items.map((t) => (
                <li
                  key={t.id}
                  className="p-3 bg-[#111] rounded-lg border border-white/5"
                >
                  {editingId === t.id ? (
                    <div className="flex flex-col gap-2 mb-3">
                      <AdminInput
                        label="Title"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                      <AdminTextarea
                        label="Description"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                      />
                      <AdminInput
                        label="Image URL"
                        value={editForm.imageUrl}
                        onChange={(e) =>
                          setEditForm({ ...editForm, imageUrl: e.target.value })
                        }
                      />
                      <AdminInput
                        label="Sort order"
                        type="number"
                        value={editForm.sortOrder}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            sortOrder: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className="mb-2">
                      <p className="font-medium">{t.title}</p>
                      <p className="text-xs text-[#888] line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                  )}
                  <ItemActions
                    editing={editingId === t.id}
                    onEdit={() => startEdit(t)}
                    onCancel={() => setEditingId(null)}
                    onSave={saveEdit}
                    onDelete={() => remove(t.id)}
                    saving={saving}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </AdminCard>
      </div>
      {msg && items.length > 0 && (
        <p className="text-xs text-yellow-400 mt-4">{msg}</p>
      )}
    </AdminShell>
  );
}
