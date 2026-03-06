import type { ProjectStatus, DocumentType, InvoiceStatus } from "@prisma/client";
import type { CSSProperties } from "react";

// ─── Project Status ───────────────────────────────────────────────────────────

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  DISCOVERY:   "Discovery",
  IN_PROGRESS: "În lucru",
  REVIEW:      "Review",
  COMPLETED:   "Finalizat",
  MAINTENANCE: "Mentenanță",
  PAUSED:      "Pauzat",
};
export const PROJECT_STATUS_LABEL = PROJECT_STATUS_LABELS;

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, CSSProperties> = {
  DISCOVERY:   { background: "rgba(59,130,246,0.15)",  color: "#3B82F6" },
  IN_PROGRESS: { background: "rgba(245,158,11,0.15)",  color: "#F59E0B" },
  REVIEW:      { background: "rgba(139,92,246,0.15)",  color: "#8B5CF6" },
  COMPLETED:   { background: "rgba(16,185,129,0.15)",  color: "#10B981" },
  MAINTENANCE: { background: "rgba(35,75,114,0.3)",    color: "#60A5FA" },
  PAUSED:      { background: "rgba(107,114,128,0.15)", color: "#9CA3AF" },
};
export const PROJECT_STATUS_COLOR: Record<ProjectStatus, string> = {
  DISCOVERY:   "#3B82F6",
  IN_PROGRESS: "#F59E0B",
  REVIEW:      "#8B5CF6",
  COMPLETED:   "#10B981",
  MAINTENANCE: "#60A5FA",
  PAUSED:      "#9CA3AF",
};

// ─── Document Type ────────────────────────────────────────────────────────────

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  CONTRACT: "Contract",
  ANNEX:    "Anexă",
  INVOICE:  "Factură",
  REPORT:   "Raport",
  PROPOSAL: "Propunere",
  DESIGN:   "Design",
  OTHER:    "Altele",
};
export const DOCUMENT_TYPE_LABEL = DOCUMENT_TYPE_LABELS;
export const DOCUMENT_TYPE_COLOR: Record<DocumentType, string> = {
  CONTRACT: "#3B82F6",
  ANNEX:    "#8B5CF6",
  INVOICE:  "#F59E0B",
  REPORT:   "#10B981",
  PROPOSAL: "#6366F1",
  DESIGN:   "#EC4899",
  OTHER:    "#6B7280",
};

// ─── Invoice Status ───────────────────────────────────────────────────────────

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  PENDING:   "În așteptare",
  PAID:      "Plătită",
  OVERDUE:   "Restantă",
  CANCELLED: "Anulată",
};
export const INVOICE_STATUS_LABEL = INVOICE_STATUS_LABELS;

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, CSSProperties> = {
  PENDING:   { background: "rgba(245,158,11,0.15)",  color: "#F59E0B" },
  PAID:      { background: "rgba(16,185,129,0.15)",  color: "#10B981" },
  OVERDUE:   { background: "rgba(239,68,68,0.15)",   color: "#EF4444" },
  CANCELLED: { background: "rgba(107,114,128,0.15)", color: "#9CA3AF" },
};
export const INVOICE_STATUS_COLOR: Record<InvoiceStatus, string> = {
  PENDING:   "#F59E0B",
  PAID:      "#10B981",
  OVERDUE:   "#EF4444",
  CANCELLED: "#9CA3AF",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatFileSize(bytes?: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(date?: Date | string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
