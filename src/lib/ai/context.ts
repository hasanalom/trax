import "server-only";
import type { Source } from "@/lib/ai/types";
import { formatDate, formatNumber } from "@/lib/format";
import { getAircraft, getAircraftById } from "@/lib/data/fleet";
import {
  getTechnicalRecord,
  getTechnicalRecords,
  getTechnicalRecordsForAircraft,
} from "@/lib/data/records";
import {
  getAirworthinessDirectives,
  getServiceBulletins,
} from "@/lib/data/airworthiness";
import { getFindings } from "@/lib/data/compliance";
import {
  getMaintenanceEvents,
  getUpcomingMaintenance,
} from "@/lib/data/scheduling";

/**
 * Context retrieval — pulls ONLY the records relevant to a request from the
 * repositories and builds a compact grounding string plus a deterministic list
 * of sources. Keeps token usage low (never dumps the whole database) and makes
 * every answer traceable. Read-only.
 */
export interface Retrieved {
  briefing: string;
  sources: Source[];
}

/* ---- source + line builders -------------------------------------------- */

const iso = formatDate;

function aircraftSource(reg: string, id: string): Source {
  return { kind: "aircraft", label: `Aircraft ${reg}`, href: `/aircraft/${id}` };
}
function recordSource(reference: string, id: string): Source {
  return { kind: "record", label: `Technical Record ${reference}`, href: `/records/${id}` };
}

function aircraftLine(a: Awaited<ReturnType<typeof getAircraftById>>): string {
  if (!a) return "";
  return (
    `Aircraft ${a.registration} — ${a.type} (${a.manufacturer} ${a.model}), ` +
    `base ${a.base.code} ${a.base.city}. Status ${a.status}; airworthiness ${a.airworthiness}. ` +
    `${formatNumber(a.flightHours)} FH / ${formatNumber(a.flightCycles)} FC. ` +
    `Last ${a.lastCheck.type} on ${iso(a.lastCheck.date)}; next ${a.nextCheck.type} on ${iso(a.nextCheck.date)}. ` +
    `Assigned engineer ${a.engineer.name} (${a.engineer.title}).`
  );
}

/* ---- entity retrievers (also reused by the specialized service API) ----- */

export async function retrieveAircraft(aircraftId: string): Promise<Retrieved | null> {
  const a = await getAircraftById(aircraftId);
  if (!a) return null;
  const [records, allEvents] = await Promise.all([
    getTechnicalRecordsForAircraft(a.id),
    getMaintenanceEvents(),
  ]);
  const events = allEvents.filter((e) => e.aircraft === a.registration);

  const lines = [aircraftLine(a)];
  if (records.length) {
    lines.push(
      "Technical records:",
      ...records.map((r) => `- ${r.reference}: ${r.title} (${r.status}, ${r.ataChapter}).`),
    );
  }
  if (events.length) {
    lines.push(
      "Maintenance events:",
      ...events.map((e) => `- ${iso(e.date)} ${e.type} (${e.status}) — ${e.description}, ${e.hangar}.`),
    );
  }

  const sources: Source[] = [aircraftSource(a.registration, a.id)];
  records.forEach((r) => sources.push(recordSource(r.reference, r.id)));

  return { briefing: lines.join("\n"), sources };
}

export async function retrieveRecord(recordId: string): Promise<Retrieved | null> {
  const r = await getTechnicalRecord(recordId);
  if (!r) return null;

  const lines = [
    `Technical Record ${r.reference} — ${r.title}.`,
    `Category: ${r.category}. ATA: ${r.ataChapter}. Aircraft: ${r.aircraft}.`,
    `Revision ${r.revision}; status ${r.status}. Author ${r.author}; reviewer ${r.reviewer}.`,
    `Sign-off: ${r.signoff.status}${r.signoff.by ? ` by ${r.signoff.by}` : ""}${r.signoff.date ? ` on ${iso(r.signoff.date)}` : ""}.`,
    `Notes: ${r.notes.join(" ")}`,
  ];

  const sources: Source[] = [recordSource(r.reference, r.id)];
  if (r.aircraftId) sources.push(aircraftSource(r.aircraft, r.aircraftId));

  return { briefing: lines.join("\n"), sources };
}

async function retrieveRecordByRef(reference: string): Promise<Retrieved | null> {
  const all = await getTechnicalRecords();
  const match = all.find((r) => r.reference.toLowerCase() === reference.toLowerCase());
  return match ? retrieveRecord(match.id) : null;
}

