/**
 * Airworthiness data — Airworthiness Directives (AD) and Service Bulletins (SB).
 * Static, realistic references and ATA chapters. Some entries deep-link to a
 * technical record via recordId. Due dates are spread around "today".
 */
import type { BadgeTone, Priority } from "@/lib/badges";

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
  priority: Priority;
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

export const directives: AirworthinessDirective[] = [
  { ref: "AD 2025-14-05", subject: "Wing front spar lower cap inspection", ataChapter: "ATA 57", applicability: "A320 family", effectiveDate: "2025-08-01", dueDate: "2026-07-16", priority: "Critical", status: "Complied", recordId: "d1" },
  { ref: "AD 2025-09-11", subject: "Cabin altitude pressure switch replacement", ataChapter: "ATA 21", applicability: "N788TX", effectiveDate: "2025-05-20", dueDate: "2026-07-14", priority: "High", status: "Open" },
  { ref: "AD 2026-03-02", subject: "Engine fan blade root eddy-current check", ataChapter: "ATA 72", applicability: "B787-9", effectiveDate: "2026-03-15", dueDate: "2026-08-10", priority: "High", status: "In Progress" },
  { ref: "AD 2026-01-18", subject: "Rudder travel limiter unit software update", ataChapter: "ATA 27", applicability: "A320 family", effectiveDate: "2026-02-01", dueDate: "2026-07-27", priority: "Medium", status: "In Progress" },
  { ref: "AD 2025-22-07", subject: "Fuel tank flame arrestor inspection", ataChapter: "ATA 28", applicability: "B737-800", effectiveDate: "2025-11-10", dueDate: "2026-09-01", priority: "Medium", status: "Open" },
  { ref: "AD 2026-05-14", subject: "Nose landing gear steering actuator seal", ataChapter: "ATA 32", applicability: "A321neo", effectiveDate: "2026-06-01", dueDate: "2026-10-22", priority: "Medium", status: "Open" },
  { ref: "AD 2025-17-09", subject: "Angle-of-attack sensor heater monitoring", ataChapter: "ATA 34", applicability: "B737 MAX 8", effectiveDate: "2025-09-05", dueDate: "2026-07-19", priority: "Critical", status: "In Progress" },
  { ref: "AD 2024-30-11", subject: "Center wing box fastener replacement", ataChapter: "ATA 57", applicability: "A350-1000", effectiveDate: "2024-12-20", dueDate: "2026-11-30", priority: "Low", status: "Open" },
  { ref: "AD 2025-06-03", subject: "Thrust reverser lockout inspection", ataChapter: "ATA 78", applicability: "B787-9", effectiveDate: "2025-04-01", dueDate: "2026-06-28", priority: "High", status: "Complied" },
  { ref: "AD 2026-02-21", subject: "Emergency lighting battery capacity test", ataChapter: "ATA 33", applicability: "Fleet-wide", effectiveDate: "2026-03-01", dueDate: "2026-08-30", priority: "Low", status: "In Progress" },
  { ref: "AD 2025-28-04", subject: "Horizontal stabilizer trim actuator check", ataChapter: "ATA 27", applicability: "B737-800", effectiveDate: "2025-12-01", dueDate: "2026-09-18", priority: "Medium", status: "Open" },
  { ref: "AD 2024-19-08", subject: "Cargo door latch sensor rework", ataChapter: "ATA 52", applicability: "E190-E2", effectiveDate: "2024-10-15", dueDate: "2026-05-05", priority: "Low", status: "Not Applicable" },
];

export const bulletins: ServiceBulletin[] = [
  { ref: "SB 737-28-1234", subject: "Center-tank fuel boost pump wiring inspection", ataChapter: "ATA 28", applicability: "B737-800", issueDate: "2025-02-11", category: "Recommended", status: "Incorporated", recordId: "d5" },
  { ref: "SB A320-57-1198", subject: "Wing-to-body fairing panel reinforcement", ataChapter: "ATA 57", applicability: "A320 family", issueDate: "2026-01-20", category: "Recommended", status: "Open" },
  { ref: "SB 787-36-0091", subject: "Pneumatic duct clamp torque revision", ataChapter: "ATA 36", applicability: "B787-9", issueDate: "2026-04-02", category: "Mandatory", status: "In Progress" },
  { ref: "SB A350-24-0044", subject: "Generator control unit software load", ataChapter: "ATA 24", applicability: "A350-1000", issueDate: "2026-03-11", category: "Recommended", status: "Open" },
  { ref: "SB E190-52-0030", subject: "Passenger door damper replacement", ataChapter: "ATA 52", applicability: "E190-E2", issueDate: "2025-11-08", category: "Optional", status: "Open" },
  { ref: "SB 737-53-1450", subject: "Fuselage skin lap-joint corrosion survey", ataChapter: "ATA 53", applicability: "B737 MAX 8", issueDate: "2026-02-28", category: "Recommended", status: "In Progress" },
  { ref: "SB A321-71-0210", subject: "Engine mount bolt inspection interval", ataChapter: "ATA 71", applicability: "A321neo", issueDate: "2026-05-19", category: "Mandatory", status: "Open" },
  { ref: "SB 787-25-0177", subject: "Cabin sidewall panel retrofit", ataChapter: "ATA 25", applicability: "B787-9", issueDate: "2025-09-30", category: "Optional", status: "Not Applicable" },
];

export const airworthinessStats = {
  openAds: directives.filter((d) => d.status === "Open" || d.status === "In Progress").length,
  compliedAds: directives.filter((d) => d.status === "Complied").length,
  criticalAds: directives.filter((d) => d.priority === "Critical" && d.status !== "Complied" && d.status !== "Not Applicable").length,
  openSbs: bulletins.filter((b) => b.status === "Open" || b.status === "In Progress").length,
};

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
