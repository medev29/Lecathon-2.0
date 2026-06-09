import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  checkLoginRateLimit,
  getClientIp,
  recordLoginAttempt,
} from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Password is required." },
        { status: 400 }
      );
    }

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: "ADMIN_PASSWORD is not configured on the server.",
        },
        { status: 503 }
      );
    }

    const ip = getClientIp(req);
    if (await checkLoginRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many login attempts. Try again in 15 minutes.",
        },
        { status: 429 }
      );
    }

    if (!verifyAdminPassword(password)) {
      await recordLoginAttempt(ip);
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken();
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Could not create session." },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, token, getAdminSessionCookieOptions());
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }
}
