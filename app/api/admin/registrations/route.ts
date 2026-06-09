import { NextRequest, NextResponse } from "next/server";
import {
  listRegistrations,
  registrationsToCsv,
} from "@/lib/registrations";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") ?? undefined;
    const theme = req.nextUrl.searchParams.get("theme") ?? undefined;
    const rows = await listRegistrations({ q, theme });
    const format = req.nextUrl.searchParams.get("format");

    if (format === "csv") {
      const csv = registrationsToCsv(rows);
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="lecathon-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to load registrations.",
      },
      { status: 500 }
    );
  }
}
