import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import api from "./api/api";
import Home from "./components/Home";
import "./index.css";

const FRONTEND_LOGIN_URL = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174"}/login`;

function App() {
  useEffect(() => {
    api.get("/me").catch(() => {
      window.location.href = FRONTEND_LOGIN_URL;
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
