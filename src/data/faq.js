// src/data/faq.js

// Helper function to generate unique IDs
const generateId = (prefix = 'faq') => `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export const faqData = [
  {
    id: generateId(),
    question: "How do I add a new task to my task list?",
    answer: "Navigate to the 'Tasks' page. You'll find an 'Add New Task' button, usually at the top of the page. Click it, fill in the task details in the form that appears, and click 'Add Task' or 'Save'.",
  },
  {
    id: generateId(),
    question: "Can I edit or delete tasks I've already created?",
    answer: "Yes! Each task in your list should have 'Edit' and 'Delete' buttons. Clicking 'Edit' will allow you to modify the task's details. Clicking 'Delete' will remove the task, usually after a confirmation.",
  },
  {
    id: generateId(),
    question: "How does the Writing Assistant work?",
    answer: "The Writing Assistant provides templates (like essay outlines or email formats). Select a template, and its content will appear in the text area. You can then edit it. The 'Get Feedback' button provides predefined suggestions based on the selected template to help you refine your writing.",
  },
  {
    id: generateId(),
    question: "How do I search for summaries in the Summaries Library?",
    answer: "On the 'Summaries Library' page, there's a search bar at the top. You can type keywords related to the title, subject, author, or tags of the summary you're looking for. The list will update automatically as you type.",
  },
  {
    id: generateId(),
    question: "Is my data saved if I close the browser?",
    answer: "Currently, StudyBuddy uses mock data and local state management within your browser session. This means that if you close or refresh your browser, any changes (new tasks, posts, edited profile information) will be lost. Persistent storage is planned for a future update!",
  },
  {
    id: generateId(),
    question: "How can I change my profile information?",
    answer: "Navigate to the 'Help & Settings' page. You'll find a 'User Profile' section with a form where you can update your name, school, and major. Click 'Save Profile' to apply your changes (currently, this is a mock save). Your email is typically not editable.",
  },
  {
    id: generateId(),
    question: "What is the Social Hub for?",
    answer: "The Social Hub is a place to connect with other students. You can share updates, ask questions, and comment on posts made by others. It's designed to foster collaboration and peer support.",
  },
];

export default faqData;
