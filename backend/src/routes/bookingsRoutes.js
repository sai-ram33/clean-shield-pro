const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// Booking endpoints
router.get('/', bookingsController.getAllBookings);
router.post('/', bookingsController.createBooking);
router.get('/track/:query', bookingsController.trackBooking);
router.get('/:id', bookingsController.getBookingById);
router.patch('/:id/status', bookingsController.updateBookingStatus);
router.delete('/:id', bookingsController.deleteBooking);

module.exports = router;
