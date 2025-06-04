// src/hooks/useSummaries.js
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * Hook לשחזור סיכומים שממתינים לאישור.
 * שימוש: const { summaries, addSummary } = useSummaries();
 */
export default function useSummaries() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const summariesRef = collection(db, "summaries");
    const q = query(
      summariesRef,
      where("status", "==", "pending"),
      orderBy("uploadDate", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setSummaries(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => {
        console.error("Error fetching pending summaries:", err);
      }
    );
    return unsubscribe;
  }, []);

  // פונקציה להוספת סיכום חדש לתור האישור
  const addSummary = async (summaryData) => {
    try {
      await addDoc(collection(db, "summaries"), summaryData);
    } catch (err) {
      console.error("Error adding summary:", err);
      throw err;
    }
  };

  return { summaries, addSummary };
}