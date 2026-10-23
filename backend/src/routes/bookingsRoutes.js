const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { protectAdmin } = require('../middleware/auth');

// Public customer booking endpoints
router.get('/', bookingsController.getAllBookings);
router.post('/', bookingsController.createBooking);
router.get('/track/:query', bookingsController.trackBooking);
router.get('/:id', bookingsController.getBookingById);
router.post('/:id/whatsapp-initiated', bookingsController.markWhatsAppInitiated);

// Protected Admin Operations
router.patch('/:id/status', protectAdmin, bookingsController.updateBookingStatus);
router.delete('/:id', protectAdmin, bookingsController.deleteBooking);

module.exports = router;
