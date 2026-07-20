/**
 * Formatting helpers for the static demo data. Pure functions, no locale
 * surprises — dates render as "14 Jun 2026", numbers group with thin commas.
 */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** ISO "YYYY-MM-DD" → "14 Jun 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** 12840 → "12,840". */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/** Relative day count vs the app's fixed "today" (2026-07-20). */
export const TODAY = "2026-07-20";

export function daysUntil(iso: string): number {
  const a = Date.parse(iso);
  const b = Date.parse(TODAY);
  return Math.round((a - b) / 86_400_000);
}

/** "in 12 days" / "5 days overdue" / "today". */
export function dueLabel(iso: string): string {
  const d = daysUntil(iso);
  if (d === 0) return "today";
  if (d > 0) return `in ${d} day${d === 1 ? "" : "s"}`;
  return `${-d} day${d === -1 ? "" : "s"} overdue`;
}
