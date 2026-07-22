import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

function Dashboard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
      }}
    >
      <Sidebar />

      <main
        style={{
          padding: "40px",
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <DashboardHeader />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          <DashboardCard title="ATS Score" value="85%" />
          <DashboardCard title="AI Chats" value="12" />
          <DashboardCard title="Job Match" value="78%" />
          <DashboardCard title="Resumes" value="3" />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;