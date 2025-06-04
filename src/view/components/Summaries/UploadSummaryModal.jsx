import { useState } from 'react';

const UploadSummaryModal = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [content, setContent] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onUpload({ title, course, content });
    setTitle('');
    setCourse('');
    setContent('');
  };

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadSummaryModal;
