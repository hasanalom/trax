import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

/**
 * Route-level loading UI (Next.js Suspense boundary). Shown while the route
 * segment renders — a real loading state, not a simulated delay.
 */
export default function Loading() {
  return <DashboardSkeleton />;
}
