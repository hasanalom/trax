import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Tabs } from "@/components/ui/tabs";
import { FindingsTable } from "@/components/compliance/findings-table";
import { ReviewQueue } from "@/components/compliance/review-queue";
import { ComplianceHistory } from "@/components/compliance/compliance-history";
import { AlertTriangleIcon, CheckCircleIcon, ClipboardIcon, ShieldCheckIcon } from "@/components/icons";
import { reviewQueue } from "@/lib/compliance";
import { getFindings, getComplianceStats } from "@/lib/data/compliance";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "Compliance findings, review queue and audit history across the fleet.",
};

/**
 * Compliance — findings management across open, closed, review-queue and audit
 * history tabs, with summary counts above.
 */
export default async function CompliancePage() {
  const [findings, complianceStats] = await Promise.all([
    getFindings(),
    getComplianceStats(),
  ]);
  const open = findings.filter((f) => f.status === "Open");
  const closed = findings.filter((f) => f.status === "Closed");

  return (
    <div className="container-content py-6 sm:py-8">
      <PageHeader
        title="Compliance"
        description="Findings, reviews and audit history"
      />

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Open Findings" value={complianceStats.open} icon={AlertTriangleIcon} intent="attention" />
        <StatTile label="In Review" value={complianceStats.inReview} icon={ClipboardIcon} intent="neutral" />
        <StatTile label="Closed (30d)" value={complianceStats.closed30d} icon={CheckCircleIcon} intent="positive" />
        <StatTile label="Compliance Rate" value={`${complianceStats.complianceRate}%`} icon={ShieldCheckIcon} intent="positive" />
      </section>

      <section className="mt-6">
        <Tabs
          items={[
            {
              id: "open",
              label: "Open Findings",
              count: open.length,
              content: <FindingsTable data={open} emptyLabel="No open findings" />,
            },
            {
              id: "closed",
              label: "Closed Findings",
              count: closed.length,
              content: <FindingsTable data={closed} showDue={false} emptyLabel="No closed findings" />,
            },
            {
              id: "review",
              label: "Review Queue",
              count: reviewQueue.length,
              content: <ReviewQueue />,
            },
            {
              id: "history",
              label: "Compliance History",
              content: <ComplianceHistory />,
            },
          ]}
        />
      </section>
    </div>
  );
}
