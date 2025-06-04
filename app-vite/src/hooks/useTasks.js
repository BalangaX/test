import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot, // For real-time updates
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const useTasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const tasksCollection = collection(db, 'tasks');
    // Query tasks assigned to the current user, order by creation time
    const q = query(
      tasksCollection,
      where('assigneeId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const fetchedTasks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Timestamps to JS Dates
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(),
          dueDate: doc.data().dueDate?.toDate ? doc.data().dueDate.toDate() : null,
        }));
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching tasks:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [currentUser]);

  const addTask = useCallback(async (taskData) => {
    if (!currentUser) throw new Error("User not authenticated");
    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        assigneeId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error adding task:", err);
      throw err;
    }
  }, [currentUser]);

  const updateTask = useCallback(async (taskId, updatedData) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating task status:", err);
      throw err;
    }
  }, []);


  return { tasks, loading, error, addTask, updateTask, deleteTask, updateTaskStatus };
};

export default useTasks;
