/**
 * Clean Shield Pro - Shared Data & State Management
 * Clean Home • Healthy Life | Rajamahendravaram, AP
 */

const STORAGE_KEYS = {
  BOOKINGS: 'csp_bookings',
  ENQUIRIES: 'csp_enquiries',
  REVIEWS: 'csp_reviews',
  PRICING: 'csp_pricing',
  ALERTS: 'csp_alerts'
};

// Official Business Contact Configuration
const BUSINESS_CONFIG = {
  name: 'Clean Shield Pro',
  slogan: "We Don't Just Clean, We Care.",
  tagline: 'Clean Home • Healthy Life',
  city: 'Rajamahendravaram, Andhra Pradesh',
  phone1: '+91 90596 39955',
  phone2: '+91 88973 12523',
  whatsapp1: '9059639955',
  whatsapp2: '8897312523',
  email1: 'madhuripaka756@gmail.com',
  email2: 'prasadanem777@gmail.com',
  allEmails: ['madhuripaka756@gmail.com', 'prasadanem777@gmail.com'],
  allWhatsApp: ['9059639955', '8897312523']
};

// Initial default pricing
const DEFAULT_PRICING = {
  deepCleaning: {
    '1 BHK': 3500,
    '2 BHK': 4500,
    '3 BHK': 5500,
    '4 BHK+': 7500
  },
  pestControl: {
    '1 BHK': 4000,
    '2 BHK': 5000,
    '3 BHK': 6000,
    'Villas': 8500
  },
  addons: {
    balconyCleaning: 500,
    fridgeDeepClean: 400,
    chimneyDegrease: 600,
    mattressSanitization: 700
  }
};

// Default seed bookings
const SEED_BOOKINGS = [
  {
    id: 'CSP-84921',
    customerName: 'Suresh Varma',
    phone: '+91 98480 12345',
    email: 'suresh.varma@gmail.com',
    locality: 'Danavaipeta',
    address: 'Flat 302, Sri Rama Nilayam, Danavaipeta, Rajamahendravaram',
    service: 'Home Deep Cleaning',
    bhk: '3 BHK',
    addons: ['Balcony Cleaning', 'Kitchen Chimney'],
    amount: 6600,
    date: '2026-10-05',
    timeSlot: '09:00 AM - 01:00 PM',
    paymentMethod: 'UPI (PhonePe)',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    createdAt: '2026-10-02T10:30:00Z',
    notes: 'Please pay extra attention to balcony tiles and kitchen exhaust.'
  },
  {
    id: 'CSP-84920',
    customerName: 'Lakshmi Prasanna',
    phone: '+91 94401 56789',
    email: 'lakshmi.p@outlook.com',
    locality: 'Morampudi',
    address: 'House #12-4-8, Opp. Rythu Bazar, Morampudi Junction, Rajamahendravaram',
    service: 'Pest Control',
    bhk: '2 BHK',
    addons: [],
    amount: 5000,
    date: '2026-10-04',
    timeSlot: '02:00 PM - 05:00 PM',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    status: 'In Progress',
    createdAt: '2026-10-02T14:15:00Z',
    notes: 'Cockroach control required in kitchen and utility.'
  },
  {
    id: 'CSP-84919',
    customerName: 'Ravi Kumar Raju',
    phone: '+91 98852 98765',
    email: 'ravi.raju@yahoo.com',
    locality: 'Prakash Nagar',
    address: 'Near Venkateswara Swamy Temple, Prakash Nagar, Rajamahendravaram',
    service: 'Home Deep Cleaning',
    bhk: '2 BHK',
    addons: ['Fridge Cleaning'],
    amount: 4900,
    date: '2026-10-01',
    timeSlot: '08:30 AM - 12:30 PM',
    paymentMethod: 'Paytm UPI',
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: '2026-09-30T09:00:00Z',
    notes: 'Move-in deep cleaning completed satisfactorily.'
  },
  {
    id: 'CSP-84918',
    customerName: 'Dr. K. Srinivas',
    phone: '+91 97011 23456',
    email: 'srinivas.k@gmail.com',
    locality: 'Innespeta',
    address: 'D.No 4-1-12, Godavari Bund Road, Innespeta, Rajamahendravaram',
    service: 'Pest Control',
    bhk: '3 BHK',
    addons: [],
    amount: 6000,
    date: '2026-10-06',
    timeSlot: '10:00 AM - 01:00 PM',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    status: 'Pending',
    createdAt: '2026-10-03T11:45:00Z',
    notes: 'General pest and termite prevention inspection needed.'
  }
];

