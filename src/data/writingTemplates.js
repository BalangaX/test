// src/data/writingTemplates.js

const writingTemplates = [
   {
     id: 1,
     type: "Academic Essay",
     name: "Standard Outline",
     content: `Introduction:
 - Hook sentence
 - Thesis statement
 
 Body Paragraphs:
 1. Topic sentence
    - Evidence/example
    - Explanation
 2. Topic sentence
    - Evidence/example
    - Explanation
 
 Conclusion:
 - Restate thesis
 - Closing thought`
   },
   {
     id: 2,
     type: "Research Abstract",
     name: "Standard Abstract",
     content: `Background:
 - Context and importance
 
 Objective:
 - Research question
 
 Methods:
 - Brief methodology
 
 Results:
 - Key findings
 
 Conclusion:
 - Interpretation and implications`
   },
   {
     id: 3,
     type: "Lab Report",
     name: "Standard Lab Report",
     content: `Title:
 Objective:
 Materials and Methods:
 Results:
 - Data summary
 Discussion:
 - Interpretation of results
 Conclusion:
 - Summary and future work`
   }
 ];
 
 export default writingTemplates;

// Unique list of paper types, useful for the PaperTypeSelect component
export const paperTypes = [...new Set(writingTemplates.map(t => t.type))];