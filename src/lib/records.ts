/**
 * Technical records — the documents behind the Record Detail page. Ids d1–d6
 * match the dashboard's Recent Documents so those rows deep-link here; a few
 * more back the Airworthiness deep-links. Static content authored to read like
 * real airline technical records.
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

export const records: TechRecord[] = [
  {
    id: "d1",
    title: "AD 2025-14-05 Compliance Record",
    reference: "AD 2025-14-05",
    category: "Airworthiness Directive",
    ataChapter: "ATA 57 — Wings",
    aircraft: "N320TX",
    aircraftId: "n120tx",
    author: "Hasan Alom",
    reviewer: "Katarina Novak",
    revision: "Rev B",
    status: "Approved",
    updated: "12 min ago",
    updatedDate: "2026-07-20",
    signoff: { status: "Signed", by: "Katarina Novak", date: "2026-07-20" },
    attachments: [
      { name: "AD-2025-14-05.pdf", kind: "Directive", size: "412 KB" },
      { name: "Compliance-Worksheet.pdf", kind: "Worksheet", size: "188 KB" },
      { name: "Wing-Rib-Inspection-Photos.zip", kind: "Evidence", size: "6.4 MB" },
    ],
    history: [
      { revision: "Rev B", date: "2026-07-20", author: "Hasan Alom", summary: "Incorporated reviewer comments; attached final inspection evidence." },
      { revision: "Rev A", date: "2026-07-18", author: "Hasan Alom", summary: "Initial compliance record raised against AD 2025-14-05." },
    ],
    notes: [
      "Compliance with FAA Airworthiness Directive 2025-14-05 requiring repetitive detailed inspection of the wing front spar lower cap between ribs 3 and 7.",
      "Detailed visual and eddy-current inspection carried out at the JFK base during A-Check package A-24. No cracking or corrosion found within the inspected zone; measurements within Structural Repair Manual limits.",
      "Next repetitive inspection due at or before 6,000 flight cycles from this compliance, per paragraph (g) of the directive.",
    ],
  },
  {
    id: "d2",
    title: "Engine Borescope Inspection Report",
    reference: "TR-2026-0731",
    category: "Inspection",
    ataChapter: "ATA 72 — Engine",
    aircraft: "N737TX",
    aircraftId: "n106tx",
    author: "Marcus Ferreira",
    reviewer: "Priya Nair",
    revision: "Rev A",
    status: "In Review",
    updated: "48 min ago",
    updatedDate: "2026-07-20",
    signoff: { status: "Pending", by: "Priya Nair" },
    attachments: [
      { name: "Borescope-Findings-72-30.pdf", kind: "Report", size: "1.1 MB" },
      { name: "HPT-Stage1-Images.zip", kind: "Evidence", size: "9.2 MB" },
    ],
    history: [
      { revision: "Rev A", date: "2026-07-20", author: "Marcus Ferreira", summary: "Borescope of HP turbine stage 1 following EGT margin trend; awaiting powerplant review." },
    ],
    notes: [
      "Scheduled borescope inspection of the #1 engine hot section following an EGT margin erosion trend flagged by engine health monitoring.",
      "Minor tip curl observed on two HPT stage-1 blades, within the engine manual serviceable limits. Recommend continued trend monitoring at 100 FH intervals.",
    ],
  },
  {
    id: "d3",
    title: "Cabin Altitude Warning — Task Card",
    reference: "WO-10517",
    category: "Work Order",
    ataChapter: "ATA 21 — Air Conditioning",
    aircraft: "N788TX",
    aircraftId: "n105tx",
    author: "Katarina Novak",
    reviewer: "Sofia Rossi",
    revision: "Rev A",
    status: "Draft",
    updated: "2 hours ago",
    updatedDate: "2026-07-20",
    signoff: { status: "Pending" },
    attachments: [
      { name: "TaskCard-21-31-00.pdf", kind: "Task Card", size: "96 KB" },
    ],
    history: [
      { revision: "Rev A", date: "2026-07-20", author: "Katarina Novak", summary: "Drafted task card to troubleshoot intermittent cabin altitude warning." },
    ],
    notes: [
      "Troubleshooting task card raised against a repeated cabin altitude warning message logged over three sectors.",
      "Cabin pressure controller and outflow valve to be functionally tested per AMM 21-31-00 before return to service.",
    ],
  },
  {
    id: "d4",
    title: "Landing Gear Overhaul Certificate",
    reference: "MR-2026-0442",
    category: "Maintenance Release",
    ataChapter: "ATA 32 — Landing Gear",
    aircraft: "N321TX",
    aircraftId: "n121tx",
    author: "Julian Osei",
    reviewer: "Diego Martins",
    revision: "Rev A",
    status: "Approved",
    updated: "5 hours ago",
    updatedDate: "2026-07-20",
    signoff: { status: "Signed", by: "Diego Martins", date: "2026-07-20" },
    attachments: [
      { name: "MLG-Overhaul-Cert.pdf", kind: "Certificate", size: "244 KB" },
      { name: "EASA-Form-1.pdf", kind: "Release", size: "132 KB" },
    ],
    history: [
      { revision: "Rev A", date: "2026-07-20", author: "Julian Osei", summary: "Main landing gear overhaul complete; released to service." },
    ],
    notes: [
      "Main landing gear assembly overhauled and re-certified following 20,000-cycle life limit. Overhaul carried out by approved Part-145 shop; EASA Form 1 attached.",
      "Maintenance release issued; aircraft returned to airworthy status.",
    ],
  },
  {
    id: "d5",
    title: "SB 737-28-1234 Revision B",
    reference: "SB 737-28-1234",
    category: "Service Bulletin",
    ataChapter: "ATA 28 — Fuel",
    aircraft: "Fleet-wide",
    author: "Diego Martins",
    reviewer: "Hasan Alom",
    revision: "Rev B",
    status: "Superseded",
    updated: "Yesterday",
    updatedDate: "2026-07-19",
    signoff: { status: "Not Required" },
    attachments: [
      { name: "SB-737-28-1234-RevB.pdf", kind: "Bulletin", size: "820 KB" },
    ],
    history: [
      { revision: "Rev B", date: "2026-07-19", author: "Diego Martins", summary: "Superseded by SB 737-28-1240; retained for records." },
      { revision: "Rev A", date: "2026-02-11", author: "Diego Martins", summary: "Original evaluation of fuel boost pump wiring bulletin." },
    ],
    notes: [
      "Manufacturer service bulletin covering inspection of center-tank fuel boost pump wiring. Evaluated as recommended (non-mandatory).",
      "Superseded by SB 737-28-1240; this record retained for configuration history.",
    ],
  },
  {
    id: "d6",
    title: "Weight & Balance Amendment",
    reference: "EO-2026-0188",
    category: "Engineering Order",
    ataChapter: "ATA 08 — Leveling & Weighing",
    aircraft: "N190TX",
    aircraftId: "n112tx",
    author: "Lena Bianchi",
    reviewer: "Sofia Rossi",
    revision: "Rev A",
    status: "Approved",
    updated: "Yesterday",
    updatedDate: "2026-07-19",
    signoff: { status: "Signed", by: "Sofia Rossi", date: "2026-07-19" },
    attachments: [
      { name: "WB-Amendment-EO-0188.pdf", kind: "Engineering Order", size: "156 KB" },
      { name: "Weighing-Record.pdf", kind: "Record", size: "88 KB" },
    ],
    history: [
      { revision: "Rev A", date: "2026-07-19", author: "Lena Bianchi", summary: "Updated basic empty weight following galley reconfiguration." },
    ],
    notes: [
      "Engineering order amending the aircraft weight & balance report following a forward galley reconfiguration.",
      "Basic empty weight and CG updated; loading manual supplement revised accordingly.",
    ],
  },
];

export function getRecord(id: string): TechRecord | undefined {
  return records.find((r) => r.id === id);
}

/** Latest records for a given aircraft id (for the aircraft detail page). */
export function recordsForAircraft(aircraftId: string): TechRecord[] {
  return records.filter((r) => r.aircraftId === aircraftId);
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
