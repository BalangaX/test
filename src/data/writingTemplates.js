// src/data/writingTemplates.js

// Helper function to generate unique IDs
const generateId = () => `template_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export const writingTemplates = [
  {
    id: generateId(),
    name: "Essay Outline",
    description: "A standard 5-paragraph essay outline to structure your thoughts.",
    templateContent: `**I. Introduction**
   A. Hook (e.g., startling statistic, relevant quote, anecdote)
   B. Background Information (briefly introduce the topic)
   C. Thesis Statement (main argument of the essay)

**II. Body Paragraph 1 (Supporting Point 1)**
   A. Topic Sentence (introduces the first supporting point)
   B. Evidence/Examples (facts, statistics, examples, quotes)
   C. Explanation/Analysis (how the evidence supports the topic sentence)
   D. Concluding/Transition Sentence

**III. Body Paragraph 2 (Supporting Point 2)**
   A. Topic Sentence
   B. Evidence/Examples
   C. Explanation/Analysis
   D. Concluding/Transition Sentence

**IV. Body Paragraph 3 (Supporting Point 3 - or Counter-Argument & Rebuttal)**
   A. Topic Sentence
   B. Evidence/Examples
   C. Explanation/Analysis
   D. Concluding/Transition Sentence

**V. Conclusion**
   A. Restate Thesis (in different words)
   B. Summarize Main Points
   C. Concluding Statement (broader implication, call to action, final thought)
`,
    exampleFeedback: [
      "Ensure your thesis statement is clear and arguable.",
      "Does each body paragraph have a strong topic sentence?",
      "Is your evidence relevant and well-explained?",
      "Check for smooth transitions between paragraphs.",
      "Does your conclusion effectively summarize and provide a final thought without introducing new information?"
    ],
  },
  {
    id: generateId(),
    name: "Email to Professor",
    description: "A formal email template for contacting your professor.",
    templateContent: `Subject: [Course Code] - [Your Name] - [Brief Reason for Email, e.g., Question about Assignment 1]

Dear Professor [Professor's Last Name],

I hope this email finds you well.

My name is [Your Name], and I am a student in your [Course Name] ([Course Code]), [Day(s) of Week] at [Time] class.

I am writing to you because [Clearly state your reason for writing - e.g., I have a question about..., I would like to request an extension for..., I am seeking clarification on...].

[Provide any necessary details, context, or specific questions here. Be concise and clear.]

Thank you for your time and consideration. I look forward to your response.

Sincerely,

[Your Name]
[Your Student ID Number]
`,
    exampleFeedback: [
      "Is the subject line clear and informative?",
      "Have you addressed the professor correctly and formally?",
      "Clearly state your name, course, and the reason for your email.",
      "Is your request or question specific and easy to understand?",
      "Maintain a respectful and professional tone throughout the email.",
      "Proofread for any typos or grammatical errors before sending."
    ],
  },
  {
    id: generateId(),
    name: "Lab Report Structure",
    description: "A general structure for writing a scientific lab report.",
    templateContent: `**Title:** [Descriptive Title of Your Experiment]

**Abstract:**
   - Brief summary of the experiment's purpose, methods, key findings, and conclusions. (Usually written last)

**1. Introduction:**
   - Background information on the topic.
   - Statement of the problem or question being investigated.
   - Objectives/Purpose of the experiment.
   - Hypothesis (if applicable).

**2. Materials and Methods:**
   - Detailed list of materials used.
   - Step-by-step description of the procedure followed. (Clear enough for someone else to replicate)

**3. Results:**
   - Presentation of data (e.g., tables, graphs, figures, observations).
   - Do not interpret the results here, just present them objectively.

**4. Discussion:**
   - Interpretation of results: What do your findings mean?
   - Relate findings back to the objectives and hypothesis.
   - Discuss any errors, limitations, or unexpected outcomes.
   - Suggestions for future research or improvements.

**5. Conclusion:**
   - Brief summary of the main findings and their significance.
   - Reiterate whether the hypothesis was supported or refuted.

**6. References:**
   - List all sources cited in the report, following a specific citation style (e.g., APA, MLA, Chicago).

**(Optional: Appendices)**
   - Raw data, detailed calculations, etc.
`,
    exampleFeedback: [
      "Is your title clear and descriptive of the experiment?",
      "Does the abstract concisely cover all main sections of the report?",
      "Is the introduction well-referenced and does it clearly state the purpose and hypothesis?",
      "Are the materials and methods detailed enough for replication?",
      "Are results presented clearly (e.g., labeled graphs/tables) without interpretation?",
      "Does the discussion thoroughly analyze the results and address the hypothesis?",
      "Is the conclusion supported by your findings?",
      "Are all references correctly cited and listed?"
    ],
  },
  {
    id: generateId(),
    name: "Meeting Agenda",
    description: "A template for structuring a productive meeting.",
    templateContent: `**Meeting Title:** [Purpose of the Meeting]
**Date:** [Date of Meeting]
**Time:** [Start Time] - [End Time]
**Location/Platform:** [Physical Location or Virtual Meeting Link]

**Attendees:** [List of expected attendees]
**Optional Attendees:** [List if any]
**Meeting Facilitator:** [Name]
**Note Taker:** [Name]

**1. Call to Order / Welcome (5 min)**
   - Brief welcome and check-in.
   - Review agenda and meeting objectives.

**2. Approval of Previous Minutes (if applicable) (5 min)**
   - Review and approve minutes from the last meeting.

**3. Old Business / Action Item Review (10-15 min)**
   - [Old Business Item 1 - responsible person, status]
   - [Old Business Item 2 - responsible person, status]

**4. New Business / Discussion Topics (30-40 min)**
   A. [Topic 1 - Presenter/Lead, Time Allotted]
      - [Brief description or key questions to address]
   B. [Topic 2 - Presenter/Lead, Time Allotted]
      - [Brief description or key questions to address]
   C. [Topic 3 - Presenter/Lead, Time Allotted]
      - [Brief description or key questions to address]

**5. Action Items / Next Steps (5-10 min)**
   - Summarize decisions made.
   - Assign new action items (What, Who, When).

**6. Next Meeting (if applicable) (2 min)**
   - Confirm date and time for the next meeting.
   - Suggest agenda items for the next meeting.

**7. Adjournment**
`,
    exampleFeedback: [
      "Is the meeting title clear and action-oriented?",
      "Are all necessary logistical details (date, time, location) included?",
      "Have time allocations for each agenda item been considered?",
      "Are discussion topics clearly defined with expected outcomes or questions?",
      "Is there a clear process for capturing action items?",
      "Does the agenda allow for participant engagement?"
    ],
  },
];

export default writingTemplates;
