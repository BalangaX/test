import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from "./CreateGroupForm.module.css";

export default function CreateGroupForm() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !topic.trim()) {
      setError("Please provide both a group name and topic.");
      return;
    }
    if (!currentUser) {
      setError("You must be logged in to create a group.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "studyGroups"), {
        name: name.trim(),
        topic: topic.trim(),
        description: description.trim(),
        ownerUid: currentUser.uid,
        members: [currentUser.uid],
        createdAt: serverTimestamp(),
        isPublic: true,
      });
      setName("");
      setTopic("");
      setDescription("");
    } catch (err) {
      setError("Failed to create group. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Study Group</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.field}>
        <label>Group Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label>Topic</label>
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label>Description (optional)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
}
