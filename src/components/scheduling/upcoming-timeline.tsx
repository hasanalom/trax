import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { CalendarIcon } from "@/components/icons";
import { formatDate, dueLabel } from "@/lib/format";
import { upcoming, typeColorVar, eventStatusTone } from "@/lib/scheduling";

/**
 * UpcomingTimeline — the next maintenance events as a compact vertical list,
 * soonest first. Each row carries a type-coloured rail, aircraft, hangar and
 * status.
 */
export function UpcomingTimeline() {
  return (
    <Card className="h-full">
      <CardHeader title="Upcoming Maintenance" hint="Next scheduled events" />
      <CardContent>
        {upcoming.length === 0 ? (
          <EmptyState icon={CalendarIcon} title="Nothing scheduled" compact />
        ) : (
          <ul className="flex flex-col gap-1">
            {upcoming.map((e) => (
              <li key={e.id} className="flex gap-3 py-2">
                <span
                  className="mt-1 w-1 shrink-0 self-stretch rounded-full"
                  style={{ background: `var(${typeColorVar(e.type)})` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-label font-semibold tabular-nums text-primary">
                      {e.aircraft}
                    </span>
                    <Badge tone={eventStatusTone(e.status)} dot>{e.status}</Badge>
                  </div>
                  <p className="mt-0.5 truncate text-footnote text-secondary">
                    {e.type} · {e.description}
                  </p>
                  <p className="mt-0.5 flex flex-wrap gap-x-2 text-caption text-tertiary">
                    <span className="tabular-nums">{formatDate(e.date)}</span>
                    <span>· {dueLabel(e.date)}</span>
                    <span>· {e.hangar}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
