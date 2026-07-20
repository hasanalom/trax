"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PlaneIcon } from "@/components/icons";
import { fleetStatus, fleetTotal } from "@/lib/demo-data";

/**
 * Fleet Status — donut of aircraft by operational state.
 *
 * Reserved status palette (good/warning/critical/neutral), always paired with a
 * labelled + numeric legend and a hover read-out, so identity is never carried
 * by color alone. Segments are separated by a small surface gap; hovering a
 * segment or a legend row cross-highlights and updates the center read-out.
 */
const SIZE = 184;
const STROKE = 18;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const GAP = 4; // circumferential surface gap between segments

export function FleetStatusChart() {
  const [active, setActive] = useState<string | null>(null);

  if (fleetTotal === 0) {
    return (
      <Card>
        <CardHeader title="Fleet Status" hint="By operational state" />
        <CardContent>
          <EmptyState icon={PlaneIcon} title="No aircraft on record" />
        </CardContent>
      </Card>
    );
  }

  // Prefix-sum the segment lengths without mutating outer state (each arc's
  // dash offset is the total length of everything before it).
  const arcs = fleetStatus.reduce<
    { key: string; label: string; colorVar: string; dash: number; gapRest: number; dashOffset: number }[]
  >((acc, s) => {
    const prior = acc.reduce((sum, _, i) => sum + (fleetStatus[i].count / fleetTotal) * C, 0);
    const len = (s.count / fleetTotal) * C;
    const dash = Math.max(len - GAP, 1);
    acc.push({ key: s.key, label: s.label, colorVar: s.colorVar, dash, gapRest: C - dash, dashOffset: -prior });
    return acc;
  }, []);

  const focus = active ? fleetStatus.find((s) => s.key === active) : null;

  return (
    <Card>
      <CardHeader title="Fleet Status" hint="By operational state" />
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          {/* Donut */}
          <div
            className="relative shrink-0"
            style={{ width: SIZE, height: SIZE }}
          >
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              role="img"
              aria-label={`Fleet of ${fleetTotal} aircraft by operational state`}
            >
              <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
                {arcs.map((a) => (
                  <circle
                    key={a.key}
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={R}
                    fill="none"
                    stroke={`var(${a.colorVar})`}
                    strokeWidth={STROKE}
                    strokeDasharray={`${a.dash} ${a.gapRest}`}
                    strokeDashoffset={a.dashOffset}
                    className="cursor-pointer transition-standard"
                    style={{
                      opacity: active && active !== a.key ? 0.28 : 1,
                    }}
                    onMouseEnter={() => setActive(a.key)}
                    onMouseLeave={() => setActive(null)}
                  />
                ))}
              </g>
            </svg>
            {/* Center read-out */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-title font-semibold tabular-nums text-primary">
                {focus ? focus.count : fleetTotal}
              </span>
              <span className="mt-0.5 max-w-24 text-center text-caption font-medium uppercase text-tertiary">
                {focus ? focus.label : "Aircraft"}
              </span>
            </div>
          </div>

          {/* Legend */}
          <ul className="flex w-full flex-col gap-1">
            {fleetStatus.map((s) => {
              const pct = Math.round((s.count / fleetTotal) * 100);
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(s.key)}
                    onMouseLeave={() => setActive(null)}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-standard focus-ring hover:bg-surface-hover"
                    style={{ opacity: active && active !== s.key ? 0.5 : 1 }}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                      style={{ background: `var(${s.colorVar})` }}
                    />
                    <span className="min-w-0 flex-1 truncate text-label text-secondary">
                      {s.label}
                    </span>
                    <span className="text-label font-semibold tabular-nums text-primary">
                      {s.count}
                    </span>
                    <span className="w-9 text-right text-footnote tabular-nums text-tertiary">
                      {pct}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
