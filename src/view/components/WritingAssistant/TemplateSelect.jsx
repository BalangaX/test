import React from "react";
import styles from "./TemplateSelect.module.css";

export default function TemplateSelect({ templates, value, onChange }) {
  const isDisabled = templates.length === 0;
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={styles.select}
      disabled={isDisabled}
    >
      <option value={0} disabled>
        {isDisabled ? "Choose paper type first" : "Select template"}
      </option>
      {templates.map((tmpl) => (
        <option key={tmpl.id} value={tmpl.id}>
          {tmpl.name}
        </option>
      ))}
    </select>
  );
}