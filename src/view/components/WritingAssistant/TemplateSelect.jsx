import { templates } from '../../../data/writingTemplates';

const TemplateSelect = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {templates.map((t) => (
      <option key={t.id} value={t.id}>
        {t.label}
      </option>
    ))}
  </select>
);

export default TemplateSelect;
