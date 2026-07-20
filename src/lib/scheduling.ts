/**
 * Scheduling data — planned maintenance events for the calendar + timeline.
 * Centered on July 2026 (the app's "today" is 2026-07-20) with a few August
 * events. Check types reuse the dashboard's four-colour viz ramp (by
 * disruption) so no new palette is introduced.
 */
import type { BadgeTone } from "@/lib/badges";

export type MaintenanceType =
  | "Line Maintenance"
  | "A Check"
  | "C Check"
  | "Engine Inspection"
  | "Daily Check";

export type EventStatus = "Scheduled" | "In Progress" | "Completed";

export interface MaintenanceEvent {
  id: string;
  aircraft: string;
  type: MaintenanceType;
  date: string;
  durationDays: number;
  status: EventStatus;
  hangar: string;
  description: string;
}

export const events: MaintenanceEvent[] = [
  { id: "m1", aircraft: "N103TX", type: "A Check", date: "2026-07-03", durationDays: 1, status: "Completed", hangar: "JFK · Hangar 2", description: "A-Check package A-22" },
  { id: "m2", aircraft: "N106TX", type: "Engine Inspection", date: "2026-07-07", durationDays: 2, status: "Completed", hangar: "MIA · Line", description: "#1 engine borescope" },
  { id: "m3", aircraft: "N114TX", type: "A Check", date: "2026-07-10", durationDays: 1, status: "Completed", hangar: "ORD · Hangar 1", description: "A-Check package A-19" },
  { id: "m4", aircraft: "N120TX", type: "C Check", date: "2026-07-14", durationDays: 12, status: "In Progress", hangar: "JFK · Hangar 4", description: "C-Check package C-06" },
  { id: "m5", aircraft: "N788TX", type: "Line Maintenance", date: "2026-07-16", durationDays: 1, status: "In Progress", hangar: "LAX · Line", description: "Cabin altitude troubleshooting" },
  { id: "m6", aircraft: "N109TX", type: "A Check", date: "2026-07-20", durationDays: 1, status: "In Progress", hangar: "SFO · Hangar 1", description: "A-Check package A-24" },
  { id: "m7", aircraft: "N118TX", type: "Line Maintenance", date: "2026-07-21", durationDays: 1, status: "Scheduled", hangar: "MIA · Line", description: "Cabin monument reconfiguration" },
  { id: "m8", aircraft: "N124TX", type: "A Check", date: "2026-07-22", durationDays: 1, status: "Scheduled", hangar: "LHR · Hangar 3", description: "A-Check package A-11" },
  { id: "m9", aircraft: "N106TX", type: "Engine Inspection", date: "2026-07-24", durationDays: 2, status: "Scheduled", hangar: "MIA · Line", description: "HPT trend follow-up" },
  { id: "m10", aircraft: "N121TX", type: "C Check", date: "2026-07-28", durationDays: 14, status: "Scheduled", hangar: "ORD · Hangar 2", description: "C-Check package C-03" },
  { id: "m11", aircraft: "N112TX", type: "A Check", date: "2026-07-31", durationDays: 1, status: "Scheduled", hangar: "JFK · Hangar 1", description: "A-Check package A-15" },
  { id: "m12", aircraft: "N101TX", type: "A Check", date: "2026-08-04", durationDays: 1, status: "Scheduled", hangar: "JFK · Hangar 2", description: "A-Check package A-27" },
  { id: "m13", aircraft: "N105TX", type: "Engine Inspection", date: "2026-08-11", durationDays: 3, status: "Scheduled", hangar: "LAX · Hangar 1", description: "Fan blade eddy-current (AD 2026-03-02)" },
];

export const CALENDAR_MONTH = { year: 2026, month: 6 }; // month is 0-indexed (July)

export const schedulingStats = {
  scheduledThisMonth: events.filter((e) => e.date.startsWith("2026-07")).length,
  aChecks: events.filter((e) => e.type === "A Check").length,
  cChecks: events.filter((e) => e.type === "C Check").length,
  engineInspections: events.filter((e) => e.type === "Engine Inspection").length,
};

/** Events on/after "today", soonest first. */
export const upcoming = [...events]
  .filter((e) => Date.parse(e.date) >= Date.parse("2026-07-20"))
  .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

const TYPE_COLOR: Record<MaintenanceType, string> = {
  "Daily Check": "--viz-neutral",
  "Line Maintenance": "--viz-neutral",
  "A Check": "--viz-good",
  "Engine Inspection": "--viz-warning",
  "C Check": "--viz-critical",
};

export function typeColorVar(t: MaintenanceType): string {
  return TYPE_COLOR[t];
}

export const MAINTENANCE_LEGEND: { type: MaintenanceType; colorVar: string }[] = [
  { type: "A Check", colorVar: "--viz-good" },
  { type: "Engine Inspection", colorVar: "--viz-warning" },
  { type: "C Check", colorVar: "--viz-critical" },
  { type: "Line Maintenance", colorVar: "--viz-neutral" },
];

export function eventStatusTone(s: EventStatus): BadgeTone {
  switch (s) {
    case "Scheduled": return "neutral";
    case "In Progress": return "info";
    case "Completed": return "success";
  }
}
