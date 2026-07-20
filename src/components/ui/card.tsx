import { cn } from "@/lib/cn";

/**
 * Card — the standard raised surface for dashboard panels.
 *
 * One radius (xl), one border (subtle), one resting elevation (xs). Every panel
 * on the dashboard is a Card so spacing and edges stay identical across the
 * page. Compose with CardHeader / CardContent; `padded={false}` opts a panel
 * out of body padding (used by tables that manage their own row insets).
 */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border-subtle bg-surface-raised shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  hint,
  action,
  className,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-5 pt-4 pb-3",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-label font-semibold text-primary">{title}</h3>
        {hint && <p className="mt-0.5 text-footnote text-tertiary">{hint}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({
  className,
  padded = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { padded?: boolean }) {
  return (
    <div className={cn(padded && "px-5 pb-5", "min-w-0", className)} {...props} />
  );
}
