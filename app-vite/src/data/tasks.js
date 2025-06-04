// Mock data for tasks
// status can be 'todo', 'inprogress', 'done'
export const mockTasks = [
  {
    id: 't1',
    title: 'Finish React component for dashboard',
    description: 'Complete the main UI and state logic for the dashboard summary cards.',
    status: 'inprogress',
    dueDate: new Date('2023-12-15T23:59:59Z'),
    priority: 'high',
    assignee: 'user1@example.com' // Or a user ID
  },
  {
    id: 't2',
    title: 'Research Firebase Firestore integration',
    description: 'Look into best practices for structuring data and security rules.',
    status: 'todo',
    dueDate: new Date('2023-12-20T23:59:59Z'),
    priority: 'medium',
    assignee: 'user2@example.com'
  },
  {
    id: 't3',
    title: 'Write unit tests for AuthContext',
    description: 'Ensure all authentication functions are thoroughly tested.',
    status: 'todo',
    dueDate: new Date('2023-12-18T23:59:59Z'),
    priority: 'high',
    assignee: 'user1@example.com'
  },
  {
    id: 't4',
    title: 'Deploy initial version to staging',
    description: 'Setup CI/CD pipeline and deploy the current build.',
    status: 'done',
    dueDate: new Date('2023-12-01T23:59:59Z'),
    priority: 'low',
    assignee: 'user3@example.com'
  }
];

export default mockTasks;
