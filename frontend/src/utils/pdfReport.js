import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadReport = (result) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Job Match Analysis Report", 14, 20);

  doc.setFontSize(14);
  doc.text(`Match Score: ${result.match_score}%`, 14, 35);

  autoTable(doc, {
    startY: 45,
    head: [["Category", "Details"]],
    body: [
      ["Matching Skills", result.matching_skills.join(", ")],
      ["Missing Skills", result.missing_skills.join(", ")],
      ["Missing Keywords", result.missing_keywords.join(", ")],
      ["Suggestions", result.suggestions.join("\n")],
    ],
  });

  doc.save("Job_Match_Report.pdf");
};