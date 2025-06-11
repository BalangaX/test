import useSummaries from "./useSummaries";

/**
 * Convenience wrapper that returns approved summaries.
 * Internally it delegates to the unified useSummaries hook.
 */
export default function useApprovedSummaries() {
  const { summaries } = useSummaries({ status: "approved" });
  return summaries;
}