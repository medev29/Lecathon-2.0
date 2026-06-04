import { NextResponse } from "next/server";
import { getSql } from "@/lib/sql";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json({
        success: true,
        data: {
          registrations: 0,
          sponsors: 0,
          themes: 0,
          faqs: 0,
          scheduleItems: 0,
        },
      });
    }

    const [reg, sponsors, themes, faqs, schedule] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM registrations`,
      sql`SELECT COUNT(*)::int AS count FROM sponsors`,
      sql`SELECT COUNT(*)::int AS count FROM problem_themes`,
      sql`SELECT COUNT(*)::int AS count FROM faqs`,
      sql`SELECT COUNT(*)::int AS count FROM schedule_items`,
    ]);

    return NextResponse.json({
      success: true,
      data: {
        registrations: (reg[0] as { count: number }).count,
        sponsors: (sponsors[0] as { count: number }).count,
        themes: (themes[0] as { count: number }).count,
        faqs: (faqs[0] as { count: number }).count,
        scheduleItems: (schedule[0] as { count: number }).count,
      },
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
