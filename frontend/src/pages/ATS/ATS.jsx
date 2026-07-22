import { useResume } from "../../Context/ResumeContext";
import { useState } from "react";
import api from "../../services/api";
import styles from "./ATS.module.css";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaClipboardList,
  FaLaptopCode,
  FaLightbulb,
  FaProjectDiagram,
  FaChartLine,
  FaCloudUploadAlt,
} from "react-icons/fa";

function ATS() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const { setResumeText } = useResume();

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const handleDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  setDragActive(false);

  const droppedFile = e.dataTransfer.files[0];

  if (droppedFile && droppedFile.type === "application/pdf") {
    setFile(droppedFile);
    setAnalysis(null);
    setError("");
  } else {
    alert("Please upload a PDF file.");
  }
};

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/analyze-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(response.data.data.analysis);
      setResumeText(response.data.data.resume_text);
      
      console.log(response.data.data.resume_text);


    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <h1>ATS Resume Analysis</h1>

      <div className={styles.card}>

        <div
  className={`${styles.uploadBox} ${
    dragActive ? styles.dragActive : ""
  }`}
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
>
  <FaCloudUploadAlt className={styles.uploadIcon} />

  <p>
    <strong>Drag & Drop</strong> your resume here
  </p>

  <span>or</span>

  <label className={styles.uploadButton}>
    Browse File

    <input
      type="file"
      accept=".pdf"
      hidden
      disabled={loading}
      onChange={(e) => {
        setFile(e.target.files[0]);
        setAnalysis(null);
        setError("");
      }}
    />
  </label>
</div>

        {file && (
          <p className={styles.fileName}>
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "🔄 Analyzing Resume..." : "Analyze Resume"}
        </button>

      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {!analysis && !loading && (
        <div className={styles.emptyState}>
          <h2>Upload Your Resume</h2>

          <p>
            Upload your PDF resume and receive an
            AI-powered ATS analysis including
            strengths, weaknesses, missing sections,
            technical skills and improvement suggestions.
          </p>
        </div>
      )}

      {analysis && (
        <>

          {/* Statistics */}

          <div className={styles.stats}>

            <div className={styles.statCard}>
              <FaChartLine className={styles.iconBlue} />
              <h2>{analysis.score}</h2>
              <p>ATS Score</p>
            </div>

            <div className={styles.statCard}>
              <FaLaptopCode className={styles.iconBlue} />
              <h2>{analysis.technical_skills.length}</h2>
              <p>Skills</p>
            </div>

            <div className={styles.statCard}>
              <FaCheckCircle className={styles.iconGreen} />
              <h2>{analysis.strengths.length}</h2>
              <p>Strengths</p>
            </div>

            <div className={styles.statCard}>
              <FaExclamationTriangle
                className={styles.iconOrange}
              />
              <h2>{analysis.weaknesses.length}</h2>
              <p>Weaknesses</p>
            </div>

            <div className={styles.statCard}>
              <FaClipboardList className={styles.iconBlue} />
              <h2>{analysis.missing_sections.length}</h2>
              <p>Missing</p>
            </div>

          </div>

          {/* Score */}

          <div className={styles.scoreCard}>

            <h2>ATS Score</h2>

            <div
              className={styles.score}
              style={{
                color: getScoreColor(
                  analysis.score
                ),
              }}
            >
              {analysis.score}/100
            </div>

            <div className={styles.progress}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${analysis.score}%`,
                  background: getScoreColor(
                    analysis.score
                  ),
                }}
              />
            </div>

          </div>

          {/* Grid */}

          <div className={styles.grid}>
                        {/* Strengths */}

            <div className={styles.section}>
              <h3>
                <FaCheckCircle className={styles.iconGreen} />
                Strengths
              </h3>

              <ul>
                {analysis.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}

            <div className={styles.section}>
              <h3>
                <FaExclamationTriangle className={styles.iconOrange} />
                Weaknesses
              </h3>

              <ul>
                {analysis.weaknesses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Missing Sections */}

            <div className={styles.section}>
              <h3>
                <FaClipboardList className={styles.iconBlue} />
                Missing Sections
              </h3>

              <ul>
                {analysis.missing_sections.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Technical Skills */}

            <div className={styles.section}>
              <h3>
                <FaLaptopCode className={styles.iconBlue} />
                Technical Skills
              </h3>

              <div className={styles.skills}>
                {analysis.technical_skills.map((skill, index) => (
                  <span
                    key={index}
                    className={styles.skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Summary */}

            <div className={styles.fullWidth}>
              <div className={styles.section}>
                <h3>
                  <FaProjectDiagram className={styles.iconBlue} />
                  Project Summary
                </h3>

                <p>{analysis.projects_summary}</p>
              </div>
            </div>

            {/* Suggestions */}

            <div className={styles.fullWidth}>
              <div className={styles.section}>
                <h3>
                  <FaLightbulb className={styles.iconGreen} />
                  Suggestions
                </h3>

                <ul>
                  {analysis.suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default ATS;