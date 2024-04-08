import React from "react";
import ReactDOM from "react-dom/client";
import "./Global.css";
import "./pages/Dashboard/Dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import SignUp from "./pages/Sign-Up/SignUp.tsx";
import SignIn from "./pages/Sign-In/SignIn.tsx";
import { GlobalContextProvider } from "./context/GlobalContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </GlobalContextProvider>
  </React.StrictMode>
);
