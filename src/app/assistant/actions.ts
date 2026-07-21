"use server";

import { askAssistant } from "@/lib/ai";
import type { AiResult, ChatMessage } from "@/lib/ai/types";

/**
 * Server Action — the only bridge between the client chat and the AI service
 * layer. No public REST endpoint is exposed. Read-only.
 */
export async function sendMessage(history: ChatMessage[]): Promise<AiResult> {
  return askAssistant(history);
}
