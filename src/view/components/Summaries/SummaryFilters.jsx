const SummaryFilters = ({ search, onSearch }) => (
  <input
    type="text"
    value={search}
    onChange={(e) => onSearch(e.target.value)}
    placeholder="Search summaries"
  />
);

export default SummaryFilters;
