// Mock data for Social Hub
export const mockUsers = {
  'user1': { name: 'Alice Wonderland', major: 'Literature', avatar: 'https://i.pravatar.cc/50?u=user1' },
  'user2': { name: 'Bob The Builder', major: 'Engineering', avatar: 'https://i.pravatar.cc/50?u=user2' },
  'user3': { name: 'Charlie Brown', major: 'Art History', avatar: 'https://i.pravatar.cc/50?u=user3' }
};

export const mockPosts = [
  {
    id: 'post1',
    authorId: 'user1',
    timestamp: new Date('2023-11-10T10:00:00Z'),
    title: 'Discussion: Best study spots on campus?',
    content: 'I\'m looking for quiet places to study for finals. Any recommendations?',
    likes: ['user2', 'user3'], // User IDs who liked the post
    comments: [
      {
        id: 'comment1',
        authorId: 'user2',
        content: 'The library\'s third floor is usually very quiet!',
        timestamp: new Date('2023-11-10T10:05:00Z'),
        likes: ['user1']
      },
      {
        id: 'comment2',
        authorId: 'user3',
        content: 'I agree with Bob, also the graduate student lounge if you can get access.',
        timestamp: new Date('2023-11-10T11:00:00Z'),
        likes: []
      }
    ]
  },
  {
    id: 'post2',
    authorId: 'user2',
    timestamp: new Date('2023-11-12T14:30:00Z'),
    title: 'Need help with Calculus II problem set',
    content: 'Struggling with question 5 on the latest problem set. It\'s about series convergence. Anyone figured it out?',
    likes: ['user1'],
    comments: [
        {
        id: 'comment3',
        authorId: 'user1',
        content: 'I found a good video on YouTube that explains it well. Want the link?',
        timestamp: new Date('2023-11-12T15:00:00Z'),
        likes: ['user2']
      }
    ]
  }
];

export default { mockUsers, mockPosts };
