/**
 * Customer Reviews Controller (MongoDB Mongoose Powered)
 * Clean Shield Pro Express Backend
 */

const Review = require('../models/Review');

// No static reviews seeded - reviews are strictly created dynamically when customers submit reviews


// GET /api/reviews - Get reviews (approved by default, ?all=true for admin moderation)
exports.getAllReviews = async (req, res, next) => {
  try {
    const showAll = req.query.all === 'true';
    const filter = showAll ? {} : { approved: true };
    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/reviews - Submit new verified customer review
exports.createReview = async (req, res, next) => {
  try {
    const { customerName, rating, review } = req.body;
    if (!customerName || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, star rating (1-5), and review text are required.'
      });
    }

    const newId = 'REV-' + Math.floor(100 + Math.random() * 900);

    const newRev = new Review({
      id: newId,
      customerName: customerName.trim(),
      rating: Number(rating) || 5,
      locality: req.body.locality || 'Rajamahendravaram',
      service: req.body.service || 'Full Home Deep Cleaning',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      review: review.trim(),
      approved: true // auto-approved for live visibility, toggleable by owner in admin portal
    });

    await newRev.save();
    console.log(`⭐ New Review Saved in MongoDB: ${newRev.id} by ${newRev.customerName}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your verified review has been submitted and saved in MongoDB.',
      data: newRev
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/reviews/:id/toggle - Toggle review approval status in MongoDB
exports.toggleApproval = async (req, res, next) => {
  try {
    const rev = await Review.findOne({ id: req.params.id.trim() });
    if (!rev) {
      return res.status(404).json({
        success: false,
        message: `Review with ID ${req.params.id} not found.`
      });
    }

    rev.approved = !rev.approved;
    await rev.save();

    res.json({
      success: true,
      message: `Review ${req.params.id} visibility is now ${rev.approved ? 'Active (Visible)' : 'Hidden'}.`,
      data: rev
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/reviews/:id - Delete review from MongoDB
exports.deleteReview = async (req, res, next) => {
  try {
    const rev = await Review.findOneAndDelete({ id: req.params.id.trim() });
    if (!rev) {
      return res.status(404).json({
        success: false,
        message: `Review with ID ${req.params.id} not found.`
      });
    }
    res.json({
      success: true,
      message: `Review ${req.params.id} deleted successfully from MongoDB.`
    });
  } catch (err) {
    next(err);
  }
};

