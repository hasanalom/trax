import "server-only";
import { prisma } from "@/lib/db";
import type { Aircraft, Airworthiness, FleetStatus } from "@/lib/fleet";

/**
 * Fleet repository. Returns the same `Aircraft` shape the pages already consume
 * (nested base/lastCheck/nextCheck/engineer, dates as "YYYY-MM-DD") so nothing
 * downstream changes. DateTime → ISO date conversion happens here, at the
 * data boundary.
 */
const iso = (dt: Date) => dt.toISOString().slice(0, 10);

type Row = Awaited<ReturnType<typeof rows>>[number];
function rows() {
  return prisma.aircraft.findMany({ include: { engineer: true } });
}

function toAircraft(a: Row): Aircraft {
  return {
    id: a.id,
    registration: a.registration,
    type: a.type,
    manufacturer: a.manufacturer,
    model: a.model,
    msn: a.msn,
    engine: a.engine,
    seats: a.seats,
    yearBuilt: a.yearBuilt,
    base: { code: a.baseCode, city: a.baseCity },
    status: a.status as FleetStatus,
    airworthiness: a.airworthiness as Airworthiness,
    flightHours: a.flightHours,
    flightCycles: a.flightCycles,
    lastCheck: { type: a.lastCheckType, date: iso(a.lastCheckDate) },
    nextCheck: { type: a.nextCheckType, date: iso(a.nextCheckDate) },
    engineer: {
      name: a.engineer.name,
      title: a.engineer.title,
      license: a.engineer.license ?? "",
    },
  };
}

/** All aircraft, in fleet-register order. */
export async function getAircraft(): Promise<Aircraft[]> {
  return (await rows()).map(toAircraft);
}

export async function getAircraftById(id: string): Promise<Aircraft | null> {
  const a = await prisma.aircraft.findUnique({
    where: { id: id.toLowerCase() },
    include: { engineer: true },
  });
  return a ? toAircraft(a) : null;
}

export async function getFleetStats() {
  const [total, inService, inMaintenance, aog, stored] = await Promise.all([
    prisma.aircraft.count(),
    prisma.aircraft.count({ where: { status: "In Service" } }),
    prisma.aircraft.count({ where: { status: "In Maintenance" } }),
    prisma.aircraft.count({ where: { status: "AOG" } }),
    prisma.aircraft.count({ where: { status: "Stored" } }),
  ]);
  return { total, inService, inMaintenance, aog, stored };
}
