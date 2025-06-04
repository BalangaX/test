import { useState } from 'react';
import TemplateSelect from '../../components/WritingAssistant/TemplateSelect';
import PaperTypeSelect from '../../components/WritingAssistant/PaperTypeSelect';
import FeedbackTips from '../../components/WritingAssistant/FeedbackTips';
import SubmitButton from '../../components/WritingAssistant/SubmitButton';
import FeatureCard from '../../components/WritingAssistant/FeatureCard';

const WritingAssistant = () => {
  const [template, setTemplate] = useState('essay');
  const [paperType, setPaperType] = useState('essay');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    alert(`Submitted using ${template} for ${paperType}`);
  };

  return (
    <div>
      <h1>Writing Assistant</h1>
      <FeatureCard title="Choose Template">
        <TemplateSelect value={template} onChange={setTemplate} />
      </FeatureCard>
      <FeatureCard title="Paper Type">
        <PaperTypeSelect value={paperType} onChange={setPaperType} />
      </FeatureCard>
      <FeatureCard title="Your Text">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing..."
          rows={5}
        />
      </FeatureCard>
      <FeatureCard title="Tips">
        <FeedbackTips />
      </FeatureCard>
      <SubmitButton onClick={handleSubmit} />
    </div>
  );
};

export default WritingAssistant;
