// Mock data for summaries
// status can be 'pending', 'approved', 'rejected'
export const mockSummaries = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    course: 'CS101',
    author: 'Jane Doe',
    uploadedAt: new Date('2023-10-01T10:00:00Z'),
    status: 'approved',
    fileUrl: '#', // Placeholder
    description: 'A comprehensive summary of React Hooks.'
  },
  {
    id: '2',
    title: 'Advanced Algorithms Chapter 1',
    course: 'CS303',
    author: 'John Smith',
    uploadedAt: new Date('2023-10-15T14:30:00Z'),
    status: 'pending',
    fileUrl: '#',
    description: 'Summary for the first chapter of Advanced Algorithms.'
  },
  {
    id: '3',
    title: 'History of Ancient Civilizations - Part 1',
    course: 'HIST202',
    author: 'Alice Brown',
    uploadedAt: new Date('2023-09-20T09:00:00Z'),
    status: 'approved',
    fileUrl: '#',
    description: 'Covers early human settlements and Mesopotamia.'
  },
  {
    id: '4',
    title: 'Calculus II: Integration Techniques',
    course: 'MATH201',
    author: 'Bob Green',
    uploadedAt: new Date('2023-11-01T11:00:00Z'),
    status: 'rejected',
    fileUrl: '#',
    description: 'A summary on various integration methods. Rejected due to inaccuracies.'
  }
];

export default mockSummaries;
