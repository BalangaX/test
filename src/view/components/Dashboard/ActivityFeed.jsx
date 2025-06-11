import PropTypes from "prop-types";
import styles from "./ActivityFeed.module.css";

export default function ActivityFeed({ className = "", data = [], loading = false }) {

  return (
    <div className={`${styles.feed} ${className}`}>
      <h3 className={styles.title}>Recent Activity</h3>
      {loading ? (
        <div className={styles.placeholder}>טוען פעילות...</div>
      ) : !data || data.length === 0 ? (
        <div className={styles.placeholder}>אין פעילות להצגה</div>
      ) : (
        <ul className={styles.list}>
          {data.map((item) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.bullet}>•</span>
              <span className={styles.text}>{item.text}</span>
              <time className={styles.time}>{item.displayDate}</time>
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
