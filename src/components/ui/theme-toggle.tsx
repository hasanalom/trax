"use client";

import { useHydrated, useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * ThemeToggle — flips between light and dark.
 *
 * Until hydrated it renders the light-theme icon (matching the server render)
 * to avoid a hydration mismatch; the real state takes over on the client.
 */
export function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const hydrated = useHydrated();
  const isDark = hydrated && resolved === "dark";

  return (
    <Button
      variant="ghost"
      size="md"
      iconOnly
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
