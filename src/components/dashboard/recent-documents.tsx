import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowRightIcon, DocumentIcon } from "@/components/icons";
import { recentDocuments, type DocStatus } from "@/lib/demo-data";

/**
 * Recent Documents — the most recently touched technical records.
 *
 * A dense, aligned records table (the airline-desk staple). Secondary columns
 * fold away below md; tail numbers and timestamps use tabular figures so they
 * line up. Status is a labelled Badge, never color alone.
 */
const statusTone: Record<DocStatus, "success" | "info" | "warning" | "neutral"> = {
  Approved: "success",
  "In Review": "info",
  Draft: "warning",
  Superseded: "neutral",
};

export function RecentDocuments() {
  return (
    <Card>
      <CardHeader
        title="Recent Documents"
        hint="Latest technical records activity"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-footnote font-medium text-secondary transition-standard focus-ring hover:text-primary"
          >
            View all
            <ArrowRightIcon size={14} />
          </button>
        }
      />
      <CardContent padded={false} className="pb-1">
        {recentDocuments.length === 0 ? (
          <div className="px-5 pb-5">
            <EmptyState
              icon={DocumentIcon}
              title="No documents yet"
              description="Approved records and inspections will appear here."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border-subtle text-caption uppercase text-tertiary">
                  <th className="px-5 py-2.5 font-medium">Document</th>
                  <th className="px-5 py-2.5 font-medium">Aircraft</th>
                  <th className="hidden px-5 py-2.5 font-medium lg:table-cell">
                    Category
                  </th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="hidden px-5 py-2.5 font-medium md:table-cell">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-border-subtle transition-standard last:border-0 hover:bg-surface-hover"
                  >
                    <td className="px-5 py-3">
                      <div className="text-label font-medium text-primary">
                        {doc.title}
                      </div>
                      <div className="mt-0.5 text-footnote text-tertiary">
                        {doc.reference}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-label tabular-nums text-secondary">
                      {doc.aircraft}
                    </td>
                    <td className="hidden px-5 py-3 text-label text-secondary lg:table-cell">
                      {doc.category}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone[doc.status]} dot>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="hidden px-5 py-3 text-footnote tabular-nums text-tertiary md:table-cell">
                      {doc.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
