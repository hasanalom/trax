import type { ComponentType } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CalendarIcon,
  ChartBarIcon,
  FileCheckIcon,
  PlusIcon,
  type IconProps,
} from "@/components/icons";

/**
 * Quick Actions — the records-desk shortcuts.
 *
 * A 2×2 grid of neutral tiles (UI affordances only in this phase). One accent
 * lives here — the primary "New Log Entry" tile — to keep the blue budget tight
 * while still giving the page a single, clear primary action.
 */
interface Action {
  label: string;
  hint: string;
  icon: ComponentType<IconProps>;
  primary?: boolean;
}

const actions: Action[] = [
  { label: "New Log Entry", hint: "Record a task", icon: PlusIcon, primary: true },
  { label: "Log AD Compliance", hint: "Close out an AD", icon: FileCheckIcon },
  { label: "Schedule Task", hint: "Plan maintenance", icon: CalendarIcon },
  { label: "Generate Report", hint: "Export records", icon: ChartBarIcon },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader title="Quick Actions" />
      <CardContent>
        <div className="grid grid-cols-2 gap-2.5">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                type="button"
                className={`group flex flex-col items-start gap-2.5 rounded-lg border p-3 text-left transition-standard focus-ring ${
                  a.primary
                    ? "border-transparent bg-accent text-on-accent hover:bg-accent-hover"
                    : "border-border-default bg-surface-raised hover:border-border-strong hover:bg-surface-hover"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-md ${
                    a.primary
                      ? "bg-white/15 text-on-accent"
                      : "bg-surface-sunken text-secondary"
                  }`}
                >
                  <Icon size={17} />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate text-label font-medium ${
                      a.primary ? "text-on-accent" : "text-primary"
                    }`}
                  >
                    {a.label}
                  </span>
                  <span
                    className={`block truncate text-caption ${
                      a.primary ? "text-on-accent/80" : "text-tertiary"
                    }`}
                  >
                    {a.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
