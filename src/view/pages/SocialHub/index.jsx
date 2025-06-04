import React, { useState } from 'react';
import { FaUserCircle, FaHeart, FaRegHeart, FaCommentDots } from 'react-icons/fa';
import initialSocialPosts from '../../../data/socialPosts';
import NewPostForm from '../../components/SocialHub/NewPostForm';
import styles from './style.module.css';

// Helper function to generate unique IDs
const generateId = (prefix = 'post') => `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

// Helper function to format timestamp (basic example)
const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return `Yesterday`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};


export default function SocialHubPage() {
  const [posts, setPosts] = useState(() => 
    initialSocialPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  );
  // For new comment input
  const [newCommentText, setNewCommentText] = useState(''); 
  const [commentingPostId, setCommentingPostId] = useState(null);


  const handleAddPost = (content) => {
    const newPost = {
      id: generateId(),
      author: "CurrentUser", // Placeholder for logged-in user
      avatar: null, // CurrentUser's avatar or default
      timestamp: new Date().toISOString(),
      content,
      likes: 0,
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLikePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1, likedByMe: true } : post // likedByMe is a temporary client-side toggle
      )
    );
  };
  
  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      commentId: generateId('comment'),
      commentAuthor: "CurrentUser", // Placeholder
      commentAvatar: null,
      commentText,
      commentTimestamp: new Date().toISOString(),
    };
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
    setNewCommentText(''); // Clear input after submitting
    setCommentingPostId(null); // Close comment input for this post
  };


  return (
    <div className={styles.socialHubContainer}>
      <header className={styles.header}>
        <h1>Social Hub</h1>
        <p>Connect and collaborate with your peers.</p>
      </header>

      <NewPostForm onAddPost={handleAddPost} />

      <section className={styles.postFeed}>
        {posts.map(post => (
          <article key={post.id} className={styles.postItem}>
            <header className={styles.postHeader}>
              {post.avatar ? (
                <img src={post.avatar} alt={`${post.author}'s avatar`} className={styles.avatar} />
              ) : (
                <FaUserCircle className={styles.avatarDefault} size={40} />
              )}
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.timestamp}>{formatTimestamp(post.timestamp)}</span>
              </div>
            </header>
            <p className={styles.postContent}>{post.content}</p>
            <footer className={styles.postFooter}>
              <button onClick={() => handleLikePost(post.id)} className={styles.actionButton}>
                {post.likedByMe ? <FaHeart color="red"/> : <FaRegHeart />} {post.likes} Likes
              </button>
              <button onClick={() => setCommentingPostId(commentingPostId === post.id ? null : post.id)} className={styles.actionButton}>
                <FaCommentDots /> {post.comments.length} Comments
              </button>
            </footer>
            {commentingPostId === post.id && (
              <div className={styles.commentSection}>
                {post.comments.map(comment => (
                  <div key={comment.commentId} className={styles.comment}>
                    <div className={styles.commentHeader}>
                      {comment.commentAvatar ? <img src={comment.commentAvatar} alt="" className={styles.commentAvatarSmall}/> : <FaUserCircle size={20} className={styles.commentAvatarSmallDefault}/> }
                      <span className={styles.commentAuthor}>{comment.commentAuthor}</span>
                      <span className={styles.commentTimestamp}>{formatTimestamp(comment.commentTimestamp)}</span>
                    </div>
                    <p className={styles.commentText}>{comment.commentText}</p>
                  </div>
                ))}
                <div className={styles.addComment}>
                  <input 
                    type="text" 
                    value={newCommentText} 
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.commentInput}
                  />
                  <button onClick={() => handleAddComment(post.id, newCommentText)} className={styles.commentSubmitButton}>Post</button>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}