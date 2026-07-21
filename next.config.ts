import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The SQLite database is a build-time artifact (generated + seeded during the
  // Vercel build). Nothing imports it as a module, so Next's output file
  // tracing won't bundle it into the server functions on its own. Force it in
  // for every route so Prisma can read it at runtime.
  outputFileTracingIncludes: {
    "/**": ["./prisma/dev.db"],
  },
};

export default nextConfig;
