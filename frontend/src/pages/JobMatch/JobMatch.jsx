import { useState } from "react";
import styles from "./JobMatch.module.css";
import api from "../../services/api";
import { downloadReport } from "../../utils/pdfReport";

function JobMatch() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {

    if (!file) {
        alert("Please upload your resume.");
        return;
    }

    if (!jobDescription.trim()) {
        alert("Please paste a job description.");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {

        setLoading(true);

        const response = await api.post(
            "/job-match",
            formData
        );

        setResult(response.data.data.analysis);

    } catch (err) {

        console.error(err);
        alert("Analysis failed.");

    } finally {

        setLoading(false);

    }
};

const getScoreColor = (score) => {
  if (score >= 80) return "#22c55e"; // Green
  if (score >= 60) return "#f59e0b"; // Orange
  return "#ef4444"; // Red
};

  return (
    <div className={styles.container}>
      <h1>🎯 Job Match Analyzer</h1>

      <div className={styles.card}>
        <h2>Paste Job Description</h2>
        <h2>Upload Resume</h2>

<input
    type="file"
    accept=".pdf"
    onChange={(e) => setFile(e.target.files[0])}
/>

        <textarea
          placeholder="Paste the complete job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className={styles.textarea}
        />

        <button
    className={styles.button}
    onClick={handleAnalyze}
>
    {loading ? "Analyzing..." : "Analyze Match"}
</button>

{result && (

                  <><div className={styles.result}>
                      {result && (
                          <div className={styles.summaryGrid}>

                              <div className={styles.summaryCard}>
                                  <h3>🎯 Match</h3>
                                  <p>{result.match_score}%</p>
                              </div>

                              <div className={styles.summaryCard}>
                                  <h3>✅ Matching</h3>
                                  <p>{result.matching_skills.length}</p>
                              </div>

                              <div className={styles.summaryCard}>
                                  <h3>❌ Missing</h3>
                                  <p>{result.missing_skills.length}</p>
                              </div>

                              <div className={styles.summaryCard}>
                                  <h3>🔑 Keywords</h3>
                                  <p>{result.missing_keywords.length}</p>
                              </div>

                          </div>
                      )}

                      <div className={styles.scoreCard}>

                          <h2>🎯 Match Score</h2>

                          <h1
                              style={{
                                  color: getScoreColor(result.match_score),
                              }}
                          >
                              {result.match_score}%
                          </h1>

                          <div className={styles.progressBar}>
                              <div
                                  className={styles.progress}
                                  style={{
                                      width: `${result.match_score}%`,
                                      background: getScoreColor(result.match_score),
                                  }} />
                          </div>

                      </div>

                      <div className={styles.grid}>

                          <div className={styles.card}>
                              <h2>✅ Matching Skills</h2>

                              <ul>
                                  {result.matching_skills.map((skill, index) => (
                                      <li key={index}>{skill}</li>
                                  ))}
                              </ul>
                          </div>

                          <div className={styles.card}>
                              <h2>❌ Missing Skills</h2>

                              <div className={styles.badges}>
    {result.missing_skills?.map((skill, index) => (
        <span key={index} className={styles.badge}>
            {skill}
        </span>
    ))}
</div>
                          </div>

                          <div className={styles.card}>
                              <h2>🔑 Missing Keywords</h2>

                              <ul>
                                  {result.missing_keywords.map((keyword, index) => (
                                      <li key={index}>{keyword}</li>
                                  ))}
                              </ul>
                          </div>

                          <div className={`${styles.card} ${styles.fullWidth}`}>
    <h2>💡 Suggestions</h2>

    <ul>
        {result.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
        ))}
    </ul>
</div>

                      </div>

                  </div><button
                      className={styles.downloadBtn}
                      onClick={() => downloadReport(result)}
                  >
                          📄 Download Report
                      </button></>

)}
      </div>
    </div>
  );
  
}

export default JobMatch;