import Link from "next/link";
import { cn } from "@/lib/cn";
import { SparklesIcon, AlertTriangleIcon } from "@/components/icons";
import type { ProviderName, Source } from "@/lib/ai/types";

/**
 * A single chat message. User messages sit right in a sunken bubble; assistant
 * messages sit left with the assistant glyph, an optional Sources list (deep-
 * linking to existing pages where available) and a Demo tag for demo-mode
 * answers. Error answers use the danger surface. Presentational only.
 */
export interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  provider?: ProviderName;
  error?: boolean;
}

export function MessageBubble({ message }: { message: UiMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-surface-sunken px-4 py-2.5 text-body text-primary">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <span
        className={cn(
          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
          message.error
            ? "bg-danger-surface text-danger-text"
            : "bg-accent-surface text-accent-text",
        )}
      >
        {message.error ? <AlertTriangleIcon size={16} /> : <SparklesIcon size={16} />}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-label font-semibold text-primary">Assistant</span>
          {message.provider === "demo" && (
            <span className="rounded-full bg-surface-sunken px-1.5 py-0.5 text-caption font-medium uppercase tracking-wide text-tertiary">
              Demo
            </span>
          )}
        </div>

        <div
          className={cn(
            "mt-1 whitespace-pre-wrap text-body",
            message.error ? "text-danger-text" : "text-secondary",
          )}
        >
          {message.content}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 border-t border-border-subtle pt-2.5">
            <p className="text-caption font-medium uppercase tracking-wide text-tertiary">
              Sources
            </p>
            <ul className="mt-1.5 flex flex-col gap-1">
              {message.sources.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-footnote">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                  {s.href ? (
                    <Link
                      href={s.href}
                      className="text-accent-text transition-standard focus-ring hover:underline"
                    >
                      {s.label}
                    </Link>
                  ) : (
                    <span className="text-secondary">{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
