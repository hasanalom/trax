import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UploadIcon } from "@/components/icons";

/**
 * DashboardHeader — page title, context and the global controls that sit above
 * the content (a period selector and export). The period control also serves as
 * the charts' shared filter row.
 */
export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-title text-primary">Overview</h1>
        <p className="mt-1 flex items-center gap-2 text-body text-secondary">
          Fleet-wide technical records status
          <span className="hidden items-center gap-1.5 text-footnote text-tertiary sm:inline-flex">
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--presence-online)]" />
            Synced 2 min ago
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="md">
          Last 30 days
          <ChevronDownIcon size={15} className="text-tertiary" />
        </Button>
        <Button variant="secondary" size="md">
          <UploadIcon size={15} />
          Export
        </Button>
      </div>
    </div>
  );
}
