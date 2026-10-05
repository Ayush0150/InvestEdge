import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";
const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5173";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "error" | "success"
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  // Cleanup any in-flight request when component unmounts
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoading) return; // prevent double-submit

    setMessage({ text: "", type: "" });
    setIsLoading(true);

    // Abort any previous in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: abortRef.current.signal,
      });

      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        setMessage({ text: data.message || "Login failed. Please try again.", type: "error" });
        setIsLoading(false);
        return;
      }

      // Show success message briefly before redirecting
      setMessage({ text: `Welcome back, ${data.user?.name || ""}! Redirecting to dashboard…`, type: "success" });

      setTimeout(() => {
        window.location.href = DASHBOARD_URL;
      }, 1000);
    } catch (error) {
      if (error.name === "AbortError") return; // request was cancelled, don't update state
      setMessage({ text: error.message || "Something went wrong. Please try again.", type: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <h2 className="mb-4 text-center">Login to your account</h2>

          {message.text && (
            <div
              className={`alert ${
                message.type === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={isLoading}
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in…
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center mt-3">
            New user? <Link to="/signup">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
