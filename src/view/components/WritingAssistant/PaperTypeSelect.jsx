import React from "react";
import { paperTypes } from "../../../data/writingTemplates";
import styles from "./PaperTypeSelect.module.css";

export default function PaperTypeSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
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