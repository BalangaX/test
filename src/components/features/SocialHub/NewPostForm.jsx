import React, { useState } from 'react';
import styles from './NewPostForm.module.css'; // To be created in Step 5

const NewPostForm = ({ onAddPost }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim()) {
      alert('Post content cannot be empty.');
      return;
    }
    onAddPost(postContent);
    setPostContent(''); // Clear textarea after submission
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
