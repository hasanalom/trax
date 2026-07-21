"use client";

import type { ComponentType } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import {
  SparklesIcon,
  LayersIcon,
  ShieldCheckIcon,
  ClipboardIcon,
  WrenchIcon,
  CalendarIcon,
  DocumentIcon,
  type IconProps,
} from "@/components/icons";

/**
 * Empty-state starter prompts. Each maps to a capability the assistant handles
 * (aircraft status, AD explanation, open findings, recent/next maintenance,
 * record summary). Clicking sends the prompt.
 */
const PROMPTS: { icon: ComponentType<IconProps>; label: string; prompt: string }[] = [
  { icon: LayersIcon, label: "Aircraft status", prompt: "Give me a status summary for aircraft N120TX." },
  { icon: ShieldCheckIcon, label: "Explain an AD", prompt: "Explain Airworthiness Directive AD 2025-14-05." },
  { icon: ClipboardIcon, label: "Open findings", prompt: "What compliance findings remain open?" },
  { icon: WrenchIcon, label: "Recent maintenance", prompt: "What maintenance was recently completed?" },
  { icon: CalendarIcon, label: "Next maintenance", prompt: "What is the next scheduled maintenance?" },
  { icon: DocumentIcon, label: "Summarize a record", prompt: "Summarize technical record TR-2026-0731." },
];

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-col items-center">
      <EmptyState
        icon={SparklesIcon}
        title="Technical Records Assistant"
        description="Ask about the fleet, airworthiness directives, compliance findings, scheduling or any technical record. Grounded in your TRAX data."
      />
      <div className="mt-1 grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2">
        {PROMPTS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onSelect(p.prompt)}
              className="group flex items-start gap-3 rounded-lg border border-border-default bg-surface-raised p-3 text-left transition-standard focus-ring hover:border-border-strong hover:bg-surface-hover"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-surface-sunken text-secondary">
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-label font-medium text-primary">{p.label}</span>
                <span className="block text-footnote text-tertiary">{p.prompt}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
