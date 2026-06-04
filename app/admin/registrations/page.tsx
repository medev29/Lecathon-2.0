"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminResource } from "@/components/admin/useAdminResource";
import { AdminButton, AdminCard } from "@/components/admin/admin-ui";
import type { RegistrationRow } from "@/lib/types/site";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function AdminRegistrationsPage() {
  const { items: rows, loading, msg, setMsg, load } =
    useAdminResource<RegistrationRow>("/api/admin/registrations");
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <AdminShell
      title="Registrations"
      description={`${rows.length} team${rows.length === 1 ? "" : "s"} registered.`}
    >
      <div className="flex gap-3 mb-6">
        <a href="/api/admin/registrations?format=csv">
          <AdminButton type="button">Download CSV</AdminButton>
        </a>
        <AdminButton type="button" variant="ghost" onClick={load}>
          Refresh
        </AdminButton>
      </div>

      {msg && <p className="text-red-400 text-sm mb-4">{msg}</p>}

      <AdminCard className="p-0 overflow-hidden">
        {loading ? (
          <p className="p-5 text-sm text-[#888]">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-5 text-sm text-[#888]">No registrations yet.</p>
        ) : (
          <ul>
            {rows.map((row) => {
              const open = expanded === row.id;
              return (
                <li key={row.id} className="border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => toggle(row.id)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors"
                  >
                    {open ? (
                      <ChevronDown size={16} className="text-yellow-400 shrink-0" />
                    ) : (
                      <ChevronRight size={16} className="text-[#888] shrink-0" />
                    )}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
                      <div>
                        <p className="font-semibold">{row.teamName}</p>
                        <p className="text-xs text-[#888]">{row.college}</p>
                      </div>
                      <div>
                        <p>{row.teamLeaderName}</p>
                        <p className="text-xs text-[#888]">{row.teamLeaderEmail}</p>
                      </div>
                      <div className="text-[#ccc]">{row.theme || "—"}</div>
                      <div className="text-xs text-[#888]">
                        {row.teamSize} members ·{" "}
                        {new Date(row.registeredAt).toLocaleString()}
                      </div>
                    </div>
                  </button>
                  {open && (
                    <div className="px-4 pb-4 pl-11 text-sm text-[#ccc] space-y-2">
                      <p>
                        <span className="text-[#888]">Phone:</span> {row.phone}
                      </p>
                      <div>
                        <p className="text-[#888] mb-1">Members:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {row.members.map((m, i) => (
                            <li key={i}>
                              {m.name} — {m.email}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </AdminCard>
    </AdminShell>
  );
}
