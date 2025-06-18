const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, adminOnly, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', admin: req.user });
});

router.get('/admins', protect, async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('name email');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch admins', error: err.message });
  }
});
module.exports = router;