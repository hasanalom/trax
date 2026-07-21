import "server-only";
import type { AiProvider, ProviderName } from "@/lib/ai/types";
import { OpenAiProvider } from "@/lib/ai/providers/openai";
import { MockProvider } from "@/lib/ai/providers/mock";

/**
 * Provider selection lives here and nowhere else. The rest of the app depends
 * only on the AiProvider interface. Selection rule: use OpenAI when
 * OPENAI_API_KEY is present, otherwise fall back to the Demo provider.
 *
 * To add Azure later: import an AzureOpenAiProvider and add one branch here.
 */
export function getProvider(): AiProvider {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    return new OpenAiProvider({
      apiKey,
      model: process.env.OPENAI_MODEL,
    });
  }
  return new MockProvider();
}

/** Active provider name — for the UI's Demo/live indicator. */
export function getProviderName(): ProviderName {
  return process.env.OPENAI_API_KEY ? "openai" : "demo";
}
