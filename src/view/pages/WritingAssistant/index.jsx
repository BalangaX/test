// src/view/pages/WritingAssistant/index.jsx

import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./style.module.css";

import writingTemplates from "../../../data/writingTemplates";
import PaperTypeSelect from "../../components/WritingAssistant/PaperTypeSelect";
import TemplateSelect from "../../components/WritingAssistant/TemplateSelect";
import FeedbackTips from "../../components/WritingAssistant/FeedbackTips";
import FeatureCard from "../../components/WritingAssistant/FeatureCard";
import SubmitButton from "../../components/WritingAssistant/SubmitButton";
import TemplateCanvas from "../../components/WritingAssistant/TemplateCanvas";

import {
  FaRegFileAlt,
  FaCopy,
  FaSpellCheck
} from "react-icons/fa";

export default function WritingAssistantPage() {
  const [paperType, setPaperType] = useState("");
  const [templateId, setTemplateId] = useState(0);
  // Holds the full template object when user selects a template
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // ref to scroll into the template selectors
  const selectsRef = useRef(null);

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

  // Hard‑coded example guide; can be moved to data file later
  const formatGuide = {
    id: -1,
    name: "APA Format Guide",
    content:
      "APA Reference List Example:\n\nAuthor, A. A. (Year). Title of work. Publisher.\n\nFor in‑text citation: (Author, Year)."
  };

  /** Actions for feature cards */
  const openFormatGuide = () => setSelectedTemplate(formatGuide);
  const scrollToTemplates = () => {
    const el = selectsRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // Temporary highlight so the user notices
    el.classList.add(styles.flash);
    setTimeout(() => el.classList.remove(styles.flash), 1000);
  };
  const showGrammarAlert = () => alert("Grammar Check – coming soon!");

  const features = [
    {
      icon: <FaRegFileAlt />,
      title: "Format Guide",
      subtitle: "Reference examples",
      onClick: openFormatGuide
    },
    {
      icon: <FaCopy />,
      title: "Templates",
      subtitle: "Pre-formatted documents",
      onClick: scrollToTemplates
    },
    {
      icon: <FaSpellCheck />,
      title: "Grammar Check",
      subtitle: "AI-powered assistance",
      onClick: showGrammarAlert
    }
  ];

  return (
    <>
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Academic Writing Assistant</h1>

      <div className={styles.selects} ref={selectsRef}>
        <PaperTypeSelect
          value={paperType}
          onChange={setPaperType}
        />
        <TemplateSelect
          templates={filteredTemplates}
          value={templateId}
          onChange={setTemplateId}
          onSelect={setSelectedTemplate}  // open canvas immediately
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
            onClick={f.onClick}
          />
        ))}
      </div>

      <SubmitButton onClick={() => {
        if (!paperType) {
          alert("Please select a paper type.");
          return;
        }
        const tmpl = filteredTemplates.find(t => t.id === templateId);
        if (!tmpl) {
          alert("Please select a template.");
          return;
        }
        setSelectedTemplate(tmpl); // open canvas manually
      }} />
    </section>

      {/* Full‑screen canvas */}
      <TemplateCanvas
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </>
  );
}