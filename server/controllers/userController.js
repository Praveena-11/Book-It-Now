// controllers/userController.js
const User = require('../models/User');

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch admins' });
  }
};
