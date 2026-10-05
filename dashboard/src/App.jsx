import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import api from "./api/api";
import Home from "./components/Home";
import "./index.css";

const FRONTEND_LOGIN_URL = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174"}/login`;

function App() {
  // "checking" = verifying auth, "ok" = authenticated, "fail" = not authenticated
  const [authState, setAuthState] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    api
      .get("/me")
      .then(() => {
        if (!cancelled) setAuthState("ok");
      })
      .catch((error) => {
        if (cancelled) return;
        // Only redirect on explicit 401 (Unauthorized) — not on network errors or other issues
        if (error.response?.status === 401 || error.response?.status === 403) {
          window.location.href = FRONTEND_LOGIN_URL;
        } else {
          // Network error or server error — still allow access, retry will happen on next API call
          setAuthState("ok");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (authState === "checking") {
    // Show a minimal loading screen while verifying auth
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#ffffff",
          color: "#555",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "14px",
          gap: "14px",
        }}
      >
        <img
          src="/images/investedge-logo.svg"
          alt="InvestEdge"
          style={{ width: "150px", marginBottom: "8px", opacity: 0.9 }}
        />
        <div
          style={{
            width: "22px",
            height: "22px",
            border: "2px solid #e0e0e0",
            borderTop: "2px solid #387ed1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
