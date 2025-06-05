import React from "react";
import styles from "./GroupList.module.css";
import GroupCard from "./GroupCard";

export default function GroupList({ groups, loading }) {
  if (loading) {
    return <div className={styles.loading}>Loading groups...</div>;
  }
  if (!groups || groups.length === 0) {
    return <div className={styles.noGroups}>No study groups found.</div>;
  }
  return (
    <div className={styles.grid}>
      {groups.map((g) => (
        <GroupCard key={g.id} group={g} />
      ))}
    </div>
  );
}