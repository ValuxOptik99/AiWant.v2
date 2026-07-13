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

type RegistrationConfigSummary = {
  projectName: string;
  service: string;
  estimateLow: number;
  estimateHigh: number;
};

// Notify admin about a new user registration
export async function notifyAdminNewRegistration(userName: string, userEmail: string, config?: RegistrationConfigSummary) {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) return;
  const message = config
    ? `${userName} (${userEmail}) s-a înregistrat cu o configurație: ${config.projectName} — ${config.service}, estimat ${config.estimateLow}–${config.estimateHigh} EUR.`
    : `${userName} (${userEmail}) s-a înregistrat și așteaptă aprobare.`;
  await createNotification({
    userId: admin.id,
    title: "Cont nou în așteptare",
    message,
    link: "/admin/clients",
  });
}
