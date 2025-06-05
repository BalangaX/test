import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TemplateCanvas.module.css";
import jsPDF from "jspdf";

export default function TemplateCanvas({ template, onClose }) {
  const [text, setText] = useState(template?.content || "");

  useEffect(() => {
    setText(template?.content || "");
  }, [template]);
  const textareaRef = useRef();

  if (!template) return null;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 15, 20);
    doc.save(`${template.name.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.canvas}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{template.name}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck
          autoFocus
        />

        <div className={styles.actions}>
          <button className={styles.downloadBtn} onClick={handleExportPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

TemplateCanvas.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
