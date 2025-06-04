import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { mockTasks } from '../../../data/tasks'; // Assuming direct import for simplicity
import useApprovedSummaries from '../../../hooks/useApprovedSummaries';
import { mockPosts, mockUsers } from '../../../data/socialPosts';
import FeatureCard from '../../components/WritingAssistant/FeatureCard'; // Reusing FeatureCard for consistent UI

const dashboardStyle = {
  padding: '20px',
};

const sectionStyle = {
  marginBottom: '30px',
};

const listItemStyle = {
  padding: '8px 0',
  borderBottom: '1px solid #eee',
};

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { summaries: approvedSummaries, loading: summariesLoading } = useApprovedSummaries();

  // Mock current user ID for filtering social posts, similar to SocialHubPage
  const currentMockUserId = currentUser ? (Object.keys(mockUsers).find(uid => mockUsers[uid].name.split(' ')[0].toLowerCase() === currentUser.email.split('@')[0]) || 'user1') : 'user1';

  // Filter tasks for the current user (mock logic)
  // In a real app, tasks would be fetched for the logged-in user
  const userTasks = mockTasks.filter(task => task.assignee === (currentUser ? currentUser.email : 'unassigned') || task.assignee === currentMockUserId);
  const upcomingTasks = userTasks
    .filter(task => task.dueDate && new Date(task.dueDate) >= new Date() && task.status !== 'done')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3); // Show top 3 upcoming

  const inProgressTasksCount = userTasks.filter(task => task.status === 'inprogress').length;

  // Get recent social activity (e.g., user's posts or highly active posts)
  const recentUserPosts = mockPosts
    .filter(post => post.authorId === currentMockUserId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 2); // Show top 2 user posts

  const quickActions = [
    { name: 'Add New Task', link: '/tasks' }, // Link to tasks page, form is there
    { name: 'Upload Summary', link: '/summaries' }, // Link to summaries, modal button is there
    { name: 'Create Social Post', link: '/social-hub' },
    { name: 'View All Tasks', link: '/tasks' },
  ];

  if (!currentUser) {
    return (
      <div style={dashboardStyle}>
        <h1>Dashboard</h1>
        <p>Please <Link to="/auth">login</Link> to view your personalized dashboard.</p>
      </div>
    );
  }

  return (
    <div style={dashboardStyle}>
      <h1>Welcome to your Dashboard, {currentUser.displayName || currentUser.email}!</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Quick Actions Section */}
        <div style={{ flex: '1 1 300px', ...sectionStyle }}>
          <FeatureCard title="Quick Actions">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {quickActions.map(action => (
                <li key={action.name} style={listItemStyle}>
                  <Link to={action.link}>{action.name}</Link>
                </li>
              ))}
            </ul>
          </FeatureCard>
        </div>

        {/* Tasks Overview Section */}
        <div style={{ flex: '1 1 300px', ...sectionStyle }}>
          <FeatureCard title="My Tasks Overview">
            <p><strong>Upcoming Tasks (Top 3):</strong></p>
            {upcomingTasks.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {upcomingTasks.map(task => (
                  <li key={task.id} style={listItemStyle}>
                    <Link to="/tasks">{task.title}</Link> - Due: {new Date(task.dueDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming tasks with due dates.</p>
            )}
            <p style={{marginTop: '10px'}}>Tasks In Progress: <strong>{inProgressTasksCount}</strong></p>
            <Link to="/tasks">Go to Tasks Page</Link>
          </FeatureCard>
        </div>

        {/* Summaries Section */}
        <div style={{ flex: '1 1 300px', ...sectionStyle }}>
          <FeatureCard title="Recent Approved Summaries">
            {summariesLoading ? <p>Loading summaries...</p> : (
              approvedSummaries.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {approvedSummaries.slice(0, 3).map(summary => ( // Show top 3
                    <li key={summary.id} style={listItemStyle}>
                      <Link to="/summaries">{summary.title}</Link> by {summary.author} ({summary.course})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No approved summaries yet.</p>
              )
            )}
            <Link to="/summaries">Go to Summaries Page</Link>
          </FeatureCard>
        </div>

        {/* Social Hub Snippet */}
        <div style={{ flex: '1 1 300px', ...sectionStyle }}>
          <FeatureCard title="My Recent Social Activity">
             {recentUserPosts.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {recentUserPosts.map(post => (
                    <li key={post.id} style={listItemStyle}>
                      <Link to="/social-hub">Your post: "{post.title}"</Link>
                      <br/>
                      <small>Posted on: {new Date(post.timestamp).toLocaleDateString()}</small>
                      <br/>
                      <small>{post.likes.length} likes, {post.comments.length} comments</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You haven't made any posts recently.</p>
              )}
            <Link to="/social-hub">Go to Social Hub</Link>
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
