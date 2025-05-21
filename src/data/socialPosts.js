// src/data/socialPosts.js
import { FaUserCircle } from 'react-icons/fa'; // Using a default user icon

// Helper function to generate unique IDs
const generateId = (prefix = 'post') => `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export const initialSocialPosts = [
  {
    id: generateId(),
    author: "AliceWonder",
    avatar: null, // Will use FaUserCircle as a fallback in the component
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    content: "Just finished the Calculus I midterm! Anyone else find question 5 super tricky? 😅 #calculus #midterms",
    likes: 15,
    comments: [
      {
        commentId: generateId('comment'),
        commentAuthor: "BobTheBuilder",
        commentAvatar: null,
        commentText: "Totally! Question 5 was a curveball. Spent ages on it.",
        commentTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
      },
      {
        commentId: generateId('comment'),
        commentAuthor: "CharlieBrown",
        commentAvatar: null,
        commentText: "I agree, tricky one! But glad it's over. How did everyone else do?",
        commentTimestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(), // 50 minutes ago
      },
    ],
  },
  {
    id: generateId(),
    author: "StudyGroupLead",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    content: "Reminder: Our study group for Organic Chemistry is meeting tomorrow at 3 PM in Library Room B. We'll be covering nomenclature. Bring your notes! 📚 #orgochem #studygroup",
    likes: 22,
    comments: [
      {
        commentId: generateId('comment'),
        commentAuthor: "AliceWonder",
        commentAvatar: null,
        commentText: "Thanks for the reminder! See you there.",
        commentTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      },
    ],
  },
  {
    id: generateId(),
    author: "PhysicsFan",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    content: "Anyone have good resources for understanding wave-particle duality? My mind is boggled. 🤯 #physics #quantum",
    likes: 8,
    comments: [],
  },
  {
    id: generateId(),
    author: "CodeNewbie",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    content: "Just started learning Python! Any tips for a beginner? What are some must-know libraries for data science? #python #coding #datascience",
    likes: 12,
    comments: [
      {
        commentId: generateId('comment'),
        commentAuthor: "DataDave",
        commentAvatar: null,
        commentText: "Welcome to Python! For data science, definitely check out Pandas, NumPy, and Matplotlib/Seaborn to start. Good luck!",
        commentTimestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
      },
    ],
  },
  {
    id: generateId(),
    author: "BookwormBella",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 * 1).toISOString(), // 2 days ago
    content: "Looking for recommendations for good historical fiction novels related to the Renaissance period. Any suggestions?",
    likes: 18,
    comments: [],
  },
];

export default initialSocialPosts;
