// src/pages/Login.jsx (UPDATED)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      // Handle Firebase errors
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password");
      } else if (err.code === 'auth/user-not-found') {
        setError("No account found with this email");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p style={{ 
          color: '#ff6b6b', 
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '15px'
        }}>
          {error}
        </p>
      )}
      
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}