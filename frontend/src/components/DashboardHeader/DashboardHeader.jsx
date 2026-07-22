import styles from "./DashboardHeader.module.css";

function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back 👋</p>
      </div>

      <button className={styles.profile}>
        Anit
      </button>
    </header>
  );
}

export default DashboardHeader;