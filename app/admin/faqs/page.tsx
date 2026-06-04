"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { ItemActions } from "@/components/admin/ItemActions";
import { adminJson, useAdminResource } from "@/components/admin/useAdminResource";
import {
  AdminButton,
  AdminCard,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/admin-ui";

type FaqRow = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
};

export default function AdminFaqsPage() {
  const { items, loading, msg, setMsg, load } =
    useAdminResource<FaqRow>("/api/admin/faqs");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");
  const [saving, setSaving] = useState(false);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await adminJson("/api/admin/faqs", "POST", { question, answer });
    setMsg(data.success ? "FAQ added." : data.message || "Failed.");
    if (data.success) {
      setQuestion("");
      setAnswer("");
      load();
    }
  };

  const saveEdit = async () => {
    if (editingId == null) return;
    setSaving(true);
    const data = await adminJson(`/api/admin/faqs/${editingId}`, "PATCH", {
      question: editQ,
      answer: editA,
    });
    setSaving(false);
    setMsg(data.success ? "FAQ updated." : data.message || "Failed.");
    if (data.success) {
      setEditingId(null);
      load();
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return;
    await adminJson(`/api/admin/faqs/${id}`, "DELETE");
    setMsg("FAQ deleted.");
    load();
  };

  return (
    <AdminShell title="FAQs" description="Add, edit, or remove questions.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminCard>
          <h2 className="font-semibold mb-4">Add FAQ</h2>
          <form onSubmit={add} className="flex flex-col gap-3">
            <AdminInput label="Question *" value={question} onChange={(e) => setQuestion(e.target.value)} required />
            <AdminTextarea label="Answer *" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
            <AdminButton type="submit">Add FAQ</AdminButton>
          </form>
        </AdminCard>
        <AdminCard>
          <h2 className="font-semibold mb-4">Current FAQs</h2>
          {loading ? (
            <p className="text-sm text-[#888]">Loading…</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((f) => (
                <li key={f.id} className="p-3 bg-[#111] rounded-lg border border-white/5">
                  {editingId === f.id ? (
                    <div className="flex flex-col gap-2 mb-3">
                      <AdminInput label="Question" value={editQ} onChange={(e) => setEditQ(e.target.value)} />
                      <AdminTextarea label="Answer" value={editA} onChange={(e) => setEditA(e.target.value)} />
                    </div>
                  ) : (
                    <div className="mb-2">
                      <p className="font-medium text-sm">{f.question}</p>
                      <p className="text-xs text-[#888]">{f.answer}</p>
                    </div>
                  )}
                  <ItemActions
                    editing={editingId === f.id}
                    onEdit={() => {
                      setEditingId(f.id);
                      setEditQ(f.question);
                      setEditA(f.answer);
                    }}
                    onCancel={() => setEditingId(null)}
                    onSave={saveEdit}
                    onDelete={() => remove(f.id)}
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
