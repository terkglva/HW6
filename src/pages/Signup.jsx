// src/pages/Signup.jsx (UPDATED)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, validateEmail, validatePassword } from "../services/authService";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password complexity
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      navigate("/profile");
    } catch (err) {
      // Handle Firebase errors
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
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
          placeholder="Password (8+ chars, 1 number, 1 special char)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        {/* Password requirements hint */}
        <div style={{ 
          fontSize: '0.85rem', 
          color: 'var(--color-text-dim)', 
          textAlign: 'left',
          marginTop: '-10px'
        }}>
          Password must contain:
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>At least 8 characters</li>
            <li>At least one number</li>
            <li>At least one special character (!@#$%^&*)</li>
          </ul>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
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
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}