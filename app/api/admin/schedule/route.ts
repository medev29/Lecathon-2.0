import { NextRequest, NextResponse } from "next/server";
import { revalidatePublicSite } from "@/lib/revalidate-site";
import { requireSql } from "@/lib/sql";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get("type");
    const sql = requireSql();

    const rows =
      type === "leca_week" || type === "hackathon"
        ? await sql`
            SELECT * FROM schedule_items
            WHERE schedule_type = ${type}
            ORDER BY sort_order ASC, id ASC
          `
        : await sql`
            SELECT * FROM schedule_items
            ORDER BY schedule_type ASC, sort_order ASC, id ASC
          `;

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const scheduleType = body.scheduleType;
    const time = body.time?.trim();
    const phase = body.phase?.trim();
    const description = body.description?.trim();

    if (
      (scheduleType !== "leca_week" && scheduleType !== "hackathon") ||
      !time ||
      !phase ||
      !description
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid schedule item." },
        { status: 400 }
      );
    }

    const sql = requireSql();
    const rows = await sql`
      INSERT INTO schedule_items (schedule_type, time, phase, description, sort_order)
      VALUES (
        ${scheduleType},
        ${time},
        ${phase},
        ${description},
        ${Number(body.sortOrder) || 0}
      )
      RETURNING *
    `;
    revalidatePublicSite();
    return NextResponse.json({ success: true, data: rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed." },
      { status: 500 }
    );
  }
}
