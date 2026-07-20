import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { DescriptionList } from "@/components/ui/description-list";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, Thead, Th, Tr, Td, RowLink } from "@/components/ui/table";
import { DocumentIcon, DownloadIcon } from "@/components/icons";
import { formatDate, formatNumber, daysUntil, dueLabel } from "@/lib/format";
import {
  aircraft,
  getAircraft,
  fleetStatusTone,
  airworthinessTone,
} from "@/lib/fleet";
import { recordsForAircraft, docStatusTone } from "@/lib/records";

export function generateStaticParams() {
  return aircraft.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const a = getAircraft(id);
  return { title: a ? `${a.registration} · ${a.type}` : "Aircraft" };
}

export default async function AircraftDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const a = getAircraft(id);
  if (!a) notFound();

  const records = recordsForAircraft(a.id);
  const avgFhPerCycle = (a.flightHours / a.flightCycles).toFixed(2);

  // Progress through the current check interval (last → next check).
  const interval = daysUntil(a.nextCheck.date) - daysUntil(a.lastCheck.date);
  const elapsed = -daysUntil(a.lastCheck.date);
  const dLeft = daysUntil(a.nextCheck.date);
  const checkTone = dLeft < 0 ? "critical" : dLeft <= 7 ? "warning" : "accent";

  return (
    <div className="container-content py-6 sm:py-8">
      <PageHeader
        breadcrumb={[{ label: "Aircraft", href: "/aircraft" }, { label: a.registration }]}
        title={a.registration}
        description={`${a.manufacturer} ${a.model} · ${a.type}`}
        status={
          <>
            <Badge tone={fleetStatusTone(a.status)} dot>{a.status}</Badge>
            <Badge tone={airworthinessTone(a.airworthiness)}>{a.airworthiness}</Badge>
          </>
        }
        actions={
          <Button variant="secondary">
            <DownloadIcon size={15} />
            Technical Log
          </Button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-4 xl:col-span-2">
          {/* Technical summary — hours & cycles */}
          <Card>
            <CardHeader title="Technical Summary" hint="Hours, cycles & next check" />
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                <Metric label="Flight Hours" value={formatNumber(a.flightHours)} unit="FH" />
                <Metric label="Flight Cycles" value={formatNumber(a.flightCycles)} unit="FC" />
                <Metric label="Avg FH / Cycle" value={avgFhPerCycle} />
                <Metric
                  label="Next Check"
                  value={dueLabel(a.nextCheck.date)}
                  tone={dLeft < 0 ? "critical" : dLeft <= 7 ? "attention" : "neutral"}
                />
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between text-footnote">
                  <span className="text-tertiary">
                    {a.lastCheck.type} · {formatDate(a.lastCheck.date)}
                  </span>
                  <span className="text-tertiary">
                    {a.nextCheck.type} · {formatDate(a.nextCheck.date)}
                  </span>
                </div>
                <Progress
                  value={Math.max(elapsed, 0)}
                  max={Math.max(interval, 1)}
                  tone={checkTone}
                />
              </div>
            </CardContent>
          </Card>

          {/* Maintenance */}
          <Card>
            <CardHeader title="Maintenance" hint="Last & upcoming events" />
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <MaintenanceBlock
                  heading="Last Maintenance"
                  type={a.lastCheck.type}
                  date={formatDate(a.lastCheck.date)}
                  relative={`${-daysUntil(a.lastCheck.date)} days ago`}
                  status={<Badge tone="success" dot>Completed</Badge>}
                />
                <MaintenanceBlock
                  heading="Upcoming Maintenance"
                  type={a.nextCheck.type}
                  date={formatDate(a.nextCheck.date)}
                  relative={dueLabel(a.nextCheck.date)}
                  status={
                    <Badge tone={dLeft < 0 ? "danger" : "neutral"} dot>
                      {dLeft < 0 ? "Overdue" : "Scheduled"}
                    </Badge>
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent technical records */}
          <Card className="overflow-hidden py-1">
            <CardHeader title="Recent Technical Records" hint="Records for this aircraft" />
            {records.length === 0 ? (
              <div className="p-5 pt-0">
                <EmptyState
                  icon={DocumentIcon}
                  title="No records for this aircraft"
                  description="Approved directives, inspections and releases will appear here."
                  compact
                />
              </div>
            ) : (
              <Table minWidth={520}>
                <Thead>
                  <Th>Record</Th>
                  <Th className="hidden sm:table-cell">Category</Th>
                  <Th>Status</Th>
                  <Th align="right" className="hidden md:table-cell">Updated</Th>
                </Thead>
                <tbody>
                  {records.map((r) => (
                    <Tr key={r.id} interactive>
                      <Td>
                        <RowLink href={`/records/${r.id}`}>{r.title}</RowLink>
                        <div className="mt-0.5 text-footnote text-tertiary">{r.reference}</div>
                      </Td>
                      <Td className="hidden text-label text-secondary sm:table-cell">
                        {r.category}
                      </Td>
                      <Td>
                        <Badge tone={docStatusTone(r.status)} dot>{r.status}</Badge>
                      </Td>
                      <Td align="right" className="hidden text-footnote text-tertiary md:table-cell">
                        {r.updated}
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Current Status" />
            <CardContent>
              <DescriptionList
                items={[
                  { term: "Status", value: <Badge tone={fleetStatusTone(a.status)} dot>{a.status}</Badge> },
                  { term: "Airworthiness", value: <Badge tone={airworthinessTone(a.airworthiness)}>{a.airworthiness}</Badge> },
                  { term: "Base", value: `${a.base.code} · ${a.base.city}` },
                  { term: "Next Check", value: `${a.nextCheck.type} · ${formatDate(a.nextCheck.date)}`, mono: true },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Aircraft Information" />
            <CardContent>
              <DescriptionList
                items={[
                  { term: "Registration", value: a.registration, mono: true },
                  { term: "Type", value: a.type },
                  { term: "Manufacturer", value: a.manufacturer },
                  { term: "Model", value: a.model },
                  { term: "MSN", value: a.msn, mono: true },
                  { term: "Engine", value: a.engine },
                  { term: "Seats", value: a.seats, mono: true },
                  { term: "Year Built", value: a.yearBuilt, mono: true },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Assigned Engineer" />
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar name={a.engineer.name} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-label font-semibold text-primary">
                    {a.engineer.name}
                  </p>
                  <p className="truncate text-footnote text-tertiary">
                    {a.engineer.title}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <DescriptionList
                  items={[{ term: "License", value: a.engineer.license }]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---- local presentational bits ---- */

function Metric({
  label,
  value,
  unit,
  tone = "neutral",
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "neutral" | "attention" | "critical";
}) {
  const color =
    tone === "critical" ? "text-danger-text" : tone === "attention" ? "text-warning-text" : "text-primary";
  return (
    <div>
      <p className="text-caption font-medium uppercase text-tertiary">{label}</p>
      <p className={`mt-1 text-subtitle font-semibold tabular-nums ${color}`}>
        {value}
        {unit && <span className="ml-1 text-label font-normal text-tertiary">{unit}</span>}
      </p>
    </div>
  );
}

function MaintenanceBlock({
  heading,
  type,
  date,
  relative,
  status,
}: {
  heading: string;
  type: string;
  date: string;
  relative: string;
  status: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface-sunken/40 p-4">
      <p className="text-caption font-medium uppercase text-tertiary">{heading}</p>
      <p className="mt-2 text-label font-semibold text-primary">{type}</p>
      <p className="mt-0.5 text-footnote tabular-nums text-secondary">{date}</p>
      <div className="mt-3 flex items-center justify-between">
        {status}
        <span className="text-footnote text-tertiary">{relative}</span>
      </div>
    </div>
  );
}
