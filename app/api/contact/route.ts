import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function validate(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    return "Câmpul 'name' este obligatoriu.";
  }
  if (!body.email || typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return "Email invalid.";
  }
  if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
    return "Câmpul 'message' este obligatoriu.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const error = validate(body);
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: {
        name: String(body.name).trim(),
        email: String(body.email).trim().toLowerCase(),
        phone: body.phone ? String(body.phone).trim() : null,
        projectType: body.projectType ? String(body.projectType).trim() : null,
        message: String(body.message).trim(),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
