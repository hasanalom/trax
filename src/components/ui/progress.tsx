/**
 * Progress — thin token-driven bar, matching the Due Items chart bars. Used for
 * "hours since last check" and compliance rates. Tone maps to the viz ramp so a
 * near-due bar reads as attention without adding new colors.
 */
const tones = {
  neutral: "var(--viz-neutral)",
  accent: "var(--accent-solid)",
  good: "var(--viz-good)",
  warning: "var(--viz-warning)",
  critical: "var(--viz-critical)",
};

export function Progress({
  value,
  max,
  tone = "neutral",
}: {
  value: number;
  max: number;
  tone?: keyof typeof tones;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-[var(--viz-track)]"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-standard"
        style={{ width: `${Math.max(pct, 2)}%`, background: tones[tone] }}
      />
    </div>
  );
}
