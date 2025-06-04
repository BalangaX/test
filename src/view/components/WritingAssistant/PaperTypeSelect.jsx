const PaperTypeSelect = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="essay">Essay</option>
    <option value="report">Report</option>
  </select>
);

export default PaperTypeSelect;
