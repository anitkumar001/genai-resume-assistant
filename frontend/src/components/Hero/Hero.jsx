import { motion } from "framer-motion";
import styles from "./Hero.module.css";

import heroImg from "../../assets/hero.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.wrapper}`}>
        {/* Left Side */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>
            Build an ATS-Friendly Resume with AI
          </h1>

          <p>
            Upload your resume, analyze ATS score, improve content,
            chat with your resume, and match it against job descriptions
            using AI.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>
              Upload Resume
            </button>

            <button className={styles.secondaryBtn}>
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className={styles.image}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={heroImg} alt="AI Resume Assistant" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;