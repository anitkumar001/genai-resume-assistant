import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Upload from "./pages/Upload/Upload";
import ATS from "./pages/ATS/ATS";
import JobMatch from "./pages/JobMatch/JobMatch";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/ats" element={<ATS />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/job-match" element={<JobMatch />} />
      </Routes>
    </>
  );
}

export default App;