import "server-only";
import { prisma } from "@/lib/db";
import type {
  MaintenanceEvent,
  MaintenanceType,
  EventStatus,
} from "@/lib/scheduling";

/**
 * Scheduling repository — maintenance events, the upcoming list and check
 * counts. The calendar month config, legend and colour mapping stay as static
 * constants in @/lib/scheduling (presentation).
 */
const iso = (dt: Date) => dt.toISOString().slice(0, 10);
const TODAY = new Date("2026-07-20T00:00:00.000Z");
const MONTH_START = new Date("2026-07-01T00:00:00.000Z");
const NEXT_MONTH = new Date("2026-08-01T00:00:00.000Z");

type Row = Awaited<ReturnType<typeof prisma.maintenanceEvent.findMany>>[number];
function toEvent(e: Row): MaintenanceEvent {
  return {
    id: e.id,
    aircraft: e.aircraft,
    type: e.type as MaintenanceType,
    date: iso(e.date),
    durationDays: e.durationDays,
    status: e.status as EventStatus,
    hangar: e.hangar,
    description: e.description,
  };
}

export async function getMaintenanceEvents(): Promise<MaintenanceEvent[]> {
  return (await prisma.maintenanceEvent.findMany()).map(toEvent);
}

/** Events on/after "today", soonest first. */
export async function getUpcomingMaintenance(): Promise<MaintenanceEvent[]> {
  const rows = await prisma.maintenanceEvent.findMany({
    where: { date: { gte: TODAY } },
    orderBy: { date: "asc" },
  });
  return rows.map(toEvent);
}

export async function getSchedulingStats() {
  const [scheduledThisMonth, aChecks, cChecks, engineInspections] = await Promise.all([
    prisma.maintenanceEvent.count({ where: { date: { gte: MONTH_START, lt: NEXT_MONTH } } }),
    prisma.maintenanceEvent.count({ where: { type: "A Check" } }),
    prisma.maintenanceEvent.count({ where: { type: "C Check" } }),
    prisma.maintenanceEvent.count({ where: { type: "Engine Inspection" } }),
  ]);
  return { scheduledThisMonth, aChecks, cChecks, engineInspections };
}
