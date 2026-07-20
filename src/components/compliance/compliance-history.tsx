import { Card, CardContent } from "@/components/ui/card";
import { CheckCircleIcon, DocumentIcon, AlertTriangleIcon } from "@/components/icons";
import { formatDate } from "@/lib/format";
import { history } from "@/lib/compliance";

/**
 * ComplianceHistory — a chronological audit trail of compliance actions,
 * rendered as a quiet vertical timeline.
 */
function iconFor(action: string) {
  if (action.startsWith("closed") || action.startsWith("approved"))
    return { Icon: CheckCircleIcon, chip: "bg-success-surface text-success-text" };
  if (action.startsWith("raised"))
    return { Icon: AlertTriangleIcon, chip: "bg-warning-surface text-warning-text" };
  return { Icon: DocumentIcon, chip: "bg-surface-sunken text-tertiary" };
}

export function ComplianceHistory() {
  return (
    <Card>
      <CardContent className="py-5">
        <ol className="flex flex-col">
          {history.map((h, i) => {
            const { Icon, chip } = iconFor(h.action);
            const last = i === history.length - 1;
            return (
              <li key={h.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${chip}`}>
                    <Icon size={15} />
                  </span>
                  {!last && <span className="my-1 w-px flex-1 bg-border-subtle" />}
                </div>
                <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-5"}`}>
                  <p className="text-label text-secondary">
                    <span className="font-semibold text-primary">{h.by}</span> {h.action}
                  </p>
                  <p className="mt-0.5 text-footnote text-tertiary">{h.item}</p>
                  <p className="mt-0.5 text-caption tabular-nums text-disabled">{formatDate(h.date)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
