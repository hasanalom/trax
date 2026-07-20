/**
 * cn — minimal className composer.
 *
 * Joins truthy class values into a single string. Deliberately dependency-free:
 * the design system leans on semantic tokens rather than ad-hoc utility
 * overrides, so a full class-merging pass (tailwind-merge) is not needed yet.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
