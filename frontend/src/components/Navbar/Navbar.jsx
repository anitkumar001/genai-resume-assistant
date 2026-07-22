import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.wrapper}`}>
        <Link to="/" className={styles.logo}>
  AI Resume Assistant
</Link>

        <nav>
          <ul className={styles.navLinks}>
            <li><Link to="/">Home</Link></li> 
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <Link to="/upload" className={styles.uploadBtn}>
  Upload Resume
</Link>

      </div>
    </header>
  );
}

export default Navbar;