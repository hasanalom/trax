import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  type IconProps,
} from "@/components/icons";
import type { Kpi } from "@/lib/demo-data";

/**
 * KpiCard — a single headline metric.
 *
 * Deliberately monochrome: the card surface never carries color (no "colorful
 * KPI card" look). Intent shows only in the small trend indicator, so the row
 * of cards stays calm while overdue/attention states still register at a glance.
 */
const intentText: Record<Kpi["intent"], string> = {
  neutral: "text-tertiary",
  positive: "text-success-text",
  attention: "text-warning-text",
  critical: "text-danger-text",
};

export function KpiCard({
  kpi,
  icon: Icon,
}: {
  kpi: Kpi;
  icon: ComponentType<IconProps>;
}) {
  const Arrow =
    kpi.trend === "up"
      ? ArrowUpRightIcon
      : kpi.trend === "down"
        ? ArrowDownRightIcon
        : null;

  return (
    <Card className="gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-caption font-medium uppercase text-tertiary">
          {kpi.label}
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-md bg-surface-sunken text-tertiary">
          <Icon size={16} />
        </span>
      </div>

      <div className="text-heading leading-none font-semibold tabular-nums text-primary">
        {kpi.value}
      </div>

      <div className="flex items-center gap-1.5">
        {Arrow && (
          <Arrow size={14} className={intentText[kpi.intent]} aria-hidden />
        )}
        <span className={`text-footnote font-medium ${intentText[kpi.intent]}`}>
          {kpi.detail}
        </span>
      </div>
    </Card>
  );
}
