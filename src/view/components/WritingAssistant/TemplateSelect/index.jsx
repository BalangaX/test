import React from 'react';

const TemplateSelect = ({ templates, selectedTemplate, onSelectTemplate, disabled }) => {
  if (disabled || !templates || templates.length === 0) {
    return (
      <div>
        <label htmlFor="template" style={{ marginRight: '10px' }}>Select Template:</label>
        <select id="template" value="" disabled>
          <option value="">--Select a paper type first--</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="template" style={{ marginRight: '10px' }}>Select Template:</label>
      <select id="template" value={selectedTemplate} onChange={(e) => onSelectTemplate(e.target.value)}>
        <option value="">--Select Template--</option>
        {templates.map(tmpl => (
          <option key={tmpl.id} value={tmpl.id}>{tmpl.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelect;
