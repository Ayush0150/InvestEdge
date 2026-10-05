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
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#0f172a",
          color: "#94a3b8",
          fontFamily: "sans-serif",
          fontSize: "15px",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid #334155",
            borderTop: "2px solid #6366f1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        Loading…
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
