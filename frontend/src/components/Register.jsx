import { useState } from "react";
import { registerUser } from "../api";

// ================================
// Register Component
// ================================
// Allows new users to create an account.
// Receives onBackToLogin from Home.jsx
// so users can return to Login page.
function Register({ onBackToLogin }) {

  // ================================
  // State Management
  // ================================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ================================
  // Handle Register
  // ================================
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Validate input
      if (!username.trim() || !password.trim()) {
        setMessage("Please enter both username and password.");
        return;
      }

      // Send registration request
      const data = await registerUser({
        username,
        password,
      });

      setMessage(
        data.message ||
        "Account created successfully. Please log in."
      );

      setUsername("");
      setPassword("");

    } catch (error) {
      setMessage(error.message || "Registration failed");
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="register-card">

      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>

        {/* Username */}
        <input
          type="text"
          placeholder="Create username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Register Button */}
        <button type="submit">
          Register
        </button>

      </form>

      {/* Registration Message */}
      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}

      {/* Back To Login */}
      <button
        type="button"
        className="auth-link-button"
        onClick={onBackToLogin}
      >
        ← Back to Login
      </button>

    </div>
  );
}

export default Register;