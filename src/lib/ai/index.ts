import "server-only";

/**
 * AI service layer — public barrel. Server code imports the assistant API and
 * provider-mode helper from here. Client components import types from
 * "@/lib/ai/types" instead (that module has no server-only guard).
 */
export {
  askAssistant,
  summarizeRecord,
  explainAirworthinessDirective,
  summarizeAircraftHistory,
} from "@/lib/ai/assistant";
export { getProviderName } from "@/lib/ai/provider";
