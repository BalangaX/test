import React from 'react';

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #eee',
  borderRadius: '4px',
  marginBottom: '5px',
  backgroundColor: '#f9f9f9',
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '10px',
  objectFit: 'cover',
};

const StudentCard = ({ user }) => {
  if (!user) return <small>Unknown User</small>;

  return (
    <div style={cardStyle}>
      <img src={user.avatar || 'https://i.pravatar.cc/40'} alt={user.name} style={avatarStyle} />
      <div>
        <strong>{user.name}</strong>
        {user.major && <div style={{ fontSize: '0.8em', color: '#555' }}>{user.major}</div>}
      </div>
    </div>
  );
};

export default StudentCard;
