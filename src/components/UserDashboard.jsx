import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './userdashboard.css';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [search, setSearch] = useState('');
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [appointments, setAppointments] = useState([]);
 const [user, setUser] = useState(null);
const [showProfile, setShowProfile] = useState(false);



  const times = [
    '09:00 AM', '09:10 AM', '09:20 AM', '09:30 AM', '09:40 AM',
    '10:00 AM', '10:10 AM', '10:20 AM', '10:30 AM'
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/admins', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(res.data);
      } catch (err) {
        console.error('Error fetching admins:', err);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchAdmins();
    fetchUserProfile();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/appointments/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const handleAppointment = async () => {
    if (!selectedAdmin || !selectedTime || !reason) {
      alert('Please select admin, time and enter reason.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await API.post(
        '/appointments/book',
        {
          adminId: selectedAdmin._id,
          date: selectedDate,
          time: selectedTime,
          reason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Appointment booked!');
      fetchAppointments();
    } catch (err) {
      alert('Failed to book appointment');
      console.error(err);
    }
  };

  const filteredAdmins = search
    ? admins.filter(admin =>
        admin.name.toLowerCase().includes(search.toLowerCase())
      )
    : admins;

  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem('token'); // Remove token
  navigate('/'); // Redirect to landing page
};

  const getColor = (char) => {
    const colors = ['#e57373', '#64b5f6', '#81c784', '#ffd54f', '#4db6ac'];
    return colors[char.charCodeAt(0) % colors.length];
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Select Admin</h3>
        <input
          type="text"
          placeholder="Search Admin..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-search"
        />
        <ul className="admin-list">
          {filteredAdmins.map((admin, idx) => (
            <li
              key={admin._id}
              className={`admin-item ${selectedAdmin?._id === admin._id ? 'selected' : ''}`}
              onClick={() => setSelectedAdmin(admin)}
            >
              {admin.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="dashboard-content">
        <h2>Book Appointment</h2>

        {selectedAdmin ? (
          <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            Booking with: <span style={{ color: 'green' }}>{selectedAdmin.name}</span>
          </div>
        ) : (
          <div style={{ marginBottom: '1rem', color: 'red' }}>
            Please select an admin to book an appointment.
          </div>
        )}

        <div className="calendar-profile-wrapper">
          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
            />
          </div>
{user && (
  <div className="profile-dropdown-container">
    <div
      className="profile-avatar"
      onClick={() => setShowProfile(!showProfile)}
    >
      {user.name.charAt(0).toUpperCase()}
    </div>

    {showProfile && (
      <div className="profile-dropdown">
        <p><strong>{user.name}</strong></p>
        <p>{user.email}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    )}
  </div>
)}


        </div>

        <div className="slot-selection">
          <h4>Select Time Slot</h4>
          <div className="time-slots">
            {times.map((time, index) => (
              <button
                key={index}
                className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => selectedAdmin && setSelectedTime(time)}
                disabled={!selectedAdmin}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="reason-input"
          placeholder="Enter reason for appointment"
          value={reason}
          onChange={e => setReason(e.target.value)}
          disabled={!selectedAdmin}
        />

        <button className="book-btn" onClick={handleAppointment} disabled={!selectedAdmin}>
          Book Appointment
        </button>

        <div className="appointments-list">
          <h3>Scheduled Appointments</h3>
          {appointments.map((appt, i) => (
            <div key={i} className="appointment-card">
              <strong>{new Date(appt.date).toDateString()}</strong> - {appt.time}<br />
              <em>{appt.reason}</em><br />
              <span>Status: {appt.status}</span><br />
              <span>Admin: {appt.adminName}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
