import React, { useState, useEffect } from 'react';
import { writingTemplates } from '../../data/writingTemplates'; // Adjusted path
import styles from './WritingAssistantPage.module.css';

export default function WritingAssistantPage() {
  const [templates, setTemplates] = useState(writingTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [userInputText, setUserInputText] = useState('');
  const [feedbackMessages, setFeedbackMessages] = useState([]); // To store feedback

  // Effect to update textarea when a new template is selected
  useEffect(() => {
    if (selectedTemplateId) {
      const selected = templates.find(t => t.id === selectedTemplateId);
      if (selected) {
        setUserInputText(selected.templateContent);
        setFeedbackMessages([]); // Clear previous feedback
      }
    } else {
      setUserInputText(''); // Clear textarea if no template is selected
      setFeedbackMessages([]);
    }
  }, [selectedTemplateId, templates]);

  const handleTemplateChange = (event) => {
    setSelectedTemplateId(event.target.value);
  };

  const handleUserInputChange = (event) => {
    setUserInputText(event.target.value);
  };

  // Placeholder for feedback logic (Step 4)
  const handleGetFeedback = () => {
    if (selectedTemplateId) {
      const selected = templates.find(t => t.id === selectedTemplateId);
      if (selected && selected.exampleFeedback) {
        setFeedbackMessages(selected.exampleFeedback);
      } else {
        setFeedbackMessages(["No predefined feedback available for this template."]);
      }
    } else {
      setFeedbackMessages(["Please select a template first."]);
    }
  };

  return (
    <div className={styles.writingAssistantContainer}>
      <header className={styles.header}>
        <h1>Writing Assistant</h1>
        <p>Select a template, edit the content, and get feedback.</p>
      </header>

      <section className={styles.mainContent}>
        <div className={styles.templateSelectorArea}>
          <label htmlFor="template-select">Choose a template:</label>
          <select 
            id="template-select" 
            value={selectedTemplateId} 
            onChange={handleTemplateChange}
            className={styles.templateSelect}
          >
            <option value="">-- Select a Template --</option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name} - {template.description}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.editorArea}>
          <textarea
            className={styles.textArea}
            value={userInputText}
            onChange={handleUserInputChange}
            rows="15"
            placeholder="Select a template or start writing..."
          />
          <button 
            onClick={handleGetFeedback} 
            className={styles.feedbackButton}
            disabled={!selectedTemplateId && !userInputText.trim()} // Disable if no template or text
          >
            Get Feedback
          </button>
        </div>

        {feedbackMessages.length > 0 && (
          <aside className={styles.feedbackArea}>
            <h3>Feedback Suggestions:</h3>
            <ul>
              {feedbackMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </aside>
        )}
      </section>
    </div>
  );
}