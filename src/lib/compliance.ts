/**
 * Compliance data — findings (open/closed/in-review), the review queue and an
 * audit history trail. Static demo content using standard audit terminology.
 */
import type { BadgeTone } from "@/lib/badges";

export type Severity = "Critical" | "Major" | "Minor" | "Observation";
export type FindingStatus = "Open" | "In Review" | "Closed";
export type FindingSource = "Internal Audit" | "Regulatory Audit" | "Line Inspection" | "AD/SB" | "MEL";

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

export const findings: Finding[] = [
  { id: "F-2026-0142", title: "Corrosion beyond limits on cargo floor beam", aircraft: "N788TX", ataChapter: "ATA 53", severity: "Major", source: "Internal Audit", raisedDate: "2026-07-08", dueDate: "2026-07-25", owner: "Diego Martins", status: "Open" },
  { id: "F-2026-0139", title: "Overdue AD compliance — pressure switch", aircraft: "N788TX", ataChapter: "ATA 21", severity: "Critical", source: "AD/SB", raisedDate: "2026-07-15", dueDate: "2026-07-22", owner: "Hasan Alom", status: "Open" },
  { id: "F-2026-0135", title: "Incomplete task card sign-off", aircraft: "N106TX", ataChapter: "ATA 72", severity: "Minor", source: "Internal Audit", raisedDate: "2026-07-11", dueDate: "2026-08-01", owner: "Marcus Ferreira", status: "In Review" },
  { id: "F-2026-0131", title: "MEL item exceeded rectification interval", aircraft: "N114TX", ataChapter: "ATA 34", severity: "Major", source: "MEL", raisedDate: "2026-07-05", dueDate: "2026-07-19", owner: "Katarina Novak", status: "Open" },
  { id: "F-2026-0128", title: "Tooling calibration record missing", aircraft: "Base — JFK", ataChapter: "ATA 05", severity: "Minor", source: "Regulatory Audit", raisedDate: "2026-07-02", dueDate: "2026-07-30", owner: "Julian Osei", status: "In Review" },
  { id: "F-2026-0124", title: "Cabin placard not per configuration", aircraft: "N118TX", ataChapter: "ATA 25", severity: "Observation", source: "Line Inspection", raisedDate: "2026-06-28", dueDate: "2026-07-28", owner: "Lena Bianchi", status: "Open" },
  { id: "F-2026-0119", title: "Engine oil uplift log discrepancy", aircraft: "N103TX", ataChapter: "ATA 79", severity: "Minor", source: "Line Inspection", raisedDate: "2026-06-20", dueDate: "2026-07-04", owner: "Priya Nair", status: "Closed" },
  { id: "F-2026-0112", title: "Fire extinguisher weight out of range", aircraft: "N109TX", ataChapter: "ATA 26", severity: "Major", source: "Internal Audit", raisedDate: "2026-06-12", dueDate: "2026-06-26", owner: "Sofia Rossi", status: "Closed" },
  { id: "F-2026-0108", title: "Wheel assembly overpressure indication", aircraft: "N121TX", ataChapter: "ATA 32", severity: "Minor", source: "Line Inspection", raisedDate: "2026-06-05", dueDate: "2026-06-19", owner: "Diego Martins", status: "Closed" },
  { id: "F-2026-0101", title: "Logbook entry legibility observation", aircraft: "N112TX", ataChapter: "ATA 05", severity: "Observation", source: "Regulatory Audit", raisedDate: "2026-05-29", dueDate: "2026-06-30", owner: "Hasan Alom", status: "Closed" },
];

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

export const complianceStats = {
  open: findings.filter((f) => f.status === "Open").length,
  inReview: findings.filter((f) => f.status === "In Review").length,
  closed30d: findings.filter((f) => f.status === "Closed").length,
  complianceRate: 96,
};

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
