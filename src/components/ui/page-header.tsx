import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

/**
 * PageHeader — the standard title block for module pages.
 *
 * Mirrors the dashboard header's rhythm (title / description on the left,
 * controls on the right) and adds an optional breadcrumb and inline status
 * slot for detail pages. Reused by every Phase 2 module so page tops are
 * identical.
 */
export interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  status,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  status?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-footnote text-tertiary">
            {breadcrumb.map((c, i) => (
              <li key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link
                    href={c.href}
                    className="rounded-xs transition-standard focus-ring hover:text-secondary"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-secondary">{c.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <ChevronRightIcon size={13} className="text-disabled" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-title text-primary">{title}</h1>
            {status}
          </div>
          {description && (
            <p className="mt-1 text-body text-secondary">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
