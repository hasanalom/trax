"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BellIcon, PanelLeftIcon, SearchIcon } from "@/components/icons";

/**
 * Topbar — global chrome above the content area: a search affordance, page
 * actions, notifications and the theme toggle. Holds no page-specific content;
 * routes render their own titles inside <main>. Height is the --spacing-topbar
 * token so it aligns with the sidebar brand row.
 */
export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="flex h-(--spacing-topbar) items-center gap-3 border-b border-border-subtle bg-surface-raised/80 px-4 backdrop-blur-sm">
      {/* Mobile sidebar trigger */}
      <Button
        variant="ghost"
        size="md"
        iconOnly
        className="lg:hidden"
        onClick={onOpenSidebar}
        aria-label="Open navigation"
      >
        <PanelLeftIcon />
      </Button>

      {/* Search — command-bar affordance (non-functional in Phase 0) */}
      <button
        type="button"
        className="flex h-9 w-full max-w-xs items-center gap-2 rounded-md border border-border-default bg-surface-sunken px-3 text-tertiary transition-standard focus-ring hover:border-border-strong"
      >
        <SearchIcon size={16} />
        <span className="text-label">Search records…</span>
        <kbd className="ml-auto hidden rounded-xs border border-border-default bg-surface-raised px-1.5 py-0.5 text-caption text-tertiary sm:inline-block">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="md" iconOnly aria-label="Notifications">
          <BellIcon />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
