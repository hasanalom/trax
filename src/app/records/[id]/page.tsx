import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { DescriptionList } from "@/components/ui/description-list";
import {
  CheckCircleIcon,
  ClockIcon,
  DownloadIcon,
  PaperclipIcon,
} from "@/components/icons";
import { formatDate } from "@/lib/format";
import { docStatusTone, signoffTone } from "@/lib/records";
import {
  getTechnicalRecord,
  getTechnicalRecordIds,
} from "@/lib/data/records";
import { getAircraftById } from "@/lib/data/fleet";

export async function generateStaticParams() {
  return (await getTechnicalRecordIds()).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const r = await getTechnicalRecord(id);
  if (!r) return { title: "Record" };
  return {
    title: r.title,
    description: `${r.reference} — ${r.category} for ${r.aircraft} (${r.ataChapter}), status ${r.status}.`,
  };
}

export default async function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = await getTechnicalRecord(id);
  if (!r) notFound();

  const ac = r.aircraftId ? await getAircraftById(r.aircraftId) : undefined;

  return (
    <div className="container-content py-6 sm:py-8">
      <PageHeader
        breadcrumb={[{ label: "Overview", href: "/" }, { label: r.reference }]}
        title={r.title}
        description={`${r.reference} · ${r.category}`}
        status={
          <>
            <Badge tone={docStatusTone(r.status)} dot>{r.status}</Badge>
            <Badge tone="neutral">{r.revision}</Badge>
          </>
        }
        actions={
          <>
            <Button variant="secondary">
              <DownloadIcon size={15} />
              Download
            </Button>
            <Button variant="secondary" iconOnly aria-label="Print record">
              <PaperclipIcon size={16} />
            </Button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Main */}
        <div className="flex flex-col gap-4 xl:col-span-2">
          <Card>
            <CardHeader title="Summary" hint={r.ataChapter} />
            <CardContent>
              <div className="flex flex-col gap-3 text-body text-secondary">
                {r.notes.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Attachments" hint={`${r.attachments.length} files`} />
            <CardContent>
              <ul className="flex flex-col gap-2">
                {r.attachments.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-sunken/40 px-3 py-2.5"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-surface-sunken text-tertiary">
                      <PaperclipIcon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-label font-medium text-primary">{f.name}</p>
                      <p className="text-footnote text-tertiary">{f.kind} · {f.size}</p>
                    </div>
                    <Button variant="ghost" size="sm" iconOnly aria-label={`Download ${f.name}`}>
                      <DownloadIcon size={15} />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Change History" hint="Revisions" />
            <CardContent className="py-4">
              <ol className="flex flex-col">
                {r.history.map((h, i) => {
                  const last = i === r.history.length - 1;
                  return (
                    <li key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-sunken text-caption font-semibold text-secondary">
                          {h.revision.replace("Rev ", "")}
                        </span>
                        {!last && <span className="my-1 w-px flex-1 bg-border-subtle" />}
                      </div>
                      <div className={`min-w-0 flex-1 ${last ? "" : "pb-5"}`}>
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-label font-semibold text-primary">{h.revision}</p>
                          <p className="text-caption tabular-nums text-tertiary">{formatDate(h.date)}</p>
                        </div>
                        <p className="mt-0.5 text-footnote text-secondary">{h.summary}</p>
                        <p className="mt-0.5 text-caption text-tertiary">by {h.author}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Rail */}
        <div className="flex flex-col gap-4">
          {/* Sign-off */}
          <Card>
            <CardHeader title="Sign-off" />
            <CardContent>
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                    r.signoff.status === "Signed"
                      ? "bg-success-surface text-success-text"
                      : r.signoff.status === "Pending"
                        ? "bg-warning-surface text-warning-text"
                        : "bg-surface-sunken text-tertiary"
                  }`}
                >
                  {r.signoff.status === "Signed" ? <CheckCircleIcon size={20} /> : <ClockIcon size={20} />}
                </span>
                <div className="min-w-0">
                  <Badge tone={signoffTone(r.signoff.status)} dot>{r.signoff.status}</Badge>
                  <p className="mt-1 text-footnote text-tertiary">
                    {r.signoff.status === "Signed" && r.signoff.by
                      ? `by ${r.signoff.by} · ${formatDate(r.signoff.date!)}`
                      : r.signoff.status === "Pending"
                        ? r.signoff.by
                          ? `Awaiting ${r.signoff.by}`
                          : "Awaiting reviewer"
                        : "No sign-off required"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Record details */}
          <Card>
            <CardHeader title="Record Details" />
            <CardContent>
              <DescriptionList
                items={[
                  { term: "Reference", value: r.reference, mono: true },
                  { term: "Category", value: r.category },
                  { term: "ATA Chapter", value: r.ataChapter },
                  {
                    term: "Aircraft",
                    value: ac ? (
                      <Link href={`/aircraft/${ac.id}`} className="text-accent-text transition-standard focus-ring hover:underline">
                        {r.aircraft}
                      </Link>
                    ) : (
                      r.aircraft
                    ),
                  },
                  { term: "Revision", value: r.revision, mono: true },
                  { term: "Updated", value: formatDate(r.updatedDate), mono: true },
                ]}
              />
            </CardContent>
          </Card>

          {/* People */}
          <Card>
            <CardHeader title="People" />
            <CardContent>
              <div className="flex flex-col gap-4">
                <Person role="Author" name={r.author} />
                <Person role="Reviewer" name={r.reviewer} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Person({ role, name }: { role: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={name} size="md" />
      <div className="min-w-0">
        <p className="text-caption font-medium uppercase text-tertiary">{role}</p>
        <p className="truncate text-label font-medium text-primary">{name}</p>
      </div>
    </div>
  );
}
