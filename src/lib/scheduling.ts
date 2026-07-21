/**
 * Scheduling domain types + calendar config, colour mapping, legend and tone
 * helpers (client-safe presentation, no Prisma). Events/upcoming/stats now come
 * from the repository in @/lib/data/scheduling.
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

export const CALENDAR_MONTH = { year: 2026, month: 6 }; // month is 0-indexed (July)

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