// Default seed enquiries
const SEED_ENQUIRIES = [
  {
    id: 'ENQ-201',
    name: 'B. Venkat Rao',
    phone: '+91 99590 87654',
    service: 'Water Tank Cleaning',
    locality: 'Lalacheruvu',
    details: 'Overhead Sintex tank (2000 Litres) + underground sump (5000 Litres) require deep pressure cleaning and UV sanitization.',
    preferredDate: '2026-10-07',
    status: 'New',
    createdAt: '2026-10-03T09:15:00Z'
  },
  {
    id: 'ENQ-202',
    name: 'Anusha Chowdary',
    phone: '+91 98492 44321',
    service: 'Kitchen Cleaning',
    locality: 'Diwancheruvu',
    details: 'Heavy grease on chimney, oil stains on ceramic backsplash, modular drawers sanitization.',
    preferredDate: '2026-10-06',
    status: 'Contacted',
    createdAt: '2026-10-02T16:20:00Z'
  },
  {
    id: 'ENQ-203',
    name: 'Satyanarayana Murthy',
    phone: '+91 94901 33221',
    service: 'Sofa and Furniture Cleaning',
    locality: 'Aryapuram',
    details: '7-seater L-shaped fabric sofa steam shampooing and 6 dining chairs fabric cleaning.',
    preferredDate: '2026-10-08',
    status: 'Converted',
    createdAt: '2026-10-01T11:00:00Z'
  }
];

// Default customer reviews
const SEED_REVIEWS = [
  {
    id: 'REV-101',
    customerName: 'K. Durga Prasad',
    rating: 5,
    locality: 'Danavaipeta',
    service: 'Home Deep Cleaning (3 BHK)',
    date: '28 Sep 2026',
    review: 'Clean Shield Pro did an extraordinary job with our 3 BHK in Danavaipeta before the festive season. The team arrived on time with professional machines, and every corner looks spotless. Highly recommended in Rajamahendravaram!',
    approved: true
  },
  {
    id: 'REV-102',
    customerName: 'M. Padmavathi',
    rating: 5,
    locality: 'Prakash Nagar',
    service: 'Kitchen & Chimney Cleaning',
    date: '25 Sep 2026',
    review: 'Our kitchen chimney had years of tough grease buildup. Their crew cleaned it completely like brand new without any harsh smells. Safe eco-friendly products as promised!',
    approved: true
  },
  {
    id: 'REV-103',
    customerName: 'T. Subrahmanyam',
    rating: 5,
    locality: 'Morampudi',
    service: 'Pest Control (2 BHK)',
    date: '22 Sep 2026',
    review: 'Very professional odorless pest control treatment. We had severe cockroach trouble in the kitchen cabinets, and within 48 hours they were completely eliminated. Punctual and courteous staff.',
    approved: true
  }
];

