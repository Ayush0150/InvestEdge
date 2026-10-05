import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isLoading) return; // prevent double-submit

    setMessage({ text: "", type: "" });
    setIsLoading(true);

    // Abort any previous in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: abortRef.current.signal,
      });

      const data = await response.text();

      if (!response.ok) {
        setMessage({ text: data || "Signup failed. Please try again.", type: "error" });
        setIsLoading(false);
        return;
      }

      // Show success message then redirect to login
      setMessage({ text: "Account created successfully! Redirecting to login…", type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.name === "AbortError") return; // request was cancelled, don't update state
      setMessage({ text: "Something went wrong. Please try again.", type: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <h2 className="mb-4 text-center">Create your account</h2>

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

          <form onSubmit={handleSignup} noValidate>
            <div className="mb-3">
              <label htmlFor="signup-name" className="form-label">
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={isLoading}
                required
                autoComplete="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="signup-email" className="form-label">
                Email
              </label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password" className="form-label">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
                required
                autoComplete="new-password"
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
                  Creating account…
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
