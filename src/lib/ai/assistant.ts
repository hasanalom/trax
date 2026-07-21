import "server-only";
import {
  AiError,
  type AiErrorCode,
  type AiResult,
  type ChatMessage,
} from "@/lib/ai/types";
import { getProvider } from "@/lib/ai/provider";
import { composeSystem, type AssistantTask } from "@/lib/ai/prompts";
import {
  retrieveForQuestion,
  retrieveRecord,
  retrieveDirective,
  retrieveAircraft,
  type Retrieved,
} from "@/lib/ai/context";

/**
 * Public AI service API. The rest of the app calls ONLY these functions (via a
 * server action) — never the provider or SDK. Read-only: builds context from
 * the repositories, asks the active provider, attaches deterministic sources.
 */

const FRIENDLY: Record<AiErrorCode, string> = {
  rate_limit: "The assistant is receiving a lot of requests right now. Please try again in a moment.",
  auth: "The assistant is not configured correctly (authentication failed). Check the API key.",
  unavailable: "The assistant is temporarily unavailable. Please try again shortly.",
  invalid_response: "The assistant returned an empty or invalid response. Please try again.",
  unknown: "Something went wrong reaching the assistant. Please try again.",
};

/** Run a task through the active provider and shape the discriminated result. */
async function run(
  task: AssistantTask,
  retrieved: Retrieved,
  messages: ChatMessage[],
): Promise<AiResult> {
  const provider = getProvider();
  try {
    const content = await provider.complete({
      system: composeSystem(task),
      grounding: retrieved.briefing,
      messages,
    });
    return { ok: true, content, sources: retrieved.sources, provider: provider.name };
  } catch (err) {
    const code: AiErrorCode = err instanceof AiError ? err.code : "unknown";
    return { ok: false, error: FRIENDLY[code], provider: provider.name };
  }
}

/** Chat entry point — grounds on the records relevant to the latest question. */
export async function askAssistant(messages: ChatMessage[]): Promise<AiResult> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const retrieved = await retrieveForQuestion(lastUser?.content ?? "");
  return run("chat", retrieved, messages);
}

/** Summarise a specific technical record. */
export async function summarizeRecord(recordId: string): Promise<AiResult> {
  const retrieved = await retrieveRecord(recordId);
  if (!retrieved) return notFound(`No technical record found for “${recordId}”.`);
  return run("recordSummary", retrieved, [
    { role: "user", content: "Summarise this technical record." },
  ]);
}

/** Explain an Airworthiness Directive in plain language. */
export async function explainAirworthinessDirective(ref: string): Promise<AiResult> {
  const retrieved = await retrieveDirective(ref);
  if (!retrieved) return notFound(`No Airworthiness Directive found for “${ref}”.`);
  return run("adExplanation", retrieved, [
    { role: "user", content: `Explain Airworthiness Directive ${ref}.` },
  ]);
}

/** Summarise an aircraft's recent technical history. */
export async function summarizeAircraftHistory(aircraftId: string): Promise<AiResult> {
  const retrieved = await retrieveAircraft(aircraftId);
  if (!retrieved) return notFound(`No aircraft found for “${aircraftId}”.`);
  return run("aircraftHistory", retrieved, [
    { role: "user", content: "Summarise this aircraft's recent technical history." },
  ]);
}

function notFound(message: string): AiResult {
  return { ok: false, error: message, provider: getProvider().name };
}
