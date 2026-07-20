"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { MoreHorizontalIcon, PlaneIcon } from "@/components/icons";
import { navSections } from "@/components/layout/nav-config";

/**
 * Sidebar — the primary navigation rail.
 *
 * Route-aware: the active destination shows a neutral fill plus a thin accent
 * indicator bar (keeping the blue budget minimal). The brand is a two-line
 * product lockup and the footer is a Fluent/M365-style account button.
 */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-(--spacing-sidebar) flex-col bg-surface-raised">
      {/* Brand lockup */}
      <div className="flex h-(--spacing-topbar) items-center gap-2.5 px-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-inverse text-inverse shadow-xs">
          <PlaneIcon size={18} />
        </span>
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span className="text-label font-semibold tracking-tight text-primary">
            TRAX
          </span>
          <span className="mt-1 text-[0.625rem] font-medium uppercase leading-none tracking-[0.16em] text-tertiary">
            Technical Records
          </span>
        </span>
      </div>

      {/* Navigation */}
      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 pb-4 pt-2">
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
                        "group relative flex items-center gap-2.5 rounded-md py-1.5 pl-3 pr-2 text-label transition-standard focus-ring",
                        active
                          ? "bg-surface-active font-medium text-primary"
                          : "text-secondary hover:bg-surface-hover hover:text-primary",
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent" />
                      )}
                      <Icon
                        size={18}
                        className={cn(
                          active
                            ? "text-primary"
                            : "text-tertiary group-hover:text-secondary",
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

      {/* Account — Fluent / M365 style */}
      <div className="border-t border-border-subtle p-2.5">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-standard focus-ring hover:bg-surface-hover"
          aria-label="Account: Hasan Alom, Technical Records"
        >
          <span className="relative shrink-0">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-sunken text-caption font-semibold text-secondary">
              HA
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--presence-online)] ring-2 ring-surface-raised" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-label font-semibold text-primary">
              Hasan Alom
            </span>
            <span className="block truncate text-caption text-tertiary">
              Technical Records
            </span>
          </span>
          <MoreHorizontalIcon
            size={16}
            className="shrink-0 text-tertiary transition-standard group-hover:text-secondary"
          />
        </button>
      </div>
    </div>
  );
}
