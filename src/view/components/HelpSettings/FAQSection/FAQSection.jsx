import React, { useState } from "react";
import styles from "./FAQSection.module.css";

const faqs = [
  { question: "איך משתמשים באפליקציה?", answer: "ניווט דרך התפריט העליון או הצדדי." },
  { question: "איך מוסיפים משימה חדשה?", answer: "לחצו על '+ Add Task' במסך Tasks ושמרו." },
  { question: "איך מייצאים סיכומים?", answer: "לחצו על 'Export PDF' במסך Summaries." },
  { question: "כיצד לקבל תמיכה?", answer: "מלאו את הטופס למטה או פנו ל-support@example.com." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>שאלות נפוצות (FAQ)</h2>
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