export async function retrieveDirective(ref: string): Promise<Retrieved | null> {
  const norm = ref.replace(/\s+/g, " ").trim().toUpperCase();
  const all = await getAirworthinessDirectives();
  const ad = all.find((d) => d.ref.toUpperCase() === norm);
  if (!ad) return null;

  const lines = [
    `${ad.ref} — ${ad.subject}.`,
    `ATA ${ad.ataChapter}. Applicability: ${ad.applicability}. Priority: ${ad.priority}.`,
    `Compliance status: ${ad.status}. Effective ${iso(ad.effectiveDate)}; due ${iso(ad.dueDate)}.`,
  ];
  const sources: Source[] = [{ kind: "ad", label: ad.ref }];

  if (ad.recordId) {
    const rec = await getTechnicalRecord(ad.recordId);
    if (rec) {
      lines.push(`Linked compliance record ${rec.reference}: ${rec.title} (${rec.status}).`);
      sources.push(recordSource(rec.reference, rec.id));
    }
  }
  return { briefing: lines.join("\n"), sources };
}

async function retrieveBulletin(ref: string): Promise<Retrieved | null> {
  const norm = ref.replace(/\s+/g, " ").trim().toUpperCase();
  const all = await getServiceBulletins();
  const sb = all.find((b) => b.ref.toUpperCase() === norm);
  if (!sb) return null;
  const lines = [
    `${sb.ref} — ${sb.subject}.`,
    `ATA ${sb.ataChapter}. Applicability: ${sb.applicability}. Category: ${sb.category}. Status: ${sb.status}. Issued ${iso(sb.issueDate)}.`,
  ];
  return { briefing: lines.join("\n"), sources: [{ kind: "sb", label: sb.ref }] };
}

async function retrieveFinding(id: string): Promise<Retrieved | null> {
  const all = await getFindings();
  const f = all.find((x) => x.id.toUpperCase() === id.toUpperCase());
  if (!f) return null;
  const line =
    `Finding ${f.id} — ${f.title}. Aircraft ${f.aircraft}, ${f.ataChapter}. ` +
    `Severity ${f.severity}; source ${f.source}; status ${f.status}. ` +
    `Raised ${iso(f.raisedDate)}; due ${iso(f.dueDate)}. Owner ${f.owner}.`;
  return { briefing: line, sources: [{ kind: "finding", label: `Finding ${f.id}` }] };
}

/* ---- intent retrievers -------------------------------------------------- */

export async function retrieveOpenFindings(): Promise<Retrieved> {
  const open = (await getFindings()).filter((f) => f.status !== "Closed");
  if (!open.length) return { briefing: "There are no open compliance findings.", sources: [] };
  const briefing = [
    `Open compliance findings (${open.length}):`,
    ...open.map(
      (f) => `- ${f.id} ${f.title} — ${f.severity}, ${f.aircraft}, ${f.status}, due ${iso(f.dueDate)}.`,
    ),
  ].join("\n");
  return { briefing, sources: open.map((f) => ({ kind: "finding", label: `Finding ${f.id}` })) };
}

export async function retrieveUpcoming(): Promise<Retrieved> {
  const up = await getUpcomingMaintenance();
  if (!up.length) return { briefing: "No upcoming maintenance is scheduled.", sources: [] };
  const briefing = [
    `Upcoming maintenance (${up.length}), soonest first:`,
    ...up.map((e) => `- ${iso(e.date)} ${e.aircraft} ${e.type} (${e.status}) — ${e.description}, ${e.hangar}.`),
  ].join("\n");
  return {
    briefing,
    sources: up.map((e) => ({ kind: "event", label: `Maintenance ${e.aircraft} · ${e.type}` })),
  };
}

async function retrieveRecentMaintenance(): Promise<Retrieved> {
  const recent = (await getMaintenanceEvents()).filter((e) => e.status !== "Scheduled");
  if (!recent.length) return { briefing: "No recent maintenance is recorded.", sources: [] };
  const briefing = [
    `Recent / in-progress maintenance (${recent.length}):`,
    ...recent.map((e) => `- ${iso(e.date)} ${e.aircraft} ${e.type} (${e.status}) — ${e.description}, ${e.hangar}.`),
  ].join("\n");
  return {
    briefing,
    sources: recent.map((e) => ({ kind: "event", label: `Maintenance ${e.aircraft} · ${e.type}` })),
  };
}

async function retrieveOpenDirectives(): Promise<Retrieved> {
  const open = (await getAirworthinessDirectives()).filter(
    (d) => d.status === "Open" || d.status === "In Progress",
  );
  const briefing = [
    `Open Airworthiness Directives (${open.length}):`,
    ...open.map((d) => `- ${d.ref} ${d.subject} — ${d.priority}, ${d.applicability}, ${d.status}, due ${iso(d.dueDate)}.`),
  ].join("\n");
  return { briefing, sources: open.map((d) => ({ kind: "ad", label: d.ref })) };
}

