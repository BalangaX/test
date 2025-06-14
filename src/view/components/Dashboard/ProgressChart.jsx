import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./ProgressChart.module.css";

export default function ProgressChart({ className = "", data = [], loading = false }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {loading ? (
        <div className={styles.placeholder}>Loading chart...</div>
      ) : !data || data.length === 0 ? (
        <div className={styles.placeholder}>No data for this week</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={{ strokeWidth: 0 }} />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="var(--sb-primary, #3b82f6)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

ProgressChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
};