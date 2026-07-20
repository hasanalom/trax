import { DashboardHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { FleetStatusChart } from "@/components/dashboard/fleet-status-chart";
import { DueItemsChart } from "@/components/dashboard/due-items-chart";
import { RecentDocuments } from "@/components/dashboard/recent-documents";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import {
  AlertTriangleIcon,
  ClipboardIcon,
  ClockIcon,
  DocumentIcon,
  PlaneIcon,
  type IconProps,
} from "@/components/icons";
import { kpis } from "@/lib/demo-data";
import type { ComponentType } from "react";

/**
 * Phase 1 — Enterprise Dashboard (Overview).
 *
 * Static data only; no fetching, no timers. Layout is a single readable column:
 * header → KPIs → charts → records table with a right rail (quick actions +
 * activity). Every panel is a Card, so spacing and edges stay consistent.
 */
const kpiIcons: Record<string, ComponentType<IconProps>> = {
  fleet: PlaneIcon,
  "open-ads": AlertTriangleIcon,
  "due-items": ClockIcon,
  "open-items": ClipboardIcon,
  documents: DocumentIcon,
};

export default function DashboardPage() {
  return (
    <div className="container-content py-6 sm:py-8">
      <DashboardHeader />

      {/* KPIs */}
      <section
        aria-label="Key metrics"
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5"
      >
        {kpis.map((kpi) => (
          <KpiCard key={kpi.key} kpi={kpi} icon={kpiIcons[kpi.key]} />
        ))}
      </section>

      {/* Charts */}
      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FleetStatusChart />
        <DueItemsChart />
      </section>

      {/* Records + right rail */}
      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentDocuments />
        </div>
        <div className="flex flex-col gap-4">
          <QuickActions />
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}
