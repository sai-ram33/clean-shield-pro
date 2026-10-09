const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// Services, Pricing and Config endpoints
router.get('/services', servicesController.getServicesCatalog);
router.get('/pricing', servicesController.getPricing);
router.put('/pricing', servicesController.updatePricing);
router.get('/config', servicesController.getConfig);
router.get('/branches', servicesController.getBranches);

module.exports = router;
