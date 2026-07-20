/**
 * Static demo data for the Phase 1 dashboard.
 *
 * Hand-authored to read like a real airline technical-records desk: tail
 * numbers, ATA-style records, Airworthiness Directives, work orders. No fetch,
 * no API, no timers — everything here is a plain constant imported at build.
 * Numbers are internally consistent (e.g. fleet segments sum to the fleet KPI).
 */

/* ---- KPIs --------------------------------------------------------------- */

export type Trend = "up" | "down" | "flat";

export interface Kpi {
  key: string;
  label: string;
  value: string;
  /** Short supporting fact under the value. */
  detail: string;
  /** Direction of `detail` and whether that direction is good. */
  trend: Trend;
  intent: "neutral" | "positive" | "attention" | "critical";
}

export const kpis: Kpi[] = [
  {
    key: "fleet",
    label: "Fleet",
    value: "24",
    detail: "20 in service",
    trend: "flat",
    intent: "neutral",
  },
  {
    key: "open-ads",
    label: "Open ADs",
    value: "18",
    detail: "3 issued this week",
    trend: "up",
    intent: "attention",
  },
  {
    key: "due-items",
    label: "Due Items",
    value: "42",
    detail: "7 overdue",
    trend: "up",
    intent: "critical",
  },
  {
    key: "open-items",
    label: "Open Items",
    value: "12",
    detail: "4 closed this week",
    trend: "down",
    intent: "positive",
  },
  {
    key: "documents",
    label: "Documents",
    value: "1,284",
    detail: "36 added this week",
    trend: "up",
    intent: "neutral",
  },
];

/* ---- Fleet status (donut) ---------------------------------------------- */

export interface FleetSegment {
  key: string;
  label: string;
  count: number;
  /** CSS variable name (from the viz token group) for the segment fill. */
  colorVar: string;
}

export const fleetStatus: FleetSegment[] = [
  { key: "service", label: "In Service", count: 20, colorVar: "--viz-good" },
  { key: "scheduled", label: "Scheduled Maintenance", count: 2, colorVar: "--viz-warning" },
  { key: "aog", label: "Aircraft on Ground", count: 1, colorVar: "--viz-critical" },
  { key: "stored", label: "Stored / Reserve", count: 1, colorVar: "--viz-neutral" },
];

export const fleetTotal = fleetStatus.reduce((n, s) => n + s.count, 0);

/* ---- Due items by urgency (horizontal bars) ---------------------------- */

export interface DueBucket {
  key: string;
  label: string;
  count: number;
  colorVar: string;
}

export const dueItems: DueBucket[] = [
  { key: "overdue", label: "Overdue", count: 7, colorVar: "--viz-critical" },
  { key: "d7", label: "Due ≤ 7 days", count: 11, colorVar: "--viz-serious" },
  { key: "d30", label: "8 – 30 days", count: 15, colorVar: "--viz-warning" },
  { key: "d90", label: "31 – 90 days", count: 9, colorVar: "--viz-neutral" },
];

/* ---- Recent documents (table) ------------------------------------------ */

export type DocStatus = "Approved" | "In Review" | "Draft" | "Superseded";

export interface DocumentRow {
  id: string;
  title: string;
  reference: string;
  aircraft: string;
  category: string;
  status: DocStatus;
  updated: string;
  owner: string;
}

export const recentDocuments: DocumentRow[] = [
  {
    id: "d1",
    title: "AD 2025-14-05 Compliance Record",
    reference: "ATA 57 · Wing",
    aircraft: "N320TX",
    category: "Airworthiness Directive",
    status: "Approved",
    updated: "12 min ago",
    owner: "Hasan Alom",
  },
  {
    id: "d2",
    title: "Engine Borescope Inspection Report",
    reference: "ATA 72 · Powerplant",
    aircraft: "N737TX",
    category: "Inspection",
    status: "In Review",
    updated: "48 min ago",
    owner: "M. Ferreira",
  },
  {
    id: "d3",
    title: "Cabin Altitude Warning — Task Card",
    reference: "ATA 21 · Air Conditioning",
    aircraft: "N788TX",
    category: "Work Order",
    status: "Draft",
    updated: "2 hours ago",
    owner: "K. Novak",
  },
  {
    id: "d4",
    title: "Landing Gear Overhaul Certificate",
    reference: "ATA 32 · Landing Gear",
    aircraft: "N321TX",
    category: "Component",
    status: "Approved",
    updated: "5 hours ago",
    owner: "Hasan Alom",
  },
  {
    id: "d5",
    title: "SB 737-28-1234 Revision B",
    reference: "ATA 28 · Fuel",
    aircraft: "Fleet-wide",
    category: "Service Bulletin",
    status: "Superseded",
    updated: "Yesterday",
    owner: "J. Osei",
  },
  {
    id: "d6",
    title: "Weight & Balance Amendment",
    reference: "ATA 08 · Leveling",
    aircraft: "N190TX",
    category: "Records",
    status: "Approved",
    updated: "Yesterday",
    owner: "L. Bianchi",
  },
];

/* ---- Recent activity (feed) -------------------------------------------- */

export type ActivityKind = "signoff" | "upload" | "review" | "schedule" | "flag";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    kind: "signoff",
    actor: "Hasan Alom",
    action: "signed off",
    target: "WO-10482 · Hydraulic pump replacement",
    time: "12m",
  },
  {
    id: "a2",
    kind: "flag",
    actor: "System",
    action: "flagged overdue",
    target: "AD 2025-09-11 on N788TX",
    time: "35m",
  },
  {
    id: "a3",
    kind: "upload",
    actor: "M. Ferreira",
    action: "uploaded",
    target: "Borescope report for N737TX",
    time: "1h",
  },
  {
    id: "a4",
    kind: "review",
    actor: "K. Novak",
    action: "opened review on",
    target: "Task card ATA 21-31-00",
    time: "2h",
  },
  {
    id: "a5",
    kind: "schedule",
    actor: "L. Bianchi",
    action: "scheduled",
    target: "C-Check for N321TX (14 Aug)",
    time: "4h",
  },
];
