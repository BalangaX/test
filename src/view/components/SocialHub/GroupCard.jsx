import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from "./GroupCard.module.css";

export default function GroupCard({ group }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const {
    id,
    name,
    topic,
    description,
    ownerUid,
    members = [],
    maxMembers,
  } = group;

  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState(members.length);

  useEffect(() => {
    if (currentUser && members.includes(currentUser.uid)) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
    setMemberCount(members.length);
  }, [members, currentUser]);

  const handleJoin = async () => {
    if (!currentUser) return;
    if (maxMembers && memberCount >= maxMembers) return;
    const groupRef = doc(db, "studyGroups", id);
    await updateDoc(groupRef, {
      members: arrayUnion(currentUser.uid),
    });
  };

  const handleLeave = async () => {
    if (!currentUser) return;
    const groupRef = doc(db, "studyGroups", id);
    await updateDoc(groupRef, {
      members: arrayRemove(currentUser.uid),
    });
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.topic}>{topic}</p>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.membersCount}>
        {memberCount} member{memberCount !== 1 && "s"}
      </p>

      {currentUser && currentUser.uid === ownerUid ? (
        <span className={styles.ownerTag}>You’re the owner</span>
      ) : (
        <button
          className={isMember ? styles.leaveBtn : styles.joinBtn}
          onClick={isMember ? handleLeave : handleJoin}
          disabled={isMember && currentUser?.uid === ownerUid}
        >
          {isMember ? "Leave Group" : "Join Group"}
        </button>
      )}
      <Link to={`/social-hub/groups/${id}`} className={styles.detailsLink}>
        View Details
      </Link>
    </div>
  );
}
