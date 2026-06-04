"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Layers,
  Calendar,
  HelpCircle,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
  { href: "/admin/sponsors", label: "Sponsors", icon: Building2 },
  { href: "/admin/themes", label: "Problem Themes", icon: Layers },
  { href: "/admin/schedule", label: "Schedule", icon: Calendar },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      <aside className="w-60 shrink-0 border-r border-white/10 bg-[#0a0a0a] flex flex-col">
        <div className="p-5 border-b border-white/10">
          <p className="font-bold text-sm">
            Leca<span className="text-yellow-400">thon</span> CMS
          </p>
          <p className="text-[10px] text-[#888] mt-1 uppercase tracking-wider">
            Admin Dashboard
          </p>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-yellow-400/15 text-yellow-400"
                    : "text-[#aaa] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#888] hover:text-white rounded-lg hover:bg-white/5"
          >
            <ExternalLink size={14} />
            View live site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#888] hover:text-red-400 rounded-lg hover:bg-white/5 w-full text-left"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="border-b border-white/10 px-8 py-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-sm text-[#888] mt-1">{description}</p>
          )}
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
