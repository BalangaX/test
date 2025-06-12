import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { doc, onSnapshot, collection, query, orderBy, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import GroupChat from "../../components/SocialHub/GroupChat";
import Tasklist from "../../components/Tasks/Tasklist";
import TaskForm from "../../components/Tasks/TaskForm";
import styles from "./GroupDetail.module.css";

export default function GroupDetail() {
  const { groupId } = useParams();
  const { currentUser } = useAuth();

  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberNames, setMemberNames] = useState({});
  const [groupTasks, setGroupTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const groupRef = doc(db, "studyGroups", groupId);
    const unsubscribe = onSnapshot(groupRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGroup({ id: docSnap.id, ...data });
        setMembers(data.members || []);
      } else {
        setGroup(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [groupId]);

  useEffect(() => {
    const fetchMemberNames = async () => {
      // Fetch all user docs in parallel for better performance
      const snapshots = await Promise.all(
        members.map((uid) =>
          getDoc(doc(db, "users", uid)).catch(() => null) // swallow individual errors
        )
      );

      const names = {};
      snapshots.forEach((snap, idx) => {
        const uid = members[idx];
        if (snap && snap.exists()) {
          names[uid] = snap.data().username || uid;
        } else {
          names[uid] = uid;
        }
      });

      setMemberNames(names);
    };

    if (members.length > 0) {
      fetchMemberNames();
    }
  }, [members]);

  useEffect(() => {
    const tasksRef = collection(db, "studyGroups", groupId, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroupTasks(tasks);
    });
    return () => unsubscribe();
  }, [groupId]);

  const handleAddTask = async (taskData) => {
    const tasksRef = collection(db, "studyGroups", groupId, "tasks");
    await addDoc(tasksRef, {
      ...taskData,
      createdAt: new Date(),
      completed: false,
      createdBy: currentUser.uid,
    });
    setShowTaskForm(false);
  };
  
  const handleToggleTask = async (taskId) => {
    const taskRef = doc(db, "studyGroups", groupId, "tasks", taskId);
    const task = groupTasks.find(t => t.id === taskId);
    await updateDoc(taskRef, { completed: !task.completed });
  };
  
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Delete this task for everyone in the group?")) {
      const taskRef = doc(db, "studyGroups", groupId, "tasks", taskId);
      await deleteDoc(taskRef);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading group details...</div>;
  }
  if (!group) {
    return <div className={styles.container}><p>Group not found.</p></div>;
  }

  const isMember = currentUser && members.includes(currentUser.uid);

  return (
    <div className={styles.container}>
      <Link to="/social-hub" className={styles.backLink}>← Back to Social Hub</Link>

      <div className={styles.header}>
        <h1 className={styles.groupName}>{group.name}</h1>
        <p className={styles.topic}>{group.topic}</p>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.tasksSection}>
            <div className={styles.sectionHeader}>
              <h2>Group Tasks</h2>
              {isMember && (
                <button onClick={() => setShowTaskForm(!showTaskForm)} className={styles.addTaskBtn}>
                  {showTaskForm ? "Cancel" : "Add Task"}
                </button>
              )}
            </div>
            {showTaskForm && <TaskForm onSave={handleAddTask} onCancel={() => setShowTaskForm(false)} />}
            <Tasklist tasks={groupTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
          </div>

          <div className={styles.chatSection}>
            <h2>Group Chat</h2>
            <GroupChat groupId={groupId} currentUser={currentUser} />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.membersList}>
            <h3>{members.length} Members</h3>
            <ul>
              {members.map((uid) => (
                <li key={uid}>{uid === currentUser?.uid ? "You" : memberNames[uid] || uid}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}