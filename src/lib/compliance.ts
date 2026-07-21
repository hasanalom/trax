/**
 * Compliance domain types + tone helpers, plus the Review Queue and audit
 * History (kept as static presentation constants — Option A; no dedicated
 * model). Findings data comes from the repository in @/lib/data/compliance.
 */
import type { BadgeTone } from "@/lib/badges";

export type Severity = "Critical" | "Major" | "Minor" | "Observation";
export type FindingStatus = "Open" | "In Review" | "Closed";
export type FindingSource =
  | "Internal Audit"
  | "Regulatory Audit"
  | "Line Inspection"
  | "AD/SB"
  | "MEL";

export interface Finding {
  id: string;
  title: string;
  aircraft: string;
  ataChapter: string;
  severity: Severity;
  source: FindingSource;
  raisedDate: string;
  dueDate: string;
  owner: string;
  status: FindingStatus;
}

export interface ReviewItem {
  id: string;
  title: string;
  aircraft: string;
  submittedBy: string;
  submittedDate: string;
  reviewer: string;
}

export interface HistoryEntry {
  id: string;
  action: string;
  item: string;
  by: string;
  date: string;
}

export const reviewQueue: ReviewItem[] = [
  { id: "F-2026-0135", title: "Incomplete task card sign-off", aircraft: "N106TX", submittedBy: "Marcus Ferreira", submittedDate: "2026-07-19", reviewer: "Priya Nair" },
  { id: "F-2026-0128", title: "Tooling calibration record missing", aircraft: "Base — JFK", submittedBy: "Julian Osei", submittedDate: "2026-07-18", reviewer: "Hasan Alom" },
  { id: "TR-2026-0731", title: "Engine borescope inspection report", aircraft: "N106TX", submittedBy: "Marcus Ferreira", submittedDate: "2026-07-20", reviewer: "Priya Nair" },
  { id: "EO-2026-0190", title: "Cabin monument reconfiguration order", aircraft: "N118TX", submittedBy: "Lena Bianchi", submittedDate: "2026-07-17", reviewer: "Sofia Rossi" },
];

export const history: HistoryEntry[] = [
  { id: "h1", action: "closed finding", item: "F-2026-0119 · Engine oil uplift log discrepancy", by: "Priya Nair", date: "2026-07-16" },
  { id: "h2", action: "approved record", item: "MR-2026-0442 · Landing gear overhaul certificate", by: "Diego Martins", date: "2026-07-20" },
  { id: "h3", action: "closed finding", item: "F-2026-0112 · Fire extinguisher weight out of range", by: "Sofia Rossi", date: "2026-07-10" },
  { id: "h4", action: "raised finding", item: "F-2026-0142 · Corrosion beyond limits on cargo floor beam", by: "Diego Martins", date: "2026-07-08" },
  { id: "h5", action: "closed finding", item: "F-2026-0108 · Wheel assembly overpressure indication", by: "Diego Martins", date: "2026-07-01" },
  { id: "h6", action: "closed finding", item: "F-2026-0101 · Logbook entry legibility observation", by: "Hasan Alom", date: "2026-06-30" },
];

export function severityTone(s: Severity): BadgeTone {
  switch (s) {
    case "Critical": return "danger";
    case "Major": return "warning";
    case "Minor": return "info";
    case "Observation": return "neutral";
  }
}

export function findingStatusTone(s: FindingStatus): BadgeTone {
  switch (s) {
    case "Open": return "warning";
    case "In Review": return "info";
    case "Closed": return "success";
  }
}
