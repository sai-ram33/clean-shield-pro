const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Reviews endpoints
router.get('/', reviewsController.getAllReviews);
router.post('/', reviewsController.createReview);
router.patch('/:id/toggle', reviewsController.toggleApproval);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
