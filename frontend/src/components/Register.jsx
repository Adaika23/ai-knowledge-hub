import { useState } from "react";

// ================================
// Register Component
// ================================
function Register() {

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

      // Send request to FastAPI backend
      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      // Convert response to JSON
      const data = await response.json();

      // Show success message
      setMessage(data.message);

    } catch (error) {

      // Show error if request fails
      setMessage("Registration failed");
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="auth-container">

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit">
          Register
        </button>

      </form>

      {/* Message */}
      <p>{message}</p>

    </div>
  );
}

export default Register;