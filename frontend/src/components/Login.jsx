import { useState, useRef, useEffect } from "react";
import { loginUser } from "./api";

// ================================
// Login Component
// ================================
function Login({ onLoginSuccess, onCreateAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

    try {
      if (!username.trim() || !password.trim()) {
        setMessage("Please enter both username and password.");
        return;
      }

      const data = await loginUser({
        username,
        password,
      });

      sessionStorage.setItem("token", data.token);

      setMessage(data.message || "Login successful");

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setMessage(error.message || "Login failed");
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
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <div className="auth-links">
          <button
            type="button"
            className="auth-link-button"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          <button
            type="button"
            className="auth-link-button"
            onClick={onCreateAccount}
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