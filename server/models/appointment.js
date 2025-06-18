// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  reason: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
