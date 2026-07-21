import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppShell } from "@/components/layout/app-shell";

// Geist — Vercel's grotesque; precise and neutral, well suited to dense
// technical UI. Exposed to the token layer as --font-sans-src / --font-mono-src.
const sans = Geist({
  variable: "--font-sans-src",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  display: "swap",
});

const APP_DESCRIPTION =
  "Aviation Technical Records dashboard — fleet, airworthiness directives, compliance findings, maintenance scheduling and an AI records assistant.";

export const metadata: Metadata = {
  metadataBase: new URL("https://trax.local"),
  applicationName: "TRAX",
  title: {
    default: "TRAX · Technical Records",
    template: "%s · TRAX",
  },
  description: APP_DESCRIPTION,
  keywords: [
    "aviation",
    "technical records",
    "airworthiness",
    "maintenance",
    "compliance",
    "fleet management",
  ],
  openGraph: {
    type: "website",
    siteName: "TRAX",
    title: "TRAX · Technical Records",
    description: APP_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "TRAX · Technical Records",
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Set the theme before first paint to avoid a flash of wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
