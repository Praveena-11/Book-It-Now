import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { name, email, password, role });

      // Redirect to login page
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (e) {
      alert(e.response?.data?.msg || 'Signup failed');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Signup to schedule your appointments.</p>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="role-select"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn-filled-green full-width">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
