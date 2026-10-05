import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import api, { setToken, removeToken } from "./api/api";
import Home from "./components/Home";
import "./index.css";

const FRONTEND_LOGIN_URL = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174"}/login`;

function App() {
  const [authState, setAuthState] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    // Step 1: Check if there's a token in the URL hash (passed from login page)
    // This handles Safari's cross-port cookie blocking
    const hash = window.location.hash;
    if (hash.startsWith("#token=")) {
      const token = decodeURIComponent(hash.slice(7));
      setToken(token);
      // Clean the token from the URL so it doesn't stay in browser history
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Step 2: Verify auth with backend
    api
      .get("/me")
      .then(() => {
        if (!cancelled) setAuthState("ok");
      })
      .catch((error) => {
        if (cancelled) return;
        if (error.response?.status === 401 || error.response?.status === 403) {
          removeToken();
          window.location.href = FRONTEND_LOGIN_URL;
        } else {
          // Network/server error — don't log user out
          setAuthState("ok");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Show blank white screen while checking auth (no jarring loading UI)
  if (authState === "checking") {
    return <div style={{ background: "#fff", height: "100vh" }} />;
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
