import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Button } from "@/components/ui/button";
import { MaintenanceCalendar } from "@/components/scheduling/maintenance-calendar";
import { UpcomingTimeline } from "@/components/scheduling/upcoming-timeline";
import { CalendarIcon, GaugeIcon, PlusIcon, WrenchIcon } from "@/components/icons";
import { schedulingStats } from "@/lib/scheduling";

export const metadata: Metadata = { title: "Scheduling" };

/**
 * Scheduling — a calendar-style month view of planned maintenance alongside an
 * upcoming timeline, with A-Check / C-Check / engine-inspection counts.
 */
export default function SchedulingPage() {
  return (
    <div className="container-content py-6 sm:py-8">
      <PageHeader
        title="Scheduling"
        description="Planned maintenance across the fleet"
        actions={
          <Button variant="secondary">
            <PlusIcon size={15} />
            Schedule Task
          </Button>
        }
      />

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="This Month" value={schedulingStats.scheduledThisMonth} icon={CalendarIcon} />
        <StatTile label="A Checks" value={schedulingStats.aChecks} icon={WrenchIcon} />
        <StatTile label="C Checks" value={schedulingStats.cChecks} icon={WrenchIcon} intent="attention" />
        <StatTile label="Engine Inspections" value={schedulingStats.engineInspections} icon={GaugeIcon} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MaintenanceCalendar />
        </div>
        <div>
          <UpcomingTimeline />
        </div>
      </section>
    </div>
  );
}
