import React, { useState } from 'react';
import StudentCard from '../StudentCard';
import RatingsList from '../RatingsList';

const postItemStyle = { border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#fff' };
const commentStyle = { borderTop: '1px solid #eee', padding: '10px', marginTop: '10px', marginLeft: '20px', backgroundColor: '#f9f9f9' };
const commentFormStyle = { marginTop: '10px', display: 'flex', gap: '10px' };

const PostItem = ({ post, currentUser, mockUsers, onAddComment, onToggleLike }) => {
  const [newComment, setNewComment] = useState('');

  if (!post) return null;
  const authorDetails = mockUsers[post.authorId] || { name: post.authorEmail || 'Unknown User', avatar: '' };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(post.id, newComment)
      .then(() => setNewComment(''))
      .catch(err => alert(`Error adding comment: ${err.message}`));
  };

  const handleLikePost = () => {
    onToggleLike('social_posts', post.id, post.likes || []);
  };

  return (
    <div style={postItemStyle}>
      <StudentCard user={authorDetails} />
      <h4 style={{ marginTop: '10px' }}>{post.title}</h4>
      <p>{post.content}</p>
      <small>Posted: {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Recently'}</small>
      <RatingsList
        likes={post.likes || []}
        onLikeUnlike={handleLikePost}
        currentUserId={currentUser?.uid}
      />

      <div style={{ marginTop: '15px' }}>
        <h5>Comments ({post.comments ? post.comments.length : 0}):</h5>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => {
            const commentAuthorDetails = mockUsers[comment.authorId] || { name: comment.authorEmail || 'Unknown User', avatar: '' };
            const handleLikeComment = () => {
              onToggleLike(`social_posts/${post.id}/comments`, comment.id, comment.likes || []);
            };
            return (
              <div key={comment.id} style={commentStyle}>
                <StudentCard user={commentAuthorDetails} />
                <p style={{margin: '5px 0'}}>{comment.text}</p>
                <small>Commented: {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Recently'}</small>
                <RatingsList
                  likes={comment.likes || []}
                  onLikeUnlike={handleLikeComment}
                  currentUserId={currentUser?.uid}
                />
              </div>
            );
          })
        ) : (
          <p><small>No comments yet.</small></p>
        )}
        {currentUser && (
          <form onSubmit={handleAddComment} style={commentFormStyle}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ flexGrow: 1, padding: '8px' }}
            />
            <button type="submit">Comment</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostItem;
