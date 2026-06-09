import { NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await sendTestEmail();
    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 503 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Test email sent to ADMIN_NOTIFICATION_EMAIL.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed.",
      },
      { status: 500 }
    );
  }
}
