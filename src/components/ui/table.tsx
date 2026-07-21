import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Table primitives — one styling for every records table in the app.
 *
 * Wraps a horizontally-scrollable, dense table matching the dashboard's Recent
 * Documents table (same header caption, row borders, hover, insets). Rows can
 * be made navigable with <RowLink> using the stretched-link pattern so the
 * whole row is a single accessible target.
 */
export function Table({
  minWidth = 640,
  children,
}: {
  minWidth?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse text-left"
        style={{ minWidth }}
      >
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-border-subtle text-caption uppercase text-tertiary">
        {children}
      </tr>
    </thead>
  );
}

export function Th({
  children,
  className,
  align = "left",
}: {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <th
      scope="col"
      className={cn(
        "px-5 py-2.5 font-medium",
        align === "right" && "text-right",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Tr({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <tr
      className={cn(
        "border-b border-border-subtle transition-standard last:border-0",
        interactive && "relative hover:bg-surface-hover",
        className,
      )}
    >
      {children}
    </tr>
  );
}

export function Td({
  children,
  className,
  align = "left",
}: {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <td
      className={cn(
        "px-5 py-3 align-middle",
        align === "right" && "text-right",
        className,
      )}
    >
      {children}
    </td>
  );
}

/**
 * A row-spanning link (stretched-link). Place inside the first <Td> of an
 * `interactive` <Tr>; its ::after covers the whole row.
 */
export function RowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-medium text-primary transition-standard focus-ring after:absolute after:inset-0 after:content-['']",
        className,
      )}
    >
      {children}
    </Link>
  );
}
