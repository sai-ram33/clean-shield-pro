/**
 * Clean Shield Pro - Express.js REST API Server
 * Professional Deep Cleaning & Odorless Pest Control Platform
 * Rajamahendravaram & 15+ Operational Hubs
 * MongoDB Atlas Backend Integration
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const { seedOwnerAdmin } = require('./src/controllers/authController');

const authRoutes = require('./src/routes/authRoutes');
const bookingsRoutes = require('./src/routes/bookingsRoutes');
const enquiriesRoutes = require('./src/routes/enquiriesRoutes');
const reviewsRoutes = require('./src/routes/reviewsRoutes');
const servicesRoutes = require('./src/routes/servicesRoutes');
const cronRoutes = require('./src/routes/cronRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend clients (Netlify, Render, Localhost, etc.)
const defaultAllowedOrigins = [
  'https://cleanshieldpro.netlify.app',
  'https://clean-shield-pro.onrender.com',
  'http://localhost:5000',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5000'
];

const envOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map(s => s.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envOrigins]));

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, cron-job.org, Postman)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    if (
      process.env.CLIENT_ORIGIN === '*' ||
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.netlify.app') ||
      cleanOrigin.endsWith('.onrender.com')
    ) {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked request from unauthorized origin: ${origin}`);
    return callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-cron-secret'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger in Development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API Health Check
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'online',
    platform: 'Clean Shield Pro API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'clean_shield_pro',
      error: mongoose.connection.readyState !== 1 && connectDB.getLastError ? connectDB.getLastError() : null
    },
    endpoints: {
      authLogin: 'POST /api/auth/login',
      authMe: 'GET /api/auth/me',
      bookings: 'GET, POST /api/bookings',
      trackBooking: 'GET /api/bookings/track/:query',
      enquiries: 'GET, POST /api/enquiries',
      reviews: 'GET, POST /api/reviews',
      services: 'GET /api/services',
      pricing: 'GET, PUT /api/pricing',
      config: 'GET /api/config',
      branches: 'GET /api/branches',
      cron: 'GET, POST /api/cron',
      cronPing: 'GET /api/cron/ping',
      cronStatus: 'GET /api/cron/status'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/cron', cronRoutes);
app.use('/api', servicesRoutes);

// Serve Frontend Static Assets
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Fallback to frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global Error Handler Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
const startServer = async () => {
  // Connect to MongoDB Atlas
  const conn = await connectDB();
  if (conn) {
    // Ensure owner admin user exists
    await seedOwnerAdmin();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
=====================================================
🛡️  CLEAN SHIELD PRO - BACKEND API SERVER RUNNING
=====================================================
🚀 Server URL:       http://localhost:${PORT}
🌐 API Base:         http://localhost:${PORT}/api
🔐 Owner Login:      http://localhost:${PORT}/api/auth/login
🩺 Health Check:     http://localhost:${PORT}/api/health
⏱️ Cron Endpoint:   http://localhost:${PORT}/api/cron
📁 Frontend Served:  http://localhost:${PORT}/
📦 Database:         MongoDB Atlas (clean_shield_pro)
=====================================================
    `);
  });
};

startServer();

module.exports = app;
