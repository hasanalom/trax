import { cn } from "@/lib/cn";

/**
 * Avatar — initials chip for engineers, authors and reviewers. Neutral by
 * default to keep the color budget low; matches the sidebar account avatar.
 */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

const sizes = {
  sm: "h-6 w-6 text-caption",
  md: "h-8 w-8 text-caption",
  lg: "h-10 w-10 text-label",
};

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-surface-sunken font-semibold text-secondary",
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
