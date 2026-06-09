import { NextResponse } from "next/server";
import { getRegistrationAvailability } from "@/lib/registration-guards";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const availability = await getRegistrationAvailability();
    return NextResponse.json({ success: true, data: availability });
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
