import React from "react";
import styles from "./style.module.css";
import PageHeader from "../../components/Common/PageHeader"; // Import the new header
import FAQSection from "../../components/HelpSettings/FAQSection/FAQSection";
import SupportForm from "../../components/HelpSettings/SupportForm/SupportForm";
import SettingsPanel from "../../components/HelpSettings/SettingsPanel/SettingsPanel";

export default function HelpSettingsPage() {
  return (
    <>
      <PageHeader
        title="Help & Settings"
        subtitle="Find answers, contact support, or configure your application settings."
      />

      <div className={styles.page}>
        {/* The old h1 title is removed from here */}
        <div className={styles.grid}>
          <div className={styles.column}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions (FAQ)</h2>
              <FAQSection />
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Support</h2>
              <SupportForm />
            </section>
          </div>

          <div className={styles.column}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>App Settings</h2>
              <SettingsPanel />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}