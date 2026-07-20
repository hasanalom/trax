/**
 * Shared Badge tone type + generic status/priority mappers, so every module
 * colours the same state the same way. Keep in sync with <Badge> tones.
 */
export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

export type Priority = "Critical" | "High" | "Medium" | "Low";

export function priorityTone(p: Priority): BadgeTone {
  switch (p) {
    case "Critical": return "danger";
    case "High": return "warning";
    case "Medium": return "info";
    case "Low": return "neutral";
  }
}
