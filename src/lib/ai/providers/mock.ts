import "server-only";
import type { AiProvider, CompletionRequest } from "@/lib/ai/types";

/**
 * Demo provider — used automatically when OPENAI_API_KEY is absent. Generates a
 * deterministic, professional response grounded entirely in the retrieved
 * repository context (never fabricates). No network, no SDK. The UI labels
 * these responses as Demo Mode.
 */
export class MockProvider implements AiProvider {
  readonly name = "demo" as const;

  async complete(req: CompletionRequest): Promise<string> {
    const grounding = req.grounding.trim();
    const question = lastUser(req.messages);

    if (!grounding) {
      return (
        "I don't have that information in the current TRAX technical records. " +
        "Try asking about a specific aircraft (e.g. N120TX), an Airworthiness " +
        "Directive, a technical record, open findings, or upcoming maintenance."
      );
    }

    const lead = question
      ? `Here is what the current TRAX records show regarding “${question}”:`
      : "Here is what the current TRAX records show:";

    return `${lead}\n\n${grounding}`;
  }
}

function lastUser(messages: CompletionRequest["messages"]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") return messages[i].content.trim();
  }
  return null;
}
