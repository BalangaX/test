import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function addSummary(summaryData) {
  try {
    await addDoc(collection(db, "summaries"), summaryData);
  } catch (err) {
    console.error("Error adding summary:", err);
    throw err;
  }
}

export default function useSummaries({ status = "approved", subscribe = true } = {}) {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    if (!subscribe) return; // caller only needs helper funcs

    const constraints = [orderBy("uploadDate", "desc")];
    if (status && status !== "*") {
      constraints.unshift(where("status", "==", status));
    }

    const q = query(collection(db, "summaries"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setSummaries(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => {
        console.error(`Error fetching ${status} summaries:`, err);
      }
    );
    return unsubscribe;
  }, [status, subscribe]);

  return { summaries, addSummary };
}