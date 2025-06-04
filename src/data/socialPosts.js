// Mock data for Social Hub
export const mockUsers = {
  'user1': { name: 'Alice Wonderland', major: 'Literature', avatar: 'https://i.pravatar.cc/50?u=user1' },
  'user2': { name: 'Bob The Builder', major: 'Engineering', avatar: 'https://i.pravatar.cc/50?u=user2' },
  'user3': { name: 'Charlie Brown', major: 'Art History', avatar: 'https://i.pravatar.cc/50?u=user3' }
  // Add more mock users if needed, or integrate with a users collection in Firestore
};

// mockPosts are now fetched from Firestore via useSocialPosts hook
export const mockPosts = [];

export default { mockUsers, mockPosts };
