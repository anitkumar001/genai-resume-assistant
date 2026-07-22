import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/global.css";
import App from "./App";
import { ResumeProvider } from "./context/ResumeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResumeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ResumeProvider>
  </React.StrictMode>
);