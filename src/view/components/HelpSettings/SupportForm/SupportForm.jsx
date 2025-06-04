import React, { useState } from "react";
import styles from "./SupportForm.module.css";

export default function SupportForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("תודה! פנייתך נשלחה לתמיכה.");
    setMessage("");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>צור קשר עם התמיכה</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>הודעה</label>
        <textarea
          required
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className={styles.button}>שלח</button>
      </form>
      {status && <div className={styles.status}>{status}</div>}
    </div>
  );
}