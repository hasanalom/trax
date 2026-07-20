"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { PlaneIcon } from "@/components/icons";
import { navSections } from "@/components/layout/nav-config";

/**
 * Sidebar — the primary navigation rail.
 *
 * Presentational and route-aware: highlights the active destination from the
 * pathname. Rendered fixed on desktop and inside an off-canvas drawer on
 * mobile (both handled by AppShell). Width is driven by the --spacing-sidebar
 * token so chrome dimensions stay consistent.
 */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-(--spacing-sidebar) flex-col bg-surface-raised">
      {/* Brand */}
      <div className="flex h-(--spacing-topbar) items-center gap-2.5 px-4">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-on-accent">
          <PlaneIcon size={18} />
        </span>
        <span className="text-label font-semibold tracking-tight text-primary">
          TRAX
        </span>
        <span className="ml-auto rounded-xs bg-surface-sunken px-1.5 py-0.5 text-caption text-tertiary">
          TECH RECORDS
        </span>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary"
        className="flex-1 overflow-y-auto px-3 pb-4 pt-2"
      >
        {navSections.map((section, i) => (
          <div key={section.title ?? `group-${i}`} className={cn(i > 0 && "mt-6")}>
            {section.title && (
              <p className="px-2 pb-1.5 text-caption font-medium uppercase text-tertiary">
                {section.title}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-label transition-standard focus-ring",
                        active
                          ? "bg-accent-surface font-medium text-accent-text"
                          : "text-secondary hover:bg-surface-hover hover:text-primary",
                      )}
                    >
                      <Icon
                        size={18}
                        className={cn(
                          active ? "text-accent-text" : "text-tertiary group-hover:text-secondary",
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Account footer */}
      <div className="border-t border-border-subtle p-3">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-standard focus-ring hover:bg-surface-hover"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-sunken text-caption font-semibold text-secondary">
            HA
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-label font-medium text-primary">
              H. Alom
            </span>
            <span className="block truncate text-footnote text-tertiary">
              Records Engineering
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
