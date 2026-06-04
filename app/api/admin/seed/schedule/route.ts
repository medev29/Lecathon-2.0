import { NextResponse } from "next/server";
import { seedScheduleOnly } from "@/lib/seed-schedule";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedScheduleOnly();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Seed failed.",
      },
      { status: 500 }
    );
  }
}
