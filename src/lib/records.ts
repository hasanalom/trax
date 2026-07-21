/**
 * Technical-record domain types + tone helpers (client-safe, no Prisma).
 * Data now comes from the repository in @/lib/data/records.
 */
import type { BadgeTone } from "@/lib/badges";

export type RecordCategory =
  | "Airworthiness Directive"
  | "Service Bulletin"
  | "Engineering Order"
  | "Technical Log"
  | "Maintenance Release"
  | "Inspection"
  | "Work Order"
  | "Component"
  | "Records";

export type DocStatus = "Approved" | "In Review" | "Draft" | "Superseded";
export type SignoffStatus = "Signed" | "Pending" | "Not Required";

export interface Attachment {
  name: string;
  kind: string;
  size: string;
}

export interface Revision {
  revision: string;
  date: string;
  author: string;
  summary: string;
}

export interface TechRecord {
  id: string;
  title: string;
  reference: string;
  category: RecordCategory;
  ataChapter: string;
  aircraft: string;
  aircraftId?: string;
  author: string;
  reviewer: string;
  revision: string;
  status: DocStatus;
  updated: string;
  updatedDate: string;
  signoff: { status: SignoffStatus; by?: string; date?: string };
  attachments: Attachment[];
  history: Revision[];
  notes: string[];
}

export function docStatusTone(s: DocStatus): BadgeTone {
  switch (s) {
    case "Approved": return "success";
    case "In Review": return "info";
    case "Draft": return "warning";
    case "Superseded": return "neutral";
  }
}

export function signoffTone(s: SignoffStatus): BadgeTone {
  switch (s) {
    case "Signed": return "success";
    case "Pending": return "warning";
    case "Not Required": return "neutral";
  }
}
