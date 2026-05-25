import { useState } from "react";

// ================================
// Login Component
// ================================
function Login() {
  // ================================
  // State Management
  // ================================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ================================
  // Handle Login
  // ================================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
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

      // Convert response to JSON
      const data = await response.json();

      // If backend returns an error
      if (!response.ok) {
        setMessage(data.detail || "Login failed");
        return;
      }

      // Save JWT token in browser localStorage
      localStorage.setItem("token", data.token);

      // Show success message
      setMessage(data.message || "Login successful");

      // Refresh the page so Home.jsx reads the saved token
      window.location.reload();

    } catch (error) {
      // Show error message
      setMessage("Login failed");
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        {/* Username */}
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button type="submit">
          Login
        </button>
      </form>

      {/* Result Message */}
      <p>{message}</p>
    </div>
  );
}

export default Login;