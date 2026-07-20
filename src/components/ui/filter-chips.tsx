"use client";

import { cn } from "@/lib/cn";

/**
 * FilterChips — single-select pill group for list filters (status, priority,
 * type). Keeps filtering client-side and visible; the selected chip uses the
 * neutral active surface, not blue, to stay within the accent budget.
 */
export interface ChipOption {
  id: string;
  label: string;
  count?: number;
}

export function FilterChips({
  options,
  value,
  onChange,
  label,
}: {
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={label}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-footnote font-medium transition-standard focus-ring",
              on
                ? "border-transparent bg-surface-active text-primary"
                : "border-border-default text-secondary hover:bg-surface-hover",
            )}
          >
            {o.label}
            {typeof o.count === "number" && (
              <span className="tabular-nums text-tertiary">{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
