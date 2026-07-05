import { useState, useRef, useEffect } from "react";
import { loginUser } from "../api/api";

// ================================
// Login Component
// ================================
function Login({ onLoginSuccess, onCreateAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleForgotPassword = () => {
        alert(
          "Password recovery is not available yet. Please contact the administrator or create a new account."
        );
      };

      const handleLogin = async (e) => {
      e.preventDefault();

      if (loading) return;

      if (!username.trim() || !password.trim()) {
        setMessage("Please enter both username and password.");
        return;
      }

      setLoading(true);
      setMessage("");

      try {
        console.log("Attempting login...");

        const data = await loginUser({
          username: username.trim(),
          password,
        });

        console.log("Login response:", data);

        const token = data.access_token || data.token;

        if (!token) {
          throw new Error("No authentication token received from the server.");
        }

        sessionStorage.setItem("token", token);

        setMessage("Login successful.");

        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } catch (error) {
        console.error("Login error:", error);

        setMessage(
          error?.message || "Unable to log in. Please try again."
        );
      } finally {
        console.log("Login request finished.");
        setLoading(false);
      }
    };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-links">
          <button
            type="button"
            className="auth-link-button"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot Password?
          </button>

          <button
            type="button"
            className="auth-link-button"
            onClick={onCreateAccount}
            disabled={loading}
          >
            Create Account
          </button>
        </div>

        <p className="version">
          AI Knowledge Hub v1.0
          <br />
          Powered by FastAPI + React + OpenAI
        </p>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;