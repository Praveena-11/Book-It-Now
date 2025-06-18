const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getUserAppointments,
  getAdminAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/book', protect, bookAppointment);
router.get('/user', protect, getUserAppointments);
router.get('/admin', protect, adminOnly, getAdminAppointments);
router.patch('/:id/status', protect, adminOnly, updateAppointmentStatus);

module.exports = router;
