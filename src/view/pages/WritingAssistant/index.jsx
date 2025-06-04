import React, { useState, useEffect } from 'react';
import PaperTypeSelect from '../../components/WritingAssistant/PaperTypeSelect';
import TemplateSelect from '../../components/WritingAssistant/TemplateSelect';
import FeedbackTips from '../../components/WritingAssistant/FeedbackTips';
import SubmitButton from '../../components/WritingAssistant/SubmitButton';
import FeatureCard from '../../components/WritingAssistant/FeatureCard';
import mockData from '../../../data/writingTemplates'; // Default export

const { paperTypes, templates: allTemplates, generalWritingTips } = mockData;

const WritingAssistantPage = () => {
  const [selectedPaperType, setSelectedPaperType] = useState('');
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [currentTemplateContent, setCurrentTemplateContent] = useState('');
  const [currentTemplateTips, setCurrentTemplateTips] = useState([]);

  useEffect(() => {
    if (selectedPaperType) {
      setAvailableTemplates(allTemplates[selectedPaperType] || []);
      setSelectedTemplateId(''); // Reset template if paper type changes
      setCurrentTemplateContent('');
      setCurrentTemplateTips([]);
    } else {
      setAvailableTemplates([]);
      setSelectedTemplateId('');
      setCurrentTemplateContent('');
      setCurrentTemplateTips([]);
    }
  }, [selectedPaperType]);

  useEffect(() => {
    if (selectedTemplateId && availableTemplates.length > 0) {
      const template = availableTemplates.find(t => t.id === selectedTemplateId);
      if (template) {
        setCurrentTemplateContent(template.content);
        setCurrentTemplateTips(template.tips || []);
      } else {
        setCurrentTemplateContent('');
        setCurrentTemplateTips([]);
      }
    } else {
      setCurrentTemplateContent('');
      setCurrentTemplateTips([]);
    }
  }, [selectedTemplateId, availableTemplates]);

  const handleGetAssistance = () => {
    // Mock action: just log or alert
    if (selectedTemplateId) {
      alert(`Showing assistance for: ${selectedPaperType} - ${selectedTemplateId}`);
      // In a real app, this might trigger further UI changes or API calls
    } else {
      alert('Please select a paper type and template first.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Writing Assistant</h1>
      <p>Get help structuring your academic papers and access useful writing tips.</p>

      <FeatureCard title="Select Your Document Type">
        <PaperTypeSelect
          paperTypes={paperTypes}
          selectedType={selectedPaperType}
          onSelectType={setSelectedPaperType}
        />
        <TemplateSelect
          templates={availableTemplates}
          selectedTemplate={selectedTemplateId}
          onSelectTemplate={setSelectedTemplateId}
          disabled={!selectedPaperType}
        />
      </FeatureCard>

      {selectedTemplateId && currentTemplateContent && (
        <FeatureCard title="Selected Template Outline">
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
            {currentTemplateContent}
          </pre>
        </FeatureCard>
      )}

      <FeatureCard title="Tips & Feedback">
        <FeedbackTips tips={currentTemplateTips} generalTips={generalWritingTips} />
      </FeatureCard>

      <SubmitButton onClick={handleGetAssistance} disabled={!selectedTemplateId}>
        View Template & Tips
      </SubmitButton>
    </div>
  );
};

export default WritingAssistantPage;
