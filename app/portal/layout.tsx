import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Sidebar from "@/components/portal/Sidebar";

export const metadata = { title: "Portal Client | AiWANT", robots: "noindex" };

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login");
  if (session.user.role === "PENDING") redirect("/auth/pending");

  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isOnboarding = pathname.startsWith("/portal/onboarding");

  if (!isOnboarding && session.user.role === "CLIENT") {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { onboardingCompleted: true },
    });
    if (user && !user.onboardingCompleted) {
      redirect("/portal/onboarding");
    }
  }

  if (isOnboarding) {
    return <>{children}</>;
  }

  const unreadCount = await prisma.notification.count({
    where: { userId: session.user.id, read: false },
  });

  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-surface)" }}>
      <Sidebar
        unreadCount={unreadCount}
        userName={session.user.name ?? ""}
        userEmail={session.user.email ?? ""}
      />
      <main className="flex-1 min-w-0 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
