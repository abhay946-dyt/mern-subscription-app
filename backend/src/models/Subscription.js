const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['monthly', 'yearly'], required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

subscriptionSchema.index(
  { subscriber: 1, creator: 1, active: 1 },
  { unique: true, partialFilterExpression: { active: true } }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
