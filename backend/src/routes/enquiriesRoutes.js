const express = require('express');
const router = express.Router();
const enquiriesController = require('../controllers/enquiriesController');

// Enquiries endpoints
router.get('/', enquiriesController.getAllEnquiries);
router.post('/', enquiriesController.createEnquiry);
router.patch('/:id/status', enquiriesController.updateEnquiryStatus);
router.delete('/:id', enquiriesController.deleteEnquiry);

module.exports = router;
