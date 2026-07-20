import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { InboxIcon } from "@/components/icons";
import { formatDate } from "@/lib/format";
import { reviewQueue } from "@/lib/compliance";

/**
 * ReviewQueue — items awaiting reviewer sign-off. Each card shows the submitter,
 * the assigned reviewer, and (non-functional) review actions.
 */
export function ReviewQueue() {
  if (reviewQueue.length === 0) {
    return (
      <Card>
        <div className="p-5">
          <EmptyState icon={InboxIcon} title="Review queue is clear" description="Nothing is awaiting review." compact />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviewQueue.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-label font-semibold text-primary">{item.title}</p>
              <p className="mt-0.5 flex flex-wrap gap-2 text-footnote text-tertiary">
                <span className="tabular-nums">{item.id}</span>
                <span>· {item.aircraft}</span>
                <span>· submitted {formatDate(item.submittedDate)}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar name={item.reviewer} size="sm" />
                <div className="text-footnote">
                  <span className="block text-tertiary">Reviewer</span>
                  <span className="block font-medium text-secondary">{item.reviewer}</span>
                </div>
              </div>
              <Button variant="secondary" size="sm">Open Review</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
