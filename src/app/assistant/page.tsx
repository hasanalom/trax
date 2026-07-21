import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { AssistantChat } from "@/components/assistant/assistant-chat";
import { getProviderName } from "@/lib/ai";

export const metadata: Metadata = { title: "Assistant" };

/**
 * AI Assistant — a Copilot-style technical-records assistant grounded in the
 * TRAX repositories. Server component resolves the active provider (OpenAI vs
 * Demo) and renders the session-only chat. Read-only.
 */
export default function AssistantPage() {
  const mode = getProviderName();

  return (
    <div className="container-content flex h-full flex-col py-6 sm:py-8">
      <PageHeader
        title="Assistant"
        description="Ask about the fleet, airworthiness, compliance and technical records"
        status={mode === "demo" ? <Badge tone="neutral" dot>Demo Mode</Badge> : undefined}
      />

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <AssistantChat mode={mode} />
      </div>
    </div>
  );
}
