const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const Subscription = require('../models/Subscription');

// Existing subscribe route
router.post('/', protect, authorizeRoles('subscriber'), async (req, res) => {
  const { creatorId, type } = req.body;
  const days = type === 'yearly' ? 365 : 30;
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);

  const sub = await Subscription.create({
    subscriber: req.user._id,
    creator: creatorId,
    type,
    endDate
  });

  res.status(201).json(sub);
});

// NEW: Get subscription status for subscriber
router.get('/status', protect, authorizeRoles('subscriber'), async (req, res) => {
  const subs = await Subscription.find({ subscriber: req.user._id });
  const statusMap = {};

  const now = new Date();
  subs.forEach(sub => {
    const graceEnd = new Date(sub.endDate);
    graceEnd.setDate(graceEnd.getDate() + 3); // 3-day grace
    if (now <= sub.endDate) statusMap[sub.creator] = 'active';
    else if (now <= graceEnd) statusMap[sub.creator] = 'grace';
    else statusMap[sub.creator] = 'expired';
  });

  res.json(statusMap);
});

module.exports = router;
