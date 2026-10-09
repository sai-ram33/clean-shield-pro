const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  locality: {
    type: String,
    default: 'Rajamahendravaram'
  },
  service: {
    type: String,
    default: 'Full Home Deep Cleaning'
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  },
  review: {
    type: String,
    required: [true, 'Review text is required']
  },
  approved: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
