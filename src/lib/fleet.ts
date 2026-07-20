/**
 * Fleet data — 24 aircraft, generated deterministically from a small catalog so
 * counts stay consistent with the dashboard (20 In Service · 2 In Maintenance ·
 * 1 AOG · 1 Stored). Static build-time constants; no fetch, no randomness.
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

interface TypeSpec {
  type: string;
  manufacturer: string;
  model: string;
  engine: string;
  seats: number;
}

const TYPES: TypeSpec[] = [
  { type: "A320-214", manufacturer: "Airbus", model: "A320", engine: "CFM56-5B4", seats: 180 },
  { type: "A321-271NX", manufacturer: "Airbus", model: "A321neo", engine: "PW1133G-JM", seats: 220 },
  { type: "B737-800", manufacturer: "Boeing", model: "737-800", engine: "CFM56-7B26", seats: 189 },
  { type: "B737 MAX 8", manufacturer: "Boeing", model: "737 MAX 8", engine: "LEAP-1B28", seats: 178 },
  { type: "B787-9", manufacturer: "Boeing", model: "787-9", engine: "GEnx-1B74/75", seats: 296 },
  { type: "A350-1000", manufacturer: "Airbus", model: "A350-1000", engine: "Trent XWB-97", seats: 366 },
  { type: "E190-E2", manufacturer: "Embraer", model: "E190-E2", engine: "PW1919G", seats: 106 },
];

const BASES = [
  { code: "JFK", city: "New York" },
  { code: "LHR", city: "London" },
  { code: "LAX", city: "Los Angeles" },
  { code: "ORD", city: "Chicago" },
  { code: "MIA", city: "Miami" },
  { code: "SFO", city: "San Francisco" },
];

const ENGINEERS: Engineer[] = [
  { name: "Hasan Alom", title: "Lead B1 Engineer", license: "EASA Part-66 B1.1" },
  { name: "Marcus Ferreira", title: "B1 Certifying Engineer", license: "EASA Part-66 B1.1" },
  { name: "Katarina Novak", title: "B2 Avionics Engineer", license: "EASA Part-66 B2" },
  { name: "Julian Osei", title: "Base Maintenance Engineer", license: "FAA A&P / IA" },
  { name: "Lena Bianchi", title: "Line Certifying Staff", license: "EASA Part-66 B1.3" },
  { name: "Priya Nair", title: "Powerplant Engineer", license: "EASA Part-66 B1.1" },
  { name: "Diego Martins", title: "Structures Engineer", license: "FAA A&P" },
  { name: "Sofia Rossi", title: "B2 Avionics Engineer", license: "EASA Part-66 B2" },
];

// Fixed overrides so the fleet matches the dashboard's status mix exactly.
const STATUS_OVERRIDES: Record<number, FleetStatus> = {
  5: "In Maintenance",
  13: "In Maintenance",
  18: "AOG",
  21: "Stored",
};

const CHECK_TYPES = ["A Check", "A Check", "A Check", "C Check", "Line Maintenance"];

function build(): Aircraft[] {
  return Array.from({ length: 24 }, (_, i) => {
    const spec = TYPES[i % TYPES.length];
    const base = BASES[i % BASES.length];
    const engineer = ENGINEERS[i % ENGINEERS.length];
    const status = STATUS_OVERRIDES[i] ?? "In Service";
    const yearBuilt = 2014 + (i % 11);
    const age = 2026 - yearBuilt;

    // Older frames accumulate more hours/cycles; keep the ratio realistic.
    const flightHours = 3_120 * age + 1_450 + i * 137;
    const flightCycles = Math.round(flightHours / (2.1 + (i % 5) * 0.18));

    const num = 101 + i;
    const registration = `N${num}TX`;

    const airworthiness: Airworthiness =
      status === "AOG" ? "Grounded" : status === "Stored" ? "Restricted" : "Airworthy";

    const lastType = CHECK_TYPES[i % CHECK_TYPES.length];
    const nextType = lastType === "C Check" ? "A Check" : i % 4 === 0 ? "C Check" : "A Check";

    // Spread next-check dates around "today" (2026-07-20); a couple are overdue.
    const nextOffsets = [-4, 6, 12, 3, 21, 34, 9, 48, 15, 27, 61, 7];
    const off = nextOffsets[i % nextOffsets.length];
    const nextDate = addDays("2026-07-20", off);
    const lastDate = addDays("2026-07-20", -(70 + (i % 40)));

    return {
      id: registration.toLowerCase(),
      registration,
      type: spec.type,
      manufacturer: spec.manufacturer,
      model: spec.model,
      msn: String(6200 + i * 47),
      engine: spec.engine,
      seats: spec.seats,
      yearBuilt,
      base,
      status,
      airworthiness,
      flightHours,
      flightCycles,
      lastCheck: { type: lastType, date: lastDate },
      nextCheck: { type: nextType, date: nextDate },
      engineer,
    };
  });
}

function addDays(iso: string, days: number): string {
  const t = Date.parse(iso) + days * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

export const aircraft: Aircraft[] = build();

export function getAircraft(id: string): Aircraft | undefined {
  return aircraft.find((a) => a.id === id.toLowerCase());
}

export const fleetStats = {
  total: aircraft.length,
  inService: aircraft.filter((a) => a.status === "In Service").length,
  inMaintenance: aircraft.filter((a) => a.status === "In Maintenance").length,
  aog: aircraft.filter((a) => a.status === "AOG").length,
  stored: aircraft.filter((a) => a.status === "Stored").length,
};

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
