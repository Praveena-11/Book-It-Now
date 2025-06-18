import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminDashboard.css';
import API from '../services/api';

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [adminName, setAdminName] = useState('');

  // Fetch admin info and their appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/appointments/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(res.data);
        const approved = res.data.filter(appt => appt.status === 'approved');
        setApprovedAppointments(approved);
        setAdminName(res.data[0]?.adminName || 'Admin');
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };
    fetchAppointments();
  }, []);

  // Approve appointment
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await API.patch(`/appointments/${id}/status`, { status: 'approved' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(prev =>
        prev.map(appt => appt._id === id ? { ...appt, status: 'approved' } : appt)
      );
      setApprovedAppointments(prev =>
        [...prev, appointments.find(a => a._id === id)]
      );
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  // Reject appointment
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await API.patch(`/appointments/${id}/status`, { status: 'rejected' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(prev =>
        prev.map(appt => appt._id === id ? { ...appt, status: 'rejected' } : appt)
      );
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {adminName}</h2>

      <div className="profile-summary">
        <div className="admin-card">
          <h3>Profile</h3>
          <p><strong>Name:</strong> {adminName}</p>
          <p><strong>Pending Requests:</strong> {appointments.filter(a => a.status === 'pending').length}</p>
          <p><strong>Approved:</strong> {approvedAppointments.length}</p>
        </div>

        <div className="calendar-box">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) =>
              approvedAppointments.find(appt => new Date(appt.date).toDateString() === date.toDateString())
                ? 'highlight'
                : ''
            }
          />
        </div>
      </div>

      <div className="request-section">
        <h3>Schedule Requests</h3>
        {appointments.filter(a => a.status === 'pending').map((req) => (
          <div key={req._id} className="request-card">
            <p><strong>{req.userName}</strong> requested for {req.date} at {req.time}</p>
            <p><em>Reason:</em> {req.reason}</p>
            <button className="approve-btn" onClick={() => handleApprove(req._id)}>Approve</button>
            <button className="reject-btn" onClick={() => handleReject(req._id)}>Reject</button>
          </div>
        ))}
      </div>

      <div className="approved-section">
        <h3>Approved Schedules</h3>
        {approvedAppointments.map((appt, i) => (
          <div key={i} className="approved-card">
            <p><strong>{appt.userName}</strong> — {appt.date} at {appt.time}</p>
            <p><em>{appt.reason}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
