// Mock data for Writing Assistant
export const paperTypes = [
  { id: 'essay', name: 'Essay' },
  { id: 'research_paper', name: 'Research Paper' },
  { id: 'report', name: 'Report' },
  { id: 'case_study', name: 'Case Study' },
];

export const templates = {
  essay: [
    {
      id: 'essay_basic',
      name: 'Basic Essay Structure',
      content: 'Title\n\nIntroduction (Hook, Background, Thesis Statement)\n\nBody Paragraph 1 (Topic Sentence, Evidence, Explanation)\nBody Paragraph 2 (Topic Sentence, Evidence, Explanation)\nBody Paragraph 3 (Topic Sentence, Evidence, Explanation)\n\nConclusion (Restate Thesis, Summarize Main Points, Final Thought)',
      tips: [
        'Start with a strong hook to grab the reader\'s attention.',
        'Ensure your thesis statement is clear and arguable.',
        'Each body paragraph should focus on a single main idea.',
        'Use transition words and phrases between paragraphs.'
      ]
    },
    {
      id: 'essay_persuasive',
      name: 'Persuasive Essay Outline',
      content: 'Title\n\nIntroduction (Introduce Issue, State Your Position)\n\nArgument 1 (Claim, Evidence, Warrant)\nArgument 2 (Claim, Evidence, Warrant)\nCounter-Argument & Rebuttal\n\nConclusion (Summarize, Call to Action)',
      tips: [
        'Clearly state your position in the introduction.',
        'Support each argument with credible evidence.',
        'Acknowledge and refute counter-arguments effectively.'
      ]
    }
  ],
  research_paper: [
    {
      id: 'rp_literature_review',
      name: 'Literature Review Section',
      content: 'Literature Review\n\nIntroduction to the topic and scope of the review.\n\nThematic discussion of existing literature, identifying gaps and controversies.\n\nConclusion summarizing the state of the research.',
      tips: [
        'Organize your review thematically, not just by author.',
        'Critically analyze the literature, don\'t just summarize.',
        'Identify how your research will contribute to the existing body of knowledge.'
      ]
    }
  ],
  // Add more templates for other paper types
};

export const generalWritingTips = [
  'Always cite your sources properly.',
  'Proofread carefully for grammar and spelling errors.',
  'Maintain a formal and objective tone in academic writing.',
  'Ensure your arguments are well-supported by evidence.',
  'Vary your sentence structure to keep the writing engaging.'
];

export default { paperTypes, templates, generalWritingTips };
