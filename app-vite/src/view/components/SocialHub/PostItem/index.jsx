import React from 'react';
import StudentCard from '../StudentCard';
import RatingsList from '../RatingsList';
import { mockUsers } from '../../../../data/socialPosts'; // To get user details

const postItemStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: '#fff',
};

const commentStyle = {
  borderTop: '1px solid #eee',
  padding: '10px',
  marginTop: '10px',
  marginLeft: '20px',
  backgroundColor: '#f9f9f9',
};

const PostItem = ({ post, onLikeUnlikePost, onLikeUnlikeComment, currentUserId }) => {
  if (!post) return null;
  const authorDetails = mockUsers[post.authorId];

  return (
    <div style={postItemStyle}>
      <StudentCard user={authorDetails} />
      <h4 style={{ marginTop: '10px' }}>{post.title}</h4>
      <p>{post.content}</p>
      <small>Posted: {new Date(post.timestamp).toLocaleString()}</small>
      <RatingsList
        likes={post.likes}
        itemId={post.id}
        onLikeUnlike={onLikeUnlikePost}
        currentUserId={currentUserId}
      />

      <div style={{ marginTop: '15px' }}>
        <h5>Comments:</h5>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => {
            const commentAuthorDetails = mockUsers[comment.authorId];
            return (
              <div key={comment.id} style={commentStyle}>
                <StudentCard user={commentAuthorDetails} />
                <p style={{margin: '5px 0'}}>{comment.content}</p>
                <small>Commented: {new Date(comment.timestamp).toLocaleString()}</small>
                <RatingsList
                  likes={comment.likes}
                  itemId={`${post.id}-${comment.id}`} // Unique ID for comment like
                  onLikeUnlike={onLikeUnlikeComment}
                  currentUserId={currentUserId}
                />
              </div>
            );
          })
        ) : (
          <p><small>No comments yet.</small></p>
        )}
        {/* Add a small form here for new comments if desired */}
      </div>
    </div>
  );
};

export default PostItem;
