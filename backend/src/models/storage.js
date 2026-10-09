/**
 * Persistent JSON File-Based Storage Engine
 * Clean Shield Pro Backend
 * Stores and manages state in local JSON files with automatic initialization
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const FILES = {
  BOOKINGS: path.join(DATA_DIR, 'bookings.json'),
  ENQUIRIES: path.join(DATA_DIR, 'enquiries.json'),
  REVIEWS: path.join(DATA_DIR, 'reviews.json'),
  PRICING: path.join(DATA_DIR, 'pricing.json')
};

// Initial Seed Bookings
const SEED_BOOKINGS = [
  {
    id: 'CSP-84921',
    customerName: 'K. Durga Prasad',
    phone: '+91 98480 12345',
    altPhone: '',
    email: 'durga.prasad@gmail.com',
    locality: 'Danavaipeta',
    address: 'Plot 45, Road No 3, Danavaipeta, Rajamahendravaram',
    service: 'Full Home Deep Cleaning',
    bhk: '3 BHK',
    addons: ['Balcony Cleaning'],
    amount: 6498,
    date: '2026-10-05',
    timeSlot: '08:30 AM - 12:30 PM',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: '2026-10-02T10:30:00Z',
    notes: 'Floor scrubbing and bathroom descaling thoroughly done.'
  },
  {
    id: 'CSP-84920',
    customerName: 'Lakshmi Prasanna',
    phone: '+91 94401 56789',
    altPhone: '',
    email: 'lakshmi.p@outlook.com',
    locality: 'Morampudi',
    address: 'House #12-4-8, Opp. Rythu Bazar, Morampudi Junction, Rajamahendravaram',
    service: 'Odorless Cockroach Control',
    bhk: '2 BHK',
    addons: [],
    amount: 1999,
    date: '2026-10-04',
    timeSlot: '02:00 PM - 05:00 PM',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    status: 'In Progress',
    createdAt: '2026-10-02T14:15:00Z',
    notes: 'German gel dot baiting required in kitchen and utility.'
  },
  {
    id: 'CSP-84919',
    customerName: 'Ravi Kumar Raju',
    phone: '+91 98852 98765',
    altPhone: '',
    email: 'ravi.raju@yahoo.com',
    locality: 'Prakash Nagar',
    address: 'Near Venkateswara Swamy Temple, Prakash Nagar, Rajamahendravaram',
    service: 'Move-in / Vacant Flat Cleaning',
    bhk: '2 BHK',
    addons: ['Fridge Sanitization'],
    amount: 4398,
    date: '2026-10-01',
    timeSlot: '08:30 AM - 12:30 PM',
    paymentMethod: 'Paytm / GPay',
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: '2026-09-30T09:00:00Z',
    notes: 'Move-in deep cleaning completed satisfactorily.'
  },
  {
    id: 'CSP-84922',
    customerName: 'V. Satyanarayana',
    phone: '+91 94403 78912',
    altPhone: '',
    email: 'satya.palakollu@gmail.com',
    locality: 'Palakollu',
    address: 'Near Ksheera Ramalingeswara Temple, Palakollu, West Godavari',
    service: 'Full Home Deep Cleaning',
    bhk: '3 BHK',
    addons: ['Balcony Cleaning'],
    amount: 6498,
    date: '2026-10-07',
    timeSlot: '09:00 AM - 01:00 PM',
    paymentMethod: 'PhonePe / UPI App',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    createdAt: '2026-10-04T10:00:00Z',
    notes: 'Palakollu branch dispatch.'
  },
  {
    id: 'CSP-84923',
    customerName: 'Ch. Madhava Rao',
    phone: '+91 98488 45671',
    altPhone: '',
    email: 'madhav.narsapur@gmail.com',
    locality: 'Narasapuram',
    address: 'Opp. Taylor High School, Steamer Road, Narasapuram, West Godavari',
    service: 'Anti-Termite Drill Treatment',
    bhk: '2 BHK',
    addons: [],
    amount: 3499,
    date: '2026-10-08',
    timeSlot: '02:00 PM - 05:00 PM',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    status: 'Confirmed',
    createdAt: '2026-10-04T12:30:00Z',
    notes: 'Bayer Premise drill & inject treatment with 3-year certificate.'
  },
  {
    id: 'CSP-84924',
    customerName: 'P. Venkata Ramana',
    phone: '+91 99890 34211',
    altPhone: '',
    email: 'ramana.jaggampeta@gmail.com',
    locality: 'Jaggampeta',
    address: 'Near National Highway Junction, Main Bazar, Jaggampeta, East Godavari',
    service: 'Commercial Pest Control',
    bhk: 'Commercial',
    addons: [],
    amount: 0,
    date: '2026-10-08',
    timeSlot: '08:30 AM - 12:30 PM',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Site Survey Scheduled',
    status: 'In Progress',
    createdAt: '2026-10-05T08:45:00Z',
    notes: 'Jaggampeta commercial retail showroom IPM assessment.'
  }
];

// Initial Seed Enquiries
const SEED_ENQUIRIES = [
  {
    id: 'ENQ-201',
    name: 'B. Venkat Rao',
    phone: '+91 99590 87654',
    service: 'Water Tank Jet Wash',
    locality: 'Lalacheruvu',
    details: 'Overhead Sintex tank (2000 Litres) + underground sump require pressure wash and UV sanitization.',
    preferredDate: '2026-10-07',
    status: 'New',
    createdAt: '2026-10-03T09:15:00Z'
  },
  {
    id: 'ENQ-202',
    name: 'Anusha Chowdary',
    phone: '+91 98492 44321',
    service: 'Kitchen & Chimney Degreasing',
    locality: 'Diwancheruvu',
    details: 'Heavy grease on baffle filters, oil stains on ceramic tiles, modular drawers sanitization.',
    preferredDate: '2026-10-06',
    status: 'Contacted',
    createdAt: '2026-10-02T16:20:00Z'
  },
  {
    id: 'ENQ-203',
    name: 'Satyanarayana Murthy',
    phone: '+91 94901 33221',
    service: 'Industrial Pest Control & Fumigation',
    locality: 'Kakinada',
    details: 'Logistics godown and cold storage warehouse pest control & rodent perimeter proofing.',
    preferredDate: '2026-10-12',
    status: 'Converted',
    createdAt: '2026-10-01T11:00:00Z'
  }
];

// Initial Seed Reviews
const SEED_REVIEWS = [
  {
    id: 'REV-101',
    customerName: 'K. Durga Prasad',
    rating: 5,
    locality: 'Danavaipeta',
    service: 'Home Deep Cleaning (3 BHK)',
    date: '28 Sep 2026',
    review: 'Clean Shield Pro deep cleaned our entire 3 BHK flat. Tile scrub machine made marble floor shine like brand new. Washroom scaling is 100% gone!',
    approved: true
  },
  {
    id: 'REV-102',
    customerName: 'Smt. Lakshmi Prasanna',
    rating: 5,
    locality: 'Morampudi',
    service: 'Odorless Cockroach Control',
    date: '25 Sep 2026',
    review: '100% odorless gel service. We did not have to remove single vessel from our modular kitchen. Not a single cockroach spotted in 3 weeks.',
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

// Default Pricing
const DEFAULT_PRICING = {
  deepCleaning: {
    '1 BHK': 3499,
    '2 BHK': 5499,
    '3 BHK': 5999,
    '4 BHK+': 7499
  },
  pestControl: {
    '1 BHK': 1499,
    '2 BHK': 1999,
    '3 BHK': 2499,
    'Villas': 7499
  },
  addons: {
    balconyCleaning: 499,
    fridgeDeepClean: 399,
    chimneyDegrease: 599,
    mattressSanitization: 899
  }
};

// Generic JSON Read/Write Helpers
function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJson(filePath, defaultValue);
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

// Storage Operations
class Storage {
  static init() {
    readJson(FILES.BOOKINGS, SEED_BOOKINGS);
    readJson(FILES.ENQUIRIES, SEED_ENQUIRIES);
    readJson(FILES.REVIEWS, SEED_REVIEWS);
    readJson(FILES.PRICING, DEFAULT_PRICING);
  }

  // --- BOOKINGS ---
  static getBookings(filter = {}) {
    let list = readJson(FILES.BOOKINGS, SEED_BOOKINGS);
    if (filter.status && filter.status !== 'All') {
      list = list.filter(b => b.status.toLowerCase() === filter.status.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(b => 
        (b.customerName && b.customerName.toLowerCase().includes(q)) ||
        (b.id && b.id.toLowerCase().includes(q)) ||
        (b.phone && b.phone.includes(q)) ||
        (b.service && b.service.toLowerCase().includes(q)) ||
        (b.locality && b.locality.toLowerCase().includes(q))
      );
    }
    return list;
  }

  static getBookingById(id) {
    const list = readJson(FILES.BOOKINGS, SEED_BOOKINGS);
    return list.find(b => b.id.toLowerCase() === id.toLowerCase());
  }

  static findBooking(query) {
    if (!query) return null;
    const clean = query.toString().trim().toLowerCase();
    const cleanPhone = clean.replace(/\D/g, '');
    const list = readJson(FILES.BOOKINGS, SEED_BOOKINGS);

    return list.find(b => {
      const idMatch = b.id && b.id.toLowerCase() === clean;
      const bPhoneClean = (b.phone || '').replace(/\D/g, '');
      const phoneMatch = cleanPhone.length >= 10 && bPhoneClean.includes(cleanPhone);
      return idMatch || phoneMatch;
    }) || null;
  }

  static createBooking(data) {
    const list = readJson(FILES.BOOKINGS, SEED_BOOKINGS);
    const newId = 'CSP-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: newId,
      customerName: data.customerName || 'Customer',
      phone: data.phone || '',
      altPhone: data.altPhone || '',
      email: data.email || '',
      locality: data.locality || 'Rajamahendravaram',
      address: data.address || '',
      service: data.service || 'Full Home Deep Cleaning',
      bhk: data.bhk || '2 BHK',
      addons: Array.isArray(data.addons) ? data.addons : [],
      amount: Number(data.amount) || 0,
      date: data.date || new Date().toISOString().split('T')[0],
      timeSlot: data.timeSlot || '08:30 AM - 12:30 PM',
      paymentMethod: data.paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: data.paymentStatus || 'Pending',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      notes: data.notes || ''
    };
    list.unshift(newBooking);
    writeJson(FILES.BOOKINGS, list);
    return newBooking;
  }

  static updateBookingStatus(id, newStatus) {
    const list = readJson(FILES.BOOKINGS, SEED_BOOKINGS);
    const idx = list.findIndex(b => b.id.toLowerCase() === id.toLowerCase());
    if (idx !== -1) {
      list[idx].status = newStatus;
      if (newStatus === 'Completed') list[idx].paymentStatus = 'Paid';
      writeJson(FILES.BOOKINGS, list);
      return list[idx];
    }
    return null;
  }

  // --- ENQUIRIES ---
  static getEnquiries(filter = {}) {
    let list = readJson(FILES.ENQUIRIES, SEED_ENQUIRIES);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(e => 
        (e.name && e.name.toLowerCase().includes(q)) ||
        (e.phone && e.phone.includes(q)) ||
        (e.service && e.service.toLowerCase().includes(q)) ||
        (e.locality && e.locality.toLowerCase().includes(q))
      );
    }
    return list;
  }

  static createEnquiry(data) {
    const list = readJson(FILES.ENQUIRIES, SEED_ENQUIRIES);
    const newId = 'ENQ-' + Math.floor(200 + Math.random() * 800);
    const newEnquiry = {
      id: newId,
      name: data.name || '',
      phone: data.phone || '',
      service: data.service || 'General Enquiry',
      locality: data.locality || 'Danavaipeta',
      details: data.details || '',
      preferredDate: data.preferredDate || '',
      status: 'New',
      createdAt: new Date().toISOString()
    };
    list.unshift(newEnquiry);
    writeJson(FILES.ENQUIRIES, list);
    return newEnquiry;
  }

  static updateEnquiryStatus(id, newStatus) {
    const list = readJson(FILES.ENQUIRIES, SEED_ENQUIRIES);
    const idx = list.findIndex(e => e.id.toLowerCase() === id.toLowerCase());
    if (idx !== -1) {
      list[idx].status = newStatus;
      writeJson(FILES.ENQUIRIES, list);
      return list[idx];
    }
    return null;
  }

  // --- REVIEWS ---
  static getReviews(approvedOnly = true) {
    const list = readJson(FILES.REVIEWS, SEED_REVIEWS);
    return approvedOnly ? list.filter(r => r.approved) : list;
  }

  static createReview(data) {
    const list = readJson(FILES.REVIEWS, SEED_REVIEWS);
    const newId = 'REV-' + Math.floor(100 + Math.random() * 900);
    const newReview = {
      id: newId,
      customerName: data.customerName || 'Homeowner',
      rating: Number(data.rating) || 5,
      locality: data.locality || 'Rajamahendravaram',
      service: data.service || 'Full Home Deep Cleaning',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      review: data.review || '',
      approved: true, // auto-approved for instant visibility, moderateable via admin
      createdAt: new Date().toISOString()
    };
    list.unshift(newReview);
    writeJson(FILES.REVIEWS, list);
    return newReview;
  }

  static toggleReviewApproval(id) {
    const list = readJson(FILES.REVIEWS, SEED_REVIEWS);
    const idx = list.findIndex(r => r.id.toLowerCase() === id.toLowerCase());
    if (idx !== -1) {
      list[idx].approved = !list[idx].approved;
      writeJson(FILES.REVIEWS, list);
      return list[idx];
    }
    return null;
  }

  // --- PRICING ---
  static getPricing() {
    return readJson(FILES.PRICING, DEFAULT_PRICING);
  }

  static updatePricing(newPricing) {
    writeJson(FILES.PRICING, newPricing);
    return newPricing;
  }
}

// Initialize on module load
Storage.init();

module.exports = Storage;
