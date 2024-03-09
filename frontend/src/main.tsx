import React from "react";
import ReactDOM from "react-dom/client";
import "./Global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import SignUp from "./pages/Sign-Up/SignUp.tsx";
import SignIn from "./pages/Sign-In/SignIn.tsx";
import { LoadingContextProvider } from "./context/LoadingContext/LoadingContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </LoadingContextProvider>
  </React.StrictMode>
);
