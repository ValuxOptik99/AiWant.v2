import { prisma } from "@/lib/prisma";

export async function createNotification({
  userId,
  title,
  message,
  link,
}: {
  userId: string;
  title: string;
  message: string;
  link?: string;
}) {
  return prisma.notification.create({
    data: { userId, title, message, link },
  });
}

// Notify admin about a new user registration
export async function notifyAdminNewRegistration(userName: string, userEmail: string) {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) return;
  await createNotification({
    userId: admin.id,
    title: "Cont nou în așteptare",
    message: `${userName} (${userEmail}) s-a înregistrat și așteaptă aprobare.`,
    link: "/admin/clients",
  });
}
