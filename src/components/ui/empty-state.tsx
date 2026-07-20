import type { ComponentType } from "react";
import type { IconProps } from "@/components/icons";

/**
 * EmptyState — the calm, no-data fallback for any data-bearing panel.
 *
 * Every list/table/chart on the dashboard renders this when its dataset is
 * empty, so an unpopulated panel still looks designed rather than broken. Kept
 * quiet: a muted glyph, a short title, one line of guidance, an optional action.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon: ComponentType<IconProps>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "gap-2 py-8" : "gap-3 py-14"
      }`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-sunken text-tertiary">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-label font-medium text-secondary">{title}</p>
        {description && (
          <p className="mx-auto mt-1 max-w-xs text-footnote text-tertiary">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
