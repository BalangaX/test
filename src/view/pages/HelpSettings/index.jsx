import React from "react";
import styles from "./style.module.css";

import FAQSection from "../../components/HelpSettings/FAQSection/FAQSection";
import SupportForm from "../../components/HelpSettings/SupportForm/SupportForm";
import SettingsPanel from "../../components/HelpSettings/SettingsPanel/SettingsPanel";

/**
 * Help & Settings page – split into two columns:
 *  • Left: FAQ accordion + Support form
 *  • Right: Application settings toggles
 *
 * Each logical block wrapped in <section> with a heading for clarity and a11y.
 */
export default function HelpSettingsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>עזרה והגדרות</h1>

      <div className={styles.grid}>
        {/* ---- Left column ---- */}
        <div className={styles.column}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>שאלות נפוצות (FAQ)</h2>
            <FAQSection />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>צור קשר עם התמיכה</h2>
            <SupportForm />
          </section>
        </div>

        {/* ---- Right column ---- */}
        <div className={styles.column}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>הגדרות האפליקציה</h2>
            <SettingsPanel />
          </section>
        </div>
      </div>
    </div>
  );
}