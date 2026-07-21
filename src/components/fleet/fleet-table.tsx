"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChips } from "@/components/ui/filter-chips";
import { Table, Thead, Th, Tr, Td, RowLink } from "@/components/ui/table";
import { LayersIcon } from "@/components/icons";
import { formatNumber } from "@/lib/format";
import { fleetStatusTone, type Aircraft, type FleetStatus } from "@/lib/fleet";

interface FleetStats {
  total: number;
  inService: number;
  inMaintenance: number;
  aog: number;
  stored: number;
}

/**
 * FleetTable — searchable, status-filterable fleet register. Filtering is fully
 * client-side over the fleet data passed in from the server page. Rows deep-link
 * to aircraft detail.
 */
export function FleetTable({
  aircraft,
  stats,
}: {
  aircraft: Aircraft[];
  stats: FleetStats;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const STATUS_FILTERS: { id: string; label: string; count?: number }[] = [
    { id: "all", label: "All", count: stats.total },
    { id: "In Service", label: "In Service", count: stats.inService },
    { id: "In Maintenance", label: "In Maintenance", count: stats.inMaintenance },
    { id: "AOG", label: "AOG", count: stats.aog },
    { id: "Stored", label: "Stored", count: stats.stored },
  ];

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return aircraft.filter((a) => {
      if (status !== "all" && a.status !== (status as FleetStatus)) return false;
      if (!q) return true;
      return [a.registration, a.type, a.msn, a.base.code, a.base.city, a.engineer.name]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [aircraft, query, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips
          options={STATUS_FILTERS}
          value={status}
          onChange={setStatus}
          label="Filter by status"
        />
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search tail, type, MSN, base…"
          className="lg:w-72"
        />
      </div>

      <Card className="overflow-hidden py-1">
        {rows.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={LayersIcon}
              title="No aircraft match"
              description="Adjust the search or status filter to see results."
              compact
            />
          </div>
        ) : (
          <Table minWidth={760}>
            <Thead>
              <Th>Registration</Th>
              <Th className="hidden md:table-cell">Type</Th>
              <Th className="hidden lg:table-cell">MSN</Th>
              <Th className="hidden xl:table-cell">Base</Th>
              <Th align="right">Flight Hours</Th>
              <Th align="right" className="hidden sm:table-cell">Cycles</Th>
              <Th>Status</Th>
            </Thead>
            <tbody>
              {rows.map((a) => (
                <Tr key={a.id} interactive>
                  <Td>
                    <RowLink href={`/aircraft/${a.id}`}>{a.registration}</RowLink>
                    <div className="mt-0.5 text-footnote text-tertiary md:hidden">
                      {a.type}
                    </div>
                  </Td>
                  <Td className="hidden text-label text-secondary md:table-cell">
                    {a.type}
                  </Td>
                  <Td className="hidden text-label tabular-nums text-secondary lg:table-cell">
                    {a.msn}
                  </Td>
                  <Td className="hidden text-label text-secondary xl:table-cell">
                    {a.base.code} · {a.base.city}
                  </Td>
                  <Td align="right" className="text-label tabular-nums text-secondary">
                    {formatNumber(a.flightHours)}
                  </Td>
                  <Td align="right" className="hidden text-label tabular-nums text-secondary sm:table-cell">
                    {formatNumber(a.flightCycles)}
                  </Td>
                  <Td>
                    <Badge tone={fleetStatusTone(a.status)} dot>
                      {a.status}
                    </Badge>
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
