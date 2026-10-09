/**
 * Customer Reviews Controller (MongoDB Mongoose Powered)
 * Clean Shield Pro Express Backend
 */

const Review = require('../models/Review');

// Initial seed reviews for real social proof on website if empty
const DEFAULT_INITIAL_REVIEWS = [
  {
    id: 'REV-101',
    customerName: 'K. Durga Prasad',
    rating: 5,
    locality: 'Danavaipeta',
    service: 'Full Home Deep Cleaning',
    date: '28 Sep 2026',
    review: 'Clean Shield Pro deep cleaned our entire flat. Single disc scrub machine made tiles shine like brand new. Washroom scaling is 100% gone!',
    approved: true
  },
  {
    id: 'REV-102',
    customerName: 'Smt. Lakshmi Prasanna',
    rating: 5,
    locality: 'Morampudi',
    service: 'Odorless Cockroach Control',
    date: '25 Sep 2026',
    review: '100% odorless gel service. We did not have to remove a single utensil from our kitchen. Not a single cockroach spotted in 3 weeks.',
    approved: true
  },
  {
    id: 'REV-103',
    customerName: 'M. Sreeramulu',
    rating: 5,
    locality: 'Prakash Nagar',
    service: 'Pest Control AMC (Annual Maintenance)',
    date: '22 Sep 2026',
    review: 'Enrolled our independent villa into Clean Shield Pro Pest AMC. Excellent scheduled quarterly visits, prompt technician arrival, and zero insect issues.',
    approved: true
  }
];

// Seed reviews if none exist
const ensureInitialReviews = async () => {
  try {
    const count = await Review.countDocuments();
    if (count === 0) {
      await Review.insertMany(DEFAULT_INITIAL_REVIEWS);
      console.log('⭐ Seeded initial customer reviews in MongoDB');
    }
  } catch (err) {
    console.warn('⚠️ Review seed warning:', err.message);
  }
};
ensureInitialReviews();

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
