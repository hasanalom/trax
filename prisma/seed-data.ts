/**
 * Seed source — the canonical demo dataset, moved here from src/lib so it lives
 * in exactly one place. Rows are already in Prisma insert shape (Date objects,
 * flattened columns, FK ids). Only used by prisma/seed.ts (never the app).
 *
 * Dates are stored at UTC midnight; the repository layer converts them back to
 * "YYYY-MM-DD" so the UI renders identically to the previous static version.
 */

/** ISO date string → UTC-midnight Date. */
const d = (iso: string) => new Date(`${iso}T00:00:00.000Z`);

/** "Hasan Alom" → "hasan-alom" (stable user id). */
export const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---- Users (engineers / authors / reviewers) --------------------------- */

const ENGINEERS = [
  { name: "Hasan Alom", title: "Lead B1 Engineer", license: "EASA Part-66 B1.1", role: "Technical Records" },
  { name: "Marcus Ferreira", title: "B1 Certifying Engineer", license: "EASA Part-66 B1.1", role: "Base Maintenance" },
  { name: "Katarina Novak", title: "B2 Avionics Engineer", license: "EASA Part-66 B2", role: "Avionics" },
  { name: "Julian Osei", title: "Base Maintenance Engineer", license: "FAA A&P / IA", role: "Base Maintenance" },
  { name: "Lena Bianchi", title: "Line Certifying Staff", license: "EASA Part-66 B1.3", role: "Line Maintenance" },
  { name: "Priya Nair", title: "Powerplant Engineer", license: "EASA Part-66 B1.1", role: "Powerplant" },
  { name: "Diego Martins", title: "Structures Engineer", license: "FAA A&P", role: "Structures" },
  { name: "Sofia Rossi", title: "B2 Avionics Engineer", license: "EASA Part-66 B2", role: "Avionics" },
];

export const users = ENGINEERS.map((e) => ({
  id: slug(e.name),
  name: e.name,
  title: e.title,
  license: e.license,
  role: e.role,
}));

/* ---- Aircraft (generated — matches the dashboard status mix) ------------ */

const TYPES = [
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

const STATUS_OVERRIDES: Record<number, string> = {
  5: "In Maintenance",
  13: "In Maintenance",
  18: "AOG",
  21: "Stored",
};

const CHECK_TYPES = ["A Check", "A Check", "A Check", "C Check", "Line Maintenance"];
const NEXT_OFFSETS = [-4, 6, 12, 3, 21, 34, 9, 48, 15, 27, 61, 7];

const addDays = (iso: string, days: number) =>
  new Date(Date.parse(`${iso}T00:00:00.000Z`) + days * 86_400_000);

export const aircraft = Array.from({ length: 24 }, (_, i) => {
  const spec = TYPES[i % TYPES.length];
  const base = BASES[i % BASES.length];
  const engineer = ENGINEERS[i % ENGINEERS.length];
  const status = STATUS_OVERRIDES[i] ?? "In Service";
  const yearBuilt = 2014 + (i % 11);
  const age = 2026 - yearBuilt;
  const flightHours = 3_120 * age + 1_450 + i * 137;
  const flightCycles = Math.round(flightHours / (2.1 + (i % 5) * 0.18));
  const registration = `N${101 + i}TX`;
  const airworthiness =
    status === "AOG" ? "Grounded" : status === "Stored" ? "Restricted" : "Airworthy";
  const lastType = CHECK_TYPES[i % CHECK_TYPES.length];
  const nextType = lastType === "C Check" ? "A Check" : i % 4 === 0 ? "C Check" : "A Check";

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
    baseCode: base.code,
    baseCity: base.city,
    status,
    airworthiness,
    flightHours,
    flightCycles,
    lastCheckType: lastType,
    lastCheckDate: addDays("2026-07-20", -(70 + (i % 40))),
    nextCheckType: nextType,
    nextCheckDate: addDays("2026-07-20", NEXT_OFFSETS[i % NEXT_OFFSETS.length]),
    engineerId: slug(engineer.name),
  };
});

/* ---- Technical records -------------------------------------------------- */