// Database API helper
class CleanShieldDB {
  static init() {
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(SEED_ENQUIRIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(DEFAULT_PRICING));
    }
  }

  // Bookings
  static getBookings() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    } catch (e) {
      return SEED_BOOKINGS;
    }
  }

  static addBooking(bookingData) {
    const bookings = this.getBookings();
    const newId = 'CSP-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      paymentStatus: bookingData.paymentMethod.includes('Cash') ? 'Pending' : 'Paid',
      ...bookingData
    };
    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    
    // Trigger cross-tab notification
    this.triggerAlert({
      type: 'booking',
      title: 'New Booking Received!',
      message: `${newBooking.customerName} booked ${newBooking.service} (${newBooking.bhk || ''}) for ₹${newBooking.amount.toLocaleString('en-IN')}`,
      id: newId,
      time: new Date().toLocaleTimeString()
    });

    return newBooking;
  }

  static updateBookingStatus(bookingId, newStatus, paymentStatus = null) {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      bookings[idx].status = newStatus;
      if (paymentStatus) {
        bookings[idx].paymentStatus = paymentStatus;
      }
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      return bookings[idx];
    }
    return null;
  }

  static findBooking(query) {
    const bookings = this.getBookings();
    const q = query.trim().toLowerCase();
    return bookings.find(b => 
      b.id.toLowerCase() === q || 
      b.phone.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
    );
  }

  // Enquiries
  static getEnquiries() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) || [];
    } catch (e) {
      return SEED_ENQUIRIES;
    }
  }

  static addEnquiry(enquiryData) {
    const enquiries = this.getEnquiries();
    const newId = 'ENQ-' + Math.floor(100 + Math.random() * 900);
    const newEnquiry = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...enquiryData
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));

    this.triggerAlert({
      type: 'enquiry',
      title: 'New Custom Quote Enquiry!',
      message: `${newEnquiry.name} requested quote for ${newEnquiry.service} in ${newEnquiry.locality}`,
      id: newId,
      time: new Date().toLocaleTimeString()
    });

    return newEnquiry;
  }

  static updateEnquiryStatus(enquiryId, newStatus) {
    const enquiries = this.getEnquiries();
    const idx = enquiries.findIndex(e => e.id === enquiryId);
    if (idx !== -1) {
      enquiries[idx].status = newStatus;
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
      return enquiries[idx];
    }
    return null;
  }

  // Reviews
  static getReviews(approvedOnly = true) {
    this.init();
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
      return approvedOnly ? all.filter(r => r.approved) : all;
    } catch (e) {
      return approvedOnly ? SEED_REVIEWS.filter(r => r.approved) : SEED_REVIEWS;
    }
  }

  static addReview(reviewData) {
    const reviews = this.getReviews(false);
    const newId = 'REV-' + Math.floor(100 + Math.random() * 900);
    const newReview = {
      id: newId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      approved: true, // auto-approve for demonstration, easily toggled in admin
      ...reviewData
    };
    reviews.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return newReview;
  }

  static toggleReviewStatus(reviewId) {
    const reviews = this.getReviews(false);
    const idx = reviews.findIndex(r => r.id === reviewId);
    if (idx !== -1) {
      reviews[idx].approved = !reviews[idx].approved;
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
      return reviews[idx];
    }
    return null;
  }

  // Pricing
  static getPricing() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICING)) || DEFAULT_PRICING;
    } catch (e) {
      return DEFAULT_PRICING;
    }
  }

  static updatePricing(newPricing) {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(newPricing));
  }

  // Live Alerts & Broadcasts
  static triggerAlert(alertData) {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify({
      ...alertData,
      timestamp: Date.now()
    }));
    window.dispatchEvent(new CustomEvent('csp_new_lead', { detail: alertData }));
  }

  // Business Details & Contacts
  static getBusinessConfig() {
    return BUSINESS_CONFIG;
  }

  // Generate WhatsApp Message Text for Confirmation
  static getFormattedConfirmationText(booking) {
    return `*CLEAN SHIELD PRO - OFFICIAL BOOKING CONFIRMATION*\n` +
      `"Clean Home • Healthy Life | We Don't Just Clean, We Care."\n\n` +
      `📌 *Booking ID:* ${booking.id}\n` +
      `👤 *Customer Name:* ${booking.customerName}\n` +
      `📞 *Phone:* ${booking.phone}\n` +
      `✉️ *Email:* ${booking.email || 'N/A'}\n` +
      `🧹 *Service:* ${booking.service} (${booking.bhk || 'Standard'})\n` +
      `🗓️ *Scheduled Date:* ${booking.date}\n` +
      `⏰ *Time Slot:* ${booking.timeSlot}\n` +
      `📍 *Locality:* ${booking.locality}, Rajamahendravaram\n` +
      `🏠 *Full Address:* ${booking.address}\n` +
      `➕ *Add-ons:* ${booking.addons && booking.addons.length ? booking.addons.join(', ') : 'None'}\n` +
      `💰 *Total Amount:* Rs. ${Number(booking.amount).toLocaleString('en-IN')}\n` +
      `💳 *Payment Mode:* ${booking.paymentMethod} (${booking.paymentStatus || 'Pending'})\n` +
      `📝 *Notes:* ${booking.notes || 'None'}\n\n` +
      `🏢 *Clean Shield Pro Rajamahendravaram Office*\n` +
      `Helplines: +91 90596 39955 | +91 88973 12523\n` +
      `Emails: madhuripaka756@gmail.com | prasadanem777@gmail.com`;
  }

  // WhatsApp Message Generator
  static getWhatsAppLink(phone, message) {
    let cleanPhone = (phone || BUSINESS_CONFIG.whatsapp1).toString().replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  }

  // Email Confirmation mailto: Generator
  static getEmailConfirmationLink(booking, recipients = null) {
    const toEmails = recipients || BUSINESS_CONFIG.allEmails.join(',');
    const subject = encodeURIComponent(`Clean Shield Pro Booking Confirmation [${booking.id}] - ${booking.customerName}`);
    
    const bodyContent = 
`Namaste Clean Shield Pro Team & Customer,

Here are the confirmed booking details for residential cleaning & pest control in Rajamahendravaram:

==================================================
CLEAN SHIELD PRO - OFFICIAL BOOKING CONFIRMATION
"Clean Home • Healthy Life"
"We Don't Just Clean, We Care."
==================================================

BOOKING INFORMATION:
- Booking Reference ID: ${booking.id}
- Customer Name: ${booking.customerName}
- Contact Phone: ${booking.phone}
- Customer Email: ${booking.email || 'N/A'}
- Service Booked: ${booking.service}
- Configuration / BHK: ${booking.bhk || 'Standard'}
- Scheduled Date: ${booking.date}
- Time Slot Window: ${booking.timeSlot}

SERVICE LOCATION:
- Locality: ${booking.locality}, Rajamahendravaram
- Complete Street Address: ${booking.address}
- Special Notes / Instructions: ${booking.notes || 'None'}

COMMERCIAL & PAYMENT DETAILS:
- Total Service Amount: Rs. ${Number(booking.amount).toLocaleString('en-IN')}
- Selected Payment Method: ${booking.paymentMethod}
- Payment Status: ${booking.paymentStatus || 'Pending'}
- Add-ons Included: ${booking.addons && booking.addons.length ? booking.addons.join(', ') : 'None'}

==================================================
OPERATIONS DESK CONTACT:
Rajamahendravaram, Andhra Pradesh
Primary WhatsApp / Phone: +91 90596 39955
Secondary WhatsApp / Phone: +91 88973 12523
Official Operations Emails: 
- madhuripaka756@gmail.com
- prasadanem777@gmail.com
==================================================`;

    const encodedBody = encodeURIComponent(bodyContent);
    const ccParam = (booking.email && booking.email !== 'N/A') ? `&cc=${encodeURIComponent(booking.email)}` : '';
    return `mailto:${toEmails}?subject=${subject}&body=${encodedBody}${ccParam}`;
  }
}

// Auto init on load
CleanShieldDB.init();

// Export to window for vanilla JS access
window.CleanShieldDB = CleanShieldDB;
