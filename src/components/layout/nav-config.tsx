/**
 * Navigation model for the app shell.
 *
 * Phase 0 ships the *structure* only — destinations are placeholders until the
 * corresponding modules are built in later phases. Grouping mirrors how a
 * records team thinks: the live picture first, the record sources beneath it.
 */
import type { ComponentType } from "react";
import {
  CalendarIcon,
  ClipboardIcon,
  DocumentIcon,
  GridIcon,
  LayersIcon,
  type IconProps,
} from "@/components/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}

export interface NavSection {
  /** Omitted for the top-level group. */
  title?: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    items: [{ label: "Overview", href: "/", icon: GridIcon }],
  },
  {
    title: "Fleet",
    items: [{ label: "Aircraft", href: "/aircraft", icon: LayersIcon }],
  },
  {
    title: "Records",
    items: [
      { label: "Airworthiness", href: "/airworthiness", icon: DocumentIcon },
      { label: "Compliance", href: "/compliance", icon: ClipboardIcon },
      { label: "Scheduling", href: "/scheduling", icon: CalendarIcon },
    ],
  },
];
