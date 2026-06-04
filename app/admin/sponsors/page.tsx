"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import EmptyCmsHint from "@/components/admin/EmptyCmsHint";
import { ItemActions } from "@/components/admin/ItemActions";
import {
  adminJson,
  useAdminResource,
} from "@/components/admin/useAdminResource";
import {
  AdminButton,
  AdminCard,
  AdminInput,
} from "@/components/admin/admin-ui";

type SponsorRow = {
  id: number;
  name: string;
  logo_url: string | null;
  logo_text: string | null;
  website_url: string | null;
  sort_order: number;
};

const emptyForm = {
  name: "",
  logoUrl: "",
  logoText: "",
  websiteUrl: "",
  sortOrder: "0",
};

export default function AdminSponsorsPage() {
  const { items, loading, msg, setMsg, load } =
    useAdminResource<SponsorRow>("/api/admin/sponsors");
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

  const startEdit = (s: SponsorRow) => {
    setEditingId(s.id);
    setEditForm({
      name: s.name,
      logoUrl: s.logo_url ?? "",
      logoText: s.logo_text ?? "",
      websiteUrl: s.website_url ?? "",
      sortOrder: String(s.sort_order),
    });
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const data = await adminJson("/api/admin/sponsors", "POST", {
      name: form.name,
      logoUrl: form.logoUrl || null,
      logoText: form.logoText || form.name,
      websiteUrl: form.websiteUrl || null,
      sortOrder: Number(form.sortOrder),
    });
    if (data.success) {
      setForm(emptyForm);
      setMsg("Sponsor added. Public site updated.");
      load();
    } else {
      setMsg(data.message || "Failed.");
    }
  };

  const saveEdit = async () => {
    if (editingId == null) return;
    setSaving(true);
    const data = await adminJson(`/api/admin/sponsors/${editingId}`, "PATCH", {
      name: editForm.name,
      logoUrl: editForm.logoUrl || null,
      logoText: editForm.logoText || editForm.name,
      websiteUrl: editForm.websiteUrl || null,
      sortOrder: Number(editForm.sortOrder),
    });
    setSaving(false);
    if (data.success) {
      setEditingId(null);
      setMsg("Sponsor updated.");
      load();
    } else {
      setMsg(data.message || "Failed.");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this sponsor?")) return;
    await adminJson(`/api/admin/sponsors/${id}`, "DELETE");
    setMsg("Sponsor deleted.");
    load();
  };

  return (
    <AdminShell
      title="Sponsors"
      description="Add, edit, or remove partners on the landing page."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminCard>
          <h2 className="font-semibold mb-4">Add sponsor</h2>
          <form onSubmit={add} className="flex flex-col gap-3">
            <AdminInput
              label="Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <AdminInput
              label="Logo image URL"
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              placeholder="https://..."
            />
            <AdminInput
              label="Logo text (if no image)"
              value={form.logoText}
              onChange={(e) => setForm({ ...form, logoText: e.target.value })}
            />
            <AdminInput
              label="Website URL"
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
            />
            <AdminInput
              label="Sort order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            />
            <AdminButton type="submit">Add sponsor</AdminButton>
          </form>
        </AdminCard>

        <AdminCard>
          <h2 className="font-semibold mb-4">
            Current sponsors ({loading ? "…" : items.length})
          </h2>
          {loading ? (
            <p className="text-sm text-[#888]">Loading…</p>
          ) : !loading && items.length === 0 ? (
            <EmptyCmsHint
              label="sponsors"
              onSeed={seedDefaults}
              seeding={seeding}
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((s) => (
                <li
                  key={s.id}
                  className="p-3 bg-[#111] rounded-lg border border-white/5"
                >
                  {editingId === s.id ? (
                    <div className="flex flex-col gap-2 mb-3">
                      <AdminInput
                        label="Name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                      <AdminInput
                        label="Logo URL"
                        value={editForm.logoUrl}
                        onChange={(e) =>
                          setEditForm({ ...editForm, logoUrl: e.target.value })
                        }
                      />
                      <AdminInput
                        label="Logo text"
                        value={editForm.logoText}
                        onChange={(e) =>
                          setEditForm({ ...editForm, logoText: e.target.value })
                        }
                      />
                      <AdminInput
                        label="Website"
                        value={editForm.websiteUrl}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            websiteUrl: e.target.value,
                          })
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
                    <div className="mb-2 min-w-0">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-[#888]">
                        {s.logo_url || s.logo_text || "No logo"} · order{" "}
                        {s.sort_order}
                      </p>
                    </div>
                  )}
                  <ItemActions
                    editing={editingId === s.id}
                    onEdit={() => startEdit(s)}
                    onCancel={() => setEditingId(null)}
                    onSave={saveEdit}
                    onDelete={() => remove(s.id)}
                    saving={saving}
                  />
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
