/**
 * AI layer — shared types (framework/provider-agnostic, no server-only guard so
 * client components may import the types they render). No SDK types leak here.
 */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Which provider produced a result — surfaced in the UI (Demo vs live). */
export type ProviderName = "openai" | "demo";

/** A traceable reference to a repository entity used to ground an answer. */
export type SourceKind = "aircraft" | "record" | "ad" | "sb" | "finding" | "event";

export interface Source {
  kind: SourceKind;
  /** Human label, e.g. "AD 2025-14-05" or "Aircraft N120TX". */
  label: string;
  /** Deep-link to an existing page when one exists (records, aircraft). */
  href?: string;
}

/** Discriminated result returned to the UI — never throws across the boundary. */
export type AiResult =
  | { ok: true; content: string; sources: Source[]; provider: ProviderName }
  | { ok: false; error: string; provider: ProviderName };

/** The only shape a provider is asked to fulfil. */
export interface CompletionRequest {
  /** Role + guardrails + task instruction (assembled from small builders). */
  system: string;
  /** Retrieved, relevance-limited repository context (kept separate so the
   *  demo provider can present it without parsing the system prompt). */
  grounding: string;
  messages: ChatMessage[];
}

/** The single abstraction the rest of the app depends on. */
export interface AiProvider {
  readonly name: ProviderName;
  complete(req: CompletionRequest): Promise<string>;
}

/** Provider-agnostic error codes. Adapters map SDK errors onto these so no
 *  provider-specific error handling leaks outside src/lib/ai/providers. */
export type AiErrorCode =
  | "rate_limit"
  | "auth"
  | "unavailable"
  | "invalid_response"
  | "unknown";

export class AiError extends Error {
  constructor(
    public readonly code: AiErrorCode,
    message?: string,
  ) {
    super(message ?? code);
    this.name = "AiError";
  }
}
