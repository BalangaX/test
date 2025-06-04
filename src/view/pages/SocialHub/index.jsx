import React from 'react';
import { Link } from 'react-router-dom'; // Added Link for login prompt
import NewPostForm from '../../components/SocialHub/NewPostForm';
import PostItem from '../../components/SocialHub/PostItem';
import useSocialPosts from '../../../hooks/useSocialPosts';
import { useAuth } from '../../../context/AuthContext';
import { mockUsers } from '../../../data/socialPosts';


const SocialHubPage = () => {
  const { currentUser } = useAuth();
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    addPost,
    addComment,
    toggleLike,
  } = useSocialPosts();

  const handleNewPost = async ({ title, content }) => {
    try {
      await addPost({ title, content });
    } catch (err) {
      alert(`Error creating post: ${err.message}`);
      console.error("Create post error:", err);
    }
  };

  if (!currentUser && !postsLoading) {
    return <div style={{padding: '20px'}}><p>Please <Link to="/auth">login</Link> to access the Social Hub.</p></div>;
  }

  if (postsLoading) {
    return <div style={{padding: '20px'}}><p>Loading posts...</p></div>;
  }

  if (postsError) {
    return <div style={{padding: '20px'}}><p style={{color: 'red'}}>Error loading posts: {postsError}</p></div>;
  }

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
              currentUser={currentUser}
              mockUsers={mockUsers}
              onAddComment={addComment}
              onToggleLike={toggleLike}
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
