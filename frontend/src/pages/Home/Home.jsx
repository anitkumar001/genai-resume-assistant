import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>

        <div className={styles.badge}>
          ✨ AI Powered Resume Analysis
        </div>

        <h1>
          🚀 GenAI Resume Assistant
        </h1>

        <p>
          Analyze your resume, improve ATS score, compare with job
          descriptions, and receive AI-powered suggestions instantly.
        </p>

        <div className={styles.buttons}>

          <Link to="/ats">
            <button className={styles.primaryBtn}>
              Analyze Resume
            </button>
          </Link>

    <Link to="/job-match">
    <button className={styles.learnBtn}>
        Generate Report →
    </button>
</Link>

        </div>

        <div className={styles.highlights}>
          <span>✅ ATS Friendly</span>
          <span>🤖 AI Powered</span>
          <span>⚡ Instant Analysis</span>
        </div>

      </section>

      {/* Features Section */}

      <section id="features" className={styles.features}>
        <div className={styles.card}>

          <h3>📄 ATS Resume Analysis</h3>

          <p>
            Analyze your resume against ATS standards to identify
            missing keywords, improve your resume score, and
            receive AI-powered recommendations.
          </p>

          <Link to="/ats">
            <button className={styles.learnBtn}>
              Analyze Resume →
            </button>
          </Link>

        </div>

        <div className={styles.card}>

          <h3>🤖 AI Resume Chat</h3>

          <p>
            Chat with AI about your resume, ask career-related
            questions, and receive personalized guidance
            based on your uploaded resume.
          </p>

          <Link to="/chat">
            <button className={styles.learnBtn}>
              Start Chat →
            </button>
          </Link>

        </div>

        <div className={styles.card}>

          <h3>🎯 Job Match Analyzer</h3>

          <p>
            Compare your resume with any job description,
            identify matching skills, discover skill gaps,
            and improve your chances of getting shortlisted.
          </p>

          <Link to="/job-match">
            <button className={styles.learnBtn}>
              Match Resume →
            </button>
          </Link>

        </div>

        <div className={styles.card}>

          <h3>📄 PDF Report</h3>

          <p>
            <p>
Generate a professional PDF report after completing
the Job Match analysis. The report includes ATS score,
matching skills, missing skills, and AI recommendations.
</p>
          </p>

          <Link to="/job-match">
    <button className={styles.learnBtn}>
        Generate Report →
    </button>
</Link>

        </div>


</section>

{/* ================= HOW IT WORKS ================= */}

<section className={styles.howItWorks}>

    <h2>How It Works</h2>

    <p className={styles.subtitle}>
        Complete your resume journey in four simple AI-powered steps.
    </p>

    <div className={styles.timeline}>

        <div className={styles.step}>
            <div className={styles.circle}>📄</div>

            <h3>Upload Resume</h3>

            <p>
                Upload your resume in PDF format for instant AI analysis.
            </p>
        </div>

        <div className={styles.step}>
            <div className={styles.circle}>🤖</div>

            <h3>AI Analysis</h3>

            <p>
                Analyze your resume, ATS score and receive personalized feedback.
            </p>
        </div>

        <div className={styles.step}>
            <div className={styles.circle}>🎯</div>

            <h3>Job Match</h3>

            <p>
                Compare your resume with any job description and discover skill gaps.
            </p>
        </div>

        <div className={styles.step}>
            <div className={styles.circle}>📥</div>

            <h3>Download Report</h3>

            <p>
                Generate a professional PDF report containing complete AI analysis.
            </p>
        </div>

    </div>

</section>
      {/* ================= WHY CHOOSE US ================= */}

<section className={styles.whyChoose}>

    <h2>Why Choose GenAI Resume Assistant?</h2>

    <p className={styles.whySubtitle}>
        Everything you need to build a stronger resume and prepare for your next opportunity.
    </p>

    <div className={styles.whyGrid}>

        <div className={styles.whyCard}>
            <div className={styles.whyIcon}>🤖</div>
            <h3>AI Powered Analysis</h3>
            <p>
                Get intelligent resume analysis and personalized suggestions
                powered by Google's Gemini AI.
            </p>
        </div>

        <div className={styles.whyCard}>
            <div className={styles.whyIcon}>⚡</div>
            <h3>Instant Results</h3>
            <p>
                Receive ATS scores, resume feedback, and job matching
                results within seconds.
            </p>
        </div>

        <div className={styles.whyCard}>
            <div className={styles.whyIcon}>🎯</div>
            <h3>Smart Job Matching</h3>
            <p>
                Compare your resume with job descriptions to discover
                matching skills and improvement areas.
            </p>
        </div>

        <div className={styles.whyCard}>
            <div className={styles.whyIcon}>📄</div>
            <h3>Professional Reports</h3>
            <p>
                Download detailed PDF reports containing ATS analysis,
                job match results, and AI recommendations.
            </p>
        </div>

    </div>

</section>

{/* ================= FOOTER ================= */}

<footer id="contact" className={styles.footer}>

    <div className={styles.footerContainer}>

        {/* About */}

        <div className={styles.footerSection}>

            <h2>🚀 GenAI Resume Assistant</h2>

            <p>
                An AI-powered platform that helps job seekers
                analyze resumes, improve ATS scores, compare
                resumes with job descriptions, and generate
                professional reports.
            </p>

        </div>

        {/* Quick Links */}

        <div className={styles.footerSection}>

            <h3>Quick Links</h3>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ats">ATS Analysis</Link></li>
                <li><Link to="/chat">AI Resume Chat</Link></li>
                <li><Link to="/job-match">Job Match</Link></li>
            </ul>

        </div>

        {/* Features */}

        <div className={styles.footerSection}>

            <h3>Features</h3>

            <ul>
                <li>ATS Resume Analysis</li>
                <li>AI Resume Chat</li>
                <li>Job Match Analyzer</li>
                <li>PDF Report Generation</li>
            </ul>

        </div>

        {/* Contact */}

        {/* Contact */}

<div className={styles.footerSection}>

    <h3>Contact</h3>

    <p>📧 anitkumar.edu@gmail.com</p>

    <p>
        💻 <a
            href="https://github.com/anitkumar001"
            target="_blank"
            rel="noopener noreferrer"
        >
            GitHub
        </a>
    </p>

    <p>
        🔗 <a
            href="https://www.linkedin.com/in/anit-kumar-nag-516251277/"
            target="_blank"
            rel="noopener noreferrer"
        >
            LinkedIn
        </a>
    </p>

</div>

    </div>

    <hr className={styles.footerLine}/>

    <div className={styles.footerBottom}>

        <div className={styles.footerBottom}>

    <p>
        © 2026 GenAI Resume Assistant. All Rights Reserved.
    </p>

    <p className={styles.developer}>
        Designed & Developed with ❤️ by
        <span> Anit Kumar Nag</span>
    </p>

</div>

    </div>

</footer>



    </div>
  );
}

export default Home;