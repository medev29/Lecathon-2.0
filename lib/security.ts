import { getSql } from "@/lib/sql";

const WINDOW_MS = 15 * 60 * 1000;
const REGISTER_MAX = 5;
const LOGIN_MAX = 8;

export async function isRateLimited(
  key: string,
  max: number,
  windowMs = WINDOW_MS
): Promise<boolean> {
  const sql = getSql();
  if (!sql) {
    return false;
  }

  try {
    const since = new Date(Date.now() - windowMs).toISOString();
    const rows = await sql`
      SELECT COUNT(*)::int AS count
      FROM security_events
      WHERE event_key = ${key}
        AND created_at >= ${since}::timestamptz
    `;
    const count = (rows[0] as { count: number } | undefined)?.count ?? 0;
    return count >= max;
  } catch {
    return false;
  }
}

export async function recordSecurityEvent(key: string): Promise<void> {
  const sql = getSql();
  if (!sql) {
    return;
  }

  try {
    await sql`
      INSERT INTO security_events (event_key)
      VALUES (${key})
    `;
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    await sql`
      DELETE FROM security_events
      WHERE created_at < ${cutoff}::timestamptz
    `;
  } catch {
    // Table may not exist until migration is run.
  }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function checkRegisterRateLimit(ip: string): Promise<boolean> {
  const key = `register:${ip}`;
  return isRateLimited(key, REGISTER_MAX);
}

export async function recordRegisterAttempt(ip: string): Promise<void> {
  await recordSecurityEvent(`register:${ip}`);
}

export async function checkLoginRateLimit(ip: string): Promise<boolean> {
  const key = `login:${ip}`;
  return isRateLimited(key, LOGIN_MAX);
}

export async function recordLoginAttempt(ip: string): Promise<void> {
  await recordSecurityEvent(`login:${ip}`);
}
