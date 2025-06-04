import React, { useState, useEffect } from 'react';
import NewPostForm from '../../components/SocialHub/NewPostForm';
import PostItem from '../../components/SocialHub/PostItem';
import { mockUsers, mockPosts as initialPosts } from '../../../data/socialPosts';
import { useAuth } from '../../../context/AuthContext'; // To get current user for interactions

const SocialHubPage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  // Simulate current user ID - in a real app, this comes from AuthContext
  // For mock purposes, let's assume currentUser from AuthContext has an 'uid' property
  // or we can pick one from mockUsers if currentUser is null/doesn't match.
  const currentMockUserId = currentUser ? (Object.keys(mockUsers).find(uid => mockUsers[uid].name.split(' ')[0].toLowerCase() === currentUser.email.split('@')[0]) || 'user1') : 'user1';


  useEffect(() => {
    // Initialize posts, perhaps sort by timestamp
    setPosts(initialPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  const handleNewPost = ({ title, content }) => {
    const newPost = {
      id: `post${Date.now()}`,
      authorId: currentMockUserId, // Use the mock user ID
      timestamp: new Date(),
      title,
      content,
      likes: [],
      comments: []
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLikeUnlike = (itemId, userId, type = 'post') => {
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (type === 'post' && p.id === itemId) {
          const likes = p.likes.includes(userId)
            ? p.likes.filter(uid => uid !== userId)
            : [...p.likes, userId];
          return { ...p, likes };
        } else if (type === 'comment' && p.comments) {
          // itemId for comments is expected as "postId-commentId"
          const [postId, commentId] = itemId.split('-');
          if (p.id === postId) {
            const comments = p.comments.map(c => {
              if (c.id === commentId) {
                const likes = c.likes.includes(userId)
                  ? c.likes.filter(uid => uid !== userId)
                  : [...c.likes, userId];
                return { ...c, likes };
              }
              return c;
            });
            return { ...p, comments };
          }
        }
        return p;
      })
    );
  };

  const handleLikeUnlikePost = (postId, userId) => handleLikeUnlike(postId, userId, 'post');
  const handleLikeUnlikeComment = (commentFullId, userId) => handleLikeUnlike(commentFullId, userId, 'comment');


  return (
    <div style={{ padding: '20px' }}>
      <h1>Social Hub</h1>
      <p>Connect with other students, discuss topics, and share resources.</p>

      {currentUser && <NewPostForm onSubmit={handleNewPost} />}

      <div style={{ marginTop: '30px' }}>
        <h2>Recent Posts</h2>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onLikeUnlikePost={handleLikeUnlikePost}
              onLikeUnlikeComment={handleLikeUnlikeComment}
              currentUserId={currentMockUserId} // Pass the mock user ID for like functionality
            />
          ))
        ) : (
          <p>No posts yet. Be the first to create one!</p>
        )}
      </div>
    </div>
  );
};

export default SocialHubPage;
