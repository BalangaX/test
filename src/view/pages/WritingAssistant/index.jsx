// src/view/pages/WritingAssistant/index.jsx

import React, { useState, useMemo } from "react";
import styles from "./style.module.css";

import writingTemplates from "../../../data/writingTemplates";
import PageHeader from "../../components/Common/PageHeader";
import PaperTypeSelect from "../../components/WritingAssistant/PaperTypeSelect";
import TemplateSelect from "../../components/WritingAssistant/TemplateSelect";
import FeedbackTips from "../../components/WritingAssistant/FeedbackTips";
import FeatureCard from "../../components/WritingAssistant/FeatureCard";
import SubmitButton from "../../components/WritingAssistant/SubmitButton";
import TemplateCanvas from "../../components/WritingAssistant/TemplateCanvas";

import { FaRegFileAlt, FaCopy, FaSpellCheck } from "react-icons/fa";

export default function WritingAssistantPage() {
  const [step, setStep] = useState(1);
  const [paperType, setPaperType] = useState("");
  const [templateId, setTemplateId] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredTemplates = useMemo(
    () => (paperType ? writingTemplates.filter((t) => t.type === paperType) : []),
    [paperType]
  );

  const handlePaperTypeChange = (newType) => {
    setPaperType(newType);
    setTemplateId(0);
    setStep(newType ? 2 : 1);
  };

  const handleSubmit = () => {
    if (!paperType || !templateId) {
      alert("Please select a paper type and a template first.");
      return;
    }
    const template = filteredTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  };

  const tips = [
    "Structure your paper with clear sections (introduction, body, conclusion).",
    "Include a strong thesis statement at the end of your introduction.",
    "Use academic language and avoid contractions or colloquialisms.",
    "Support your arguments with evidence from credible sources.",
  ];

  const features = [
    {
      icon: <FaRegFileAlt />,
      title: "Format Guide",
      subtitle: "APA, MLA examples",
      onClick: () => {
        setModalMessage("Format Guide feature coming soon!");
        setShowModal(true);
      }
    },
    {
      icon: <FaCopy />,
      title: "Templates",
      subtitle: "Pre-formatted documents",
      onClick: () => {
        setModalMessage("Templates feature coming soon!");
        setShowModal(true);
      }
    },
    {
      icon: <FaSpellCheck />,
      title: "Grammar Check",
      subtitle: "AI-powered assistance",
      onClick: () => {
        setModalMessage("Grammar Check feature coming soon!");
        setShowModal(true);
      }
    },
  ];

  return (
    <>
      <PageHeader
        title="Academic Writing Assistant"
        subtitle="Choose a document type, edit in a ready-made template, and download as a PDF."
      />

      <main className={styles.mainContent}>
        <div className={styles.wizardContainer}>
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>1</span>
              <h2 className={styles.stepTitle}>Choose Document Type</h2>
            </div>
            <PaperTypeSelect value={paperType} onChange={handlePaperTypeChange} />
          </div>

          {step === 2 && (
            <div className={`${styles.step} ${styles.stepFadeIn}`}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>2</span>
                <h2 className={styles.stepTitle}>Select a Template</h2>
              </div>
              <TemplateSelect
                templates={filteredTemplates}
                value={templateId}
                onChange={setTemplateId}
              />
            </div>
          )}
        </div>

        <div className={styles.submitSection}>
          <SubmitButton onClick={handleSubmit} />
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <FeedbackTips tips={tips} />
      </main>

      <TemplateCanvas
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}