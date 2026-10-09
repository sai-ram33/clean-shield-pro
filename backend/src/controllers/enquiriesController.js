/**
 * Custom Quote Enquiries & Inbound Leads Controller (MongoDB Mongoose Powered)
 * Clean Shield Pro Express Backend
 */

const Enquiry = require('../models/Enquiry');

// GET /api/enquiries - Get all enquiries from MongoDB (Empty by default until user submits quote)
exports.getAllEnquiries = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { service: { $regex: q, $options: 'i' } },
        { locality: { $regex: q, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/enquiries - Submit new custom quote enquiry dynamically to MongoDB
exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone number are required to submit an enquiry.'
      });
    }

    const newId = 'ENQ-' + Math.floor(200 + Math.random() * 800);

    const enquiry = new Enquiry({
      id: newId,
      name: name.trim(),
      phone: phone.trim(),
      service: req.body.service || 'General Enquiry',
      locality: req.body.locality || 'Danavaipeta',
      details: (req.body.details || '').trim(),
      preferredDate: req.body.preferredDate || '',
      status: 'New'
    });

    await enquiry.save();
    console.log(`📩 New Enquiry Saved to MongoDB: ${enquiry.id} - ${enquiry.name} (${enquiry.service})`);

    res.status(201).json({
      success: true,
      message: 'Custom quote enquiry submitted and saved in MongoDB! Our operations desk will get in touch.',
      data: enquiry
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/enquiries/:id/status - Update enquiry status in MongoDB
exports.updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status field is required.'
      });
    }

    const enquiry = await Enquiry.findOneAndUpdate(
      { id: req.params.id.trim() },
      { $set: { status } },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: `Enquiry with ID ${req.params.id} not found.`
      });
    }

    res.json({
      success: true,
      message: `Enquiry ${req.params.id} status updated to '${status}'.`,
      data: enquiry
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/enquiries/:id - Delete enquiry from MongoDB
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findOneAndDelete({ id: req.params.id.trim() });
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: `Enquiry with ID ${req.params.id} not found.`
      });
    }
    res.json({
      success: true,
      message: `Enquiry ${req.params.id} deleted successfully from MongoDB.`
    });
  } catch (err) {
    next(err);
  }
};

