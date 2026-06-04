import { NextRequest, NextResponse } from "next/server";
import { revalidatePublicSite } from "@/lib/revalidate-site";
import { requireSql } from "@/lib/sql";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = requireSql();
    const rows = await sql`
      SELECT * FROM problem_themes ORDER BY sort_order ASC, id ASC
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
    const title = body.title?.trim();
    const description = body.description?.trim();
    const imageUrl = body.imageUrl?.trim();

    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { success: false, message: "Title, description, and image URL are required." },
        { status: 400 }
      );
    }

    const sql = requireSql();
    const rows = await sql`
      INSERT INTO problem_themes (title, description, image_url, sort_order)
      VALUES (${title}, ${description}, ${imageUrl}, ${Number(body.sortOrder) || 0})
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
