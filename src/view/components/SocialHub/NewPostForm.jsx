import React, { useState } from 'react';
import styles from './style.module.css'; // To be created in Step 5
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useAuth } from '../../../context/AuthContext';

const NewPostForm = () => {
  const [postContent, setPostContent] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) {
      alert('Post content cannot be empty.');
      return;
    }
    try {
      await addDoc(collection(db, 'posts'), {
        content: postContent,
        authorUid: currentUser.uid,
        authorName: currentUser.username || currentUser.email,
        createdAt: serverTimestamp(),
      });
      setPostContent('');
    } catch (err) {
      console.error('Error adding post:', err);
      alert('Failed to post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newPostForm}>
      <textarea
        className={styles.postTextarea}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind, StudyBuddy?"
        rows="4"
      />
      <button type="submit" className={styles.submitButton}>Post</button>
    </form>
  );
};

export default NewPostForm;
