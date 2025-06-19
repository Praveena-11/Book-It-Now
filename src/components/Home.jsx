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
⏰ Manage your time like a pro, connect with experts, and never miss a booking again!
Our smart appointment scheduling platform makes planning your day a breeze. Whether you're a user booking services 🧑‍💼 or an admin managing schedules 🗓️, everything is just a few clicks away.
<p>📅 Real-time availability</p>
<p>🕒 Seamless booking flow</p>
<p>🔔 Automated reminders</p>
<p>Say goodbye to confusion and hello to clarity!</p>
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
            <p>Sign up as a user or admin to get started. Manage appointments, track availability, and simplify scheduling in one place.</p>
             </div>
          <div className="step">
            <h3>Find Your Slot</h3>
             <p>Users can browse through available time slots from different admins or departments and book the one that fits them best.</p>
          </div>
          <div className="step">
            <h3>Stay Updated</h3>
             <p>Once a slot is selected, confirm the booking with a reason or note. Admins get notified instantly and can approve or reject it.</p>
    </div>
     <div className="step">
      <h3>Stay Updated</h3>
      <p>Receive real-time updates, reminders, and notifications via your dashboard—ensuring you never miss an important meeting.</p>
    </div>
         
        </div>
      </section>
     <footer className="landing-footer">
  <div className="footer-container">
    <div className="footer-logo">
      <h4>BookItNow</h4>
      <p>Smart & simple scheduling.</p>
    </div>

   

    <div className="footer-contact">
      <p>Email: support@bookitnow.com</p>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} BookItNow</p>
  </div>
</footer>

    </div>
  );
};

export default Home;