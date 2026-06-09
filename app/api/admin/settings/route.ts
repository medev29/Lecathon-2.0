import { NextRequest, NextResponse } from "next/server";
import { fetchSettingsFromDb } from "@/lib/admin-settings";
import { updateSiteSettings } from "@/lib/content";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await fetchSettingsFromDb();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    await updateSiteSettings(body);
    revalidatePublicSite();
    const settings = await fetchSettingsFromDb();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed." },
      { status: 500 }
    );
  }
}
