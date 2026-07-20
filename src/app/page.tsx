import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";

/**
 * Phase 0 — Design Foundation reference.
 *
 * A living style guide that exercises the token system in context: typography,
 * semantic color, elevation, radius and the Button primitive. It intentionally
 * contains no dashboard, tables, charts or business modules — those arrive in
 * later phases. Treat this page as the visual contract everything else honours.
 */
export default function FoundationPage() {
  return (
    <div className="container-content py-8 sm:py-10">
      <PageHeader />
      <div className="mt-10 flex flex-col gap-12">
        <TypographySection />
        <ColorSection />
        <StatusSection />
        <ElevationSection />
        <RadiusSection />
        <ControlsSection />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ header */

function PageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-caption font-medium uppercase text-accent-text">
          Phase 0 · Foundation
        </p>
        <h1 className="mt-1.5 text-heading text-primary">Design System</h1>
        <p className="mt-2 max-w-xl text-body text-secondary">
          The token architecture, typography, color and elevation that every
          TRAX surface is built from — handcrafted for an airline records desk.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">Documentation</Button>
        <Button variant="primary">
          <PlusIcon size={16} />
          New Record
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- sections */

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-border-subtle pb-3">
        <h2 className="text-subtitle text-primary">{title}</h2>
        <p className="text-footnote text-tertiary">{hint}</p>
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

function TypographySection() {
  const scale = [
    { name: "Display", cls: "text-display", sample: "Fleet Airworthiness" },
    { name: "Heading", cls: "text-heading", sample: "Compliance Overview" },
    { name: "Title", cls: "text-title", sample: "Aircraft Records" },
    { name: "Subtitle", cls: "text-subtitle", sample: "Scheduled Maintenance" },
    { name: "Body", cls: "text-body", sample: "Last inspection completed on 14 July 2026." },
    { name: "Label", cls: "text-label font-medium", sample: "Tail Number" },
    { name: "Footnote", cls: "text-footnote text-secondary", sample: "Synced 4 minutes ago" },
    { name: "Caption", cls: "text-caption uppercase text-tertiary", sample: "Status" },
  ];
  return (
    <Section title="Typography" hint="Geist · 8-step semantic scale">
      <dl className="flex flex-col divide-y divide-border-subtle">
        {scale.map((row) => (
          <div key={row.name} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-3">
            <dt className="text-caption uppercase text-tertiary">{row.name}</dt>
            <dd className={`${row.cls} text-primary`}>{row.sample}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function ColorSection() {
  const surfaces = [
    { name: "Base", cls: "bg-surface-base" },
    { name: "Raised", cls: "bg-surface-raised" },
    { name: "Sunken", cls: "bg-surface-sunken" },
    { name: "Hover", cls: "bg-surface-hover" },
    { name: "Active", cls: "bg-surface-active" },
    { name: "Accent", cls: "bg-accent" },
  ];
  return (
    <Section title="Color" hint="Semantic surfaces · theme-aware">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {surfaces.map((s) => (
          <div key={s.name} className="overflow-hidden rounded-lg border border-border-default">
            <div className={`${s.cls} h-16`} />
            <div className="bg-surface-raised px-3 py-2">
              <p className="text-label font-medium text-primary">{s.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function StatusSection() {
  const statuses = [
    { name: "Airworthy", surface: "bg-success-surface", text: "text-success-text" },
    { name: "Due Soon", surface: "bg-warning-surface", text: "text-warning-text" },
    { name: "Grounded", surface: "bg-danger-surface", text: "text-danger-text" },
    { name: "In Review", surface: "bg-info-surface", text: "text-info-text" },
  ];
  return (
    <Section title="Status" hint="Muted semantic states">
      <div className="flex flex-wrap gap-2.5">
        {statuses.map((s) => (
          <span
            key={s.name}
            className={`inline-flex items-center gap-2 rounded-full ${s.surface} px-3 py-1 text-label font-medium ${s.text}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {s.name}
          </span>
        ))}
      </div>
    </Section>
  );
}

function ElevationSection() {
  const levels = ["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"];
  return (
    <Section title="Elevation" hint="5-step shadow scale">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {levels.map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <div className={`h-20 w-full rounded-lg border border-border-subtle bg-surface-raised ${s}`} />
            <p className="text-footnote text-tertiary">{s.replace("shadow-", "")}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function RadiusSection() {
  const radii = [
    { name: "xs", cls: "rounded-xs" },
    { name: "sm", cls: "rounded-sm" },
    { name: "md", cls: "rounded-md" },
    { name: "lg", cls: "rounded-lg" },
    { name: "xl", cls: "rounded-xl" },
    { name: "2xl", cls: "rounded-2xl" },
  ];
  return (
    <Section title="Radius" hint="Consistent corner scale">
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-6">
        {radii.map((r) => (
          <div key={r.name} className="flex flex-col items-center gap-3">
            <div className={`h-16 w-full border border-border-strong bg-surface-sunken ${r.cls}`} />
            <p className="text-footnote text-tertiary">{r.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ControlsSection() {
  return (
    <Section title="Controls" hint="Button primitive · variants & sizes">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary">Small</Button>
          <Button size="md" variant="secondary">Medium</Button>
          <Button size="lg" variant="secondary">Large</Button>
          <Button size="md" variant="secondary" iconOnly aria-label="Add">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </Section>
  );
}
