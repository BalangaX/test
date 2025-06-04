import { useState } from 'react';
import { summaries as initial } from '../../data/summaries';

const Admin = () => {
  const [summaries, setSummaries] = useState(initial);

  const approve = (id) => {
    setSummaries(
      summaries.map((s) => (s.id === id ? { ...s, approved: true } : s))
    );
  };

  const pending = summaries.filter((s) => !s.approved);

  return (
    <div>
      <h1>Admin</h1>
      {pending.length === 0 ? (
        <p>No pending summaries</p>
      ) : (
        <ul>
          {pending.map((s) => (
            <li key={s.id}>
              {s.title} <button onClick={() => approve(s.id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
