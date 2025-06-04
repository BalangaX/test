import { useState } from 'react';

const SupportForm = () => {
  const [message, setMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    alert(`Message sent: ${message}`);
    setMessage('');
  };

  return (
    <form onSubmit={submit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" />
      <button type="submit">Send</button>
    </form>
  );
};

export default SupportForm;
