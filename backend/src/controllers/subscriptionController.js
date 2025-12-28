const Subscription = require('../models/Subscription');

exports.subscribe = async (req, res) => {
  const { creatorId, type } = req.body;

  if (!creatorId) return res.status(400).json({ message: 'Creator ID required' });

  const days = type === 'yearly' ? 365 : 30;
  const now = new Date();

  // Check for existing active subscription
  let sub = await Subscription.findOne({
    subscriber: req.user._id,
    creator: creatorId,
    active: true
  });

  if (sub) {
    const graceEnd = new Date(sub.endDate);
    graceEnd.setDate(graceEnd.getDate() + 3);

    if (now <= graceEnd) {
      // Renew subscription: extend current endDate
      sub.endDate.setDate(sub.endDate.getDate() + days);
      await sub.save();
      return res.status(200).json({ message: 'Subscription renewed', subscription: sub });
    } else {
      // Grace period expired: deactivate old subscription
      sub.active = false;
      await sub.save();
    }
  }

  // No active subscription: create new
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);

  sub = await Subscription.create({
    subscriber: req.user._id,
    creator: creatorId,
    type,
    endDate,
    active: true
  });

  res.status(201).json({ message: 'Subscription started', subscription: sub });
};
