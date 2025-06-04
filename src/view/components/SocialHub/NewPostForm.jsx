import { useState } from 'react';

const NewPostForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form onSubmit={submit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Say something" />
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPostForm;
