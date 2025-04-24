import HomeCard from "../../components/common/HomeCard"; // Corrected path
import styles from "./style.module.css";

export default function Home() {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.heading}>StudyBuddy</h1>
        <p className={styles.tagline}>
          Everything you need for smarter studying – in one place
        </p>
      </header>

      <div className={styles.grid}>
        <HomeCard to="/tasks" type="tasks" title="Learning & Tasks" subtitle="Manage personal & group work" />
        <HomeCard to="/summaries" type="summaries" title="Summaries Library" subtitle="Find & share course notes" />
        <HomeCard to="/writing-assistant" type="writing" title="Writing Assistant" subtitle="Templates & AI feedback" />
        <HomeCard to="/social-hub" type="social" title="Social Hub" subtitle="Collaborate with peers" />
        <HomeCard to="/help-settings" type="settings" title="Help & Settings" subtitle="FAQ, profile & preferences" />
      </div>
    </section>
  );
}