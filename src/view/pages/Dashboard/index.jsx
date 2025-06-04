import { tasks } from '../../data/tasks';

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <h2>Upcoming Tasks</h2>
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>{t.title} - {t.due}</li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
