import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { storage, db } from '../../../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Styles (can be moved to a CSS module)
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' };

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
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to upload summaries.');
      return;
    }
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    if (!title.trim() || !course.trim()) {
      setError('Title and Course are required.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // 1. Upload file to Firebase Storage
      const storageRef = ref(storage, `summaries/${currentUser.uid}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Optional: Observe state change events such as progress, pause, and resume
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        },
        (uploadError) => {
          console.error("Upload error:", uploadError);
          setError(`File upload failed: ${uploadError.message}`);
          setUploading(false);
        },
        async () => {
          // Handle successful uploads on complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // 2. Add summary metadata to Firestore
            await addDoc(collection(db, 'summaries'), {
              title,
              course,
              description,
              fileUrl: downloadURL,
              fileName: file.name, // Store original file name
              authorId: currentUser.uid,
              authorEmail: currentUser.email, // For easier display if needed
              status: 'pending', // Initial status
              uploadedAt: serverTimestamp(),
              // Add any other relevant fields: likes, views, etc.
            });

            alert('Summary uploaded successfully! It will be reviewed by an admin.');
            setUploading(false);
            onClose();
            // Reset form
            setTitle(''); setCourse(''); setFile(null); setDescription('');
          } catch (firestoreError) {
            console.error("Firestore error:", firestoreError);
            setError(`Failed to save summary data: ${firestoreError.message}`);
            // Potentially delete the uploaded file from storage if firestore fails
            setUploading(false);
          }
        }
      );
    } catch (e) {
      console.error("Initial error:", e);
      setError('An unexpected error occurred during upload initiation.');
      setUploading(false);
    }
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <h2>Upload New Summary</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titleS">Title:</label>
            <input type="text" id="titleS" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="courseS">Course (e.g., CS101):</label>
            <input type="text" id="courseS" value={course} onChange={e => setCourse(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="descriptionS">Description:</label>
            <textarea id="descriptionS" value={description} onChange={e => setDescription(e.target.value)} rows="3"></textarea>
          </div>
          <div>
            <label htmlFor="fileS">Summary File (PDF, DOCX):</label>
            <input type="file" id="fileS" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit for Approval'}
          </button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }} disabled={uploading}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UploadSummaryModal;
