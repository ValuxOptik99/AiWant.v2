import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string;
    const name = (formData.get("name") as string) || file?.name || "document";
    const type = (formData.get("type") as string) || "OTHER";
    const description = (formData.get("description") as string) || null;
    const invoiceNumber = (formData.get("invoiceNumber") as string) || null;
    const invoiceAmountRaw = formData.get("invoiceAmount") as string;
    const invoiceAmount = invoiceAmountRaw ? parseFloat(invoiceAmountRaw) : null;
    const invoiceDueDateRaw = formData.get("invoiceDueDate") as string;
    const invoiceDueDate = invoiceDueDateRaw ? new Date(invoiceDueDateRaw) : null;
    const invoiceStatus = (formData.get("invoiceStatus") as string) || null;

    if (!file || !projectId) {
      return NextResponse.json({ error: "Lipsesc câmpuri obligatorii." }, { status: 400 });
    }

    const blob = await put(`documents/${projectId}/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    const document = await prisma.document.create({
      data: {
        projectId,
        name,
        type: type as any,
        fileUrl: blob.url,
        fileSize: file.size,
        description,
        invoiceNumber,
        invoiceAmount,
        invoiceDueDate,
        invoiceStatus: invoiceStatus as any,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (err) {
    console.error("[documents/upload]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
