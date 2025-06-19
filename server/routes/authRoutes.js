const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      name: req.user.name,
      email: req.user.email,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ msg: 'Failed to get user profile' });
  }
});

module.exports = router;
