import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import type { IconProps } from "@/components/icons";

/**
 * StatTile — a compact, generic metric tile for module summary rows (fleet
 * counts, open findings, etc.). Lighter than the dashboard KpiCard and reused
 * across modules. Monochrome surface; intent shows only on the value text.
 */
const intentText = {
  neutral: "text-primary",
  positive: "text-success-text",
  attention: "text-warning-text",
  critical: "text-danger-text",
};

export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  intent = "neutral",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ComponentType<IconProps>;
  intent?: keyof typeof intentText;
}) {
  return (
    <Card className="gap-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-caption font-medium uppercase text-tertiary">
          {label}
        </span>
        {Icon && (
          <span className="grid h-6 w-6 place-items-center rounded-md bg-surface-sunken text-tertiary">
            <Icon size={14} />
          </span>
        )}
      </div>
      <div
        className={`text-subtitle font-semibold tabular-nums ${intentText[intent]}`}
      >
        {value}
      </div>
      {hint && <div className="text-footnote text-tertiary">{hint}</div>}
    </Card>
  );
}
