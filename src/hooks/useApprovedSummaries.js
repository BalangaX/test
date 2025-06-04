// src/hooks/useApprovedSummaries.js
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import logger from "../utils/logger.js";

export default function useApprovedSummaries() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const summariesRef = collection(db, "summaries");
    const q = query(
      summariesRef,
      where("status", "==", "approved"),
      orderBy("uploadDate", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setSummaries(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => logger.error("useApprovedSummaries onSnapshot error:", err)
    );
    return unsub;
  }, []);

  return summaries;
}