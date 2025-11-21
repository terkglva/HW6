// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e)=>setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? "Signing..." : "Sign up"}</button>
      </form>

      {error && <p style={{color: "red"}}>{error}</p>}
      <p>Есть аккаунт? <Link to="/login">Login</Link></p>
    </div>
  );
}
