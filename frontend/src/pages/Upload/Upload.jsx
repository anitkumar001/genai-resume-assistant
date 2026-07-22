import { useState } from "react";
import api from "../../services/api";
import styles from "./Upload.module.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);

      setMessage("✅ Resume uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Upload Resume</h1>

      <div className={styles.card}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        {file && <p>Selected: {file.name}</p>}

        <button onClick={handleUpload}>
          Upload Resume
        </button>

        <p>{message}</p>
        {result && (
  <div className={styles.result}>
    <h3>Upload Result</h3>

    <p>
      <strong>Filename:</strong> {result.filename}
    </p>

    <p>
      <strong>Characters:</strong> {result.characters}
    </p>

    <p>
      <strong>Chunks Stored:</strong> {result.chunks_stored}
    </p>

    <h4>Preview</h4>

    <pre>{result.preview}</pre>
  </div>
)}
      </div>
    </div>
  );
}

export default Upload;