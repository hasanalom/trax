import "server-only";
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. Reused across hot reloads in dev to avoid exhausting
 * SQLite connections. Server-only — never import from a client component.
 *
 * On Vercel the app runs on a read-only filesystem (only /tmp is writable) and
 * SQLite wants to open the database read-write and create a journal/WAL sidecar
 * — even for read queries — which fails. This is a read-only demo, so we ship
 * the seeded dev.db as a build artifact (bundled via next.config's
 * outputFileTracingIncludes), copy it into /tmp on cold start, and point Prisma
 * there. Locally we use prisma/dev.db directly and none of this runs.
 */
function resolveDatasourceUrl(): string | undefined {
  // Only divert to /tmp on Vercel; local dev keeps the schema's file:./dev.db.
  if (!process.env.VERCEL) return undefined;

  const bundledDb = path.join(process.cwd(), "prisma", "dev.db");
  const runtimeDb = "/tmp/dev.db";

  if (!existsSync(runtimeDb) && existsSync(bundledDb)) {
    copyFileSync(bundledDb, runtimeDb);
  }

  return `file:${runtimeDb}`;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const datasourceUrl = resolveDatasourceUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(datasourceUrl ? { datasourceUrl } : undefined);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