async function retrieveOpenBulletins(): Promise<Retrieved> {
  const open = (await getServiceBulletins()).filter(
    (b) => b.status === "Open" || b.status === "In Progress",
  );
  const briefing = [
    `Open Service Bulletins (${open.length}):`,
    ...open.map((b) => `- ${b.ref} ${b.subject} — ${b.category}, ${b.applicability}, ${b.status}.`),
  ].join("\n");
  return { briefing, sources: open.map((b) => ({ kind: "sb", label: b.ref })) };
}

async function retrieveFleetOverview(): Promise<Retrieved> {
  const fleet = await getAircraft();
  const byStatus = fleet.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});
  const briefing = [
    `Fleet: ${fleet.length} aircraft. ` +
      Object.entries(byStatus).map(([s, n]) => `${n} ${s}`).join(", ") + ".",
    "Aircraft:",
    ...fleet.map((a) => `- ${a.registration} ${a.type}, ${a.base.code}, ${a.status}, next ${a.nextCheck.type} ${iso(a.nextCheck.date)}.`),
  ].join("\n");
  return { briefing, sources: [] };
}

async function retrieveGeneral(): Promise<Retrieved> {
  const [findings, ads, up] = await Promise.all([
    getFindings(),
    getAirworthinessDirectives(),
    getUpcomingMaintenance(),
  ]);
  const openF = findings.filter((f) => f.status !== "Closed").length;
  const openAd = ads.filter((d) => d.status === "Open" || d.status === "In Progress").length;
  const briefing = [
    "TRAX snapshot:",
    `- Open compliance findings: ${openF}.`,
    `- Open airworthiness directives: ${openAd}.`,
    `- Next maintenance: ${up[0] ? `${up[0].aircraft} ${up[0].type} on ${iso(up[0].date)}` : "none scheduled"}.`,
    "Ask about a specific aircraft (e.g. N120TX), an AD/SB, a technical record, open findings, or scheduling.",
  ].join("\n");
  return { briefing, sources: [] };
}

/* ---- router: pick relevant retrievers for a free-text question ---------- */

function matchAll(text: string, re: RegExp): string[] {
  return [...text.matchAll(re)].map((m) => m[0]);
}

function dedupeSources(sources: Source[]): Source[] {
  const seen = new Set<string>();
  return sources.filter((s) => {
    const key = `${s.kind}:${s.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function retrieveForQuestion(question: string): Promise<Retrieved> {
  const q = question.toLowerCase();
  const parts: string[] = [];
  const sources: Source[] = [];
  const push = (r: Retrieved | null) => {
    if (r) {
      parts.push(r.briefing);
      sources.push(...r.sources);
    }
  };

  // Entity-specific (only fetch what is referenced).
  for (const ref of matchAll(question, /\bAD\s?\d{4}-\d{2}-\d{2}\b/gi)) push(await retrieveDirective(ref));
  for (const ref of matchAll(question, /\bSB\s?[A-Za-z0-9]+-\d+-\d+\b/gi)) push(await retrieveBulletin(ref));
  for (const ref of matchAll(question, /\b(?:TR|WO|MR|EO)-\d{4,5}(?:-\d+)?\b/gi)) push(await retrieveRecordByRef(ref));
  for (const tail of matchAll(question, /\bN\d{2,3}TX\b/gi)) push(await retrieveAircraft(tail.toLowerCase()));
  for (const id of matchAll(question, /\bF-\d{4}-\d{4}\b/gi)) push(await retrieveFinding(id));

  if (parts.length === 0) {
    // Intent-based fallback.
    if (/find/.test(q) && /(open|outstanding|remain|unresolved)/.test(q)) push(await retrieveOpenFindings());
    else if (/(next|upcoming|scheduled|schedule|plan)/.test(q) && /(maint|check|inspection|due)/.test(q)) push(await retrieveUpcoming());
    else if (/(recent|recently|completed|done|last)/.test(q) && /(maint|check|work|complete)/.test(q)) push(await retrieveRecentMaintenance());
    else if (/(airworth|directive)/.test(q) || /\bads?\b/.test(q)) push(await retrieveOpenDirectives());
    else if (/(service bulletin)/.test(q) || /\bsbs?\b/.test(q)) push(await retrieveOpenBulletins());
    else if (/find/.test(q)) push(await retrieveOpenFindings());
    else if (/(fleet|aircraft|how many|status)/.test(q)) push(await retrieveFleetOverview());
    else push(await retrieveGeneral());
  }

  return { briefing: parts.join("\n\n"), sources: dedupeSources(sources) };
}
