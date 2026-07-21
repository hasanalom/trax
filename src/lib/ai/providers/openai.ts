import "server-only";
import OpenAI from "openai";
import {
  AiError,
  type AiProvider,
  type CompletionRequest,
} from "@/lib/ai/types";

/**
 * OpenAI adapter — the ONLY module that imports the OpenAI SDK. Maps SDK errors
 * onto provider-agnostic AiError codes so nothing downstream sees SDK types.
 *
 * Azure swap: a future providers/azure.ts implements the same AiProvider using
 * AzureOpenAI; only provider.ts changes to select it.
 */
export class OpenAiProvider implements AiProvider {
  readonly name = "openai" as const;
  private client: OpenAI;
  private model: string;

  constructor(opts: { apiKey: string; model?: string; baseURL?: string }) {
    this.client = new OpenAI({ apiKey: opts.apiKey, baseURL: opts.baseURL });
    this.model = opts.model ?? "gpt-4o-mini";
  }

  async complete(req: CompletionRequest): Promise<string> {
    try {
      const res = await this.client.chat.completions.create({
        model: this.model,
        temperature: 0.2,
        max_tokens: 700,
        messages: [
          { role: "system", content: req.system },
          { role: "system", content: `TRAX DATA CONTEXT:\n${req.grounding}` },
          ...req.messages,
        ],
      });
      const content = res.choices[0]?.message?.content?.trim();
      if (!content) throw new AiError("invalid_response", "Empty completion");
      return content;
    } catch (err) {
      throw toAiError(err);
    }
  }
}

function toAiError(err: unknown): AiError {
  if (err instanceof AiError) return err;
  if (err instanceof OpenAI.APIError) {
    if (err.status === 429) return new AiError("rate_limit", err.message);
    if (err.status === 401 || err.status === 403)
      return new AiError("auth", err.message);
    if (err.status && err.status >= 500)
      return new AiError("unavailable", err.message);
    return new AiError("unknown", err.message);
  }
  // Network/timeout/abort etc.
  return new AiError("unavailable", err instanceof Error ? err.message : "Unknown error");
}
