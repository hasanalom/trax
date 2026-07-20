"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { Table, Thead, Th, Tr, Td } from "@/components/ui/table";
import { CheckCircleIcon, ClipboardIcon } from "@/components/icons";
import { formatDate, dueLabel, daysUntil } from "@/lib/format";
import { severityTone, findingStatusTone, type Finding } from "@/lib/compliance";

/**
 * FindingsTable — a searchable list of compliance findings. Used for both the
 * Open and Closed tabs; `showDue` hides the due column for closed findings.
 */
export function FindingsTable({
  data,
  showDue = true,
  emptyLabel,
}: {
  data: Finding[];
  showDue?: boolean;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((f) =>
      [f.id, f.title, f.aircraft, f.ataChapter, f.owner, f.source]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [data, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <SearchInput value={query} onChange={setQuery} placeholder="Search findings…" className="w-full lg:w-72" />
      </div>

      <Card className="overflow-hidden py-1">
        {rows.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={showDue ? ClipboardIcon : CheckCircleIcon}
              title={emptyLabel}
              compact
            />
          </div>
        ) : (
          <Table minWidth={820}>
            <Thead>
              <Th>Finding</Th>
              <Th className="hidden md:table-cell">Aircraft</Th>
              <Th>Severity</Th>
              <Th className="hidden lg:table-cell">Owner</Th>
              {showDue && <Th align="right">Due</Th>}
              <Th>Status</Th>
            </Thead>
            <tbody>
              {rows.map((f) => {
                const dLeft = daysUntil(f.dueDate);
                return (
                  <Tr key={f.id}>
                    <Td>
                      <div className="text-label font-medium text-primary">{f.title}</div>
                      <div className="mt-0.5 flex gap-2 text-footnote text-tertiary">
                        <span className="tabular-nums">{f.id}</span>
                        <span>· {f.ataChapter}</span>
                        <span>· {f.source}</span>
                      </div>
                    </Td>
                    <Td className="hidden text-label tabular-nums text-secondary md:table-cell">
                      {f.aircraft}
                    </Td>
                    <Td>
                      <Badge tone={severityTone(f.severity)} dot>{f.severity}</Badge>
                    </Td>
                    <Td className="hidden lg:table-cell">
                      <span className="flex items-center gap-2">
                        <Avatar name={f.owner} size="sm" />
                        <span className="text-label text-secondary">{f.owner}</span>
                      </span>
                    </Td>
                    {showDue && (
                      <Td align="right">
                        <div className="text-label tabular-nums text-secondary">{formatDate(f.dueDate)}</div>
                        <div className={`text-footnote ${dLeft < 0 ? "text-danger-text" : dLeft <= 7 ? "text-warning-text" : "text-tertiary"}`}>
                          {dueLabel(f.dueDate)}
                        </div>
                      </Td>
                    )}
                    <Td>
                      <Badge tone={findingStatusTone(f.status)} dot>{f.status}</Badge>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
