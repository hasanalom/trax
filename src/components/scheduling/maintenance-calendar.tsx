import { Card, CardContent } from "@/components/ui/card";
import {
  CALENDAR_MONTH,
  typeColorVar,
  MAINTENANCE_LEGEND,
  type MaintenanceEvent,
} from "@/lib/scheduling";

/**
 * MaintenanceCalendar — a static month grid (July 2026) with maintenance events
 * placed on their start day. Check types use the dashboard viz ramp; "today"
 * (the 20th) is marked. Multi-day checks show a duration hint.
 */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TODAY_DAY = 20;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function MaintenanceCalendar({ events }: { events: MaintenanceEvent[] }) {
  const { year, month } = CALENDAR_MONTH;
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const byDay = new Map<number, MaintenanceEvent[]>();
  for (const e of events) {
    const [ey, em, ed] = e.date.split("-").map(Number);
    if (ey === year && em === month + 1) {
      const list = byDay.get(ed) ?? [];
      list.push(e);
      byDay.set(ed, list);
    }
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = chunk(cells, 7);

  return (
    <Card>
      <div className="flex flex-col gap-3 px-5 pt-4 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-label font-semibold text-primary">
          {MONTH_NAMES[month]} {year}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {MAINTENANCE_LEGEND.map((l) => (
            <span key={l.type} className="flex items-center gap-1.5 text-footnote text-tertiary">
              <span className="h-2 w-2 rounded-full" style={{ background: `var(${l.colorVar})` }} />
              {l.type}
            </span>
          ))}
        </div>
      </div>

      <CardContent padded={false} className="px-2 pb-2">
        {/* Weekday header */}
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((d) => (
            <div key={d} className="px-2 py-2 text-caption font-medium uppercase text-tertiary">
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex flex-col overflow-hidden rounded-lg border-l border-t border-border-subtle">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const dayEvents = day ? byDay.get(day) ?? [] : [];
                const isToday = day === TODAY_DAY;
                return (
                  <div
                    key={di}
                    className="min-h-24 border-b border-r border-border-subtle p-1.5"
                  >
                    {day && (
                      <>
                        <div className="mb-1 flex justify-end">
                          <span
                            className={
                              isToday
                                ? "grid h-5 w-5 place-items-center rounded-full bg-accent text-caption font-semibold tabular-nums text-on-accent"
                                : "px-1 text-caption tabular-nums text-tertiary"
                            }
                          >
                            {day}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {dayEvents.map((e) => (
                            <div
                              key={e.id}
                              className="flex items-center gap-1.5 rounded-[5px] bg-surface-sunken px-1.5 py-1"
                              title={`${e.aircraft} · ${e.type} · ${e.description}`}
                            >
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ background: `var(${typeColorVar(e.type)})` }}
                              />
                              <span className="truncate text-caption font-medium tabular-nums text-secondary">
                                {e.aircraft}
                              </span>
                              {e.durationDays > 1 && (
                                <span className="ml-auto shrink-0 text-caption text-tertiary">
                                  {e.durationDays}d
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
