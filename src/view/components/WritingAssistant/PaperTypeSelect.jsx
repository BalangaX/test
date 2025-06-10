import React from "react";
import { paperTypes } from "../../../data/writingTemplates";
import pageStyles from "../../pages/WritingAssistant/style.module.css"; // Import page styles

export default function PaperTypeSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={pageStyles.select}
    >
      <option value="">Select paper type</option>
      {paperTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}