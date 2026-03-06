import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewProjectForm from "@/components/admin/NewProjectForm";

export default async function AdminNewProjectPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const clients = await prisma.user.findMany({
    where: { role: { not: "ADMIN" } },
    select: { id: true, name: true, company: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="text-[#8A9BB5] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-white">Proiect nou</h1>
      </div>

      <NewProjectForm clients={clients} />
    </div>
  );
}
