

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import GroupChat from "../../components/SocialHub/GroupChat";
import styles from "./GroupDetail.module.css";

export default function GroupDetail() {
  const { groupId } = useParams();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [group, setGroup] = useState(null);
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const groupRef = doc(db, "studyGroups", groupId);
    const unsubscribe = onSnapshot(
      groupRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGroup({ id: docSnap.id, ...data });
          setMembers(data.members || []);
        } else {
          setGroup(null);
          setMembers([]);
        }
        setLoadingGroup(false);
        setLoadingMembers(false);
      },
      (err) => {
        console.error("Error fetching group details:", err);
        setLoadingGroup(false);
        setLoadingMembers(false);
      }
    );
    return () => unsubscribe();
  }, [groupId]);

  const goBackLink = "/social-hub";

  if (loadingGroup) {
    return <div className={styles.loading}>Loading group...</div>;
  }
  if (!group) {
    return (
      <div className={styles.container}>
        <p>Group not found.</p>
        <Link to={goBackLink}>Back to Social Hub</Link>
      </div>
    );
  }

  const isOwner = currentUser && currentUser.uid === group.ownerUid;
  const isMember = currentUser && members.includes(currentUser.uid);

  return (
    <div className={styles.container}>
      <Link to={goBackLink} className={styles.backLink}>
        ← Back to Social Hub
      </Link>

      <h1 className={styles.groupName}>{group.name}</h1>
      <p className={styles.topic}>Topic: {group.topic}</p>
      {group.description && (
        <p className={styles.description}>{group.description}</p>
      )}
      <p className={styles.owner}>
        Owner: {isOwner ? "You" : group.ownerUid}
      </p>
      <p className={styles.memberCount}>
        {members.length} member{members.length !== 1 && "s"}
      </p>

      <div className={styles.membersList}>
        <h3>Members:</h3>
        {loadingMembers ? (
          <p>Loading members...</p>
        ) : members.length === 0 ? (
          <p>No members yet.</p>
        ) : (
          <ul>
            {members.map((uid) => (
              <li key={uid}>{uid === currentUser?.uid ? "You" : uid}</li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.chatSection}>
        <h3>Group Chat</h3>
        <GroupChat groupId={groupId} currentUser={currentUser} />
      </div>
    </div>
  );
}