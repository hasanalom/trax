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
