import { cn } from "@/lib/cn";

/**
 * Badge — compact status/label pill.
 *
 * `tone` maps to the semantic status surfaces; `dot` adds a leading indicator
 * so state is never conveyed by color alone (accessibility). Used for record
 * statuses, fleet legends and count chips throughout the dashboard.
 */
type Tone = "neutral" | "success" | "warning" | "danger" | "info";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-sunken text-secondary",
  success: "bg-success-surface text-success-text",
  warning: "bg-warning-surface text-warning-text",
  danger: "bg-danger-surface text-danger-text",
  info: "bg-info-surface text-info-text",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-footnote font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
