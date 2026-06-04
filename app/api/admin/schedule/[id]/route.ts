import { NextRequest, NextResponse } from "next/server";
import { updateScheduleItem } from "@/lib/cms-mutations";
import { revalidatePublicSite } from "@/lib/revalidate-site";
import { requireSql } from "@/lib/sql";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateScheduleItem(Number(id), body);

    if (!updated) {
      return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
    }

    revalidatePublicSite();
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = requireSql();
    await sql`DELETE FROM schedule_items WHERE id = ${Number(id)}`;
    revalidatePublicSite();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed." },
      { status: 500 }
    );
  }
}
