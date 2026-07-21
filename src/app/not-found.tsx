import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchIcon } from "@/components/icons";

/**
 * Custom 404 — rendered inside the app shell. Reuses EmptyState and the button
 * styling so a missing route still looks designed.
 */
export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] items-center justify-center py-10">
      <EmptyState
        icon={SearchIcon}
        title="Page not found"
        description="The page you're looking for doesn't exist or may have been moved."
        action={
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border-default bg-surface-raised px-3.5 text-label font-medium text-primary shadow-xs transition-standard focus-ring hover:bg-surface-hover active:bg-surface-active"
          >
            Back to Overview
          </Link>
        }
      />
    </div>
  );
}
