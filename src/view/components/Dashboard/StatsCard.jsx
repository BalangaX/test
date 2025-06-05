

import PropTypes from "prop-types";
import styles from "./StatsCard.module.css";

/**
 * Displays a single KPI value with its label.
 *
 * @example
 * <StatsCard label="Active Tasks" value={4} />
 */
export default function StatsCard({ label, value, icon = null }) {
  return (
    <div className={styles.card}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}

StatsCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
};