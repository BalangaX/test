// src/view/pages/Summaries/index.jsx

import React, { useState } from "react";
import styles from "./style.module.css";
import useApprovedSummaries from "../../../hooks/useApprovedSummaries";
import useSummaries from "../../../hooks/useSummaries";

import PageHeader from "../../components/Common/PageHeader"; // Import the new, unified header
import SummaryFilters from "../../components/Summaries/SummaryFilters/SummaryFilters";
import SummariesGrid from "../../components/Summaries/SummariesGrid";
import UploadSummaryModal from "../../components/Summaries/UploadSummaryModal";

export default function SummariesPage() {
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [showModal, setShowModal] = useState(false);

  const availableSummaries = useApprovedSummaries() || [];
  const { addSummary } = useSummaries();

  const authors = ["All", ...new Set(availableSummaries.map((s) => s.author))];

  const filtered = availableSummaries.filter((s) => {
    const text = search.toLowerCase();
    const matchesText =
      s.title.toLowerCase().includes(text) ||
      s.subject.toLowerCase().includes(text) ||
      s.author.toLowerCase().includes(text);
    const matchesAuthor = authorFilter === "All" || s.author === authorFilter;
    return matchesText && matchesAuthor;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Popularity") {
      return (b.downloads || 0) - (a.downloads || 0);
    } else {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  return (
    <>
      <PageHeader
        title="Summaries Library"
        subtitle="Search and filter academic summaries shared by the community."
      />

      <section className={styles.wrapper}>
        <div className={styles.controlsCard}>
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

        <SummariesGrid summaries={sorted} />

        {showModal && (
          <UploadSummaryModal
            onClose={() => setShowModal(false)}
            onSend={addSummary}
          />
        )}
      </section>
    </>
  );
}