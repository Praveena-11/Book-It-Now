const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { adminId, date, time, reason } = req.body;
  try {
    const appt = await Appointment.create({
      userId: req.user._id,
      adminId,
      date,
      time,
      reason
    });
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ msg: 'Booking failed', error: err.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  const appts = await Appointment.find({ userId: req.user._id }).populate('adminId', 'name email');
  res.json(appts);
};

exports.getAdminAppointments = async (req, res) => {
  const appts = await Appointment.find({ adminId: req.user._id }).populate('userId', 'name email');
  
  res.json(appts);
};

exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const appt = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  res.json(appt);
};

