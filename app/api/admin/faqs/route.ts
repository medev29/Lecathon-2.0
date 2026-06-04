import { NextRequest, NextResponse } from "next/server";
import { revalidatePublicSite } from "@/lib/revalidate-site";
import { requireSql } from "@/lib/sql";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = requireSql();
    const rows = await sql`SELECT * FROM faqs ORDER BY sort_order ASC, id ASC`;
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
    const question = body.question?.trim();
    const answer = body.answer?.trim();
    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: "Question and answer are required." },
        { status: 400 }
      );
    }
    const sql = requireSql();
    const rows = await sql`
      INSERT INTO faqs (question, answer, sort_order)
      VALUES (${question}, ${answer}, ${Number(body.sortOrder) || 0})
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
