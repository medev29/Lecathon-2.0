import { NextRequest, NextResponse } from "next/server";

interface RegistrationPayload {
  name: string;
  email: string;
  phone?: string;
  teamName?: string;
  college?: string;
  theme?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationPayload = await req.json();

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    // In a real app, you'd save this to a database (e.g., Prisma + PostgreSQL)
    console.log("New registration:", {
      ...body,
      registeredAt: new Date().toISOString(),
    });

    // Simulate async DB write
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! We'll be in touch soon.",
        data: {
          id: `REG-${Date.now()}`,
          name: body.name,
          email: body.email,
          registeredAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "CipherThon 2.0 Registration API",
    endpoints: {
      POST: "/api/register — Submit registration payload",
    },
    requiredFields: ["name", "email"],
    optionalFields: ["phone", "teamName", "college", "theme"],
  });
}
