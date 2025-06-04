import React from 'react';

const Chat = () => {
  return (
    <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #eee', borderRadius: '5px', height: '200px', overflowY: 'auto' }}>
      <h3>Collaboration Chat</h3>
      <p><small><i>Real-time chat functionality coming soon.</i></small></p>
      {/* Placeholder for chat messages */}
      <div>User A: We need to discuss task T1.</div>
      <div>User B: Sure, I'm available now.</div>
    </div>
  );
};

export default Chat;
