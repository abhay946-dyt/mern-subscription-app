const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const User = require('../models/User');
const Content = require('../models/Content');
const Subscription = require('../models/Subscription');

/**
 * All routes below are:
 * - JWT protected
 * - Admin-only
 */
router.use(protect);
router.use(authorizeRoles('admin'));

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 */
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

/**
 * @route   PUT /api/admin/user/:id
 * @desc    Update user (name, email, role)
 */
router.put('/user/:id', async (req, res) => {
  const { name, email, role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true, runValidators: true }
  ).select('-password');

  res.json(updatedUser);
});

/**
 * @route   DELETE /api/admin/user/:id
 * @desc    Delete user + related data
 */
router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;

  await Subscription.deleteMany({
    $or: [{ subscriber: userId }, { creator: userId }],
  });

  await Content.deleteMany({ creator: userId });
  await User.findByIdAndDelete(userId);

  res.json({ message: 'User and related data deleted' });
});

/**
 * @route   GET /api/admin/content
 * @desc    Get all content
 */
router.get('/content', async (req, res) => {
  const content = await Content.find().populate('creator', 'name email');
  res.json(content);
});

/**
 * @route   PUT /api/admin/content/:id
 * @desc    Update content (title/description)
 */
router.put('/content/:id', async (req, res) => {
  const updatedContent = await Content.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedContent);
});

/**
 * @route   DELETE /api/admin/content/:id
 * @desc    Delete any content
 */
router.delete('/content/:id', async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ message: 'Content deleted' });
});

/**
 * @route   GET /api/admin/subscriptions
 * @desc    Get all subscriptions
 */
router.get('/subscriptions', async (req, res) => {
  const subs = await Subscription.find()
    .populate('subscriber', 'name email')
    .populate('creator', 'name email');

  res.json(subs);
});

module.exports = router;
