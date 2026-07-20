import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Button } from "@/components/ui/button";
import { FleetTable } from "@/components/fleet/fleet-table";
import {
  ChartBarIcon,
  GaugeIcon,
  LayersIcon,
  WrenchIcon,
} from "@/components/icons";
import { fleetStats } from "@/lib/fleet";

export const metadata: Metadata = { title: "Aircraft Fleet" };

/**
 * Aircraft Fleet — the fleet register: summary counts + a searchable table.
 */
export default function AircraftPage() {
  return (
    <div className="container-content py-6 sm:py-8">
      <PageHeader
        title="Aircraft Fleet"
        description={`${fleetStats.total} aircraft across 7 types`}
        actions={
          <Button variant="secondary">
            <ChartBarIcon size={15} />
            Fleet Report
          </Button>
        }
      />

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Total Fleet" value={fleetStats.total} icon={LayersIcon} />
        <StatTile
          label="In Service"
          value={fleetStats.inService}
          icon={GaugeIcon}
          intent="positive"
        />
        <StatTile
          label="In Maintenance"
          value={fleetStats.inMaintenance}
          icon={WrenchIcon}
          intent="attention"
        />
        <StatTile
          label="AOG"
          value={fleetStats.aog}
          icon={WrenchIcon}
          intent="critical"
        />
      </section>

      <section className="mt-6">
        <FleetTable />
      </section>
    </div>
  );
}