export const records = [
  {
    id: "d1", title: "AD 2025-14-05 Compliance Record", reference: "AD 2025-14-05",
    category: "Airworthiness Directive", ataChapter: "ATA 57 — Wings",
    aircraftText: "N320TX", aircraftId: "n120tx",
    authorId: slug("Hasan Alom"), reviewerId: slug("Katarina Novak"),
    revision: "Rev B", status: "Approved", updated: "12 min ago", updatedDate: d("2026-07-20"),
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
    id: "d2", title: "Engine Borescope Inspection Report", reference: "TR-2026-0731",
    category: "Inspection", ataChapter: "ATA 72 — Engine",
    aircraftText: "N737TX", aircraftId: "n106tx",
    authorId: slug("Marcus Ferreira"), reviewerId: slug("Priya Nair"),
    revision: "Rev A", status: "In Review", updated: "48 min ago", updatedDate: d("2026-07-20"),
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
    id: "d3", title: "Cabin Altitude Warning — Task Card", reference: "WO-10517",
    category: "Work Order", ataChapter: "ATA 21 — Air Conditioning",
    aircraftText: "N788TX", aircraftId: "n105tx",
    authorId: slug("Katarina Novak"), reviewerId: slug("Sofia Rossi"),
    revision: "Rev A", status: "Draft", updated: "2 hours ago", updatedDate: d("2026-07-20"),
    signoff: { status: "Pending" },
    attachments: [{ name: "TaskCard-21-31-00.pdf", kind: "Task Card", size: "96 KB" }],
    history: [
      { revision: "Rev A", date: "2026-07-20", author: "Katarina Novak", summary: "Drafted task card to troubleshoot intermittent cabin altitude warning." },
    ],
    notes: [
      "Troubleshooting task card raised against a repeated cabin altitude warning message logged over three sectors.",
      "Cabin pressure controller and outflow valve to be functionally tested per AMM 21-31-00 before return to service.",
    ],
  },
  {
    id: "d4", title: "Landing Gear Overhaul Certificate", reference: "MR-2026-0442",
    category: "Maintenance Release", ataChapter: "ATA 32 — Landing Gear",
    aircraftText: "N321TX", aircraftId: "n121tx",
    authorId: slug("Julian Osei"), reviewerId: slug("Diego Martins"),
    revision: "Rev A", status: "Approved", updated: "5 hours ago", updatedDate: d("2026-07-20"),
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
    id: "d5", title: "SB 737-28-1234 Revision B", reference: "SB 737-28-1234",
    category: "Service Bulletin", ataChapter: "ATA 28 — Fuel",
    aircraftText: "Fleet-wide", aircraftId: null,
    authorId: slug("Diego Martins"), reviewerId: slug("Hasan Alom"),
    revision: "Rev B", status: "Superseded", updated: "Yesterday", updatedDate: d("2026-07-19"),
    signoff: { status: "Not Required" },
    attachments: [{ name: "SB-737-28-1234-RevB.pdf", kind: "Bulletin", size: "820 KB" }],
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
    id: "d6", title: "Weight & Balance Amendment", reference: "EO-2026-0188",
    category: "Engineering Order", ataChapter: "ATA 08 — Leveling & Weighing",
    aircraftText: "N190TX", aircraftId: "n112tx",
    authorId: slug("Lena Bianchi"), reviewerId: slug("Sofia Rossi"),
    revision: "Rev A", status: "Approved", updated: "Yesterday", updatedDate: d("2026-07-19"),
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

/* ---- Airworthiness Directives ------------------------------------------ */

export const directives = [
  { ref: "AD 2025-14-05", subject: "Wing front spar lower cap inspection", ataChapter: "ATA 57", applicability: "A320 family", effectiveDate: d("2025-08-01"), dueDate: d("2026-07-16"), priority: "Critical", status: "Complied", recordId: "d1" },
  { ref: "AD 2025-09-11", subject: "Cabin altitude pressure switch replacement", ataChapter: "ATA 21", applicability: "N788TX", effectiveDate: d("2025-05-20"), dueDate: d("2026-07-14"), priority: "High", status: "Open", recordId: null },
  { ref: "AD 2026-03-02", subject: "Engine fan blade root eddy-current check", ataChapter: "ATA 72", applicability: "B787-9", effectiveDate: d("2026-03-15"), dueDate: d("2026-08-10"), priority: "High", status: "In Progress", recordId: null },
  { ref: "AD 2026-01-18", subject: "Rudder travel limiter unit software update", ataChapter: "ATA 27", applicability: "A320 family", effectiveDate: d("2026-02-01"), dueDate: d("2026-07-27"), priority: "Medium", status: "In Progress", recordId: null },
  { ref: "AD 2025-22-07", subject: "Fuel tank flame arrestor inspection", ataChapter: "ATA 28", applicability: "B737-800", effectiveDate: d("2025-11-10"), dueDate: d("2026-09-01"), priority: "Medium", status: "Open", recordId: null },
  { ref: "AD 2026-05-14", subject: "Nose landing gear steering actuator seal", ataChapter: "ATA 32", applicability: "A321neo", effectiveDate: d("2026-06-01"), dueDate: d("2026-10-22"), priority: "Medium", status: "Open", recordId: null },
  { ref: "AD 2025-17-09", subject: "Angle-of-attack sensor heater monitoring", ataChapter: "ATA 34", applicability: "B737 MAX 8", effectiveDate: d("2025-09-05"), dueDate: d("2026-07-19"), priority: "Critical", status: "In Progress", recordId: null },
  { ref: "AD 2024-30-11", subject: "Center wing box fastener replacement", ataChapter: "ATA 57", applicability: "A350-1000", effectiveDate: d("2024-12-20"), dueDate: d("2026-11-30"), priority: "Low", status: "Open", recordId: null },
  { ref: "AD 2025-06-03", subject: "Thrust reverser lockout inspection", ataChapter: "ATA 78", applicability: "B787-9", effectiveDate: d("2025-04-01"), dueDate: d("2026-06-28"), priority: "High", status: "Complied", recordId: null },
  { ref: "AD 2026-02-21", subject: "Emergency lighting battery capacity test", ataChapter: "ATA 33", applicability: "Fleet-wide", effectiveDate: d("2026-03-01"), dueDate: d("2026-08-30"), priority: "Low", status: "In Progress", recordId: null },
  { ref: "AD 2025-28-04", subject: "Horizontal stabilizer trim actuator check", ataChapter: "ATA 27", applicability: "B737-800", effectiveDate: d("2025-12-01"), dueDate: d("2026-09-18"), priority: "Medium", status: "Open", recordId: null },
  { ref: "AD 2024-19-08", subject: "Cargo door latch sensor rework", ataChapter: "ATA 52", applicability: "E190-E2", effectiveDate: d("2024-10-15"), dueDate: d("2026-05-05"), priority: "Low", status: "Not Applicable", recordId: null },
];

/* ---- Service Bulletins -------------------------------------------------- */

export const bulletins = [
  { ref: "SB 737-28-1234", subject: "Center-tank fuel boost pump wiring inspection", ataChapter: "ATA 28", applicability: "B737-800", issueDate: d("2025-02-11"), category: "Recommended", status: "Incorporated", recordId: "d5" },
  { ref: "SB A320-57-1198", subject: "Wing-to-body fairing panel reinforcement", ataChapter: "ATA 57", applicability: "A320 family", issueDate: d("2026-01-20"), category: "Recommended", status: "Open", recordId: null },
  { ref: "SB 787-36-0091", subject: "Pneumatic duct clamp torque revision", ataChapter: "ATA 36", applicability: "B787-9", issueDate: d("2026-04-02"), category: "Mandatory", status: "In Progress", recordId: null },
  { ref: "SB A350-24-0044", subject: "Generator control unit software load", ataChapter: "ATA 24", applicability: "A350-1000", issueDate: d("2026-03-11"), category: "Recommended", status: "Open", recordId: null },
  { ref: "SB E190-52-0030", subject: "Passenger door damper replacement", ataChapter: "ATA 52", applicability: "E190-E2", issueDate: d("2025-11-08"), category: "Optional", status: "Open", recordId: null },
  { ref: "SB 737-53-1450", subject: "Fuselage skin lap-joint corrosion survey", ataChapter: "ATA 53", applicability: "B737 MAX 8", issueDate: d("2026-02-28"), category: "Recommended", status: "In Progress", recordId: null },
  { ref: "SB A321-71-0210", subject: "Engine mount bolt inspection interval", ataChapter: "ATA 71", applicability: "A321neo", issueDate: d("2026-05-19"), category: "Mandatory", status: "Open", recordId: null },
  { ref: "SB 787-25-0177", subject: "Cabin sidewall panel retrofit", ataChapter: "ATA 25", applicability: "B787-9", issueDate: d("2025-09-30"), category: "Optional", status: "Not Applicable", recordId: null },
];

/* ---- Compliance findings ------------------------------------------------ */

export const findings = [
  { id: "F-2026-0142", title: "Corrosion beyond limits on cargo floor beam", aircraft: "N788TX", ataChapter: "ATA 53", severity: "Major", source: "Internal Audit", raisedDate: d("2026-07-08"), dueDate: d("2026-07-25"), ownerId: slug("Diego Martins"), status: "Open" },
  { id: "F-2026-0139", title: "Overdue AD compliance — pressure switch", aircraft: "N788TX", ataChapter: "ATA 21", severity: "Critical", source: "AD/SB", raisedDate: d("2026-07-15"), dueDate: d("2026-07-22"), ownerId: slug("Hasan Alom"), status: "Open" },
  { id: "F-2026-0135", title: "Incomplete task card sign-off", aircraft: "N106TX", ataChapter: "ATA 72", severity: "Minor", source: "Internal Audit", raisedDate: d("2026-07-11"), dueDate: d("2026-08-01"), ownerId: slug("Marcus Ferreira"), status: "In Review" },
  { id: "F-2026-0131", title: "MEL item exceeded rectification interval", aircraft: "N114TX", ataChapter: "ATA 34", severity: "Major", source: "MEL", raisedDate: d("2026-07-05"), dueDate: d("2026-07-19"), ownerId: slug("Katarina Novak"), status: "Open" },
  { id: "F-2026-0128", title: "Tooling calibration record missing", aircraft: "Base — JFK", ataChapter: "ATA 05", severity: "Minor", source: "Regulatory Audit", raisedDate: d("2026-07-02"), dueDate: d("2026-07-30"), ownerId: slug("Julian Osei"), status: "In Review" },
  { id: "F-2026-0124", title: "Cabin placard not per configuration", aircraft: "N118TX", ataChapter: "ATA 25", severity: "Observation", source: "Line Inspection", raisedDate: d("2026-06-28"), dueDate: d("2026-07-28"), ownerId: slug("Lena Bianchi"), status: "Open" },
  { id: "F-2026-0119", title: "Engine oil uplift log discrepancy", aircraft: "N103TX", ataChapter: "ATA 79", severity: "Minor", source: "Line Inspection", raisedDate: d("2026-06-20"), dueDate: d("2026-07-04"), ownerId: slug("Priya Nair"), status: "Closed" },
  { id: "F-2026-0112", title: "Fire extinguisher weight out of range", aircraft: "N109TX", ataChapter: "ATA 26", severity: "Major", source: "Internal Audit", raisedDate: d("2026-06-12"), dueDate: d("2026-06-26"), ownerId: slug("Sofia Rossi"), status: "Closed" },
  { id: "F-2026-0108", title: "Wheel assembly overpressure indication", aircraft: "N121TX", ataChapter: "ATA 32", severity: "Minor", source: "Line Inspection", raisedDate: d("2026-06-05"), dueDate: d("2026-06-19"), ownerId: slug("Diego Martins"), status: "Closed" },
  { id: "F-2026-0101", title: "Logbook entry legibility observation", aircraft: "N112TX", ataChapter: "ATA 05", severity: "Observation", source: "Regulatory Audit", raisedDate: d("2026-05-29"), dueDate: d("2026-06-30"), ownerId: slug("Hasan Alom"), status: "Closed" },
];

/* ---- Maintenance events ------------------------------------------------- */

export const events = [
  { id: "m1", aircraft: "N103TX", type: "A Check", date: d("2026-07-03"), durationDays: 1, status: "Completed", hangar: "JFK · Hangar 2", description: "A-Check package A-22" },
  { id: "m2", aircraft: "N106TX", type: "Engine Inspection", date: d("2026-07-07"), durationDays: 2, status: "Completed", hangar: "MIA · Line", description: "#1 engine borescope" },
  { id: "m3", aircraft: "N114TX", type: "A Check", date: d("2026-07-10"), durationDays: 1, status: "Completed", hangar: "ORD · Hangar 1", description: "A-Check package A-19" },
  { id: "m4", aircraft: "N120TX", type: "C Check", date: d("2026-07-14"), durationDays: 12, status: "In Progress", hangar: "JFK · Hangar 4", description: "C-Check package C-06" },
  { id: "m5", aircraft: "N788TX", type: "Line Maintenance", date: d("2026-07-16"), durationDays: 1, status: "In Progress", hangar: "LAX · Line", description: "Cabin altitude troubleshooting" },
  { id: "m6", aircraft: "N109TX", type: "A Check", date: d("2026-07-20"), durationDays: 1, status: "In Progress", hangar: "SFO · Hangar 1", description: "A-Check package A-24" },
  { id: "m7", aircraft: "N118TX", type: "Line Maintenance", date: d("2026-07-21"), durationDays: 1, status: "Scheduled", hangar: "MIA · Line", description: "Cabin monument reconfiguration" },
  { id: "m8", aircraft: "N124TX", type: "A Check", date: d("2026-07-22"), durationDays: 1, status: "Scheduled", hangar: "LHR · Hangar 3", description: "A-Check package A-11" },
  { id: "m9", aircraft: "N106TX", type: "Engine Inspection", date: d("2026-07-24"), durationDays: 2, status: "Scheduled", hangar: "MIA · Line", description: "HPT trend follow-up" },
  { id: "m10", aircraft: "N121TX", type: "C Check", date: d("2026-07-28"), durationDays: 14, status: "Scheduled", hangar: "ORD · Hangar 2", description: "C-Check package C-03" },
  { id: "m11", aircraft: "N112TX", type: "A Check", date: d("2026-07-31"), durationDays: 1, status: "Scheduled", hangar: "JFK · Hangar 1", description: "A-Check package A-15" },
  { id: "m12", aircraft: "N101TX", type: "A Check", date: d("2026-08-04"), durationDays: 1, status: "Scheduled", hangar: "JFK · Hangar 2", description: "A-Check package A-27" },
  { id: "m13", aircraft: "N105TX", type: "Engine Inspection", date: d("2026-08-11"), durationDays: 3, status: "Scheduled", hangar: "LAX · Hangar 1", description: "Fan blade eddy-current (AD 2026-03-02)" },
];
