import { useState, useRef, useEffect } from "react";

// ================================
// Login Component
// ================================
// Receives:
// onLoginSuccess = opens dashboard after login
// onCreateAccount = switches to Register screen
function Login({ onLoginSuccess, onCreateAccount }) {
  // ================================
  // State Management
  // ================================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Automatically focus username field
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // ================================
  // Forgot Password Placeholder
  // ================================
  const handleForgotPassword = () => {
    alert(
      "Password recovery is not available yet. Please contact the administrator or create a new account."
    );
  };

  // ================================
  // Handle Login
  // ================================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!username.trim() || !password.trim()) {
        setMessage("Please enter both username and password.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Login failed");
        return;
      }

      sessionStorage.setItem("token", data.token);

      setMessage(data.message || "Login successful");

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  // ================================
  // UI
  // ================================
  return (
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

        <button type="submit">
          Login
        </button>
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

      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;