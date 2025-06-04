import { useState } from 'react';
import { summaries as initial } from '../../data/summaries';
import SummaryFilters from './SummaryFilters';
import UploadSummaryModal from './UploadSummaryModal';

const SummaryTable = () => {
  const [summaries, setSummaries] = useState(initial);
  const [search, setSearch] = useState('');

  const addSummary = ({ title, course, content }) => {
    setSummaries([
      ...summaries,
      { id: summaries.length + 1, title, course, content, approved: false },
    ]);
  };

  const filtered = summaries.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <UploadSummaryModal onUpload={addSummary} />
      <SummaryFilters search={search} onSearch={setSearch} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.title}</td>
              <td>{s.course}</td>
              <td>{s.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
