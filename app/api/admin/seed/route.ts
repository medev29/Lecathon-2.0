import { NextResponse } from "next/server";
import { revalidatePublicSite } from "@/lib/revalidate-site";
import { seedDatabase } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedDatabase();
    revalidatePublicSite();
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
