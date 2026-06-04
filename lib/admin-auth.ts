import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE = "lecathon_admin_session";

const SESSION_PAYLOAD = "lecathon-admin-v1";

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return null;
  }

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(SESSION_PAYLOAD)
  );
  return bufferToHex(signature);
}

export async function verifyAdminSessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) {
    return false;
  }
  const expected = await createAdminSessionToken();
  return !!expected && token === expected;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return false;
  }
  return password === expected;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
}
