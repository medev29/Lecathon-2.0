import { NextRequest, NextResponse } from "next/server";
import { deleteRegistration } from "@/lib/registrations";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid registration ID." },
        { status: 400 }
      );
    }

    const deleted = await deleteRegistration(numericId);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Registration not found." },
        { status: 404 }
      );
    }

    revalidatePublicSite();
    return NextResponse.json({ success: true, message: "Registration deleted." });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete.",
      },
      { status: 500 }
    );
  }
}
