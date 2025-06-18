import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">BookItNow</h2>
      <div className="nav-links">
        <Link to="/user">User Dashboard</Link>
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/login">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
