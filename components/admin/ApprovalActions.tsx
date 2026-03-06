"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApprovalActions({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  const act = async (action: "approve" | "reject") => {
    setLoading(action);
    await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });
    setLoading(null);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => act("approve")} disabled={!!loading} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
        {loading === "approve" ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />} Aprobă
      </button>
      <button onClick={() => act("reject")} disabled={!!loading} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
        {loading === "reject" ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />} Respinge
      </button>
    </div>
  );
}
