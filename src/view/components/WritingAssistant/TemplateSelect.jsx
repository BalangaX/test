import React from "react";
import PropTypes from "prop-types";
import pageStyles from "../../pages/WritingAssistant/style.module.css"; // Import page styles

export default function TemplateSelect({ templates, value, onChange }) {
  const isDisabled = templates.length === 0;

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={pageStyles.select}
      disabled={isDisabled}
    >
      <option value={0} disabled>
        {isDisabled ? "Choose paper type first" : "Select a template"}
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
};