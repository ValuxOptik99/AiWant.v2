"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteBlogPostButton({
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all"
          style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
        >
          {deleting ? <Loader2 size={11} className="animate-spin" /> : null}
          Confirmă
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2.5 py-1.5 rounded-lg transition-all"
          style={{ color: "#8A9BB5", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Anulează
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Șterge "${postTitle}"`}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
      style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
    >
      <Trash2 size={14} />
    </button>
  );
}
