"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChips } from "@/components/ui/filter-chips";
import { Table, Thead, Th, Tr, Td, RowLink } from "@/components/ui/table";
import { DocumentIcon } from "@/components/icons";
import { formatDate } from "@/lib/format";
import { bulletins, sbStatusTone, sbCategoryTone } from "@/lib/airworthiness";

/**
 * SBTable — Service Bulletins with search + category filter. Mirrors the AD
 * table; linked bulletins deep-link to their evaluation record.
 */
const CATEGORY_FILTERS = [
  { id: "all", label: "All" },
  { id: "Mandatory", label: "Mandatory" },
  { id: "Recommended", label: "Recommended" },
  { id: "Optional", label: "Optional" },
];

export function SBTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bulletins.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (!q) return true;
      return [b.ref, b.subject, b.applicability, b.ataChapter]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, category]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips options={CATEGORY_FILTERS} value={category} onChange={setCategory} label="Filter by category" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search SB, subject, ATA…" className="lg:w-72" />
      </div>

      <Card className="overflow-hidden py-1">
        {rows.length === 0 ? (
          <div className="p-5">
            <EmptyState icon={DocumentIcon} title="No bulletins match" compact />
          </div>
        ) : (
          <Table minWidth={780}>
            <Thead>
              <Th>Reference</Th>
              <Th>Subject</Th>
              <Th className="hidden lg:table-cell">Applicability</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th align="right">Issued</Th>
            </Thead>
            <tbody>
              {rows.map((b) => (
                <Tr key={b.ref} interactive={!!b.recordId}>
                  <Td>
                    {b.recordId ? (
                      <RowLink href={`/records/${b.recordId}`} className="tabular-nums">{b.ref}</RowLink>
                    ) : (
                      <span className="text-label font-medium tabular-nums text-primary">{b.ref}</span>
                    )}
                    <div className="mt-0.5 text-footnote text-tertiary">{b.ataChapter}</div>
                  </Td>
                  <Td className="text-label text-secondary">{b.subject}</Td>
                  <Td className="hidden text-label text-secondary lg:table-cell">{b.applicability}</Td>
                  <Td>
                    <Badge tone={sbCategoryTone(b.category)}>{b.category}</Badge>
                  </Td>
                  <Td>
                    <Badge tone={sbStatusTone(b.status)} dot>{b.status}</Badge>
                  </Td>
                  <Td align="right" className="text-label tabular-nums text-secondary">
                    {formatDate(b.issueDate)}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
