"use client";

import { useEffect } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, RefreshIcon } from "@/components/icons";

/**
 * Route error boundary — a graceful, on-brand fallback with a retry. Keeps the
 * app usable if a server component throws (e.g. the database is unavailable).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for diagnostics without crashing the UI.
    console.error(error);
  }, [error]);

  return (
    <div className="container-content flex min-h-[60vh] items-center justify-center py-10">
      <EmptyState
        icon={AlertTriangleIcon}
        title="Something went wrong"
        description="An unexpected error occurred while loading this page. You can try again."
        action={
          <Button variant="secondary" onClick={reset}>
            <RefreshIcon size={15} />
            Try again
          </Button>
        }
      />
    </div>
  );
}
