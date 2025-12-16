const mongoose = require('mongoose');

const rechargePlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  validity: {
    type: Number,
    required: [true, 'Validity is required'],
    min: 1
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  data: {
    type: String,
    required: [true, 'Data allowance is required']
  },
  talkTime: {
    type: String,
    default: 'Unlimited'
  },
  sms: {
    type: String,
    default: '100/day'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RechargePlan', rechargePlanSchema);