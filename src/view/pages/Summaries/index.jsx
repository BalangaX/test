import React, { useState } from "react";
import styles from "./style.module.css";
import SummaryFilters from "../../components/Summaries/SummaryFilters/SummaryFilters";
import SummaryTable from "../../components/Summaries/SummaryTable/SummaryTable";
import useApprovedSummaries from "../../../hooks/useApprovedSummaries";
import useSummaries from "../../../hooks/useSummaries";
import UploadSummaryModal from "../../components/Summaries/UploadSummaryModal";

export default function SummariesPage() {
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");

  const availableSummaries = useApprovedSummaries() || [];
  const { addSummary } = useSummaries();
  const [showModal, setShowModal] = useState(false);

  const authors = ["All", ...new Set(availableSummaries.map((s) => s.author))];

  const filtered = availableSummaries.filter((s) => {
    const text = search.toLowerCase();
    const matchesText =
      s.title.toLowerCase().includes(text) ||
      s.subject.toLowerCase().includes(text) ||
      s.author.toLowerCase().includes(text);
    const matchesAuthor =
      authorFilter === "All" || s.author === authorFilter;
    return matchesText && matchesAuthor;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Popularity") {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Summaries Library</h1>

      <div className={styles.controls}>
        <SummaryFilters
          search={search}
          onSearch={setSearch}
          authors={authors}
          authorFilter={authorFilter}
          onAuthorChange={setAuthorFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <button className={styles.uploadBtn} onClick={() => setShowModal(true)}>
          Upload New Summary
        </button>
      </div>

      <SummaryTable summaries={sorted} />
      {showModal && (
        <UploadSummaryModal
          onClose={() => setShowModal(false)}
          onSend={addSummary}
        />
      )}
    </section>
  );
}