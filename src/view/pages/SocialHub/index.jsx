import { useState } from 'react';
import NewPostForm from '../../components/SocialHub/NewPostForm';
import StudentCard from '../../components/SocialHub/StudentCard';

const SocialHub = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (text) => {
    setPosts([text, ...posts]);
  };

  return (
    <div>
      <h1>Social Hub</h1>
      <NewPostForm onAdd={addPost} />
      {posts.map((p, idx) => (
        <StudentCard key={idx} post={p} />
      ))}
    </div>
  );
};

export default SocialHub;
