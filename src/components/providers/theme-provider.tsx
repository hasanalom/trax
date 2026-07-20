"use client";

/**
 * ThemeProvider — owns the light/dark/system choice.
 *
 * Design notes:
 *  - `choice` is initialised lazily from localStorage (client only); the server
 *    renders the neutral "system" default.
 *  - The OS preference is read via useSyncExternalStore, so it stays correct
 *    across hydration and updates live — no setState inside effects.
 *  - The one effect only *writes to external systems* (the <html> attribute and
 *    localStorage); it never calls setState. This matches the pre-hydration
 *    script in lib/theme.ts, so there is no flash of the wrong theme.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeChoice,
} from "@/lib/theme";

interface ThemeContextValue {
  /** The user's stored preference. */
  choice: ThemeChoice;
  /** What is actually applied right now. */
  resolved: ResolvedTheme;
  setChoice: (choice: ThemeChoice) => void;
  /** Convenience: flip between the two concrete themes. */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Subscribe to the OS colour-scheme preference without setState-in-effect. */
function useSystemDark(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DARK_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DARK_QUERY).matches,
    () => false, // server snapshot
  );
}

/**
 * True once the app has hydrated. Uses the server/client snapshot split so the
 * first client render matches the server (false), then flips to true — a
 * mismatch-free replacement for the useState+useEffect "mounted" pattern.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeChoice) ?? "system";
  });

  const systemDark = useSystemDark();
  const resolved: ResolvedTheme = useMemo(
    () => (choice === "system" ? (systemDark ? "dark" : "light") : choice),
    [choice, systemDark],
  );

  // Sync external systems (DOM attribute + storage) with the resolved theme.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  }, [resolved, choice]);

  const setChoice = useCallback((c: ThemeChoice) => setChoiceState(c), []);
  const toggle = useCallback(
    () => setChoiceState(resolved === "dark" ? "light" : "dark"),
    [resolved],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ choice, resolved, setChoice, toggle }),
    [choice, resolved, setChoice, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
