/**
 * Bookings Controller (MongoDB Mongoose Powered)
 * Clean Shield Pro Express Backend
 */

const Booking = require('../models/Booking');
const { BUSINESS_CONFIG } = require('../config/businessConfig');

// GET /api/bookings - Get all bookings from MongoDB (Empty by default until user books)
exports.getAllBookings = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { customerName: { $regex: q, $options: 'i' } },
        { id: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { service: { $regex: q, $options: 'i' } },
        { locality: { $regex: q, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/:id - Get single booking by ID
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id.trim() });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found.`
      });
    }
    res.json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/track/:query - Track booking by Booking ID or Phone Number
exports.trackBooking = async (req, res, next) => {
  try {
    const query = (req.params.query || '').trim();
    const cleanPhone = query.replace(/\D/g, '');

    const orConditions = [
      { id: { $regex: `^${query}$`, $options: 'i' } }
    ];

    if (cleanPhone.length >= 10) {
      orConditions.push({ phone: { $regex: cleanPhone } });
    }

    const booking = await Booking.findOne({ $or: orConditions }).sort({ createdAt: -1 });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No active booking found matching '${query}'. Please check your Booking ID or registered 10-digit mobile number.`
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/bookings - Create new service booking dynamically in MongoDB
exports.createBooking = async (req, res, next) => {
  try {
    const { customerName, phone, service } = req.body;
    if (!customerName || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone number, and service are required.'
      });
    }

    // Generate unique CSP-XXXXX Booking ID
    const newId = 'CSP-' + Math.floor(10000 + Math.random() * 90000);

    const booking = new Booking({
      id: newId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      altPhone: (req.body.altPhone || '').trim(),
      email: (req.body.email || '').trim(),
      locality: req.body.locality || 'Rajamahendravaram',
      address: (req.body.address || '').trim(),
      service: service.trim(),
      bhk: req.body.bhk || '2 BHK',
      addons: Array.isArray(req.body.addons) ? req.body.addons : [],
      amount: Number(req.body.amount) || 0,
      date: req.body.date || new Date().toISOString().split('T')[0],
      timeSlot: req.body.timeSlot || '08:30 AM - 12:30 PM',
      paymentMethod: req.body.paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: (Number(req.body.amount) === 0) ? 'Site Survey Scheduled' : (req.body.paymentStatus || 'Pending'),
      status: 'Confirmed',
      notes: (req.body.notes || '').trim()
    });

    await booking.save();
    console.log(`📝 New Booking Saved to MongoDB: ${booking.id} - ${booking.customerName} (${booking.service})`);

    // Formatted WhatsApp confirmation text
    const waText = 
      `*CLEAN SHIELD PRO - OFFICIAL BOOKING CONFIRMATION*\n` +
      `"Clean Home • Healthy Life | We Don't Just Clean, We Care."\n\n` +
      `📌 *Booking ID:* ${booking.id}\n` +
      `👤 *Customer Name:* ${booking.customerName}\n` +
      `📞 *Primary Phone:* ${booking.phone}\n` +
      `🧹 *Service:* ${booking.service} (${booking.bhk})\n` +
      `🗓️ *Date:* ${booking.date} | ${booking.timeSlot}\n` +
      `📍 *Location:* ${booking.locality}, ${booking.address}\n` +
      `💰 *Total Amount:* Rs. ${Number(booking.amount).toLocaleString('en-IN')}\n` +
      `💳 *Payment:* ${booking.paymentMethod}\n\n` +
      `Operations Desk: ${BUSINESS_CONFIG.phone1} / ${BUSINESS_CONFIG.phone2}`;

    res.status(201).json({
      success: true,
      message: 'Booking created and saved dynamically in MongoDB!',
      data: booking,
      whatsappConfirmationText: waText
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/bookings/:id/status - Update booking status in MongoDB
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status field is required.'
      });
    }

    const updateFields = { status };
    if (status === 'Completed') {
      updateFields.paymentStatus = 'Paid';
    }

    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id.trim() },
      { $set: updateFields },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found.`
      });
    }

    res.json({
      success: true,
      message: `Booking ${req.params.id} status updated to '${status}'.`,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/bookings/:id - Delete booking from MongoDB
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndDelete({ id: req.params.id.trim() });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${req.params.id} not found.`
      });
    }
    res.json({
      success: true,
      message: `Booking ${req.params.id} deleted successfully from MongoDB.`
    });
  } catch (err) {
    next(err);
  }
};

