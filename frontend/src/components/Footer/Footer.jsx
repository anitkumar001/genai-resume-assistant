import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <h2>AI Resume Assistant</h2>

        <p>
          Build ATS-friendly resumes, improve job matches, and prepare for your
          dream career using AI.
        </p>

        <p className={styles.copy}>
          © 2026 AI Resume Assistant. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;