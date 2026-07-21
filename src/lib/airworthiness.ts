/**
 * Airworthiness domain types + tone helpers (client-safe, no Prisma).
 * Data now comes from the repository in @/lib/data/airworthiness.
 */
import type { BadgeTone } from "@/lib/badges";

export type ADStatus = "Open" | "In Progress" | "Complied" | "Not Applicable";
export type SBCategory = "Mandatory" | "Recommended" | "Optional";
export type SBStatus = "Open" | "In Progress" | "Incorporated" | "Not Applicable";

export interface AirworthinessDirective {
  ref: string;
  subject: string;
  ataChapter: string;
  applicability: string;
  effectiveDate: string;
  dueDate: string;
  priority: import("@/lib/badges").Priority;
  status: ADStatus;
  recordId?: string;
}

export interface ServiceBulletin {
  ref: string;
  subject: string;
  ataChapter: string;
  applicability: string;
  issueDate: string;
  category: SBCategory;
  status: SBStatus;
  recordId?: string;
}

export function adStatusTone(s: ADStatus): BadgeTone {
  switch (s) {
    case "Open": return "warning";
    case "In Progress": return "info";
    case "Complied": return "success";
    case "Not Applicable": return "neutral";
  }
}

export function sbStatusTone(s: SBStatus): BadgeTone {
  switch (s) {
    case "Open": return "warning";
    case "In Progress": return "info";
    case "Incorporated": return "success";
    case "Not Applicable": return "neutral";
  }
}

export function sbCategoryTone(c: SBCategory): BadgeTone {
  switch (c) {
    case "Mandatory": return "danger";
    case "Recommended": return "info";
    case "Optional": return "neutral";
  }
}
