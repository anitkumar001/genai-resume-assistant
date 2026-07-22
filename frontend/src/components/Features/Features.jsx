import { FaRobot, FaFileAlt, FaChartLine } from "react-icons/fa";
import styles from "./Features.module.css";

function Features() {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI Resume Chat",
      description:
        "Ask questions about your resume and receive intelligent answers instantly.",
    },
    {
      icon: <FaFileAlt />,
      title: "ATS Resume Analysis",
      description:
        "Get an ATS score and recommendations to improve your resume.",
    },
    {
      icon: <FaChartLine />,
      title: "Job Match",
      description:
        "Compare your resume with job descriptions and improve your chances.",
    },
  ];

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <h2>Powerful AI Features</h2>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;