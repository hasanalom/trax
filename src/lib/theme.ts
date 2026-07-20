/**
 * Theme architecture — shared contract between the pre-hydration inline script
 * and the React ThemeProvider so both agree on storage key and values.
 */
export type ThemeChoice = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "trax-theme";

/**
 * Runs before paint (injected as a blocking inline script) to set
 * `data-theme` on <html>, eliminating the flash of incorrect theme.
 * Kept as a stringified IIFE so it can ship without a bundler pass.
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var c=localStorage.getItem(k)||"system";var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=c==="system"?(d?"dark":"light"):c;document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
