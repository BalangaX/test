// src/data/tasks.js

// Helper function to generate unique IDs (simple version for mock data)
const generateId = () => `task_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export const initialTasks = [
  {
    id: generateId(),
    title: "Complete History Reading Chapter 5",
    description: "Focus on the causes of World War I, take detailed notes on key figures and treaties. Prepare summary for study group.",
    dueDate: "2024-08-15",
    completed: false,
    priority: "High",
  },
  {
    id: generateId(),
    title: "Mathematics Assignment - Algebra II",
    description: "Solve problems 1-10 on page 78. Show all working steps. Check answers with the solutions at the back of the book.",
    dueDate: "2024-08-10",
    completed: true,
    priority: "High",
  },
  {
    id: generateId(),
    title: "Prepare Presentation for Biology",
    description: "Create a 10-slide presentation on cellular respiration. Include diagrams and key terminology. Rehearse timing.",
    dueDate: "2024-08-20",
    completed: false,
    priority: "Medium",
  },
  {
    id: generateId(),
    title: "Group Project - Literature Review",
    description: "Coordinate with team members to finalize the literature review section. Compile references and format citations.",
    dueDate: "2024-08-25",
    completed: false,
    priority: "Medium",
  },
  {
    id: generateId(),
    title: "Practice French Vocabulary",
    description: "Review flashcards for units 3 and 4. Focus on verb conjugations and new nouns. Use online quiz tool for self-assessment.",
    dueDate: "2024-08-12",
    completed: true,
    priority: "Low",
  },
];

export default initialTasks;
