import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';

const SupportForm = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser ? currentUser.displayName || '' : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email || '' : '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!subject.trim() || !message.trim()){
        alert("Subject and message are required.");
        return;
    }
    // Mock submission
    console.log({ name, email, subject, message });
    alert('Support request submitted (mock)! We will get back to you soon.');
    // Reset form
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <h3>Contact Support</h3>
      <p>If you have any issues or questions not covered in the FAQ, please fill out the form below.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="supportName">Name:</label>
          <input
            type="text"
            id="supportName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
            disabled={!!currentUser} // Disable if logged in and prefilled
          />
        </div>
        <div>
          <label htmlFor="supportEmail">Email:</label>
          <input
            type="email"
            id="supportEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
            disabled={!!currentUser} // Disable if logged in and prefilled
          />
        </div>
        <div>
          <label htmlFor="supportSubject">Subject:</label>
          <input
            type="text"
            id="supportSubject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div>
          <label htmlFor="supportMessage">Message:</label>
          <textarea
            id="supportMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', alignSelf: 'flex-start' }}>Send Message</button>
      </form>
    </div>
  );
};

export default SupportForm;
