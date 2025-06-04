import React from 'react';

const RatingsList = ({ likes, itemId, onLikeUnlike, currentUserId }) => {
  const handleLike = () => {
    onLikeUnlike(itemId, currentUserId);
  };

  const hasLiked = likes && currentUserId ? likes.includes(currentUserId) : false;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
      <span>{likes ? likes.length : 0} Likes</span>
      {currentUserId && ( // Only show like button if a user is "logged in"
        <button onClick={handleLike} style={{ padding: '3px 8px', fontSize: '0.8em' }}>
          {hasLiked ? 'Unlike' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default RatingsList;
