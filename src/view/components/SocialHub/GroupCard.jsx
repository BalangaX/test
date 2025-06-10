// src/view/components/SocialHub/GroupCard.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from "./GroupCard.module.css";

export default function GroupCard({ group }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const { id, name, topic, members = [] } = group;

  const [isMember, setIsMember] = useState(false);
  const [openTasksCount, setOpenTasksCount] = useState(0);

  useEffect(() => {
    setIsMember(currentUser && members.includes(currentUser.uid));
  }, [members, currentUser]);

  // Effect to count open tasks for the group
  useEffect(() => {
    const tasksRef = collection(db, "studyGroups", id, "tasks");
    const q = query(tasksRef, where("completed", "==", false));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOpenTasksCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [id]);


  const handleJoin = async () => {
    if (!currentUser) return;
    const groupRef = doc(db, "studyGroups", id);
    await updateDoc(groupRef, { members: arrayUnion(currentUser.uid) });
  };

  const handleLeave = async () => {
    if (!currentUser) return;
    const groupRef = doc(db, "studyGroups", id);
    await updateDoc(groupRef, { members: arrayRemove(currentUser.uid) });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.name}>{name}</h3>
        {openTasksCount > 0 && (
          <span className={styles.tasksBadge}>{openTasksCount} open tasks</span>
        )}
      </div>
      <p className={styles.topic}>{topic}</p>
      <p className={styles.membersCount}>{members.length} member(s)</p>

      <div className={styles.cardFooter}>
        {currentUser?.uid === group.ownerUid ? (
          <span className={styles.ownerTag}>Owner</span>
        ) : (
          <button
            className={isMember ? styles.leaveBtn : styles.joinBtn}
            onClick={isMember ? handleLeave : handleJoin}
          >
            {isMember ? "Leave" : "Join"}
          </button>
        )}
        <Link to={`/social-hub/groups/${id}`} className={styles.detailsLink}>
          View Details →
        </Link>
      </div>
    </div>
  );
}