import React from "react";
import PropTypes from "prop-types";
import styles from "./TemplateSelect.module.css";

export default function TemplateSelect({ templates, value, onChange, onSelect }) {
  const isDisabled = templates.length === 0;

  const handleChange = (e) => {
    const id = Number(e.target.value);
    if (onChange) onChange(id);
    if (onSelect) {
      const selected = templates.find((t) => t.id === id);
      if (selected) onSelect(selected);
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
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

TemplateSelect.propTypes = {
  templates: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};