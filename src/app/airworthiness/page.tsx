import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Tabs } from "@/components/ui/tabs";
import { ADTable } from "@/components/airworthiness/ad-table";
import { SBTable } from "@/components/airworthiness/sb-table";
import { AlertTriangleIcon, CheckCircleIcon, DocumentIcon, ShieldCheckIcon } from "@/components/icons";
import {
  getAirworthinessDirectives,
  getServiceBulletins,
  getAirworthinessStats,
} from "@/lib/data/airworthiness";

export const metadata: Metadata = {
  title: "Airworthiness",
  description:
    "Airworthiness Directives and Service Bulletins with compliance state, priority and due dates.",
};

/**
 * Airworthiness — Airworthiness Directives & Service Bulletins, split into
 * tabs, each with its own search and filters. Summary counts sit above.
 */
export default async function AirworthinessPage() {
  const [directives, bulletins, airworthinessStats] = await Promise.all([
    getAirworthinessDirectives(),
    getServiceBulletins(),
    getAirworthinessStats(),
  ]);

  return (
    <div className="container-content py-6 sm:py-8">
      <PageHeader
        title="Airworthiness"
        description="Directives and service bulletins across the fleet"
      />

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Open ADs" value={airworthinessStats.openAds} icon={ShieldCheckIcon} intent="attention" />
        <StatTile label="Critical Open" value={airworthinessStats.criticalAds} icon={AlertTriangleIcon} intent="critical" />
        <StatTile label="Complied" value={airworthinessStats.compliedAds} icon={CheckCircleIcon} intent="positive" />
        <StatTile label="Open SBs" value={airworthinessStats.openSbs} icon={DocumentIcon} />
      </section>

      <section className="mt-6">
        <Tabs
          items={[
            {
              id: "ad",
              label: "Airworthiness Directives",
              count: directives.length,
              content: <ADTable directives={directives} />,
            },
            {
              id: "sb",
              label: "Service Bulletins",
              count: bulletins.length,
              content: <SBTable bulletins={bulletins} />,
            },
          ]}
        />
      </section>
    </div>
  );
}
