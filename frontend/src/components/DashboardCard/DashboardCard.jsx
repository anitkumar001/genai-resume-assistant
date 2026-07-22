import styles from "./DashboardCard.module.css";

function DashboardCard({ title, value }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>

      <h2>{value}</h2>
    </div>
  );
}

export default DashboardCard;