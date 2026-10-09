/**
 * Services, Pricing & Configuration Controller (MongoDB Powered)
 * Clean Shield Pro Express Backend
 */

const Pricing = require('../models/Pricing');
const { BUSINESS_CONFIG, BRANCHES_CONFIG } = require('../config/businessConfig');

const DEFAULT_PRICING = {
  deepCleaning: {
    '1 BHK': 3499,
    '2 BHK': 5499,
    '3 BHK': 5999,
    '4 BHK+': 7499
  },
  pestControl: {
    '1 BHK': 1499,
    '2 BHK': 1999,
    '3 BHK': 2499,
    'Villas': 7499
  },
  addons: {
    balconyCleaning: 499,
    fridgeDeepClean: 399,
    chimneyDegrease: 599,
    mattressSanitization: 899
  }
};

// Full Structured Services Catalog (21 Services)
const SERVICES_CATALOG = [
  {
    categoryKey: 'cleaning',
    categoryName: 'Home & Commercial Cleaning Services',
    icon: '🧹',
    services: [
      { id: 'deep-clean', name: 'Full Home Deep Cleaning', startingPrice: '₹3,499', rating: 4.9, duration: '4 - 5 hrs', type: 'residential' },
      { id: 'bathroom', name: 'Bathroom & Toilet Descaling', startingPrice: '₹599', rating: 4.88, duration: '30 - 60 mins', type: 'residential' },
      { id: 'kitchen', name: 'Kitchen & Chimney Degreasing', startingPrice: '₹1,499', rating: 4.91, duration: '2 - 3 hrs', type: 'residential' },
      { id: 'sofa', name: 'Sofa & Upholstery Shampooing', startingPrice: '₹1,199', rating: 4.87, duration: '1 - 2 hrs', type: 'residential' },
      { id: 'water-tank', name: 'Water Tank Jet Wash', startingPrice: '₹1,199', rating: 4.93, duration: '1.5 - 2 hrs', type: 'residential' },
      { id: 'floor', name: 'Floor Scrubbing & Machine Buffing', startingPrice: '₹1,999', rating: 4.89, duration: '2 - 3 hrs', type: 'residential' },
      { id: 'window', name: 'Balcony, Window & Mesh Cleaning', startingPrice: '₹699', rating: 4.81, duration: '45 - 60 mins', type: 'residential' },
      { id: 'vacant', name: 'Move-in / Vacant Flat Cleaning', startingPrice: '₹2,999', rating: 4.9, duration: '3.5 - 4.5 hrs', type: 'residential' },
      { id: 'commercial', name: 'Commercial Deep Cleaning', startingPrice: 'Custom Quote', rating: 4.96, duration: 'Flexible', type: 'b2b' },
      { id: 'industrial', name: 'Industrial & Warehouse Cleaning', startingPrice: 'Custom Quote', rating: 4.94, duration: 'Scheduled', type: 'industrial' },
      { id: 'amc', name: 'AMC (Annual Maintenance Contract)', startingPrice: 'Custom Quote', rating: 4.98, duration: 'Recurring SLA', type: 'amc' }
    ]
  },
  {
    categoryKey: 'pesticides',
    categoryName: 'Pesticide & Pest Control Services',
    icon: '🪳',
    services: [
      { id: 'cockroach', name: 'Odorless Cockroach Control', startingPrice: '₹1,199', rating: 4.92, duration: '45 - 60 mins', warranty: '90-Day Warranty', type: 'residential' },
      { id: 'termite', name: 'Anti-Termite Drill Treatment', startingPrice: '₹2,999', rating: 4.95, duration: '3 - 5 hrs', warranty: '3-Year Warranty', type: 'residential' },
      { id: 'bedbug', name: 'Bed Bug Eradication (2 Visits)', startingPrice: '₹1,199', rating: 4.86, duration: '2 hrs/visit', warranty: '2 Full Visits Included', type: 'residential' },
      { id: 'mosquito', name: 'Mosquito & Drain Fly Fogging', startingPrice: '₹1,299', rating: 4.81, duration: '45 - 60 mins', warranty: 'Instant Knockdown', type: 'residential' },
      { id: 'ants', name: 'Ants Perimeter Barrier', startingPrice: '₹1,499', rating: 4.84, duration: '45 mins', warranty: 'Colony Transfer Kill', type: 'residential' },
      { id: 'rodent', name: 'Rodent & Rat Proofing', startingPrice: '₹1,699', rating: 4.83, duration: '1 hr', warranty: 'Safe Trapping & Proofing', type: 'residential' },
      { id: 'combo-pest', name: 'Full House Pest Shield Combo', startingPrice: '₹2,499', rating: 4.96, duration: '1.5 - 2 hrs', warranty: '6-Month Warranty', type: 'residential' },
      { id: 'commercial-pest', name: 'Commercial Pest Control (B2B)', startingPrice: 'Custom Quote', rating: 4.96, duration: 'After-Hours Shifts', warranty: 'Audit-Compliant IPM', type: 'b2b' },
      { id: 'industrial-pest', name: 'Industrial Pest Control & Fumigation', startingPrice: 'Custom Quote', rating: 4.94, duration: 'Scheduled by Facility Size', warranty: 'Factory Inspectorate Compliant', type: 'industrial' },
      { id: 'amc-pest', name: 'Pest Control AMC (Annual Maintenance Contract)', startingPrice: 'Custom Quote', rating: 4.98, duration: 'Monthly/Quarterly Cycles', warranty: '365-Day Pest-Free SLA with 4-Hr Emergency Callouts', type: 'amc' }
    ]
  }
];

// GET /api/services - Get complete services catalog
exports.getServicesCatalog = (req, res) => {
  res.json({
    success: true,
    totalServices: 21,
    data: SERVICES_CATALOG
  });
};

// GET /api/pricing - Get pricing configuration from MongoDB
exports.getPricing = async (req, res, next) => {
  try {
    let pricing = await Pricing.findOne().sort({ createdAt: -1 });
    if (!pricing) {
      pricing = await Pricing.create(DEFAULT_PRICING);
    }
    res.json({
      success: true,
      data: pricing
    });
  } catch (err) {
    res.json({
      success: true,
      data: DEFAULT_PRICING
    });
  }
};

// PUT /api/pricing - Update pricing configuration in MongoDB
exports.updatePricing = async (req, res, next) => {
  try {
    let pricing = await Pricing.findOne();
    if (pricing) {
      Object.assign(pricing, req.body);
      await pricing.save();
    } else {
      pricing = await Pricing.create(req.body);
    }
    res.json({
      success: true,
      message: 'Base pricing configuration updated and saved in MongoDB successfully!',
      data: pricing
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/config - Get business and contact config
exports.getConfig = (req, res) => {
  res.json({
    success: true,
    data: BUSINESS_CONFIG
  });
};

// GET /api/branches - Get 15+ operational branches network
exports.getBranches = (req, res) => {
  res.json({
    success: true,
    count: BRANCHES_CONFIG.length,
    data: BRANCHES_CONFIG
  });
};
