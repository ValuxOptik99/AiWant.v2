import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate, PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR } from "@/lib/portal-utils";
import ApprovalActions from "@/components/admin/ApprovalActions";
import { Building2, Globe, Target, Calculator, CheckCircle, Clock } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

function ProfileRow({ label, value }: { label: string; value: string | string[] | boolean | number | undefined | null }) {
  if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Da" : "Nu") : String(value);
  return (
    <div className="flex gap-3 py-2 border-b text-sm last:border-0" style={{ borderColor: "var(--color-border)" }}>
      <span className="flex-shrink-0 font-medium w-44" style={{ color: "var(--color-text-secondary)" }}>{label}</span>
      <span style={{ color: "var(--color-text-primary)" }}>{display}</span>
    </div>
  );
}

function ProfileSection({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border-warm)" }}>
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--color-surface-warm)", borderBottom: "1px solid var(--color-border)" }}>
        <Icon size={16} style={{ color: "var(--color-gold)" }} />
        <span className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>{title}</span>
      </div>
      <div className="px-5 py-1" style={{ background: "#fff" }}>{children}</div>
    </div>
  );
}

const COMPANY_SIZE_LABELS: Record<string, string> = {
  solo: "Solo (doar eu)", micro: "Micro (2-9 angajati)", small: "Mica (10-49 angajati)", medium: "Medie (50+ angajati)",
};

export default async function AdminClientDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { projects: { include: { _count: { select: { documents: true } } } }, clientProfile: true },
  });
  if (!user) notFound();
  const p = user.clientProfile;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <Link href="/admin/clients" className="hover:underline" style={{ color: "var(--color-gold)" }}>Clienti</Link>
        <span>/</span><span>{user.name}</span>
      </div>
      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>{user.name}</h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>{user.email}</p>
            {user.company && <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{user.company}</p>}
            {user.phone && <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{user.phone}</p>}
          </div>
          <div className="flex flex-col gap-2 items-end">
            {user.role === "PENDING" && <ApprovalActions userId={user.id} />}
            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ background: user.onboardingCompleted ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: user.onboardingCompleted ? "#10B981" : "#F59E0B" }}>
              {user.onboardingCompleted ? <><CheckCircle size={11} /> Onboarding complet</> : <><Clock size={11} /> Onboarding incomplet</>}
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Inregistrat: {formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Proiecte ({user.projects.length})</h2>
          <Link href={"/admin/projects?client=" + user.id} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>+ Proiect nou</Link>
        </div>
        <div className="space-y-3">
          {user.projects.map((proj) => (
            <Link key={proj.id} href={"/admin/projects/" + proj.id} className="flex items-center justify-between p-4 rounded-xl group" style={{ background: "var(--color-surface-warm)", border: "1px solid var(--color-border)" }}>
              <div>
                <p className="font-medium text-sm group-hover:underline" style={{ color: "var(--color-text-primary)" }}>{proj.name}</p>
                {proj.domain && <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{proj.domain} - {proj._count.documents} doc</p>}
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: PROJECT_STATUS_COLOR[proj.status] + "18", color: PROJECT_STATUS_COLOR[proj.status] }}>{PROJECT_STATUS_LABEL[proj.status]}</span>
            </Link>
          ))}
          {user.projects.length === 0 && <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Niciun proiect.</p>}
        </div>
      </div>
      {p ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Profil Onboarding</h2>
            <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Completat: {formatDate(p.completedAt)}</p>
          </div>
          <ProfileSection title="Despre firma" icon={Building2}>
            <ProfileRow label="Firma" value={p.companyName} />
            <ProfileRow label="CUI/CIF" value={p.companyCIF} />
            <ProfileRow label="Reg. Comertului" value={p.companyRegCom} />
            <ProfileRow label="Adresa" value={[p.companyAddress, p.companyCity, p.companyCounty].filter(Boolean).join(", ") || null} />
            <ProfileRow label="Infiintata" value={p.companyFoundedYear} />
            <ProfileRow label="Domeniu" value={p.industryDomain} />
            <ProfileRow label="Dimensiune" value={COMPANY_SIZE_LABELS[p.companySize] ?? p.companySize} />
            <ProfileRow label="Descriere" value={p.companyDescription} />
          </ProfileSection>
          <ProfileSection title="Prezenta online" icon={Globe}>
            <ProfileRow label="Are site web" value={p.hasWebsite} />
            <ProfileRow label="URL site" value={p.currentWebsiteUrl} />
            <ProfileRow label="Platforma" value={p.websitePlatform} />
            <ProfileRow label="Satisfactie" value={p.websiteSatisfaction ? p.websiteSatisfaction + "/5 stele" : null} />
            <ProfileRow label="Social media" value={p.hasSocialMedia} />
            <ProfileRow label="Facebook" value={p.socialFacebook} />
            <ProfileRow label="Instagram" value={p.socialInstagram} />
            <ProfileRow label="TikTok" value={p.socialTikTok} />
            <ProfileRow label="LinkedIn" value={p.socialLinkedIn} />
            <ProfileRow label="Alte platforme" value={p.socialOther} />
            <ProfileRow label="Unelte digitale" value={p.usesTools} />
            <ProfileRow label="Probleme actuale" value={p.currentPainPoints} />
          </ProfileSection>
          <ProfileSection title="Obiective si target" icon={Target}>
            <ProfileRow label="Servicii dorite" value={p.mainGoals} />
            <ProfileRow label="Detalii proiect" value={p.goalsDescription} />
            <ProfileRow label="Public tinta" value={p.targetAudience} />
            <ProfileRow label="Varsta clienti" value={p.targetAgeRange} />
            <ProfileRow label="Acoperire geo" value={p.targetLocation} />
            <ProfileRow label="Competitori" value={p.competitorUrls} />
            <ProfileRow label="Inspiratie" value={p.inspirationUrls} />
          </ProfileSection>
          <ProfileSection title="Buget si planificare" icon={Calculator}>
            <ProfileRow label="Buget proiect" value={p.budgetRange} />
            <ProfileRow label="Timeline" value={p.timeline} />
            <ProfileRow label="Modalitate plata" value={p.preferredPayment} />
            <ProfileRow label="Hosting/luna" value={p.monthlyBudgetHosting} />
            <ProfileRow label="Note aditionale" value={p.additionalNotes} />
          </ProfileSection>
        </div>
      ) : (
        <div className="rounded-xl p-6 text-center" style={{ background: "#fff", border: "1px dashed var(--color-border)" }}>
          <Clock size={24} className="mx-auto mb-2" style={{ color: "var(--color-text-secondary)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Onboarding incomplet</p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>Clientul nu a completat inca profilul de onboarding.</p>
        </div>
      )}
    </div>
  );
}
