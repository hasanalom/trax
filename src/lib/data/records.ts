import "server-only";
import { prisma } from "@/lib/db";
import type {
  TechRecord,
  DocStatus,
  RecordCategory,
  Attachment,
  Revision,
} from "@/lib/records";

/**
 * Technical-records repository. Reconstructs the `TechRecord` shape (author /
 * reviewer names from the User relation, aircraft display string, JSON
 * sub-documents, ISO updated date).
 */
const iso = (dt: Date) => dt.toISOString().slice(0, 10);

const include = { author: true, reviewer: true } as const;
type Row = Awaited<
  ReturnType<typeof prisma.technicalRecord.findMany<{ include: typeof include }>>
>[number];

function toRecord(r: Row): TechRecord {
  return {
    id: r.id,
    title: r.title,
    reference: r.reference,
    category: r.category as RecordCategory,
    ataChapter: r.ataChapter,
    aircraft: r.aircraftText,
    aircraftId: r.aircraftId ?? undefined,
    author: r.author.name,
    reviewer: r.reviewer.name,
    revision: r.revision,
    status: r.status as DocStatus,
    updated: r.updated,
    updatedDate: iso(r.updatedDate),
    signoff: r.signoff as TechRecord["signoff"],
    attachments: r.attachments as unknown as Attachment[],
    history: r.history as unknown as Revision[],
    notes: r.notes as unknown as string[],
  };
}

export async function getTechnicalRecord(id: string): Promise<TechRecord | null> {
  const r = await prisma.technicalRecord.findUnique({ where: { id }, include });
  return r ? toRecord(r) : null;
}

/** All record ids — for generateStaticParams (no direct Prisma in the page). */
export async function getTechnicalRecordIds(): Promise<string[]> {
  const rows = await prisma.technicalRecord.findMany({ select: { id: true } });
  return rows.map((r) => r.id);
}

/** Records attached to a given aircraft (for the aircraft detail page). */
export async function getTechnicalRecordsForAircraft(
  aircraftId: string,
): Promise<TechRecord[]> {
  const rs = await prisma.technicalRecord.findMany({
    where: { aircraftId },
    include,
  });
  return rs.map(toRecord);
}
