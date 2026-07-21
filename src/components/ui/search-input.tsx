"use client";

import { SearchIcon } from "@/components/icons";

/**
 * SearchInput — controlled search field matching the topbar search affordance.
 * Client-side filtering only (no fetch); each module owns its filter state.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  label,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** Accessible label; defaults to the placeholder text. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-9 items-center gap-2 rounded-md border border-border-default bg-surface-raised px-3 text-secondary transition-standard focus-within:border-border-focus focus-within:ring-2 focus-within:ring-accent/40 ${className ?? ""}`}
    >
      <SearchIcon size={16} className="shrink-0 text-tertiary" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        className="w-full bg-transparent text-label text-primary outline-none placeholder:text-tertiary"
      />
    </div>
  );
}
