"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminCard,
  AdminInput,
} from "@/components/admin/admin-ui";
import type { SiteSettings } from "@/lib/types/site";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setForm(d.data);
      });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.success ? "Settings saved." : data.message);
    if (data.success) setForm(data.data);
  };

  if (!form) {
    return (
      <AdminShell title="Site Settings" description="Loading…">
        <p className="text-[#888] text-sm">Loading settings…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Site Settings"
      description="Countdown date, venue, hero stats, and prize pool text."
    >
      <AdminCard className="max-w-xl">
        <form onSubmit={save} className="flex flex-col gap-3">
          <AdminInput
            label="Hackathon date (ISO)"
            value={form.hackathonDate}
            onChange={(e) =>
              setForm({ ...form, hackathonDate: e.target.value })
            }
          />
          <AdminInput
            label="Schedule date label"
            value={form.scheduleDateLabel}
            onChange={(e) =>
              setForm({ ...form, scheduleDateLabel: e.target.value })
            }
          />
          <AdminInput
            label="Prize pool (hero & prizes)"
            value={form.prizePool}
            onChange={(e) => setForm({ ...form, prizePool: e.target.value })}
          />
          <AdminInput
            label="Participants stat"
            value={form.participantsLabel}
            onChange={(e) =>
              setForm({ ...form, participantsLabel: e.target.value })
            }
          />
          <AdminInput
            label="Duration stat"
            value={form.durationLabel}
            onChange={(e) =>
              setForm({ ...form, durationLabel: e.target.value })
            }
          />
          <AdminInput
            label="Venue name"
            value={form.venueName}
            onChange={(e) => setForm({ ...form, venueName: e.target.value })}
          />
          <AdminInput
            label="Venue address"
            value={form.venueAddress}
            onChange={(e) =>
              setForm({ ...form, venueAddress: e.target.value })
            }
          />
          <AdminButton type="submit">Save settings</AdminButton>
          {msg && <p className="text-xs text-yellow-400">{msg}</p>}
        </form>
      </AdminCard>
    </AdminShell>
  );
}
