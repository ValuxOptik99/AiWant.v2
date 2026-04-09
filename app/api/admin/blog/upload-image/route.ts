import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Fișier lipsă." }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Tip de fișier nepermis." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Fișierul depășește 5MB." }, { status: 400 });
    }

    const blob = await put(`blog/${Date.now()}-${file.name}`, file, { access: "public" });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (err) {
    console.error("[blog/upload-image]", err);
    return NextResponse.json({ error: "Eroare la upload." }, { status: 500 });
  }
}
