import type { Contribution } from "@/types";

const summaryById: Record<string, string> = {
  "pr-celery-10998": "Made Redis chord completion an atomic claim so concurrent workers cannot both publish the callback.",
  "pr-django-22177": "Stopped FETCH_PEERS deferred fetches from overwriting loaded or locally modified values.",
  "pr-agent-framework-8819": "Discarded pending workflow state after failed or cancelled runs so it cannot leak into later ones.",
  "pr-celery-10493": "Broke a traceback reference cycle that kept memory alive after hard timeouts.",
  "pr-celery-10497": "Guarded a redundant UNSUBSCRIBE that re-entered a non-reentrant PubSub lock.",
  "pr-agent-framework-7944": "Kept synthetic compaction summaries alive across agent runs.",
  "pr-celery-10510": "Added an expiry check so expired certificates cannot pass verification.",
  "pr-openfoodfacts-explorer-1766": "Added brand autocomplete through the taxonomy suggester.",
  "pr-Eventra-8655": "Implemented Redis-backed distributed rate limiting to eliminate instance-hopping bypasses.",
  "pr-Eventra-9156": "Forced JWT configuration to fail closed instead of allowing missing-secret auth bypasses.",
  "pr-AegisGraph-Sentinel-2.0-1054": "Synchronized async runtime state to remove cross-service race conditions.",
  "pr-pdf-qa-bot-69": "Serialized concurrent model inference to stabilize parallel RAG requests.",
  "pr-LegalEase-350": "Introduced a unified auth identity model across JWT and API key consumers.",
  "pr-Eventra-8687": "Validated forwarded IP chains before rate-limit and audit decisions.",
  "pr-LegalEase-402": "Hardened AI clause JSON recovery so malformed model output degrades safely.",
};

const phraseSummaries: Array<[RegExp, string]> = [
  [/rate limiting|rate limiter/i, "Hardened request throttling so abuse controls hold under production traffic."],
  [/jwt|auth|api key|password/i, "Tightened authentication boundaries to fail closed on unsafe identity states."],
  [/cors|csp|origin/i, "Replaced permissive browser security policy with explicit production validation."],
  [/secret|environment|config/i, "Added fail-fast configuration checks to prevent unsafe production fallbacks."],
  [/upload|buffer|chunk/i, "Reduced upload memory pressure by streaming large document workloads safely."],
  [/race|concurr|sync|state/i, "Resolved shared-state timing hazards across concurrent application flows."],
  [/rag|model|ai|prompt|clause|summar/i, "Improved AI pipeline reliability around parsing, inference, and guardrails."],
  [/stream/i, "Restored streaming compatibility across gateway and backend response paths."],
  [/logging|exception|observability/i, "Replaced silent failures with structured diagnostics for production debugging."],
  [/health|diagnostic|exposure|disclosure/i, "Reduced operational data exposure from public application surfaces."],
  [/schema|validation|standardize/i, "Aligned validation contracts to remove inconsistent runtime behavior."],
  [/cloudinary|template|cleanup/i, "Cleaned up cloud assets during delete workflows to prevent stale resources."],
  [/qr|batch/i, "Fixed QR product lookup paths so batch-linked inventory resolves correctly."],
];

export function getContributionSummary(pr: Contribution) {
  if (summaryById[pr.id]) return summaryById[pr.id];

  const matched = phraseSummaries.find(([pattern]) => pattern.test(pr.title));
  if (matched) return matched[1];

  return `Improved ${pr.repository} ${pr.category.toLowerCase()} behavior through a focused production fix.`;
}
