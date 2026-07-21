/**
 * TRAX Icon Set — in-house, dependency-free.
 *
 * Strategy: one outline family on a 24×24 grid, 1.5px stroke, round caps/joins,
 * drawn with `currentColor` so icons inherit text color and theme automatically.
 * Sizing is `em`-based (defaults to 1.25em) so an icon tracks its label's size.
 * Add new glyphs by composing <IconBase>; never mix in a third-party pack.
 */
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Pixel or CSS size. Defaults to 1.25em to track adjacent text. */
  size?: number | string;
}

function IconBase({ size = "1.25em", children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Brand / domain --------------------------------------------------------- */
export const PlaneIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M10.5 3.5a1.5 1.5 0 0 1 3 0V9l7.5 4.2v2.1l-7.5-2.1v3.9l2.4 1.7v1.7L12 20.4l-3.4 1.1v-1.7l2.4-1.7v-3.9L3.5 15.3v-2.1L10.5 9V3.5Z" />
  </IconBase>
);

/* Navigation ------------------------------------------------------------- */
export const GridIcon = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </IconBase>
);

export const LayersIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" />
    <path d="m4 12 8 4 8-4" />
    <path d="m4 16 8 4 8-4" />
  </IconBase>
);

export const DocumentIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M6.5 3.5h7L19 9v11.5a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
    <path d="M13.5 3.5V9H19" />
    <path d="M9 13h6M9 16.5h6" />
  </IconBase>
);

export const ClipboardIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M8.5 5.5H7a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 17 5.5h-1.5" />
    <rect x="8.5" y="3.5" width="7" height="4" rx="1.2" />
    <path d="M9 12h6M9 15.5h4" />
  </IconBase>
);

export const GaugeIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M4 16a8 8 0 1 1 16 0" />
    <path d="M12 16l3.5-3.5" />
    <circle cx="12" cy="16" r="1.1" fill="currentColor" stroke="none" />
  </IconBase>
);

export const CalendarIcon = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </IconBase>
);

export const SettingsIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" />
  </IconBase>
);

/* Actions & UI ----------------------------------------------------------- */
export const SearchIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </IconBase>
);

export const BellIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 5 1.5 6.5 1.5 6.5H5s1.5-1.5 1.5-6.5Z" />
    <path d="M10 19.5a2 2 0 0 0 4 0" />
  </IconBase>
);

export const SunIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6" />
  </IconBase>
);

export const MoonIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
  </IconBase>
);

export const ChevronDownIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </IconBase>
);

export const PanelLeftIcon = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M9.5 4.5v15" />
  </IconBase>
);

export const PlusIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 5v14M5 12h14" />
  </IconBase>
);

export const ClockIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </IconBase>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 4.5 21 19H3l9-14.5Z" />
    <path d="M12 10v4M12 16.6v.01" />
  </IconBase>
);

export const CheckIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </IconBase>
);

export const CheckCircleIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </IconBase>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </IconBase>
);

export const ArrowDownRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M7 7l10 10M17 8.5V17H8.5" />
  </IconBase>
);

export const ArrowRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
  </IconBase>
);

export const UploadIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 15.5V4.5M8 8l4-4 4 4" />
    <path d="M5 15v3.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V15" />
  </IconBase>
);

export const FileCheckIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M6.5 3.5h7L19 9v11.5a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
    <path d="M13.5 3.5V9H19" />
    <path d="m9 14.5 2 2 3.5-3.5" />
  </IconBase>
);

export const ChartBarIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M4 20h16" />
    <rect x="6" y="11" width="3" height="6" rx="0.8" />
    <rect x="11" y="7" width="3" height="10" rx="0.8" />
    <rect x="16" y="13" width="3" height="4" rx="0.8" />
  </IconBase>
);

export const MoreHorizontalIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="5.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="18.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </IconBase>
);

export const ExternalLinkIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M14 5.5h4.5V10" />
    <path d="M18 6 11 13" />
    <path d="M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" />
  </IconBase>
);

export const InboxIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M3.5 13.5 6 5.5a1 1 0 0 1 1-.8h10a1 1 0 0 1 1 .8l2.5 8" />
    <path d="M3.5 13.5H8l1.2 2.2h5.6L16 13.5h4.5v4a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-4Z" />
  </IconBase>
);

export const ChevronRightIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </IconBase>
);

export const DownloadIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 4v11M8 11l4 4 4-4" />
    <path d="M5 19h14" />
  </IconBase>
);

export const PaperclipIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M18.5 10.5 11 18a4 4 0 0 1-5.7-5.6l7.7-7.7a2.6 2.6 0 0 1 3.7 3.7l-7.7 7.7a1.2 1.2 0 0 1-1.8-1.7l6.9-6.9" />
  </IconBase>
);

export const FilterIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M4 5.5h16l-6.2 7.4v5.3l-3.6 1.8v-7.1L4 5.5Z" />
  </IconBase>
);

export const MapPinIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 21s6.5-5.2 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.8 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </IconBase>
);

export const WrenchIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M15.5 6.5a4 4 0 0 0-5.1 5.1L4.5 17.5a2 2 0 0 0 2.8 2.8l5.9-5.9a4 4 0 0 0 5.1-5.1l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
  </IconBase>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 3.5 5.5 6v5.5c0 4 2.8 7 6.5 8.5 3.7-1.5 6.5-4.5 6.5-8.5V6L12 3.5Z" />
    <path d="m9 11.5 2 2 4-4.5" />
  </IconBase>
);

export const UserIcon = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
  </IconBase>
);

export const SparklesIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M12 4.5c.6 3 1.5 3.9 4.5 4.5-3 .6-3.9 1.5-4.5 4.5-.6-3-1.5-3.9-4.5-4.5 3-.6 3.9-1.5 4.5-4.5Z" />
    <path d="M18 14c.3 1.4.7 1.8 2 2-1.3.3-1.7.7-2 2-.3-1.3-.7-1.7-2-2 1.3-.2 1.7-.6 2-2Z" />
  </IconBase>
);

export const SendIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M5 12 20 5l-4.5 15-3.5-6.5L5 12Z" />
    <path d="m12 13 3.5-3.5" />
  </IconBase>
);

export const RefreshIcon = (p: IconProps) => (
  <IconBase {...p}>
    <path d="M19 8a7 7 0 1 0 1.5 5" />
    <path d="M20 4v4h-4" />
  </IconBase>
);
