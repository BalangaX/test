import React, { useState } from "react";
import styles from "./FAQSection.module.css";

const faqs = [
  { question: "How do I use the app?", answer: "Navigate using the top or side menu." },
  { question: "How do I add a new task?", answer: "Click '+ Add Task' on the Tasks screen and save." },
  { question: "How do I export summaries?", answer: "Click 'Export PDF' on the Summaries screen." },
  { question: "How can I get support?", answer: "Fill out the form below." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Frequently Asked Questions (FAQ)</h2>
      <ul className={styles.list}>
        {faqs.map((faq, i) => (
          <li key={i} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span>{faq.question}</span>
              <span className={styles.toggle}>{openIndex === i ? "–" : "+"}</span>
            </button>
            {openIndex === i && (
              <p className={styles.answer}>{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}