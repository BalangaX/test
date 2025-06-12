import { db } from "../../../firebase/config";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import TaskForm from "../../components/Tasks/TaskForm";
import Tasklist from "../../components/Tasks/Tasklist";
import MyCalendar from "../../components/Tasks/MyCalendar";
import PageHeader from "../../components/Common/PageHeader";

const isFutureDate = (taskDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(taskDate) >= today;
};

export default function TasksPage() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [personalTasks, setPersonalTasks] = useState([]);
  const [groupTasksMap, setGroupTasksMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userGroups, setUserGroups] = useState([]);
  const [selectedView, setSelectedView] = useState("personal");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const personalTasksQuery = query(
      collection(db, "users", currentUser.uid, "tasks"),
      orderBy("date", "asc")
    );
    const unsubPersonal = onSnapshot(personalTasksQuery, (snap) => {
      const tasksData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isGroupTask: false,
        groupId: null,
        groupName: null,
      }));
      setPersonalTasks(tasksData);
      setLoading(false);
    });
    return () => unsubPersonal();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const groupListeners = [];
    const groupsQuery = query(
      collection(db, "studyGroups"),
      where("members", "array-contains", currentUser.uid)
    );
    const unsubGroups = onSnapshot(groupsQuery, (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserGroups(groupsData);
      groupListeners.forEach(unsub => unsub());
      groupListeners.length = 0;
      if (groupsData.length > 0) {
        groupsData.forEach(group => {
          const groupTasksQuery = query(
            collection(db, "studyGroups", group.id, "tasks"),
            orderBy("createdAt", "desc")
          );
          const unsub = onSnapshot(groupTasksQuery, (taskSnap) => {
            const tasksForThisGroup = taskSnap.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              isGroupTask: true,
              groupId: group.id,
              groupName: group.name,
            }));
            setGroupTasksMap(prevMap => ({ ...prevMap, [group.id]: tasksForThisGroup }));
          });
          groupListeners.push(unsub);
        });
        setGroupTasksMap(prevMap => {
          const updatedMap = {};
          const currentGroupIds = new Set(groupsData.map(g => g.id));
          Object.keys(prevMap).forEach(groupId => {
            if (currentGroupIds.has(groupId)) {
              updatedMap[groupId] = prevMap[groupId];
            }
          });
          return updatedMap;
        });
      } else {
        setGroupTasksMap({});
      }
    });
    return () => {
      unsubGroups();
      groupListeners.forEach(unsub => unsub());
    };
  }, [currentUser]);

  useEffect(() => {
    const allGroupTasks = Object.values(groupTasksMap).flat();
    setTasks([...personalTasks, ...allGroupTasks]);
  }, [personalTasks, groupTasksMap]);


  const handleSave = async (taskData, assignedGroupId) => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const taskDate = `${year}-${month}-${day}`;
    if (assignedGroupId && assignedGroupId !== "personal") {
      const groupTasksRef = collection(db, "studyGroups", assignedGroupId, "tasks");
      if (editingTask && editingTask.isGroupTask && editingTask.groupId === assignedGroupId) {
        const taskDocRef = doc(db, "studyGroups", assignedGroupId, "tasks", editingTask.id);
        await updateDoc(taskDocRef, { ...taskData, date: taskDate });
      } else {
        await addDoc(groupTasksRef, {
          ...taskData,
          date: taskDate,
          createdAt: new Date(),
          completed: false,
          createdBy: currentUser.uid,
          groupId: assignedGroupId,
          groupName: userGroups.find(g => g.id === assignedGroupId)?.name || 'Unknown Group',
        });
      }
    } else {
      const personalTasksRef = collection(db, "users", currentUser.uid, "tasks");
      if (editingTask && !editingTask.isGroupTask) {
        const taskDocRef = doc(db, "users", currentUser.uid, "tasks", editingTask.id);
        await updateDoc(taskDocRef, { ...taskData, date: taskDate });
      } else {
        await addDoc(personalTasksRef, {
          ...taskData,
          date: taskDate,
          completed: false,
          isGroupTask: false,
        });
      }
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleToggle = async (id, isGroupTask, groupId) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    let taskDocRef;
    if (isGroupTask && groupId) {
      taskDocRef = doc(db, "studyGroups", groupId, "tasks", id);
    } else {
      taskDocRef = doc(db, "users", currentUser.uid, "tasks", id);
    }
    await updateDoc(taskDocRef, { completed: !task.completed });
  };

  const handleDelete = async (id, isGroupTask, groupId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      let taskDocRef;
      if (isGroupTask && groupId) {
        taskDocRef = doc(db, "studyGroups", groupId, "tasks", id);
      } else {
        taskDocRef = doc(db, "users", currentUser.uid, "tasks", id);
      }
      await deleteDoc(taskDocRef);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleAddNewClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleChatSupport = () => {
    setModalMessage("Chat support feature is coming soon!");
    setShowModal(true);
  };

  if (loading) {
    return <div className={styles.tasksWrapper}>Loading tasks...</div>;
  }
  if (!currentUser) {
    return <div className={styles.tasksWrapper}>Please log in to see your tasks.</div>;
  }

  const dateStr = selectedDate.toISOString().slice(0, 10);
  const filteredByView = tasks.filter(t => selectedView === "personal" ? !t.isGroupTask : t.isGroupTask && t.groupId === selectedView);
  const tasksForDate = filteredByView.filter((t) => t.date === dateStr && t.type !== "deadline");
  const upcomingDeadlines = filteredByView.filter((t) => t.type === "deadline" && isFutureDate(t.date) && !t.completed);
  const completedCount = filteredByView.filter((t) => t.completed).length;
  const openCount = filteredByView.length - completedCount;

  return (
    <>
      <PageHeader
        title="Tasks & Deadlines"
        subtitle="Manage your personal and group tasks all in one place."
      />
      <div className={styles.tasksWrapper}>
        <div className={styles.viewSelector}>
          <button
            className={`${styles.btn} ${selectedView === "personal" ? styles.btnPrimary : styles.btnSecondary}`}
            onClick={() => setSelectedView("personal")}
          >
            My Personal Tasks
          </button>
          {userGroups.map((group) => (
            <button
              key={group.id}
              className={`${styles.btn} ${selectedView === group.id ? styles.btnPrimary : styles.btnSecondary}`}
              onClick={() => setSelectedView(group.id)}
            >
              {group.name}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            {showForm ? (
              <TaskForm
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditingTask(null); }}
                taskToEdit={editingTask}
                userGroups={userGroups}
              />
            ) : (
              <>
                <div className={styles.sectionTitle}>
                  Tasks for <b>{selectedDate.toLocaleDateString()}</b>
                </div>
                <Tasklist
                  tasks={tasksForDate}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                <div className={styles.sectionTitle}>Upcoming Deadlines</div>
                <Tasklist
                  tasks={upcomingDeadlines}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.sectionTitle}>Your Calendar</div>
            <MyCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              tasks={filteredByView}
            />
            <div className={styles.sectionTitle}>Progress Overview</div>
            <div className={styles.overview}>
              <div>Open Tasks: {openCount}</div>
              <div>Completed Tasks: {completedCount}</div>
            </div>
            <div className={styles.sectionTitle}>Quick Actions</div>
            <div className={styles.actionsRow}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAddNewClick}>
                Create New Task
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleChatSupport}>
                Chat Support
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}