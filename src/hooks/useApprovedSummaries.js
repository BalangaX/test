import useSummaries from "./useSummaries";

export default function useApprovedSummaries() {
  const { summaries } = useSummaries({ status: "approved" });
  return summaries;
}