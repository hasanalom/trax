import { cn } from "@/lib/cn";

/**
 * DescriptionList — aligned key/value rows for metadata panels (aircraft
 * information, record metadata, technical summary). Term left, value right,
 * hairline between rows. `mono` renders the value with tabular figures for
 * identifiers like MSN and hours.
 */
export interface DescriptionItem {
  term: string;
  value: React.ReactNode;
  mono?: boolean;
}

export function DescriptionList({ items }: { items: DescriptionItem[] }) {
  return (
    <dl className="flex flex-col">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-baseline justify-between gap-4 border-b border-border-subtle py-2.5 last:border-0"
        >
          <dt className="shrink-0 text-label text-tertiary">{it.term}</dt>
          <dd
            className={cn(
              "min-w-0 truncate text-right text-label font-medium text-primary",
              it.mono && "tabular-nums",
            )}
          >
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
