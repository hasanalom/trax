import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Button — the canonical interactive primitive and the reference for how every
 * TRAX control is built: token-driven colors, a single radius, one focus ring,
 * standardized motion. New controls should mirror this variant/size contract.
 */
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Renders as a square control sized for a single icon. */
  iconOnly?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md " +
  "font-medium select-none transition-standard focus-ring " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-xs hover:bg-accent-hover active:brightness-95",
  secondary:
    "bg-surface-raised text-primary border border-border-default shadow-xs " +
    "hover:bg-surface-hover active:bg-surface-active",
  ghost:
    "text-secondary hover:bg-surface-hover hover:text-primary active:bg-surface-active",
  danger:
    "bg-danger-solid text-on-accent shadow-xs hover:brightness-95 active:brightness-90",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-label",
  md: "h-9 px-3.5 text-label",
  lg: "h-10 px-4 text-body",
};

const iconSizes: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "secondary", size = "md", iconOnly = false, type = "button", ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        base,
        variants[variant],
        iconOnly ? iconSizes[size] : sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
