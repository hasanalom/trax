"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Tabs — segmented, underline-style tab bar for module sub-views (Aircraft
 * detail, Airworthiness AD/SB, Compliance queues). Local state only; content
 * for each tab is provided up-front (all static). Keyboard-accessible via the
 * native button roles and an underline that tracks the active tab.
 */
export interface TabItem {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

export function Tabs({
  items,
  defaultTab,
}: {
  items: TabItem[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);
  const base = useId();

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-border-subtle"
      >
        {items.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-${t.id}`}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative -mb-px flex items-center gap-2 whitespace-nowrap px-3 py-2.5 text-label font-medium transition-standard focus-ring",
                on ? "text-primary" : "text-tertiary hover:text-secondary",
              )}
            >
              {t.label}
              {typeof t.count === "number" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-caption tabular-nums",
                    on
                      ? "bg-surface-active text-secondary"
                      : "bg-surface-sunken text-tertiary",
                  )}
                >
                  {t.count}
                </span>
              )}
              {on && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {items.map((t) => (
        <div
          key={t.id}
          id={`${base}-${t.id}`}
          role="tabpanel"
          hidden={t.id !== active}
          className="pt-5"
        >
          {t.id === active && t.content}
        </div>
      ))}
    </div>
  );
}
