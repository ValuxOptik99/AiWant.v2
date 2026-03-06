import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function PendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-midnight)" }}>
      <div className="relative w-full max-w-md rounded-2xl p-10 text-center" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image src="/images/logo.png" alt="AiWANT" width={40} height={40} style={{ height: 40, width: "auto" }} />
        </div>
        <Clock size={48} className="mx-auto mb-4" style={{ color: "#F59E0B" }} />
        <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
          Cont în așteptare
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
          Contul tău este în așteptarea aprobării. Vei primi acces la portal după verificarea de către administrator.
        </p>
        <Link href="/" className="text-sm hover:underline" style={{ color: "var(--color-gold)" }}>
          ← Înapoi la site
        </Link>
      </div>
    </div>
  );
}
