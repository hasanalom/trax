"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

/**
 * AppShell — the persistent application frame that wraps every route.
 *
 * Layout: a fixed sidebar rail on desktop (lg+) and an off-canvas drawer on
 * mobile, with a sticky topbar and a single scrolling <main>. Owns only the
 * mobile drawer's open/close state; everything else is token-driven CSS.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className="flex min-h-dvh bg-surface-base">
      {/* Skip link — first focusable element for keyboard users. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-(--z-toast) focus:rounded-md focus:bg-surface-raised focus:px-3 focus:py-2 focus:text-label focus:shadow-lg focus:outline-2 focus:outline-border-focus"
      >
        Skip to content
      </a>

      {/* Desktop sidebar — fixed rail */}
      <aside className="fixed inset-y-0 left-0 z-(--z-sidebar) hidden border-r border-border-subtle lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-(--z-overlay) lg:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!drawerOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-standard",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 border-r border-border-subtle shadow-xl transition-transform duration-200 ease-standard",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </aside>
      </div>

      {/* Content column, offset by the fixed rail on desktop. */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-(--spacing-sidebar)">
        <div className="sticky top-0 z-(--z-topbar)">
          <Topbar onOpenSidebar={() => setDrawerOpen(true)} />
        </div>
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
