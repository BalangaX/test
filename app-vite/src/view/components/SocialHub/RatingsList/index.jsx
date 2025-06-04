import React from 'react';

const RatingsList = ({ likes = [], onLikeUnlike, currentUserId }) => {
  const handleLike = () => {
    if (onLikeUnlike) {
      onLikeUnlike();
    }
  };

  const hasLiked = currentUserId ? likes.includes(currentUserId) : false;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
      <span>{likes.length} Likes</span>
      {currentUserId && onLikeUnlike && (
        <button onClick={handleLike} style={{ padding: '3px 8px', fontSize: '0.8em' }}>
          {hasLiked ? 'Unlike' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default RatingsList;
