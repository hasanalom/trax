import "server-only";
import { prisma } from "@/lib/db";
import type {
  Finding,
  FindingStatus,
  Severity,
  FindingSource,
} from "@/lib/compliance";

/**
 * Compliance repository — findings + summary counts. Review Queue and history
 * remain static presentation constants in @/lib/compliance (Option A).
 */
const iso = (dt: Date) => dt.toISOString().slice(0, 10);

export async function getFindings(): Promise<Finding[]> {
  const rows = await prisma.complianceFinding.findMany({ include: { owner: true } });
  return rows.map((f) => ({
    id: f.id,
    title: f.title,
    aircraft: f.aircraft,
    ataChapter: f.ataChapter,
    severity: f.severity as Severity,
    source: f.source as FindingSource,
    raisedDate: iso(f.raisedDate),
    dueDate: iso(f.dueDate),
    owner: f.owner.name,
    status: f.status as FindingStatus,
  }));
}

export async function getComplianceStats() {
  const [open, inReview, closed30d] = await Promise.all([
    prisma.complianceFinding.count({ where: { status: "Open" } }),
    prisma.complianceFinding.count({ where: { status: "In Review" } }),
    prisma.complianceFinding.count({ where: { status: "Closed" } }),
  ]);
  // Presentation-only rate (no dedicated model — Option A).
  return { open, inReview, closed30d, complianceRate: 96 };
}
