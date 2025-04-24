// src/data/summaries.js

// Helper function to generate unique IDs (simple version for mock data)
const generateId = () => `summary_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export const initialSummaries = [
  {
    id: generateId(),
    title: "Calculus I - Chapter 3: Derivatives",
    subject: "Mathematics",
    author: "MathWhiz22",
    uploadDate: "2024-07-15",
    previewText: "A comprehensive summary of derivative rules, including chain rule, product rule, and quotient rule, with examples.",
    tags: ["calculus", "derivatives", "mathematics", "chapter 3"],
  },
  {
    id: generateId(),
    title: "Introduction to Quantum Physics - Wave-Particle Duality",
    subject: "Physics",
    author: "QuantumGirl",
    uploadDate: "2024-08-01",
    previewText: "Explores the concept of wave-particle duality, covering key experiments like the double-slit experiment and de Broglie hypothesis.",
    tags: ["physics", "quantum mechanics", "wave-particle duality", "modern physics"],
  },
  {
    id: generateId(),
    title: "Organic Chemistry - Nomenclature and Isomerism",
    subject: "Chemistry",
    author: "ChemMaster",
    uploadDate: "2024-08-05",
    previewText: "Covers IUPAC nomenclature for organic compounds and discusses various types of isomerism (structural, stereoisomerism).",
    tags: ["chemistry", "organic chemistry", "nomenclature", "isomerism"],
  },
  {
    id: generateId(),
    title: "World History - The Renaissance Period",
    subject: "History",
    author: "HistoryBuff",
    uploadDate: "2024-07-20",
    previewText: "An overview of the European Renaissance, focusing on its art, culture, key figures, and impact on society.",
    tags: ["history", "renaissance", "europe", "art history"],
  },
  {
    id: generateId(),
    title: "Introduction to Python Programming - Data Structures",
    subject: "Computer Science",
    author: "CodeNinja",
    uploadDate: "2024-08-10",
    previewText: "Summary of fundamental Python data structures: lists, tuples, dictionaries, and sets, with common operations and use cases.",
    tags: ["python", "programming", "data structures", "computer science", "coding"],
  },
  {
    id: generateId(),
    title: "Microeconomics - Supply and Demand",
    subject: "Economics",
    author: "EconGuru",
    uploadDate: "2024-07-28",
    previewText: "Explains the core principles of supply and demand, market equilibrium, elasticity, and factors affecting them.",
    tags: ["economics", "microeconomics", "supply", "demand", "market theory"],
  },
  {
    id: generateId(),
    title: "Cell Biology - Mitosis and Meiosis",
    subject: "Biology",
    author: "BioStudentX",
    uploadDate: "2024-08-12",
    previewText: "A comparative summary of mitosis and meiosis, detailing the stages and significance of each cell division process.",
    tags: ["biology", "cell biology", "mitosis", "meiosis", "genetics"],
  },
];

export default initialSummaries;
