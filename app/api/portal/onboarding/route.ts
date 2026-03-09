import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  // Step 1
  companyName: z.string().min(1),
  companyCIF: z.string().optional(),
  companyRegCom: z.string().optional(),
  companyAddress: z.string().optional(),
  companyCity: z.string().optional(),
  companyCounty: z.string().optional(),
  companyFoundedYear: z.number().int().min(1900).max(2030).optional().nullable(),
  industryDomain: z.string().min(1),
  companySize: z.string().min(1),
  companyDescription: z.string().optional(),
  // Step 2
  hasWebsite: z.boolean(),
  currentWebsiteUrl: z.string().optional(),
  websitePlatform: z.string().optional(),
  websiteSatisfaction: z.string().optional(),
  hasSocialMedia: z.boolean(),
  socialFacebook: z.string().optional(),
  socialInstagram: z.string().optional(),
  socialTikTok: z.string().optional(),
  socialLinkedIn: z.string().optional(),
  socialOther: z.string().optional(),
  usesTools: z.array(z.string()),
  currentPainPoints: z.string().optional(),
  // Step 3
  mainGoals: z.array(z.string()),
  goalsDescription: z.string().optional(),
  targetAudience: z.string().optional(),
  targetAgeRange: z.array(z.string()),
  targetLocation: z.string().optional(),
  competitorUrls: z.string().optional(),
  inspirationUrls: z.string().optional(),
  // Step 4
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  preferredPayment: z.string().optional(),
  monthlyBudgetHosting: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.$transaction([
      prisma.clientProfile.upsert({
        where: { userId: session.user.id },
        create: { ...data, userId: session.user.id },
        update: { ...data },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { onboardingCompleted: true },
      }),
    ]);

    // Notify admin
    const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (adminUser) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true },
      });
      await prisma.notification.create({
        data: {
          userId: adminUser.id,
          title: "Profil onboarding nou",
          message: `Clientul ${user?.name ?? "necunoscut"} și-a completat profilul de onboarding.`,
          link: `/admin/clients/${session.user.id}`,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Date invalide" }, { status: 400 });
    }
    console.error("Onboarding error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
