import {
  FaHome,
  FaUpload,
  FaRobot,
  FaChartBar,
  FaBriefcase,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>AI Resume</h2>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/upload">
              <FaUpload />
              <span>Upload Resume</span>
            </Link>
          </li>

          <li>
            <Link to="/chat">
              <FaRobot />
              <span>AI Chat</span>
            </Link>
          </li>

          <li>
            <Link to="/ats">
              <FaChartBar />
              <span>ATS Analysis</span>
            </Link>
          </li>

          <li>
            <Link to="/job-match">
              <FaBriefcase />
              <span>Job Match</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;