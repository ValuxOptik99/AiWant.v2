import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  submittedAt: string;
}

function validate(body: Partial<ContactSubmission>): string | null {
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

    const submission: ContactSubmission = {
      name: String(body.name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: body.phone ? String(body.phone).trim() : undefined,
      projectType: body.projectType ? String(body.projectType).trim() : undefined,
      message: String(body.message).trim(),
      submittedAt: new Date().toISOString(),
    };

    // Save to JSON file (in production, replace with email/DB integration)
    const filePath = join(process.cwd(), "data", "contacts.json");
    let contacts: ContactSubmission[] = [];
    try {
      const existing = await readFile(filePath, "utf-8");
      contacts = JSON.parse(existing);
    } catch {
      // File doesn't exist yet — start fresh
    }
    contacts.push(submission);

    const { mkdir } = await import("fs/promises");
    await mkdir(join(process.cwd(), "data"), { recursive: true });
    await writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
