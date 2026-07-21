"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendIcon, RefreshIcon, PlusIcon } from "@/components/icons";
import { MessageBubble, type UiMessage } from "@/components/assistant/message-bubble";
import { SuggestedPrompts } from "@/components/assistant/suggested-prompts";
import { ConversationHistory } from "@/components/assistant/conversation-history";
import { sendMessage } from "@/app/assistant/actions";
import type { AiResult, ChatMessage, ProviderName } from "@/lib/ai/types";

interface Conversation {
  id: string;
  title: string;
  messages: UiMessage[];
}

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;

/**
 * AssistantChat — session-only Copilot-style chat. Holds conversations in React
 * state (no persistence), calls the sendMessage Server Action, and renders
 * empty / loading / error states. `mode` drives the Demo-mode indicator.
 */
export function AssistantChat({ mode }: { mode: ProviderName }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => [
    { id: "c1", title: "New conversation", messages: [] },
  ]);
  const [activeId, setActiveId] = useState("c1");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active.messages, loading]);

  function patch(id: string, messages: UiMessage[], title?: string) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages, title: title ?? c.title } : c)),
    );
  }

  function toHistory(messages: UiMessage[]): ChatMessage[] {
    return messages
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content }));
  }

  function resultToMessage(result: AiResult): UiMessage {
    return result.ok
      ? { id: uid(), role: "assistant", content: result.content, sources: result.sources, provider: result.provider }
      : { id: uid(), role: "assistant", content: result.error, provider: result.provider, error: true };
  }

  async function complete(id: string, history: ChatMessage[]) {
    setLoading(true);
    try {
      const result = await sendMessage(history);
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, messages: [...c.messages, resultToMessage(result)] } : c)),
      );
    } catch {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: uid(), role: "assistant", content: "Something went wrong reaching the assistant. Please try again.", provider: mode, error: true },
                ],
              }
            : c,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    const userMsg: UiMessage = { id: uid(), role: "user", content: value };
    const nextMessages = [...active.messages, userMsg];
    const title = active.messages.length === 0 ? value.slice(0, 42) : active.title;
    patch(active.id, nextMessages, title);
    setInput("");
    void complete(active.id, toHistory(nextMessages));
  }

  function retry() {
    let messages = [...active.messages];
    while (messages.length && messages[messages.length - 1].role === "assistant" && messages[messages.length - 1].error) {
      messages = messages.slice(0, -1);
    }
    patch(active.id, messages);
    void complete(active.id, toHistory(messages));
  }

  function newConversation() {
    const id = uid();
    setConversations((prev) => [{ id, title: "New conversation", messages: [] }, ...prev]);
    setActiveId(id);
    setInput("");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {/* New-conversation control for narrow screens (rail hidden below xl) */}
      <div className="flex justify-end xl:hidden">
        <Button variant="secondary" size="sm" onClick={newConversation}>
          <PlusIcon size={15} />
          New conversation
        </Button>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[260px_1fr]">
        {/* History rail (xl+) */}
      <aside className="hidden xl:block">
        <Card className="h-full p-3">
          <ConversationHistory
            conversations={conversations.map((c) => ({ id: c.id, title: c.title, count: c.messages.length }))}
            activeId={active.id}
            onSelect={setActiveId}
            onNew={newConversation}
          />
        </Card>
      </aside>

      {/* Chat */}
      <Card className="flex min-h-0 flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5">
          {active.messages.length === 0 ? (
            <div className="flex h-full items-center py-6">
              <SuggestedPrompts onSelect={send} />
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              {active.messages.map((m) => (
                <div key={m.id}>
                  <MessageBubble message={m} />
                  {m.error && m === active.messages[active.messages.length - 1] && (
                    <div className="mt-2 flex gap-3">
                      <span className="w-8 shrink-0" />
                      <Button variant="secondary" size="sm" onClick={retry}>
                        <RefreshIcon size={14} />
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              {loading && <TypingIndicator />}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border-subtle p-3">
          <form
            className="mx-auto flex max-w-3xl items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask about the fleet, an AD, a record, findings…"
              className="max-h-32 min-h-9 flex-1 resize-none rounded-md border border-border-default bg-surface-raised px-3 py-2 text-body text-primary outline-none transition-standard placeholder:text-tertiary focus:border-border-focus"
            />
            <Button type="submit" variant="primary" size="md" iconOnly aria-label="Send message" disabled={loading || !input.trim()}>
              <SendIcon size={16} />
            </Button>
          </form>
          <p className="mx-auto mt-1.5 max-w-3xl text-caption text-tertiary">
            {mode === "demo"
              ? "Demo Mode — responses are generated locally from your TRAX data (no OPENAI_API_KEY set)."
              : "Answers are grounded in your TRAX records. Verify against source documents."}
          </p>
        </div>
      </Card>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-surface" />
      <div className="mt-3 flex gap-1" aria-label="Assistant is thinking">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-border-strong"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
