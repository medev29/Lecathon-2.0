"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAdminResource<T>(url: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const urlRef = useRef(url);
  urlRef.current = url;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlRef.current, {
        cache: "no-store",
        credentials: "same-origin",
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setItems(data.data);
        setMsg("");
      } else {
        setItems([]);
        setMsg(
          data.message ||
            (res.status === 401
              ? "Session expired. Please log in again."
              : `Failed to load (${res.status}).`)
        );
      }
    } catch {
      setItems([]);
      setMsg("Failed to load. Check your connection and DATABASE_URL.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [url, load]);

  return { items, loading, msg, setMsg, load };
}

export async function adminJson<T>(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<{ success: boolean; message?: string; data?: T }> {
  const res = await fetch(url, {
    method,
    cache: "no-store",
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}
