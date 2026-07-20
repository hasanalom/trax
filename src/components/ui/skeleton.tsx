import { cn } from "@/lib/cn";

/**
 * Skeleton — loading placeholder.
 *
 * A single sunken block with a slow shimmer. Composed into higher-level loading
 * states (see dashboard-skeleton). The shimmer is disabled under
 * prefers-reduced-motion via the global base layer.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface-sunken",
        className,
      )}
      {...props}
    />
  );
}
