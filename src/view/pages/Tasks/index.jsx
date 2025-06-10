// src/view/pages/Tasks/index.jsx
import { db } from "../../../firebase/config";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import TaskForm from "../../components/Tasks/TaskForm";
import Tasklist from "../../components/Tasks/Tasklist";
import MyCalendar from "../../components/Tasks/MyCalendar";

const isFutureDate = (taskDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(taskDate) >= today;
};

export default function TasksPage() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]); // This will hold the combined personal and group tasks
  const [personalTasks, setPersonalTasks] = useState([]); // Separate state for personal tasks
  const [groupTasksMap, setGroupTasksMap] = useState({}); // Separate state for group tasks, mapped by groupId
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userGroups, setUserGroups] = useState([]);
  const [selectedView, setSelectedView] = useState("personal"); // 'personal' or group ID

  // Effect to fetch personal tasks
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
    }, (error) => {
      console.error("Error fetching personal tasks:", error);
      setLoading(false);
    });

    return () => unsubPersonal();
  }, [currentUser]);

  // Effect to fetch user groups and their respective tasks
  useEffect(() => {
    if (!currentUser) return;

    const groupListeners = []; // To store unsubscribe functions for group tasks

    const groupsQuery = query(
      collection(db, "studyGroups"),
      where("members", "array-contains", currentUser.uid)
    );
    const unsubGroups = onSnapshot(groupsQuery, (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserGroups(groupsData);

      // Cleanup old group task listeners before setting up new ones
      groupListeners.forEach(unsub => unsub());
      groupListeners.length = 0; // Clear the array

      if (groupsData.length > 0) {
        const newGroupTasksMap = {}; // This variable is locally scoped and might show a warning if not used within this block
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
            setGroupTasksMap(prevMap => ({
              ...prevMap,
              [group.id]: tasksForThisGroup
            }));
          }, (error) => {
            console.error(`Error fetching tasks for group ${group.name}:`, error);
          });
          groupListeners.push(unsub); // Store the unsubscribe function
        });
        // Ensure any groups that are no longer joined have their tasks removed from map
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
        // If no groups, clear all group tasks from map
        setGroupTasksMap({});
      }
    }, (error) => {
      console.error("Error fetching user groups:", error);
    });

    return () => {
      unsubGroups(); // Unsubscribe from groups listener
      groupListeners.forEach(unsub => unsub()); // Unsubscribe from all group tasks listeners
    };
  }, [currentUser]);

  // Effect to combine personal and group tasks into a single 'tasks' state
  useEffect(() => {
    const allGroupTasks = Object.values(groupTasksMap).flat();
    setTasks([...personalTasks, ...allGroupTasks]);
  }, [personalTasks, groupTasksMap]);


  // Handle saving tasks (personal or group)
  const handleSave = async (taskData, assignedGroupId) => {
    const taskDate = selectedDate.toISOString().slice(0, 10);

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

  // Handle toggling task completion (personal or group)
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

  // Handle deleting tasks (personal or group)
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
    alert("Chat support feature is coming soon!");
  };

  if (loading) {
    return <div className={styles.tasksWrapper}>Loading tasks...</div>;
  }
  if (!currentUser) {
    return <div className={styles.tasksWrapper}>Please log in to see your tasks.</div>;
  }

  const dateStr = selectedDate.toISOString().slice(0, 10);

  // Filter tasks based on selectedView
  const filteredByView = tasks.filter(t => {
    if (selectedView === "personal") {
      return !t.isGroupTask;
    } else {
      return t.isGroupTask && t.groupId === selectedView;
    }
  });

  // Now, filter the 'filteredByView' tasks into their respective lists based on 'type'
  const tasksForDate = filteredByView.filter((t) => t.date === dateStr && t.type !== "deadline"); // Exclude deadline tasks from 'Today's Tasks'
  const upcomingDeadlines = filteredByView.filter((t) => t.type === "deadline" && isFutureDate(t.date) && !t.completed); // Only deadline tasks here
  
  // Counts should reflect the currently displayed tasks
  const completedCount = filteredByView.filter((t) => t.completed).length;
  const openCount = filteredByView.length - completedCount;


  return (
    <div className={styles.tasksWrapper}>
      <h1 className={styles.title}>Learning & Tasks Management</h1>
      <p className={styles.subtitle}>Your Personalized Learning Dashboard</p>

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
            {group.name} Tasks
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
              userGroups={userGroups} // Pass user groups to TaskForm
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
  );
}