const writingTemplates = [
   {
     id: 1,
     type: "Academic Essay",
     name: "Standard Outline",
     content: `Introduction:
 - Hook sentence (anecdote / quote / surprising fact)
 - Background: 2‑3 sentences that narrow the topic
 - Thesis statement (clear stance + 3 main points)

Body Paragraph 1 – Point A:
  • Topic sentence (links to thesis)  
  • Context / brief explanation  
  • Evidence 1 (quotation / stat)  
  • Analysis of Evidence 1  
  • Evidence 2 (example / data)  
  • Analysis of Evidence 2  
  • Mini‑conclusion + transition

Body Paragraph 2 – Point B:
  • Topic sentence  
  • Context  
  • Evidence 1 → analysis  
  • Evidence 2 → analysis  
  • Mini‑conclusion + transition

Body Paragraph 3 – Point C:
  • Topic sentence  
  • Evidence chain (at least 2 pieces) + analyses  
  • Counter‑argument + rebuttal (optional)  
  • Mini‑conclusion

Conclusion:
 - Restate thesis in fresh words
 - Synthesize 3 body points (not just list)  
 - Closing insight / call‑to‑action / broader implication`
   },
   {
     id: 2,
     type: "Research Abstract",
     name: "Standard Abstract",
     content: `Background (1–2 sentences):
 • Broad context of the problem  
 • Specific knowledge gap this study addresses

Objectives (1 sentence):
 • Clear research aim / hypothesis

Methods (2–3 sentences):
 • Design (e.g., randomized controlled trial / qualitative case study)  
 • Key materials / data sources  
 • Core analytical techniques

Results (2–3 sentences):
 • Primary quantitative result(s) with key statistic or effect size  
 • Secondary finding(s) or notable qualitative insight

Conclusions (1–2 sentences):
 • Interpretation of main result vs. objectives  
 • Practical / theoretical implications or recommended action`
   },
   {
     id: 3,
     type: "Lab Report",
     name: "Standard Lab Report",
     content: `Title & Author(s)

Abstract (≤250 words):
 • Brief background, purpose, major results, conclusion

Introduction:
 • Scientific context & literature (2–3 citations)  
 • Clear statement of hypothesis / research question

Materials & Methods:
 • List of materials (concentrations, suppliers)  
 • Step‑by‑step procedure (past tense, passive voice)  
 • Controls & variables  
 • Statistical analyses / software

Results:
 • Textual summary of observed data  
 • Table 1 – raw data  
 • Figure 1 – graph of key relationship (captioned)  
 • Statistical outputs (p‑values, confidence intervals)

Discussion:
 • Interpret results relative to hypothesis  
 • Compare with previous studies (cite)  
 • Explain anomalies / sources of error  
 • Suggestions for future work

Conclusion:
 • 2–3 sentences encapsulating main finding & significance

References (APA / IEEE, etc.)

Appendices (if needed):
 • Detailed calculations  
 • Extended data tables`
   }
 ];
 
 export default writingTemplates;

export const paperTypes = [...new Set(writingTemplates.map(t => t.type))];