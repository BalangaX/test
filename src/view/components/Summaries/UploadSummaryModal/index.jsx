import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { storage, db } from '../../../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './UploadSummaryModal.module.css'; // Import

const UploadSummaryModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) { setError('You must be logged in.'); return; }
    if (!file) { setError('Please select a file.'); return; }
    if (!title.trim() || !course.trim()) { setError('Title and Course are required.'); return; }

    setUploading(true); setError('');
    try {
      const storageRef = ref(storage, `summaries/${currentUser.uid}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        () => {}, // Progress
        (uploadError) => {
          setError(`File upload failed: ${uploadError.message}`); setUploading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, 'summaries'), {
              title, course, description, fileUrl: downloadURL, fileName: file.name,
              authorId: currentUser.uid, authorEmail: currentUser.email,
              status: 'pending', uploadedAt: serverTimestamp(),
            });
            alert('Summary uploaded successfully! It will be reviewed.');
            setUploading(false); onClose();
            setTitle(''); setCourse(''); setFile(null); setDescription('');
          } catch (firestoreError) {
            setError(`Failed to save summary: ${firestoreError.message}`); setUploading(false);
          }
        }
      );
    } catch (e) {
      setError('Upload initiation error.'); setUploading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>Upload New Summary</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="titleS">Title:</label>
            <input type="text" id="titleS" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="courseS">Course (e.g., CS101):</label>
            <input type="text" id="courseS" value={course} onChange={e => setCourse(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descriptionS">Description (Optional):</label>
            <textarea id="descriptionS" value={description} onChange={e => setDescription(e.target.value)} rows="3"></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fileS">Summary File (PDF, DOC, DOCX):</label>
            <input type="file" id="fileS" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={uploading}>Cancel</button>
            <button type="submit" className={styles.submitButton} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Submit for Approval'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UploadSummaryModal;
