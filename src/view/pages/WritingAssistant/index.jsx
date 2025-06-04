// src/view/pages/WritingAssistant/index.jsx

import React, { useState, useEffect, useMemo } from "react";
import styles from "./style.module.css";

import writingTemplates from "../../../data/writingTemplates";
import PaperTypeSelect from "../../components/WritingAssistant/PaperTypeSelect";
import TemplateSelect from "../../components/WritingAssistant/TemplateSelect";
import FeedbackTips from "../../components/WritingAssistant/FeedbackTips";
import FeatureCard from "../../components/WritingAssistant/FeatureCard";
import SubmitButton from "../../components/WritingAssistant/SubmitButton";

import {
  FaRegFileAlt,
  FaCopy,
  FaSpellCheck
} from "react-icons/fa";

export default function WritingAssistantPage() {
  const [paperType, setPaperType] = useState("");
  const [templateId, setTemplateId] = useState(0);
  const [previewContent, setPreviewContent] = useState("");

  // Keep only templates that match the currently‑selected paper type  
  const filteredTemplates = useMemo(
    () => writingTemplates.filter(t => t.type === paperType),
    [paperType]
  );

  // Whenever the user chooses a different paper type, reset the selected template  
  useEffect(() => {
    setTemplateId(0);
  }, [paperType]);

  const tips = [
    "Structure your paper with clear sections (introduction, body, conclusion).",
    "Include a strong thesis statement at the end of your introduction.",
    "Use academic language and avoid contractions or colloquialisms.",
    "Support your arguments with evidence from credible sources.",
    "Follow citation guidelines carefully according to your chosen format."
  ];

  const features = [
    {
      icon: <FaRegFileAlt />,
      title: "Format Guide",
      subtitle: "Reference examples"
    },
    {
      icon: <FaCopy />,
      title: "Templates",
      subtitle: "Pre-formatted documents"
    },
    {
      icon: <FaSpellCheck />,
      title: "Grammar Check",
      subtitle: "AI-powered assistance"
    }
  ];

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Academic Writing Assistant</h1>

      <div className={styles.selects}>
        <PaperTypeSelect
          value={paperType}
          onChange={setPaperType}
        />
        <TemplateSelect
          templates={filteredTemplates}
          value={templateId}
          onChange={setTemplateId}
        />
      </div>

      <FeedbackTips tips={tips} />

      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={f.icon}
            title={f.title}
            subtitle={f.subtitle}
          />
        ))}
      </div>

      <SubmitButton onClick={() => {
        if (!paperType) {
          alert("Please select a paper type.");
          return;
        }
        const selectedTemplate = filteredTemplates.find(t => t.id === templateId);
        if (!selectedTemplate) {
          alert("Please select a template.");
          return;
        }
        setPreviewContent(selectedTemplate.content || "");
      }} />

      {previewContent && (
        <div className={styles.previewContainer}>
          <h2>Template Preview</h2>
          <div className={styles.previewContent}>
            {previewContent}
          </div>
        </div>
      )}
    </section>
  );
}