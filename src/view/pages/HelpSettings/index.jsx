import React from "react";
import styles from "./style.module.css";
import FAQSection from "../../components/HelpSettings/FAQSection/FAQSection";
import SupportForm from "../../components/HelpSettings/SupportForm/SupportForm";
import SettingsPanel from "../../components/HelpSettings/SettingsPanel/SettingsPanel";

export default function HelpSettingsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>עזרה והגדרות</h1>
      <div className={styles.grid}>
        <div className={styles.left}>
          <FAQSection />
          <SupportForm />
        </div>
        <div className={styles.right}>
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}