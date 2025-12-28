const Subscription = require('../models/Subscription');

exports.checkSubscription = async (req, res, next) => {
  if (req.user.role !== 'subscriber') return next(); // Admins/creators bypass

  const creatorId = req.params.creatorId || req.body.creatorId;
  if (!creatorId) return res.status(400).json({ message: 'Creator ID required' });

  const sub = await Subscription.findOne({
    subscriber: req.user._id,
    creator: creatorId,
    active: true
  });

  if (!sub) return res.status(403).json({ message: 'No active subscription' });

  const now = new Date();
  const graceEnd = new Date(sub.endDate);
  graceEnd.setDate(graceEnd.getDate() + 3);

  if (now > graceEnd) {
    sub.active = false; // mark subscription inactive
    await sub.save();
    return res.status(403).json({ message: 'Subscription expired (including grace period)' });
  }

  next(); // access allowed
};
