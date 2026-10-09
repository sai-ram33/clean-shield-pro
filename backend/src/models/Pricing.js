const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  deepCleaning: {
    '1 BHK': { type: Number, default: 3499 },
    '2 BHK': { type: Number, default: 5499 },
    '3 BHK': { type: Number, default: 5999 },
    '4 BHK+': { type: Number, default: 7499 }
  },
  pestControl: {
    '1 BHK': { type: Number, default: 1499 },
    '2 BHK': { type: Number, default: 1999 },
    '3 BHK': { type: Number, default: 2499 },
    'Villas': { type: Number, default: 7499 }
  },
  addons: {
    balconyCleaning: { type: Number, default: 499 },
    fridgeDeepClean: { type: Number, default: 399 },
    chimneyDegrease: { type: Number, default: 599 },
    mattressSanitization: { type: Number, default: 899 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
