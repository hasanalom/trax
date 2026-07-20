import type { ComponentType } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  AlertTriangleIcon,
  CalendarIcon,
  CheckCircleIcon,
  DocumentIcon,
  InboxIcon,
  UploadIcon,
  type IconProps,
} from "@/components/icons";
import { recentActivity, type ActivityKind } from "@/lib/demo-data";

/**
 * Recent Activity — a quiet audit feed of records-desk events.
 *
 * Each row is an icon chip + a one-line sentence + a relative timestamp. Only
 * genuine states (sign-off, overdue flag) take a status tint; routine events
 * stay neutral, keeping the feed calm and the color budget low.
 */
const config: Record<
  ActivityKind,
  { icon: ComponentType<IconProps>; chip: string }
> = {
  signoff: { icon: CheckCircleIcon, chip: "bg-success-surface text-success-text" },
  flag: { icon: AlertTriangleIcon, chip: "bg-danger-surface text-danger-text" },
  upload: { icon: UploadIcon, chip: "bg-surface-sunken text-tertiary" },
  review: { icon: DocumentIcon, chip: "bg-surface-sunken text-tertiary" },
  schedule: { icon: CalendarIcon, chip: "bg-surface-sunken text-tertiary" },
};

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader title="Recent Activity" hint="Across the fleet" />
      <CardContent>
        {recentActivity.length === 0 ? (
          <EmptyState
            icon={InboxIcon}
            title="No recent activity"
            description="Sign-offs and record changes will show up here."
            compact
          />
        ) : (
          <ul className="flex flex-col gap-1">
            {recentActivity.map((item) => {
              const { icon: Icon, chip } = config[item.kind];
              return (
                <li key={item.id} className="flex gap-3 py-1.5">
                  <span
                    className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${chip}`}
                  >
                    <Icon size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-label leading-snug text-secondary">
                      <span className="font-semibold text-primary">
                        {item.actor}
                      </span>{" "}
                      {item.action}{" "}
                      <span className="text-primary">{item.target}</span>
                    </p>
                    <p className="mt-0.5 text-caption tabular-nums text-tertiary">
                      {item.time} ago
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
