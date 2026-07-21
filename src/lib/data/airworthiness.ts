import "server-only";
import { prisma } from "@/lib/db";
import type {
  AirworthinessDirective,
  ServiceBulletin,
  ADStatus,
  SBStatus,
  SBCategory,
} from "@/lib/airworthiness";
import type { Priority } from "@/lib/badges";

/** Airworthiness repository — Directives & Service Bulletins + summary counts. */
const iso = (dt: Date) => dt.toISOString().slice(0, 10);

export async function getAirworthinessDirectives(): Promise<AirworthinessDirective[]> {
  const rows = await prisma.airworthinessDirective.findMany();
  return rows.map((d) => ({
    ref: d.ref,
    subject: d.subject,
    ataChapter: d.ataChapter,
    applicability: d.applicability,
    effectiveDate: iso(d.effectiveDate),
    dueDate: iso(d.dueDate),
    priority: d.priority as Priority,
    status: d.status as ADStatus,
    recordId: d.recordId ?? undefined,
  }));
}

export async function getServiceBulletins(): Promise<ServiceBulletin[]> {
  const rows = await prisma.serviceBulletin.findMany();
  return rows.map((b) => ({
    ref: b.ref,
    subject: b.subject,
    ataChapter: b.ataChapter,
    applicability: b.applicability,
    issueDate: iso(b.issueDate),
    category: b.category as SBCategory,
    status: b.status as SBStatus,
    recordId: b.recordId ?? undefined,
  }));
}

export async function getAirworthinessStats() {
  const [openAds, compliedAds, criticalAds, openSbs] = await Promise.all([
    prisma.airworthinessDirective.count({ where: { status: { in: ["Open", "In Progress"] } } }),
    prisma.airworthinessDirective.count({ where: { status: "Complied" } }),
    prisma.airworthinessDirective.count({
      where: { priority: "Critical", status: { notIn: ["Complied", "Not Applicable"] } },
    }),
    prisma.serviceBulletin.count({ where: { status: { in: ["Open", "In Progress"] } } }),
  ]);
  return { openAds, compliedAds, criticalAds, openSbs };
}
