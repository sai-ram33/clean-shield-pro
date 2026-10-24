/**
 * Bookings Controller (MongoDB Mongoose Powered)
 * Manjusha Cleaning & Pest Control Services Express Backend
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
    const rawQuery = (req.params.query || '').trim();
    if (!rawQuery) {
      return res.status(400).json({ success: false, message: 'Please provide a Booking ID or Mobile Number.' });
    }

    const cleanPhone = rawQuery.replace(/\D/g, '');
    const orConditions = [
      { id: { $regex: `^${rawQuery}$`, $options: 'i' } }
    ];

    if (cleanPhone.length >= 7) {
      // Match last 10 digits or exact substring of phone
      const phoneDigits = cleanPhone.slice(-10);
      orConditions.push({ phone: { $regex: phoneDigits } });
      orConditions.push({ altPhone: { $regex: phoneDigits } });
    }

    const booking = await Booking.findOne({ $or: orConditions }).sort({ createdAt: -1 });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No active booking found matching '${rawQuery}'. Please verify your Booking ID or registered mobile number.`
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

// Helper: Normalize & Validate Indian Phone Number
function normalizeIndianPhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') return null;
  let digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  // Valid Indian mobile number: 10 digits starting with 6, 7, 8, or 9
  if (/^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }
  return null;
}

// Helper: Validate booking date (must be today or future date)
function isValidBookingDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return false;
  // Accept standard YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
}

// Helper: Build standard customer confirmation message for WhatsApp
function buildWhatsAppConfirmationMessage(booking) {
  const serviceLine = booking.bhk && booking.bhk !== 'Standard'
    ? `${booking.service} (${booking.bhk})`
    : booking.service;
  const addressLine = booking.exactLocation
    ? `${booking.exactLocation}${booking.locality ? ', ' + booking.locality : ''}`
    : (booking.address || booking.locality || 'Rajahmundry');

  return (
    `Hello Manjusha Cleaning & Pest Control Services,\n` +
    `I would like to confirm my service booking.\n` +
    `Booking ID: ${booking.id}\n` +
    `Name: ${booking.customerName}\n` +
    `Service: ${serviceLine}\n` +
    `Preferred Date: ${booking.date}\n` +
    `Preferred Time: ${booking.timeSlot}\n` +
    `Service Address: ${addressLine}\n` +
    `Contact Number: ${booking.phone}\n` +
    `Please contact me to confirm the appointment.\n` +
    `Thank you.`
  );
}

// Helper: Build click-to-chat URL with official business number
function buildWhatsAppClickToChatUrl(booking) {
  // Use official primary business WhatsApp number in international digits-only format
  const rawNum = (BUSINESS_CONFIG.whatsapp1 || '9059639955').replace(/\D/g, '');
  const businessNumber = rawNum.startsWith('91') ? rawNum : `91${rawNum}`;
  const encodedMsg = encodeURIComponent(buildWhatsAppConfirmationMessage(booking));
  return `https://wa.me/${businessNumber}?text=${encodedMsg}`;
}

// POST /api/bookings - Create new service booking (Initial status: Pending)
exports.createBooking = async (req, res, next) => {
  try {
    const { customerName, phone, service } = req.body;

    // 1. Validate required fields
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your full name.'
      });
    }

    if (!service || !service.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid cleaning or pest control service.'
      });
    }

    // 2. Strict Indian mobile number validation & normalization
    const normalizedPhone = normalizeIndianPhone(phone);
    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Indian mobile number (e.g. 9848012345 or +919848012345).'
      });
    }

    // Validate alternate phone if provided
    let normalizedAltPhone = '';
    if (req.body.altPhone && req.body.altPhone.trim()) {
      normalizedAltPhone = normalizeIndianPhone(req.body.altPhone) || req.body.altPhone.trim();
    }

    // 3. Validate preferred date
    const bookingDate = (req.body.date && typeof req.body.date === 'string' && req.body.date.trim())
      ? req.body.date.trim()
      : new Date().toISOString().split('T')[0];

    if (!isValidBookingDate(bookingDate)) {
      return res.status(400).json({
        success: false,
        message: 'Preferred service date must be today or a future date.'
      });
    }

    // 4. Validate location & address
    const locality = (req.body.locality || 'Rajahmundry - Danavaipeta').trim();
    const exactLocation = (req.body.exactLocation || req.body.address || '').trim();
    if (!exactLocation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your exact location (Flat/House No., Building Name, Street & Landmark).'
      });
    }

    const fullAddress = req.body.address && req.body.address.trim() 
      ? req.body.address.trim() 
      : `${exactLocation}${locality ? ', ' + locality : ''}`;

    // 5. Anti-Spam / Idempotency Duplicate Detection (last 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const recentDuplicate = await Booking.findOne({
      phone: normalizedPhone,
      service: service.trim(),
      date: bookingDate,
      createdAt: { $gte: twoMinutesAgo }
    }).sort({ createdAt: -1 });

    if (recentDuplicate) {
      const waMsg = buildWhatsAppConfirmationMessage(recentDuplicate);
      const waUrl = buildWhatsAppClickToChatUrl(recentDuplicate);
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        message: 'Your booking has already been submitted and is awaiting WhatsApp confirmation.',
        data: recentDuplicate,
        whatsappConfirmationText: waMsg,
        whatsappUrl: waUrl
      });
    }

    // 6. Generate or preserve unique booking ID
    const bookingId = (req.body.id && typeof req.body.id === 'string' && /^CSP-\d{4,8}$/i.test(req.body.id.trim()))
      ? req.body.id.trim().toUpperCase()
      : ('CSP-' + Math.floor(10000 + Math.random() * 90000));

    // 7. Initialize booking with strict 'Pending' status (never automatically confirmed)
    const booking = new Booking({
      id: bookingId,
      customerName: customerName.trim(),
      phone: normalizedPhone,
      altPhone: normalizedAltPhone,
      email: (req.body.email || '').trim().toLowerCase(),
      locality: locality,
      exactLocation: exactLocation,
      address: fullAddress,
      service: service.trim(),
      bhk: req.body.bhk || '2 BHK',
      addons: Array.isArray(req.body.addons) ? req.body.addons : [],
      amount: Number(req.body.amount) || 0,
      date: bookingDate,
      timeSlot: req.body.timeSlot || '08:30 AM - 12:30 PM',
      paymentMethod: req.body.paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: (Number(req.body.amount) === 0) ? 'Site Survey Scheduled' : (req.body.paymentStatus || 'Pending'),
      status: 'Pending', // ALWAYS Pending until confirmed by admin via customer WhatsApp
      whatsappInitiated: false,
      notes: (req.body.notes || '').trim()
    });

    await booking.save();
    console.log(`📝 New Pending Booking Saved to MongoDB: ${booking.id} - ${booking.customerName} (${booking.service})`);

    const waMsg = buildWhatsAppConfirmationMessage(booking);
    const waUrl = buildWhatsAppClickToChatUrl(booking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully! Please send the confirmation message via WhatsApp to verify your appointment.',
      data: booking,
      whatsappConfirmationText: waMsg,
      whatsappUrl: waUrl
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/bookings/:id/whatsapp-initiated - Record that customer clicked to open WhatsApp
exports.markWhatsAppInitiated = async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id.trim() },
      { 
        $set: { 
          whatsappInitiated: true,
          whatsappInitiatedAt: new Date()
        } 
      },
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
      message: 'WhatsApp confirmation click recorded.',
      data: {
        id: booking.id,
        status: booking.status,
        whatsappInitiated: booking.whatsappInitiated,
        whatsappInitiatedAt: booking.whatsappInitiatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/bookings/:id/status - Update booking status in MongoDB (Admin Protected)
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];
    
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}.`
      });
    }

    const updateFields = { status };
    if (status === 'Completed') {
      updateFields.paymentStatus = 'Paid';
    }

    if (status === 'Confirmed') {
      updateFields.confirmedAt = new Date();
      updateFields.confirmedBy = (req.admin && (req.admin.name || req.admin.email)) ? (req.admin.name || req.admin.email) : 'Owner Admin';
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

// DELETE /api/bookings/:id - Delete booking from MongoDB (Admin Protected)
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


