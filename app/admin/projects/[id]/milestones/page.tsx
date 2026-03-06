import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MilestonesManager from "@/components/admin/MilestonesManager";

type Props = { params: Promise<{ id: string }> };

export default async function AdminProjectMilestonesPage({ params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
  if (!project) notFound();

  const milestones = await prisma.milestone.findMany({
    where: { projectId: id },
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href={`/admin/projects/${id}`} className="text-[#8A9BB5] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Milestone-uri</h1>
          <p className="text-sm text-[#8A9BB5] mt-0.5">{project.name}</p>
        </div>
      </div>

      <MilestonesManager projectId={id} initialMilestones={milestones} />
    </div>
  );
}
