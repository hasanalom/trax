"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChips } from "@/components/ui/filter-chips";
import { Table, Thead, Th, Tr, Td, RowLink } from "@/components/ui/table";
import { ShieldCheckIcon } from "@/components/icons";
import { formatDate, dueLabel, daysUntil } from "@/lib/format";
import { priorityTone } from "@/lib/badges";
import { directives, adStatusTone, type ADStatus } from "@/lib/airworthiness";

/**
 * ADTable — Airworthiness Directives with search + priority filter. Rows with a
 * linked compliance record deep-link to it; due dates show overdue/at-risk
 * state via the shared due-label tones.
 */
const PRIORITY_FILTERS = [
  { id: "all", label: "All" },
  { id: "Critical", label: "Critical" },
  { id: "High", label: "High" },
  { id: "Medium", label: "Medium" },
  { id: "Low", label: "Low" },
];

const openStates: ADStatus[] = ["Open", "In Progress"];

export function ADTable() {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return directives.filter((d) => {
      if (priority !== "all" && d.priority !== priority) return false;
      if (!q) return true;
      return [d.ref, d.subject, d.applicability, d.ataChapter]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, priority]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips options={PRIORITY_FILTERS} value={priority} onChange={setPriority} label="Filter by priority" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search AD, subject, ATA…" className="lg:w-72" />
      </div>

      <Card className="overflow-hidden py-1">
        {rows.length === 0 ? (
          <div className="p-5">
            <EmptyState icon={ShieldCheckIcon} title="No directives match" compact />
          </div>
        ) : (
          <Table minWidth={820}>
            <Thead>
              <Th>Reference</Th>
              <Th>Subject</Th>
              <Th className="hidden lg:table-cell">Applicability</Th>
              <Th>Priority</Th>
              <Th>Compliance</Th>
              <Th align="right">Due</Th>
            </Thead>
            <tbody>
              {rows.map((d) => {
                const open = openStates.includes(d.status);
                const dLeft = daysUntil(d.dueDate);
                return (
                  <Tr key={d.ref} interactive={!!d.recordId}>
                    <Td>
                      {d.recordId ? (
                        <RowLink href={`/records/${d.recordId}`} className="tabular-nums">
                          {d.ref}
                        </RowLink>
                      ) : (
                        <span className="text-label font-medium tabular-nums text-primary">{d.ref}</span>
                      )}
                      <div className="mt-0.5 text-footnote text-tertiary">{d.ataChapter}</div>
                    </Td>
                    <Td className="text-label text-secondary">{d.subject}</Td>
                    <Td className="hidden text-label text-secondary lg:table-cell">{d.applicability}</Td>
                    <Td>
                      <Badge tone={priorityTone(d.priority)} dot>{d.priority}</Badge>
                    </Td>
                    <Td>
                      <Badge tone={adStatusTone(d.status)} dot>{d.status}</Badge>
                    </Td>
                    <Td align="right">
                      <div className="text-label tabular-nums text-secondary">{formatDate(d.dueDate)}</div>
                      {open && (
                        <div
                          className={`text-footnote ${
                            dLeft < 0 ? "text-danger-text" : dLeft <= 7 ? "text-warning-text" : "text-tertiary"
                          }`}
                        >
                          {dueLabel(d.dueDate)}
                        </div>
                      )}
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
