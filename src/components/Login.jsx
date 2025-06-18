import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Login.css'; // Custom CSS for login/signup styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', { email, password });

    // Save token to localStorage
    localStorage.setItem('token', res.data.token);

    // Get the user's role from the response
    const role = res.data.user.role;

    // Navigate based on role
    if (role === 'admin') {
      navigate('/admin'); // ✅ Your admin dashboard route
    } else {
      navigate('/user'); // ✅ Your user dashboard route
    }

  } catch (e) {
    alert(e.response?.data?.msg || 'Login failed');
  }
}


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to manage your appointments.</p>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn-filled-green full-width">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
