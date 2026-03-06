import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NotificationList from "@/components/portal/NotificationList";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Notificări</h1>
      <NotificationList notifications={notifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))} />
    </div>
  );
}
