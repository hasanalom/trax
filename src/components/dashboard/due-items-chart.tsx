"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon } from "@/components/icons";
import { dueItems } from "@/lib/demo-data";

/**
 * Due Items — maintenance items bucketed by urgency, as horizontal bars.
 *
 * Magnitude comparison across a fixed set of buckets. One measure, one axis.
 * Bars share a common max so lengths are comparable; each carries a direct
 * value label (no separate axis needed) and a hover highlight. Urgency uses the
 * reserved status ramp (critical → neutral), always with its text label.
 */
export function DueItemsChart() {
  const [active, setActive] = useState<string | null>(null);

  const total = dueItems.reduce((n, d) => n + d.count, 0);
  const max = Math.max(...dueItems.map((d) => d.count), 1);

  if (total === 0) {
    return (
      <Card>
        <CardHeader title="Due Items" hint="By urgency window" />
        <CardContent>
          <EmptyState
            icon={CheckCircleIcon}
            title="Nothing due"
            description="No maintenance items fall within the tracked windows."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Due Items"
        hint="By urgency window"
        action={
          <Badge tone="danger" dot>
            7 overdue
          </Badge>
        }
      />
      <CardContent>
        <div className="flex flex-col gap-4">
          {dueItems.map((d) => {
            const pct = (d.count / max) * 100;
            const dim = active && active !== d.key;
            return (
              <div
                key={d.key}
                className="group flex flex-col gap-1.5"
                onMouseEnter={() => setActive(d.key)}
                onMouseLeave={() => setActive(null)}
                style={{ opacity: dim ? 0.55 : 1 }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-label text-secondary">{d.label}</span>
                  <span className="text-label font-semibold tabular-nums text-primary">
                    {d.count}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--viz-track)]">
                  <div
                    className="h-full rounded-full transition-standard"
                    style={{
                      width: `${Math.max(pct, 3)}%`,
                      background: `var(${d.colorVar})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-3">
          <span className="text-footnote text-tertiary">
            Total tracked · next 90 days
          </span>
          <span className="text-label font-semibold tabular-nums text-primary">
            {total}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
