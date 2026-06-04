"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-2xl p-8"
    >
      <h1 className="text-xl font-bold text-white mb-1">Lecathon CMS</h1>
      <p className="text-sm text-[#888] mb-6">Sign in with your admin password.</p>
      <label className="block mb-4">
        <span className="text-xs text-[#888] mb-1 block">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400/50"
        />
      </label>
      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-yellow-400 text-black font-bold rounded-lg text-sm hover:bg-yellow-300 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <Suspense fallback={<p className="text-[#888] text-sm">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
