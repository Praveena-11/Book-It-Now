import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

const Home= () => {
  return (
    <div className="landing-wrapper">
      {/* Header Section */}
      <header className="landing-header">
        <div className="logo">BookItNow</div>
        <nav className="nav-links">
          <Link to="/login" className="btn-outline-green">Login</Link>
          <Link to="/signup" className="btn-filled-green">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Effortless Appointment Scheduling</h1>
        <p className="hero-subtitle">
          Manage your time, connect with professionals, and never miss a booking again.
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn-filled-green">Get Started</Link>
          <Link to="/login" className="btn-outline-green">Already have an account?</Link>
        </div>
      </section>

      {/* Description Section */}
      <section className="how-it-works">
        <h2>How it Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Create Account</h3>
            <p>Sign up as a user or admin to manage your appointments effortlessly.</p>
          </div>
          <div className="step">
            <h3>Find Your Slot</h3>
            <p>Users can view available times and book appointments instantly.</p>
          </div>
          <div className="step">
            <h3>Stay Updated</h3>
            <p>Get real-time updates and confirmations for every booking.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;