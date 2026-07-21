/**
 * Fleet domain types + status tone helpers (client-safe, no Prisma).
 * Data now comes from the repository in @/lib/data/fleet.
 */
import type { BadgeTone } from "@/lib/badges";

export type FleetStatus = "In Service" | "In Maintenance" | "AOG" | "Stored";
export type Airworthiness = "Airworthy" | "Restricted" | "Grounded";

export interface Engineer {
  name: string;
  title: string;
  license: string;
}

export interface Aircraft {
  id: string;
  registration: string;
  type: string;
  manufacturer: string;
  model: string;
  msn: string;
  engine: string;
  seats: number;
  yearBuilt: number;
  base: { code: string; city: string };
  status: FleetStatus;
  airworthiness: Airworthiness;
  flightHours: number;
  flightCycles: number;
  lastCheck: { type: string; date: string };
  nextCheck: { type: string; date: string };
  engineer: Engineer;
}

export function fleetStatusTone(status: FleetStatus): BadgeTone {
  switch (status) {
    case "In Service": return "success";
    case "In Maintenance": return "warning";
    case "AOG": return "danger";
    case "Stored": return "neutral";
  }
}

export function airworthinessTone(a: Airworthiness): BadgeTone {
  switch (a) {
    case "Airworthy": return "success";
    case "Restricted": return "warning";
    case "Grounded": return "danger";
  }
}
