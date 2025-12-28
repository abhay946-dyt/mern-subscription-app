const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

/**
 * GET /users?role=creator
 * Fetch users by role (default: all)
 * Access: protected (any logged-in user)
 */
router.get('/', protect, async (req, res) => {
  const role = req.query.role; // optional query param
  const filter = role ? { role } : {};
  const users = await User.find(filter).select('-password');
  res.json(users);
});

module.exports = router;
