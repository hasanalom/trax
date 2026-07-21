import "server-only";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. Reused across hot reloads in dev to avoid exhausting
 * SQLite connections. Server-only — never import from a client component.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
