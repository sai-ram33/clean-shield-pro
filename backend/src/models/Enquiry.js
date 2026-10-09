const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    index: true
  },
  service: {
    type: String,
    default: 'General Enquiry'
  },
  locality: {
    type: String,
    default: 'Danavaipeta'
  },
  details: {
    type: String,
    default: ''
  },
  preferredDate: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Converted', 'Closed'],
    default: 'New'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
