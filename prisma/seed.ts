/**
 * Seed script — populates the SQLite database from prisma/seed-data.ts.
 * Idempotent: clears the tables (respecting FKs) then re-inserts. Run via
 * `npm run db:seed` (configured as the Prisma seed in package.json).
 */
import { PrismaClient } from "@prisma/client";
import {
  users,
  aircraft,
  records,
  directives,
  bulletins,
  findings,
  events,
} from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  // Clear (children before parents).
  await prisma.technicalRecord.deleteMany();
  await prisma.complianceFinding.deleteMany();
  await prisma.aircraft.deleteMany();
  await prisma.airworthinessDirective.deleteMany();
  await prisma.serviceBulletin.deleteMany();
  await prisma.maintenanceEvent.deleteMany();
  await prisma.user.deleteMany();

  // Insert (parents before children).
  await prisma.user.createMany({ data: users });
  await prisma.aircraft.createMany({ data: aircraft });
  await prisma.technicalRecord.createMany({ data: records });
  await prisma.airworthinessDirective.createMany({ data: directives });
  await prisma.serviceBulletin.createMany({ data: bulletins });
  await prisma.complianceFinding.createMany({ data: findings });
  await prisma.maintenanceEvent.createMany({ data: events });

  const counts = {
    users: await prisma.user.count(),
    aircraft: await prisma.aircraft.count(),
    technicalRecords: await prisma.technicalRecord.count(),
    directives: await prisma.airworthinessDirective.count(),
    bulletins: await prisma.serviceBulletin.count(),
    findings: await prisma.complianceFinding.count(),
    events: await prisma.maintenanceEvent.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
