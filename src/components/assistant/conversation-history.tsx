"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";

/**
 * Session-only conversation list (no persistence, no DB). Lets the user start a
 * new conversation and switch between ones started this session.
 */
export interface ConversationSummary {
  id: string;
  title: string;
  count: number;
}

export function ConversationHistory({
  conversations,
  activeId,
  onSelect,
  onNew,
}: {
  conversations: ConversationSummary[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-3">
      <Button variant="secondary" size="md" onClick={onNew} className="w-full justify-start">
        <PlusIcon size={15} />
        New conversation
      </Button>

      <p className="px-1 text-caption font-medium uppercase text-tertiary">
        This session
      </p>

      <ul className="flex flex-col gap-0.5 overflow-y-auto">
        {conversations.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect(c.id)}
              aria-current={c.id === activeId ? "true" : undefined}
              className={cn(
                "flex w-full flex-col items-start gap-0.5 rounded-md px-2.5 py-2 text-left transition-standard focus-ring",
                c.id === activeId
                  ? "bg-surface-active"
                  : "hover:bg-surface-hover",
              )}
            >
              <span className="w-full truncate text-label font-medium text-primary">
                {c.title}
              </span>
              <span className="text-caption text-tertiary">
                {c.count === 0 ? "Empty" : `${c.count} message${c.count === 1 ? "" : "s"}`}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
