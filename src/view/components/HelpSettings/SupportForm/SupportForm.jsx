import React, { useState } from "react";
import styles from "./SupportForm.module.css";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { query, where, orderBy, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export default function SupportForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [adminResponse, setAdminResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const userId = currentUser ? currentUser.uid : null;
      await addDoc(collection(db, "supportTickets"), {
        message: message,
        userId: userId,
        createdAt: serverTimestamp(),
        adminResponse: ""
      });
      setStatus("Thank you! Your request has been sent to support.");
      setMessage("");
    } catch (error) {
      console.error("Error sending support request:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  React.useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    
    const ticketsQuery = query(
      collection(db, "supportTickets"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      ticketsQuery,
      snapshot => {
        if (!snapshot.empty) {
          const latestData = snapshot.docs[0].data();
          setAdminResponse(latestData.adminResponse || "");
        } else {
          setAdminResponse("");
        }
      },
      err => {
        console.error("Error listening to supportTickets:", err);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Contact Support</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Message</label>
        <textarea
          required
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className={styles.button}>Send</button>
      </form>
      {status && <div className={styles.status}>{status}</div>}
      {adminResponse && (
        <div className={styles.adminResponseSection}>
          <h3 className={styles.adminResponseHeading}>Support Response</h3>
          <p className={styles.adminResponse}>{adminResponse}</p>
        </div>
      )}
    </div>
  );
}