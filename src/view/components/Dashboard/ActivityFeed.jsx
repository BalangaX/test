import PropTypes from "prop-types";
import styles from "./ActivityFeed.module.css";

/**
 * Displays a chronological feed of the user's recent actions (task completions, summary uploads, comments).
 * Now accepts `data` and `loading` props from the parent.
 */
export default function ActivityFeed({ className = "", data = [], loading = false }) {
  const timeAgo = (date) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    const diff = Math.floor((Date.now() - d.getTime()) / 60000); // minutes
    if (diff < 60) return `${diff}m`;
    const hrs = Math.floor(diff / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  return (
    <div className={`${styles.feed} ${className}`}>
      <h3 className={styles.title}>Recent Activity</h3>
      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>טוען פעילות...</div>
      ) : !data || data.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>אין פעילות להצגה</div>
      ) : (
        <ul className={styles.list}>
          {data.map((item) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.bullet}>•</span>
              <span className={styles.text}>{item.text}</span>
              <time className={styles.time}>{timeAgo(item.ts)}</time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ActivityFeed.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
};
