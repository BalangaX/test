import React, { useState } from "react";
import styles from "./style.module.css";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/config";
import { useAuth } from "../../../../context/AuthContext";

export default function UploadSummaryModal({ onClose, onSend }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileURL = "";
      if (file) {
        const path = `summaries/${Date.now()}_${file.name}`;
        const ref = storageRef(storage, path);
        await uploadBytes(ref, file);
        fileURL = await getDownloadURL(ref);
      }
      await onSend({
        ...form,
        pdfURL: fileURL,
        author: currentUser?.username || currentUser?.email || "Anonymous",
        uploadDate: Date.now(),
        rating: 0,
        status: "pending",
      });
      await onSend({
        ...form,
        pdfURL: fileURL,
        author: currentUser?.username || currentUser?.email || "Anonymous",
        uploadDate: Date.now(),
        rating: 0,
        status: "pending",
      });
      onClose();
    } catch (err) {
      console.error('UploadSummaryModal: handleSubmit error', err);
      alert('Error uploading summary: ' + err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>Upload New Summary</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Upload PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              required
            />
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.send}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}