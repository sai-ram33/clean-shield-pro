const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    index: true
  },
  altPhone: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  locality: {
    type: String,
    required: true,
    default: 'Rajamahendravaram'
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service is required']
  },
  bhk: {
    type: String,
    default: '2 BHK'
  },
  addons: {
    type: [String],
    default: []
  },
  amount: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    default: '08:30 AM - 12:30 PM'
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery (COD)'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Site Survey Scheduled'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Confirmed'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
